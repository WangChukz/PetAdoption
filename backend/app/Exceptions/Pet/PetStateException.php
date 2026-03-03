<?php

namespace App\Exceptions\Pet;

use Exception;

class PetStateException extends Exception
{
    protected string $code_str;
    protected array $details;

    public function __construct(string $message, string $code_str = 'PET_STATE_ERROR', array $details = [], int $code = 422)
    {
        parent::__construct($message, $code);
        $this->code_str = $code_str;
        $this->details = $details;
    }

    public function getCodeStr(): string
    {
        return $this->code_str;
    }

    public function getDetails(): array
    {
        return $this->details;
    }
}
