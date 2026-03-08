<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use App\Exceptions\UploadException;

class UploadHelper
{
    /**
     * Upload a file and return its path (or URL for Cloudinary)
     */
    public static function upload(UploadedFile $file, string $folder): string
    {
        if (config('filesystems.default') === 'cloudinary') {
            try {
                // Use Laravel Storage disk interface for cleaner abstraction
                $disk = Storage::disk('cloudinary');
                $path = $disk->put($folder, $file);
                
                if (!$path) {
                    throw new \Exception("Cloudinary returned a null result or empty path.");
                }
                
                // Return the public URL
                return $disk->url($path);
            } catch (\Exception $e) {
                Log::error("Cloudinary Upload Failed: " . $e->getMessage(), [
                    'folder' => $folder,
                    'file'   => $file->getClientOriginalName(),
                    'trace'  => $e->getTraceAsString()
                ]);
                
                throw new UploadException(
                    "Lỗi tải file lên Cloudinary: " . $e->getMessage(),
                    ['folder' => $folder, 'service' => 'cloudinary'],
                    500
                );
            }
        }

        try {
            $path = $file->store($folder, 'public');
            if (!$path) {
                throw new \Exception("Failed to store file locally.");
            }
            return $path;
        } catch (\Exception $e) {
            Log::error("Local Upload Failed: " . $e->getMessage(), [
                'folder' => $folder,
                'file'   => $file->getClientOriginalName(),
            ]);
            
            throw new UploadException(
                "Lỗi lưu file hệ thống: " . $e->getMessage(),
                ['folder' => $folder, 'service' => 'local'],
                500
            );
        }
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
                        \CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary::destroy($publicId);
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
