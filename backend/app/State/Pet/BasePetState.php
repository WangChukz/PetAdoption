<?php

namespace App\State\Pet;

use App\Models\PetProfile;
use App\Models\AuditTrail;
use Illuminate\Support\Facades\Auth;
use Exception;

abstract class BasePetState implements PetState
{
    protected PetProfile $profile;

    public function __construct(PetProfile $profile)
    {
        $this->profile = $profile;
    }

    abstract public function getStatus(): string;

    public function canTransitionTo(string $targetStatus): bool
    {
        return in_array($targetStatus, $this->allowedTransitions());
    }

    abstract protected function allowedTransitions(): array;

    public function transitionTo(string $targetStatus, ?string $reason = null): void
    {
        if (!$this->canTransitionTo($targetStatus)) {
            throw new \App\Exceptions\Pet\InvalidTransitionException(
                $this->getStatus(),
                $targetStatus,
                $this->allowedTransitions()
            );
        }

        \Illuminate\Support\Facades\DB::transaction(function () use ($targetStatus, $reason) {
            $oldStatus = $this->profile->status;
            $this->profile->status = $targetStatus;
            $this->profile->save();

            // Record Audit Trail
            AuditTrail::create([
                'auditable_id' => $this->profile->id,
                'auditable_type' => PetProfile::class,
                'user_id' => Auth::id(),
                'old_status' => $oldStatus,
                'new_status' => $targetStatus,
                'reason' => $reason,
            ]);

            // Execute Entry Logic
            $newState = $this->profile->getState();
            $newState->onEntry();
        });
    }

    public function onEntry(): void
    {
        // Default entry logic (can be overridden)
    }
}
