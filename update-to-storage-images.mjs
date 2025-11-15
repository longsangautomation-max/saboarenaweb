#!/usr/bin/env node

/**
 * ====================================
 * 🔄 UPDATE TO USE SUPABASE STORAGE IMAGES
 * ====================================
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mogjjvscxjwvhtpkrlqr.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzkxOTU4MCwiZXhwIjoyMDczNDk1NTgwfQ.T2ntQv-z2EL4mkGb9b3QyXM3dT8pAOFSPKvqWPd7Xoo';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Use image from Supabase Storage (not Unsplash)
const SUPABASE_STORAGE_IMAGE = 'https://mogjjvscxjwvhtpkrlqr.supabase.co/storage/v1/object/public/billiard-images/tournaments/tournaments-2.jpg';

console.log('🔄 Updating blog post to use Supabase Storage image...\n');

async function updateToStorageImage() {
  try {
    // Update the blog post
    const { data, error } = await supabase
      .from('news')
      .update({ 
        cover_image_url: SUPABASE_STORAGE_IMAGE 
      })
      .eq('slug', 'sabo-arena-nen-tang-thi-dau-bida-1-viet-nam')
      .select();

    if (error) {
      console.error('❌ Error updating:', error.message);
      return;
    }

    if (data && data.length > 0) {
      console.log('✅ Updated successfully!\n');
      console.log('📝 Article:', data[0].title);
      console.log('🖼️  New image:', SUPABASE_STORAGE_IMAGE);
      console.log('\n💡 Source: Supabase Storage (self-hosted)');
      console.log('   Description: Billiard table with cue - Competition ready');
      console.log('   No external dependencies on Unsplash!\n');
    } else {
      console.log('⚠️  No articles found with that slug\n');
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

updateToStorageImage();
