<?php

namespace App\Event;

use App\Entity\NotePad;
use App\Entity\User;
use Doctrine\Common\EventSubscriber;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class NotePadEventSubscriber implements EventSubscriber
{
    /**
     * @var TokenStorageInterface
     */
    private $tokeStorage;

    public function __construct(TokenStorageInterface $tokenStorage)
    {
        $this->tokeStorage = $tokenStorage;
    }

    /**
     * Returns an array of events this subscriber wants to listen to.
     *
     * @return string[]
     */
    public function getSubscribedEvents()
    {
        return [
            Events::prePersist
        ];
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        /** @var NotePad $notePad */
        $notePad = $args->getObject();

        $notePad->setUser($this->getUser());
    }

    /**
     * @return User
     */
    private function getUser()
    {
        return $this->tokeStorage->getToken()->getUser();
    }
}