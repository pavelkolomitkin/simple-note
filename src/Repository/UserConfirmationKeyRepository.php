<?php

namespace App\Repository;

use App\Entity\UserConfirmationKey;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\DBAL\LockMode;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method UserConfirmationKey|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserConfirmationKey|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserConfirmationKey[]    findAll()
 * @method UserConfirmationKey[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserConfirmationKeyRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, UserConfirmationKey::class);
    }
}
