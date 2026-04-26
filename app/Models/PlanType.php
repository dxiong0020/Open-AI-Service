<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlanType extends Model
{
    protected $guarded = [];

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }
}
