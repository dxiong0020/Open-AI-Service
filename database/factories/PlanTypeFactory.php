<?php

namespace Database\Factories;

use App\Models\PlanType;
use Illuminate\Database\Eloquent\Factories\Factory;

class PlanTypeFactory extends Factory
{
    protected $model = PlanType::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'slug' => $this->faker->slug(),
            'price' => $this->faker->randomFloat(2, 10, 100),
            'description' => $this->faker->sentence(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
