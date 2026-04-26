<?php

namespace Database\Seeders;

use App\Models\Chat;
use App\Models\Message;
use Illuminate\Database\Seeder;

class MessageSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $chat = Chat::factory()->create();

        for ($i = 0; $i < 10; $i++) {
            Message::factory()->create([
                'chat_id' => $chat->id,
                'role' => 'user'
            ]);
        }
    }
}
