<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = User::query();
        if ($request->filled('role')) $query->where('role', $request->role);
        if ($request->filled('search')) {
            $query->where(fn($q) => $q->where('name', 'like', '%' . $request->search . '%')
                ->orWhere('email', 'like', '%' . $request->search . '%'));
        }
        return response()->json(['success' => true, 'data' => $query->orderByDesc('created_at')->paginate(20)]);
    }

    public function show(User $user): JsonResponse
    {
        return response()->json(['success' => true, 'data' => $user]);
    }

    public function update(Request $request, User $user): JsonResponse
    {
        $validated = $request->validate([
            'name'      => 'sometimes|string|max:255',
            'is_active' => 'sometimes|boolean',
        ]);
        $user->update($validated);
        return response()->json(['success' => true, 'data' => $user]);
    }

    public function updateRole(Request $request, User $user): JsonResponse
    {
        $validated = $request->validate([
            'role' => ['required', Rule::in(['super_admin', 'moderator', 'staff', 'user'])],
        ]);

        // Prevent demoting yourself
        if ($user->id === $request->user()->id) {
            return response()->json(['success' => false, 'error' => 'Bạn không thể đổi role của chính mình.'], 422);
        }

        $user->update($validated);
        return response()->json(['success' => true, 'data' => $user]);
    }

    public function destroy(User $user): JsonResponse
    {
        if ($user->id === request()->user()->id) {
            return response()->json(['success' => false, 'error' => 'Bạn không thể xoá tài khoản của chính mình.'], 422);
        }
        $user->delete();
        return response()->json(['success' => true]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'      => 'required|string|max:255',
            'email'     => 'required|string|email|max:255|unique:users',
            'password'  => 'required|string|min:8',
            'role'      => ['required', Rule::in(['super_admin', 'moderator', 'staff', 'user'])],
        ]);

        $user = User::create([
            'name'      => $validated['name'],
            'email'     => $validated['email'],
            'password'  => \Illuminate\Support\Facades\Hash::make($validated['password']),
            'role'      => $validated['role'],
        ]);

        return response()->json(['success' => true, 'data' => $user], 201);
    }
}
