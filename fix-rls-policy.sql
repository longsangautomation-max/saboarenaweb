-- ============================================
-- FIX RLS POLICY FOR AI NEWS GENERATION
-- ============================================
-- Vấn đề: AI không thể insert news vì RLS policy quá strict
-- Giải pháp: Cho phép anon role insert (hoặc tạt service role)

-- Xóa policy cũ
DROP POLICY IF EXISTS "Authenticated users can insert news" ON public.news;

-- Tạo policy mới: Cho phép mọi người insert (bao gồm anon)
CREATE POLICY "Anyone can insert news" 
ON public.news 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Kiểm tra lại policies
SELECT 
    policyname, 
    cmd, 
    roles,
    with_check
FROM pg_policies 
WHERE tablename = 'news' AND cmd = 'INSERT';

-- ============================================
-- HOẶC GIỮ BẢO MẬT CAO HƠN:
-- Chỉ cho service_role insert (cần dùng service_role key)
-- ============================================
/*
DROP POLICY IF EXISTS "Authenticated users can insert news" ON public.news;

CREATE POLICY "Service role can insert news"
ON public.news
FOR INSERT
TO service_role
WITH CHECK (true);
*/
