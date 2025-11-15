# ✅ Phase 3 Checklist: Production Deployment

**Goal:** Deploy automation to production for zero-touch workflow

**Status:** ⏳ PENDING  
**Priority:** HIGH  
**Estimated Time:** 3-4 hours

---

## 📋 Deployment Checklist

### 1. Pre-Deployment Verification
- [x] Phase 1 complete (Blog system working)
- [x] Phase 2 complete (Automation scripts tested)
- [x] All tests passing locally
- [ ] `.env` and `.env.google` files backed up
- [ ] Team notified of deployment schedule

---

### 2. Choose Deployment Method

#### Option A: Vercel Serverless (Recommended) ⭐
**Pros:**
- ✅ Free tier (100 GB-hours/month)
- ✅ Auto-scaling
- ✅ Zero maintenance
- ✅ HTTPS by default
- ✅ Easy deployment

**Cons:**
- ❌ Cold start latency (~1-2 seconds)
- ❌ Timeout limit (10 seconds hobby, 60 seconds pro)

**Steps:**
- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Login: `vercel login`
- [ ] Create `api/webhook-blog-published.js`:
  ```javascript
  import handler from '../webhook-handler.mjs';
  export default handler;
  ```
- [ ] Add environment variables to Vercel:
  ```bash
  vercel env add VITE_SUPABASE_URL
  vercel env add VITE_SUPABASE_ANON_KEY
  vercel env add GOOGLE_SERVICE_ACCOUNT_JSON
  ```
- [ ] Deploy: `vercel --prod`
- [ ] Note webhook URL: `https://your-project.vercel.app/api/webhook-blog-published`

---

#### Option B: Supabase Edge Function
**Pros:**
- ✅ Runs on Supabase infrastructure
- ✅ Direct database access (no API calls)
- ✅ No external service needed
- ✅ TypeScript/Deno runtime

**Cons:**
- ❌ Deno runtime (may need code changes)
- ❌ Less familiar than Node.js
- ❌ Limited debugging tools

**Steps:**
- [ ] Install Supabase CLI: `npm i -g supabase`
- [ ] Init Supabase: `supabase init`
- [ ] Create function: `supabase functions new blog-published`
- [ ] Copy webhook logic to `supabase/functions/blog-published/index.ts`
- [ ] Deploy: `supabase functions deploy blog-published`
- [ ] Set secrets:
  ```bash
  supabase secrets set GOOGLE_SERVICE_ACCOUNT_JSON='{...}'
  ```
- [ ] Note webhook URL: `https://mogjjvscxjwvhtpkrlqr.supabase.co/functions/v1/blog-published`

---

#### Option C: VPS with PM2
**Pros:**
- ✅ Full control
- ✅ Custom logging
- ✅ No cold starts
- ✅ Familiar Node.js environment

**Cons:**
- ❌ Monthly cost ($5-20)
- ❌ Maintenance required
- ❌ Manual scaling

**Steps:**
- [ ] Rent VPS (DigitalOcean, Vultr, Linode)
- [ ] SSH into server: `ssh root@your-server-ip`
- [ ] Install Node.js: `curl -fsSL https://deb.nodesource.com/setup_20.x | bash -`
- [ ] Install PM2: `npm i -g pm2`
- [ ] Clone repo or upload files
- [ ] Copy `.env` files to server
- [ ] Start webhook: `pm2 start webhook-handler.mjs --name webhook`
- [ ] Setup nginx reverse proxy (port 80 → 3001)
- [ ] Note webhook URL: `https://your-domain.com/webhook/blog-published`

---

### 3. Setup Supabase Webhook

**Method 1: Database Webhook (Recommended)**
- [ ] Open Supabase Dashboard
- [ ] Navigate: **Database → Webhooks**
- [ ] Click: **Enable Webhooks**
- [ ] Create new webhook:
  - Name: `blog-post-published`
  - Table: `news`
  - Events: ✅ INSERT, ✅ UPDATE
  - HTTP Method: `POST`
  - HTTP URL: `<your-webhook-url>/webhook/blog-published`
  - HTTP Headers:
    ```json
    {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_SECRET_TOKEN"
    }
    ```
- [ ] Save webhook
- [ ] Copy webhook ID for reference

**Method 2: Database Trigger + Edge Function**
- [ ] Run SQL in Supabase SQL Editor:
  ```sql
  CREATE OR REPLACE FUNCTION trigger_auto_index()
  RETURNS TRIGGER AS $$
  BEGIN
    PERFORM net.http_post(
      url := 'https://your-webhook-url/webhook/blog-published',
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

  CREATE TRIGGER on_blog_published
    AFTER INSERT OR UPDATE ON news
    FOR EACH ROW
    WHEN (NEW.status = 'published')
    EXECUTE FUNCTION trigger_auto_index();
  ```
- [ ] Verify trigger created: Check **Database → Triggers**

---

### 4. Testing

#### Test 1: Webhook Endpoint
- [ ] Test webhook URL accessible:
  ```bash
  curl https://your-webhook-url/webhook/blog-published
  # Should return 400 Bad Request (endpoint exists)
  ```

- [ ] Test health endpoint:
  ```bash
  curl https://your-webhook-url/health
  # Should return: {"status":"ok","timestamp":"..."}
  ```

#### Test 2: Manual Webhook Call
- [ ] Send test webhook:
  ```bash
  curl -X POST https://your-webhook-url/webhook/blog-published \
    -H "Content-Type: application/json" \
    -d '{
      "table": "news",
      "record": {
        "slug": "test-article-2",
        "status": "published",
        "title": "Test Article 2"
      },
      "old_record": null
    }'
  ```

- [ ] Check response: Should be `{"success":true,"message":"..."}`

- [ ] Verify automation ran:
  - [ ] Check sitemap.xml updated
  - [ ] Check logs (Vercel logs, PM2 logs, or Edge Function logs)

#### Test 3: End-to-End Workflow
- [ ] Open AI News Admin
- [ ] Create test article:
  - Title: "Test Article for Automation"
  - Slug: "test-automation-2025"
  - Status: Draft
- [ ] Click **Save Article**
- [ ] Change status to **Published**
- [ ] Click **Save Article** again
- [ ] Wait 5-10 seconds
- [ ] Check logs:
  - [ ] Webhook received event
  - [ ] Automation script executed
  - [ ] Sitemap regenerated
  - [ ] URL submitted to Google
- [ ] Verify sitemap:
  ```bash
  curl https://saboarena.com/sitemap.xml | grep "test-automation-2025"
  # Should find the URL
  ```
- [ ] Verify Google Search Console:
  - [ ] Open: https://search.google.com/search-console
  - [ ] URL Inspection: `https://saboarena.com/news/test-automation-2025`
  - [ ] Should show "URL is on Google" within 24 hours

---

### 5. Monitoring Setup

#### Basic Logging
- [ ] **Vercel:** Check deployment logs in Vercel Dashboard
- [ ] **Supabase Edge:** Check logs in Supabase Functions tab
- [ ] **PM2:** Run `pm2 logs webhook` to see logs
- [ ] Save logs to file:
  ```bash
  # Vercel
  vercel logs > webhook.log

  # PM2
  pm2 logs webhook --lines 1000 > webhook.log
  ```

#### Advanced Monitoring (Optional)
- [ ] Setup Sentry for error tracking
- [ ] Setup Datadog/New Relic for performance
- [ ] Setup Uptime monitoring (UptimeRobot, Pingdom)
- [ ] Create Slack webhook for alerts:
  ```javascript
  async function sendAlert(message) {
    await fetch(process.env.SLACK_WEBHOOK, {
      method: 'POST',
      body: JSON.stringify({ text: `🚨 ${message}` })
    });
  }
  ```

---

### 6. Documentation Updates

- [ ] Update `AUTOMATION_GUIDE.md`:
  - Add production webhook URL
  - Add deployment instructions
  - Add monitoring setup
  - Add rollback procedure

- [ ] Update `QUICK_REFERENCE.md`:
  - Update webhook URL
  - Add production testing commands
  - Add monitoring dashboard link (if created)

- [ ] Create `PRODUCTION_SETUP.md`:
  - Document deployment method chosen
  - List all credentials used
  - Emergency contacts
  - Rollback instructions

---

### 7. Team Training

- [ ] Schedule training session (30 min)
- [ ] Walk through workflow:
  1. Publish blog post in AI News Admin
  2. Verify automation triggered (check logs)
  3. Check sitemap updated
  4. Verify Google Search Console (24 hours later)
- [ ] Share documentation links
- [ ] Add to team wiki/knowledge base
- [ ] Create video tutorial (optional)

---

### 8. Launch

- [ ] Final checks:
  - [ ] All tests passing
  - [ ] Team trained
  - [ ] Documentation complete
  - [ ] Monitoring setup
  - [ ] Backup plan ready

- [ ] Publish announcement:
  - [ ] Notify team: "🚀 SEO automation now live!"
  - [ ] Share success metrics target
  - [ ] Encourage feedback

- [ ] Monitor for first week:
  - [ ] Check logs daily
  - [ ] Verify all blog posts auto-indexed
  - [ ] Fix any issues immediately
  - [ ] Collect feedback from team

---

### 9. Post-Launch

#### Week 1 Review
- [ ] Check automation success rate (should be 100%)
- [ ] Review logs for errors
- [ ] Verify all blog posts indexed
- [ ] Collect team feedback

#### Month 1 Review
- [ ] Measure time saved (should be 2.5+ hours)
- [ ] Check Google Search Console:
  - [ ] All blog posts indexed
  - [ ] Average time to index (should be < 7 days)
  - [ ] Impressions/clicks growth
- [ ] Review automation performance:
  - [ ] Average execution time
  - [ ] Error rate
  - [ ] API quota usage
- [ ] Identify improvements:
  - [ ] Add social media integration?
  - [ ] Add monitoring dashboard?
  - [ ] Optimize indexing speed?

---

## 🚨 Rollback Plan

If automation fails in production:

### Emergency Steps
1. **Disable webhook:**
   - Supabase Dashboard → Database → Webhooks → Disable
   - Or: Drop trigger: `DROP TRIGGER on_blog_published ON news;`

2. **Revert to manual workflow:**
   ```bash
   # After publishing blog post:
   npm run auto-index article-slug
   ```

3. **Check logs:**
   ```bash
   # Find error
   vercel logs | grep "ERROR"
   pm2 logs webhook | grep "error"
   ```

4. **Fix issue:**
   - Update code
   - Redeploy: `vercel --prod` or `pm2 restart webhook`

5. **Re-enable webhook:**
   - Supabase Dashboard → Enable webhook
   - Or: Re-run trigger SQL

---

## 📊 Success Criteria

Phase 3 is complete when:

- [x] Webhook deployed to production
- [x] Supabase webhook configured
- [x] End-to-end test successful
- [x] Monitoring setup
- [x] Team trained
- [x] Documentation updated
- [x] 1 week of successful automation (100% success rate)

---

## 📞 Emergency Contacts

**Webhook down:** Check deployment logs (Vercel/PM2/Edge Functions)  
**Supabase webhook error:** Check Database → Webhooks → Event Logs  
**Google API error:** Check quota at https://console.cloud.google.com/apis/dashboard

**Rollback command:**
```sql
-- Disable trigger
DROP TRIGGER IF EXISTS on_blog_published ON news;
```

---

**Next Action:** Choose deployment method (Vercel recommended) → Start Step 2

**Estimated completion:** 3-4 hours (including testing)
