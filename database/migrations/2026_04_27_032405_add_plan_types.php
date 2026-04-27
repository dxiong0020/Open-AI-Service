<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
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

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
