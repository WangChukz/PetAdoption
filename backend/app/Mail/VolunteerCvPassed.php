<?php

namespace App\Mail;

use App\Models\VolunteerApplication;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VolunteerCvPassed extends Mailable
{
    use Queueable, SerializesModels;

    public string $confirmUrl;

    public function __construct(
        public VolunteerApplication $application,
        public string $interviewDate,
    ) {
        // Link goes to the Next.js frontend which then calls the API
        $this->confirmUrl = rtrim(env('FRONTEND_URL', 'http://localhost:3000'), '/')
            . '/confirm-interview?token=' . $application->interview_token;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '🎉 Chúc mừng! Bạn đã vượt vòng xét CV – Lịch phỏng vấn tại PetJam',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.volunteer.cv-passed',
        );
    }
}
