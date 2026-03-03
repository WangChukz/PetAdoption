<?php

namespace App\State\Pet\States;

use App\State\Pet\BasePetState;

class QuarantineState extends BasePetState
{
    public function getStatus(): string
    {
        return 'QUARANTINE';
    }

    protected function allowedTransitions(): array
    {
        return ['SCREENING', 'READY_FOR_REVIEW'];
    }
}
