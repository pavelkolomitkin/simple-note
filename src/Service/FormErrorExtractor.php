<?php

namespace App\Service;


use Symfony\Component\Form\FormInterface;

class FormErrorExtractor
{
    /**
     * Extract form errors with recursive mode and return an array
     *
     * @param FormInterface $form
     * @return array
     */
    public function extract(FormInterface $form)
    {
        $errors = array();
        foreach ($form->getErrors() as $error) {
            $errors[] = $error->getMessage();
        }
        foreach ($form->all() as $childForm) {
            if ($childForm instanceof FormInterface) {
                if ($childErrors = $this->extract($childForm)) {
                    $errors[$childForm->getName()] = $childErrors;
                }
            }
        }
        return $errors;
    }
}