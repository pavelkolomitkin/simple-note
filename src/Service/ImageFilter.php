<?php

namespace App\Service;

use Liip\ImagineBundle\Service\FilterService;

class ImageFilter
{
    /**
     * @var FilterService
     */
    private $filterService;

    public function __construct(FilterService $filterService)
    {
        $this->filterService = $filterService;
    }

    public function getUrlFilteredImage($path, $filter, $resolver = null)
    {
        return $this->filterService->getUrlOfFilteredImage($path, $filter, $resolver);
    }
}