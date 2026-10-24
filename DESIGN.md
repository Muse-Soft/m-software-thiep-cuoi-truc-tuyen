# Thiết kế giao diện thiệp cưới trực tuyến (TEC-107)

> Nguồn: yêu cầu web MSR-14 — thiệp mời cưới online, xác nhận tham dự.
> File này là đặc tả thiết kế để Dev triển khai. Mọi dữ liệu thật chưa có đều ghi
> rõ `[CHỜ BỔ SUNG]` — KHÔNG dùng tên, ngày, địa điểm, ảnh thật nào tự bịa.

## 1. Tổng quan

- **Sản phẩm:** trang thiệp cưới một trang (single-page), mở là đọc được ngay.
- **Người xem chính:** khách mời mở thiệp trên điện thoại (mobile-first).
- **Mục tiêu:** khách hiểu "ai cưới, khi nào, ở đâu, đi thế nào" trong 30 giây đầu,
  và gửi xác nhận tham dự không cần gọi điện.
- **Cảm xúc:** lãng mạn, nhẹ nhàng, sang trọng vừa phải — không lòe loẹt, không nặng nề.

## 2. Bảng màu

| Vai trò | Màu | Mã HEX | Ghi chú |
|---|---|---|---|
| Nền chính | Hồng pastel nhạt | `#FDF2F4` | Nền toàn trang, tạo cảm giác mềm |
| Nền xen kẽ | Trắng kem | `#FFF9F5` | Các mục chẵn, tránh đơn điệu |
| Điểm nhấn chính | Hồng pastel đậm | `#E8A2B4` | Tiêu đề mục, nút chính, viền |
| Điểm nhấn phụ | Vàng gold | `#C9A227` | Đường viền mảnh, icon, chữ "và" (&) giữa tên |
| Chữ chính | Nâu xám đậm | `#4A3F42` | Nội dung, dễ đọc trên nền nhạt |
| Chữ phụ | Xám ấm | `#8A7D80` | Ngày phụ, chú thích, footer |
| Nút chính | Hồng đậm + chữ trắng | `#D87E96` / `#FFFFFF` | Nút "Xác nhận tham dự" |
| Trạng thái thành công | Xanh lá nhạt | `#7FB069` | Chỉ dùng sau khi gửi form thành công |

Quy tắc: nền luôn nhạt; hồng và gold chỉ làm điểm nhấn (không tô khối lớn màu đậm);
tỉ lệ tương phản chữ/nền phải đọc được dưới nắng (khách xem ngoài trời).

## 3. Font chữ

- **Tiêu đề / tên cô dâu chú rể:** font script (chữ viết tay mềm) — ưu tiên
  `Playfair Display` (fallback: serif) cho tên, kết hợp `Great Vibes` (fallback: cursive)
  cho chữ "&" trang trí. Cỡ tên: 40–48px trên mobile, 64–72px trên desktop.
- **Nội dung / thân bài:** `Be Vietnam Pro` (fallback: system sans-serif) — font Việt
  có dấu chuẩn, dễ đọc. Cỡ thân: 16px mobile, 17px desktop; dòng cách 1.6.
- **Số / ngày / đếm ngược:** `Playfair Display`, cỡ lớn, gold.
- **Lưu ý Dev:** chỉ dùng Google Fonts có hỗ trợ tiếng Việt đầy đủ; kiểm tra dấu
  tiếng Việt ở mọi tiêu đề trước khi giao.

## 4. Bố cục tổng thể (mobile-first)

- Một cột duy nhất, cuộn dọc từ trên xuống, theo đúng thứ tự 6 mục ở mục 5.
- Chiều rộng nội dung tối đa 720px, căn giữa; padding hai bên 20px trên mobile.
- Mỗi mục cách nhau bằng dải phân cách mảnh: đường gold 1px + hoa văn nhỏ ở giữa.
- Thanh điều hướng: KHÔNG dùng menu cố định (tránh che nội dung trên điện thoại);
  thay bằng nút "Xác nhận tham dự" nổi ở cuối màn hình, chỉ hiện sau khi cuộn qua
  mục mở đầu (tránh che tên cô dâu chú rể lúc mới mở).
- Ảnh: dùng ảnh chiếm toàn chiều rộng (full-bleed) ở mục mở đầu và album;
  các ảnh khác bo góc 16px, viền trắng 4px + bóng mờ nhẹ.
- Desktop (≥ 768px): nội dung vẫn một cột căn giữa (thiệp đọc dọc, không dàn ngang);
  chỉ tăng cỡ chữ, album chuyển sang lưới 3 cột, timeline vẫn dọc nhưng xen kẽ trái/phải.

## 5. Bố cục từng mục

### Mục 1 — Mở đầu: tên cô dâu chú rể + ngày cưới

- Ảnh nền toàn màn hình (ảnh cưới dọc) + lớp phủ hồng nhạt mờ để chữ đọc được.
- Nội dung căn giữa: dòng nhỏ "Thiệp mời cưới" (chữ hoa, giãn cách, gold),
  tên cô dâu và chú rể cỡ lớn (xem mục 3), chữ "&" gold ở giữa,
  ngày cưới nổi bật bên dưới, kèm đồng hồ đếm ngược (ngày/giờ/phút/giây) tới lễ cưới.
- Dữ liệu: tên `[CHỜ BỔ SUNG]`, ngày cưới `[CHỜ BỔ SUNG]`, ảnh nền `[CHỜ BỔ SUNG]`.
- Nút cuộn xuống (mũi tên + chữ "Xem thiệp") — bấm là cuộn mềm tới mục 2.

### Mục 2 — Câu chuyện tình yêu (timeline dọc)

- Tiêu đề: "Câu chuyện của chúng mình".
- Timeline dọc một cột, đường kẻ gold mảnh bên trái, mỗi mốc là một chấm tròn hồng.
- Mỗi mốc gồm: năm/thời điểm (gold, đậm), tiêu đề ngắn (ví dụ "Lần đầu gặp nhau"),
  1–2 câu mô tả ngắn, ảnh nhỏ vuông bo góc (nếu có).
- Số mốc: 4–6 mốc, do khách cung cấp; hiện tại toàn bộ nội dung mốc là `[CHỜ BỔ SUNG]`.
- Không tự bịa mốc chuyện tình yêu — mốc nào chưa có thì mục này hiển thị
  khung chờ, không hiển thị nội dung giả.

### Mục 3 — Album ảnh

- Tiêu đề: "Khoảnh khắc của chúng mình".
- Lưới ảnh: mobile 2 cột, desktop 3 cột, ảnh vuông, bo góc 12px, khoảng cách 8px.
- Bấm ảnh mở xem lớn (lightbox): vuốt trái/phải để chuyển ảnh, có nút đóng rõ ràng.
- Ảnh cưới thật: `[CHỜ BỔ SUNG]` — Dev dùng ảnh placeholder màu hồng pastel
  có chữ "Ảnh cưới — [CHỜ BỔ SUNG]" cho tới khi có ảnh thật, không dùng ảnh stock
  giả làm ảnh cưới của cặp đôi.

### Mục 4 — Lịch trình lễ và tiệc

- Tiêu đề: "Lịch trình ngày cưới".
- Dạng thẻ dọc, mỗi thẻ một sự kiện: giờ (gold, đậm, cỡ lớn), tên sự kiện
  (ví dụ: Lễ cưới, Tiệc mừng), địa điểm ngắn, ghi chú nhỏ nếu có.
- Các sự kiện theo yêu cầu: lễ cưới và tiệc mừng; giờ và thứ tự cụ thể `[CHỜ BỔ SUNG]`.
- Thêm nút "Thêm vào lịch" (tạo file .ics / link Google Calendar) cho sự kiện chính.

### Mục 5 — Địa điểm + bản đồ

- Tiêu đề: "Địa điểm tổ chức".
- Thẻ địa điểm: tên địa điểm `[CHỜ BỔ SUNG]`, địa chỉ đầy đủ `[CHỜ BỔ SUNG]`,
  nút chính "Xem bản đồ" mở Google Maps (link `[CHỜ BỔ SUNG]`) ở tab mới,
  nút phụ "Sao chép địa chỉ" (bấm là copy, hiện thông báo "Đã sao chép").
- Nhúng bản đồ thu nhỏ (iframe Google Maps) bên dưới thẻ — chỉ nhúng khi đã có
  link/địa chỉ thật; chưa có thì giữ khung placeholder, không nhúng bản đồ giả.

### Mục 6 — Xác nhận tham dự (RSVP)

- Tiêu đề: "Bạn sẽ đến chung vui chứ?".
- Form gồm đúng các trường theo yêu cầu:
  1. Họ tên (bắt buộc, text, tối đa 100 ký tự).
  2. Số khách đi cùng (bắt buộc, chọn số 0–10; mặc định 0 = chỉ mình khách).
  3. Lời chúc (không bắt buộc, textarea, tối đa 500 ký tự).
  4. Nút lựa chọn tham dự: "Sẽ đến" / "Rất tiếc, không đến được" (radio, bắt buộc).
- Nút gửi: "Gửi xác nhận" (nút chính màu hồng đậm). Sau khi gửi thành công:
  hiện thông báo xanh lá "Cảm ơn bạn đã xác nhận!" + tóm tắt nội dung đã gửi.
- Lỗi nhập liệu: báo ngay dưới trường sai (chữ đỏ nhạt, câu ngắn gọn), không xóa
  dữ liệu khách đã nhập. Gửi lỗi mạng: báo "Gửi chưa thành công, vui lòng thử lại"
  và giữ nguyên form.
- Lưu ý: backend lưu trữ RSVP do Dev triển khai ở task sau; bản thiết kế này chỉ
  định nghĩa giao diện và hành vi form, không tự chọn công nghệ lưu trữ.

## 6. Responsive (mobile-first)

| Điểm ngắt | Áp dụng |
|---|---|
| < 768px (chủ đạo) | Một cột; tên 40–48px; album 2 cột; timeline 1 cột; nút nổi cuối màn hình |
| ≥ 768px | Nội dung tối đa 720px căn giữa; tên 64–72px; album 3 cột; timeline xen kẽ |
| ≥ 1024px | Giữ nguyên 720px (không dàn rộng thêm — thiệp đọc dọc) |

- Kiểm tra bắt buộc trên điện thoại thật hoặc giả lập mobile: chữ không tràn,
  nút bấm được bằng ngón tay (cao tối thiểu 44px), ảnh không vỡ tỉ lệ.
- Tốc độ: ảnh nén dưới 300KB/ảnh, tải lười (lazy-load) cho album; trang mở đầu
  phải hiện nội dung trong 3 giây trên mạng 4G.

## 7. Trạng thái placeholder — quy tắc bắt buộc

- Mọi dữ liệu thật chưa có (tên, ngày, địa điểm, link bản đồ, ảnh, mốc câu chuyện,
  giờ lễ/tiệc) đều hiển thị dạng `[CHỜ BỔ SUNG]` — nhìn là biết chưa có dữ liệu thật.
- KHÔNG dùng tên người, ngày tháng, địa điểm, ảnh mẫu giả làm dữ liệu thật.
- Khi dữ liệu thật về, chỉ cần thay nội dung placeholder, không đổi bố cục.

## 8. Checklist nghiệm thu cho Dev

- [ ] Đủ 6 mục theo đúng thứ tự, mobile-first, một cột.
- [ ] Bảng màu + font đúng mục 2–3; tiếng Việt có dấu hiển thị đúng.
- [ ] Mọi dữ liệu thật chưa có đều là `[CHỜ BỔ SUNG]`, không có dữ liệu bịa.
- [ ] Form RSVP đủ 4 trường + thông báo thành công/lỗi như mục 5.6.
- [ ] Nút "Xem bản đồ", "Sao chép địa chỉ", "Thêm vào lịch" hoạt động khi có dữ liệu thật.
- [ ] Kiểm tra trên mobile: nút ≥ 44px, chữ không tràn, album lightbox vuốt được.
