# 🎱 Hướng dẫn Upload Ảnh Bi-a lên Supabase Storage (Manual)

## Bước 1: Tạo Storage Bucket

1. Truy cập Supabase Dashboard: https://supabase.com/dashboard/project/mogjjvscxjwvhtpkrlqr
2. Click vào **Storage** (biểu tượng thùng) ở menu bên trái
3. Click nút **"New bucket"**
4. Điền thông tin:
   - **Name**: `billiard-images`
   - **Public bucket**: ✅ BẬT (để ảnh công khai)
   - **File size limit**: 5MB
   - **Allowed MIME types**: `image/*`
5. Click **"Create bucket"**

## Bước 2: Tạo Folders trong Bucket

Trong bucket `billiard-images` vừa tạo, tạo các thư mục sau:

1. Click vào bucket `billiard-images`
2. Click nút **"Create folder"** và tạo từng folder:
   - `tournaments` - Ảnh giải đấu
   - `players` - Ảnh cơ thủ
   - `techniques` - Ảnh kỹ thuật
   - `clubs` - Ảnh câu lạc bộ
   - `matches` - Ảnh thi đấu
   - `equipment` - Ảnh thiết bị
   - `training` - Ảnh tập luyện
   - `events` - Ảnh sự kiện
   - `legends` - Ảnh huyền thoại
   - `generic` - Ảnh tổng hợp

## Bước 3: Download Ảnh từ Unsplash

### 📸 DANH SÁCH ẢNH CẦN TẢI (20 ảnh đẹp nhất)

#### Folder: tournaments (3 ảnh)
1. https://images.unsplash.com/photo-1574624602683-7f49f92b222a
2. https://images.unsplash.com/photo-1606424928387-dfcc8a2bb86f
3. https://images.unsplash.com/photo-1626159549162-a32af5e8c9ed

#### Folder: players (3 ảnh)
1. https://images.unsplash.com/photo-1568585218505-aae44a84e2ed
2. https://images.unsplash.com/photo-1560272564-c83b66b1ad12
3. https://images.unsplash.com/photo-1606424928387-dfcc8a2bb86f

#### Folder: techniques (3 ảnh)
1. https://images.unsplash.com/photo-1606424928387-dfcc8a2bb86f
2. https://images.unsplash.com/photo-1574624602683-7f49f92b222a
3. https://images.unsplash.com/photo-1611143669720-86e2b39a8182

#### Folder: clubs (2 ảnh)
1. https://images.unsplash.com/photo-1626159549162-a32af5e8c9ed
2. https://images.unsplash.com/photo-1574624602683-7f49f92b222a

#### Folder: matches (3 ảnh)
1. https://images.unsplash.com/photo-1574624602683-7f49f92b222a
2. https://images.unsplash.com/photo-1606424928387-dfcc8a2bb86f
3. https://images.unsplash.com/photo-1611143669720-86e2b39a8182

#### Folder: equipment (2 ảnh)
1. https://images.unsplash.com/photo-1604329760661-e71dc83f8f26
2. https://images.unsplash.com/photo-1611143669720-86e2b39a8182

#### Folder: training (2 ảnh)
1. https://images.unsplash.com/photo-1560272564-c83b66b1ad12
2. https://images.unsplash.com/photo-1606424928387-dfcc8a2bb86f

#### Folder: events (2 ảnh)
1. https://images.unsplash.com/photo-1626159549162-a32af5e8c9ed
2. https://images.unsplash.com/photo-1574624602683-7f49f92b222a

**CÁCH TẢI:**
- Click vào link → Chuột phải vào ảnh → "Save image as..."
- Đặt tên file đơn giản: `tournament-1.jpg`, `player-1.jpg`, `technique-1.jpg`...

## Bước 4: Upload Ảnh lên Supabase

1. Click vào từng folder trong bucket
2. Click nút **"Upload file"**
3. Chọn các file ảnh tương ứng đã tải
4. Click **"Upload"**

**Lưu ý:** Upload theo từng folder để dễ quản lý!

## Bước 5: Copy URLs của các ảnh

Sau khi upload xong, click vào từng ảnh và copy URL theo định dạng:

```
https://mogjjvscxjwvhtpkrlqr.supabase.co/storage/v1/object/public/billiard-images/[folder]/[filename]
```

Ví dụ:
```
https://mogjjvscxjwvhtpkrlqr.supabase.co/storage/v1/object/public/billiard-images/tournaments/tournament-1.jpg
https://mogjjvscxjwvhtpkrlqr.supabase.co/storage/v1/object/public/billiard-images/players/player-1.jpg
```

## Bước 6: Cập nhật Code

Sau khi có đủ URLs, báo lại cho tôi và tôi sẽ cập nhật file `src/lib/billiard-images.ts` với URLs mới từ Supabase!

---

## ⏱️ Thời gian ước tính: 5-10 phút

## ✨ Lợi ích sau khi hoàn thành:
- ✅ Ảnh load nhanh hơn (CDN Supabase)
- ✅ Kiểm soát hoàn toàn ảnh của mình
- ✅ Không phụ thuộc Unsplash
- ✅ Free 1GB storage

## 🆘 Cần trợ giúp?
Nếu gặp khó khăn ở bất kỳ bước nào, hãy chụp màn hình và báo lại cho tôi!
