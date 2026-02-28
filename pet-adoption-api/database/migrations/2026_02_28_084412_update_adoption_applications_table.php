<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('adoption_applications', function (Blueprint $table) {
            $table->text('notes')->nullable()->after('status');
            $table->text('applicant_message')->nullable()->after('notes');
            $table->timestamp('interviewed_at')->nullable()->after('applicant_message');
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete()->after('interviewed_at');
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::table('adoption_applications', function (Blueprint $table) {
            $table->dropForeign(['reviewed_by']);
            $table->dropColumn(['notes', 'applicant_message', 'interviewed_at', 'reviewed_by', 'deleted_at']);
        });
    }
};
