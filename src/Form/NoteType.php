<?php

namespace App\Form;

use App\Entity\Note;
use App\Entity\NoteAttachment;
use App\Entity\NotePad;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class NoteType extends CommonType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('content')
            ->add('notePad', EntityType::class, [
                'class' => NotePad::class,
                'multiple' => false,
                //'by_reference' => false,
                'expanded' => true
            ])
            ->add('attachments', EntityType::class, [
                'class' => NoteAttachment::class,
                'multiple' => true,
                'by_reference' => false,
                'expanded' => true
            ])
            ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        parent::configureOptions($resolver);

        $resolver->setDefaults([
            'data_class' => Note::class
        ]);
    }
}