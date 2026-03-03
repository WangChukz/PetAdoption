<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pet;

class FixMissingProfilesSeeder extends Seeder
{
    public function run()
    {
        $pets = Pet::whereDoesntHave('petProfile')->get();
        foreach ($pets as $pet) {
            $pet->petProfile()->create([
                'status' => 'INTAKE',
                'is_vaccinated' => false,
                'is_neutered' => false,
                'medical_history' => [],
            ]);
            echo "Created profile for Pet #{$pet->id}\n";
        }
    }
}
