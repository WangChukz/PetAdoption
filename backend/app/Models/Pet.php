<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    protected $guarded = [];

    protected $casts = [
        'is_urgent' => 'boolean',
    ];

    public function adoptionApplications()
    {
        return $this->hasMany(AdoptionApplication::class);
    }
}
