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
        Schema::table('adoption_applications', function (Blueprint $table) {
            // Drop the old FK without cascade
            $table->dropForeign(['pet_id']);
            // Re-create with onDelete cascade
            $table->foreign('pet_id')
                  ->references('id')
                  ->on('pets')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('adoption_applications', function (Blueprint $table) {
            $table->dropForeign(['pet_id']);
            $table->foreign('pet_id')
                  ->references('id')
                  ->on('pets');
        });
    }
};
