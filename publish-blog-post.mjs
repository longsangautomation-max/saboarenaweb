#!/usr/bin/env node

/**
 * ====================================
 * 📝 PUBLISH BLOG POST #1 TO DATABASE
 * ====================================
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Supabase credentials (using SERVICE_ROLE to bypass RLS)
const SUPABASE_URL = 'https://mogjjvscxjwvhtpkrlqr.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzkxOTU4MCwiZXhwIjoyMDczNDk1NTgwfQ.T2ntQv-z2EL4mkGb9b3QyXM3dT8pAOFSPKvqWPd7Xoo';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Read blog content
const blogContent = readFileSync(join(__dirname, 'BLOG_POST_1_GIOITHIEU_SABO_ARENA.md'), 'utf-8');

// Extract title and content (remove title from content)
const lines = blogContent.split('\n');
const title = lines[0].replace(/^#\s*/, '').trim();
const content = lines.slice(2).join('\n').trim();

const article = {
  title: title,
  title_en: 'SABO ARENA: Vietnam\'s #1 Billiards Tournament Platform - 12-Tier ELO System & 8 Tournament Formats',
  slug: 'sabo-arena-nen-tang-thi-dau-bida-1-viet-nam',
  content: content,
  content_en: 'Coming soon...', // Will translate later
  excerpt: 'Khám phá SABO ARENA - nền tảng thi đấu bi-a #1 Việt Nam với hệ thống xếp hạng ELO 12 cấp độ, 8 định dạng giải đấu chuyên nghiệp, và công nghệ quản lý tournament hiện đại.',
  excerpt_en: 'Discover SABO ARENA - Vietnam\'s #1 billiards tournament platform with 12-tier ELO ranking system, 8 professional tournament formats, and modern tournament management technology.',
  category: 'guide',
  cover_image_url: 'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=1200&h=630&fit=crop&q=80', // Verified billiards: Pool balls on green felt table
  status: 'published',
  is_featured: true,
  published_at: new Date().toISOString()
};

console.log('📝 PUBLISHING BLOG POST #1 TO DATABASE\n');
console.log(`Title: ${article.title}`);
console.log(`Slug: ${article.slug}`);
console.log(`Category: ${article.category}`);
console.log(`Featured: ${article.is_featured}`);
console.log(`Content length: ${article.content.length} characters\n`);

async function publishArticle() {
  try {
    // Insert article
    const { data, error } = await supabase
      .from('news')
      .insert([article])
      .select();

    if (error) {
      console.error('❌ Error inserting article:', error.message);
      console.error('Details:', error);
      
      // Try to get more info about the table
      console.log('\n🔍 Checking table structure...');
      const { data: sample, error: sampleError } = await supabase
        .from('news')
        .select('*')
        .limit(1);
      
      if (sampleError) {
        console.error('Table check error:', sampleError.message);
      } else {
        console.log('Table exists. Sample columns:', sample.length > 0 ? Object.keys(sample[0]) : 'Empty table');
      }
      
      return false;
    }

    console.log('✅ Article published successfully!\n');
    console.log('📊 Article ID:', data[0].id);
    console.log('🔗 URL: https://saboarena.com/news/' + article.slug);
    console.log('\n📝 Next steps:');
    console.log('1. Verify: Visit the URL above');
    console.log('2. Index: node index-sabo-pages.mjs index-url https://saboarena.com/news/' + article.slug);
    console.log('3. Regenerate sitemap: node generate-sitemap.mjs');
    console.log('4. Check: node index-sabo-pages.mjs status\n');
    
    return true;
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    return false;
  }
}

publishArticle().catch(console.error);
