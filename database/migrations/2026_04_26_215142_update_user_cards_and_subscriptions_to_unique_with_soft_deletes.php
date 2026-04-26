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
        Schema::table('user_cards', function (Blueprint $table) {
            $indexes = collect(DB::select("SHOW INDEXES FROM user_cards"))->pluck('Key_name');
            if (!$indexes->contains('user_cards_user_id_unique')) {
                $table->unique('user_id');
            }

            $columns = collect(DB::select("SHOW COLUMNS FROM user_cards"))->pluck('Field');
            if (!$columns->contains('deleted_at')) {
                $table->softDeletes();
            }
        });

        Schema::table('subscriptions', function (Blueprint $table) {
            // Drop foreign keys first to allow index manipulation
            $table->dropForeign(['user_id']);

            $indexes = collect(DB::select("SHOW INDEXES FROM subscriptions"))->pluck('Key_name');
            if ($indexes->contains('subscriptions_user_id_status_index')) {
                $table->dropIndex('subscriptions_user_id_status_index');
            }
            if ($indexes->contains('subscriptions_user_id_stripe_status_index')) {
                $table->dropIndex('subscriptions_user_id_stripe_status_index');
            }

            if (!$indexes->contains('subscriptions_user_id_unique')) {
                $table->unique('user_id');
            }

            // Restore foreign key
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $columns = collect(DB::select("SHOW COLUMNS FROM subscriptions"))->pluck('Field');
            if (!$columns->contains('deleted_at')) {
                $table->softDeletes();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->dropSoftDeletes();
            $table->dropUnique(['user_id']);
            // Restore the original index from the previous state if needed
            $table->index(['user_id', 'status'], 'subscriptions_user_id_status_index');
        });

        Schema::table('user_cards', function (Blueprint $table) {
            $table->dropSoftDeletes();
            $table->dropUnique(['user_id']);
        });
    }
};
