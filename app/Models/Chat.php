<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Chat extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id'
    ];

    public $table = 'chats';

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function user() 
    {
        return $this->belongsTo(User::class);
    }
}