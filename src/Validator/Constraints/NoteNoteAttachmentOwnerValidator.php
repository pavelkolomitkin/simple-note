<?php

namespace App\Validator\Constraints;

use App\Entity\NoteAttachment;
use App\Service\UserAwareServiceTrait;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class NoteNoteAttachmentOwnerValidator extends ConstraintValidator
{
    use UserAwareServiceTrait;

    /**
     * Checks if the passed value is valid.
     *
     * @param NoteAttachment $value The value that should be validated
     * @param Constraint $constraint The constraint for the validation
     */
    public function validate($value, Constraint $constraint)
    {
        if ($value->getOwner() !== $this->getUser())
        {
            $this->context->addViolation('You can use only attachments uploaded by your own!');
        }
    }
}