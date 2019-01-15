<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Gedmo\Mapping\Annotation as Gedmo;
use JMS\Serializer\Annotation as JMSSerializer;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Vich\UploaderBundle\Entity\File as EmbeddedFile;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @ORM\Entity(repositoryClass="App\Repository\NoteAttachmentRepository")
 * @ORM\Table(name="note_attachment")
 * @Gedmo\SoftDeleteable(fieldName="deletedAt")
 *
 * @Vich\Uploadable
 *
 * @JMSSerializer\ExclusionPolicy("all")
 */
class NoteAttachment
{
    use TimestampableEntity;
    use SoftDeleteableEntity;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @JMSSerializer\Groups({"default"})
     */
    private $id;

    /**
     * @var Note
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Note", inversedBy="attachments")
     * @ORM\JoinColumn(name="note_id", nullable=true)
     * @JMSSerializer\Groups({"default"})
     */
    private $note;

    /**
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="uploadAttachments")
     * @ORM\JoinColumn(name="owner_id", nullable=false)
     */
    private $owner;

    /**
     * @Assert\Image(maxSize="5M")
     * @Vich\UploadableField(mapping="note_attachment", fileNameProperty="image.name", size="image.size", mimeType="image.mimeType", originalName="image.originalName", dimensions="image.dimensions")
     *
     * @var File
     */
    private $imageFile;

    /**
     * @ORM\Embedded(class="Vich\UploaderBundle\Entity\File")
     *
     * @var EmbeddedFile
     */
    private $image;

    public function __construct()
    {
        $this->image = new EmbeddedFile();
    }

    /**
     *
     * @param File|UploadedFile $image
     * @return $this
     * @throws \Exception
     */
    public function setImageFile(?File $image = null)
    {
        $this->imageFile = $image;

        if (null !== $image)
        {
            $this->updatedAt = new \DateTime();
        }

        return $this;
    }

    public function getImageFile(): ?File
    {
        return $this->imageFile;
    }

    public function setImage(EmbeddedFile $image)
    {
        $this->image = $image;

        return $this;
    }

    public function getImage(): ?EmbeddedFile
    {
        return $this->image;
    }

    public function __toString()
    {
        return $this->getImage()->getOriginalName();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Note
     */
    public function getNote(): Note
    {
        return $this->note;
    }

    /**
     * @param Note $note
     * @return NoteAttachment
     */
    public function setNote(Note $note = null): self
    {
        $this->note = $note;
        return $this;
    }

    /**
     * @return User
     */
    public function getOwner(): User
    {
        return $this->owner;
    }

    /**
     * @param User $owner
     * @return NoteAttachment
     */
    public function setOwner(User $owner): self
    {
        $this->owner = $owner;
        return $this;
    }
}
