<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mời Phỏng Vấn</title>
</head>
<body style="margin:0; padding:0; background:#f5f5f0; font-family: 'Segoe UI', Arial, sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f0; padding: 40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

      <!-- Header -->
      <tr>
        <td style="background: linear-gradient(135deg, #f08c50, #e06020); padding: 36px 40px; text-align:center;">
          <h1 style="margin:0; color:#ffffff; font-size:26px; font-weight:800; letter-spacing:-0.5px;">🐾 PetJam</h1>
          <p style="margin:8px 0 0; color:rgba(255,255,255,0.85); font-size:14px;">Trung tâm cứu trợ thú cưng Hà Nội</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding: 40px 40px 32px;">
          <p style="font-size:16px; color:#1a1a1a; font-weight:700; margin: 0 0 8px;">Xin chào {{ $application->name }},</p>
          <p style="font-size:15px; color:#444; line-height:1.7; margin: 0 0 24px;">
            Chúng tôi rất vui được thông báo rằng hồ sơ của bạn đã <strong style="color:#16a34a;">vượt qua vòng xét CV</strong> thành công! 🎉
            Đội ngũ PetJam đã đọc và đánh giá cao hồ sơ của bạn.
          </p>

          <!-- Interview Details Card -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff9f5; border: 1px solid #fed7aa; border-radius:12px; margin-bottom:28px;">
            <tr>
              <td style="padding: 24px 28px;">
                <p style="margin:0 0 16px; font-size:14px; font-weight:700; color:#c2410c; text-transform:uppercase; letter-spacing:1px;">📅 Thông Tin Phỏng Vấn</p>
                <p style="margin:0 0 8px; font-size:15px; color:#1a1a1a;"><strong>Thời gian:</strong> {{ $interviewDate }}</p>
                <p style="margin:0; font-size:14px; color:#666;">Hình thức: Online qua Google Meet (link sẽ được gửi sau khi bạn xác nhận)</p>
              </td>
            </tr>
          </table>

          <p style="font-size:15px; color:#444; line-height:1.7; margin: 0 0 28px;">
            Vui lòng xác nhận tham gia phỏng vấn bằng cách nhấn vào nút bên dưới. 
            <strong>Link xác nhận có hiệu lực trong 7 ngày.</strong>
          </p>

          <!-- CTA Button -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding-bottom: 28px;">
                <a href="{{ $confirmUrl }}" style="display:inline-block; background: linear-gradient(135deg, #f08c50, #e06020); color:#ffffff; text-decoration:none; padding: 14px 36px; border-radius:50px; font-size:15px; font-weight:700; letter-spacing:0.5px; box-shadow: 0 4px 12px rgba(240,140,80,0.4);">
                  ✅ Xác Nhận Tham Gia Phỏng Vấn
                </a>
              </td>
            </tr>
          </table>

          <p style="font-size:13px; color:#999; text-align:center; margin:0;">
            Nếu nút không hoạt động, hãy copy link sau:<br>
            <a href="{{ $confirmUrl }}" style="color:#f08c50; word-break:break-all;">{{ $confirmUrl }}</a>
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f9f9f7; padding: 24px 40px; border-top: 1px solid #eee; text-align:center;">
          <p style="margin:0; font-size:13px; color:#999;">
            Email này được gửi tự động từ <strong>PetJam</strong>. Nếu bạn không đăng ký, hãy bỏ qua email này.
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>
