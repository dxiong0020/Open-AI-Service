<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsSubscribed
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user || !$user->subscription || $user->subscription->status !== 'ACTIVE') {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Subscription required.'], 403);
            }

            return redirect()->route('subscription.index')->with('error', 'You must have an active subscription to access this feature.');
        }

        return $next($request);
    }
}
