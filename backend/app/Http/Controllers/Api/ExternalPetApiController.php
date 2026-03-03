<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PetProfile;
use Illuminate\Http\Request;

class ExternalPetApiController extends Controller
{
    /**
     * Get all pets ready for adoption (AVAILABLE status).
     * This API is intended for external website integration.
     */
    public function getAvailablePets()
    {
        $pets = PetProfile::with('pet')
            ->where('status', 'AVAILABLE')
            ->get()
            ->map(function ($profile) {
                return [
                    'id' => $profile->pet->id,
                    'uuid' => $profile->uuid,
                    'name' => $profile->pet->name,
                    'species' => $profile->pet->species,
                    'breed' => $profile->pet->breed,
                    'gender' => $profile->pet->gender,
                    'age_months' => $profile->pet->age_months,
                    'image_url' => $profile->pet->image_url,
                    'personality_tags' => $profile->pet->personality_tags,
                    'is_vaccinated' => $profile->is_vaccinated,
                    'is_neutered' => $profile->is_neutered,
                    'description' => $profile->pet->description,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $pets,
        ]);
    }

    /**
     * Force transition to TREATMENT if sickness occurs.
     */
    public function forceTreatment(Request $request, $uuid)
    {
        $profile = PetProfile::where('uuid', $uuid)->firstOrFail();
        
        try {
            $profile->transitionTo('TREATMENT', $request->input('reason', 'Emergency medical issue reported.'));
            return response()->json([
                'success' => true, 
                'message' => 'Status changed to TREATMENT successfully.'
            ]);
        } catch (\App\Exceptions\Pet\PetStateException $e) {
            return response()->json([
                'success' => false,
                'error_code' => $e->getCodeStr(),
                'message' => $e->getMessage(),
                'details' => $e->getDetails(),
            ], $e->getCode());
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error("Force Treatment Failed: " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'An unexpected error occurred while changing status.',
            ], 500);
        }
    }
}
