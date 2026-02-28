<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     * Usage on routes: ->middleware('role:super_admin,moderator')
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['success' => false, 'error' => 'Unauthenticated.'], 401);
        }

        if (!in_array($user->role, $roles)) {
            return response()->json(['success' => false, 'error' => 'Forbidden. Insufficient permissions.'], 403);
        }

        if (!$user->is_active) {
            return response()->json(['success' => false, 'error' => 'Your account has been deactivated.'], 403);
        }

        return $next($request);
    }
}
