# 🔧 HƯỚNG DẪN FIX RLS POLICY

## Vấn đề
AI không thể lưu tin tức vào database vì **Row Level Security (RLS)** đang chặn INSERT.

Error: `new row violates row-level security policy for table "news"`

## Giải Pháp

### Cách 1: Fix qua Supabase Dashboard (KHUYẾN NGHỊ)

1. **Mở Supabase SQL Editor:**
   - Truy cập: https://supabase.com/dashboard/project/mogjjvscxjwvhtpkrlqr/sql
   - Hoặc: Dashboard → SQL Editor

2. **Chạy SQL sau:**

```sql
-- Xóa policy cũ quá strict
DROP POLICY IF EXISTS "Authenticated users can insert news" ON public.news;

-- Tạo policy mới: Cho phép anon role insert
CREATE POLICY "Anyone can insert news" 
ON public.news 
FOR INSERT 
TO public 
WITH CHECK (true);
```

3. **Kiểm tra:**

```sql
-- Xem tất cả policies của bảng news
SELECT policyname, cmd, roles
FROM pg_policies 
WHERE tablename = 'news';
```

### Cách 2: Sử dụng Service Role Key (An toàn hơn)

Nếu muốn giữ bảo mật cao hơn, update code để dùng `SUPABASE_SERVICE_ROLE_KEY` thay vì `ANON_KEY`:

**File: `src/lib/ai-news-generator.ts`**

```typescript
// Thay vì dùng client thường
import { supabase } from '@/integrations/supabase/client';

// Tạo admin client với service role
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY // Không có VITE_ prefix
);

// Dùng supabaseAdmin.from('news').insert(...)
```

## Sau khi Fix

Chạy lại test:

```bash
node test-ai-news-flow.mjs
```

Kết quả mong đợi:
- ✅ Supabase connected
- ✅ OpenAI connected  
- ✅ AI generated article
- ✅ Saved to database
- ✅ Data verified
- ✅ Frontend query OK

## Tự động hóa (Production)

Để chạy tự động hàng ngày, setup cron job hoặc GitHub Actions:

```yaml
# .github/workflows/daily-news.yml
name: Daily AI News
on:
  schedule:
    - cron: '0 6 * * *'  # 6:00 AM mỗi ngày
jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: node generate-daily-news.mjs
        env:
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_KEY: ${{ secrets.SUPABASE_SERVICE_KEY }}
          OPENAI_KEY: ${{ secrets.OPENAI_KEY }}
```
