'use client';

import React, { useState } from 'react';

const API_STORAGE = process.env.NEXT_PUBLIC_STORAGE_URL ?? 'http://localhost:8000/storage';

export default function CvViewer({ cvPath }: { cvPath: string }) {
  const [open, setOpen] = useState(false);
  const url = `${API_STORAGE}/${cvPath}`;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen(v => !v)}
          className="bg-[#1a1a1a] text-white px-5 py-2.5 rounded-xl font-menu font-bold text-[13px] hover:bg-black transition flex items-center gap-2"
        >
          <span>{open ? '▲ Ẩn CV' : '📄 Xem CV Ngay'}</span>
        </button>
        <a
          href={url}
          download
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-menu font-bold text-[13px] transition flex items-center gap-2"
        >
          ⬇ Tải xuống
        </a>
      </div>

      {open && (
        <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
          <iframe
            src={`${url}#toolbar=1&navpanes=0`}
            className="w-full"
            style={{ height: '680px' }}
            title="CV Preview"
          />
        </div>
      )}
    </div>
  );
}
