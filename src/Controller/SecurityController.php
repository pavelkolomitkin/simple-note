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
     * @throws \App\Service\EntityManager\Exception\ManageEntityException
     * @Route(name="security_register", path="/register", methods={"POST"})
     */
    public function register(Request $request, UserManager $manager)
    {
        $user = $manager->create($request->request->all());

        return $this->getResponse([
            'user' => $user
        ], Response::HTTP_CREATED);
    }
}