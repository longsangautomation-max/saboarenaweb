# 📸 HƯỚNG DẪN LƯU ẢNH VÀO SUPABASE STORAGE

## Vấn Đề Hiện Tại

❌ **Ảnh đang lưu ở đâu?**
- Hiện tại: Dùng URL trực tiếp từ Unsplash
- Vấn đề:
  - Phụ thuộc vào Unsplash (nếu link hỏng → ảnh mất)
  - Không kiểm soát được
  - Tốc độ load chậm hơn
  - Không thể customize

## Giải Pháp: Lưu vào Supabase Storage

### Bước 1: Tạo Storage Bucket

1. Vào Supabase Dashboard: https://supabase.com/dashboard/project/mogjjvscxjwvhtpkrlqr/storage

2. Click **"New bucket"**

3. Cấu hình:
   - **Name**: `billiard-images`
   - **Public bucket**: ✅ Bật (để ảnh public)
   - **File size limit**: 5 MB
   - **Allowed MIME types**: `image/*`

4. Click **"Create bucket"**

### Bước 2: Upload Ảnh

**Cách 1: Upload Manual (Nhanh nhất)**

1. Download ảnh bi-a từ Unsplash:
   - https://unsplash.com/s/photos/billiards
   - https://unsplash.com/s/photos/pool-table
   - https://unsplash.com/s/photos/billiard-player
   - Download khoảng 20-30 ảnh chất lượng cao

2. Vào Storage bucket `billiard-images`

3. Tạo các folder:
   - `tournaments/`
   - `players/`
   - `techniques/`
   - `clubs/`
   - `matches/`
   - `equipment/`

4. Upload ảnh vào từng folder (4-5 ảnh/folder)

**Cách 2: Upload bằng Code (Tự động)**

```bash
# Install dependencies
npm install node-fetch

# Chạy script upload
node upload-images-to-supabase.mjs
```

### Bước 3: Lấy Public URLs

Sau khi upload, mỗi ảnh sẽ có URL dạng:
```
https://mogjjvscxjwvhtpkrlqr.supabase.co/storage/v1/object/public/billiard-images/tournaments/tournament-1.jpg
```

### Bước 4: Update Code

Update file `src/lib/billiard-images.ts`:

```typescript
export const BILLIARD_IMAGES = {
  tournaments: [
    'https://mogjjvscxjwvhtpkrlqr.supabase.co/storage/v1/object/public/billiard-images/tournaments/tournament-1.jpg',
    'https://mogjjvscxjwvhtpkrlqr.supabase.co/storage/v1/object/public/billiard-images/tournaments/tournament-2.jpg',
    // ...
  ],
  players: [
    'https://mogjjvscxjwvhtpkrlqr.supabase.co/storage/v1/object/public/billiard-images/players/player-1.jpg',
    // ...
  ],
  // ...
};
```

---

## Ưu Điểm Khi Lưu vào Supabase

✅ **Kiểm soát hoàn toàn**
- Quản lý ảnh tập trung
- Có thể thêm/xóa/sửa bất cứ lúc nào

✅ **Tốc độ nhanh hơn**
- CDN của Supabase
- Server gần Việt Nam hơn

✅ **Ổn định**
- Không phụ thuộc bên thứ 3
- Link không bao giờ hỏng

✅ **Bảo mật**
- Có thể set permissions
- Có thể tạo signed URLs nếu cần

✅ **Miễn phí**
- Free tier: 1GB storage
- 20-30 ảnh ~ 50-100MB

---

## Quick Start (Khuyến Nghị)

### Option 1: Upload Manual (5-10 phút)

1. Tạo bucket `billiard-images` (public)
2. Download 20 ảnh bi-a từ Unsplash
3. Upload vào các folder
4. Copy URLs và update `billiard-images.ts`
5. Done! ✅

### Option 2: Dùng Script (Tự động)

```bash
npm install node-fetch
node upload-images-to-supabase.mjs
```

Script sẽ:
- Tự động download ảnh từ Unsplash
- Upload lên Supabase
- Generate file URLs mới
- Update code tự động

---

## Sau Khi Setup

✅ Tất cả ảnh tin tức sẽ load từ Supabase
✅ Nhanh hơn, ổn định hơn
✅ Có thể thay ảnh bất cứ lúc nào
✅ Hoàn toàn kiểm soát

**Bạn muốn tôi giúp upload ảnh không?** 😊
