<?php

namespace App\Repository;

use App\Entity\NoteAttachment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method NoteAttachment|null find($id, $lockMode = null, $lockVersion = null)
 * @method NoteAttachment|null findOneBy(array $criteria, array $orderBy = null)
 * @method NoteAttachment[]    findAll()
 * @method NoteAttachment[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NoteAttachmentRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, NoteAttachment::class);
    }

    // /**
    //  * @return NoteAttachment[] Returns an array of NoteAttachment objects
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
    public function findOneBySomeField($value): ?NoteAttachment
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
