# 🤖 HỆ THỐNG TIN TỨC TỰ ĐỘNG BẰNG AI

## 📋 Tổng Quan

Hệ thống tự động tạo tin tức hàng ngày bằng OpenAI GPT-4 dựa trên dữ liệu thực từ database:
- ✅ Tự động phân tích tournaments, matches, players
- ✅ Quyết định tin tức quan trọng cần viết  
- ✅ Tạo nội dung bằng AI (tiếng Việt + tiếng Anh)
- ✅ Tự động publish lên website
- ✅ Hỗ trợ 6 loại tin tức khác nhau

---

## 🎯 Các Loại Tin Tức Tự Động

### 1. **Giải Đấu Kết Thúc** (Priority: 100)
- **Khi nào:** Giải đấu vừa kết thúc trong 24h
- **Nội dung:** Tổng kết giải, nhà vô địch, highlights
- **Template:** `TOURNAMENT_COMPLETED`

### 2. **Giải Thưởng Cao Sắp Diễn Ra** (Priority: 90)
- **Khi nào:** Giải đấu sắp bắt đầu với giải thưởng ≥ 10 triệu
- **Nội dung:** Quảng bá giải, kêu gọi đăng ký
- **Template:** `UPCOMING_HIGH_PRIZE`

### 3. **Nhà Vô Địch Mới** (Priority: 85)
- **Khi nào:** Có người vô địch giải đấu
- **Nội dung:** Chúc mừng, thành tích, ranking mới
- **Template:** `NEW_CHAMPION`

### 4. **Thay Đổi Bảng Xếp Hạng** (Priority: 70)
- **Khi nào:** Top 10 có thay đổi đáng kể
- **Nội dung:** Phân tích ranking, người tăng hạng nhanh nhất
- **Template:** `RANKING_SHAKE_UP`

### 5. **Trận Đấu Hay Nhất** (Priority: 60)
- **Khi nào:** Có trận đấu kịch tính (tỷ số sát nút)
- **Nội dung:** Highlights trận đấu, phân tích
- **Template:** `MATCH_HIGHLIGHT`

### 6. **Thống Kê Tuần** (Priority: 50)
- **Khi nào:** Không có tin quan trọng khác
- **Nội dung:** Số liệu, thống kê tổng hợp
- **Template:** `WEEKLY_STATS`

---

## 🚀 Cài Đặt

### 1. Cài đặt OpenAI SDK

```bash
npm install openai
```

### 2. Lấy OpenAI API Key

1. Truy cập: https://platform.openai.com/api-keys
2. Đăng nhập/Đăng ký tài khoản
3. Tạo API key mới
4. Copy key

### 3. Cấu hình Environment Variables

Mở file `.env` và thêm:

```bash
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. Khởi động lại Dev Server

```bash
npm run dev
```

---

## 💻 Sử Dụng

### Admin Panel

Truy cập: **http://localhost:8082/ai-news-admin**

![AI News Admin Panel](https://via.placeholder.com/800x400?text=AI+News+Admin+Panel)

#### Tab 1: Tạo Tin Tức

**Chạy Ngay (Daily Generation)**
- Phân tích toàn bộ database
- Tạo tối đa 3 bài/ngày
- Ưu tiên tin quan trọng nhất

**Test (1 bài mẫu)**
- Tạo 1 bài test để kiểm tra
- Sử dụng template UPCOMING_HIGH_PRIZE
- Nhanh chóng verify AI hoạt động

#### Tab 2: Phân Tích

**Phân Tích Database**
- Xem các cơ hội tin tức hiện có
- Không tạo bài, chỉ phân tích
- Kiểm tra priority của từng loại tin

#### Tab 3: Lịch Chạy

- Xem cấu hình tự động hóa
- Thời gian: 6:00 AM hàng ngày
- Tối đa 3 bài/ngày
- Auto cleanup: Giữ 100 bài mới nhất

---

## 🔧 API Reference

### `generateNews(params)`

Tạo nội dung tin tức bằng AI.

```typescript
import { generateNews } from '@/lib/ai-news-generator';

const news = await generateNews({
  template: 'UPCOMING_HIGH_PRIZE',
  data: {
    tournament_name: 'Giải Vô Địch 2024',
    prize_pool: '100.000.000 VNĐ',
    start_date: '15/12/2024',
    venue: 'SABO Arena',
    max_participants: 128
  },
  generateEnglish: true // Optional: tạo cả tiếng Anh
});
```

**Returns:**
```typescript
{
  title: string,
  title_en?: string,
  slug: string,
  excerpt: string,
  excerpt_en?: string,
  content: string, // Markdown
  content_en?: string, // Markdown
  category: string,
  cover_image_url: string,
  is_featured: boolean
}
```

### `publishNews(news)`

Publish tin tức lên database.

```typescript
import { publishNews } from '@/lib/ai-news-generator';

const newsId = await publishNews(generatedNews);
console.log('Published:', newsId);
```

### `runDailyNewsGeneration()`

Chạy quy trình tự động hàng ngày.

```typescript
import { runDailyNewsGeneration } from '@/lib/ai-news-analyzer';

await runDailyNewsGeneration();
// Tự động phân tích → quyết định → tạo → publish
```

### `decideNewsToGenerate()`

Phân tích database và quyết định tin tức cần viết.

```typescript
import { decideNewsToGenerate } from '@/lib/ai-news-analyzer';

const newsQueue = await decideNewsToGenerate();
console.log(`Found ${newsQueue.length} opportunities`);
```

---

## 📊 Database Schema

Tin tức được lưu vào bảng `news` với cấu trúc:

```sql
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  title_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  excerpt_en TEXT,
  content TEXT NOT NULL,
  content_en TEXT,
  category TEXT NOT NULL,
  author_id UUID, -- NULL = AI generated
  cover_image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  views INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🎨 Tùy Chỉnh Templates

Mở file `src/lib/ai-news-generator.ts` và chỉnh sửa `NEWS_TEMPLATES`:

```typescript
export const NEWS_TEMPLATES = {
  YOUR_CUSTOM_TEMPLATE: {
    category: 'tournament',
    priority: 'high',
    prompt: `Viết bài về...
    
    Yêu cầu:
    - Tone: ...
    - Độ dài: ...
    - Format: Markdown
    `
  }
};
```

---

## 🔄 Tự Động Hóa (Production)

### Option 1: Supabase Edge Functions

```typescript
// supabase/functions/daily-news/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { runDailyNewsGeneration } from './ai-news-analyzer.ts';

serve(async (req) => {
  await runDailyNewsGeneration();
  return new Response('OK');
});
```

**Cron Schedule:**
```bash
supabase functions schedule daily-news --cron "0 6 * * *"
```

### Option 2: GitHub Actions

```yaml
# .github/workflows/daily-news.yml
name: Daily AI News Generation

on:
  schedule:
    - cron: '0 23 * * *' # 6 AM UTC+7
  workflow_dispatch: # Manual trigger

jobs:
  generate-news:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: node scripts/generate-daily-news.js
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_KEY: ${{ secrets.SUPABASE_SERVICE_KEY }}
```

### Option 3: Vercel Cron Jobs

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/generate-news",
      "schedule": "0 6 * * *"
    }
  ]
}
```

---

## 📈 Monitoring & Logs

### Xem Logs

Console output khi chạy generation:

```
🤖 Starting daily AI news generation...
📅 Date: 06/11/2024

🔍 Analyzing database for news opportunities...
📊 Found 3 news opportunities

📝 Generating: TOURNAMENT_COMPLETED
   Priority: 100
✅ Published: Giải Vô Địch Quốc Gia 2024 - Đã Tìm Ra Nhà Vô Địch
   ID: abc-123-def
   Slug: giai-vo-dich-quoc-gia-2024

🎉 Daily news generation completed!
```

### Metrics

Theo dõi trong Admin Panel:
- Số bài tạo hôm nay
- Thời gian chạy cuối
- Success/Error rate
- Tokens sử dụng (OpenAI)

---

## 💰 Chi Phí OpenAI

### GPT-4 Turbo Pricing (Tháng 11/2024)

- **Input:** $10 / 1M tokens
- **Output:** $30 / 1M tokens

### Ước Tính Chi Phí

**1 bài tin tức:**
- Input: ~1,500 tokens (prompt + data)
- Output: ~1,200 tokens (content)
- **Chi phí:** ~$0.05 / bài

**Hàng ngày (3 bài):**
- Chi phí: ~$0.15 / ngày
- **Tháng:** ~$4.50

**Hàng năm:**
- **Chi phí:** ~$54 / năm

> 💡 Rất rẻ so với việc thuê content writer!

---

## 🐛 Troubleshooting

### Lỗi: "OpenAI API key not found"

```bash
# Kiểm tra .env file
cat .env | grep OPENAI

# Đảm bảo có dòng này:
VITE_OPENAI_API_KEY=sk-proj-...

# Restart dev server
npm run dev
```

### Lỗi: "Rate limit exceeded"

OpenAI có giới hạn requests. Thêm delay giữa các bài:

```typescript
// Trong ai-news-analyzer.ts
await new Promise(resolve => setTimeout(resolve, 5000)); // 5s delay
```

### Lỗi: "Cannot find news opportunities"

Database chưa có dữ liệu đủ:
- Tạo thêm tournaments
- Thêm matches
- Cập nhật user rankings

### Content không đúng format

Chỉnh sửa prompt trong `NEWS_TEMPLATES`:
```typescript
prompt: `...
Format: Markdown với:
- Headers (# ## ###)
- Lists (- hoặc 1. 2. 3.)
- Blockquotes (>)
- Bold (**text**)
`
```

---

## 🎓 Best Practices

### 1. Review Content Định Kỳ
- Kiểm tra chất lượng bài AI tạo
- Chỉnh sửa template nếu cần
- Thu thập feedback từ users

### 2. A/B Testing
- Test nhiều prompt khác nhau
- So sánh engagement rate
- Tối ưu dần dần

### 3. Human Touch
- Thêm author_id cho tin quan trọng
- Review bài trước khi publish (set status = 'draft')
- Kết hợp AI + human editing

### 4. SEO Optimization
- Đảm bảo title có keywords
- Excerpt hấp dẫn
- Slug ngắn gọn
- Meta description

### 5. Cost Control
- Giới hạn số bài/ngày (hiện tại: 3)
- Sử dụng cache khi có thể
- Monitor OpenAI usage

---

## 📚 Resources

- [OpenAI API Docs](https://platform.openai.com/docs)
- [GPT-4 Best Practices](https://platform.openai.com/docs/guides/gpt-best-practices)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [React Query](https://tanstack.com/query/latest)

---

## 🤝 Contributing

Muốn thêm template mới?

1. Thêm vào `NEWS_TEMPLATES` trong `ai-news-generator.ts`
2. Thêm logic phát hiện trong `ai-news-analyzer.ts`
3. Test với `testNewsGeneration()`
4. Submit PR

---

## 📝 License

MIT License - SABO Arena 2024

---

**Happy AI News Generation! 🚀🤖**
