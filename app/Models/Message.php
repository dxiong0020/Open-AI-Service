<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;

class Message extends Model
{
    use HasFactory, SoftDeletes;

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
        return $query->selectRaw("DATE_FORMAT(created_at, '%M') as month, COUNT(*) as enquiries")
            ->where('role', 'bot')
            ->whereYear('created_at', $year)
            ->groupByRaw("DATE_FORMAT(created_at, '%M')");
    }

    public function scopeDistinctYears(Builder $query) {
        return $query->selectRaw('Distinct year(created_at) as year')
            ->where('role', 'bot');
    }

    public function scopeOpenAiCostPerUse(Builder $query, $year) {
        return $query->selectRaw("DATE_FORMAT(created_at, '%M') as month, COUNT(*) * 0.10 as cost")
            ->where('role', 'bot')
            ->whereYear('created_at', $year)
            ->groupByRaw("DATE_FORMAT(created_at, '%M')");
    }
}