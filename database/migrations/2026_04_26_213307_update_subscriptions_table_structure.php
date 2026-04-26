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
        Schema::table('subscriptions', function (Blueprint $table) {
            // Drop index if it exists (for robustness)
            $table->dropIndex(['user_id', 'stripe_status']);
            $table->dropColumn(['stripe_id', 'stripe_status', 'stripe_price', 'quantity', 'type']);
            $table->foreignId('user_card_id')->after('user_id')->constrained()->cascadeOnDelete();
            $table->enum('status', ['ACTIVE', 'INACTIVE'])->default('ACTIVE')->after('user_card_id');
            $table->index(['user_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            // Check if index exists before dropping to avoid rollback error
            if (collect(DB::select("SHOW INDEXES FROM subscriptions"))->pluck('Key_name')->contains('subscriptions_user_id_status_index')) {
                $table->dropIndex('subscriptions_user_id_status_index');
            }
            $table->dropForeign(['user_card_id']);
            $table->dropColumn(['user_card_id', 'status']);
            $table->string('type')->after('user_id');
            $table->string('stripe_id')->unique()->after('type');
            $table->string('stripe_status')->after('stripe_id');
            $table->string('stripe_price')->nullable()->after('stripe_status');
            $table->integer('quantity')->nullable()->after('stripe_price');
            $table->index(['user_id', 'stripe_status']);
        });
    }
};
