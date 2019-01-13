<?php

namespace App\Service;

use App\Entity\User;
use App\Entity\UserConfirmationKey;
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

    public function sendConfirmRegistrationMessage(UserConfirmationKey $confirmationKey)
    {
        $user = $confirmationKey->getUser();

        $message = (new \Swift_Message('Welcome to Simple Note'))
            ->setFrom($this->fromMail)
            ->setTo($user->getEmail())
            ->setBody(
                $this->templating->render('Mail\register_confirmation.html.twig', [
                    'confirmationLink' => 'http://' . $this->linkHost . '/security/register-confirm/' . $confirmationKey->getKey()]
                )
            );

        $this->mailer->send($message);
    }
}