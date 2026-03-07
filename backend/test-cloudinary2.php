<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    $disk = Illuminate\Support\Facades\Storage::disk('cloudinary');
    echo "Cloudinary URL: " . $disk->url("pets/123.jpg") . "\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
