<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class AdminNotification extends Notification
{
    use Queueable;

    protected $title;
    protected $message;
    protected $link;
    protected $type;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $title, string $message, string $link = '#', string $type = 'info')
    {
        $this->title = $title;
        $this->message = $message;
        $this->link = $link;
        $this->type = $type;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title'   => $this->title,
            'message' => $this->message,
            'link'    => $this->link,
            'type'    => $this->type,
        ];
    }
}
