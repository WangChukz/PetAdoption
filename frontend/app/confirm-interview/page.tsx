import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:8000/api';

type Status = 'success' | 'already_confirmed' | 'invalid';

interface PageProps {
  searchParams: Promise<{ token?: string; status?: string; name?: string }>;
}

async function processToken(token: string): Promise<{ status: Status; name?: string }> {
  try {
    const res = await fetch(
      `${API_BASE}/volunteer/confirm-interview?token=${encodeURIComponent(token)}`,
      { redirect: 'manual', cache: 'no-store' }
    );

    // Laravel redirects to /confirm-interview?status=...&name=...
    // With redirect:'manual', we get a 302 and read the Location header
    if (res.status === 302 || res.status === 301) {
      const location = res.headers.get('location') ?? '';
      const redirectUrl = new URL(location, API_BASE);
      const status = (redirectUrl.searchParams.get('status') ?? 'invalid') as Status;
      const name = redirectUrl.searchParams.get('name') ?? undefined;
      return { status, name: name ? decodeURIComponent(name) : undefined };
    }

    return { status: 'invalid' };
  } catch {
    return { status: 'invalid' };
  }
}

const STATES: Record<Status, { icon: string; title: (name?: string) => string; subtitle: string; color: string }> = {
  success: {
    icon: '🎉',
    title: (name) => `Xác nhận thành công${name ? `, ${name}!` : '!'}`,
    subtitle: 'Chúng tôi đã ghi nhận xác nhận của bạn. Đội ngũ PetJam sẽ gửi link Google Meet và thông tin chi tiết qua email.',
    color: 'text-green-600',
  },
  already_confirmed: {
    icon: '✅',
    title: () => 'Bạn đã xác nhận trước đó!',
    subtitle: 'Thông tin của bạn đã được ghi nhận. Không cần xác nhận lại. Hãy chờ email hướng dẫn từ đội ngũ PetJam.',
    color: 'text-blue-600',
  },
  invalid: {
    icon: '⚠️',
    title: () => 'Link không hợp lệ hoặc đã hết hạn',
    subtitle: 'Link xác nhận không đúng hoặc đã hết hạn. Vui lòng liên hệ với chúng tôi để được hỗ trợ.',
    color: 'text-red-500',
  },
};

export default async function ConfirmInterviewPage({ searchParams }: PageProps) {
  const params = await searchParams;
  
  let status: Status = 'invalid';
  let name: string | undefined;

  if (params.token) {
    // Token came directly from email link → process it server-side
    const result = await processToken(params.token);
    status = result.status;
    name = result.name;
  } else if (params.status) {
    // Already processed (redirect from Laravel) — just display
    status = (params.status as Status) ?? 'invalid';
    name = params.name;
  }

  const state = STATES[status];

  return (
    <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-10 text-center">
        <div className="text-[64px] mb-5">{state.icon}</div>
        <h1 className={`font-menu font-black text-[24px] mb-3 ${state.color}`}>
          {state.title(name)}
        </h1>
        <p className="font-menu text-gray-500 text-[15px] leading-relaxed mb-8">
          {state.subtitle}
        </p>

        {status === 'success' && (
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-8 text-left">
            <p className="font-menu text-[13px] text-gray-600 font-semibold mb-1">📋 Các bước tiếp theo:</p>
            <ul className="font-menu text-[13px] text-gray-500 space-y-1.5 mt-2">
              <li>✅ &nbsp;Xác nhận đã được ghi nhận</li>
              <li>📧 &nbsp;Kiểm tra hộp thư để nhận link Google Meet</li>
              <li>🕐 &nbsp;Nhớ tham gia đúng giờ trong buổi phỏng vấn nhé!</li>
            </ul>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="font-menu bg-[#f08c50] hover:bg-[#d16830] text-white px-8 py-3 rounded-xl font-bold text-[14px] transition">
            Về Trang Chủ
          </Link>
          <Link href="/volunteer" className="font-menu bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-bold text-[14px] transition">
            Trang Tình Nguyện Viên
          </Link>
        </div>
      </div>
    </div>
  );
}
