<?php

namespace App\Mail;

use App\Models\VolunteerApplication;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VolunteerCvRejected extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public VolunteerApplication $application,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Kết quả xét hồ sơ tình nguyện viên – PetJam',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.volunteer.cv-rejected',
        );
    }
}
