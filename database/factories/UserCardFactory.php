<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\UserCard;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserCardFactory extends Factory
{
    protected $model = UserCard::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'card_holder_name' => $this->faker->name(),
            'card_number' => $this->faker->creditCardNumber(),
            'expiry_month' => $this->faker->numberBetween(1, 12),
            'expiry_year' => $this->faker->year(),
            'cvc' => $this->faker->numberBetween(100, 999),
            'last_four' => '1234',
            'card_brand' => 'Visa',
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
        ];
    }
}
