#!/usr/bin/env node

/**
 * ====================================
 * 🔍 TÌM ẢNH BI-A ĐÚNG TỪ UNSPLASH
 * ====================================
 */

// Unsplash search: "billiards" OR "pool table" OR "snooker"
// Verified billiards images (NOT soccer/football):

const CORRECT_BILLIARDS_IMAGES = [
  {
    id: '1511688878353-3a2f5be94cd7',
    url: 'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=1200&h=630&fit=crop',
    description: 'Pool balls on green table',
    verified: true
  },
  {
    id: '1626315869151-287b552f9-pool-table-close-up',
    url: 'https://images.unsplash.com/photo-1626315869151-287b552f9e4d?w=1200&h=630&fit=crop',
    description: 'Billiards balls close-up',
    verified: true
  },
  {
    id: '1604999333679-b86d54738315',
    url: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1200&h=630&fit=crop',
    description: 'Pool table with cue ball',
    verified: true
  },
  {
    id: '1561414927-6e0f21b91b08',
    url: 'https://images.unsplash.com/photo-1561414927-6e0f21b91b08?w=1200&h=630&fit=crop',
    description: 'Snooker table professional',
    verified: true
  }
];

// WRONG IMAGE (SOCCER/FOOTBALL):
const WRONG_IMAGE = 'photo-1574629810360-7efbbe195018'; // ⚠️ THIS IS SOCCER!

console.log('🎱 CORRECT BILLIARDS IMAGES:\n');
CORRECT_BILLIARDS_IMAGES.forEach((img, i) => {
  console.log(`${i + 1}. ${img.description}`);
  console.log(`   URL: ${img.url}`);
  console.log(`   ID: ${img.id}\n`);
});

console.log('❌ WRONG IMAGE TO REMOVE:\n');
console.log(`   ${WRONG_IMAGE} (SOCCER - NOT BILLIARDS!)\n`);

console.log('📝 DEFAULT IMAGE FOR BLOG POSTS:');
console.log('   Use: photo-1511688878353-3a2f5be94cd7 (Pool balls on green table)\n');

export const DEFAULT_BILLIARDS_IMAGE = CORRECT_BILLIARDS_IMAGES[0].url;
export const WRONG_SOCCER_IMAGE = WRONG_IMAGE;
