import React from 'react';
import PetForm from '../../components/PetForm';
import { notFound } from 'next/navigation';

import { fetchAPI } from '@/lib/api';

async function getPet(id: string) {
  const res = await fetchAPI(`/admin/pets/${id}`, { cache: 'no-store' });
  return res.data;
}

export default async function EditPetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pet = await getPet(id);

  if (!pet) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="font-menu font-black text-[#1a1a1a] text-[24px]">
          Cập Nhật: <span className="text-[#f08c50]">{pet.name}</span>
        </h1>
        <p className="font-menu text-gray-400 text-[14px]">
          Thay đổi trạng thái hoặc thông tin của bé.
        </p>
      </div>
      
      <PetForm initialData={pet} isEdit={true} />
    </div>
  );
}
