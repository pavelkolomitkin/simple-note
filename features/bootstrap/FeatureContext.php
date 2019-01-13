<?php

use Symfony\Component\HttpKernel\KernelInterface;
use Behat\Gherkin\Node\PyStringNode;
use \PHPUnit\Framework\Assert as Assertions;
use Behat\MinkExtension\Context\MinkContext;

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

    public function __construct(KernelInterface $kernel, \Doctrine\ORM\EntityManagerInterface $entityManager)
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
     * @return \Behat\Mink\Driver\Goutte\Client
     */
    protected function getClient()
    {
        /** @var \Behat\Mink\Driver\Goutte\Client $result */
        $result = $this->getSession('default')->getDriver()->getClient();
        $result->setHeader('Content-Type', 'application/json');

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

    protected function sendRequest($method, $url, $params = [], $files = [], $server = [], $content = null)
    {
        $url = $this->locatePath($url);

        $client = $this->getClient();

        $client->request($method, $url, $params, $files, $server, $content);
        $this->response = $client->getInternalResponse();

        return $this->response;
    }


}
