<?php

namespace App\State\Pet\States;

use App\State\Pet\BasePetState;
use App\Models\CareTask;
use Carbon\Carbon;

class IntakeState extends BasePetState
{
    public function getStatus(): string
    {
        return 'INTAKE';
    }

    protected function allowedTransitions(): array
    {
        return ['SCREENING'];
    }

    public function onEntry(): void
    {
        // Auto-generate Screen Task
        CareTask::create([
            'pet_profile_id' => $this->profile->id,
            'task_name' => 'Initial Screening',
            'description' => 'Perform basic medical and physical screening.',
            'due_date' => Carbon::now()->addDay(),
        ]);
    }
}
