<?php

namespace App\State\Pet;

use App\Models\PetProfile;

interface PetState
{
    public function transitionTo(string $targetStatus, ?string $reason = null): void;
    
    public function canTransitionTo(string $targetStatus): bool;
    
    public function getStatus(): string;
    
    public function onEntry(): void;
}
