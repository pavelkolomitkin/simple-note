<?php

namespace App\Repository;

use App\Entity\NotePad;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query;
use Doctrine\ORM\QueryBuilder;
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

    /**
     * @param array $criteria
     * @return \Doctrine\ORM\Query
     */
    public function getSearchQuery(array $criteria = []): Query
    {
        $builder = $this->createQueryBuilder('np');

        $this->handleSearchTitleParameter($builder, $criteria, 'np');
        $this->handleSearchOwnerParameter($builder, $criteria, 'np');

        $builder
            ->leftJoin('np.notes', 'note', 'WITH')
            ->groupBy('np.id')
            ->select('np as notePad')
            ->addSelect('COUNT(note) as noteNumber');

        $builder->orderBy('np.id', 'DESC');

        return $builder->getQuery();
    }

    private function handleSearchOwnerParameter(QueryBuilder $builder, array $criteria, $entityAlias = 'notePad')
    {
        if (isset($criteria['owner']))
        {
            $builder
                ->andWhere($entityAlias . '.user = :owner')
                ->setParameter('owner', $criteria['owner']);
        }

        return $builder;
    }

    private function handleSearchTitleParameter(QueryBuilder $builder, array $criteria, $entityAlias = 'notePad')
    {
        if (isset($criteria['title']) && (trim($criteria['title']) !== ''))
        {
            $title = trim($criteria['title']);

            $builder
                ->andWhere($entityAlias . '.title LIKE :title')
                ->setParameter('title', $title . '%');
        }

        return $builder;
    }
}
