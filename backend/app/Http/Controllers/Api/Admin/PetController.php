<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pet;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class PetController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Pet::query();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('species')) {
            $query->where('species', $request->species);
        }
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $pets = $query->orderByDesc('created_at')->paginate($request->get('per_page', 15));

        return response()->json(['success' => true, 'data' => $pets]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'             => 'required|string|max:255',
            'species'          => 'required|string|max:100',
            'breed'            => 'nullable|string|max:100',
            'description'      => 'nullable|string',
            'age_months'       => 'nullable|integer|min:0',
            'gender'           => ['nullable', Rule::in(['male', 'female', 'unknown'])],
            'status'           => ['nullable', Rule::in(['available', 'adopted', 'in_treatment', 'hidden'])],
            'personality_tags' => 'nullable|array',
            'image'            => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        if ($request->hasFile('image')) {
            $validated['image_url'] = $request->file('image')->store('pets', 'public');
        }
        unset($validated['image']);

        $pet = Pet::create($validated);

        return response()->json(['success' => true, 'data' => $pet], 201);
    }

    public function show(Pet $pet): JsonResponse
    {
        return response()->json(['success' => true, 'data' => $pet->load('adoptionApplications')]);
    }

    public function update(Request $request, Pet $pet): JsonResponse
    {
        $validated = $request->validate([
            'name'             => 'sometimes|string|max:255',
            'species'          => 'sometimes|string|max:100',
            'breed'            => 'nullable|string|max:100',
            'description'      => 'nullable|string',
            'age_months'       => 'nullable|integer|min:0',
            'gender'           => ['nullable', Rule::in(['male', 'female', 'unknown'])],
            'status'           => ['nullable', Rule::in(['available', 'adopted', 'in_treatment', 'hidden'])],
            'personality_tags' => 'nullable|array',
            'image'            => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        if ($request->hasFile('image')) {
            if ($pet->image_url) Storage::disk('public')->delete($pet->image_url);
            $validated['image_url'] = $request->file('image')->store('pets', 'public');
        }
        unset($validated['image']);

        $pet->update($validated);

        return response()->json(['success' => true, 'data' => $pet]);
    }

    public function destroy(Pet $pet): JsonResponse
    {
        // Guard: block hard delete if pending adoptions exist
        if ($pet->adoptionApplications()->where('status', 'pending')->exists()) {
            return response()->json([
                'success' => false,
                'error'   => 'Không thể xoá thú cưng này vì đang có đơn nhận nuôi đang chờ duyệt.',
            ], 422);
        }
        $pet->delete(); // Soft delete
        return response()->json(['success' => true, 'message' => 'Đã xoá.']);
    }

    public function updateStatus(Request $request, Pet $pet): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(['available', 'adopted', 'in_treatment', 'hidden'])],
        ]);
        $pet->update($validated);
        return response()->json(['success' => true, 'data' => $pet]);
    }
}
