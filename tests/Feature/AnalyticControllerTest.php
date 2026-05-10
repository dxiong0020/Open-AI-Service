<?php
namespace Tests\Feature;

use App\Models\Chat;
use App\Models\Message;
use App\Models\Subscription;
use App\Models\User;
use App\Models\UserCard;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Inertia\Testing\AssertableInertia as Assert;

class AnalyticControllerTest extends TestCase
{
    use DatabaseTransactions;

    public User $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->createUserWithSubscription();
        $this->actingAs($this->user);
    }

    public function createUserWithSubscription(): void
    {
        $this->user = User::factory()->create();
        $card = UserCard::factory()->create([
            'user_id' => $this->user->id
        ]);
        Subscription::factory()->create([
            'user_id' => $this->user->id,
            'user_card_id' => $card->id,
        ]);
    }

    #[Test]
    public function index()
    {
        $chat = Chat::factory()->create(['user_id' => $this->user->id]);
        Message::factory()->create([
            'chat_id' => $chat->id,
            'role' => 'user',
            'created_at' => '2026-01-01'
        ]);
        Message::factory()->create([
            'chat_id' => $chat->id,
            'role' => 'bot',
            'created_at' => '2026-01-01'
        ]);

        $response = $this->get('/analytic');
        $response->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->component('Graph')
                ->has('years')
            );
        $props = $response->viewData('page')['props'];
        $years = $props['years'];
        $this->assertTrue(in_array('2026', $years));
        $this->assertCount(1, $years);
    }

    #[Test]
    public function openAiUsage(): void
    {
        $chat = Chat::factory()->create([
            'user_id' => $this->user->id
        ]);
        Message::factory()->create([
            'chat_id' => $chat->id,
            'role' => 'bot',
            'created_at' => '2026-01-01'
        ]);
        Message::factory()->create([
            'chat_id' => $chat->id,
            'role' => 'bot',
            'created_at' => '2026-02-01'
        ]);
        Message::factory()->create([
            'chat_id' => $chat->id,
            'role' => 'bot',
            'created_at' => '2026-02-01'
        ]);

        $response = $this->post('/api/openAiUsage', ['year' => '2026'])
            ->assertStatus(200);
        $result = json_decode($response->getContent());
        $graphData = $result->graphData;
        $firstMonth = (object) [
            'month' => 'January',
            'enquiries' => 1
        ];
        $secondMonth = (object) [
            'month' => 'February',
            'enquiries' => 2
        ];
        $this->assertTrue(in_array($firstMonth, $graphData));
        $this->assertTrue(in_array($secondMonth, $graphData));
    }

    #[Test]
    public function monthlyCostUsage(): void
    {
        $chat = Chat::factory()->create([
            'user_id' => $this->user->id
        ]);
        Message::factory()->create([
            'chat_id' => $chat->id,
            'role' => 'bot',
            'created_at' => '2026-01-01'
        ]);
        Message::factory()->create([
            'chat_id' => $chat->id,
            'role' => 'bot',
            'created_at' => '2026-02-01'
        ]);
        Message::factory()->create([
            'chat_id' => $chat->id,
            'role' => 'bot',
            'created_at' => '2026-02-01'
        ]);
        $response = $this->post('/api/monthlyCostUsage', ['year' => '2026'])
            ->assertStatus(200);
        $result = json_decode($response->getContent());
        $graphData = $result->graphData;
        $firstMonth = (object) [
            'month' => 'January',
            'cost' => '0.10'
        ];
        $secondMonth = (object) [
            'month' => 'February',
            'cost' => '0.20'
        ];
        $this->assertTrue(in_array($firstMonth, $graphData));
        $this->assertTrue(in_array($secondMonth, $graphData));
    }
}
