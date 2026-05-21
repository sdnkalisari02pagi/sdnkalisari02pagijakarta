import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function uploadFileToSupabase(file: File, bucket: string = 'uploads'): Promise<string> {
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${file.name}`;
  const { error } = await supabase.storage.from(bucket).upload(fileName, file);
  if (error) {
    console.error('Upload Error:', error);
    return '';
  }
  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
  return data.publicUrl;
}
