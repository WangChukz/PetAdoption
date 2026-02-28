import { NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:8000/api';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const res = await fetch(`${API_BASE}/volunteers`, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: formData, // forward multipart including file
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { success: false, errors: data.errors, message: data.message || 'Gửi đơn thất bại.' },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
