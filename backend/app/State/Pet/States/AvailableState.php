<?php

namespace App\State\Pet\States;

use App\State\Pet\BasePetState;

class AvailableState extends BasePetState
{
    public function getStatus(): string
    {
        return 'AVAILABLE';
    }

    protected function allowedTransitions(): array
    {
        return ['TREATMENT']; // Force transition allowed for sickness
    }
}
