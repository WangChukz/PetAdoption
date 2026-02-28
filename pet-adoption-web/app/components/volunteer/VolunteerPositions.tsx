import Image from 'next/image';
import React from 'react';

const positions = [
  {
    id: 1,
    title: 'TNV Chụp Ảnh Quay Video Cho Các Bé',
    description: 'Bạn yêu nhiếp ảnh và muốn giúp những chú chó, mèo có bức ảnh đẹp để tăng khả năng được nhận nuôi? Đây chính là vị trí dành cho bạn!',
    image: 'https://hanoipetadoption.com/admin/user-content/Volunteer/dc329fa2-77f3-43e9-af74-789eb52b5ed3.jpg',
    requirements: [
      'Có máy ảnh hoặc điện thoại chụp ảnh tốt',
      'Có kỹ năng chỉnh sửa ảnh cơ bản (biết dùng Lightroom hoặc tương đương)',
      'Có khả năng chụp quay video ngắn, làm reel/TikTok giới thiệu thú cưng',
      'Kiên nhẫn, yêu động vật — quan trọng nhất là yêu thú cưng!',
      'Sẵn lòng đến khu vực nuôi nhốt để chụp trực tiếp (không upload ảnh mờ nhòe)',
    ],
  },
  {
    id: 2,
    title: 'TNV Chăm Sóc Tạm Thời Các Bé Tại Nhà Của Bạn',
    description: 'Bạn có không gian và tình thương để nuôi tạm một chú chó hoặc mèo trong khi chờ chúng tìm được mái ấm? Foster là cách tốt nhất để cứu thêm nhiều sinh mệnh!',
    image: 'https://hanoipetadoption.com/admin/user-content/Volunteer/220885ad-73cd-4f2f-96e4-df481fb11400.jpg',
    requirements: [
      'Người lớn (từ 18 tuổi trở lên) có khả năng chịu trách nhiệm',
      'Có không gian tại nhà phù hợp với thú cưng (nhà chung cư cần xem xét kỹ)',
      'Không có thú cưng nào đang bệnh hoặc hung hăng trong nhà',
      'Cam kết chăm sóc đúng theo hướng dẫn của đội ngũ y tế Petcare',
      'Sẵn sàng phối hợp chụp ảnh và đăng tin weekly để tăng cơ hội nhận nuôi cho bé',
    ],
  },
  {
    id: 3,
    title: 'TNV Dọn Dẹp Nhà Chung',
    description: 'Nhà chung của các bé luôn cần được dọn dẹp sạch sẽ hàng ngày để đảm bảo môi trường lành mạnh. Bạn không ngại khó, ngại bẩn — đây là công việc ý nghĩa nhất!',
    image: 'https://hanoipetadoption.com/admin/user-content/Volunteer/7686847e-4f9a-45e2-ba09-262c24439752.jpg',
    requirements: [
      'Không có dị ứng với lông thú cưng',
      'Chăm chỉ, cẩn thận và vui vẻ khi làm việc',
      'Sẵn lòng đến điểm nuôi ít nhất 1-2 lần/tuần',
      'Biết sử dụng các sản phẩm vệ sinh an toàn cho thú cưng',
    ],
  },
  {
    id: 4,
    title: 'TNV Phòng Văn Tin Chú',
    description: 'Bạn giỏi viết lách, quản lý mạng xã hội hay có kỹ năng thiết kế? Chúng tôi cần người hỗ trợ truyền thông, đăng tin và kết nối cộng đồng trực tuyến.',
    image: 'https://hanoipetadoption.com/admin/user-content/Volunteer/262d40ba-c398-4f3f-85b3-cd9d18d0d373.jpeg',
    requirements: [
      'Có kỹ năng viết content tiếng Việt tốt, diễn đạt rõ ràng, cảm xúc',
      'Có thể quản lý fanpage Facebook hoặc tài khoản TikTok/Instagram',
      'Biết dùng Canva hoặc các công cụ thiết kế cơ bản',
      'Có trách nhiệm, đúng giờ trong việc đăng bài theo lịch',
    ],
  },
];

function BulletIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#0489a9] mr-3 mt-0.5 flex-shrink-0">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function VolunteerPositions() {
  return (
    <section id="volunteer-positions" className="max-w-7xl mx-auto px-8 py-14 md:py-24">
      <div className="w-full max-w-[1100px] mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16 border-t border-gray-200 pt-14">
          <span className="font-menu text-[#f08c50] font-bold text-[14px] uppercase tracking-widest mb-3 block">
            Tham Gia Ngay
          </span>
          <h2 className="font-menu font-black text-[28px] md:text-[38px] text-[#1a1a1a]">
            Thông Tin Tình Nguyện Viên
          </h2>
        </div>

        {/* Position Cards */}
        <div className="flex flex-col gap-20">
          {positions.map((pos, idx) => (
            <div key={pos.id} className={`flex flex-col md:flex-row gap-10 md:gap-16 items-start ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

              {/* Image — larger */}
              <div className="w-full md:w-[360px] h-[260px] md:h-[320px] relative rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                <Image
                  src={pos.image}
                  alt={pos.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-menu font-black text-[#0489a9] text-[20px] md:text-[24px] mb-4 leading-snug">
                  {pos.title}
                </h3>
                <p className="font-menu text-[16px] text-gray-600 leading-[1.9] mb-6 italic text-justify">
                  {pos.description}
                </p>

                <p className="font-menu font-bold text-[16px] text-gray-800 mb-4">Yêu cầu:</p>
                <ul className="flex flex-col gap-3">
                  {pos.requirements.map((req, rIdx) => (
                    <li key={rIdx} className="flex items-start font-menu text-[15px] text-gray-600 leading-[1.8] text-justify">
                      <BulletIcon />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
