<?php

namespace App\Controller;

use App\Entity\NoteAttachment;
use App\Service\EntityManager\NoteAttachmentManager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class NoteAttachmentController extends CommonController
{

    /**
     * @Route(name="note_attachment_download", path="/note-attachment/{id}/download", methods={"GET"})
     * @ParamConverter("attachment", class="App\Entity\NoteAttachment")
     * @param NoteAttachment $attachment
     * @return Response
     */
    public function download(NoteAttachment $attachment)
    {
        if ($attachment->getOwner()->getId() !== $this->getUser()->getId())
        {
            throw $this->createNotFoundException();
        }

        $result = new Response();
        $result->headers->set('X-Accel-Redirect', '/uploads/note_attachment/' . $attachment->getImage()->getName());

        return $result;
    }

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