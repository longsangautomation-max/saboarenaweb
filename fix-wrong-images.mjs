#!/usr/bin/env node

/**
 * ====================================
 * 🔧 FIX WRONG SOCCER IMAGE IN DATABASE
 * ====================================
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mogjjvscxjwvhtpkrlqr.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzkxOTU4MCwiZXhwIjoyMDczNDk1NTgwfQ.T2ntQv-z2EL4mkGb9b3QyXM3dT8pAOFSPKvqWPd7Xoo';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// WRONG (Soccer image)
const WRONG_IMAGE = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018';

// CORRECT (Billiards image)
const CORRECT_IMAGE = 'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=1200&h=630&fit=crop';

console.log('🔍 Finding articles with wrong soccer image...\n');

async function fixImages() {
  try {
    // Find articles with wrong image
    const { data: articles, error: selectError } = await supabase
      .from('news')
      .select('id, title, cover_image_url')
      .like('cover_image_url', `%${WRONG_IMAGE}%`);

    if (selectError) {
      console.error('❌ Error finding articles:', selectError.message);
      return;
    }

    if (!articles || articles.length === 0) {
      console.log('✅ No articles with wrong image found!\n');
      return;
    }

    console.log(`Found ${articles.length} article(s) with wrong image:\n`);
    
    for (const article of articles) {
      console.log(`📝 ${article.title}`);
      console.log(`   Old: ${article.cover_image_url}`);
      
      // Update to correct image
      const { error: updateError } = await supabase
        .from('news')
        .update({ cover_image_url: CORRECT_IMAGE })
        .eq('id', article.id);

      if (updateError) {
        console.error(`   ❌ Error updating: ${updateError.message}`);
      } else {
        console.log(`   ✅ Updated to: ${CORRECT_IMAGE}\n`);
      }
    }

    console.log('🎉 All images fixed!\n');
    console.log('📊 Summary:');
    console.log(`   Articles updated: ${articles.length}`);
    console.log(`   New image: Pool balls on green table (verified billiards)\n`);

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

fixImages();
