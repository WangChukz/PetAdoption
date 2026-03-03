<?php

namespace App\State\Pet\States;

use App\State\Pet\BasePetState;

class ReadyReviewState extends BasePetState
{
    public function getStatus(): string
    {
        return 'READY_FOR_REVIEW';
    }

    protected function allowedTransitions(): array
    {
        return ['TRAINING', 'AVAILABLE'];
    }
}
