import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://127.0.0.1:8000/api';

async function handleProxy(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const targetPath = path ? path.join('/') : '';
  const searchParams = req.nextUrl.searchParams.toString();
  const url = `${API_BASE}/admin/${targetPath}${searchParams ? `?${searchParams}` : ''}`;

  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  const headers = new Headers(req.headers);
  headers.delete('host');
  headers.delete('referer');
  headers.delete('origin');
  
  headers.set('Accept', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Use streaming for non-GET/HEAD requests
  let body: any = undefined;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    body = req.body;
    // When streaming, keep the original content-type which has the boundary
    // But remove content-length to let fetch/undici recalculate it
    headers.delete('content-length');
  }

  try {
    console.log(`[PROXY] ${req.method} ${url}`);
    const res = await fetch(url, {
      method: req.method,
      headers,
      body,
      cache: 'no-store', // Prevent Next.js from aggressively caching the proxied API responses
      // @ts-ignore - duplex is needed for streaming bodies in Node.js
      duplex: 'half',
    });

    console.log(`[PROXY] Response: ${res.status}`);
    const isJson = res.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await res.json() : await res.text();

    return NextResponse.json(data, {
      status: res.status,
      headers: {
        'Content-Type': isJson ? 'application/json' : 'text/plain',
      }
    });
  } catch (error: any) {
    console.error(`[PROXY] Error:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const PATCH = handleProxy;
export const DELETE = handleProxy;
