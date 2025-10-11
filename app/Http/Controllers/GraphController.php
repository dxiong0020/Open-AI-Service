<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Message;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class GraphController extends Controller
{
    public function index()
    {
        return Inertia::render('Graph', ['years' => $this->getYears()]);
    }

    public function getYears() 
    {
        $user = User::find(Auth::id());
        $data = Message::whereHas('chat', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->distinctYears()->pluck('year');
        return $data;
    }

    public function openAiUsage(Request $request)
    {
        $data = collect();
        try {
            $user = User::find(Auth::id());
            $data = Message::whereHas('chat', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->botMessagesPerMonth($request->year ?? 2025)
                ->get();
        } catch (\Exception $e) {
            Log::error($e);
        }
        return response()->json(['graphData' => $data], 200);
    }

    public function monthlyCostUsage(Request $request) 
    {
        $data = collect();
        try {
            $user = User::find(Auth::id());
            $data = Message::whereHas('chat', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->openAiCostPerUse($request->year ?? 2025)
                ->get();
        } catch (\Exception $e) {
            Log::error($e);
        }
        return response()->json(['graphData' => $data], 200);
    }
}