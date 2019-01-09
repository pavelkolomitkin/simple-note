<?php

namespace App\Service\EntityManager;

use App\Form\UserRegisterType;
use App\Service\EntityManager\Exception\ManageEntityException;
use Symfony\Component\Form\FormInterface;

class UserManager extends CommonEntityManager
{
    protected function getCreationForm(): FormInterface
    {
        return $this->formFactory->create(UserRegisterType::class);
    }

    protected function getUpdatingForm(): FormInterface
    {
        throw new ManageEntityException(['You can not edit user yet!'],ManageEntityException::UPDATE_ENTITY_ERROR_TYPE);
    }
}