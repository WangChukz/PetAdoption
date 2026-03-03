<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CareTask extends Model
{
    protected $fillable = [
        'pet_profile_id',
        'task_name',
        'description',
        'due_date',
        'status',
    ];

    protected $casts = [
        'due_date' => 'datetime',
    ];

    public function petProfile()
    {
        return $this->belongsTo(PetProfile::class);
    }
}
