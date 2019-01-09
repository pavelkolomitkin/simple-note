<?php

namespace App\Service;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;

class Mailer
{
    /**
     * @var \Swift_Mailer
     */
    private $mailer;

    private $templating;

    private $fromMail;

    private $linkHost;

    public function __construct(\Swift_Mailer $mailer, EngineInterface $templating, $fromMail, $linkHost)
    {
        $this->mailer = $mailer;
        $this->templating = $templating;

        $this->fromMail = $fromMail;
        $this->linkHost = $linkHost;
    }

    public function sendConfirmRegistrationMessage(User $user)
    {
        $message = (new \Swift_Message('Welcome to Simple Note'))
            ->setFrom($this->fromMail)
            ->setTo($user->getEmail())
            ->setBody(
                $this->templating->render('Mail\register_confirmation.html.twig', [
                    'confirmationLink' => 'http://' . $this->linkHost . '/register-confirm?key=' . $user->getConfirmationKey()->getKey()]
                )
            );

        $this->mailer->send($message);
    }
}