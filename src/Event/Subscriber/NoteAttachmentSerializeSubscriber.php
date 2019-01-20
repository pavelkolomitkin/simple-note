<?php

namespace App\Event\Subscriber;

use App\Entity\NoteAttachment;
use JMS\Serializer\EventDispatcher\ObjectEvent;
use JMS\Serializer\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\RouterInterface;
use Vich\UploaderBundle\Templating\Helper\UploaderHelper;
use Liip\ImagineBundle\Imagine\Cache\CacheManager;

class NoteAttachmentSerializeSubscriber implements EventSubscriberInterface
{

    /**
     * @var UploaderHelper
     */
    private $uploaderHelper;


    /**
     * @var CacheManager
     */
    private $pictureManager;

    /**
     * @var UrlGeneratorInterface
     */
    private $router;

    public function __construct(UploaderHelper $uploaderHelper, CacheManager $pictureManager, UrlGeneratorInterface $router)
    {
        $this->uploaderHelper = $uploaderHelper;
        $this->pictureManager = $pictureManager;
        $this->router = $router;
    }

    /**
     * Returns the events to which this class has subscribed.
     *
     * Return format:
     *     array(
     *         array('event' => 'the-event-name', 'method' => 'onEventName', 'class' => 'some-class', 'format' => 'json'),
     *         array(...),
     *     )
     *
     * The class may be omitted if the class wants to subscribe to events of all classes.
     * Same goes for the format key.
     *
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            [
                'event' => 'serializer.post_serialize',
                'method' => 'onPostSerializeHandler',
                'class' => NoteAttachment::class,
                'format' => 'json',
                'priority' => 0
            ]
        ];
    }

    public function onPostSerializeHandler(ObjectEvent $event)
    {

        /** @var NoteAttachment $attachment */
        $attachment = $event->getObject();

        $originalAsset = $this->uploaderHelper->asset($attachment, 'imageFile');
        $sources = [];

        if (!empty($originalAsset))
        {
            //$this->router->generateUrl();
            $sources['original'] = $this->router->generate(
                'note_attachment_download',
                ['id' => $attachment->getId()],
                RouterInterface::ABSOLUTE_URL
            );
//            $sources['previewSmall'] = $this->pictureManager->getBrowserPath($originalAsset, 'note_attachment_preview_small');
//            $sources['previewMiddle'] = $this->pictureManager->getBrowserPath($originalAsset, 'note_attachment_preview_middle');
//            $sources['previewDetails'] = $this->pictureManager->getBrowserPath($originalAsset, 'note_attachment_preview_details');
//            $sources['previewNormal'] = $this->pictureManager->getBrowserPath($originalAsset, 'note_attachment_normal');
        }

        $event->getVisitor()->addData('sources', $sources);
    }
}