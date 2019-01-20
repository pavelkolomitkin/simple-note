<?php

namespace App\Controller;

use App\Entity\NoteAttachment;
use App\Service\EntityManager\NoteAttachmentManager;
use App\Service\ImageFilter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class NoteAttachmentController extends CommonController
{

    /**
     * @Route(name="note_attachment_download", path="/note-attachment/{id}/download/{filter}", methods={"GET"})
     * @ParamConverter("attachment", class="App\Entity\NoteAttachment")
     * @param NoteAttachment $attachment
     * @param string $filter
     * @param ImageFilter $imageFilter
     * @return Response
     */
    public function download(NoteAttachment $attachment, string $filter, ImageFilter $imageFilter)
    {
        if ($attachment->getOwner() !== $this->getUser())
        {
            throw $this->createNotFoundException();
        }

        if ($filter === 'original')
        {
            $result = new Response();
            $result->headers->set('X-Accel-Redirect',  $this->getParameter('upload_directory') . '/note_attachment/' . $attachment->getImage()->getName());

            return $result;
        }

        $originalFilePath = '/note_attachment/' . $attachment->getImage()->getName();
        $filteredImagePath = $imageFilter->getUrlFilteredImage($originalFilePath, $filter);

        $result = new Response();
        $result->headers->set('X-Accel-Redirect', $filteredImagePath);

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