# 🚀 QUICK START - AI NEWS SYSTEM

## Bước 1: Lấy OpenAI API Key

1. Truy cập: **https://platform.openai.com/api-keys**
2. Đăng ký/Đăng nhập
3. Click "Create new secret key"
4. Copy key (bắt đầu bằng `sk-proj-...`)

## Bước 2: Thêm vào .env

Mở file `.env` và thêm dòng này:

```bash
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx
```

(Thay `sk-proj-xxx...` bằng key thật của bạn)

## Bước 3: Restart Dev Server

```bash
# Dừng server hiện tại (Ctrl+C)
npm run dev
```

## Bước 4: Truy Cập Admin Panel

Mở: **http://localhost:8082/ai-news-admin**

## Bước 5: Test Thử

1. Click nút **"Test (1 bài mẫu)"**
2. Đợi 10-15 giây
3. Thấy thông báo "✅ Tạo bài test thành công!"
4. Về trang chủ → scroll xuống "Tin Tức Mới Nhất"
5. Thấy bài mới vừa được AI tạo!

## Bước 6: Chạy Daily Generation

1. Click nút **"Chạy Ngay (Daily Generation)"**
2. Hệ thống sẽ:
   - Phân tích database
   - Tìm sự kiện quan trọng
   - Tạo tối đa 3 bài tin
   - Tự động publish

---

## ⚠️ Lưu Ý

- **Chi phí:** ~$0.05 / bài (~$0.15 / ngày nếu chạy 3 bài)
- **API Key:** Không share lên GitHub (đã có trong .gitignore)
- **Production:** Cần setup cron job để chạy tự động mỗi ngày

---

## 📞 Cần Trợ Giúp?

Đọc file **AI_NEWS_GUIDE.md** để biết chi tiết!

---

**Chúc may mắn! 🎉**
