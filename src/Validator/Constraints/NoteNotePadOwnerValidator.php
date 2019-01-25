<?php

namespace App\Validator\Constraints;


use App\Entity\NotePad;
use App\Service\UserAwareServiceTrait;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

/**
 * Class NoteNotePadOwnerValidator
 * @package App\Validator\Constraints
 */
class NoteNotePadOwnerValidator extends ConstraintValidator
{
    use UserAwareServiceTrait;

    /**
     * Checks if the passed value is valid.
     *
     * @param NotePad $value The value that should be validated
     * @param Constraint $constraint The constraint for the validation
     */
    public function validate($value, Constraint $constraint)
    {
        if ((empty($value)) || $value->getUser() !== $this->getUser())
        {
            $this->context->addViolation('You can use only your own notepad!');
        }
    }
}