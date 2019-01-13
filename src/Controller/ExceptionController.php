<?php

namespace App\Controller;

use App\Service\EntityManager\Exception\ManageEntityException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ExceptionController
{
    public function showAction($exception)
    {
        if ($exception instanceof ManageEntityException)
        {
            return new JsonResponse(
                [
                    'errors' => $exception->getErrors()
                ],
                $this->getHttpErrorCodeByManageException($exception)
            );
        }
    }

    private function getHttpErrorCodeByManageException(ManageEntityException $exception)
    {
        $result = null;

        switch ($exception->getType())
        {
            case ManageEntityException::READ_ENTITY_ERROR_TYPE:

                $result = Response::HTTP_NOT_FOUND;

                break;

            case ManageEntityException::DELETE_ENTITY_ERROR_TYPE:
            case ManageEntityException::UPDATE_ENTITY_ERROR_TYPE:
            case ManageEntityException::CREATE_ENTITY_ERROR_TYPE:

                $result = Response::HTTP_BAD_REQUEST;

                break;

            default:

                $result = Response::HTTP_BAD_REQUEST;

                break;
        }

        return $result;
    }
}