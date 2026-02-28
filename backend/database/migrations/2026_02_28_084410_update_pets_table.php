<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pets', function (Blueprint $table) {
            $table->text('description')->nullable()->after('name');
            $table->integer('age_months')->nullable()->after('description');
            $table->enum('gender', ['male', 'female', 'unknown'])->default('unknown')->after('age_months');
            $table->enum('status', ['available', 'adopted', 'in_treatment', 'hidden'])->default('available')->after('gender');
            $table->string('image_url')->nullable()->after('status');
            $table->string('breed')->nullable()->after('species');
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::table('pets', function (Blueprint $table) {
            $table->dropColumn(['description', 'age_months', 'gender', 'status', 'image_url', 'breed', 'deleted_at']);
        });
    }
};
