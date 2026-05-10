<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subscription extends Model
{
    use SoftDeletes, HasFactory;
    protected $fillable = [
        'user_id',
        'plan_type_id',
        'user_card_id',
        'status',
        'trial_ends_at',
        'ends_at',
    ];

    protected $casts = [
        'trial_ends_at' => 'datetime',
        'ends_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function planType()
    {
        return $this->belongsTo(PlanType::class);
    }

    public function userCard()
    {
        return $this->belongsTo(UserCard::class);
    }
}
