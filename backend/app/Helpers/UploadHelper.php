<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UploadHelper
{
    /**
     * Upload a file and return its path (or URL for Cloudinary)
     */
    public static function upload(UploadedFile $file, string $folder): string
    {
        if (config('filesystems.default') === 'cloudinary') {
            return $file->storeOnCloudinary($folder)->getSecurePath();
        }
        return $file->store($folder, 'public');
    }

    /**
     * Delete a file based on its path or URL
     */
    public static function delete(?string $path): void
    {
        if (!$path) return;
        
        if (str_starts_with($path, 'http')) {
            if (config('filesystems.default') === 'cloudinary') {
                // Try to extract public ID from Cloudinary URL and delete
                $parts = explode('/upload/', $path);
                if (count($parts) > 1) {
                    $afterUpload = $parts[1];
                    // Remove version string if present (e.g., v1612345678/)
                    if (preg_match('/^v\d+\//', $afterUpload)) {
                        $afterUpload = preg_replace('/^v\d+\//', '', $afterUpload);
                    }
                    $publicId = pathinfo($afterUpload, PATHINFO_DIRNAME) . '/' . pathinfo($afterUpload, PATHINFO_FILENAME);
                    if (str_starts_with($publicId, './')) {
                        $publicId = substr($publicId, 2);
                    }
                    try {
                        cloudinary()->destroy($publicId);
                    } catch (\Exception $e) {
                        // Ignore deletion errors to prevent crashing
                    }
                }
            }
        } else {
            Storage::disk('public')->delete($path);
        }
    }
}
