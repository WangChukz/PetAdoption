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
        $now = now();
        $sevenDaysAgo = now()->subDays(7);
        $fourteenDaysAgo = now()->subDays(14);

        // Pet Trends
        $petTotal = Pet::count();
        $petLastWeek = Pet::where('created_at', '<=', $sevenDaysAgo)->count();
        $petTrend = $petTotal - $petLastWeek;

        // Adopted Trends (assuming 'adopted' status change is tracked by updated_at or similar, 
        // but for now let's use created_at of pets with 'adopted' status as a proxy or 
        // better: count how many became 'adopted' in the last 7 days)
        $adoptedTotal = Pet::where('status', 'adopted')->count();
        $adoptedLastWeek = Pet::where('status', 'adopted')
            ->where('updated_at', '<=', $sevenDaysAgo)
            ->count();
        $adoptedTrend = $adoptedTotal - $adoptedLastWeek;

        $stats = [
            'pets' => [
                'total'        => $petTotal,
                'trend'        => $petTrend,
                'available'    => Pet::where('status', 'available')->count(),
                'adopted'      => $adoptedTotal,
                'adoptedTrend' => $adoptedTrend,
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
                'approved' => DB::table('volunteer_applications')->where('status', 'passed')->count(),
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
