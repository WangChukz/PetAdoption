<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    protected $guarded = [];

    public function recordedBy()
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }
}
