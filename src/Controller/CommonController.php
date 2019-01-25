<?php

namespace App\Controller;

use FOS\RestBundle\Controller\AbstractFOSRestController;
use Liip\ImagineBundle\Service\FilterService;
use Symfony\Component\HttpFoundation\Response;

abstract class CommonController extends AbstractFOSRestController
{
    const SERIALIZE_GROUP_DEFAULT = 'default';

    const SERIALIZE_GROUP_LIST = 'list';

    const SERIALIZE_GROUP_DETAILS = 'details';

    /**
     * @param $data
     * @param int $statusCode
     * @param array $headers
     * @param array $serializeGroups
     * @return Response
     */
    protected function getResponse($data = null, $statusCode = Response::HTTP_OK, array $headers = [], array $serializeGroups = [])
    {
        $view = $this->view($data, $statusCode, $headers);

        $defaultSerializeGroups = $this->getDefaultSerializeGroups();
        $groups = array_merge($defaultSerializeGroups, $serializeGroups);

        $context = $view->getContext();
        $context
            ->setGroups($groups)
            ->disableMaxDepth();

        return $this->handleView($view);
    }

    protected function getDefaultSerializeGroups()
    {
        return [self::SERIALIZE_GROUP_DEFAULT];
    }

    /**
     * Translate error messages
     *
     * @param array $errors
     * @return array
     */
    protected function translateErrors(array $errors)
    {
        $result = [];

        $translator = $this->get('translator');
        foreach ($errors as $key => $error)
        {
            if (is_array($error))
            {
                $result[$key] = $this->translateErrors($error);
            }
            else
            {
                $result[$key] = $translator->trans($error);
            }
        }

        return $result;
    }
}