<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    protected $guarded = [];

    protected $casts = [
        'is_urgent' => 'boolean',
        'personality_tags' => 'array',
    ];

    public function petProfile()
    {
        return $this->hasOne(PetProfile::class);
    }

    public function gallery()
    {
        return $this->hasMany(PetImage::class)->orderBy('sort_order');
    }

    public function adoptionApplications()
    {
        return $this->hasMany(AdoptionApplication::class);
    }
}
