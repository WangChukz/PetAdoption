import React from 'react';
import DonationForm from '../../components/DonationForm';

export const metadata = { title: 'Thêm Chuyển Khoản Mới — Admin' };

export default function NewDonationPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="font-menu font-black text-[#1a1a1a] text-[24px]">Thêm Khoản Thu / Chi</h1>
        <p className="font-menu text-gray-400 text-[14px]">
          Ghi nhận thủ công các khoản tiền mặt hoặc khi hệ thống ngân hàng chưa tự động cập nhật.
        </p>
      </div>
      
      <DonationForm />
    </div>
  );
}
