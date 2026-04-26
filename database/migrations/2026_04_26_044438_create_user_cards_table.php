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
        Schema::create('user_cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // WARNING: DO NOT STORE RAW CARD DATA IN PRODUCTION
            // These fields are for development/mock purposes only.
            $table->string('card_holder_name');
            $table->string('card_number'); // In a real app, this would be encrypted
            $table->string('expiry_month');
            $table->string('expiry_year');
            $table->string('cvc'); // NEVER store CVC in production, even encrypted

            // Fields for "Stripe-like" behavior
            $table->string('last_four', 4);
            $table->string('card_brand');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_cards');
    }
};
