<?php

namespace App\Entity;


use Gedmo\Timestampable\Traits\TimestampableEntity;

use JMS\Serializer\Annotation as JMSSerializer;

trait SerializeTimestampableTrait
{
    use TimestampableEntity;

    /**
     * @return \DateTime
     * @JMSSerializer\VirtualProperty(name="createdAt")
     * @JMSSerializer\Groups({"default"})
     * @JMSSerializer\Expose
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @return \DateTime
     * @JMSSerializer\VirtualProperty(name="updatedAt")
     * @JMSSerializer\Groups({"default"})
     * @JMSSerializer\Expose
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }
}