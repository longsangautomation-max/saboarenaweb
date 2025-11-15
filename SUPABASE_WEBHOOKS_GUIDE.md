# 🎯 Setup Supabase Database Webhooks (RECOMMENDED)

## ✅ Ưu điểm
- Native Supabase integration
- Automatic retry on failure
- Monitoring dashboard
- No SQL trigger needed
- Built-in error handling

## 📝 Setup Steps

### 1. Go to Supabase Database Webhooks
```
https://app.supabase.com/project/mogjjvscxjwvhtpkrlqr/database/hooks
```

### 2. Create New Hook

**Click:** "Create a new hook"

**Configuration:**

```yaml
Name: auto-index-on-blog-published
Table: news
Events: INSERT, UPDATE
Type: HTTP Request

Conditions:
  - record.status = 'published'

HTTP Request:
  Method: POST
  URL: https://sabo-arena-playbook-2h2ft4rx5-sabos-projects-a56a8c3b.vercel.app/api/webhook-blog-published
  Headers:
    Content-Type: application/json
  Timeout: 5000ms
```

**Payload Template:**
```json
{
  "type": "{{ event_type }}",
  "table": "{{ table }}",
  "record": {{ record }},
  "old_record": {{ old_record }}
}
```

### 3. Test Webhook

Click "Send Test Event" to verify

Expected: 200 OK response

### 4. Enable Hook

Toggle "Enabled" switch to ON

---

## 🧪 Testing

### Test 1: Via AI News Admin
1. Open: https://saboarena.com/ai-news-admin
2. Create article with status "published"
3. Check Supabase webhook logs

### Test 2: Direct Database Insert
```sql
INSERT INTO news (title, slug, content, status, published_at)
VALUES ('Test Webhook', 'test-webhook-' || extract(epoch from now())::text, 'Test content', 'published', NOW());
```

### Verify:
- Supabase Dashboard → Database → Hooks → View logs
- Check for successful POST requests
- Verify sitemap regenerated

---

## 🔧 Troubleshooting

### Webhook Not Firing
1. Check "Enabled" toggle is ON
2. Verify condition: `record.status = 'published'`
3. Check table name is correct: `news`

### 401/403 Error
- Vercel deployment has authentication
- Need to disable or use custom domain

### Timeout Error
- Increase timeout to 30000ms (30s)
- Check Vercel function cold start

---

## 🎉 Benefits Over SQL Trigger

| Feature | SQL Trigger | Supabase Webhooks |
|---------|-------------|-------------------|
| Setup | Complex SQL | Simple UI |
| Retry | No | Yes (automatic) |
| Monitoring | No | Dashboard |
| Error Handling | Manual | Built-in |
| Debugging | Hard | Logs available |
| Maintenance | Manual | Managed |

---

## 🚀 Next Steps

1. **Remove old SQL trigger** (optional cleanup):
   ```sql
   DROP TRIGGER IF EXISTS on_blog_published ON public.news;
   DROP FUNCTION IF EXISTS public.trigger_auto_index();
   ```

2. **Setup Supabase Webhook** (5 minutes)
   - Follow steps above in Supabase Dashboard

3. **Test workflow**
   - Publish blog post
   - Check webhook logs
   - Verify automation

---

## 📊 Expected Result

```
Blog Post Published
    ↓
Supabase Webhook Fires
    ↓
POST → Vercel Function
    ↓
Regenerate Sitemap
    ↓
Submit to Google
    ↓
✅ DONE!
```

All automatic, no manual commands needed! 🎉
