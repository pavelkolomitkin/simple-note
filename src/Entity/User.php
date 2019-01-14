<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\SoftDeleteable\Traits\SoftDeleteableEntity;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Security\Core\User\UserInterface;
use JMS\Serializer\Annotation as JMSSerializer;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ORM\Table(name="users")
 * @Gedmo\SoftDeleteable(fieldName="deletedAt")
 * @JMSSerializer\ExclusionPolicy("all")
 *
 * @UniqueEntity("email", message="User with that email is already exist!")
 */
class User implements UserInterface
{
    use TimestampableEntity;
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
     * @ORM\Column(type="string", length=180, unique=true)
     *
     * @Assert\NotBlank()
     * @Assert\Email()
     *
     * @JMSSerializer\Groups({"default"})
     * @JMSSerializer\Expose
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="full_name", type="string", length=255, nullable=false)
     *
     * @Assert\NotBlank()
     * @Assert\Length(max="255")
     *
     * @JMSSerializer\Groups({"default"})
     * @JMSSerializer\Expose
     */
    private $fullName;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     *
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @var boolean
     * @ORM\Column(name="is_active", type="boolean", nullable=false)
     */
    private $isActive = false;

    /**
     * @var UserConfirmationKey
     *
     * @ORM\OneToOne(targetEntity="App\Entity\UserConfirmationKey", mappedBy="user", cascade={"persist", "remove"})
     */
    private $confirmationKey;


    /**
     * @var ArrayCollection
     * @ORM\OneToMany(targetEntity="App\Entity\NotePad", mappedBy="user", cascade={"persist", "remove"}, orphanRemoval=true)
     */
    private $notePads;

    public function __construct()
    {
        $this->notePads = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email = null): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @return string
     */
    public function getFullName(): string
    {
        return (string) $this->fullName;
    }

    /**
     * @param string $fullName
     * @return User
     */
    public function setFullName(string $fullName = null): self
    {
        $this->fullName = $fullName;
        return $this;
    }


    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return bool
     */
    public function isActive(): bool
    {
        return (bool) $this->isActive;
    }

    /**
     * @param bool $isActive
     * @return User
     */
    public function setIsActive(bool $isActive): self
    {
        $this->isActive = $isActive;
        return $this;
    }

    /**
     * @return UserConfirmationKey
     */
    public function getConfirmationKey(): UserConfirmationKey
    {
        return $this->confirmationKey;
    }

    /**
     * @param UserConfirmationKey $confirmationKey
     * @return User
     */
    public function setConfirmationKey(UserConfirmationKey $confirmationKey): User
    {
        $this->confirmationKey = $confirmationKey;
        $confirmationKey->setUser($this);

        return $this;
    }

    /**
     * @return ArrayCollection
     */
    public function getNotePads()
    {
        return $this->notePads;
    }

    /**
     * Add notePad
     *
     * @param NotePad $notePad
     * @return User
     */
    public function addNotePad(NotePad $notePad): self
    {
        if (!$this->notePads->contains($notePad))
        {
            $this->notePads[] = $notePad;
            $notePad->setUser($this);
        }

        return $this;
    }

    /**
     * Remove notePad
     * @param NotePad $notePad
     * @return User
     */
    public function removeNotePad(NotePad $notePad): self
    {
        if ($this->notePads->contains($notePad))
        {
            $this->notePads->removeElement($notePad);
        }

        return $this;
    }
}
