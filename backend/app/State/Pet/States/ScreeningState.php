<?php

namespace App\State\Pet\States;

use App\State\Pet\BasePetState;

class ScreeningState extends BasePetState
{
    public function getStatus(): string
    {
        return 'SCREENING';
    }

    protected function allowedTransitions(): array
    {
        return ['TREATMENT', 'QUARANTINE'];
    }
}
