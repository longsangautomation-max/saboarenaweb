# 📸 KHO ẢNH BI-A CHUYÊN DỤNG

## 🎯 Mục Đích

Thay thế ảnh không liên quan bằng **kho ảnh bi-a chất lượng cao** từ Unsplash, được phân loại chi tiết theo từng category.

## 📚 Cấu Trúc Kho Ảnh

### 1. **Giải Đấu (Tournaments)** - 5 ảnh
- Pool balls setup - Professional tournament
- Billiard table with cue - Competition ready  
- Pool table close-up - Championship
- Billiard balls arranged - Tournament setup
- Professional pool table - Championship venue

### 2. **Cơ Thủ (Players)** - 4 ảnh
- Player focusing on shot - Concentration
- Billiard player taking aim
- Professional player at table
- Cue ball and player hand

### 3. **Kỹ Thuật (Techniques)** - 4 ảnh
- Billiard cue hitting ball - Perfect shot
- Close-up of cue stick and balls
- Aiming technique - Professional form
- Ball positioning on table

### 4. **Câu Lạc Bộ (Clubs)** - 4 ảnh
- Billiard club interior - Multiple tables
- Pool hall atmosphere
- Modern billiard lounge
- Billiard club with premium tables

### 5. **Trận Đấu (Matches)** - 4 ảnh
- Intense match moment - Player vs Player
- Competitive game in progress
- Tournament match setup
- Championship match table

### 6. **Phỏng Vấn (Interviews)** - 3 ảnh
- Interview setting - Professional player
- Player portrait - Interview background
- Behind the scenes - Player interview

### 7. **Quy Định (Regulations)** - 3 ảnh
- Official rulebook and documentation
- Professional standard table
- Official equipment standards

### 8. **Cú Đẹp (Beautiful Shots)** - 4 ảnh
- Perfect break shot moment
- Artistic shot composition
- Dramatic lighting on table
- Precision shot angle

### 9. **Dụng Cụ (Equipment)** - 4 ảnh
- Professional cue sticks collection
- Billiard balls set - High quality
- Premium pool table cloth
- Professional grade equipment

### 10. **Hero Images** (Banners lớn) - 3 ảnh
- Epic billiard hall panorama (1920px)
- Championship table wide angle (1920px)
- Professional tournament venue (1920px)

---

## 🔧 Cách Sử Dụng

### Import và Sử Dụng

```typescript
import { 
  BILLIARD_IMAGES, 
  getRandomImage, 
  getCoverImageForNews 
} from '@/lib/billiard-images';

// Lấy ảnh ngẫu nhiên theo category
const tournamentImage = getRandomImage('tournaments');

// Lấy ảnh cover cho tin tức
const coverImage = getCoverImageForNews('tournament');
```

### Helper Functions

1. **getRandomImage(category)** - Lấy ảnh ngẫu nhiên từ category
2. **getImageByIndex(category, index)** - Lấy ảnh theo vị trí
3. **getCategoryImages(newsCategory)** - Lấy tất cả ảnh của category
4. **getCoverImageForNews(newsCategory)** - Lấy ảnh cover phù hợp

---

## 🔄 Mapping Category

| News Category | Image Category | Số Lượng Ảnh |
|--------------|----------------|--------------|
| tournament   | tournaments    | 5 ảnh        |
| players      | players        | 4 ảnh        |
| guide        | techniques     | 4 ảnh        |
| club         | clubs          | 4 ảnh        |
| interview    | interviews     | 3 ảnh        |
| regulation   | regulations    | 3 ảnh        |
| match        | matches        | 4 ảnh        |

---

## ✅ Ưu Điểm

1. **100% ảnh bi-a thật** - Không còn ảnh không liên quan
2. **Chất lượng cao** - Từ Unsplash (1200px width)
3. **Phân loại rõ ràng** - Dễ quản lý và mở rộng
4. **Random mỗi lần** - Không bị lặp lại ảnh
5. **Free to use** - Không vi phạm bản quyền

---

## 🚀 Tích Hợp Vào AI News

File `ai-news-generator.ts` đã được update để dùng kho ảnh mới:

```typescript
import { getCoverImageForNews } from './billiard-images';

function getCoverImage(category: string): string {
  return getCoverImageForNews(category);
}
```

Giờ mỗi bài AI viết sẽ tự động chọn ảnh bi-a phù hợp với category!

---

## 📈 Mở Rộng Trong Tương Lai

Có thể thêm:
- Ảnh từ giải đấu thật của SABO Arena
- Ảnh cơ thủ nổi tiếng
- Ảnh câu lạc bộ đối tác
- Video clips (nếu cần)

---

## 🎨 Nguồn Ảnh

Tất cả ảnh từ **Unsplash.com** - Free to use under Unsplash License
- Không cần attribution (nhưng khuyến khích)
- Có thể dùng cho mục đích thương mại
- Không giới hạn download

---

**✅ Kho ảnh đã sẵn sàng để sử dụng!**
