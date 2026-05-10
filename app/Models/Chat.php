<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property mixed $id
 * @property mixed $user_id
 * @property mixed $created_at
 * @property mixed $updated_at
 * @property mixed $deleted_at
 */
class Chat extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $guarded = [];

    public $table = 'chats';

    protected $fillable = ['user_id'];

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected static function booted()
    {
        static::deleting(function ($chat) {
            if ($chat->isForceDeleting()) {
                $chat->messages()->forceDelete();
            } else {
                $chat->messages()->delete();
            }
        });
    }
}
