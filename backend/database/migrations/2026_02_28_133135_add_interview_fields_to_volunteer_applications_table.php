<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('volunteer_applications', function (Blueprint $table) {
            // Interview scheduling columns
            $table->string('interview_token')->nullable()->unique()->after('reviewed_at');
            $table->timestamp('interview_scheduled_at')->nullable()->after('interview_token');
            $table->timestamp('interview_confirmed_at')->nullable()->after('interview_scheduled_at');
            // Applicant info (stored directly, not requiring user account)
            $table->string('name')->nullable()->change(); // ensure nullable
        });

        // SQLite doesn't support ALTER COLUMN for enums, so we rebuild allowed values via app-layer validation.
        // Status values (enforced in CheckRole/Validation, not DB enum):
        // pending | cv_passed | cv_rejected | interview_scheduled | interviewing | passed | rejected
    }

    public function down(): void
    {
        Schema::table('volunteer_applications', function (Blueprint $table) {
            $table->dropColumn(['interview_token', 'interview_scheduled_at', 'interview_confirmed_at']);
        });
    }
};
