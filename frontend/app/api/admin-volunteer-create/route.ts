import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:8000/api';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('sanctum_token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: 'Chưa xác thực.' }, { status: 401 });
    }

    const formData = await request.formData();

    const res = await fetch(`${API_BASE}/admin/volunteers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { success: false, errors: data.errors, message: data.message || 'Tạo hồ sơ thất bại.' },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
