<?php

namespace App\Service\EntityManager;

use App\Entity\NotePad;
use App\Form\NotePadType;
use App\Service\UserAwareServiceTrait;
use Symfony\Component\Form\FormInterface;

class NotePadManager extends CommonEntityManager
{
    use UserAwareServiceTrait;

    protected function getCreationForm(): FormInterface
    {
        $entity = new NotePad();
        $entity->setUser($this->getUser());

        return $this->formFactory->create(NotePadType::class, $entity);
    }

    protected function getUpdatingForm(): FormInterface
    {
        return $this->formFactory->create(NotePadType::class);
    }
}