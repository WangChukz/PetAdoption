<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdoptionApplication;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AdoptionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = AdoptionApplication::with(['user', 'pet', 'reviewer']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('search')) {
            $query->whereHas('user', fn($q) => $q->where('name', 'like', '%' . $request->search . '%'));
        }

        $applications = $query->orderByDesc('created_at')->paginate($request->get('per_page', 15));

        return response()->json(['success' => true, 'data' => $applications]);
    }

    public function show(AdoptionApplication $adoption): JsonResponse
    {
        return response()->json(['success' => true, 'data' => $adoption->load(['user', 'pet', 'reviewer'])]);
    }

    public function update(Request $request, AdoptionApplication $adoption): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(['pending', 'interviewing', 'approved', 'rejected'])],
            'admin_notes'  => 'nullable|string',
        ]);

        $adoption->update([
            'status'      => $validated['status'],
            'notes'       => $validated['admin_notes'] ?? $adoption->notes,
        ]);

        return response()->json(['success' => true, 'data' => $adoption]);
    }

    public function destroy(AdoptionApplication $adoption): JsonResponse
    {
        $adoption->delete();
        return response()->json(['success' => true]);
    }

    // store not needed for admin — applications come from the public API
    public function store(Request $request): JsonResponse
    {
        return response()->json(['success' => false, 'error' => 'Use public /api/adoptions endpoint.'], 405);
    }
}
