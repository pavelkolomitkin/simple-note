<?php

namespace App\Repository;

use App\Entity\Note;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query;
use Doctrine\ORM\QueryBuilder;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Note|null find($id, $lockMode = null, $lockVersion = null)
 * @method Note|null findOneBy(array $criteria, array $orderBy = null)
 * @method Note[]    findAll()
 * @method Note[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NoteRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Note::class);
    }

    /**
     * @param array $criteria
     * @return \Doctrine\ORM\Query
     */
    public function getSearchQuery(array $criteria = []): Query
    {
        $builder = $this->createQueryBuilder('note');

        $this->handleSearchOwnerParameter($builder, $criteria);

        $builder->orderBy('note.createdAt', 'DESC');

        return $builder->getQuery();
    }

    private function handleSearchOwnerParameter(QueryBuilder $builder, array $criteria, $entityAlias = 'note')
    {
        if (isset($criteria['owner']))
        {
            $builder
                ->join( $entityAlias . '.notePad', 'notePad', 'WITH', 'notePad.user = :user')
                ->setParameter('user', $criteria['owner']);
        }

        return $builder;
    }
}
