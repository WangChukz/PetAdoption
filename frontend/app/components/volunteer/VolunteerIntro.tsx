import Image from 'next/image';
import React from 'react';

export default function VolunteerIntro() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-14 md:py-24">
      <div className="w-full max-w-[1100px] mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">

          {/* Left: Image — wider */}
          <div className="w-full md:w-[46%] relative h-[320px] md:h-[440px] rounded-xl overflow-hidden shadow-lg flex-shrink-0">
            <Image
              src="https://hanoipetadoption.com/admin/user-content/5d4d003a-2692-4ba4-aa87-34721ef49644.jpg"
              alt="Tình nguyện viên đang chăm sóc thú cưng"
              fill
              className="object-cover"
            />
          </div>

          {/* Right: Text */}
          <div className="flex-1">
            <span className="font-menu text-[#f08c50] font-bold text-[14px] uppercase tracking-widest mb-4 block">
              Về Chúng Tôi
            </span>
            <h2 className="font-menu font-black text-[26px] md:text-[34px] text-[#1a1a1a] mb-6 leading-snug">
              Giới Thiệu Tình Nguyện Viên Cứu Hộ Chó Mèo
            </h2>
            <div className="font-menu text-[16px] text-gray-600 leading-[1.9] space-y-5 text-justify">
              <p>
                Thuộc tổ chức Hanoi Pet Adoption, chúng tôi có hơn 50 thành viên tình nguyện đang chung tay chăm sóc và tìm kiếm mái ấm cho hàng trăm chú thú cưng mỗi năm. Tình nguyện là lối sống, là cam kết và là trách nhiệm với cộng đồng.
              </p>
              <p>
                Nếu bạn yêu thương động vật và muốn đóng góp sức lực cho một mục tiêu ý nghĩa, hãy gia nhập đội ngũ tình nguyện viên của chúng tôi. Dù bạn có kỹ năng chụp ảnh, chăm sóc, hay đơn giản chỉ là có tình yêu với thú cưng — đều có một vị trí dành cho bạn.
              </p>
              <p>
                Tình nguyện viên của chúng tôi là những người anh hùng thầm lặng — không cần bằng cấp, chỉ cần tấm lòng!
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
