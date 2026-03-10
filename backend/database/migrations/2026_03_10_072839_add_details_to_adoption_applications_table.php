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
            $table->string('application_id')->unique()->nullable()->after('id');
            $table->string('full_name')->nullable()->after('pet_id');
            $table->string('phone')->nullable()->after('full_name');
            $table->string('email')->nullable()->after('phone');
            $table->text('address')->nullable()->after('email');

            $table->enum('home_type', ['house','apartment','condo','other'])->nullable()->after('address');
            $table->enum('ownership', ['own','rent'])->nullable()->after('home_type');
            $table->boolean('has_fenced_yard')->default(false)->after('ownership');
            $table->unsignedTinyInteger('adults_count')->default(1)->after('has_fenced_yard');
            $table->unsignedTinyInteger('children_count')->default(0)->after('adults_count');
            $table->boolean('has_allergy')->default(false)->after('children_count');

            $table->boolean('has_pet_experience')->default(false)->after('has_allergy');
            $table->text('current_pets')->nullable()->after('has_pet_experience');
            $table->unsignedTinyInteger('hours_alone')->default(0)->after('current_pets');
            $table->text('sleep_arrangements')->nullable()->after('hours_alone');
            $table->text('motivation')->nullable()->after('sleep_arrangements');
            
            $table->foreignId('user_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('adoption_applications', function (Blueprint $table) {
            $table->dropColumn([
                'application_id',
                'full_name',
                'phone',
                'email',
                'address',
                'home_type',
                'ownership',
                'has_fenced_yard',
                'adults_count',
                'children_count',
                'has_allergy',
                'has_pet_experience',
                'current_pets',
                'hours_alone',
                'sleep_arrangements',
                'motivation'
            ]);
            $table->foreignId('user_id')->nullable(false)->change();
        });
    }
};
