<?php

namespace App\Exceptions;

use Exception;

class UploadException extends Exception
{
    protected $details;

    public function __construct(string $message, array $details = [], int $code = 500)
    {
        parent::__construct($message, $code);
        $this->details = $details;
    }

    public function getDetails(): array
    {
        return $this->details;
    }
}
