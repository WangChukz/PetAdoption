<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Kết Quả Phỏng Vấn</title>
</head>
<body style="margin:0; padding:0; background:#f5f5f0; font-family: 'Segoe UI', Arial, sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f0; padding: 40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

      <tr>
        <td style="background: linear-gradient(135deg, #4a4a4a, #2a2a2a); padding: 36px 40px; text-align:center;">
          <h1 style="margin:0; color:#ffffff; font-size:26px; font-weight:800;">🐾 PetJam</h1>
          <p style="margin:8px 0 0; color:rgba(255,255,255,0.7); font-size:14px;">Trung tâm cứu trợ thú cưng Hà Nội</p>
        </td>
      </tr>

      <tr>
        <td style="padding: 40px 40px 32px;">
          <p style="font-size:16px; color:#1a1a1a; font-weight:700; margin: 0 0 8px;">Xin chào {{ $application->name }},</p>
          <p style="font-size:15px; color:#444; line-height:1.7; margin: 0 0 24px;">
            Cảm ơn bạn đã dành thời gian tham gia buổi phỏng vấn với đội ngũ PetJam.
            Sau khi cân nhắc, chúng tôi rất tiếc phải thông báo rằng tại thời điểm này, 
            chúng tôi chưa thể tiếp nhận bạn vào vị trí <strong>{{ $application->position }}</strong>.
          </p>
          <p style="font-size:15px; color:#444; line-height:1.7; margin: 0 0 32px;">
            Đây không phải là quyết định dễ dàng vì chúng tôi gặp nhiều ứng viên xuất sắc. 
            Chúng tôi trân trọng tình yêu thương của bạn dành cho thú cưng và hy vọng có thể 
            hợp tác trong tương lai.
          </p>
          <p style="font-size:14px; color:#888; margin:0;">Trân trọng,<br><strong style="color:#1a1a1a;">Đội ngũ PetJam</strong></p>
        </td>
      </tr>

      <tr>
        <td style="background:#f9f9f7; padding: 20px 40px; border-top: 1px solid #eee; text-align:center;">
          <p style="margin:0; font-size:13px; color:#999;">Email này được gửi tự động từ <strong>PetJam</strong>.</p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>
