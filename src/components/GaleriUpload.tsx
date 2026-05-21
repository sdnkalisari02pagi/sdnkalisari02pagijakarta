import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { uploadFileToSupabase } from '@/lib/supabase';

interface GaleriUploadProps {
  value: string[];
  onChange: (items: string[]) => void;
}

export default function GaleriUpload({ value, onChange }: GaleriUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const processFiles = async (files: File[]) => {
    setIsUploading(true);
    let newUrls: string[] = [];

    for (const file of files) {
      if (file.size > 2 * 1024 * 1024) {
        toast({ title: 'Gagal', description: `File ${file.name} melebihi 2MB.`, variant: 'destructive' });
        continue;
      }
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        toast({ title: 'Gagal', description: `Format file ${file.name} tidak valid.`, variant: 'destructive' });
        continue;
      }

      try {
        const url = await uploadFileToSupabase(file);
        if (url) newUrls.push(url);
      } catch (e) {
        toast({ title: 'Error', description: `Gagal mengupload ${file.name}`, variant: 'destructive' });
      }
    }

    if (newUrls.length > 0) {
      onChange([...value, ...newUrls]);
    }
    setIsUploading(false);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) processFiles(files);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) processFiles(files);
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div
      className="space-y-2"
      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        multiple
        onChange={handleFile}
      />

      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {value.map((src, i) => (
            <div key={i} className="relative">
              <img
                src={src}
                alt={`Galeri ${i + 1}`}
                className="w-full h-20 object-cover rounded-lg border"
              />
              <button
                onClick={() => handleRemove(i)}
                className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5"
                disabled={isUploading}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {isUploading ? (
        <div className="w-full min-h-[5rem] rounded-lg border flex flex-col items-center justify-center gap-2 bg-muted/20">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <p className="text-xs text-muted-foreground">Mengupload...</p>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className={`w-full min-h-[5rem] rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
            dragOver
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/40 hover:border-primary/60'
          }`}
        >
          <Upload className="w-5 h-5 text-muted-foreground" />
          <p className="text-xs text-muted-foreground text-center">
            Seret foto ke sini atau klik untuk tambah
          </p>
        </div>
      )}

      <div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          className="gap-2"
          disabled={isUploading}
        >
          <Upload className="w-4 h-4" /> Tambah Foto Galeri
        </Button>

        <p className="text-xs text-muted-foreground">
          Maksimal 2MB per foto, format JPG/PNG
        </p>
      </div>
    </div>
  );
}

