<?php

namespace App\Service\EntityManager;


use App\Form\NoteAttachmentType;
use App\Service\EntityManager\Exception\ManageEntityException;
use Symfony\Component\Form\FormInterface;

class NoteAttachmentManager extends CommonEntityManager
{
    protected function getCreationForm(): FormInterface
    {
        return $this->formFactory->create(NoteAttachmentType::class);
    }

    protected function getUpdatingForm(): FormInterface
    {
        throw new ManageEntityException(['You can not edit note attachment!'],ManageEntityException::UPDATE_ENTITY_ERROR_TYPE);
    }
}