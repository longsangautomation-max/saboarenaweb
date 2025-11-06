# 🔧 TROUBLESHOOTING GUIDE - ADMIN PANEL V2

## ❌ Vấn đề: 3 nút thao tác chưa hoạt động

### ✅ ĐÃ FIX:

1. **Thêm Console Logging**
   - ✅ Update news: Log ID và updates
   - ✅ Delete news: Log ID và result
   - ✅ Fetch news: Auto refresh sau CRUD

2. **Thêm Error Handling**
   - ✅ Try-catch đầy đủ
   - ✅ Error messages rõ ràng
   - ✅ Success notifications

3. **Thêm Loading States**
   - ✅ Deleting indicator
   - ✅ Disable buttons khi processing
   - ✅ Spinner animation

4. **Thêm Operation Alerts**
   - ✅ Success alert (màu xanh)
   - ✅ Error alert (màu đỏ)
   - ✅ Auto-hide sau 3s

---

## 🧪 CÁCH TEST:

### 1. Mở Browser Console (F12)
```
Nhấn F12 → Tab "Console"
```

### 2. Test Nút XEM (👁️)
- Click icon Eye màu xanh dương
- **Kết quả mong đợi:** Mở bài viết trong tab mới
- **Nếu lỗi:** Xem console log

### 3. Test Nút SỬA (✏️)
- Click icon Edit màu xanh lá
- Sửa tiêu đề, nội dung, hoặc trạng thái
- Click "Lưu"
- **Console sẽ hiện:**
  ```
  ✏️ Updating news with ID: xxx-xxx-xxx
  Updates: { title: "...", content: "..." }
  ✅ Update successful, refreshing list...
  ✅ List refreshed
  ```
- **UI sẽ hiện:** Alert xanh "✅ Đã cập nhật bài viết thành công!"

### 4. Test Nút XÓA (🗑️)
- Click icon Trash màu đỏ
- Confirm "Xóa"
- **Console sẽ hiện:**
  ```
  🗑️ Deleting news with ID: xxx-xxx-xxx
  ✅ Delete successful, refreshing list...
  ✅ List refreshed
  ```
- **UI sẽ hiện:** Alert xanh "✅ Đã xóa bài viết thành công!"

---

## 🐛 NẾU VẪN LỖI:

### Kiểm tra Console Errors

#### Lỗi 1: "supabaseAdmin is not defined"
**Fix:** Restart dev server
```bash
npm run dev
```

#### Lỗi 2: "Cannot read property 'from' of undefined"
**Fix:** Check VITE_SUPABASE_URL in .env
```bash
Get-Content .env | Select-String "SUPABASE"
```

#### Lỗi 3: "Row violates RLS policy"
**Fix:** Đã fix bằng service_role key (bypass RLS)
- Check file: `src/lib/supabase-admin.ts`

#### Lỗi 4: "Network error"
**Fix:** Check internet connection

---

## 📋 CHECKLIST:

- [x] ✅ Backend CRUD hoạt động (test-crud-operations.mjs passed)
- [x] ✅ service_role key có quyền delete
- [x] ✅ Console logging added
- [x] ✅ Error handling added
- [x] ✅ Success notifications added
- [x] ✅ Loading states added
- [ ] ⏳ User test 3 nút (đang đợi)

---

## 💡 EXPECTED BEHAVIOR:

### Nút XEM 👁️
- Mở `/news-detail/[slug]` trong tab mới
- Instant (không cần API call)

### Nút SỬA ✏️
1. Mở dialog với form
2. Điền thông tin mới
3. Click "Lưu"
4. Loading... (button disabled)
5. Success alert hiện
6. Dialog đóng
7. List tự động refresh
8. Thấy bài viết đã sửa

### Nút XÓA 🗑️
1. Click → Confirm dialog hiện
2. Click "Xóa"
3. Loading... (button disabled, text "Đang xóa...")
4. Success alert hiện
5. Dialog đóng
6. List tự động refresh
7. Bài viết biến mất

---

## 🔍 DEBUG COMMANDS:

### Test backend CRUD:
```bash
node test-crud-operations.mjs
```

### Check Supabase connection:
```bash
node test-ai-news-flow.mjs
```

### View logs in real-time:
```
F12 → Console tab → Refresh page → Click các nút
```

---

## 📞 NEXT STEPS:

1. ✅ **Refresh browser** (Ctrl+F5)
2. ✅ **Open Console** (F12)
3. ✅ **Test each button**
4. ✅ **Report console logs** nếu có lỗi

Hãy test lại và cho tôi biết:
- Console có log gì không?
- Alert có hiện không?
- Bài viết có thay đổi không?
