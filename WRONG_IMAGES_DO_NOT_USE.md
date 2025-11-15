# 🚫 WRONG IMAGES - DO NOT USE!

## ⚠️ Soccer/Football Images (NOT Billiards!)

### BANNED IMAGE IDs:
```
photo-1574629810360-7efbbe195018  ❌ SOCCER BALL - NOT BILLIARDS!
```

**What went wrong:**
- This is a **soccer/football** image (green grass, soccer ball, cleats)
- Was mistakenly used for billiards blog posts
- Found in 11 files across the project
- Fixed on 2025-11-11

---

## ✅ CORRECT Billiards Images

### 🎯 PRIMARY SOURCE: Supabase Storage (Self-hosted)

**Use these FIRST (no external dependencies!):**

1. **tournaments/tournaments-2.jpg** ✅ (DEFAULT)
   - Billiard table with cue - Competition ready
   - URL: `https://mogjjvscxjwvhtpkrlqr.supabase.co/storage/v1/object/public/billiard-images/tournaments/tournaments-2.jpg`
   - Source: Supabase Storage

2. **tournaments/tournaments-4.jpg** ✅
   - Billiard balls arranged - Tournament setup
   - URL: `https://mogjjvscxjwvhtpkrlqr.supabase.co/storage/v1/object/public/billiard-images/tournaments/tournaments-4.jpg`

3. **players/players-1.jpg** ✅
   - Player focusing on shot - Concentration
   - URL: `https://mogjjvscxjwvhtpkrlqr.supabase.co/storage/v1/object/public/billiard-images/players/players-1.jpg`

See `src/lib/billiard-images.ts` for full collection.

### 🔄 FALLBACK: Unsplash (if Supabase unavailable)

1. **photo-1511688878353-3a2f5be94cd7** ✅ (DEFAULT)
   - Pool balls on green billiards table
   - Perfect for blog posts
   - URL: `https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=1200&h=630&fit=crop`

2. **photo-1626315869151-287b552f9e4d** ✅
   - Billiards balls close-up
   - Good for detail shots

3. **photo-1604999333679-b86d54738315** ✅
   - Pool table with cue ball
   - Professional setup

4. **photo-1561414927-6e0f21b91b08** ✅
   - Snooker table professional
   - High quality

---

## 🔍 How to Verify Images

### Search Keywords (Unsplash):
✅ "billiards"
✅ "pool table"
✅ "snooker"
✅ "8 ball pool"
✅ "billiard balls"

❌ NOT: "soccer", "football", "sport field"

### Visual Check:
- ✅ Green FELT table (not grass)
- ✅ Pool BALLS (not soccer ball)
- ✅ CUE stick visible
- ✅ Indoor lighting
- ❌ Soccer ball = WRONG!
- ❌ Grass field = WRONG!
- ❌ Cleats = WRONG!

---

## 📝 Usage in Code

### Default fallback image:
```javascript
// BEST ✅ - Use Supabase Storage (self-hosted, no external deps)
const DEFAULT_IMAGE = 'https://mogjjvscxjwvhtpkrlqr.supabase.co/storage/v1/object/public/billiard-images/tournaments/tournaments-2.jpg';

// FALLBACK ✅ - Unsplash (if Supabase unavailable)
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=1200&h=630&fit=crop';

// WRONG ❌ - DO NOT USE!
const WRONG = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018'; // SOCCER!
```

### In Blog.tsx:
```tsx
<img 
  src={article.cover_image_url || 'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=800'} 
  alt="Billiards"
/>
```

---

## 🛠️ Fixed Files (2025-11-11)

1. ✅ Database: Updated article cover_image_url
2. ✅ `src/pages/Blog.tsx` (2 locations)
3. ✅ `publish-blog-post.mjs`
4. ✅ `src/lib/billiard-images.ts`
5. ⚠️ `open-ai-news-admin.mjs` (documentation only)
6. ⚠️ `supabase_news_schema.sql` (sample data)
7. ⚠️ `upload-images-to-supabase.mjs` (old script)

---

## 🔄 Prevention Steps

### Before using any image:
1. **Search Unsplash** with correct keywords
2. **Visually verify** it's billiards (NOT soccer!)
3. **Check the photo ID** against banned list
4. **Test in browser** to confirm

### Code Review Checklist:
- [ ] Image shows billiards table/balls?
- [ ] NOT showing soccer/football?
- [ ] Using one of the approved image IDs?
- [ ] Fallback image is also billiards?

---

## 📊 Impact

**Before Fix:**
- 1 blog post with wrong soccer image
- 11 code references to wrong image
- Bad user experience (soccer on billiards blog!)

**After Fix:**
- ✅ All references updated to correct billiards image
- ✅ Database updated
- ✅ Documentation created to prevent future mistakes
- ✅ Verified pool balls on green felt table

---

## 🎯 Lesson Learned

**Always visually verify stock photos!**
- Don't rely on Unsplash search results blindly
- "Sport" searches can return ANY sport
- Check the actual image content before using
- When in doubt, search "billiards" specifically

---

**Updated:** 2025-11-11  
**Status:** ✅ FIXED  
**Default Image:** photo-1511688878353-3a2f5be94cd7 (Pool balls on billiards table)
