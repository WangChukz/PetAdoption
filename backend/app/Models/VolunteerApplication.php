<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class VolunteerApplication extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'position',
        'message',
        'cv_path',
        'status',
        'admin_notes',
        'reviewed_by',
        'reviewed_at',
        'interview_token',
        'interview_scheduled_at',
        'interview_confirmed_at',
    ];

    protected $casts = [
        'reviewed_at'            => 'datetime',
        'interview_scheduled_at' => 'datetime',
        'interview_confirmed_at' => 'datetime',
    ];

    // Valid status transitions
    public const STATUSES = [
        'pending',
        'cv_passed',
        'cv_rejected',
        'interview_scheduled',
        'interviewing',
        'passed',
        'rejected',
    ];

    public function reviewedBy()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function generateInterviewToken(): string
    {
        do {
            $token = Str::uuid()->toString();
        } while (self::where('interview_token', $token)->exists());

        $this->update(['interview_token' => $token]);
        return $token;
    }
}
