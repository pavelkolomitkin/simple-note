<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Gedmo\Mapping\Annotation as Gedmo;
use JMS\Serializer\Annotation as JMSSerializer;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;


/**
 * @ORM\Entity(repositoryClass="App\Repository\NoteRepository")
 * @ORM\Table(name="note")
 *
 * @Gedmo\SoftDeleteable(fieldName="deletedAt")
 * @JMSSerializer\ExclusionPolicy("all")
 */
class Note
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
     * @var string
     *
     * @ORM\Column(name="content", type="text")
     * @JMSSerializer\Groups({"default"})
     */
    private $content;

    /**
     * @var NotePad
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\NotePad", inversedBy="notes")
     * @ORM\JoinColumn(name="notepad_id", nullable=false)
     */
    private $notePad;

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getContent(): string
    {
        return $this->content;
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
    public function getNotePad(): NotePad
    {
        return $this->notePad;
    }

    /**
     * @param NotePad $notePad
     * @return Note
     */
    public function setNotePad(NotePad $notePad): Note
    {
        $this->notePad = $notePad;
        return $this;
    }
}
