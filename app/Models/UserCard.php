<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserCard extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'user_id',
        'card_holder_name',
        'card_number',
        'expiry_month',
        'expiry_year',
        'cvc',
        'last_four',
        'card_brand',
    ];
    protected $casts = [
        'card_number' => 'encrypted',
        'cvc' => 'encrypted',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
