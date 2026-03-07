<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\VolunteerCvPassed;
use App\Mail\VolunteerCvRejected;
use App\Mail\VolunteerInterviewPassed;
use App\Mail\VolunteerInterviewRejected;
use App\Models\VolunteerApplication;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Notifications\AdminNotification;

class PublicVolunteerController extends Controller
{
    /**
     * Public: receive volunteer application form submission
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|max:255',
            'phone'    => 'required|string|max:20',
            'position' => 'required|string|max:100',
            'message'  => 'nullable|string|max:2000',
            'cv'       => 'nullable|file|mimes:pdf|max:10240', // 10MB
        ]);

        $cvPath = null;
        if ($request->hasFile('cv')) {
            $cvPath = \App\Helpers\UploadHelper::upload($request->file('cv'), 'cvs');
        }

        $application = VolunteerApplication::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'phone'    => $validated['phone'],
            'position' => $validated['position'],
            'message'  => $validated['message'] ?? null,
            'cv_path'  => $cvPath,
            'status'   => 'pending',
        ]);

        // Notify Admins
        $admins = User::whereIn('role', ['super_admin', 'moderator', 'staff'])->get();
        foreach ($admins as $admin) {
            $admin->notify(new AdminNotification(
                'Ứng viên mới',
                "Bạn có hồ sơ tình nguyện mới từ {$application->name}",
                "/admin/volunteers",
                'volunteer'
            ));
        }

        return response()->json([
            'success' => true,
            'message' => 'Đơn ứng tuyển của bạn đã được nhận. Chúng tôi sẽ liên hệ trong 1–3 ngày làm việc!',
            'data'    => ['id' => $application->id],
        ], 201);
    }

    /**
     * Public: candidate confirms interview attendance via token link
     */
    public function confirmInterview(Request $request)
    {
        $token = $request->query('token');

        if (!$token) {
            return redirect(config('app.frontend_url', 'http://localhost:3000') . '/confirm-interview?status=invalid');
        }

        $application = VolunteerApplication::where('interview_token', $token)->first();

        if (!$application) {
            return redirect(config('app.frontend_url', 'http://localhost:3000') . '/confirm-interview?status=invalid');
        }

        if ($application->interview_confirmed_at) {
            return redirect(config('app.frontend_url', 'http://localhost:3000') . '/confirm-interview?status=already_confirmed');
        }

        $application->update([
            'status'                 => 'interview_scheduled',
            'interview_confirmed_at' => now(),
        ]);

        return redirect(config('app.frontend_url', 'http://localhost:3000') . '/confirm-interview?status=success&name=' . urlencode($application->name));
    }
}
