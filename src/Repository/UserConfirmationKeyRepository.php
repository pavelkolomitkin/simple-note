<?php

namespace App\Repository;

use App\Entity\UserConfirmationKey;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
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

    // /**
    //  * @return UserConfirmationKey[] Returns an array of UserConfirmationKey objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?UserConfirmationKey
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
