import { useState, useEffect } from 'react';
import { supabaseAdmin } from '@/lib/supabase-admin';

export interface UploadedImage {
  id: string;
  file_name: string;
  file_size: number;
  file_type: string;
  storage_path: string;
  public_url: string;
  folder: string;
  created_at: string;
}

export function useUploadedImages() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('📥 Fetching uploaded images...');

      const { data, error: fetchError } = await supabaseAdmin
        .from('uploaded_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      console.log(`✅ Fetched ${data?.length || 0} images`);
      setImages(data || []);

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error fetching images:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (id: string, publicUrl: string) => {
    setLoading(true);
    setError(null);

    try {
      console.log('🗑️ Deleting image:', id);

      // Delete from storage first
      const urlParts = publicUrl.split('/billiard-images/');
      if (urlParts.length >= 2) {
        const filePath = urlParts[1];
        const { error: storageError } = await supabaseAdmin.storage
          .from('billiard-images')
          .remove([filePath]);

        if (storageError) {
          console.warn('⚠️ Storage delete warning:', storageError);
        }
      }

      // Delete from database using RPC function
      const { error: dbError } = await supabaseAdmin
        .rpc('delete_uploaded_image', { image_id: id });

      if (dbError) throw dbError;

      console.log('✅ Image deleted');

      // Refresh list
      await fetchImages();

      return { success: true };

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error deleting image:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Load images on mount
  useEffect(() => {
    fetchImages();
  }, []);

  return {
    images,
    loading,
    error,
    fetchImages,
    deleteImage
  };
}
