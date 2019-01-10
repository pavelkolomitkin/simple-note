<?php

use Behat\Behat\Context\Context;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\KernelInterface;
use Behat\Gherkin\Node\PyStringNode;

/**
 * This context class contains the definitions of the steps used by the demo 
 * feature file. Learn how to get started with Behat and BDD on Behat's website.
 * 
 * @see http://behat.org/en/latest/quick_start.html
 */
class FeatureContext implements Context
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
     * @var Response|null
     */
    private $response;

    public function __construct(KernelInterface $kernel, \Doctrine\ORM\EntityManagerInterface $entityManager)
    {
        $this->kernel = $kernel;
        $this->entityManager = $entityManager;
    }

    /**
     * @When a demo scenario sends a request to :path
     */
    public function aDemoScenarioSendsARequestTo(string $path)
    {
        $this->response = $this->kernel->handle(Request::create($path, 'GET'));
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
        $actual = json_decode($this->getContent(), true);

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
            var_dump(['actual' => $this->lastResponse->getContent()]);
            throw $exception;
        }
    }
}
