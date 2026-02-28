<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdoptionApplication;
use App\Models\Pet;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $stats = [
            'pets' => [
                'total'        => Pet::count(),
                'available'    => Pet::where('status', 'available')->count(),
                'adopted'      => Pet::where('status', 'adopted')->count(),
                'in_treatment' => Pet::where('status', 'in_treatment')->count(),
            ],
            'adoptions' => [
                'total'    => AdoptionApplication::count(),
                'pending'  => AdoptionApplication::where('status', 'pending')->count(),
                'approved' => AdoptionApplication::where('status', 'approved')->count(),
                'rejected' => AdoptionApplication::where('status', 'rejected')->count(),
            ],
            'volunteers' => [
                'total'    => DB::table('volunteer_applications')->count(),
                'pending'  => DB::table('volunteer_applications')->where('status', 'pending')->count(),
                'approved' => DB::table('volunteer_applications')->where('status', 'approved')->count(),
            ],
            'donations' => [
                'total_income'  => DB::table('donations')->where('type', 'income')->sum('amount'),
                'total_expense' => DB::table('donations')->where('type', 'expense')->sum('amount'),
                'count'         => DB::table('donations')->count(),
            ],
            'users' => [
                'total'  => User::count(),
                'active' => User::where('is_active', true)->count(),
            ],
        ];

        return response()->json(['success' => true, 'data' => $stats]);
    }
}
