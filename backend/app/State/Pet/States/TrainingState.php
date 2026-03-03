<?php

namespace App\State\Pet\States;

use App\State\Pet\BasePetState;

class TrainingState extends BasePetState
{
    public function getStatus(): string
    {
        return 'TRAINING';
    }

    protected function allowedTransitions(): array
    {
        return ['READY_FOR_REVIEW'];
    }
}
