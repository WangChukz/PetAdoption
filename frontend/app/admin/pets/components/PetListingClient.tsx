'use client';

import React, { useState, useEffect, useCallback } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

import { 
  Plus, 
  Search, 
  Dog,
  CheckCircle2,
  FilterX,
  Loader2,
  ChevronDown,
  Layers,
  SlidersHorizontal,
  Home,
  Activity,
  Heart,
  Briefcase,
  Edit2,
  Trash2,
  PawPrint,
  ChevronLeft,
  ChevronRight,
  LogOut,
  TrendingUp
} from 'lucide-react';
import ConfirmModal from '../../components/ConfirmModal';
import CustomDropdown from '../../components/CustomDropdown';
import { toast } from 'react-hot-toast';
import { getPetImageUrl } from '@/lib/imageUtils';

type Pet = {
  id: number;
  name: string;
  species: string;
  age_months: number;
  breed: string | null;
  pet_profile?: {
    status: string;
    intake_date: string | null;
  };
  gender: 'male' | 'female' | 'unknown';
  image_url: string | null;
};

type PaginatedPets = {
  data: Pet[];
  current_page: number;
  last_page: number;
  total: number;
};

type Props = {
  initialData: PaginatedPets;
  statusMap: Record<string, { label: React.ReactNode; color: string }>;
};

export default function PetListingClient({ initialData, statusMap }: Props) {
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>(initialData.data);
  const [pagination, setPagination] = useState({
    current_page: initialData.current_page,
    last_page: initialData.last_page,
    total: initialData.total,
  });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    species: '',
    status: '',
    gender: '',
    breed: '',
  });

  // Selection State
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Modal State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    petId: null as number | null,
    isDeleting: false
  });

  const [bulkDeleteModal, setBulkDeleteModal] = useState({
    isOpen: false,
    isDeleting: false
  });

  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [metadata, setMetadata] = useState<{
    species: string[];
    breeds: Record<string, string[]>;
  }>({
    species: [],
    breeds: {}
  });

  const fetchPets = useCallback(async (
    page: number = 1, 
    searchTerm: string = '', 
    currentFilters: typeof filters = filters
  ) => {
    setLoading(true);
    try {
      const query = new URLSearchParams({ 
        page: page.toString(),
        per_page: '5',
        search: searchTerm,
        species: currentFilters.species,
        status: currentFilters.status,
        gender: currentFilters.gender,
        breed: currentFilters.breed,
      });

      const res = await fetch(`/api/admin/pets?${query.toString()}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'API returned failure');

      const data = json.data;
      setPets(data.data || []);
      setPagination({
        current_page: data.current_page || 1,
        last_page: data.last_page || 1,
        total: data.total || 0,
      });
      // Clear selection when page changes
      setSelectedIds([]);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchDashboardStats = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/stats');
      if (!res.ok) return;
      const json = await res.json();
      if (json.success) {
        setDashboardStats(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
    }
  }, []);

  const fetchMetadata = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/pets/metadata');
      if (!res.ok) return;
      const json = await res.json();
      if (json.success) {
        setMetadata(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch filter metadata:', err);
    }
  }, []);

  useEffect(() => {
    fetchPets();
    fetchDashboardStats();
    fetchMetadata();
  }, [fetchPets, fetchDashboardStats, fetchMetadata]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPets(1, search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search, fetchPets]);

  const handleFilterChange = (name: keyof typeof filters, value: string) => {
    let newFilters = { ...filters, [name]: value };
    
    // Reset breed if species changes
    if (name === 'species') {
      newFilters.breed = '';
    }
    
    setFilters(newFilters);
    fetchPets(1, search, newFilters);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(pets.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectItem = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDelete = (id: number) => {
    setDeleteModal({
      isOpen: true,
      petId: id,
      isDeleting: false
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.petId) return;
    
    setDeleteModal(prev => ({ ...prev, isDeleting: true }));
    try {
      const res = await fetch(`/api/admin/pets/${deleteModal.petId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

      if (!res.ok) throw new Error('Failed to delete pet');
      
      toast.success('Đã xóa hồ sơ thú cưng thành công');
      setPets(prev => prev.filter(p => p.id !== deleteModal.petId));
      setSelectedIds(prev => prev.filter(i => i !== deleteModal.petId));
      setDeleteModal({ isOpen: false, petId: null, isDeleting: false });
      
      // Refresh list to update totals if needed
      fetchPets(pagination.current_page, search);
      fetchDashboardStats();
    } catch (err) {
      console.error(err);
      toast.error('Có lỗi xảy ra khi xóa hồ sơ');
      setDeleteModal(prev => ({ ...prev, isDeleting: false }));
    }
  };

  const confirmBulkDelete = async () => {
    if (selectedIds.length === 0) return;

    setBulkDeleteModal((prev) => ({ ...prev, isDeleting: true }));
    try {
      const res = await fetch(`/api/admin/pets/bulk-delete`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (!res.ok) throw new Error('Failed to delete pets');

      const json = await res.json();
      toast.success(json.message || `Đã xóa thành công ${selectedIds.length} thú cưng`);
      
      setBulkDeleteModal({ isOpen: false, isDeleting: false });
      setSelectedIds([]);
      
      // Refresh list
      fetchPets(pagination.current_page, search);
      fetchDashboardStats();
    } catch (err) {
      console.error(err);
      toast.error('Có lỗi xảy ra khi xóa hàng loạt');
      setBulkDeleteModal((prev) => ({ ...prev, isDeleting: false }));
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-menu font-black text-[#101828] text-[20px] tracking-tight leading-none mb-1">Danh Sách Thú Cưng</h1>
          <p className="font-menu text-gray-400 text-[13px] font-medium transition-colors hover:text-gray-500">Quản lý <span className="text-[#3A8D9D] font-black">{pagination.total}</span> thú cưng trong hệ thống</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <button
              onClick={() => setBulkDeleteModal({ isOpen: true, isDeleting: false })}
              className="inline-flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2.5 rounded-[10px] font-menu text-[13.5px] transition-all shadow-sm active:scale-95"
            >
              <Trash2 className="w-4 h-4 stroke-[2.5]" /> Xóa {selectedIds.length} mục đã chọn
            </button>
          )}
          <NextLink href="/admin/pets/new"
            className="inline-flex items-center justify-center gap-1.5 bg-[#f08c50] hover:bg-[#e07b40] text-white px-5 py-2.5 rounded-[10px] font-menu text-[13.5px] transition-all shadow-md active:scale-95 hover:scale-105">
            <Plus className="w-4 h-4 stroke-[4]" /> Thêm Thú Cưng Mới
          </NextLink>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { 
            label: 'TỔNG SỐ THÚ CƯNG', 
            value: dashboardStats?.pets?.total || pagination.total, 
            trend: dashboardStats?.pets?.trend > 0 ? `+${dashboardStats.pets.trend} tuần này` : null, 
            icon: PawPrint, 
            trendColor: 'text-emerald-500 bg-emerald-50 ring-1 ring-emerald-500/10' 
          },
          { 
            label: 'SẴN SÀNG NHẬN NUÔI', 
            value: dashboardStats?.pets?.available || 0, 
            icon: CheckCircle2 
          },
          { 
            label: 'ĐÃ CÓ CHỦ', 
            value: dashboardStats?.pets?.adopted || 0, 
            trend: dashboardStats?.pets?.adoptedTrend > 0 ? `+${dashboardStats.pets.adoptedTrend} tuần này` : null, 
            icon: Home, 
            trendColor: 'text-[#3A8D9D] bg-teal-50 ring-1 ring-[#3A8D9D]/10' 
          },
          { 
            label: 'ĐANG ĐIỀU TRỊ', 
            value: dashboardStats?.pets?.in_treatment || 0, 
            icon: Briefcase 
          },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-[12px] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden flex flex-col justify-between h-[120px]">
             <div className="relative z-10">
               <p className="font-menu text-[12px] font-bold text-[#64748b] uppercase tracking-wide mb-3">{stat.label}</p>
                <div className="flex items-center gap-2">
                   <h3 className="font-menu text-[42px] font-bold text-[#111827] leading-none tracking-tight">{stat.value}</h3>
                   {stat.trend && (
                    <span className={`${stat.trendColor} py-1 px-2.5 rounded-[8px] flex items-center gap-1 mt-1`}>
                      <TrendingUp size={14} className="stroke-[3]" />
                      <span className="text-[14px] font-bold">{stat.trend}</span>
                    </span>
                  )}
                </div>
             </div>
             <stat.icon className="absolute -right-2 top-1/2 -translate-y-1/2 w-24 h-24 text-[#3A8D9D] opacity-[0.05] group-hover:opacity-[0.1] transition-all duration-700 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Unified Card Container */}
      <div className="bg-white rounded-[10px] shadow-sm border border-gray-100 flex flex-col overflow-hidden mb-8">
        
        {/* Filter Section (Top Component) */}
        <div className="px-5 py-4 border-b border-gray-50 bg-white">
          <div className="flex flex-col xl:flex-row gap-4 items-center justify-between">
            {/* Filter Dropdowns Container */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <CustomDropdown 
                placeholder="Trạng thái"
                options={[
                  { id: '', label: 'Tất cả trạng thái' },
                  { id: 'READY_FOR_ADOPTION', label: 'Chờ nhận nuôi', color: 'bg-emerald-500' },
                  { id: 'AVAILABLE', label: 'Đang tìm chủ', color: 'bg-emerald-500' },
                  { id: 'ADOPTED', label: 'Đã có chủ', color: 'bg-blue-500' },
                  { id: 'TREATMENT', label: 'Đang điều trị', color: 'bg-orange-500' },
                  { id: 'FOSTERED', label: 'Chăm sóc tạm', color: 'bg-purple-500' },
                  { id: 'INTAKE', label: 'Mới nhận', color: 'bg-gray-500' },
                ]}
                value={filters.status}
                onChange={(val) => handleFilterChange('status', val)}
                className="w-[170px]"
              />
              
              <CustomDropdown 
                placeholder="Loài"
                options={[
                  { id: '', label: 'Tất cả loài' },
                  ...metadata.species.map(s => ({ id: s, label: s }))
                ]}
                value={filters.species}
                onChange={(val) => handleFilterChange('species', val)}
                className="w-[140px]"
              />

              <CustomDropdown 
                placeholder={filters.species ? "Giống loài" : "Chọn loài trước"}
                options={[
                  { id: '', label: 'Tất cả giống' },
                  ...(filters.species ? (metadata.breeds[filters.species]?.map(b => ({ id: b, label: b })) || []) : [])
                ]}
                value={filters.breed}
                onChange={(val) => handleFilterChange('breed', val)}
                disabled={!filters.species}
                className="w-[170px]"
              />

              {(filters.status || filters.species || filters.breed) && (
                <button 
                  onClick={() => {
                    const reset = { status: '', species: '', gender: '', breed: '' };
                    setFilters(reset);
                    fetchPets(1, search, reset);
                  }}
                  className="text-[12px] font-bold text-gray-400 hover:text-red-500 px-2 transition-colors uppercase tracking-tight"
                >
                  Xóa lọc
                </button>
              )}
            </div>

            {/* Search Input Widget */}
            <div className="flex items-center gap-2 w-full xl:max-w-[420px]">
              <div className="relative flex-1 group">
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Lọc theo tên..."
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-[10px] pl-10 pr-4 py-2.5 text-[13px] font-menu font-medium focus:outline-none focus:border-[#3A8D9D] focus:ring-4 focus:ring-[#3A8D9D]/5 transition-all outline-none" 
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-[#3A8D9D] transition-colors" />
              </div>
              <button className="p-2.5 bg-white border border-gray-100 rounded-[10px] text-gray-400 hover:text-[#3A8D9D] hover:bg-gray-50 transition-all shadow-sm group">
                <SlidersHorizontal className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Data Table Component */}
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 z-30 backdrop-blur-[2px] bg-white/40 flex items-center justify-center transition-all duration-500">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 text-[#f08c50] animate-spin" />
              </div>
            </div>
          )}

          <div className="overflow-x-auto overflow-y-auto custom-scrollbar max-h-[450px]">
            <table className="w-full text-left border-collapse min-w-[950px]">
              <thead>
                <tr className="bg-[#3A8D9D] text-white font-menu text-[11px] font-black uppercase tracking-[0.15em] border-b border-white/10">
                  <th className="px-5 py-4 w-[60px] text-center">
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll}
                      checked={pets.length > 0 && selectedIds.length === pets.length}
                      className="rounded-[10px] border-none bg-white/20 text-white focus:ring-0 w-4.5 h-4.5 cursor-pointer shadow-inner transition-all hover:bg-white/30" 
                    />
                  </th>
                  <th className="px-4 py-4 border-r border-white/10">THÚ CƯNG</th>
                  <th className="px-4 py-4 border-r border-white/10">CHI TIẾT</th>
                  <th className="px-4 py-4 text-center border-r border-white/10">TRẠNG THÁI</th>
                  <th className="px-6 py-4 text-center border-r border-white/10">TIẾP NHẬN</th>
                  <th className="px-6 py-4 text-center">THAO TÁC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-menu text-[13.5px]">
                 {pets.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-20 text-gray-400 italic font-medium">Không có dữ liệu hiển thị.</td></tr>
                ) : (
                  pets.map((pet) => (
                    <tr key={pet.id} className={`hover:bg-gray-50 transition-all group duration-300 ${selectedIds.includes(pet.id) ? 'bg-blue-50/30' : ''}`}>
                      <td className="px-5 py-4 text-center border-r border-gray-50/50">
                         <input 
                          type="checkbox" 
                          checked={selectedIds.includes(pet.id)}
                          onChange={() => handleSelectItem(pet.id)}
                          className="rounded-[10px] border-gray-300 text-[#f08c50] focus:ring-[#f08c50]/20 w-4.5 h-4.5 cursor-pointer transition-all" 
                        />
                      </td>
                      <td className="px-4 py-4 border-r border-gray-50/50 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                          {pet.image_url ? (
                            <img 
                              src={getPetImageUrl(pet.image_url)} 
                              alt={pet.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <PawPrint className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <button 
                            onClick={() => router.push(`/admin/pets/${pet.id}`)}
                            className="text-[14px] font-bold text-[#101828] hover:text-[#f08c50] transition-colors text-left"
                          >
                            {pet.name}
                          </button>
                          <span className="text-[11px] text-gray-400 font-medium bg-gray-50 dark:bg-gray-800 px-1.5 py-0.5 rounded w-fit">#{pet.id.toString().padStart(4, '0')}</span>
                        </div>
                      </div>
                      </td>
                      <td className="px-4 py-4 border-r border-gray-50/50 whitespace-nowrap">
                         <div className="flex flex-col gap-0.5">
                           <span className="text-[13.5px] text-gray-800 font-normal">
                             {pet.age_months >= 12 
                               ? `${Math.floor(pet.age_months / 12)} tuổi` 
                               : `${pet.age_months} tháng`}
                           </span>
                           <span className="text-[10px] text-gray-400 font-normal">
                             {pet.breed || 'Tiêu chuẩn'}
                           </span>
                         </div>
                      </td>
                      <td className="px-4 py-4 text-center border-r border-gray-50/50 whitespace-nowrap">
                         {(() => {
                           const status = pet.pet_profile?.status || 'AVAILABLE';
                           const map = statusMap[status] || statusMap.AVAILABLE;
                            return (
                              <div className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${map.color} shadow-sm border border-current/10 transition-transform`}>
                                {map.label}
                              </div>
                            );
                         })()}
                      </td>
                      <td className="px-6 py-4 text-center border-r border-gray-50/50 text-gray-600 text-[13.5px] font-normal tracking-tight whitespace-nowrap">
                         {pet.pet_profile?.intake_date 
                           ? format(new Date(pet.pet_profile.intake_date), 'dd / MM / yyyy') 
                           : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                         <div className="flex items-center justify-center gap-2">
                           <NextLink href={`/admin/pets/${pet.id}`} className="p-2 text-blue-500 hover:bg-blue-50 rounded-[10px] transition-all" title="Chỉnh sửa">
                             <Edit2 className="w-4 h-4 stroke-[2.5]" />
                           </NextLink>
                           <button onClick={() => handleDelete(pet.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-[10px] transition-all" title="Xóa">
                             <Trash2 className="w-4 h-4 stroke-[2.5]" />
                           </button>
                         </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Navigation (Integrated) */}
        <div className="px-6 py-5 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4 font-menu bg-white">
          <p className="text-[13px] text-slate-500 font-normal tracking-tight">
            Đang xem <span className="text-blue-500 font-normal">
              {pagination.total === 0 ? 0 : ((pagination.current_page - 1) * 5) + 1}-{Math.min(pagination.current_page * 5, pagination.total)}
            </span> trong tổng số <span className="text-blue-500 font-normal">{pagination.total}</span>
          </p>
          <div className="flex items-center gap-2">
             <button 
                onClick={() => fetchPets(pagination.current_page - 1, search)}
                disabled={pagination.current_page <= 1}
                className="px-3 py-1.5 text-[13px] font-normal text-slate-600 border border-gray-200 rounded-[6px] hover:text-[#101828] hover:border-gray-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Trước
              </button>
             
             <div className="flex items-center gap-1.5">
               {Array.from({ length: Math.min(pagination.last_page, 5) }, (_, i) => i + 1).map((num) => (
                  <button 
                    key={num}
                    onClick={() => fetchPets(num, search)}
                    className={`w-8 h-8 rounded-[6px] font-normal text-[13px] transition-all duration-300
                      ${num === pagination.current_page 
                        ? 'bg-[#f08c50] text-white' 
                        : 'bg-white border border-gray-200 text-slate-600 hover:bg-gray-50'
                      }`}
                  >
                    {num}
                  </button>
               ))}
             </div>

             <button 
                onClick={() => fetchPets(pagination.current_page + 1, search)}
                disabled={pagination.current_page >= pagination.last_page}
                className="px-3 py-1.5 text-[13px] font-normal text-slate-600 border border-gray-200 rounded-[6px] hover:text-[#101828] hover:border-gray-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Sau
              </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, petId: null, isDeleting: false })}
        onConfirm={confirmDelete}
        title="Xác nhận xóa"
        message="Bạn có chắc chắn muốn xóa hồ sơ thú cưng này không? Hành động này không thể hoàn tác."
        confirmText="Tôi chắc chắn"
        cancelText="Để mình xem lại"
        type="danger"
        isLoading={deleteModal.isDeleting}
      />

      <ConfirmModal
        isOpen={bulkDeleteModal.isOpen}
        onClose={() => setBulkDeleteModal({ isOpen: false, isDeleting: false })}
        onConfirm={confirmBulkDelete}
        title="Xác nhận xóa hàng loạt"
        message={`Bạn có chắc chắn muốn xóa ${selectedIds.length} thú cưng đã chọn không? Toàn bộ hồ sơ và hình ảnh liên quan sẽ bị xóa vĩnh viễn.`}
        confirmText={`Xóa ${selectedIds.length} mục`}
        cancelText="Để mình xem lại"
        type="danger"
        isLoading={bulkDeleteModal.isDeleting}
      />
    </div>
  );
}
