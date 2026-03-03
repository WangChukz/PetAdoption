'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { CheckCircle2, XCircle, CalendarCheck2, Mic2, PartyPopper, Clock3, ChevronDown } from 'lucide-react';
import ConfirmModal from './ConfirmModal';

type Application = {
  id: number;
  status: string;
  admin_notes: string | null;
  reviewed_by: { name: string } | null;
};

// Status display metadata
const STATUS_META: Record<string, { label: React.ReactNode; color: string }> = {
  pending:             { label: <span className="flex items-center gap-1.5"><Clock3 className="w-3.5 h-3.5" />Chờ Đánh Giá</span>,          color: 'bg-yellow-100 text-yellow-700' },
  cv_passed:           { label: <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" />CV Đạt</span>,              color: 'bg-blue-100 text-blue-700' },
  cv_rejected:         { label: <span className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5" />CV Không Đạt</span>,         color: 'bg-red-100 text-red-700' },
  interview_scheduled: { label: <span className="flex items-center gap-1.5"><CalendarCheck2 className="w-3.5 h-3.5" />Lịch PV Xác Nhận</span>,   color: 'bg-purple-100 text-purple-700' },
  interviewing:        { label: <span className="flex items-center gap-1.5"><Mic2 className="w-3.5 h-3.5" />Đang Phỏng Vấn</span>,          color: 'bg-indigo-100 text-indigo-700' },
  passed:              { label: <span className="flex items-center gap-1.5"><PartyPopper className="w-3.5 h-3.5" />Đã Nhận Vào Đội</span>,     color: 'bg-green-100 text-green-700' },
  rejected:            { label: <span className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5" />Từ Chối Sau PV</span>,         color: 'bg-red-100 text-red-700' },
};

// What transitions are allowed from each status
const ALLOWED_TRANSITIONS: Record<string, { value: string; label: React.ReactNode }[]> = {
  pending: [
    { value: 'cv_passed',    label: <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" />CV Đạt – Mời Phỏng Vấn</span> },
    { value: 'cv_rejected',  label: <span className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5" />CV Không Đạt – Từ Chối</span> },
  ],
  cv_passed: [],
  interview_scheduled: [
    { value: 'interviewing', label: <span className="flex items-center gap-1.5"><Mic2 className="w-3.5 h-3.5" />Bắt Đầu Phỏng Vấn</span> },
  ],
  interviewing: [
    { value: 'passed',   label: <span className="flex items-center gap-1.5"><PartyPopper className="w-3.5 h-3.5" />Đạt Phỏng Vấn – Nhận Vào Đội</span> },
    { value: 'rejected', label: <span className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5" />Không Đạt Phỏng Vấn</span> },
  ],
};

// Statuses that trigger emails
const EMAIL_TRIGGER = new Set(['cv_passed', 'cv_rejected', 'passed', 'rejected']);

// Terminal statuses — no more editing
const TERMINAL_STATUSES = new Set(['cv_rejected', 'passed', 'rejected']);

// Generate time slots from 07:00 to 18:00, step 30 min
const TIME_SLOTS: string[] = [];
for (let h = 7; h <= 18; h++) {
  TIME_SLOTS.push(`${String(h).padStart(2, '0')}:00`);
  if (h < 18) TIME_SLOTS.push(`${String(h).padStart(2, '0')}:30`);
}

export default function VolunteerReviewForm({ data }: { data: Application }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState(data.admin_notes || '');

  // Interview schedule pickers
  const [iDate, setIDate] = useState('');
  const [iTime, setITime] = useState('08:00');
  const [iMode, setIMode] = useState('Online (Google Meet)');

  // Custom decision dropdown
  const [decisionOpen, setDecisionOpen] = useState(false);
  const decisionRef = useRef<HTMLDivElement>(null);

  // Confirm Modal state
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState<{ title: string; message: string; type: 'warning' | 'danger' }>({
    title: '',
    message: '',
    type: 'warning'
  });

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (decisionRef.current && !decisionRef.current.contains(e.target as Node)) {
        setDecisionOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allowedOptions = ALLOWED_TRANSITIONS[data.status] ?? [];
  const isTerminal    = TERMINAL_STATUSES.has(data.status);
  const isWaiting     = data.status === 'cv_passed'; // waiting for candidate to confirm
  const willSendEmail = EMAIL_TRIGGER.has(newStatus);
  const needsDate     = newStatus === 'cv_passed';

  // Format interview date to human-readable string
  const interviewDateStr = iDate
    ? `${iTime} – ${new Date(iDate).toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })} (${iMode})`
    : '';

  const handleUpdate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newStatus) { toast.error('Vui lòng chọn trạng thái mới.'); return; }
    if (needsDate && !iDate) { toast.error('Vui lòng chọn ngày phỏng vấn.'); return; }

    // --- Confirmation Modal Trigger ---
    if (!showConfirm) {
        const selectedOption = allowedOptions.find(o => o.value === newStatus);
        const labelText = selectedOption ? (selectedOption.label as any)?.props?.children?.[1] || 'Trạng thái này' : 'Trạng thái này';

        if (newStatus === 'cv_rejected' || newStatus === 'rejected') {
            setConfirmConfig({
                title: 'Xác nhận từ chối hồ sơ?',
                message: `Quyết định "${labelText}" sẽ khiến hồ sơ bị xóa khỏi danh sách quản lý chính. Bạn có chắc chắn muốn tiếp tục?`,
                type: 'danger'
            });
            setShowConfirm(true);
            return;
        } else if (newStatus === 'cv_passed' || newStatus === 'passed') {
            setConfirmConfig({
                title: 'Xác nhận thông báo cho ứng viên?',
                message: `Bạn đã chọn "${labelText}". Hệ thống sẽ tự động gửi email thông báo cho ứng viên. Bạn có chắc chắn muốn tiếp tục?`,
                type: 'warning'
            });
            setShowConfirm(true);
            return;
        }
    }
    // ----------------------------------

    setLoading(true);
    setShowConfirm(false);

    try {
      const res = await fetch(`/api/admin/volunteers/${data.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          admin_notes: adminNotes,
          interview_date: needsDate ? interviewDateStr : undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || json.error || 'Cập nhật thất bại');

      if (json.warning) {
        toast.error(json.message, { duration: 6000 });
      } else {
        toast.success(willSendEmail ? '✅ Đã lưu & gửi email tự động!' : '✅ Đã cập nhật trạng thái!');
      }

      // Rejected apps are soft-deleted → go back to list
      if (newStatus === 'cv_rejected' || newStatus === 'rejected') {
        router.push('/admin/volunteers');
      } else {
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── READONLY: Terminal or waiting-for-candidate ──────────────────
  if (isTerminal) {
    const meta = STATUS_META[data.status];
    return (
      <div className="mt-6 border-t border-gray-100 pt-6">
        <h3 className="font-menu font-bold text-[#1a1a1a] text-[16px] mb-4">Trạng Thái Hồ Sơ</h3>
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold font-menu ${meta.color}`}>
          {meta.label}
        </div>
        <p className="font-menu text-gray-400 text-[13px] mt-3">
          Hồ sơ này đã được xử lý xong. Không thể chỉnh sửa thêm.
        </p>
      </div>
    );
  }

  if (isWaiting) {
    return (
      <div className="mt-6 border-t border-gray-100 pt-6">
        <h3 className="font-menu font-bold text-[#1a1a1a] text-[16px] mb-4">Chờ Ứng Viên Xác Nhận</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="font-menu text-blue-700 text-[13px] font-semibold">📧 Email mời PV đã được gửi</p>
          <p className="font-menu text-blue-600 text-[12px] mt-1">
            Đang chờ ứng viên click link xác nhận trong email. Trạng thái sẽ tự động chuyển sang <strong>Lịch PV Xác Nhận</strong>.
          </p>
        </div>
      </div>
    );
  }

  // ── NO more allowed transitions ──────────────────────────────────
  if (allowedOptions.length === 0) {
    return (
      <div className="mt-6 border-t border-gray-100 pt-6">
        <p className="font-menu text-gray-400 text-[13px]">Không có thao tác nào khả dụng ở trạng thái này.</p>
      </div>
    );
  }

  // ── ACTIVE FORM ───────────────────────────────────────────────────
  return (
    <form onSubmit={handleUpdate} className="flex flex-col gap-5 mt-6 border-t border-gray-100 pt-6">
      <h3 className="font-menu font-bold text-[#1a1a1a] text-[16px]">Cập Nhật Trạng Thái Hồ Sơ</h3>

      {/* Status — Custom Dropdown */}
      <div>
        <label className="block font-menu text-[13px] font-semibold text-gray-700 mb-1">
          Quyết Định <span className="text-red-500">*</span>
        </label>
        <div className="relative" ref={decisionRef}>
          <button
            type="button"
            onClick={() => setDecisionOpen(!decisionOpen)}
            className={`w-full flex items-center justify-between bg-gray-50 hover:bg-white border rounded-xl px-4 py-2.5 font-menu text-[14px] transition-all outline-none
              ${decisionOpen ? 'border-[#f08c50] ring-4 ring-[#f08c50]/10 bg-white' : 'border-gray-200 hover:border-gray-300'}
              ${newStatus ? 'text-gray-800' : 'text-gray-400'}`}
          >
            <span className="truncate">
              {newStatus ? allowedOptions.find(o => o.value === newStatus)?.label : '-- Chọn quyết định --'}
            </span>
            <svg className={`w-3.5 h-3.5 text-gray-400 ml-2 shrink-0 transition-transform duration-200 ${decisionOpen ? '-rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {decisionOpen && (
            <div className="absolute z-50 w-full mt-1.5 bg-white border border-gray-100 rounded-xl shadow-lg py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
              {allowedOptions.map(opt => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => {
                    setNewStatus(opt.value);
                    setDecisionOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 font-menu text-[13px] transition flex items-center gap-2
                    ${newStatus === opt.value
                      ? 'bg-orange-50 text-[#d16830] font-bold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-[#f08c50] font-medium'}`}
                >
                  {newStatus === opt.value ? (
                    <svg className="w-3.5 h-3.5 text-[#f08c50] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : <span className="w-3.5 shrink-0" />}
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Interview Date Pickers (only for cv_passed) */}
      {needsDate && (
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex flex-col gap-3">
          <p className="font-menu text-[13px] font-semibold text-orange-700">📅 Lịch Phỏng Vấn (hiển thị trong email)</p>

          <div>
            <label className="block font-menu text-[12px] font-semibold text-gray-600 mb-1">Ngày phỏng vấn</label>
            <input
              type="date"
              value={iDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => setIDate(e.target.value)}
              required
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[14px] font-menu focus:ring-2 focus:ring-[#f08c50]/20 focus:border-[#f08c50] transition"
            />
          </div>

          <div>
            <label className="block font-menu text-[12px] font-semibold text-gray-600 mb-1">Giờ bắt đầu</label>
            <div className="relative">
              <select
                value={iTime}
                onChange={e => setITime(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 pr-8 py-2 text-[14px] font-menu focus:ring-2 focus:ring-[#f08c50]/20 focus:border-[#f08c50] transition appearance-none cursor-pointer"
              >
                {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block font-menu text-[12px] font-semibold text-gray-600 mb-1">Hình thức</label>
            <div className="relative">
              <select
                value={iMode}
                onChange={e => setIMode(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 pr-8 py-2 text-[14px] font-menu focus:ring-2 focus:ring-[#f08c50]/20 focus:border-[#f08c50] transition appearance-none cursor-pointer"
              >
                <option>Online (Google Meet)</option>
                <option>Trực tiếp tại văn phòng</option>
                <option>Online (Zoom)</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {iDate && (
            <p className="font-menu text-[12px] text-orange-600 bg-white/70 rounded-lg px-3 py-2 border border-orange-100">
              📋 Nội dung email: <strong>{interviewDateStr}</strong>
            </p>
          )}
        </div>
      )}

      {/* Email warning */}
      {willSendEmail && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
          <p className="font-menu text-blue-700 text-[13px] font-semibold">📧 Email tự động sẽ được gửi</p>
          <p className="font-menu text-blue-600 text-[12px] mt-0.5">
            Hệ thống sẽ gửi email thông báo đến ứng viên ngay khi lưu.
          </p>
        </div>
      )}

      {/* Admin Notes */}
      <div>
        <label className="block font-menu text-[13px] font-semibold text-gray-700 mb-1">
          Ghi Chú Nội Bộ <span className="text-gray-400 font-normal">(Chỉ Admin xem)</span>
        </label>
        <textarea
          value={adminNotes}
          onChange={e => setAdminNotes(e.target.value)}
          rows={3}
          placeholder="Ví dụ: Kinh nghiệm tốt, thái độ nhiệt tình..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-menu focus:ring-2 focus:ring-[#f08c50]/20 focus:border-[#f08c50] focus:bg-white transition resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !newStatus}
        className="px-8 py-2.5 rounded-xl font-menu text-[14px] font-semibold text-white bg-[#1a1a1a] hover:bg-black transition shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? 'Đang lưu...' : '💾 Lưu Quyết Định'}
      </button>

      <ConfirmModal 
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => handleUpdate()}
        isLoading={loading}
        title={confirmConfig.title}
        message={confirmConfig.message}
        type={confirmConfig.type}
        confirmText="Tôi chắc chắn"
        cancelText="Để mình xem lại"
      />
    </form>
  );
}
