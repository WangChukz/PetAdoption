<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pet;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class PetController extends Controller
{
    public function metadata(): JsonResponse
    {
        $species = Pet::select('species')
            ->distinct()
            ->whereNotNull('species')
            ->pluck('species')
            ->sort()
            ->values();

        $breedsBySpecies = Pet::select('species', 'breed')
            ->distinct()
            ->whereNotNull('species')
            ->whereNotNull('breed')
            ->get()
            ->groupBy('species')
            ->map(function ($items) {
                return $items->pluck('breed')->sort()->values();
            });

        return response()->json([
            'success' => true,
            'data' => [
                'species' => $species,
                'breeds'  => $breedsBySpecies
            ]
        ]);
    }

    public function index(Request $request): JsonResponse
    {
        $query = Pet::with('petProfile');

        if ($request->filled('status')) {
            $query->whereHas('petProfile', function($q) use ($request) {
                $q->where('status', $request->status);
            });
        }
        if ($request->filled('species')) {
            $query->where('species', $request->species);
        }
        if ($request->filled('breed')) {
            $query->where('breed', 'like', '%' . $request->breed . '%');
        }
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }
        if ($request->filled('start_date')) {
            $query->whereHas('petProfile', function($q) use ($request) {
                $q->whereDate('intake_date', '>=', $request->start_date);
            });
        }
        if ($request->filled('end_date')) {
            $query->whereHas('petProfile', function($q) use ($request) {
                $q->whereDate('intake_date', '<=', $request->end_date);
            });
        }

        $pets = $query->orderByDesc('created_at')->paginate($request->get('per_page', 15));

        return response()->json(['success' => true, 'data' => $pets]);
    }
    
    public function store(Request $request): JsonResponse
    {
        if ($request->has('personality_tags') && is_string($request->personality_tags)) {
            $request->merge(['personality_tags' => json_decode($request->personality_tags, true)]);
        }

        $validated = $request->validate([
            'name'             => 'required|string|max:255',
            'species'          => 'required|string|max:100',
            'breed'            => 'nullable|string|max:100',
            'description'      => 'nullable|string',
            'age_months'       => 'nullable|integer|min:0',
            'gender'           => ['nullable', Rule::in(['male', 'female', 'unknown'])],
            'personality_tags' => 'nullable|array',
            'image'            => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'status'           => 'nullable|string',
            'is_vaccinated'    => 'nullable',
            'is_neutered'      => 'nullable',
            'medical_history'  => 'nullable',
            'location'         => 'nullable|string|max:255',
            'intake_date'      => 'nullable|date',
            'microchip'        => 'nullable|string|max:255',
            'color'            => 'nullable|string|max:100',
            'activity_level'   => 'nullable|string|max:100',
            'weight_kg'        => 'nullable|numeric|min:0',
            'foster_name'      => 'nullable|string|max:255',
            'foster_email'     => 'nullable|email|max:255',
            'foster_phone'     => 'nullable|string|max:20',
            'gallery'          => 'nullable|array',
            'gallery.*'        => 'image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        if ($request->hasFile('image')) {
            $validated['image_url'] = \App\Helpers\UploadHelper::upload($request->file('image'), 'pets');
        }
        unset($validated['image']);

        // Separate Profile fields from Pet fields
        $profileFieldsList = [
            'is_vaccinated', 'is_neutered', 'medical_history', 'status', 'personality_tags',
            'location', 'intake_date', 'microchip', 'color', 
            'activity_level', 'weight_kg', 'foster_name', 'foster_email', 'foster_phone'
        ];
        
        // Remove gallery from validated to avoid issues with array fields not on model
        $galleryFiles = $request->file('gallery', []);
        unset($validated['gallery']);

        // Note: personality_tags is on Pet model, so remove it from profile list for separation logic
        $profileFieldsOnly = array_diff($profileFieldsList, ['personality_tags']);
        
        $petData = array_diff_key($validated, array_flip($profileFieldsOnly));
        
        $pet = Pet::create($petData);

        // Auto-create profile with possible fields from request if needed
        $pet->petProfile()->create([
            'status'          => $request->get('status', 'INTAKE'),
            'is_vaccinated'   => $request->boolean('is_vaccinated', false),
            'is_neutered'     => $request->boolean('is_neutered', false),
            'location'        => $request->get('location'),
            'intake_date'     => $request->get('intake_date'),
            'microchip'       => $request->get('microchip'),
            'color'           => $request->get('color'),
            'activity_level'  => $request->get('activity_level'),
            'weight_kg'       => $request->get('weight_kg'),
            'foster_name'     => $request->get('foster_name'),
            'foster_email'    => $request->get('foster_email'),
            'foster_phone'    => $request->get('foster_phone'),
            'medical_history' => $request->has('medical_history') 
                ? (is_string($request->medical_history) ? json_decode($request->medical_history, true) : $request->medical_history)
                : [],
        ]);

        // Create gallery images
        if (!empty($galleryFiles)) {
            foreach ($galleryFiles as $index => $file) {
                $url = \App\Helpers\UploadHelper::upload($file, 'pets/gallery');
                $pet->gallery()->create([
                    'image_url' => $url,
                    'sort_order' => $index
                ]);
            }
        }

        return response()->json(['success' => true, 'data' => $pet->load(['petProfile', 'gallery'])], 201);
    }
    

    public function update(Request $request, Pet $pet): JsonResponse
    {
        if ($request->has('personality_tags') && is_string($request->personality_tags)) {
            $request->merge(['personality_tags' => json_decode($request->personality_tags, true)]);
        }

        $validated = $request->validate([
            'name'             => 'sometimes|string|max:255',
            'species'          => 'sometimes|string|max:100',
            'breed'            => 'nullable|string|max:100',
            'description'      => 'nullable|string',
            'age_months'       => 'nullable|integer|min:0',
            'gender'           => ['nullable', Rule::in(['male', 'female', 'unknown'])],
            'personality_tags' => 'nullable|array',
            'image'            => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'status'           => 'nullable|string',
            'is_vaccinated'    => 'nullable',
            'is_neutered'      => 'nullable',
            'medical_history'  => 'nullable',
            'location'         => 'nullable|string|max:255',
            'intake_date'      => 'nullable|date',
            'microchip'        => 'nullable|string|max:255',
            'color'            => 'nullable|string|max:100',
            'activity_level'   => 'nullable|string|max:100',
            'weight_kg'        => 'nullable|numeric|min:0',
            'foster_name'      => 'nullable|string|max:255',
            'foster_email'     => 'nullable|email|max:255',
            'foster_phone'     => 'nullable|string|max:20',
        ]);

        if ($request->hasFile('image')) {
            if ($pet->image_url) \App\Helpers\UploadHelper::delete($pet->image_url);
            $validated['image_url'] = \App\Helpers\UploadHelper::upload($request->file('image'), 'pets');
        }
        unset($validated['image']);

        // Handle gallery deletions
        if ($request->has('deleted_gallery_ids')) {
            $deletedIds = json_decode($request->deleted_gallery_ids, true);
            if (is_array($deletedIds)) {
                $imagesToDelete = \App\Models\PetImage::whereIn('id', $deletedIds)->where('pet_id', $pet->id)->get();
                foreach ($imagesToDelete as $img) {
                    if ($img->image_url) \App\Helpers\UploadHelper::delete($img->image_url);
                    $img->delete();
                }
            }
        }

        // Handle new gallery uploads
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $file) {
                $url = \App\Helpers\UploadHelper::upload($file, 'pets/gallery');
                $pet->gallery()->create([
                    'image_url' => $url,
                    'sort_order' => $pet->gallery()->count()
                ]);
            }
        }

        // Separate Profile fields from Pet fields
        $profileFields = [
            'is_vaccinated', 'is_neutered', 'medical_history', 'status',
            'location', 'intake_date', 'microchip', 'color', 
            'activity_level', 'weight_kg', 'foster_name', 'foster_email', 'foster_phone'
        ];
        $petData = array_diff_key($validated, array_flip($profileFields));

        $pet->update($petData);

        // Update or create profile flags
        $profileUpdate = [
            'is_vaccinated'   => array_key_exists('is_vaccinated', $validated) ? $validated['is_vaccinated'] : ($pet->petProfile->is_vaccinated ?? false),
            'is_neutered'     => array_key_exists('is_neutered', $validated) ? $validated['is_neutered'] : ($pet->petProfile->is_neutered ?? false),
            'medical_history' => array_key_exists('medical_history', $validated) 
                ? (is_string($validated['medical_history']) ? json_decode($validated['medical_history'], true) : $validated['medical_history'])
                : ($pet->petProfile->medical_history ?? []),
            'location'        => array_key_exists('location', $validated) ? $validated['location'] : ($pet->petProfile->location ?? null),
            'intake_date'     => array_key_exists('intake_date', $validated) ? ($validated['intake_date'] ? \Carbon\Carbon::parse($validated['intake_date'])->format('Y-m-d') : null) : ($pet->petProfile->intake_date ?? null),
            'microchip'       => array_key_exists('microchip', $validated) ? $validated['microchip'] : ($pet->petProfile->microchip ?? null),
            'color'           => array_key_exists('color', $validated) ? $validated['color'] : ($pet->petProfile->color ?? null),
            'activity_level'  => array_key_exists('activity_level', $validated) ? $validated['activity_level'] : ($pet->petProfile->activity_level ?? null),
            'weight_kg'       => array_key_exists('weight_kg', $validated) ? $validated['weight_kg'] : ($pet->petProfile->weight_kg ?? null),
            'foster_name'     => array_key_exists('foster_name', $validated) ? $validated['foster_name'] : ($pet->petProfile->foster_name ?? null),
            'foster_email'    => array_key_exists('foster_email', $validated) ? $validated['foster_email'] : ($pet->petProfile->foster_email ?? null),
            'foster_phone'    => array_key_exists('foster_phone', $validated) ? $validated['foster_phone'] : ($pet->petProfile->foster_phone ?? null),
        ];

        if ($request->filled('status')) {
            $profileUpdate['status'] = $request->status;
        }

        $pet->petProfile()->updateOrCreate(
            ['pet_id' => $pet->id],
            $profileUpdate
        );

        return response()->json(['success' => true, 'data' => $pet->load(['petProfile', 'gallery'])]);
    }

    public function show(Pet $pet): JsonResponse
    {
        return response()->json([
            'success' => true, 
            'data' => $pet->load([
                'petProfile.careTasks', 
                'petProfile.careLogs.user', 
                'petProfile.auditTrails.user',
                'adoptionApplications',
                'gallery'
            ])
        ]);
    }

    public function uploadGalleryImage(Request $request, Pet $pet): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $url = \App\Helpers\UploadHelper::upload($request->file('image'), 'pets/gallery');
        
        $image = $pet->gallery()->create([
            'image_url' => $url,
            'sort_order' => $pet->gallery()->count()
        ]);

        return response()->json(['success' => true, 'data' => $image]);
    }

    public function deleteGalleryImage(\App\Models\PetImage $image): JsonResponse
    {
        if ($image->image_url) {
            \App\Helpers\UploadHelper::delete($image->image_url);
        }
        
        $image->delete();

        return response()->json(['success' => true, 'message' => 'Đã xóa ảnh khỏi bộ sưu tập']);
    }

    public function updateStatus(Request $request, Pet $pet): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|string',
            'reason' => 'nullable|string|max:500',
        ]);

        $oldStatus = $pet->petProfile->status;
        $pet->petProfile->update(['status' => $validated['status']]);

        // Simple Audit Trail
        $pet->petProfile->auditTrails()->create([
            'user_id' => auth()->id(),
            'old_status' => $oldStatus,
            'new_status' => $validated['status'],
            'reason' => $validated['reason'] ?? "Cập nhật trạng thái thú cưng",
        ]);

        return response()->json(['success' => true, 'data' => $pet->load('petProfile')]);
    }
    public function addLog(Request $request, Pet $pet): JsonResponse
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'type' => 'required|in:medical,behavior,general',
        ]);

        $log = $pet->petProfile->careLogs()->create([
            'user_id' => auth()->id(),
            'content' => $validated['content'],
            'type' => $validated['type'],
        ]);

        return response()->json(['success' => true, 'data' => $log->load('user')]);
    }

    public function updateTask(Request $request, $task_id): JsonResponse
    {
        $task = \App\Models\CareTask::findOrFail($task_id);
        $validated = $request->validate([
            'status' => 'required|in:pending,completed',
        ]);

        $task->update(['status' => $validated['status']]);

        return response()->json(['success' => true, 'data' => $task]);
    }

    public function bulkDelete(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:pets,id'
        ]);

        $ids = $validated['ids'];
        $pets = Pet::with(['petProfile', 'gallery', 'adoptionApplications'])->whereIn('id', $ids)->get();

        try {
            DB::transaction(function () use ($pets) {
                foreach ($pets as $pet) {
                    // 1. Delete cloud images first (non-DB, best-effort)
                    if ($pet->image_url) {
                        try { \App\Helpers\UploadHelper::delete($pet->image_url); } catch (\Exception $e) {}
                    }
                    foreach ($pet->gallery as $image) {
                        if ($image->image_url) {
                            try { \App\Helpers\UploadHelper::delete($image->image_url); } catch (\Exception $e) {}
                        }
                    }

                    // 2. Delete related records that may block FK constraints
                    if ($pet->petProfile) {
                        $pet->petProfile->auditTrails()->delete();
                        $pet->petProfile->careLogs()->delete();
                        $pet->petProfile->careTasks()->delete();
                        $pet->petProfile->forceDelete();
                    }
                    $pet->adoptionApplications()->forceDelete();
                    $pet->gallery()->delete();

                    // 3. Delete the pet itself
                    $pet->delete();
                }
            });

            return response()->json([
                'success' => true,
                'message' => "Đã xóa thành công " . count($ids) . " hồ sơ thú cưng"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra khi xóa nhiều hồ sơ: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Pet $pet): JsonResponse
    {
        try {
            $pet->load(['petProfile', 'gallery', 'adoptionApplications']);

            DB::transaction(function () use ($pet) {
                // 1. Delete cloud images first (non-DB, best-effort)
                if ($pet->image_url) {
                    try { \App\Helpers\UploadHelper::delete($pet->image_url); } catch (\Exception $e) {}
                }
                foreach ($pet->gallery as $image) {
                    if ($image->image_url) {
                        try { \App\Helpers\UploadHelper::delete($image->image_url); } catch (\Exception $e) {}
                    }
                }

                // 2. Delete related records that may block FK constraints
                if ($pet->petProfile) {
                    $pet->petProfile->auditTrails()->delete();
                    $pet->petProfile->careLogs()->delete();
                    $pet->petProfile->careTasks()->delete();
                    $pet->petProfile->forceDelete();
                }
                $pet->adoptionApplications()->forceDelete();
                $pet->gallery()->delete();

                // 3. Delete the pet itself
                $pet->delete();
            });

            return response()->json([
                'success' => true,
                'message' => 'Hồ sơ thú cưng đã được xóa thành công'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra khi xóa hồ sơ: ' . $e->getMessage()
            ], 500);
        }
    }
}
