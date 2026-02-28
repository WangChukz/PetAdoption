<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->string('donor_name')->nullable(); // null = anonymous
            $table->string('donor_email')->nullable();
            $table->decimal('amount', 15, 2);
            $table->string('currency', 10)->default('VND');
            $table->enum('method', ['bank_transfer', 'cash', 'momo', 'paypal', 'other'])->default('bank_transfer');
            $table->enum('type', ['income', 'expense'])->default('income');
            $table->text('note')->nullable();
            $table->string('transaction_ref')->nullable(); // external transaction ID
            $table->boolean('is_anonymous')->default(false);
            $table->foreignId('recorded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
