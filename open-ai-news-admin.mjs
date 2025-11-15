#!/usr/bin/env node

/**
 * ====================================
 * 📝 OPEN AI NEWS ADMIN WITH PRE-FILLED DATA
 * ====================================
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read blog content
const blogContent = readFileSync(join(__dirname, 'BLOG_POST_1_GIOITHIEU_SABO_ARENA.md'), 'utf-8');

// Extract title and content
const lines = blogContent.split('\n');
const title = lines[0].replace(/^#\s*/, '').trim();
const content = lines.slice(2).join('\n').trim();

// Create URL with query params
const params = new URLSearchParams({
  title: title,
  title_en: 'SABO ARENA: Vietnam\'s #1 Billiards Tournament Platform - 12-Tier ELO System & 8 Tournament Formats',
  slug: 'sabo-arena-nen-tang-thi-dau-bida-1-viet-nam',
  excerpt: 'Khám phá SABO ARENA - nền tảng thi đấu bi-a #1 Việt Nam với hệ thống xếp hạng ELO 12 cấp độ, 8 định dạng giải đấu chuyên nghiệp.',
  category: 'guide',
  featured: 'true'
});

const url = `https://saboarena.com/ai-news-admin?${params.toString()}`;

console.log('🚀 OPENING AI NEWS ADMIN\n');
console.log('📋 Pre-filled data:');
console.log(`   Title: ${title}`);
console.log(`   Slug: sabo-arena-nen-tang-thi-dau-bida-1-viet-nam`);
console.log(`   Category: guide`);
console.log(`   Featured: Yes`);
console.log(`   Content length: ${content.length} characters\n`);

console.log('⚠️  MANUAL STEPS REQUIRED:\n');
console.log('1. Browser will open AI News Admin');
console.log('2. Fill in the form:');
console.log('   - Title: (pre-filled)');
console.log('   - Slug: (pre-filled)');
console.log('   - Excerpt: (pre-filled)');
console.log('   - Category: guide');
console.log('   - Content: Copy from BLOG_POST_1_GIOITHIEU_SABO_ARENA.md');
console.log('   - Cover Image: https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200');
console.log('   - Featured: ✓ Yes');
console.log('   - Status: Published\n');
console.log('3. Click "Save Article"\n');

console.log('💡 TIP: Content is too long for URL params, you need to copy-paste from the file.\n');
console.log('Opening browser...\n');

// Open browser (cross-platform)
import { exec } from 'node:child_process';
const openCommand = process.platform === 'win32' ? 'start' : 
                    process.platform === 'darwin' ? 'open' : 'xdg-open';

exec(`${openCommand} "https://saboarena.com/ai-news-admin"`, (error) => {
  if (error) {
    console.error('❌ Error opening browser:', error.message);
    console.log('\n📍 Please manually open: https://saboarena.com/ai-news-admin\n');
  } else {
    console.log('✅ Browser opened!\n');
  }
});

// Print content for easy copy-paste
console.log('═══════════════════════════════════════════════════════════');
console.log('📝 CONTENT TO COPY-PASTE (below):');
console.log('═══════════════════════════════════════════════════════════\n');
console.log(content);
console.log('\n═══════════════════════════════════════════════════════════');
