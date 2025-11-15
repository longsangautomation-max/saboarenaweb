# 🔗 Setup Supabase Webhook - Manual Instructions

Since Vercel deployment has authentication protection, we'll use **SQL trigger approach** instead.

---

## Option 1: SQL Trigger (Recommended)

### Step 1: Open Supabase SQL Editor

1. Go to: https://app.supabase.com/project/mogjjvscxjwvhtpkrlqr
2. Click: **SQL Editor** (left sidebar)
3. Click: **New Query**

### Step 2: Create Trigger Function

Paste this SQL:

```sql
-- Enable http extension if not already enabled
CREATE EXTENSION IF NOT EXISTS http;

-- Create function to call automation locally
CREATE OR REPLACE FUNCTION trigger_auto_index()
RETURNS TRIGGER AS $$
DECLARE
  webhook_url TEXT := 'http://localhost:3001/webhook/blog-published';
  request_id BIGINT;
BEGIN
  -- Call webhook asynchronously
  SELECT http_post(
    webhook_url,
    json_build_object(
      'type', TG_OP,
      'table', TG_TABLE_NAME,
      'record', row_to_json(NEW),
      'old_record', row_to_json(OLD)
    )::text,
    'application/json'
  ) INTO request_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on news table
DROP TRIGGER IF EXISTS on_blog_published ON news;

CREATE TRIGGER on_blog_published
  AFTER INSERT OR UPDATE ON news
  FOR EACH ROW
  WHEN (NEW.status = 'published')
  EXECUTE FUNCTION trigger_auto_index();
```

### Step 3: Run Query

Click **RUN** button (or Ctrl+Enter)

**Expected output:**
```
Success. No rows returned
```

---

## Option 2: Use ngrok for Testing

### Step 1: Install ngrok

```bash
# Windows (with chocolatey)
choco install ngrok

# Or download from https://ngrok.com/download
```

### Step 2: Start webhook server locally

Terminal 1:
```bash
cd d:\sabo-arena-playbook
npm run webhook
```

Output:
```
🔗 Webhook handler running on http://localhost:3001
   POST /webhook/blog-published - Main webhook
   GET  /health - Health check
   POST /test - Test automation
```

### Step 3: Start ngrok tunnel

Terminal 2:
```bash
ngrok http 3001
```

Copy HTTPS URL (e.g., `https://abc123.ngrok.io`)

### Step 4: Update SQL trigger with ngrok URL

```sql
-- Update function with ngrok URL
CREATE OR REPLACE FUNCTION trigger_auto_index()
RETURNS TRIGGER AS $$
DECLARE
  webhook_url TEXT := 'https://abc123.ngrok.io/webhook/blog-published';  -- Replace with your ngrok URL
  request_id BIGINT;
BEGIN
  SELECT http_post(
    webhook_url,
    json_build_object(
      'type', TG_OP,
      'table', TG_TABLE_NAME,
      'record', row_to_json(NEW),
      'old_record', row_to_json(OLD)
    )::text,
    'application/json'
  ) INTO request_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

## Testing the Trigger

### Method 1: Publish via AI News Admin

1. Open: https://saboarena.com/ai-news-admin
2. Create new article:
   - Title: "Test Webhook Automation"
   - Slug: "test-webhook-automation"
   - Status: Draft
3. Click **Save**
4. Change status to **Published**
5. Click **Save** again

**Expected:**
- Webhook receives event within 1 second
- Automation runs automatically
- Sitemap regenerated
- URL indexed to Google

### Method 2: Direct SQL Update

In Supabase SQL Editor:

```sql
-- Insert test article
INSERT INTO news (title, slug, content, status, published_at)
VALUES (
  'Test Webhook Article',
  'test-webhook-article-2',
  'This is a test article to verify webhook automation.',
  'published',
  NOW()
);

-- Or update existing article to published
UPDATE news
SET status = 'published', published_at = NOW()
WHERE slug = 'sabo-arena-nen-tang-thi-dau-bida-1-viet-nam';
```

**Check webhook logs:**
- Terminal should show: `📨 Received webhook: ...`
- Automation should execute: `✅ Successfully indexed!`

---

## Verify Automation Worked

### 1. Check sitemap

```bash
curl https://saboarena.com/sitemap.xml | grep "test-webhook"
```

Should find the URL.

### 2. Check Google Search Console

1. Open: https://search.google.com/search-console
2. Navigate: **Indexing → URL Inspection**
3. Enter: `https://saboarena.com/news/test-webhook-article-2`
4. Check status (will show "URL is not on Google" initially, crawled within 24h)

---

## Troubleshooting

### Issue: Trigger doesn't fire

**Check trigger exists:**
```sql
SELECT * FROM information_schema.triggers
WHERE trigger_name = 'on_blog_published';
```

**Check function exists:**
```sql
SELECT * FROM pg_proc WHERE proname = 'trigger_auto_index';
```

**Re-create trigger:**
```sql
DROP TRIGGER IF EXISTS on_blog_published ON news;
CREATE TRIGGER on_blog_published
  AFTER INSERT OR UPDATE ON news
  FOR EACH ROW
  WHEN (NEW.status = 'published')
  EXECUTE FUNCTION trigger_auto_index();
```

### Issue: http_post fails

**Check http extension:**
```sql
SELECT * FROM pg_extension WHERE extname = 'http';
```

**Install if missing:**
```sql
CREATE EXTENSION http;
```

### Issue: Webhook server not receiving

**Check webhook server running:**
```bash
curl http://localhost:3001/health
# Should return: {"status":"ok","timestamp":"..."}
```

**Check ngrok tunnel:**
```bash
curl https://your-ngrok-url.ngrok.io/health
# Should return same response
```

---

## Production Deployment (Future)

When ready for production without authentication:

1. **Disable Vercel Protection:**
   - Vercel Dashboard → Project Settings → Deployment Protection
   - Disable "Vercel Authentication"

2. **Or use custom domain:**
   - Add custom domain: api.saboarena.com
   - Point webhook to: https://api.saboarena.com/webhook/blog-published

3. **Update SQL trigger with production URL**

---

## Current Status

✅ Webhook function deployed to Vercel  
✅ Environment variables configured  
⏳ **Next:** Run SQL script above to create trigger  
⏳ **Then:** Test with blog post publish

**Choose:**
- Quick test: Use ngrok (15 minutes)
- Production: Wait for Vercel protection fix or custom domain

---

**Files created:**
- `api/webhook-blog-published.js` - Vercel serverless function
- `vercel.json` - Vercel configuration
- `setup-vercel-env.mjs` - Auto-setup environment variables
- `SUPABASE_WEBHOOK_SETUP.md` - This file
