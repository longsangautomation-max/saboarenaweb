# ⚡ Quick Reference: SABO ARENA SEO Automation

**1 page cheat sheet** - Print and keep!

---

## 🚀 Common Commands

### Publish New Blog Post
```bash
# Step 1: Publish via AI News Admin
# Step 2: Run automation
npm run auto-index your-new-article-slug

# Example:
npm run auto-index huong-dan-thi-dau-bi-a-9-bi-2025
```

### Regenerate Sitemap Only
```bash
npm run sitemap
```

### Index All Pages
```bash
npm run index
```

### Start Webhook Server (Development)
```bash
npm run webhook
# Server runs on http://localhost:3001
```

---

## 📊 Check Indexing Status

### Google Search Console
1. Open: https://search.google.com/search-console
2. Property: saboarena.com
3. Navigate: **Indexing → URL Inspection**
4. Enter URL: `https://saboarena.com/news/your-slug`
5. Results:
   - ✅ **URL is on Google** - Indexed successfully
   - 🔄 **URL is not on Google** - Crawling in progress (wait 24-48h)
   - ❌ **URL has errors** - Check error message

### Verify Sitemap
```bash
# Check sitemap file exists
ls -lh public/sitemap.xml

# Check sitemap content
cat public/sitemap.xml | grep "<loc>" | wc -l
# Should show 9+ URLs
```

### Check Last Indexed Article
```bash
# View sitemap URLs
cat public/sitemap.xml | grep "news" | tail -1
```

---

## 🛠️ Troubleshooting Quick Fixes

### Problem: "Failed to index URL"

**Solution:**
```bash
# Check Google credentials
node -e "console.log(process.env.GOOGLE_SERVICE_ACCOUNT_JSON ? '✅ Credentials OK' : '❌ Missing credentials')"

# Re-run with debug
node auto-index-new-posts.mjs your-slug
```

---

### Problem: Sitemap not updating

**Solution:**
```bash
# Check Supabase connection
node -e "
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
const { data, error } = await supabase.from('news').select('slug').eq('status', 'published');
console.log('Published articles:', data?.length || 0);
"

# Manually regenerate
npm run sitemap
```

---

### Problem: Webhook not triggering

**Solution:**
```bash
# Check webhook server running
curl http://localhost:3001/health
# Should return: {"status":"ok","timestamp":"..."}

# Test webhook manually
curl -X POST http://localhost:3001/test
```

---

## 📈 Expected Timeline

| Stage | Time | Check |
|-------|------|-------|
| Sitemap regenerated | Immediate | `ls -l public/sitemap.xml` |
| URL submitted to Google | < 1 min | Terminal shows "✅ Successfully indexed" |
| Google crawls URL | 1-24 hours | Search Console → Coverage |
| URL indexed | 3-7 days | Search Console → URL Inspection |
| Appears in search | 7-14 days | Google search: `site:saboarena.com your-title` |

---

## 🔑 File Locations

| File | Purpose | Location |
|------|---------|----------|
| Automation script | Main logic | `auto-index-new-posts.mjs` |
| Webhook handler | Receive webhooks | `webhook-handler.mjs` |
| Sitemap | XML sitemap | `public/sitemap.xml` |
| Google credentials | API keys | `.env.google` |
| Supabase credentials | Database | `.env` |
| Full guide | Documentation | `AUTOMATION_GUIDE.md` |

---

## 🎯 Success Metrics (Monthly)

- ✅ **10+ blog posts** published
- ✅ **100% auto-indexed** (no manual steps)
- ✅ **< 5 days** average time to index
- ✅ **0% error rate** (all posts indexed successfully)

**Check monthly:**
```bash
# Count published articles
node -e "
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
const { count } = await supabase.from('news').select('*', { count: 'exact', head: true }).eq('status', 'published');
console.log('Total published:', count);
"

# Check sitemap URL count
cat public/sitemap.xml | grep "<loc>" | wc -l
```

---

## 📞 Emergency Contacts

**Issue:** Automation stopped working  
**Action:** Check `AUTOMATION_GUIDE.md` → Troubleshooting section

**Issue:** Google API quota exceeded  
**Action:** Check quota usage at https://console.cloud.google.com/apis/dashboard  
**Solution:** Wait until next day (quota resets daily) or request increase

**Issue:** Webhook not receiving events  
**Action:** Check Supabase Dashboard → Database → Webhooks → Event Logs  
**Solution:** Verify webhook URL and status

---

## ✅ Quick Health Check (Run Weekly)

```bash
# 1. Check automation works
npm run auto-index

# 2. Check sitemap valid
curl https://saboarena.com/sitemap.xml | head -20

# 3. Check webhook server
curl http://localhost:3001/health

# 4. Check Google indexing status
# Open: https://search.google.com/search-console
# View: Coverage → Valid URLs (should increase weekly)
```

---

## 🚀 Pro Tips

1. **Schedule weekly check:** Add calendar reminder to verify indexing status
2. **Monitor quota:** Keep under 150 requests/day (leave 50 buffer)
3. **Batch publishing:** If publishing 5+ posts, space them 1 hour apart
4. **Social media:** Consider auto-posting to Twitter/Facebook (see AUTOMATION_GUIDE.md)
5. **Analytics:** Track traffic from blog posts in Google Analytics

---

**Full Documentation:** `AUTOMATION_GUIDE.md`  
**Phase Reports:** `PHASE_1_COMPLETE.md`, `PHASE_2_COMPLETE.md`

✅ **Keep this page handy for quick reference!**
