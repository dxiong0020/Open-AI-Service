<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * @property mixed $id
 * @property mixed $name
 * @property mixed $email
 * @property mixed $email_verified_at
 * @property mixed $password
 * @property mixed $remember_token
 * @property mixed $created_at
 */
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'name',
        'email',
        'email_verified_at',
        'password',
        'remember_token',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function chats()
    {
        return $this->hasMany(Chat::class);
    }

    public function createChat()
    {
        return Chat::create(['user_id' => $this->id]);
    }

    public function subscription()
    {
        return $this->hasOne(Subscription::class);
    }

    public function userCard()
    {
        return $this->hasOne(UserCard::class);
    }

    protected static function booted()
    {
        static::deleting(function ($user) {
            $user->chats()->delete();
        });
    }
}
