<?php

namespace App\Controller;

use App\Service\EntityManager\UserManager;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


use Doctrine\DBAL\Driver\Connection;

class SecurityController extends CommonController
{
    /**
     * @param Request $request
     * @param UserManager $manager
     * @return Response
     * @throws \App\Service\EntityManager\Exception\ManageEntityException
     * @throws \Exception
     * @Route(name="security_register", path="/security/register", methods={"POST"})
     */
    public function register(Request $request, UserManager $manager, Connection $connection)
    {
//        var_dump($connection);
//        exit;

        $user = $manager->register($request->request->all());

        return $this->getResponse([
            'user' => $user
        ], Response::HTTP_CREATED);
    }

    /**
     * @param $confirmationKey
     * @param UserManager $manager
     * @Route(name="security_confirm_register", path="/security/confirm-register/{confirmationKey}", methods={"POST"})
     * @return Response
     * @throws \App\Service\EntityManager\Exception\ManageEntityException
     */
    public function confirm($confirmationKey, UserManager $manager)
    {
        $manager->confirmRegister($confirmationKey);

        return $this->getResponse();
    }
}