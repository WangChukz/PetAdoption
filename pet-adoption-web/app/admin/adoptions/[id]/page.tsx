import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdoptionReviewForm from '../../components/AdoptionReviewForm';

import { fetchAPI } from '@/lib/api';

async function getAdoption(id: string) {
  const res = await fetchAPI(`/admin/adoptions/${id}`, { cache: 'no-store' });
  return res.data;
}

export default async function AdminAdoptionReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getAdoption(id);

  if (!data) notFound();

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <Link href="/admin/adoptions" className="text-gray-400 hover:text-gray-700 transition font-black text-[20px] leading-none mb-1">
          ←
        </Link>
        <div>
          <h1 className="font-menu font-black text-[#1a1a1a] text-[24px]">
            Đơn Nhận Nuôi #{data.id}
          </h1>
          <p className="font-menu text-gray-500 text-[14px]">
            Ngày nộp: {new Date(data.created_at).toLocaleString('vi-VN')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left Col: Applicant & Pet Details */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-menu font-bold text-[#1a1a1a] text-[18px] mb-4 border-b border-gray-100 pb-3">Thông Tin Người Nhận</h2>
            <div className="space-y-3 font-menu text-[14px]">
               <p><span className="text-gray-500 inline-block w-24">Họ và tên:</span> <span className="font-semibold text-gray-800">{data.user?.name}</span></p>
               <p><span className="text-gray-500 inline-block w-24">Email:</span> <span className="font-medium text-gray-800">{data.user?.email}</span></p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-menu font-bold text-[#1a1a1a] text-[18px] mb-4 border-b border-gray-100 pb-3">Thú Cưng Nhận Nuôi</h2>
            <div className="flex items-start gap-4">
               {data.pet?.image_url ? (
                 <img src={`http://localhost:8000/storage/${data.pet.image_url}`} alt={data.pet.name} className="w-20 h-20 rounded-xl object-cover bg-gray-50 shadow-sm" />
               ) : (
                 <div className="w-20 h-20 rounded-xl bg-gray-50 flex items-center justify-center text-[30px]">🐾</div>
               )}
               <div className="font-menu">
                 <p className="font-black text-[20px] text-[#f08c50]">{data.pet?.name}</p>
                 <p className="text-[14px] text-gray-600 font-medium">Loài: {data.pet?.species}</p>
                 <Link href={`/admin/pets/${data.pet?.id}`} className="inline-block mt-2 text-[#0489a9] hover:underline text-[13px] font-semibold">
                   Xem hồ sơ bé
                 </Link>
               </div>
            </div>
          </div>
        </div>

        {/* Right Col: Message & Review Form */}
        <div className="lg:col-span-2 flex flex-col gap-6">
           <div className="bg-orange-50/50 rounded-2xl shadow-sm border border-[#f08c50]/20 p-6 flex flex-col h-full">
             <h2 className="font-menu font-bold text-[#f08c50] text-[18px] mb-4 border-b border-[#f08c50]/20 pb-3">Lời Nhắn / Lời Hứa</h2>
             <div className="font-menu text-[14px] text-gray-700 italic bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1">
                "{data.applicant_message || 'Không có lời nhắn.'}"
             </div>

             <AdoptionReviewForm data={data} />
           </div>
        </div>

      </div>
    </div>
  );
}
