<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class PetProfile extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'pet_id',
        'uuid',
        'status',
        'location',
        'intake_date',
        'microchip',
        'color',
        'activity_level',
        'weight_kg',
        'foster_name',
        'foster_email',
        'foster_phone',
        'medical_history',
        'behavior_logs',
        'is_vaccinated',
        'is_neutered',
    ];

    protected $casts = [
        'intake_date' => 'date',
        'weight_kg' => 'decimal:2',
        'medical_history' => 'json',
        'behavior_logs' => 'json',
        'is_vaccinated' => 'boolean',
        'is_neutered' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) \Illuminate\Support\Str::uuid();
            }
        });
    }

    public function pet()
    {
        return $this->belongsTo(Pet::class);
    }

    public function careTasks()
    {
        return $this->hasMany(CareTask::class);
    }

    public function careLogs()
    {
        return $this->hasMany(CareLog::class);
    }

    public function auditTrails()
    {
        return $this->morphMany(AuditTrail::class, 'auditable');
    }
}
