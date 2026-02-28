'use client'; 

import { useEffect } from 'react';
import Link from 'next/link';
import { AuthError } from '@/lib/api';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string; code?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const isAuthError = error.name === 'AuthError' || error.message.includes('đăng nhập');

  return (
    <div className="max-w-4xl mx-auto py-20 bg-white rounded-2xl shadow-sm border border-red-100 flex flex-col items-center text-center px-6">
      <span className="text-[56px] mb-4">{isAuthError ? '🔐' : '⚠️'}</span>
      <h2 className="font-menu font-black text-[#1a1a1a] text-[20px] mb-2">
        {isAuthError ? 'Phiên đăng nhập hết hạn' : 'Đã có lỗi xảy ra!'}
      </h2>
      <p className="font-menu text-gray-500 text-[14px] max-w-sm mb-6">
        {isAuthError 
          ? 'Bạn không có quyền truy cập hoặc phiên đã hết hạn. Vui lòng đăng nhập lại để tiếp tục.' 
          : error.message || 'Lỗi hệ thống khi tải dữ liệu. Vui lòng thử lại sau.'}
      </p>
      
      <div className="flex gap-3">
        {isAuthError ? (
          <Link href="/login" 
            className="font-menu bg-[#1a1a1a] hover:bg-black text-white px-6 py-2.5 rounded-xl font-semibold text-[13px] transition">
            Đăng nhập lại
          </Link>
        ) : (
          <button
            onClick={() => reset()}
            className="font-menu bg-[#1a1a1a] hover:bg-black text-white px-6 py-2.5 rounded-xl font-semibold text-[13px] transition"
          >
            Thử tải lại trang
          </button>
        )}
        <Link href="/" 
          className="font-menu bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-semibold text-[13px] transition">
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
