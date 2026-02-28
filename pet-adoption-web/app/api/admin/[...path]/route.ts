import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:8000/api';

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

  // Clone request body if present
  let body = null;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    // Check if it's multipart/form-data for file uploads
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      body = await req.formData();
      // Remove content-type so fetch automatically calculates boundaries
      headers.delete('content-type'); 
    } else {
      body = await req.text();
    }
  }

  try {
    const res = await fetch(url, {
      method: req.method,
      headers,
      body,
    });

    const isJson = res.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await res.json() : await res.text();

    return NextResponse.json(data, {
      status: res.status,
      headers: {
        'Content-Type': isJson ? 'application/json' : 'text/plain',
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const PATCH = handleProxy;
export const DELETE = handleProxy;
