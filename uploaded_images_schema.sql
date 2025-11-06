-- Create table to store uploaded images history
CREATE TABLE IF NOT EXISTS public.uploaded_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    file_name TEXT NOT NULL,
    file_size INTEGER NOT NULL, -- in bytes
    file_type TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    folder TEXT DEFAULT 'news-images',
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_uploaded_images_created_at ON public.uploaded_images(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_uploaded_images_folder ON public.uploaded_images(folder);
CREATE INDEX IF NOT EXISTS idx_uploaded_images_uploaded_by ON public.uploaded_images(uploaded_by);

-- Enable Row Level Security
ALTER TABLE public.uploaded_images ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can view images
CREATE POLICY "Anyone can view uploaded images"
    ON public.uploaded_images FOR SELECT
    USING (true);

-- Policy: Authenticated users can insert
CREATE POLICY "Authenticated users can upload images"
    ON public.uploaded_images FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Policy: Service role can do everything (for admin)
CREATE POLICY "Service role full access to images"
    ON public.uploaded_images FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Function to delete image record and file from storage
CREATE OR REPLACE FUNCTION delete_uploaded_image(image_id UUID)
RETURNS void AS $$
BEGIN
    DELETE FROM public.uploaded_images WHERE id = image_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION delete_uploaded_image(UUID) TO service_role;
GRANT EXECUTE ON FUNCTION delete_uploaded_image(UUID) TO authenticated;
