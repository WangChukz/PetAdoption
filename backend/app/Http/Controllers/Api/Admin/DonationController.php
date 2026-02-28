<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class DonationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = \App\Models\Donation::with('recordedBy')->orderByDesc('created_at');

        if ($request->filled('type')) $query->where('type', $request->get('type'));
        if ($request->filled('method')) $query->where('method', $request->get('method'));
        if ($request->filled('search')) {
            $query->where('donor_name', 'like', '%' . $request->search . '%');
        }

        return response()->json([
            'success' => true,
            'data' => $query->paginate($request->get('per_page', 20))
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'donor_name'      => 'nullable|string|max:255',
            'donor_email'     => 'nullable|email',
            'amount'          => 'required|numeric|min:1000',
            'currency'        => 'nullable|string|max:10',
            'method'          => ['required', Rule::in(['bank_transfer', 'cash', 'momo', 'paypal', 'other'])],
            'type'            => ['required', Rule::in(['income', 'expense'])],
            'note'            => 'nullable|string',
            'transaction_ref' => 'nullable|string',
            'is_anonymous'    => 'boolean',
        ]);

        $validated['recorded_by'] = $request->user()->id;
        $donation = \App\Models\Donation::create($validated);

        return response()->json(['success' => true, 'data' => $donation->load('recordedBy')], 201);
    }

    public function show(\App\Models\Donation $donation): JsonResponse
    {
        return response()->json(['success' => true, 'data' => $donation->load('recordedBy')]);
    }

    public function update(Request $request, \App\Models\Donation $donation): JsonResponse
    {
        $validated = $request->validate([
            'note'            => 'nullable|string',
            'transaction_ref' => 'nullable|string',
            'donor_name'      => 'nullable|string',
        ]);
        
        $donation->update($validated);
        return response()->json(['success' => true, 'data' => $donation->fresh('recordedBy')]);
    }

    public function destroy(\App\Models\Donation $donation): JsonResponse
    {
        $donation->delete();
        return response()->json(['success' => true]);
    }
}
