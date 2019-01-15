<?php

namespace App\Form;


use App\Entity\NoteAttachment;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Vich\UploaderBundle\Form\Type\VichImageType;

class NoteAttachmentType extends CommonType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('imageFile', VichImageType::class);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        parent::configureOptions($resolver);

        $resolver->setDefaults([
            'data_class' => NoteAttachment::class,
            'allow_extra_fields' => true
        ]);
    }

}