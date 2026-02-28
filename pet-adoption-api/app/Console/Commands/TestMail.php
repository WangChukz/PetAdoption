<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestMail extends Command
{
    protected $signature = 'mail:test {to}';
    protected $description = 'Send a test email to verify SMTP configuration';

    public function handle(): void
    {
        $to = $this->argument('to');
        $this->info("Sending test email to: {$to}");

        Mail::raw('✅ Đây là email test từ hệ thống PetJam. SMTP đã được cấu hình thành công!', function ($message) use ($to) {
            $message->to($to)->subject('🐾 Test SMTP – PetJam');
        });

        $this->info('Email sent successfully!');
    }
}
