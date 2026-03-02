<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Display a listing of unread notifications.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        
        return response()->json([
            'success' => true,
            'data'    => [
                'unread_count'  => $user->unreadNotifications()->count(),
                'notifications' => $user->notifications()->limit(20)->get()->map(function($n) {
                    return [
                        'id'         => $n->id,
                        'data'       => $n->data,
                        'read_at'    => $n->read_at,
                        'created_at' => $n->created_at->diffForHumans(),
                    ];
                }),
            ]
        ]);
    }

    /**
     * Mark a specific notification as read.
     */
    public function markAsRead(Request $request, string $id): JsonResponse
    {
        $notification = $request->user()->notifications()->findOrFail($id);
        $notification->markAsRead();

        return response()->json(['success' => true]);
    }

    /**
     * Mark all notifications as read.
     */
    public function markAllRead(Request $request): JsonResponse
    {
        $request->user()->unreadNotifications->markAsRead();

        return response()->json(['success' => true]);
    }
}
