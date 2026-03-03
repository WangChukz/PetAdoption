<?php

namespace App\State\Pet\States;

use App\State\Pet\BasePetState;
use App\Models\CareTask;
use Carbon\Carbon;

class TreatmentState extends BasePetState
{
    public function getStatus(): string
    {
        return 'TREATMENT';
    }

    protected function allowedTransitions(): array
    {
        return ['QUARANTINE', 'SCREENING'];
    }

    public function onEntry(): void
    {
        // Auto-generate Medication Task
        CareTask::create([
            'pet_profile_id' => $this->profile->id,
            'task_name' => 'Administer Medication',
            'description' => 'Follow medical prescription protocol.',
            'due_date' => Carbon::now()->addHours(4),
        ]);
    }
}
