<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pet;

class PetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Lấy danh sách thú cưng sẵn sàng nhận nuôi để hiển thị trên web
        $query = Pet::where('status', 'available');

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('species') && $request->species !== 'Loài') {
            $query->where('species', $request->species);
        }

        if ($request->filled('breed') && $request->breed !== 'Giống') {
            $query->where('breed', 'like', '%' . $request->breed . '%');
        }

        if ($request->filled('age')) {
            $age = $request->age;
            if ($age === 'Dưới 1 tuổi') {
                $query->where('age_months', '<', 12);
            } elseif ($age === '1 - 3 tuổi') {
                $query->whereBetween('age_months', [12, 36]);
            } elseif ($age === 'Trên 3 tuổi') {
                $query->where('age_months', '>', 36);
            }
        }

        $pets = $query->orderBy('id', 'desc')->paginate(12);

        return response()->json($pets);
    }

    public function show($id)
    {
        $pet = Pet::with('gallery')->findOrFail($id);
        return response()->json($pet);
    }
}
