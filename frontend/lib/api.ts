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
 * Robust fetch API wrapper designed to work in both Server and Client Components.
 * Server side: Injects admin_token from Next.js cookies and calls backend directly.
 * Client side: Routes through the Next.js API proxy (/api/admin).
 */
export async function fetchAPI(endpoint: string, options: RequestInit = {}): Promise<any> {
  const isServer = typeof window === 'undefined';
  let url: string;
  const headers = new Headers(options.headers);

  if (isServer) {
    // Server Side Logic: Requires next/headers
    try {
      // Dynamic import to avoid client-side bundling issues
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      const token = cookieStore.get('admin_token')?.value;
      
      url = `${API_BASE}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    } catch (error: any) {
       // Suppress "Dynamic server usage" log during build, it's a Next.js signal
       if (!error.message?.includes('Dynamic server usage')) {
         console.error('[fetchAPI] Server side cookie access error:', error.message);
       }
       url = `${API_BASE}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
       // If it is dynamic server usage, and we are catching it, 
       // we might be accidentally swallowing a signal Next.js needs.
       // However, marking pages with force-dynamic is the preferred fix.
    }
  } else {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    // Improved logic to avoid double prefixing
    if (cleanEndpoint.startsWith('/api/admin')) {
      url = cleanEndpoint;
    } else if (cleanEndpoint.startsWith('/admin')) {
      url = `/api${cleanEndpoint}`;
    } else {
      url = `/api/admin${cleanEndpoint}`;
    }
  }

  headers.set('Accept', 'application/json');
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(url, { ...options, headers });

  // Handle 401 Unauthorized / 403 Forbidden specifically
  if (res.status === 401 || res.status === 403) {
    throw new AuthError('Bạn cần đăng nhập để xem nội dung này', res.status === 401 ? 'UNAUTHORIZED' : 'FORBIDDEN', res.status);
  }

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const message = typeof data === 'object' 
      ? (data.message || data.error || 'Lỗi kết nối API') 
      : (data || 'Lỗi kết nối API');
    throw new Error(message);
  }

  return data;
}
