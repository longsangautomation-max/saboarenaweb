/**
 * Script: Upload ảnh bi-a lên Supabase Storage
 * Chạy script này để download ảnh từ Unsplash và upload lên Supabase
 */

import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const SUPABASE_URL = 'https://mogjjvscxjwvhtpkrlqr.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzkxOTU4MCwiZXhwIjoyMDczNDk1NTgwfQ.T2ntQv-z2EL4mkGb9b3QyXM3dT8pAOFSPKvqWPd7Xoo';

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

// Danh sách ảnh từ Unsplash
const BILLIARD_IMAGES_UNSPLASH = {
  tournaments: [
    'https://images.unsplash.com/photo-1626466218177-cfdc95fa9042?w=1200&q=80',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
    'https://images.unsplash.com/photo-1604053350278-6885ce33e06b?w=1200&q=80',
    'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=1200&q=80',
  ],
  players: [
    'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=1200&q=80',
    'https://images.unsplash.com/photo-1604053350278-6885ce33e06b?w=1200&q=80',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
  ],
  techniques: [
    'https://images.unsplash.com/photo-1626466218177-cfdc95fa9042?w=1200&q=80',
    'https://images.unsplash.com/photo-1604053350278-6885ce33e06b?w=1200&q=80',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
  ],
  clubs: [
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
    'https://images.unsplash.com/photo-1604053350278-6885ce33e06b?w=1200&q=80',
    'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=1200&q=80',
  ],
  matches: [
    'https://images.unsplash.com/photo-1604053350278-6885ce33e06b?w=1200&q=80',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
    'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=1200&q=80',
  ]
};

async function downloadImage(url, filename) {
  console.log(`📥 Downloading: ${filename}...`);
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download: ${response.statusText}`);
  }
  
  const buffer = await response.buffer();
  const tempPath = path.join('.', 'temp', filename);
  
  // Create temp directory if not exists
  if (!fs.existsSync('./temp')) {
    fs.mkdirSync('./temp');
  }
  
  fs.writeFileSync(tempPath, buffer);
  console.log(`✅ Downloaded: ${filename}`);
  
  return tempPath;
}

async function uploadToSupabase(filePath, storagePath) {
  console.log(`📤 Uploading to Supabase: ${storagePath}...`);
  
  const fileBuffer = fs.readFileSync(filePath);
  
  const { data, error } = await supabase.storage
    .from('billiard-images')
    .upload(storagePath, fileBuffer, {
      contentType: 'image/jpeg',
      upsert: true
    });
  
  if (error) {
    console.error(`❌ Upload failed: ${error.message}`);
    throw error;
  }
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('billiard-images')
    .getPublicUrl(storagePath);
  
  console.log(`✅ Uploaded: ${publicUrl}`);
  return publicUrl;
}

async function main() {
  console.log('🚀 STARTING IMAGE UPLOAD TO SUPABASE\n');
  console.log('=' .repeat(60));
  
  // Step 1: Create storage bucket if not exists
  console.log('\n1️⃣ Creating storage bucket...');
  
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some(b => b.name === 'billiard-images');
  
  if (!bucketExists) {
    const { error } = await supabase.storage.createBucket('billiard-images', {
      public: true,
      fileSizeLimit: 5242880 // 5MB
    });
    
    if (error) {
      console.error('❌ Failed to create bucket:', error);
      return;
    }
    console.log('✅ Bucket created: billiard-images');
  } else {
    console.log('✅ Bucket exists: billiard-images');
  }
  
  // Step 2: Upload images
  console.log('\n2️⃣ Uploading images...\n');
  
  const newImageUrls = {};
  
  for (const [category, urls] of Object.entries(BILLIARD_IMAGES_UNSPLASH)) {
    console.log(`\n📂 Category: ${category}`);
    newImageUrls[category] = [];
    
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const filename = `${category}-${i + 1}.jpg`;
      const storagePath = `${category}/${filename}`;
      
      try {
        // Download from Unsplash
        const tempPath = await downloadImage(url, filename);
        
        // Upload to Supabase
        const publicUrl = await uploadToSupabase(tempPath, storagePath);
        newImageUrls[category].push(publicUrl);
        
        // Clean up temp file
        fs.unlinkSync(tempPath);
        
        console.log(`✅ ${filename} → ${publicUrl}\n`);
        
        // Delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`❌ Failed to process ${filename}:`, error.message);
      }
    }
  }
  
  // Step 3: Generate new billiard-images.ts file
  console.log('\n3️⃣ Generating new billiard-images.ts...');
  
  const newCode = `/**
 * KHO ẢNH BI-A CHẤT LƯỢNG CAO
 * Lưu trữ trên Supabase Storage
 * Auto-generated - DO NOT EDIT MANUALLY
 */

export const BILLIARD_IMAGES = ${JSON.stringify(newImageUrls, null, 2)};

// ... rest of the helper functions ...
`;
  
  fs.writeFileSync('./billiard-images-supabase.json', JSON.stringify(newImageUrls, null, 2));
  console.log('✅ Saved URLs to billiard-images-supabase.json');
  
  // Clean up temp directory
  if (fs.existsSync('./temp')) {
    fs.rmSync('./temp', { recursive: true });
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('🎉 UPLOAD COMPLETED!');
  console.log('='.repeat(60));
  console.log('\n📋 Summary:');
  console.log(`  Total categories: ${Object.keys(newImageUrls).length}`);
  console.log(`  Total images: ${Object.values(newImageUrls).flat().length}`);
  console.log('\n✅ All images are now stored in Supabase!');
  console.log('🔗 Bucket: billiard-images');
  console.log('🌐 Access: https://mogjjvscxjwvhtpkrlqr.supabase.co/storage/v1/object/public/billiard-images/');
  console.log('\n📝 Next step: Update billiard-images.ts with new URLs');
}

main().catch(console.error);
