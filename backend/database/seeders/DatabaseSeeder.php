<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Pet;
use App\Models\Donation;
use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Super Admin
        User::firstOrCreate(
            ['email' => 'admin@petadoption.local'],
            [
                'name' => 'John (Admin)',
                'password' => Hash::make('password123'),
                'role' => 'super_admin',
                'is_active' => true,
            ]
        );

        // 2. Create Regular Users
        $users = [];
        for ($i = 1; $i <= 5; $i++) {
            $users[] = User::firstOrCreate(
                ['email' => "user{$i}@petadoption.local"],
                [
                    'name' => "Người dùng $i",
                    'password' => Hash::make('password123'),
                    'role' => 'user',
                ]
            );
        }

        // 3. Create Pets
        $pets = [
            ['name' => 'Milo', 'species' => 'Chó', 'breed' => 'Poodle', 'age_months' => 24, 'gender' => 'male', 'status' => 'available'],
            ['name' => 'Bông', 'species' => 'Mèo', 'breed' => 'Mèo ta', 'age_months' => 6, 'gender' => 'female', 'status' => 'adopted'],
            ['name' => 'Max', 'species' => 'Chó', 'breed' => 'Golden', 'age_months' => 12, 'gender' => 'male', 'status' => 'in_treatment'],
            ['name' => 'Mimi', 'species' => 'Mèo', 'breed' => 'Anh Lông Ngắn', 'age_months' => 18, 'gender' => 'female', 'status' => 'available'],
        ];

        foreach ($pets as $petData) {
            Pet::firstOrCreate(['name' => $petData['name']], array_merge($petData, [
                'description' => "Bé {$petData['name']} rất ngoan và quấn người.",
            ]));
        }

        $admin = User::where('email', 'admin@petadoption.local')->first();

        // 4. Create Posts
        Post::firstOrCreate(['slug' => 'hanh-trinh-cuu-ho-be-max'], [
            'author_id' => $admin->id,
            'title' => 'Hành trình cứu hộ bé Max khỏi lò mổ',
            'excerpt' => 'Một câu chuyện đầy cảm động về bé Max...',
            'content' => '<p>Chi tiết về quá trình cứu hộ và chữa trị cho bé.</p>',
            'published' => true,
        ]);

        Post::firstOrCreate(['slug' => 'cach-cham-soc-meo-con'], [
            'author_id' => $admin->id,
            'title' => 'Cách chăm sóc mèo con mới về nhà',
            'excerpt' => 'Những lưu ý quan trọng khi bạn mới nhận nuôi mèo.',
            'content' => '<p>Hướng dẫn chi tiết từ chế độ ăn đến tiêm phòng.</p>',
            'published' => true,
        ]);

        // 5. Create Donations
        Donation::create([
            'transaction_ref' => 'TXN' . rand(1000, 9999),
            'type' => 'income',
            'amount' => 500000,
            'method' => 'bank_transfer',
            'donor_name' => 'Chị Hoa',
            'note' => 'Ủng hộ các bé mua hạt',
            'recorded_by' => $admin->id
        ]);

        Donation::create([
            'transaction_ref' => 'TXN' . rand(1000, 9999),
            'type' => 'expense',
            'amount' => 250000,
            'method' => 'cash',
            'note' => 'Tiền thuốc thú y bé Bông',
            'recorded_by' => $admin->id
        ]);
        
        echo "Database seeded with sample data.\n";
    }
}
