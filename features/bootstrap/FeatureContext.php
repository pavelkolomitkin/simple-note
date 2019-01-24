<?php

use Symfony\Component\HttpKernel\KernelInterface;
use Behat\Gherkin\Node\PyStringNode;
use \PHPUnit\Framework\Assert as Assertions;
use Behat\MinkExtension\Context\MinkContext;
use \Behat\Gherkin\Node\TableNode;

/**
 * This context class contains the definitions of the steps used by the demo 
 * feature file. Learn how to get started with Behat and BDD on Behat's website.
 * 
 * @see http://behat.org/en/latest/quick_start.html
 */
class FeatureContext extends MinkContext
{
    /**
     * @var KernelInterface
     */
    private $kernel;

    /**
     * @var \Doctrine\ORM\EntityManagerInterface
     */
    private $entityManager;

    /**
     * @var \Symfony\Component\BrowserKit\Response|null
     */
    private $response;

    /**
     * @var string
     */
    private $authToken = null;

    /**
     * @var string
     */
    private $registerConfirmationKey;

    /**
     * @var array [fileName => attachmentId]
     */
    private $uploadedAttachments = [];

    public function __construct(
        KernelInterface $kernel,
        \Doctrine\ORM\EntityManagerInterface $entityManager
    )
    {
        $this->kernel = $kernel;
        $this->entityManager = $entityManager;
    }

    /**
     * @Then the response should be received
     */
    public function theResponseShouldBeReceived()
    {
        if ($this->response === null) {
            throw new \RuntimeException('No response received');
        }
    }

    public function theResponseShouldContainJson(PyStringNode $jsonString)
    {
        $expected = json_decode($jsonString->getRaw(), true);
        $actual = json_decode($this->response->getContent(), true);

        if ($expected === null) {
            throw new \RuntimeException(
                "Can not convert etalon to json:\n" . $jsonString->getRaw()
            );
        }

        try
        {
            Assertions::assertGreaterThanOrEqual(count($expected), count($actual));

            foreach ($expected as $key => $needle) {
                Assertions::assertArrayHasKey($key, $actual);
                Assertions::assertEquals($expected[$key], $actual[$key]);
            }
        }
        catch (\Exception $exception)
        {
            print_r('Jsons are not equal!');
            var_dump(['actual' => $this->response->getContent()]);
            throw $exception;
        }
    }

    /**
     * @Given I have an activation key with email :email
     * @param $email
     * @throws \Doctrine\DBAL\DBALException
     */
    public function iHaveAnActivationRegisterKey($email)
    {
        $connection = $this->entityManager->getConnection();

        $statement = $connection->prepare("SELECT user_confirmation_key.key as confirmation_key FROM user_confirmation_key
            JOIN users ON (user_confirmation_key.user_id = users.id)
            WHERE users.email = :email
        ");

        $statement->bindValue("email", $email);
        $statement->execute();

        $key = $statement->fetch(\Doctrine\DBAL\FetchMode::ASSOCIATIVE);

        $this->registerConfirmationKey = $key['confirmation_key'];
    }

    /**
     * @Then I try activate my registration by key
     */
    public function iTryActivateRegistration()
    {
        $this->sendRequest('POST', '/security/confirm-register/' . $this->registerConfirmationKey);
    }

    /**
     * @Then I hold the authorize token from response
     */
    public function iKeepAuthorizationTokenFromRequest()
    {
        $data = json_decode($this->getClient()->getResponse()->getContent(), true);
        $this->authToken = $data['token'];
    }

    /**
     * @When I try to get user profile
     */
    public function iTryToGetUserProfile()
    {
        $this->sendRequest('GET', '/security/profile');
    }

    /**
     * @Given I authorize with email :email and password :password
     * @param $email
     * @param $password
     */
    public function iAuthorize(string $email, string $password)
    {
        $this->sendRequest('POST', '/security/login_check', [], [], [],
            json_encode([
                'username' => $email,
                'password' => $password
            ]));

        Assertions::assertEquals(200, $this->response->getStatus(), 'You can not authorize with this credentials!');

        $this->iKeepAuthorizationTokenFromRequest();
    }

    /**
     * @Given I send http request with method :method on relative url :path with content:
     *
     * @param $method
     * @param $path
     * @param $content
     */
    public function iSendRequestWithContent(string $method, string $path, PyStringNode $content)
    {
        $this->sendRequest($method, $path, [], [], [], $content);
    }

    /**
     * @Given I upload a note attachment :fileName on server
     * @param $fileName
     */
    public function iUploadNoteAttachment($fileName)
    {
        $client = $this->getClient();
        $client->removeHeader('Content-Type');

        $file = new \Symfony\Component\HttpFoundation\File\UploadedFile(
            __DIR__ . '/../attachments/' . $fileName .'.jpg',
            'file_1.jpg',
            'image/jpeg',
            null
        );

        $this->uploadFiles(['imageFile' => $file],'POST', '/note-attachment/create');

        $data = json_decode($this->response->getContent(), true);
        $this->uploadedAttachments[$fileName] = $data['attachment']['id'];
    }

    /**
     * @Given I create a new note with text :text, notepad id :notePadId and uploaded attachments
     * @param string $text
     * @param int $notePadId
     */
    public function iCreateNewNote(string $text, int $notePadId)
    {
        $this->sendRequest('POST', '/note', [], [], [], json_encode([
            'content' => $text,
            'notePad' => $notePadId,
            'attachments' => array_values($this->uploadedAttachments)
        ]));

        $this->uploadedAttachments = [];
    }

    /**
     * @return \Behat\Mink\Driver\Goutte\Client
     */
    protected function getClient()
    {
        /** @var \Behat\Mink\Driver\Goutte\Client $result */
        $result = $this->getSession('default')->getDriver()->getClient();

        if ($this->authToken !== null)
        {
            $result->setHeader('Authorization', 'Bearer ' . $this->authToken);
        }
        else
        {
            $result->removeHeader('Authorization');
        }

        return $result;
    }

    /**
     * @param $method
     * @param $url
     * @param $params
     * @param \Symfony\Component\HttpFoundation\File\UploadedFile[] $files
     * @return \Symfony\Component\BrowserKit\Response|null
     */
    protected function uploadFiles(array $files, string $method, string $url, array $params = [])
    {
        return $this->sendRequest($method, $url, $params, $files, [], null, []);
    }

    protected function sendRequest($method, $url, $params = [], $files = [], $server = [], $content = null, $additionHeaders = [
        'Content-Type' => 'application/json'
    ])
    {
        $url = $this->locatePath($url);

        $client = $this->getClient();
        foreach ($additionHeaders as $name => $value)
        {
            $client->setHeader($name, $value);
        }

        $client->request($method, $url, $params, $files, $server, $content);
        $this->response = $client->getInternalResponse();

        var_dump([
            'method' => $method,
            'url' => $url,
            'content' => $content,
            'response' => $this->response
        ]);


        return $this->response;
    }
}
