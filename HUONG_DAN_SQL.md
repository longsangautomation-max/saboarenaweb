# 🚀 HƯỚNG DẪN CHẠY SQL TRONG SUPABASE

## Bước 1: Truy cập Supabase Dashboard
1. Mở trình duyệt và đăng nhập vào https://supabase.com
2. Chọn project: **sabo-arena-playbook** 
3. Click vào **SQL Editor** ở sidebar bên trái

## Bước 2: Tạo bảng News
1. Click nút **New query**
2. Copy toàn bộ nội dung từ file `supabase_news_schema.sql`
3. Paste vào SQL Editor
4. Click **Run** (hoặc Ctrl+Enter)

## Bước 3: Kiểm tra
1. Click **Table Editor** ở sidebar
2. Tìm bảng `news`
3. Bạn sẽ thấy 3 bài viết mẫu đã được tạo:
   - Giải Vô Địch Quốc Gia 2024
   - Top 10 Cơ Thủ Xuất Sắc Nhất Tháng 10
   - Kỹ Thuật Đánh Bi-a Hiệu Quả

## ✅ Hoàn thành!

Bây giờ:
- Trang chủ sẽ hiển thị tin tức từ database
- Click vào bất kỳ bài viết nào để xem chi tiết
- Lượt xem tự động tăng khi click vào bài viết
- Hỗ trợ đa ngôn ngữ (VI/EN)

## 🎯 Test ngay
1. Mở http://localhost:8082
2. Scroll xuống section "Tin Tức Mới Nhất"
3. Click vào bất kỳ bài viết nào
4. Enjoy! 🎉
