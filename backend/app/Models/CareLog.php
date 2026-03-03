<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CareLog extends Model
{
    protected $fillable = [
        'pet_profile_id',
        'user_id',
        'content',
        'type',
    ];

    public function petProfile()
    {
        return $this->belongsTo(PetProfile::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
