import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:8000/api';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Send credentials to Laravel Auth API
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return NextResponse.json(
        { success: false, error: data.error || 'Authentication failed' },
        { status: res.status }
      );
    }

    // Capture Sanctum token
    const token = data.data.token;
    const cookieStore = await cookies();

    // Set HTTP Only Cookie
    cookieStore.set('admin_token', token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 Week
      sameSite: 'lax',
    });

    return NextResponse.json({ success: true, user: data.data.user });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
  return NextResponse.json({ success: true });
}
