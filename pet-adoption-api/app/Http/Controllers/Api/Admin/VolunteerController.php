<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Mail\VolunteerCvPassed;
use App\Mail\VolunteerCvRejected;
use App\Mail\VolunteerInterviewPassed;
use App\Mail\VolunteerInterviewRejected;
use App\Models\VolunteerApplication;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;

class VolunteerController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = VolunteerApplication::with('reviewedBy')->orderByDesc('created_at');

        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        }
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        return response()->json([
            'success' => true,
            'data'    => $query->paginate($request->get('per_page', 15)),
        ]);
    }

    public function show(VolunteerApplication $volunteer): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data'    => $volunteer->load('reviewedBy'),
        ]);
    }

    public function updateStatus(Request $request, VolunteerApplication $volunteer): JsonResponse
    {
        $validated = $request->validate([
            'status'          => ['required', Rule::in(VolunteerApplication::STATUSES)],
            'admin_notes'     => 'nullable|string',
            'interview_date'  => 'nullable|string', // e.g. "14:00 Thứ Sáu, 07/03/2026"
        ]);

        $oldStatus = $volunteer->status;
        $newStatus = $validated['status'];

        $updates = [
            'status'      => $newStatus,
            'admin_notes' => $validated['admin_notes'] ?? $volunteer->admin_notes,
            'reviewed_by' => $request->user()->id,
            'reviewed_at' => now(),
        ];

        // Generate interview token when CV is passed
        if ($newStatus === 'cv_passed' && $oldStatus !== 'cv_passed') {
            $token = $volunteer->generateInterviewToken();
            // interview_scheduled_at is human-readable string in email
        }

        if ($newStatus === 'interview_scheduled') {
            $updates['interview_scheduled_at'] = now();
        }

        $volunteer->update($updates);
        $volunteer->refresh();

        // ── Email dispatch based on status transition ──
        $interviewDate = $validated['interview_date'] ?? 'sẽ được thông báo sau';

        match ($newStatus) {
            'cv_passed'          => Mail::to($volunteer->email)->send(new VolunteerCvPassed($volunteer, $interviewDate)),
            'cv_rejected'        => Mail::to($volunteer->email)->send(new VolunteerCvRejected($volunteer)),
            'passed'             => Mail::to($volunteer->email)->send(new VolunteerInterviewPassed($volunteer)),
            'rejected'           => Mail::to($volunteer->email)->send(new VolunteerInterviewRejected($volunteer)),
            default              => null,
        };

        // Fix 5: Auto soft-delete rejected applications so they disappear from the list
        if (in_array($newStatus, ['cv_rejected', 'rejected'])) {
            $volunteer->delete();
            return response()->json([
                'success' => true,
                'message' => 'Đã từ chối và xóa hồ sơ khỏi danh sách.',
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Đã cập nhật trạng thái hồ sơ.',
            'data'    => $volunteer->load('reviewedBy'),
        ]);
    }

    public function update(Request $request, VolunteerApplication $volunteer): JsonResponse
    {
        $validated = $request->validate([
            'name'        => 'sometimes|string|max:255',
            'email'       => 'sometimes|email|max:255',
            'phone'       => 'sometimes|string|max:20',
            'position'    => 'sometimes|string|max:100',
            'message'     => 'nullable|string|max:2000',
            'admin_notes' => 'nullable|string',
        ]);
        $volunteer->update($validated);
        return response()->json(['success' => true, 'data' => $volunteer->fresh('reviewedBy')]);
    }

    public function destroy(VolunteerApplication $volunteer): JsonResponse
    {
        $volunteer->delete();
        return response()->json(['success' => true]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'email'       => 'required|email|max:255',
            'phone'       => 'required|string|max:20',
            'position'    => 'required|string|max:100',
            'message'     => 'nullable|string|max:2000',
            'status'      => ['nullable', Rule::in(VolunteerApplication::STATUSES)],
            'admin_notes' => 'nullable|string',
            'cv'          => 'nullable|file|mimes:pdf|max:10240',
        ]);

        $cvPath = null;
        if ($request->hasFile('cv')) {
            $cvPath = $request->file('cv')->store('cvs', 'public');
        }

        $application = VolunteerApplication::create([
            'name'        => $validated['name'],
            'email'       => $validated['email'],
            'phone'       => $validated['phone'],
            'position'    => $validated['position'],
            'message'     => $validated['message'] ?? null,
            'cv_path'     => $cvPath,
            'status'      => $validated['status'] ?? 'pending',
            'admin_notes' => $validated['admin_notes'] ?? null,
            'reviewed_by' => $request->user()->id,
            'reviewed_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Hồ sơ tình nguyện viên đã được tạo thành công.',
            'data'    => $application,
        ], 201);
    }
}
