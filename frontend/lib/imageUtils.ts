/**
 * Safely resolves a pet image URL.
 * Handles potential differences in database storage (full URLs vs relative paths).
 * @param path The path stored in the database
 * @returns A full URL or a placeholder if path is empty
 */
export function getPetImageUrl(path: string | null | undefined): string {
  if (!path) return '/placeholder-pet.jpg';

  // If it's already a full URL, return it
  if (path.startsWith('http')) return path;

  // Use the storage URL from env, or default to localhost if not set
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000/storage';
  
  // Clean the path - sometimes it might start with /storage or /
  let cleanPath = path;
  if (cleanPath.startsWith('/storage')) {
    cleanPath = cleanPath.replace('/storage', '');
  }
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.substring(1);
  }

  return `${storageUrl}/${cleanPath}`;
}
