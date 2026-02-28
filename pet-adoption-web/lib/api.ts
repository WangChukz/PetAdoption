import { cookies } from 'next/headers';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:8000/api';

// Custom Error Class as defined in error-handling-patterns skill
export class AuthError extends Error {
  constructor(message = 'Phiên đăng nhập đã hết hạn', public code = 'UNAUTHORIZED', public statusCode = 401) {
    super(message);
    this.name = 'AuthError';
    // Maintaining explicit prototype chain for standard JavaScript Environments
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

/**
 * Robust fetch API wrapper designed for Server Components.
 * Automatically handles admin_token injection and standardizes Error extraction.
 */
export async function fetchAPI(endpoint: string, options: RequestInit = {}): Promise<any> {
  const url = `${API_BASE}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  // Inject authorization token from Next.js cookies (Server Side)
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(url, { ...options, headers });

  // Handle 401 Unauthorized / 403 Forbidden specifically (Graceful Degradation Triggers)
  if (res.status === 401 || res.status === 403) {
    throw new AuthError('Bạn cần đăng nhập để xem nội dung này', res.status === 401 ? 'UNAUTHORIZED' : 'FORBIDDEN', res.status);
  }

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const message = typeof data === 'object' && data.error ? data.error : (data.message || 'Lỗi kết nối API');
    throw new Error(message);
  }

  return data;
}
