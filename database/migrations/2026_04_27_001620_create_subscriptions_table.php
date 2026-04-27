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
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('user_card_id')->constrained('user_cards')->cascadeOnDelete();
            $table->string('status')->default('ACTIVE');
            $table->foreignId('plan_type_id')->nullable()->constrained('plan_types')->nullOnDelete();
            $table->timestamp('trial_ends_at')->nullable();
            $table->timestamp('ends_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['user_id', 'user_card_id', 'plan_type_id']);
        });
    }
};
