<?php

namespace App\Controller;

use App\Service\EntityManager\NoteAttachmentManager;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class NoteAttachmentController extends CommonController
{
    /**
     * @Route(name="note_attachment_create", path="/note-attachment/create", methods={"POST"})
     *
     * @param Request $request
     * @param NoteAttachmentManager $manager
     * @return Response
     * @throws \App\Service\EntityManager\Exception\ManageEntityException
     */
    public function create(Request $request, NoteAttachmentManager $manager)
    {
        $result = $manager->create($request->files->all());

        return $this->getResponse(
            [
                'attachment' => $result
            ], Response::HTTP_CREATED
        );
    }
}