<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pet_profiles', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('pet_id')->constrained('pets')->onDelete('cascade');
            $table->string('status')->default('INTAKE'); // INTAKE, SCREENING, TREATMENT, QUARANTINE, TRAINING, READY_FOR_REVIEW, AVAILABLE
            $table->json('medical_history')->nullable();
            $table->json('behavior_logs')->nullable();
            $table->boolean('is_vaccinated')->default(false);
            $table->boolean('is_neutered')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pet_profiles');
    }
};
