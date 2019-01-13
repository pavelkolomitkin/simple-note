<?php

namespace App\Controller;

use App\Service\EntityManager\UserManager;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends CommonController
{
    /**
     * @param Request $request
     * @param UserManager $manager
     * @return Response
     * @throws \Exception
     * @Route(name="security_register", path="/security/register", methods={"POST"})
     */
    public function register(Request $request, UserManager $manager)
    {
        $user = $manager->register($request->request->all());

        return $this->getResponse([
            'user' => $user
        ], Response::HTTP_CREATED);
    }

    /**
     * @param $confirmationKey
     * @param UserManager $manager
     * @return Response
     * @throws \App\Service\EntityManager\Exception\ManageEntityException
     * @throws \Doctrine\ORM\NonUniqueResultException
     * @throws \Doctrine\ORM\TransactionRequiredException
     * @Route(name="security_confirm_register", path="/security/confirm-register/{confirmationKey}", methods={"POST"})
     */
    public function confirm($confirmationKey, UserManager $manager)
    {
        $user = $manager->confirmRegister($confirmationKey);

        return $this->getResponse([
            'user' => $user
        ]);
    }

    /**
     * @Route(name="security_user_profile", path="/security/profile", methods={"GET"})
     */
    public function profile()
    {
        $user = $this->getUser();

        return $this->getResponse([
            'user' => $user
        ]);
    }
}