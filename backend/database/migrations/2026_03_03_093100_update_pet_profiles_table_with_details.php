<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pet_profiles', function (Blueprint $table) {
            $table->string('location')->nullable()->after('status');
            $table->date('intake_date')->nullable()->after('location');
            $table->string('microchip')->nullable()->after('intake_date');
            $table->string('color')->nullable()->after('microchip');
            $table->string('activity_level')->nullable()->after('color');
            $table->decimal('weight_kg', 8, 2)->nullable()->after('activity_level');
            $table->string('foster_name')->nullable()->after('weight_kg');
            $table->string('foster_email')->nullable()->after('foster_name');
            $table->string('foster_phone')->nullable()->after('foster_email');
        });
    }

    public function down(): void
    {
        Schema::table('pet_profiles', function (Blueprint $table) {
            $table->dropColumn([
                'location', 
                'intake_date', 
                'microchip', 
                'color', 
                'activity_level', 
                'weight_kg', 
                'foster_name', 
                'foster_email', 
                'foster_phone'
            ]);
        });
    }
};
