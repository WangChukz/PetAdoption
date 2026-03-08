'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Plus, Trash2, Loader2, ListFilter, Search } from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import { toast } from 'react-hot-toast';
import VolunteerStats from './VolunteerStats';
import VolunteerFilters from './VolunteerFilters';
import VolunteerTable from './VolunteerTable';
import ConfirmModal from '../../components/ConfirmModal';

interface VolunteerListingClientProps {
  initialData: any;
  stats: any;
}

export default function VolunteerListingClient({ initialData, stats: initialStats }: VolunteerListingClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [volunteers, setVolunteers] = useState(initialData.data);
  const [pagination, setPagination] = useState({
    current_page: initialData.current_page,
    last_page: initialData.last_page,
    total: initialData.total,
  });
  const [stats, setStats] = useState(initialStats);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  
  // Single Delete state
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    volunteerId: null as number | null,
    isDeleting: false
  });

  // Sync state with initialData when props change (server-side filtering)
  useEffect(() => {
    setVolunteers(initialData.data);
    setPagination({
      current_page: initialData.current_page,
      last_page: initialData.last_page,
      total: initialData.total,
    });
  }, [initialData]);

  const handleSelectItem = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(volunteers.map((v: any) => v.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleDeleteItem = (id: number) => {
    setDeleteModal({
      isOpen: true,
      volunteerId: id,
      isDeleting: false
    });
  };

  const confirmSingleDelete = async () => {
    if (!deleteModal.volunteerId) return;
    
    setDeleteModal(prev => ({ ...prev, isDeleting: true }));
    try {
      const res = await fetchAPI(`/admin/volunteers/${deleteModal.volunteerId}`, {
        method: 'DELETE',
      });

      if (res.success) {
        toast.success('Đã xóa hồ sơ tình nguyện viên thành công');
        // Immediate UI update
        setVolunteers(prev => prev.filter((v: any) => v.id !== deleteModal.volunteerId));
        setSelectedIds(prev => prev.filter(id => id !== deleteModal.volunteerId));
        setDeleteModal({ isOpen: false, volunteerId: null, isDeleting: false });
        // Refresh list
        router.refresh();
      } else {
        throw new Error(res.message || 'Có lỗi xảy ra khi xóa');
      }
    } catch (err: any) {
      toast.error(err.message || 'Có lỗi xảy ra khi xóa hồ sơ');
      setDeleteModal(prev => ({ ...prev, isDeleting: false }));
    }
  };

  const confirmBulkDelete = async () => {
    if (selectedIds.length === 0) return;

    setIsBulkDeleting(true);
    try {
      const res = await fetchAPI('/admin/volunteers/bulk-delete', {
        method: 'POST',
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (res.success) {
        toast.success(res.message || `Đã xóa thành công ${selectedIds.length} hồ sơ`);
        // Immediate UI update
        setVolunteers(prev => prev.filter((v: any) => !selectedIds.includes(v.id)));
        setSelectedIds([]);
        setShowBulkDeleteModal(false);
        // Refresh list
        router.refresh();
      } else {
        throw new Error(res.message || 'Có lỗi xảy ra khi xóa');
      }
    } catch (err: any) {
      toast.error(err.message || 'Có lỗi xảy ra khi xóa dữ liệu');
    } finally {
      setIsBulkDeleting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-2 font-vietnam">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-menu font-black text-[#101828] text-[20px] tracking-tight leading-none mb-1">Quản Lý Tình Nguyện Viên</h1>
          <p className="font-menu text-gray-400 text-[13px] font-medium transition-colors hover:text-gray-500">
            Quản lý <span className="text-[#3A8D9D] font-black">{pagination.total}</span> hồ sơ ứng viên trong hệ thống
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <button
              onClick={() => setShowBulkDeleteModal(true)}
              className="inline-flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2.5 rounded-[10px] font-menu text-[13.5px] transition-all shadow-sm active:scale-95"
            >
              <Trash2 className="w-4 h-4 stroke-[2.5]" /> Xóa {selectedIds.length} hồ sơ đã chọn
            </button>
          )}
          <Link 
            href="/admin/volunteers/new" 
            className="inline-flex items-center justify-center gap-1.5 bg-[#f08c50] hover:bg-[#e07b40] text-white px-5 py-2.5 rounded-[10px] font-menu text-[13.5px] transition-all shadow-md active:scale-95 hover:scale-105 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 stroke-[4]" />
            Tạo Tuyển Dụng Mới
          </Link>
        </div>
      </div>

      {/* Statistics */}
      <VolunteerStats data={stats} />

      {/* Main Content Card */}
      <div className="bg-white rounded-[10px] shadow-sm border border-gray-100 flex flex-col mb-8 relative z-10">
        
        {/* Filters Area */}
        <div className="px-5">
          <VolunteerFilters />
        </div>

        {/* Table Area */}
        <div className="flex-1 bg-white border-t border-gray-50">
          <VolunteerTable 
            volunteers={volunteers} 
            selectedIds={selectedIds}
            onSelectItem={handleSelectItem}
            onSelectAll={handleSelectAll}
            onDeleteItem={handleDeleteItem}
          />
        </div>

        {/* Pagination Mirroring the detail page style but keeping current logic */}
        <div className="px-6 py-5 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4 font-menu bg-white rounded-b-[10px]">
          <p className="text-[13px] text-slate-500 font-normal tracking-tight">
            Đang xem <span className="text-[#3A8D9D] font-black">
              {pagination.total === 0 ? 0 : ((pagination.current_page - 1) * 15) + 1}-{Math.min(pagination.current_page * 15, pagination.total)}
            </span> trong tổng số <span className="text-[#3A8D9D] font-black">{pagination.total}</span>
          </p>
          
          <div className="flex items-center gap-2">
            <Link 
               href={`?${new URLSearchParams({...Object.fromEntries(searchParams.entries()), page: (pagination.current_page - 1).toString()})}`}
               className={`px-3 py-1.5 text-[13px] font-normal text-slate-600 border border-gray-200 rounded-[6px] hover:text-[#101828] hover:border-gray-300 transition-all ${pagination.current_page <= 1 ? 'opacity-30 pointer-events-none' : ''}`}
            >
              Trước
            </Link>
            
            <div className="flex items-center gap-1.5">
              {[...Array(pagination.last_page)].map((_, i) => (
                <Link 
                  key={i}
                  href={`?${new URLSearchParams({...Object.fromEntries(searchParams.entries()), page: (i + 1).toString()})}`}
                  className={`w-8 h-8 rounded-[6px] font-normal text-[13px] flex items-center justify-center transition-all duration-300
                    ${pagination.current_page === i + 1 
                      ? 'bg-[#f08c50] text-white' 
                      : 'bg-white border border-gray-200 text-slate-600 hover:bg-gray-50'}`}
                >
                  {i + 1}
                </Link>
              ))}
            </div>

            <Link 
               href={`?${new URLSearchParams({...Object.fromEntries(searchParams.entries()), page: (pagination.current_page + 1).toString()})}`}
               className={`px-3 py-1.5 text-[13px] font-normal text-slate-600 border border-gray-200 rounded-[6px] hover:text-[#101828] hover:border-gray-300 transition-all ${pagination.current_page >= pagination.last_page ? 'opacity-30 pointer-events-none' : ''}`}
            >
              Sau
            </Link>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, volunteerId: null, isDeleting: false })}
        onConfirm={confirmSingleDelete}
        title="Xác nhận xóa"
        message="Bạn có chắc chắn muốn xóa hồ sơ tình nguyện viên này không? Hành động này không thể hoàn tác."
        confirmText="Tôi chắc chắn"
        cancelText="Để mình xem lại"
        type="danger"
        isLoading={deleteModal.isDeleting}
      />

      <ConfirmModal
        isOpen={showBulkDeleteModal}
        onClose={() => setShowBulkDeleteModal(false)}
        onConfirm={confirmBulkDelete}
        title="Xác nhận xóa hàng loạt"
        message={`Bạn có chắc chắn muốn xóa ${selectedIds.length} hồ sơ tình nguyện viên đã chọn? Toàn bộ hồ sơ và thông tin liên quan sẽ bị xóa vĩnh viễn khỏi hệ thống.`}
        confirmText={`Xóa ${selectedIds.length} hồ sơ`}
        cancelText="Để mình xem lại"
        type="danger"
        isLoading={isBulkDeleting}
      />
    </div>
  );
}
