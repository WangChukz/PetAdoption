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
            'status' => ['required', Rule::in([
                'pending', 'auto_rejected', 'manual_check', 'interviewing', 'approved', 'rejected', 'complete'
            ])],
            'admin_notes'  => 'nullable|string',
        ]);

        $oldStatus = $adoption->status;
        $newStatus = $validated['status'];

        $adoption->update([
            'status'      => $newStatus,
            'notes'       => $validated['admin_notes'] ?? $adoption->notes,
        ]);

        // HĐ5: Gửi email khi chuyển sang "Chờ phỏng vấn"
        if ($oldStatus !== 'interviewing' && $newStatus === 'interviewing') {
            try {
                \Illuminate\Support\Facades\Mail::to($adoption->user->email)
                    ->send(new \App\Mail\AdoptionInterviewInvitation($adoption));
            } catch (\Exception $e) {
                // Log or handle email errs silently to not break flow
                \Illuminate\Support\Facades\Log::error("AdoptionInterviewInvitation email failed: " . $e->getMessage());
            }
        }

        // HĐ8: Nếu Approved, reject các đơn khác cùng con vật
        if ($oldStatus !== 'approved' && $newStatus === 'approved') {
            AdoptionApplication::where('pet_id', $adoption->pet_id)
                ->where('id', '!=', $adoption->id)
                ->whereIn('status', ['pending', 'manual_check', 'interviewing'])
                ->update([
                    'status' => 'rejected',
                    'notes' => 'Hệ thống từ chối: Thú cưng này đã được duyệt cho một người nhận nuôi khác.',
                ]);
        }

        // HĐ10: Nếu Complete, đổi status Pet thành adopted
        if ($oldStatus !== 'complete' && $newStatus === 'complete') {
            if ($adoption->pet) {
                $adoption->pet->update(['status' => 'adopted']);
            }
        }

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
