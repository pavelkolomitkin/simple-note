<?php

namespace App\Service\EntityManager;

use App\Form\NotePadType;
use App\Service\EntityManager\Exception\ManageEntityException;
use Symfony\Component\Form\FormInterface;

class NotePadManager extends CommonEntityManager
{
    protected function getCreationForm(): FormInterface
    {
        return $this->formFactory->create(NotePadType::class);
    }

    protected function getUpdatingForm(): FormInterface
    {
        return $this->formFactory->create(NotePadType::class);
    }
}