<?php

namespace App\Controller;

use App\Entity\Note;
use App\Repository\NoteRepository;
use App\Service\EntityManager\NoteManager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class NoteController extends CommonController
{
    /**
     * @param Note $note
     *
     * @Route(name="note_get", path="/note/{id}", methods={"GET"})
     * @ParamConverter("note", class="App\Entity\Note")
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function details(Note $note)
    {
        if ($note->getNotePad()->getUser() !== $this->getUser())
        {
            throw $this->createNotFoundException();
        }

        return $this->getResponse(
            [
                'note' => $note
            ]
        );
    }

    /**
     * @Route(name="note_index", path="/note/list", methods={"GET"})
     * @param Request $request
     * @param NoteRepository $repository
     * @return Response
     */
    public function index(Request $request, NoteRepository $repository)
    {
        $searchCriteria = array_merge($request->query->all(), [
            'owner' => $this->getUser()
        ]);

        $query = $repository->getSearchQuery($searchCriteria);

        $pagination = $this->get('knp_paginator')->paginate(
            $query,
            $request->query->getInt('page', 1)
        );

        return $this->getResponse([
            'notes' => $pagination->getItems(),
            'total' => $pagination->getTotalItemCount()
        ]);
    }

    /**
     * @Route(name="note_create", path="/note", methods={"POST"})
     *
     * @param Request $request
     * @param NoteManager $manager
     * @return Response
     * @throws \App\Service\EntityManager\Exception\ManageEntityException
     */
    public function create(Request $request, NoteManager $manager)
    {
        $note = $manager->create($request->request->all());

        return $this->getResponse([
            'note' => $note
        ], Response::HTTP_CREATED);
    }

    /**
     * @Route(name="note_update", path="/note", methods={"PUT"})
     * @ParamConverter("note", class="App\Entity\Note")
     * @param Note $note
     * @param NoteManager $manager
     * @param Request $request
     * @return Response
     * @throws \App\Service\EntityManager\Exception\ManageEntityException
     */
    public function update(Note $note, NoteManager $manager, Request $request)
    {
        if ($note->getNotePad()->getUser() !== $this->getUser())
        {
            throw $this->createNotFoundException();
        }

        $result = $manager->update($note, $request->request->all());

        return $this->getResponse([
            'note' => $result
        ]);
    }

    /**
     * @Route(name="note_delete", path="/path/{id}", methods={"DELETE"})
     * @ParamConverter("note", class="App\Entity\Note")
     * @param Note $note
     * @param NoteManager $manager
     * @return NoteController|Response
     * @throws \App\Service\EntityManager\Exception\ManageEntityException
     */
    public function delete(Note $note, NoteManager $manager)
    {
        if ($note->getNotePad()->getUser() !== $this->getUser())
        {
            throw $this->createNotFoundException();
        }

        $manager->remove($note);

        return $this-$this->getResponse();
    }
}