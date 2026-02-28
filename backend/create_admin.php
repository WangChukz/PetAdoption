<?php
use App\Models\User;
use Illuminate\Support\Facades\Hash;

$admin = User::firstOrCreate(
    ['email' => 'admin@petadoption.local'],
    [
        'name' => 'Super Admin',
        'password' => Hash::make('password123'),
        'role' => 'super_admin',
        'is_active' => true,
    ]
);

$admin->update(['role' => 'super_admin', 'is_active' => true]); // ensure existing test user is admin

echo "Admin account created/updated.\n";
echo "Email: admin@petadoption.local\n";
echo "Password: password123\n";
