import { supabaseAdmin } from './supabase-admin';

/**
 * Upload image to Supabase Storage
 * @param file - File object from input
 * @param folder - Folder name in storage (default: 'news-images')
 * @returns Public URL of uploaded image
 */
export async function uploadImage(file: File, folder: string = 'news-images'): Promise<{
  success: boolean;
  url?: string;
  error?: string;
}> {
  try {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return {
        success: false,
        error: 'Chỉ chấp nhận file ảnh (JPG, PNG, WEBP, GIF)'
      };
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return {
        success: false,
        error: 'Ảnh không được vượt quá 5MB'
      };
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const ext = file.name.split('.').pop();
    const fileName = `${timestamp}-${randomStr}.${ext}`;
    const filePath = `${folder}/${fileName}`;

    console.log('📤 Uploading image:', fileName);

    // Upload to Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from('billiard-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('❌ Upload error:', error);
      return {
        success: false,
        error: `Lỗi upload: ${error.message}`
      };
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from('billiard-images')
      .getPublicUrl(filePath);

    console.log('✅ Upload successful:', urlData.publicUrl);

    // Save to database
    const { error: dbError } = await supabaseAdmin
      .from('uploaded_images')
      .insert({
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        storage_path: filePath,
        public_url: urlData.publicUrl,
        folder: folder
      });

    if (dbError) {
      console.warn('⚠️ Image uploaded but failed to save to DB:', dbError);
      // Don't fail the whole operation, image is already uploaded
    } else {
      console.log('✅ Saved to database');
    }

    return {
      success: true,
      url: urlData.publicUrl
    };

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('❌ Upload failed:', err);
    return {
      success: false,
      error: errorMessage
    };
  }
}

/**
 * Delete image from Supabase Storage
 * @param url - Public URL of the image
 */
export async function deleteImage(url: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // Extract file path from URL
    // Example: https://xxx.supabase.co/storage/v1/object/public/billiard-images/news-images/123.jpg
    const urlParts = url.split('/billiard-images/');
    if (urlParts.length < 2) {
      return {
        success: false,
        error: 'Invalid URL format'
      };
    }

    const filePath = urlParts[1];
    console.log('🗑️ Deleting image:', filePath);

    const { error } = await supabaseAdmin.storage
      .from('billiard-images')
      .remove([filePath]);

    if (error) {
      console.error('❌ Delete error:', error);
      return {
        success: false,
        error: error.message
      };
    }

    console.log('✅ Image deleted');
    return { success: true };

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return {
      success: false,
      error: errorMessage
    };
  }
}
