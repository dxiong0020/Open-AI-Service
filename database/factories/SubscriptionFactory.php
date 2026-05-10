<?php

namespace Database\Factories;

use App\Models\PlanType;
use App\Models\Subscription;
use App\Models\User;
use App\Models\UserCard;
use Illuminate\Database\Eloquent\Factories\Factory;

class SubscriptionFactory extends Factory
{
    protected $model = Subscription::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'user_card_id' => UserCard::factory(),
            'status' => 'ACTIVE',
            'plan_type_id' => 1,
            'trial_ends_at' => now()->addDays(7),
            'ends_at' => now()->addDays(30),
            'created_at' => now(),
            'deleted_at' => null
        ];
    }
}
