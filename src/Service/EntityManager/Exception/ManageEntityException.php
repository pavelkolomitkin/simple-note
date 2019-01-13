<?php

namespace App\Service\EntityManager\Exception;

class ManageEntityException extends \Exception
{
    const CREATE_ENTITY_ERROR_TYPE = 1;

    const UPDATE_ENTITY_ERROR_TYPE = 2;

    const DELETE_ENTITY_ERROR_TYPE = 3;

    const READ_ENTITY_ERROR_TYPE = 4;

    /**
     * @var integer
     */
    protected $type;

    /**
     * @var array
     */
    protected $errors = [];

    public function __construct(array $errors, $type = self::CREATE_ENTITY_ERROR_TYPE, $message = "", $code = 0, \Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);

        $this->errors = $errors;
        $this->type = $type;
    }

    /**
     * @return array
     */
    public function getErrors()
    {
        return $this->errors;
    }


    /**
     * Set error type
     * @param $type
     * @return $this
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get error type
     *
     * @return int
     */
    public function getType()
    {
        return $this->type;
    }
}