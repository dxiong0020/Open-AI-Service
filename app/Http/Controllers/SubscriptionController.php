<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use App\Models\PlanType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Subscription', [
            'subscription' => $request->user()->subscription()->with('planType')->first(),
            'card' => $request->user()->userCard()->first(),
            'plans' => PlanType::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'plan_id' => 'required|exists:plan_types,id',
            'cardholder_name' => 'required|string|max:255',
            'card_brand' => 'required|string|max:50',
            'card_number' => 'required|string|max:19',
            'expiry' => ['required', 'string', 'regex:/^(0[1-9]|1[0-2])\/\d{2}$/'],
            'cvc' => 'required|string|min:3|max:4',
        ]);

        $expiryParts = explode('/', $request->expiry);
        $expiryMonth = $expiryParts[0];
        $expiryYear = '20' . $expiryParts[1];

        $card = $request->user()->userCard()->updateOrCreate(
            ['user_id' => $request->user()->id],
            [
                'card_holder_name' => $request->cardholder_name,
                'card_number' => $request->card_number,
                'expiry_month' => $expiryMonth,
                'expiry_year' => $expiryYear,
                'cvc' => $request->cvc,
                'last_four' => substr($request->card_number, -4),
                'card_brand' => $request->card_brand,
            ]
        );

        $plan = PlanType::findOrFail($request->plan_id);

        $request->user()->subscription()->updateOrCreate(
            ['user_id' => $request->user()->id],
            [
                'plan_type_id' => $plan->id,
                'user_card_id' => $card->id,
                'status' => 'ACTIVE',
            ]
        );

        return redirect()->back()->with('message', 'Successfully updated subscription!');
    }

    public function destroy(Request $request)
    {
        $subscription = $request->user()->subscription;

        if ($subscription) {
            $subscription->update(['status' => 'INACTIVE']);
        }

        return redirect()->back()->with('message', 'Successfully unsubscribed.');
    }
}
