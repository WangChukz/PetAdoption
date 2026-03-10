<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AdoptionApplication;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Pet;
use App\Notifications\AdminNotification;
use App\Http\Requests\StoreAdoptionApplicationRequest;
use Illuminate\Support\Str;

class AdoptionController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAdoptionApplicationRequest $request)
    {
        $validated = $request->validated();
        
        $pet = Pet::findOrFail($validated['pet_id']);
        if ($pet->status !== 'available') {
            return response()->json(['success' => false, 'error' => 'This pet is no longer available.'], 400);
        }

        $userId = auth('sanctum')->id();
        
        $existingActiveApp = AdoptionApplication::where('pet_id', $validated['pet_id'])
            ->where(function($q) use ($validated, $userId) {
                $q->where('email', $validated['email']);
                if ($userId) {
                    $q->orWhere('user_id', $userId);
                }
            })
            ->whereIn('status', ['pending', 'manual_check', 'interviewing', 'approved'])
            ->first();

        DB::beginTransaction();
        try {
            $validated['user_id'] = $userId;
            $validated['status'] = 'pending';
            $validated['application_id'] = '#AD-' . strtoupper(Str::random(5));
            
            $application = AdoptionApplication::create($validated);

            if ($existingActiveApp) {
                $application->update([
                    'status' => 'auto_rejected',
                    'notes'  => 'Hệ thống từ chối tự động: Bạn đã có một đơn xin nhận nuôi đang được xử lý cho thú cưng này.',
                ]);
            } else {
                $application->update([
                    'status' => 'manual_check',
                ]);

                // Notify Admins
                $admins = User::whereIn('role', ['super_admin', 'moderator', 'staff'])->get();
                foreach ($admins as $admin) {
                    $admin->notify(new AdminNotification(
                        'Đơn nhận nuôi mới cần sàng lọc',
                        "Bạn có đơn nhận nuôi mới (ID: {$application->application_id}) cần sàng lọc thủ công",
                        "/admin/adoptions",
                        'adoption'
                    ));
                }
            }

            DB::commit();

            if ($existingActiveApp) {
               return response()->json(['success' => false, 'error' => 'You have already applied for this pet.'], 400);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $application->id,
                    'application_id' => $application->application_id,
                    'status' => $application->status,
                    'submitted_at' => $application->created_at,
                ],
                'message' => 'Đơn đăng ký đã được gửi thành công!'
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'error' => 'Could not process application', 'details' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $application = AdoptionApplication::with('pet')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $application
        ]);
    }
}
