<?php

namespace App\Controller;

use App\Entity\NotePad;
use App\Repository\NotePadRepository;
use App\Service\EntityManager\Exception\ManageEntityException;
use App\Service\EntityManager\NotePadManager;
use Knp\Component\Pager\Paginator;
use Knp\Component\Pager\PaginatorInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class NotePadController extends CommonController
{
    /**
     * @Route(name="notepad_details", path="/notepad/{id}", methods={"GET"}, requirements={"id"="\d+"})
     * @ParamConverter("notePad", class="App\Entity\NotePad")
     * @param NotePad $notePad
     * @return Response
     */
    public function details(NotePad $notePad)
    {
        if ($notePad->getUser() !== $this->getUser())
        {
            throw $this->createNotFoundException();
        }

        return $this->getResponse([
            'notePad' => $notePad
        ]);
    }

    /**
     * @Route(name="notepad_index", path="/notepad/list", methods={"GET"})
     * @param Request $request
     * @param NotePadRepository $repository
     * @param PaginatorInterface $paginator
     * @return Response
     */
    public function index(Request $request, NotePadRepository $repository, PaginatorInterface $paginator)
    {
        $searchCriteria = $request->query->all();
        $searchCriteria['owner'] = $this->getUser();

        $query = $repository->getSearchQuery($searchCriteria);

        $pagination = $paginator->paginate(
                $query,
                $request->query->getInt('page', 1)
            );

        return $this->getResponse([
            'notePads' => $pagination->getItems(),
            'total' => $pagination->getTotalItemCount()
        ]);
    }

    /**
     * @Route(name="notepad_create", path="/notepad", methods={"POST"})
     *
     * @param Request $request
     * @param NotePadManager $manager
     * @return Response
     * @throws ManageEntityException
     */
    public function create(Request $request, NotePadManager $manager)
    {
        $notePad = $manager->create(
            array_merge(
                $request->request->all(),
                [
                    'user' => $this->getUser()->getId()
                ]
            ));

        return $this->getResponse(
            [
                'notePad' => $notePad
            ],
            Response::HTTP_CREATED
        );
    }

    /**
     * @Route(name="notepad_update", path="/notepad/{id}", methods={"PUT"})
     * @ParamConverter("notePad", class="App\Entity\NotePad")
     * @param Request $request
     * @param NotePad $notePad
     * @param NotePadManager $manager
     * @return Response
     * @throws ManageEntityException
     */
    public function update(NotePad $notePad, NotePadManager $manager, Request $request)
    {
        if ($this->getUser() !== $notePad->getUser())
        {
            throw $this->createNotFoundException();
        }

        $result = $manager->update($notePad, $request->request->all());
        return $this->getResponse(
            [
                'notePad' => $result
            ]
        );
    }

    /**
     * @Route(name="notepad_delete", path="/notepad/{id}", methods={"DELETE"})
     * @ParamConverter("notePad", class="App\Entity\NotePad")
     *
     * @param NotePad $notePad
     * @param NotePadManager $manager
     * @return Response
     * @throws ManageEntityException
     */
    public function delete(NotePad $notePad, NotePadManager $manager)
    {
        if ($this->getUser() !== $notePad->getUser())
        {
            throw $this->createNotFoundException();
        }

        $manager->remove($notePad);
        return $this->getResponse();
    }
}