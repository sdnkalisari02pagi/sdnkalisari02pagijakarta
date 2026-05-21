import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { uploadFileToSupabase } from '@/lib/supabase';

interface ImageUploadProps {
  value: string; // URL / preview
  onChange: (url: string) => void;
  required?: boolean;
  recommendedSize?: string;
}

export default function ImageUpload({ value, onChange, required, recommendedSize }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const processFile = async (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: 'Gagal', description: 'Ukuran file maksimal 2MB.', variant: 'destructive' });
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast({ title: 'Gagal', description: 'Format file harus JPG, PNG, atau WebP.', variant: 'destructive' });
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadFileToSupabase(file);
      if (url) {
        onChange(url);
      } else {
        toast({ title: 'Gagal', description: 'Gagal mengupload gambar', variant: 'destructive' });
      }
    } catch (e) {
      toast({ title: 'Error', description: 'Terjadi kesalahan saat upload', variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const isMissing = required && !value;

  return (
    <div
      className="space-y-2"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFile}
      />

      {isUploading ? (
        <div className="w-full min-h-[8rem] rounded-lg border flex flex-col items-center justify-center gap-2 bg-muted/20">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Mengupload...</p>
        </div>
      ) : value ? (
        <div className="relative inline-block">
          <img src={value} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className={`w-full min-h-[8rem] rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer ${
            dragOver
              ? 'border-primary bg-primary/5'
              : isMissing
              ? 'border-destructive'
              : 'border-muted-foreground/40 hover:border-primary/60'
          }`}
        >
          <Upload className="w-6 h-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Klik atau drag foto</p>
        </div>
      )}

      <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()} disabled={isUploading}>
        Upload
      </Button>

      <p className="text-xs text-muted-foreground">
        Maks 2MB · JPG/PNG/WebP {recommendedSize && `· ${recommendedSize}`}
      </p>
    </div>
  );
}

