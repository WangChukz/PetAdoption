<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AdoptionApplication;
use Illuminate\Support\Facades\DB;

class AdoptionController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate request
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'pet_id' => 'required|exists:pets,id',
        ]);

        // Sử dụng Database Transaction để đảm bảo toàn vẹn dữ liệu
        DB::beginTransaction();
        try {
            $application = AdoptionApplication::create([
                'user_id' => $request->user_id,
                'pet_id' => $request->pet_id,
                'status' => 'pending',
            ]);
            DB::commit();
            return response()->json($application, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Could not process application'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $application = AdoptionApplication::findOrFail($id);
        return response()->json($application);
    }
}
