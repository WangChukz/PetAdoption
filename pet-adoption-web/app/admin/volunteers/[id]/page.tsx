import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import VolunteerReviewForm from '../../components/VolunteerReviewForm';
import VolunteerInfoEditForm from '../../components/VolunteerInfoEditForm';
import CvViewer from '../../components/CvViewer';
import { fetchAPI } from '@/lib/api';
import { CheckCircle2, XCircle, CalendarCheck2, Mic2, PartyPopper, Clock3 } from 'lucide-react';

async function getVolunteer(id: string) {
  const res = await fetchAPI(`/admin/volunteers/${id}`, { cache: 'no-store' });
  return res.data;
}

const STATUS_META: Record<string, { label: React.ReactNode; color: string }> = {
  pending:             { label: <span className="flex items-center gap-1.5"><Clock3 className="w-3.5 h-3.5" />Chờ Duyệt</span>,          color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  cv_passed:           { label: <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" />CV Đạt</span>,            color: 'bg-blue-100 text-blue-800 border-blue-200' },
  cv_rejected:         { label: <span className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5" />CV Không Đạt</span>,      color: 'bg-red-100 text-red-800 border-red-200' },
  interview_scheduled: { label: <span className="flex items-center gap-1.5"><CalendarCheck2 className="w-3.5 h-3.5" />Lịch PV Xác Nhận</span>, color: 'bg-purple-100 text-purple-800 border-purple-200' },
  interviewing:        { label: <span className="flex items-center gap-1.5"><Mic2 className="w-3.5 h-3.5" />Đang Phỏng Vấn</span>,   color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  passed:              { label: <span className="flex items-center gap-1.5"><PartyPopper className="w-3.5 h-3.5" />Đã Nhận Vào Đội</span>,  color: 'bg-green-100 text-green-800 border-green-200' },
  rejected:            { label: <span className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5" />Từ Chối</span>,           color: 'bg-red-100 text-red-800 border-red-200' },
};

export default async function AdminVolunteerReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getVolunteer(id);
  if (!data) notFound();

  const statusMeta = STATUS_META[data.status] ?? { label: data.status, color: 'bg-gray-100 text-gray-700 border-gray-200' };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">

      {/* ── Page Header ── */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/volunteers"
            className="flex items-center justify-center w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-xl transition shrink-0"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="font-menu font-black text-[#1a1a1a] text-[22px] leading-tight">
              Hồ Sơ #{data.id} — {data.name}
            </h1>
            <p className="font-menu text-gray-400 text-[13px] mt-0.5">
              Ngày nộp: {new Date(data.created_at).toLocaleString('vi-VN')}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <span className={`shrink-0 px-4 py-1.5 rounded-full border font-menu font-bold text-[13px] ${statusMeta.color}`}>
          {statusMeta.label}
        </span>
      </div>

      {/* ── Main 2-Column Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">

        {/* ── LEFT: Editable Info + CV ── */}
        <div className="flex flex-col gap-6">

          {/* Editable Applicant Info Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-menu font-black text-[#1a1a1a] text-[17px]">Thông Tin Ứng Viên</h2>
              <span className="font-menu text-[12px] text-gray-400 bg-gray-50 border border-gray-200 px-3 py-1 rounded-full">Có thể chỉnh sửa</span>
            </div>
            <VolunteerInfoEditForm data={{
              id: data.id,
              name: data.name,
              email: data.email,
              phone: data.phone,
              position: data.position,
              message: data.message,
              admin_notes: data.admin_notes,
            }} />
          </div>

          {/* CV Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
            <h2 className="font-menu font-black text-[#1a1a1a] text-[17px] mb-5">Hồ Sơ (CV / Portfolio)</h2>
            {data.cv_path ? (
              <CvViewer cvPath={data.cv_path} />
            ) : (
              <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                <span className="text-[36px] mb-3">📂</span>
                <p className="font-bold text-gray-400 font-menu text-[15px]">Ứng viên không đính kèm CV</p>
                <p className="font-menu text-gray-400 text-[13px] mt-1">Không tìm thấy file PDF nào được tải lên.</p>
              </div>
            )}
          </div>

        </div>

        {/* ── RIGHT: Review & Status Panel ── */}
        <div className="flex flex-col gap-5 sticky top-6">

          {/* Reviewer info if available */}
          {data.reviewed_by && (
            <div className="bg-gray-50 rounded-2xl border border-gray-100 px-5 py-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0 font-menu font-black text-gray-600 text-[13px]">
                {data.reviewed_by.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-menu font-bold text-gray-700 text-[13px]">{data.reviewed_by.name}</p>
                <p className="font-menu text-gray-400 text-[12px]">Người xét duyệt</p>
              </div>
            </div>
          )}

          {/* Review Decision Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#f08c50] inline-block"></span>
              <h2 className="font-menu font-black text-[#1a1a1a] text-[17px]">Đánh Giá Hồ Sơ</h2>
            </div>
            <p className="font-menu text-gray-400 text-[13px] mb-2 ml-4">
              Cập nhật trạng thái sau khi xem CV hoặc phỏng vấn xong.
            </p>
            <VolunteerReviewForm data={data} />
          </div>

        </div>
      </div>
    </div>
  );
}
