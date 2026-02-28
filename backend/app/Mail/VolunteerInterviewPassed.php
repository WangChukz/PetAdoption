<?php

namespace App\Mail;

use App\Models\VolunteerApplication;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VolunteerInterviewPassed extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public VolunteerApplication $application,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '🎊 Chào mừng bạn gia nhập đội ngũ TNV PetJam!',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.volunteer.interview-passed',
        );
    }
}
