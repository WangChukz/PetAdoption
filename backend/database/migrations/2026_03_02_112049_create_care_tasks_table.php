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
        Schema::create('care_tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pet_profile_id')->constrained('pet_profiles')->onDelete('cascade');
            $table->string('task_name');
            $table->text('description')->nullable();
            $table->timestamp('due_date')->nullable();
            $table->enum('status', ['pending', 'completed', 'cancelled'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('care_tasks');
    }
};
