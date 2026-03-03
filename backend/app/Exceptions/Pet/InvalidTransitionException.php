<?php

namespace App\Exceptions\Pet;

class InvalidTransitionException extends PetStateException
{
    public function __construct(string $from, string $to, array $allowed = [])
    {
        parent::__construct(
            "Invalid status transition from {$from} to {$to}.",
            'INVALID_TRANSITION',
            [
                'from' => $from,
                'to' => $to,
                'allowed_transitions' => $allowed
            ]
        );
    }
}
