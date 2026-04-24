import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  images: string[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  alt?: string;
}

export default function ImageLightbox({ images, index, onClose, onIndexChange, alt = 'Image' }: Props) {
  const open = index !== null && index >= 0 && images.length > 0;

  const prev = () => {
    if (index === null) return;
    onIndexChange((index - 1 + images.length) % images.length);
  };
  const next = () => {
    if (index === null) return;
    onIndexChange((index + 1) % images.length);
  };

  return (
    <Dialog open={open} onOpenChange={o => !o && onClose()}>
      <DialogContent className="max-w-5xl p-0 bg-black/95 border-none">
        {open && (
          <div className="relative">
            <img src={images[index!]} alt={`${alt} ${index! + 1}`} className="w-full max-h-[85vh] object-contain" />
            {images.length > 1 && (
              <>
                <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors" aria-label="Previous">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors" aria-label="Next">
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-medium">
                  {index! + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
