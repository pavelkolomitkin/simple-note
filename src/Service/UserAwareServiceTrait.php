<?php

namespace App\Service;

use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

trait UserAwareServiceTrait
{
    /**
     * @var TokenStorageInterface
     */
    private $tokenStorage;

    public function setTokenStorage(TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
    }

    protected function getUser()
    {
        $result = null;

        $token = $this->tokenStorage->getToken();
        if ($token)
        {
            $user = $token->getUser();
            if ($user instanceof User)
            {
                $result = $user;
            }
        }

        return $result;
    }
}