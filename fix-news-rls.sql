-- Kiểm tra và Fix RLS Policies cho AI News Generation

-- 1. Kiểm tra các policies hiện tại
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'news';

-- 2. Drop policy cũ nếu quá strict
DROP POLICY IF EXISTS "Authenticated users can insert news" ON public.news;

-- 3. Tạo policy mới cho phép INSERT không cần auth (CHỈ CHO AI GENERATOR)
CREATE POLICY "AI can insert news"
    ON public.news 
    FOR INSERT
    TO public
    WITH CHECK (true);

-- HOẶC nếu muốn chỉ cho authenticated user:
-- CREATE POLICY "Authenticated users can insert news"
--     ON public.news 
--     FOR INSERT
--     TO authenticated
--     WITH CHECK (true);

-- 4. Kiểm tra lại policies
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'news';
