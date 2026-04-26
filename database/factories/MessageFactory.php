<?php

namespace Database\Factories;

use App\Models\Chat;
use App\Models\Message;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
{
    protected $model = Message::class;

    public function definition(): array
    {
        return [
            'chat_id' => Chat::factory(),
            'role' => 'user',
            'message' => $this->faker->sentence()
        ];
    }
}
