<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAdoptionApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'pet_id' => 'required|exists:pets,id',
            'full_name' => 'required|string|min:2|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'address' => 'required|string|min:10',
            
            'home_type' => 'required|string|in:house,apartment,condo,other',
            'ownership' => 'required|string|in:own,rent',
            'has_fenced_yard' => 'required|boolean',
            'adults_count' => 'required|integer|min:1',
            'children_count' => 'nullable|integer|min:0',
            'has_allergy' => 'required|boolean',
            
            'has_pet_experience' => 'required|boolean',
            'current_pets' => 'nullable|string',
            'hours_alone' => 'required|integer|min:0|max:24',
            'sleep_arrangements' => 'required|string|min:5',
            'motivation' => 'required|string|min:20',
        ];
    }
}
