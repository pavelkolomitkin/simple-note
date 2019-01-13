<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserConfirmationKeyRepository")
 */
class UserConfirmationKey
{
    use TimestampableEntity;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=255, unique=true)
     */
    private $key;

    /**
     * @var boolean
     *
     * @ORM\Column(name="is_activated", type="boolean")
     */
    private $isActivated = false;

    /**
     * @var User
     *
     * @ORM\OneToOne(targetEntity="App\Entity\User", inversedBy="confirmationKey")
     * @ORM\JoinColumn(name="user_id", nullable=false)
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getKey(): ?string
    {
        return $this->key;
    }

    public function setKey(string $key): self
    {
        $this->key = $key;

        return $this;
    }

    /**
     * @return bool
     */
    public function isActivated(): bool
    {
        return $this->isActivated;
    }

    /**
     * @param bool $isActivated
     * @return UserConfirmationKey
     */
    public function setIsActivated(bool $isActivated): UserConfirmationKey
    {
        $this->isActivated = $isActivated;
        return $this;
    }

    /**
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }

    /**
     * @param User $user
     * @return UserConfirmationKey
     */
    public function setUser(User $user): UserConfirmationKey
    {
        $this->user = $user;
        return $this;
    }

    public static function generateRandomKey($salt = '')
    {
        return sha1(rand(0, 999999) . $salt);
    }
}
