<?php

namespace App\Entity;

use App\Validator\Constraints\NoteNoteAttachmentOwnerConstraint;
use App\Validator\Constraints\NoteNotePadOwnerConstraint;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Gedmo\Mapping\Annotation as Gedmo;
use JMS\Serializer\Annotation as JMSSerializer;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\NoteRepository")
 * @ORM\Table(name="note")
 *
 * @Gedmo\SoftDeleteable(fieldName="deletedAt")
 * @JMSSerializer\ExclusionPolicy("all")
 */
class Note
{
    use SerializeTimestampableTrait;
    use SoftDeleteableEntity;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @JMSSerializer\Groups({"default"})
     * @JMSSerializer\Expose
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="content", type="text")
     *
     * @Assert\NotBlank()
     * @Assert\Length(max="1000")
     *
     * @JMSSerializer\Groups({"default"})
     * @JMSSerializer\Expose
     */
    private $content;

    /**
     * @var NotePad
     * @Assert\NotNull(message="Select a NotePad!")
     * @NoteNotePadOwnerConstraint()
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\NotePad", inversedBy="notes", cascade={"persist"})
     * @ORM\JoinColumn(name="notepad_id", nullable=false)
     *
     * @JMSSerializer\Groups({"default"})
     * @JMSSerializer\Expose
     */
    private $notePad;

    /**
     * @var ArrayCollection
     * @Assert\All(
     *     @NoteNoteAttachmentOwnerConstraint()
     * )
     *
     * @ORM\OneToMany(targetEntity="App\Entity\NoteAttachment", mappedBy="note", cascade={"persist", "remove"}, orphanRemoval=true)
     *
     * @JMSSerializer\Groups({"default"})
     * @JMSSerializer\Expose
     *
     */
    private $attachments;

    public function __construct()
    {
        $this->attachments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getContent(): string
    {
        return (string)$this->content;
    }

    /**
     * @param mixed $content
     * @return Note
     */
    public function setContent(string $content = null): self
    {
        $this->content = $content;
        return $this;
    }

    /**
     * @return NotePad
     */
    public function getNotePad()
    {
        return $this->notePad;
    }

    /**
     * @param NotePad $notePad
     * @return Note
     */
    public function setNotePad(NotePad $notePad = null): self
    {
        $this->notePad = $notePad;
        return $this;
    }

    /**
     * Get attachments
     *
     * @return ArrayCollection
     */
    public function getAttachments()
    {
        return $this->attachments;
    }

    /**
     * Set attachments
     *
     * @param $attachments
     * @return Note
     */
    public function setAttachments($attachments): self
    {
        $this->attachments = $attachments;

        return $this;
    }

    /**
     * Add attachment
     *
     * @param NoteAttachment $attachment
     * @return $this
     */
    public function addAttachment(NoteAttachment $attachment)
    {
        if (!$this->attachments->contains($attachment))
        {
            $this->attachments[] = $attachment;
            $attachment->setNote($this);
        }

        return $this;
    }


    /**
     * Remove attachment
     *
     * @param NoteAttachment $attachment
     * @return $this
     */
    public function removeAttachment(NoteAttachment $attachment)
    {
        if ($this->attachments->contains($attachment))
        {
            $this->attachments->removeElement($attachment);
        }

        return $this;
    }
}
