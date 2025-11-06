-- Create news table
CREATE TABLE IF NOT EXISTS public.news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    title_en TEXT,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    excerpt_en TEXT,
    content TEXT NOT NULL,
    content_en TEXT,
    category TEXT NOT NULL,
    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    cover_image_url TEXT,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    views INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_news_slug ON public.news(slug);
CREATE INDEX IF NOT EXISTS idx_news_status ON public.news(status);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON public.news(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_category ON public.news(category);
CREATE INDEX IF NOT EXISTS idx_news_is_featured ON public.news(is_featured);

-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_news_updated_at ON public.news;
CREATE TRIGGER update_news_updated_at
    BEFORE UPDATE ON public.news
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to increment views
CREATE OR REPLACE FUNCTION increment_news_views(news_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.news
    SET views = views + 1
    WHERE id = news_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable Row Level Security
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can view published news
CREATE POLICY "Public news are viewable by everyone"
    ON public.news FOR SELECT
    USING (status = 'published');

-- Policy: Authenticated users can insert news
CREATE POLICY "Authenticated users can insert news"
    ON public.news FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Policy: Users can update their own news
CREATE POLICY "Users can update their own news"
    ON public.news FOR UPDATE
    TO authenticated
    USING (auth.uid() = author_id);

-- Policy: Users can delete their own news
CREATE POLICY "Users can delete their own news"
    ON public.news FOR DELETE
    TO authenticated
    USING (auth.uid() = author_id);

-- Insert sample data
INSERT INTO public.news (title, title_en, slug, excerpt, excerpt_en, content, content_en, category, cover_image_url, is_featured)
VALUES 
(
    'Giải Vô Địch Quốc Gia 2024 Khởi Động',
    'National Championship 2024 Kicks Off',
    'giai-vo-dich-quoc-gia-2024-khoi-dong',
    'Giải đấu lớn nhất năm với tổng giải thưởng 500 triệu đồng sẽ diễn ra vào tháng 12 tới. Đây là cơ hội để các cơ thủ hàng đầu Việt Nam tranh tài và khẳng định tên tuổi.',
    'The biggest tournament of the year with a total prize pool of 500 million VND will take place in December. This is an opportunity for top Vietnamese players to compete and assert their names.',
    '# Giải Vô Địch Quốc Gia 2024 Khởi Động\n\nGiải đấu bi-a lớn nhất năm 2024 đang đến gần với tổng giải thưởng lên đến 500 triệu đồng. Đây không chỉ là sân chơi để các cơ thủ thể hiện tài năng mà còn là cơ hội khẳng định vị thế trong làng bi-a Việt Nam.\n\n## Thông tin chi tiết\n\n- **Thời gian**: Tháng 12/2024\n- **Địa điểm**: TP. Hồ Chí Minh\n- **Giải thưởng**: 500,000,000 VNĐ\n- **Số lượng cơ thủ**: 64 người\n\n## Điều kiện tham gia\n\nĐể được tham gia giải đấu, cơ thủ cần:\n1. Có ELO rating từ 1500 trở lên\n2. Đã tham gia ít nhất 3 giải đấu chính thức\n3. Nộp phí tham gia: 2,000,000 VNĐ\n\nHãy đăng ký ngay để không bỏ lỡ cơ hội tranh tài cùng những tay cơ hàng đầu!',
    '# National Championship 2024 Kicks Off\n\nThe biggest billiards tournament of 2024 is approaching with a total prize pool of up to 500 million VND. This is not only a platform for players to showcase their talents but also an opportunity to assert their position in Vietnamese billiards.\n\n## Details\n\n- **Time**: December 2024\n- **Location**: Ho Chi Minh City\n- **Prize**: 500,000,000 VND\n- **Number of players**: 64 people\n\n## Registration requirements\n\nTo participate in the tournament, players need:\n1. Have an ELO rating of 1500 or higher\n2. Have participated in at least 3 official tournaments\n3. Pay entry fee: 2,000,000 VND\n\nRegister now to not miss the opportunity to compete with top players!',
    'tournament',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop',
    true
),
(
    'Top 10 Cơ Thủ Xuất Sắc Nhất Tháng 10',
    'Top 10 Best Players of October',
    'top-10-co-thu-xuat-sac-nhat-thang-10',
    'Danh sách những cơ thủ có thành tích ấn tượng nhất trong tháng vừa qua với các chiến thắng ngoạn mục và kỹ thuật điêu luyện.',
    'List of players with the most impressive performances last month with spectacular victories and skillful techniques.',
    '# Top 10 Cơ Thủ Xuất Sắc Nhất Tháng 10\n\nTháng 10 vừa qua đã chứng kiến nhiều trận đấu gay cấn và xuất hiện nhiều gương mặt tài năng. Dưới đây là danh sách 10 cơ thủ xuất sắc nhất:\n\n## Bảng xếp hạng\n\n1. **Nguyễn Văn A** - 15 trận thắng, 2 trận thua\n2. **Trần Văn B** - 14 trận thắng, 3 trận thua\n3. **Lê Văn C** - 13 trận thắng, 2 trận thua\n4. **Phạm Văn D** - 12 trận thắng, 4 trận thua\n5. **Hoàng Văn E** - 11 trận thắng, 3 trận thua\n\nVà còn nhiều tên tuổi khác đang dần khẳng định mình trong làng bi-a.',
    '# Top 10 Best Players of October\n\nLast October witnessed many intense matches and the emergence of many talented faces. Here is the list of the top 10 best players:\n\n## Rankings\n\n1. **Nguyen Van A** - 15 wins, 2 losses\n2. **Tran Van B** - 14 wins, 3 losses\n3. **Le Van C** - 13 wins, 2 losses\n4. **Pham Van D** - 12 wins, 4 losses\n5. **Hoang Van E** - 11 wins, 3 losses\n\nAnd many other names are gradually asserting themselves in billiards.',
    'players',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop',
    true
),
(
    'Kỹ Thuật Đánh Bi-a Hiệu Quả Cho Người Mới',
    'Effective Billiards Techniques for Beginners',
    'ky-thuat-danh-bi-a-hieu-qua-cho-nguoi-moi',
    'Hướng dẫn chi tiết các kỹ thuật cơ bản giúp bạn cải thiện kỹ năng chơi bi-a từ những bước đầu tiên.',
    'Detailed guide to basic techniques to help you improve your billiards skills from the first steps.',
    '# Kỹ Thuật Đánh Bi-a Hiệu Quả Cho Người Mới\n\n## 1. Tư thế đứng\n\nTư thế đứng đúng là nền tảng quan trọng:\n- Chân trước hơi gập, chân sau thẳng\n- Vai thư giãn, không căng cứng\n- Đầu thẳng hàng với cơ\n\n## 2. Cách cầm cơ\n\n- Nắm nhẹ nhàng, không siết chặt\n- Ngón cái và ngón trỏ tạo thành vòng tròn\n- Cơ luôn ở tư thế thẳng\n\n## 3. Kỹ thuật ngắm\n\n- Tập trung vào bi mục tiêu\n- Tưởng tượng đường đi của bi\n- Luyện tập nhiều lần để quen tay\n\nHãy kiên trì luyện tập để cải thiện kỹ năng!',
    '# Effective Billiards Techniques for Beginners\n\n## 1. Standing posture\n\nProper standing posture is an important foundation:\n- Front leg slightly bent, back leg straight\n- Relaxed shoulders, not tense\n- Head aligned with cue\n\n## 2. How to hold the cue\n\n- Hold gently, do not grip tightly\n- Thumb and index finger form a circle\n- Cue always in straight position\n\n## 3. Aiming technique\n\n- Focus on the target ball\n- Imagine the path of the ball\n- Practice many times to get used to it\n\nBe persistent in practicing to improve your skills!',
    'guide',
    'https://images.unsplash.com/photo-1626315869436-2b2f73becf83?w=800&auto=format&fit=crop',
    false
);

-- Grant permissions
GRANT SELECT ON public.news TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.news TO authenticated;
