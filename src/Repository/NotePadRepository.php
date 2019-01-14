<?php

namespace App\Repository;

use App\Entity\NotePad;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method NotePad|null find($id, $lockMode = null, $lockVersion = null)
 * @method NotePad|null findOneBy(array $criteria, array $orderBy = null)
 * @method NotePad[]    findAll()
 * @method NotePad[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NotePadRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, NotePad::class);
    }

    // /**
    //  * @return NotePad[] Returns an array of NotePad objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('n.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?NotePad
    {
        return $this->createQueryBuilder('n')
            ->andWhere('n.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
