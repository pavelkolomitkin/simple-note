<?php

namespace App\Service\EntityManager;


use App\Entity\NoteAttachment;
use App\Form\NoteAttachmentType;
use App\Service\EntityManager\Exception\ManageEntityException;
use App\Service\UserAwareServiceTrait;
use Symfony\Component\Form\FormInterface;

class NoteAttachmentManager extends CommonEntityManager
{
    use UserAwareServiceTrait;

    protected function getCreationForm(): FormInterface
    {
        $entity = new NoteAttachment();
        $entity->setOwner($this->getUser());

        return $this->formFactory->create(NoteAttachmentType::class, $entity);
    }

    protected function getUpdatingForm(): FormInterface
    {
        throw new ManageEntityException(['You can not edit note attachment!'],ManageEntityException::UPDATE_ENTITY_ERROR_TYPE);
    }
}