<?php

namespace App\Policies;

use App\Models\PetProfile;
use App\Models\User;

class PetProfilePolicy
{
    /**
     * Determine whether the user can update the pet profile's medical data.
     */
    public function updateMedical(User $user, PetProfile $petProfile): bool
    {
        return in_array($user->role, ['super_admin', 'staff', 'vet']);
    }

    /**
     * Determine whether the user can create care logs.
     */
    public function createLog(User $user, PetProfile $petProfile): bool
    {
        return in_array($user->role, ['super_admin', 'staff', 'vet', 'volunteer']);
    }

    /**
     * Determine whether the user can view the pet profile.
     */
    public function view(User $user, PetProfile $petProfile): bool
    {
        return true; // All internal users can view
    }
}
