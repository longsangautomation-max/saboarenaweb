/**
 * AI News Generator - Tự động tạo tin tức từ database events
 * Sử dụng OpenAI GPT-4 để viết bài chi tiết
 */

import OpenAI from 'openai';
import { supabaseAdmin } from './supabase-admin';
import { getCoverImageForNews, getCategoryImages } from './billiard-images';

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Chỉ dùng cho demo, production nên dùng server-side
});

/**
 * Tự động chèn 2-4 ảnh vào content
 */
function insertImagesIntoContent(content: string, category: string): string {
  // Lấy danh sách ảnh theo category
  const images = getCategoryImages(category);
  
  // Random chọn 2-4 ảnh
  const numImages = Math.floor(Math.random() * 3) + 2; // 2-4 ảnh
  const selectedImages: string[] = [];
  
  for (let i = 0; i < numImages && i < images.length; i++) {
    const randomIndex = Math.floor(Math.random() * images.length);
    if (!selectedImages.includes(images[randomIndex])) {
      selectedImages.push(images[randomIndex]);
    }
  }
  
  // Tách content thành các đoạn
  const paragraphs = content.split('\n\n');
  
  // Tính vị trí chèn ảnh (phân bố đều)
  const insertPositions: number[] = [];
  const gap = Math.floor(paragraphs.length / (numImages + 1));
  
  for (let i = 1; i <= numImages; i++) {
    insertPositions.push(gap * i);
  }
  
  // Chèn ảnh vào các vị trí
  let newContent = '';
  let imageIndex = 0;
  
  for (let i = 0; i < paragraphs.length; i++) {
    newContent += paragraphs[i] + '\n\n';
    
    // Nếu đến vị trí cần chèn ảnh
    if (insertPositions.includes(i) && imageIndex < selectedImages.length) {
      newContent += `![Ảnh bi-a ${imageIndex + 1}](${selectedImages[imageIndex]})\n\n`;
      imageIndex++;
    }
  }
  
  return newContent.trim();
}

// Danh sách persona để AI nhập vai viết bài
const WRITING_PERSONAS = [
  {
    name: 'Chị Hương - Quản lý trẻ',
    style: 'Hài hước, dí dỏm, gần gũi, có bình luận cá nhân',
    tone: 'Như một người chị đang kể chuyện cho em nghe',
    signature: '*(Chị Hương - Quản lý SABO Arena)*'
  },
  {
    name: 'Anh Tuấn - Chuyên gia bi-a',
    style: 'Chuyên nghiệp, phân tích sâu, dùng thuật ngữ kỹ thuật',
    tone: 'Như một HLV đang chia sẻ kinh nghiệm',
    signature: '*(Anh Tuấn - Chuyên gia bi-a 15 năm kinh nghiệm)*'
  },
  {
    name: 'MC Minh Anh',
    style: 'Sôi động, nhiệt tình, tạo không khí phấn khích',
    tone: 'Như một MC đang dẫn chương trình trực tiếp',
    signature: '*(MC Minh Anh - Dẫn chương trình SABO Arena)*'
  },
  {
    name: 'Em Linh - Nhà báo trẻ',
    style: 'Tò mò, đặt câu hỏi, khám phá góc nhìn mới',
    tone: 'Như một phóng viên đang viết reportage',
    signature: '*(Em Linh - Phóng viên thể thao)*'
  }
];

// Random chọn persona
function getRandomPersona() {
  return WRITING_PERSONAS[Math.floor(Math.random() * WRITING_PERSONAS.length)];
}

// News Templates
export const NEWS_TEMPLATES = {
  TOURNAMENT_COMPLETED: {
    category: 'tournament',
    priority: 'high',
    prompt: `Bạn đang nhập vai: {persona_name} - {persona_style}

Viết bài tin tức về giải đấu bi-a vừa kết thúc với thông tin sau:
- Tên giải: {tournament_name}
- Người vô địch: {winner_name}
- Tổng số người chơi: {total_players}
- Giải thưởng: {prize_pool}
- Thời gian: {date_range}

Yêu cầu viết bài:
- Tone: {persona_tone}
- Phong cách: {persona_style}
- Độ dài: 500-700 từ
- Bao gồm:
  + Mở bài hấp dẫn theo phong cách của bạn
  + 2-3 bình luận cá nhân, cảm nhận của bạn về giải đấu
  + Kể 1-2 tình huống thú vị trong trận chung kết
  + Quotes giả định từ cơ thủ/BTC (nếu phù hợp)
- Format: 
  + Markdown với headers (##, ###)
  + Lists, blockquotes khi cần
  + Emoji phù hợp (1-3 emoji)
- Kết thúc bằng: {persona_signature}
- Ngôn ngữ: Tiếng Việt
- KHÔNG cần đánh dấu vị trí ảnh, hệ thống tự động chèn`
  },

  UPCOMING_HIGH_PRIZE: {
    category: 'tournament',
    priority: 'high',
    prompt: `Bạn đang nhập vai: {persona_name} - {persona_style}

Viết bài tin tức quảng bá giải đấu bi-a sắp diễn ra:
- Tên giải: {tournament_name}
- Giải thưởng: {prize_pool} (cao nhất từ trước đến nay)
- Ngày bắt đầu: {start_date}
- Địa điểm: {venue}
- Số lượng tối đa: {max_participants}

Yêu cầu viết bài:
- Tone: {persona_tone} + Hào hứng, kêu gọi hành động
- Phong cách: {persona_style}
- Độ dài: 400-600 từ
- Bao gồm:
  + Hook mạnh mẽ (bắt đầu bằng câu hỏi hoặc con số ấn tượng)
  + Nhấn mạnh giải thưởng kỷ lục
  + Bình luận cá nhân về tầm quan trọng của giải
  + Kêu gọi đăng ký tham gia (CTA rõ ràng)
- Format: Markdown với emoji
- Kết thúc bằng: {persona_signature}
- Ngôn ngữ: Tiếng Việt
- KHÔNG cần đánh dấu vị trí ảnh`
  },

  NEW_CHAMPION: {
    category: 'players',
    priority: 'high',
    prompt: `Viết bài chúc mừng cơ thủ mới vô địch:
- Tên cơ thủ: {player_name}
- Giải đấu: {tournament_name}
- Thành tích: {achievement}
- Điểm SPA: {spa_points}
- Ranking mới: {new_rank}

Yêu cầu:
- Tone: Chúc mừng, tôn vinh
- Nhấn mạnh hành trình chiến thắng
- 350-500 từ
- Format: Markdown
- Ngôn ngữ: Tiếng Việt`
  },

  RANKING_SHAKE_UP: {
    category: 'players',
    priority: 'medium',
    prompt: `Viết bài về thay đổi bảng xếp hạng tuần này:
- Top 5 mới: {top_5_players}
- Người tăng hạng nhanh nhất: {biggest_mover}
- Thay đổi điểm SPA: {spa_changes}

Yêu cầu:
- Tone: Phân tích, chuyên môn
- Bảng xếp hạng dạng list
- 300-400 từ
- Format: Markdown với table
- Ngôn ngữ: Tiếng Việt`
  },

  MATCH_HIGHLIGHT: {
    category: 'tournament',
    priority: 'medium',
    prompt: `Viết bài về trận đấu hay nhất tuần:
- Cơ thủ 1: {player1_name} ({player1_score} điểm)
- Cơ thủ 2: {player2_name} ({player2_score} điểm)
- Giải đấu: {tournament_name}
- Highlights: {match_highlights}

Yêu cầu:
- Tone: Kịch tính, hấp dẫn
- Mô tả diễn biến trận đấu
- 350-500 từ
- Format: Markdown
- Ngôn ngữ: Tiếng Việt`
  },

  WEEKLY_STATS: {
    category: 'players',
    priority: 'low',
    prompt: `Viết bài thống kê tuần này:
- Tổng số trận: {total_matches}
- Cơ thủ thi đấu nhiều nhất: {most_active}
- Tỷ lệ thắng cao nhất: {highest_winrate}
- Câu lạc bộ hoạt động nhất: {most_active_club}

Yêu cầu:
- Tone: Thông tin, dễ đọc
- Nhiều số liệu
- 250-350 từ
- Format: Markdown với lists
- Ngôn ngữ: Tiếng Việt`
  }
};

interface NewsGenerationParams {
  template: keyof typeof NEWS_TEMPLATES;
  data: Record<string, any>;
  generateEnglish?: boolean;
}

interface GeneratedNews {
  title: string;
  title_en?: string;
  slug: string;
  excerpt: string;
  excerpt_en?: string;
  content: string;
  content_en?: string;
  category: string;
  cover_image_url: string;
  is_featured: boolean;
}

/**
 * Tạo prompt từ template và data
 */
function buildPrompt(template: string, data: Record<string, any>): string {
  let prompt = template;
  
  // Chọn persona ngẫu nhiên
  const persona = getRandomPersona();
  
  // Thêm persona vào data
  const enrichedData = {
    ...data,
    persona_name: persona.name,
    persona_style: persona.style,
    persona_tone: persona.tone,
    persona_signature: persona.signature
  };
  
  for (const [key, value] of Object.entries(enrichedData)) {
    prompt = prompt.replace(new RegExp(`{${key}}`, 'g'), String(value));
  }
  
  return prompt;
}

/**
 * Tạo slug từ title
 */
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 100);
}

/**
 * Tạo excerpt từ content
 */
function extractExcerpt(content: string): string {
  // Lấy paragraph đầu tiên (bỏ headers)
  const lines = content.split('\n').filter(line => !line.startsWith('#'));
  const firstParagraph = lines.find(line => line.trim().length > 50);
  
  if (firstParagraph) {
    return firstParagraph.substring(0, 200) + '...';
  }
  
  return content.substring(0, 200) + '...';
}

/**
 * Chọn ảnh cover phù hợp với category
 */
function getCoverImage(category: string): string {
  return getCoverImageForNews(category);
}

/**
 * Tạo tin tức bằng AI
 */
export async function generateNews(params: NewsGenerationParams): Promise<GeneratedNews> {
  const { template, data, generateEnglish = false } = params;
  const templateConfig = NEWS_TEMPLATES[template];
  
  // Build Vietnamese content
  const viPrompt = buildPrompt(templateConfig.prompt, data);
  
  console.log('🤖 Generating Vietnamese content...');
  console.log('🎭 Persona:', viPrompt.match(/Bạn đang nhập vai: (.+?) -/)?.[1] || 'Random');
  
  const viCompletion = await openai.chat.completions.create({
    model: 'gpt-4o-mini', // Rẻ hơn nhiều so với gpt-4-turbo-preview
    messages: [
      {
        role: 'system',
        content: `Bạn là một người viết bài chuyên nghiệp, biết cách nhập vai và viết theo nhiều phong cách khác nhau. 
        Bạn viết bài về bi-a rất hấp dẫn, có cá tính riêng, biết khi nào nên hài hước, khi nào nên nghiêm túc.
        Bạn luôn thêm cảm xúc và quan điểm cá nhân vào bài viết để người đọc cảm thấy gần gũi.
        KHÔNG cần đánh dấu vị trí ảnh [IMAGE:...], hệ thống sẽ tự động chèn ảnh.`
      },
      {
        role: 'user',
        content: viPrompt
      }
    ],
    temperature: 0.9,
    max_tokens: 1800
  });
  
  const content = viCompletion.choices[0].message.content || '';
  
  // Tự động chèn 2-4 ảnh vào content
  const contentWithImages = insertImagesIntoContent(content, templateConfig.category);
  
  // Generate title
  const titleCompletion = await openai.chat.completions.create({
    model: 'gpt-4o-mini', // Dùng model rẻ cho task đơn giản
    messages: [
      {
        role: 'system',
        content: 'Tạo tiêu đề tin tức hấp dẫn, ngắn gọn (max 80 ký tự), có SEO tốt.'
      },
      {
        role: 'user',
        content: `Dựa vào nội dung sau, tạo tiêu đề:\n\n${content.substring(0, 500)}`
      }
    ],
    temperature: 0.9,
    max_tokens: 50
  });
  
  const title = titleCompletion.choices[0].message.content?.trim() || 'Tin Tức Mới';
  const slug = createSlug(title);
  const excerpt = extractExcerpt(content);
  
  let title_en, excerpt_en, content_en;
  
  // Generate English version if requested
  if (generateEnglish) {
    console.log('🤖 Generating English content...');
    
    const enCompletion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Dùng model rẻ cho translation
      messages: [
        {
          role: 'system',
          content: 'You are a professional translator. Translate Vietnamese billiards news to English, keeping the tone and structure.'
        },
        {
          role: 'user',
          content: `Translate this to English:\n\n${contentWithImages}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1800
    });
    
    content_en = enCompletion.choices[0].message.content || '';
    
    const titleEnCompletion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Create an engaging, concise news title (max 80 chars) with good SEO.'
        },
        {
          role: 'user',
          content: `Based on this content, create a title:\n\n${content_en.substring(0, 500)}`
        }
      ],
      temperature: 0.9,
      max_tokens: 50
    });
    
    title_en = titleEnCompletion.choices[0].message.content?.trim() || 'Latest News';
    excerpt_en = extractExcerpt(content_en);
  }
  
  return {
    title,
    title_en,
    slug,
    excerpt,
    excerpt_en,
    content: contentWithImages, // Content đã có ảnh
    content_en,
    category: templateConfig.category,
    cover_image_url: getCoverImage(templateConfig.category),
    is_featured: templateConfig.priority === 'high'
  };
}

/**
 * Lưu tin tức vào database
 */
export async function publishNews(news: GeneratedNews): Promise<string> {
  // Use admin client to bypass RLS
  const { data, error } = await supabaseAdmin
    .from('news')
    .insert({
      ...news,
      author_id: null, // AI-generated news have no author
      published_at: new Date().toISOString(),
      status: 'published',
      views: 0
    })
    .select('id')
    .single();
  
  if (error) {
    console.error('❌ Failed to publish news:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    throw error;
  }
  
  console.log('✅ News published successfully:', data.id);
  return data.id;
}

/**
 * Xóa tin tức cũ (giữ lại 100 bài mới nhất)
 */
export async function cleanupOldNews(): Promise<void> {
  const { data: oldNews } = await supabaseAdmin
    .from('news')
    .select('id')
    .order('published_at', { ascending: false })
    .range(100, 1000);
  
  if (oldNews && oldNews.length > 0) {
    const idsToDelete = oldNews.map(n => n.id);
    
    await supabaseAdmin
      .from('news')
      .delete()
      .in('id', idsToDelete);
    
    console.log(`🗑️ Cleaned up ${idsToDelete.length} old news articles`);
  }
}
