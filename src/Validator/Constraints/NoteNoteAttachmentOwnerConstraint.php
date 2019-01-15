<?php

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class NoteNoteAttachmentOwnerConstraint extends Constraint
{
    public function validatedBy()
    {
        return NoteNotePadOwnerValidator::class;
    }
}