<?php

namespace App\Service;

use Liip\ImagineBundle\Binary\BinaryInterface;
use Liip\ImagineBundle\Exception\Imagine\Cache\Resolver\NotResolvableException;
use Liip\ImagineBundle\Imagine\Cache\Resolver\ResolverInterface;
use Symfony\Component\Filesystem\Filesystem;

class ImageFilePathResolver implements ResolverInterface
{
    /**
     * @var Filesystem
     */
    private $fileSystem;

    /**
     * @var string
     */
    private $rootPath;

    public function __construct(
        Filesystem $filesystem,
        string $rootPath
    )
    {
        $this->fileSystem = $filesystem;
        $this->rootPath = $rootPath;
    }

    /**
     * Checks whether the given path is stored within this Resolver.
     *
     * @param string $path
     * @param string $filter
     *
     * @return bool
     */
    public function isStored($path, $filter)
    {
        return is_file($this->getFilePath($path, $filter));
    }

    /**
     * Resolves filtered path for rendering in the browser.
     *
     * @param string $path The path where the original file is expected to be
     * @param string $filter The name of the imagine filter in effect
     *
     * @throws NotResolvableException
     *
     * @return string The absolute URL of the cached image
     */
    public function resolve($path, $filter)
    {
        return $this->getFilePath($path, $filter);
    }

    /**
     * Stores the content of the given binary.
     *
     * @param BinaryInterface $binary The image binary to store
     * @param string $path The path where the original file is expected to be
     * @param string $filter The name of the imagine filter in effect
     */
    public function store(BinaryInterface $binary, $path, $filter)
    {
        $this->fileSystem->dumpFile($this->getFilePath($path, $filter), $binary->getContent());
    }

    /**
     * @param string[] $paths The paths where the original files are expected to be
     * @param string[] $filters The imagine filters in effect
     */
    public function remove(array $paths, array $filters)
    {
        foreach ($paths as $path) {
            foreach ($filters as $filter) {
                $this->fileSystem->remove($this->getFilePath($path, $filter));
            }
        }
    }

    protected function getFilePath(string $path, string $filter): string
    {
        $fileName = basename($path);
        $baseFileDirectory = dirname($path);

        $result = $this->rootPath . $baseFileDirectory . DIRECTORY_SEPARATOR . $filter  . DIRECTORY_SEPARATOR . $fileName;

        return $result;
    }
}