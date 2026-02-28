import React from 'react';
import PetForm from '../../components/PetForm';

export const metadata = { title: 'Thêm Thú Cưng Mới — Admin' };

export default function NewPetPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="font-menu font-black text-[#1a1a1a] text-[24px]">Thêm Thú Cưng Mới</h1>
        <p className="font-menu text-gray-400 text-[14px]">
          Điền thông tin và tải ảnh lên để đăng hồ sơ tìm chủ mới.
        </p>
      </div>
      
      <PetForm />
    </div>
  );
}
