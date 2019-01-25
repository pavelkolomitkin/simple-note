<?php

namespace App\Service\EntityManager;


use App\Form\NoteType;
use Symfony\Component\Form\FormInterface;

class NoteManager extends CommonEntityManager
{
    protected function getCreationForm(): FormInterface
    {
        return $this->formFactory->create(NoteType::class);
    }

    protected function getUpdatingForm(): FormInterface
    {
        return $this->formFactory->create(NoteType::class);
    }
}