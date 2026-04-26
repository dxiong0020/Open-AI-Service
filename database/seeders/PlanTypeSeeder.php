<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\PlanType::updateOrCreate(
            ['slug' => 'monthly'],
            [
                'name' => 'Monthly Subscription',
                'price' => 20.00,
                'description' => 'Unlimited access for a flat monthly fee.'
            ]
        );

        \App\Models\PlanType::updateOrCreate(
            ['slug' => 'pay-per-use'],
            [
                'name' => 'Pay Per Use',
                'price' => 0.10,
                'description' => 'Pay only for what you use.'
            ]
        );
    }
}
