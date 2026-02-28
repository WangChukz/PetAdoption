<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\PetController;
use App\Http\Controllers\Api\AdoptionController;

// ─── Public API ────────────────────────────────────────────
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PublicVolunteerController;

Route::post('/auth/login', [AuthController::class, 'login']);

// Public volunteer application routes (no auth)
Route::post('/volunteers', [PublicVolunteerController::class, 'store']);
Route::get('/volunteer/confirm-interview', [PublicVolunteerController::class, 'confirmInterview']);

Route::get('/user', fn(Request $request) => $request->user())->middleware('auth:sanctum');
Route::get('/pets', [PetController::class, 'index']);
Route::post('/adoptions', [AdoptionController::class, 'store']);
Route::get('/adoptions/{id}', [AdoptionController::class, 'show']);

// ─── Admin API (Sanctum + Role) ─────────────────────────────
Route::prefix('admin')
    ->middleware(['auth:sanctum', 'role:super_admin,moderator,staff'])
    ->group(function () {

        // Auth & Dashboard overview stats
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/stats', [\App\Http\Controllers\Api\Admin\DashboardController::class, '__invoke']);

        // Pets CRUD
        Route::apiResource('pets', \App\Http\Controllers\Api\Admin\PetController::class);
        Route::patch('/pets/{pet}/status', [\App\Http\Controllers\Api\Admin\PetController::class, 'updateStatus']);

        // Adoption Applications
        Route::apiResource('adoptions', \App\Http\Controllers\Api\Admin\AdoptionController::class);
        Route::patch('/adoptions/{adoption}/status', [\App\Http\Controllers\Api\Admin\AdoptionController::class, 'updateStatus']);

        // Volunteer Applications
        Route::apiResource('volunteers', \App\Http\Controllers\Api\Admin\VolunteerController::class);
        Route::patch('/volunteers/{volunteer}/status', [\App\Http\Controllers\Api\Admin\VolunteerController::class, 'updateStatus']);

        // Donations
        Route::apiResource('donations', \App\Http\Controllers\Api\Admin\DonationController::class);

        // Blog Posts
        Route::apiResource('posts', \App\Http\Controllers\Api\Admin\PostController::class);
        Route::patch('/posts/{post}/publish', [\App\Http\Controllers\Api\Admin\PostController::class, 'togglePublish']);

        // User Management (super_admin only)
        Route::middleware('role:super_admin')->group(function () {
            Route::apiResource('users', \App\Http\Controllers\Api\Admin\UserController::class);
            Route::patch('/users/{user}/role', [\App\Http\Controllers\Api\Admin\UserController::class, 'updateRole']);
        });
    });
