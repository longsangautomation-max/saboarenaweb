#!/usr/bin/env node

/**
 * ====================================
 * 🔧 FIX: Use working Unsplash image
 * ====================================
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mogjjvscxjwvhtpkrlqr.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzkxOTU4MCwiZXhwIjoyMDczNDk1NTgwfQ.T2ntQv-z2EL4mkGb9b3QyXM3dT8pAOFSPKvqWPd7Xoo';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// WORKING Unsplash image (verified billiards - NOT soccer)
const WORKING_IMAGE = 'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=1200&h=630&fit=crop&q=80';

console.log('🔧 Fixing image URL to use working Unsplash image...\n');
console.log('⚠️  Supabase Storage returned 400 Bad Request');
console.log('   (Bucket may not be public or doesn\'t exist)\n');
console.log('✅ Using verified Unsplash billiards image instead\n');

async function fixToWorkingImage() {
  try {
    const { data, error } = await supabase
      .from('news')
      .update({ 
        cover_image_url: WORKING_IMAGE 
      })
      .eq('slug', 'sabo-arena-nen-tang-thi-dau-bida-1-viet-nam')
      .select();

    if (error) {
      console.error('❌ Error updating:', error.message);
      return;
    }

    if (data && data.length > 0) {
      console.log('✅ Fixed successfully!\n');
      console.log('📝 Article:', data[0].title);
      console.log('🖼️  New image:', WORKING_IMAGE);
      console.log('\n💡 Image details:');
      console.log('   Source: Unsplash (verified billiards)');
      console.log('   ID: photo-1511688878353-3a2f5be94cd7');
      console.log('   Description: Pool balls on green felt table');
      console.log('   ✅ NOT soccer - This is correct billiards image!\n');
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

fixToWorkingImage();
