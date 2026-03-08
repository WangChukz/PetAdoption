import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://127.0.0.1:8000/api';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    const body = await req.json();

    const res = await fetch(`${API_BASE}/admin/volunteers/bulk-delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('[bulk-delete] Backend error:', res.status, data);
      return NextResponse.json(
        { success: false, message: data.message || data.error || 'Xóa thất bại.' },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('[bulk-delete] Proxy error:', error.message);
    return NextResponse.json(
      { success: false, message: error.message || 'Lỗi hệ thống khi xóa.' },
      { status: 500 }
    );
  }
}
