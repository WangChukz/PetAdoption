<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

try {
    echo "Testing Cloudinary configuration...\n";
    echo "Cloud Name: " . config('cloudinary.cloud_url') . "\n";
    
    // Attempt a real upload of a dummy file if possible, or just check account status
    // Cloudinary facade doesn't have an 'info' method easily accessible here for account check
    // but we can try to upload string content
    
    $result = Cloudinary::upload("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", [
        'folder' => 'test_uploads'
    ]);
    
    echo "Upload Success!\n";
    echo "URL: " . $result->getSecurePath() . "\n";
    echo "Public ID: " . $result->getPublicId() . "\n";
    
} catch (\Exception $e) {
    echo "UPLOAD FAILED!\n";
    echo "Message: " . $e->getMessage() . "\n";
    echo "Code: " . $e->getCode() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}
