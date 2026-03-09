<x-mail::message>
# Xin chào {{ $adoption->user->name }},

Hồ sơ xin nhận nuôi bé **{{ $adoption->pet->name }}** của bạn đã xuất sắc vượt qua vòng sàng lọc ban đầu! 🎉

Chúng tôi rất mong được trò chuyện thêm với bạn để hiểu rõ hơn về mong muốn và điều kiện chăm sóc của bạn dành cho bé.

Vui lòng chuẩn bị và sắp xếp thời gian, nhân viên của trạm Pet Adoption sẽ liên hệ với bạn để chốt lịch phỏng vấn (bạn có thể lựa chọn phỏng vấn Online hoặc Offline ngay tại trạm).

Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại trả lời email này nhé.

Cảm ơn bạn vì đã chung tay mang lại một mái ấm mới cho các bé thú cưng.

Thân mến,<br>
Đội ngũ {{ config('app.name') }}
</x-mail::message>
