<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Message extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'chat_id',
        'role',
        'message'
    ];

    public $table = 'messages';

    public function chat() 
    {
        return $this->belongsTo(Chat::class);
    }

    public function scopeBotMessagesPerMonth(Builder $query, $year) {
        return $query->selectRaw("DATE_FORMAT(created_at, '%M') as month, COUNT(*) as total_messages")
            ->where('role', 'bot')
            ->whereYear('created_at', $year)
            ->groupByRaw("DATE_FORMAT(created_at, '%M')");
    }
}