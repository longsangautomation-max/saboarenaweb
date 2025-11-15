# 🤖 AUTOMATION GUIDE

Hướng dẫn setup automation cho SABO ARENA SEO workflow.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Setup Instructions](#setup-instructions)
4. [Testing](#testing)
5. [Troubleshooting](#troubleshooting)
6. [Maintenance](#maintenance)

---

## Overview

### ✨ Automation Features

**Auto-Indexing Workflow:**
- ✅ Tự động regenerate sitemap.xml khi publish blog post mới
- ✅ Tự động submit URL mới lên Google Indexing API
- ✅ Zero-touch: Không cần chạy script thủ công
- ✅ Webhook-triggered: Real-time automation

**Expected Results:**
- **Crawling:** Within 24 hours
- **Indexing:** 3-7 days
- **Search appearance:** 7-14 days

---

## Architecture

```
┌─────────────────┐
│  AI News Admin  │ (Publish blog post)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Supabase DB   │ (news table INSERT/UPDATE)
└────────┬────────┘
         │
         │ Webhook
         ▼
┌─────────────────┐
│ Webhook Handler │ (webhook-handler.mjs)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Auto-Indexing  │ (auto-index-new-posts.mjs)
└────────┬────────┘
         │
         ├─► Regenerate sitemap.xml
         └─► Submit to Google Indexing API
```

---

## Setup Instructions

### Step 1: Install Dependencies

```bash
cd d:\sabo-arena-playbook
npm install express google-auth-library @supabase/supabase-js dotenv
```

### Step 2: Setup Environment Variables

Đảm bảo có 2 files:

**`.env`** (Supabase):
```env
VITE_SUPABASE_URL=https://mogjjvscxjwvhtpkrlqr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**`.env.google`** (Google Service Account):
```env
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"long-sang-automation",...}
```

### Step 3: Test Automation Script

Chạy thử automation:

```bash
# Test: Regenerate sitemap only
node auto-index-new-posts.mjs

# Test: Regenerate + index URL mới
node auto-index-new-posts.mjs sabo-arena-nen-tang-thi-dau-bida-1-viet-nam
```

**Expected Output:**
```
🤖 AUTO-INDEX: Starting automation...

📊 Fetching published articles...
   Found: 1 published article(s)

🗺️  Generating sitemap...
   ✅ Created: d:\sabo-arena-playbook\public\sitemap.xml
   📊 Total URLs: 9

🚀 Indexing new article: https://saboarena.com/news/...
   ✅ Successfully indexed!

✅ Automation complete!
```

### Step 4: Setup Webhook (2 Options)

#### **Option A: Supabase Database Webhook**

1. **Mở Supabase Dashboard:**
   - Navigate to: Database → Webhooks
   - Click: "Enable Webhooks"

2. **Tạo Webhook Mới:**
   ```
   Name: blog-post-published
   Table: news
   Events: INSERT, UPDATE
   Method: POST
   URL: https://your-domain.com/webhook/blog-published
   HTTP Headers:
     Authorization: Bearer YOUR_WEBHOOK_SECRET
   ```

3. **Deploy Webhook Handler:**
   
   **Vercel Serverless:**
   - Tạo file `api/webhook-blog-published.js`:
   ```javascript
   import handler from '../webhook-handler.mjs';
   export default handler;
   ```
   - Deploy: `vercel --prod`

   **Local Server (Development):**
   ```bash
   node webhook-handler.mjs
   # Running on http://localhost:3001
   ```

   **Ngrok (Testing):**
   ```bash
   ngrok http 3001
   # Copy HTTPS URL → Paste vào Supabase Webhook URL
   ```

#### **Option B: Supabase Edge Function**

Tạo Edge Function trigger:

```sql
-- Create function to call automation
CREATE OR REPLACE FUNCTION trigger_auto_index()
RETURNS TRIGGER AS $$
BEGIN
  -- Call Edge Function hoặc external API
  PERFORM net.http_post(
    url := 'https://your-domain.com/webhook/blog-published',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := json_build_object(
      'type', TG_OP,
      'table', TG_TABLE_NAME,
      'record', row_to_json(NEW),
      'old_record', row_to_json(OLD)
    )::jsonb
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER on_blog_published
  AFTER INSERT OR UPDATE ON news
  FOR EACH ROW
  WHEN (NEW.status = 'published')
  EXECUTE FUNCTION trigger_auto_index();
```

### Step 5: Verify Setup

1. **Test Webhook Endpoint:**
   ```bash
   curl -X POST http://localhost:3001/test
   ```

2. **Test Full Workflow:**
   - Mở AI News Admin
   - Publish 1 blog post test
   - Check terminal logs
   - Verify sitemap.xml updated
   - Check Google Search Console (Indexing → URL Inspection)

---

## Testing

### Manual Testing

**Test 1: Sitemap Generation**
```bash
node auto-index-new-posts.mjs
# Should regenerate sitemap with all published articles
```

**Test 2: New Article Indexing**
```bash
node auto-index-new-posts.mjs test-slug
# Should regenerate sitemap + index URL
```

**Test 3: Webhook Handler**
```bash
# Terminal 1: Start webhook server
node webhook-handler.mjs

# Terminal 2: Send test webhook
curl -X POST http://localhost:3001/webhook/blog-published \
  -H "Content-Type: application/json" \
  -d '{
    "table": "news",
    "record": {
      "slug": "test-article",
      "status": "published"
    },
    "old_record": null
  }'
```

### Automated Testing

Tạo file `test-automation.mjs`:

```javascript
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

async function runTests() {
  console.log('🧪 Running automation tests...\n');
  
  // Test 1: Sitemap generation
  console.log('Test 1: Sitemap generation');
  const { stdout: out1 } = await execAsync('node auto-index-new-posts.mjs');
  console.log(out1.includes('✅ Created') ? '✅ PASS' : '❌ FAIL');
  
  // Test 2: Article indexing
  console.log('\nTest 2: Article indexing');
  const { stdout: out2 } = await execAsync('node auto-index-new-posts.mjs test-slug');
  console.log(out2.includes('Successfully indexed') ? '✅ PASS' : '❌ FAIL');
  
  console.log('\n✅ All tests completed');
}

runTests();
```

Run tests:
```bash
node test-automation.mjs
```

---

## Troubleshooting

### Issue 1: "Failed to index URL"

**Symptoms:**
```
❌ Failed to index https://saboarena.com/news/...
Error: Invalid credentials
```

**Solution:**
1. Check `.env.google` file có GOOGLE_SERVICE_ACCOUNT_JSON
2. Verify Service Account có quyền "Owner" trên Search Console property
3. Check API enabled: `https://console.cloud.google.com/apis/dashboard`

**Fix:**
```bash
# Re-authenticate
node -e "
const auth = new GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
  scopes: ['https://www.googleapis.com/auth/indexing']
});
auth.getClient().then(() => console.log('✅ Auth OK'));
"
```

---

### Issue 2: Webhook không trigger

**Symptoms:**
- Publish blog post nhưng webhook handler không nhận request

**Solution:**
1. **Check Supabase Webhook:**
   - Mở Supabase Dashboard → Database → Webhooks
   - Verify webhook enabled và URL đúng
   - Check "Event Logs" có errors

2. **Check Webhook URL accessible:**
   ```bash
   curl https://your-domain.com/webhook/blog-published
   # Should return 400 (Bad Request) - endpoint exists
   ```

3. **Check Webhook Handler running:**
   ```bash
   # Local
   lsof -i :3001  # Should show node process
   
   # Vercel
   vercel logs  # Check deployment logs
   ```

**Fix:**
```bash
# Restart webhook handler
pkill -f webhook-handler
node webhook-handler.mjs

# Or redeploy to Vercel
vercel --prod
```

---

### Issue 3: Sitemap không update

**Symptoms:**
- Automation chạy nhưng `sitemap.xml` không thay đổi

**Solution:**
1. **Check file permissions:**
   ```bash
   ls -la public/sitemap.xml
   # Should be writable
   ```

2. **Check Supabase connection:**
   ```bash
   node -e "
   import { createClient } from '@supabase/supabase-js';
   const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
   const { data } = await supabase.from('news').select('slug').eq('status', 'published');
   console.log('Articles:', data);
   "
   ```

3. **Manually regenerate:**
   ```bash
   node auto-index-new-posts.mjs
   ```

---

### Issue 4: "Too Many Requests" từ Google

**Symptoms:**
```
❌ Failed to index: 429 Too Many Requests
```

**Cause:** Google Indexing API có quota limit (200 requests/day)

**Solution:**
1. **Check quota usage:**
   - Mở Google Cloud Console → APIs & Services → Quotas
   - Search: "Indexing API"

2. **Implement rate limiting:**
   Thêm vào `auto-index-new-posts.mjs`:
   ```javascript
   const RATE_LIMIT_DELAY = 5000; // 5 seconds
   
   async function indexUrl(url) {
     await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY));
     // ... existing code
   }
   ```

3. **Batch indexing:**
   Thay vì index ngay, lưu vào queue và batch index sau:
   ```javascript
   // index-queue.json
   {
     "pending": ["url1", "url2", "url3"]
   }
   
   // Cron job: Index 10 URLs mỗi hour
   ```

---

## Maintenance

### Daily Tasks

**Check Automation Status:**
```bash
# Check webhook handler logs
tail -f webhook-handler.log

# Check last sitemap update
ls -lh public/sitemap.xml
```

### Weekly Tasks

**Verify Google Indexing:**
```bash
# Check sitemap status
node -e "
import { GoogleAuth } from 'google-auth-library';
// ... fetch sitemap status from Search Console
"
```

**Check Error Logs:**
```bash
grep "ERROR" webhook-handler.log | tail -20
```

### Monthly Tasks

**Performance Review:**
- Check Google Search Console → Performance
- Compare impressions/clicks before vs after automation
- Verify all blog posts indexed (Indexing → Sitemaps)

**Update Dependencies:**
```bash
npm outdated
npm update google-auth-library @supabase/supabase-js express
```

**Audit Quota Usage:**
- Google Cloud Console → APIs & Services → Quotas
- Indexing API Requests: Should be < 200/day

---

## Advanced Features (Optional)

### Feature 1: Slack Notifications

Thêm vào `webhook-handler.mjs`:

```javascript
import fetch from 'node-fetch';

async function sendSlackNotification(message) {
  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: message })
  });
}

// Trong webhook handler
await sendSlackNotification(`✅ Blog post indexed: ${slug}`);
```

### Feature 2: Analytics Tracking

Track automation metrics:

```javascript
// metrics.json
{
  "total_indexed": 15,
  "success_rate": 0.93,
  "avg_time_to_index": "4.2 days",
  "last_indexed": "2025-01-11T10:30:00Z"
}
```

### Feature 3: Social Media Auto-Post

Share blog posts lên Twitter/Facebook:

```javascript
// Trong auto-index-new-posts.mjs
async function shareToSocialMedia(article) {
  // Twitter API
  await twitterClient.tweet({
    text: `🎱 ${article.title}\n\n${PROPERTY_URL}/news/${article.slug}`
  });
  
  // Facebook Graph API
  await facebookClient.post({
    message: article.title,
    link: `${PROPERTY_URL}/news/${article.slug}`
  });
}
```

---

## Support

**Issues:** Liên hệ dev team  
**Documentation:** `AUTOMATION_GUIDE.md` (this file)  
**Scripts:** `auto-index-new-posts.mjs`, `webhook-handler.mjs`

---

✅ **Phase 2 Complete:** Automation workflow ready!
