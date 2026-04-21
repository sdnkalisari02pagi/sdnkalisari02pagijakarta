import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

export type DocType = 'pdf' | 'image' | 'office' | 'unknown';

export function detectDocType(url: string): DocType {
  if (!url) return 'unknown';
  const lower = url.toLowerCase();
  // data URL
  if (lower.startsWith('data:')) {
    if (lower.startsWith('data:application/pdf')) return 'pdf';
    if (lower.startsWith('data:image/')) return 'image';
    if (lower.includes('msword') || lower.includes('officedocument') || lower.includes('ms-excel')) return 'office';
    return 'unknown';
  }
  // by extension
  if (/\.pdf(\?|#|$)/i.test(lower)) return 'pdf';
  if (/\.(jpe?g|png|webp|gif|bmp)(\?|#|$)/i.test(lower)) return 'image';
  if (/\.(docx?|xlsx?|pptx?)(\?|#|$)/i.test(lower)) return 'office';
  return 'unknown';
}

interface Props {
  open: boolean;
  onClose: () => void;
  url: string;
  title: string;
  onDownload: () => void;
}

export default function DocumentPreview({ open, onClose, url, title, onDownload }: Props) {
  const type = detectDocType(url);
  const isDataUrl = url.startsWith('data:');

  return (
    <Dialog open={open} onOpenChange={o => !o && onClose()}>
      <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 flex flex-col">
        <DialogHeader className="p-4 border-b flex-row items-center justify-between gap-4 space-y-0">
          <DialogTitle className="truncate flex items-center gap-2 text-base">
            <FileText className="w-4 h-4 text-primary shrink-0" />
            <span className="truncate">{title}</span>
          </DialogTitle>
          <Button size="sm" variant="outline" className="gap-1 shrink-0 mr-8" onClick={onDownload}>
            <Download className="w-4 h-4" /> Unduh
          </Button>
        </DialogHeader>
        <div className="flex-1 overflow-auto bg-muted/30">
          {type === 'pdf' && (
            <iframe src={url} className="w-full h-full border-none" title={title} />
          )}
          {type === 'image' && (
            <div className="w-full h-full flex items-center justify-center p-4">
              <img src={url} alt={title} className="max-w-full max-h-full object-contain" />
            </div>
          )}
          {type === 'office' && !isDataUrl && (
            <iframe src={`https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`} className="w-full h-full border-none" title={title} />
          )}
          {type === 'office' && isDataUrl && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 gap-3">
              <FileText className="w-12 h-12 text-muted-foreground" />
              <p className="text-foreground font-medium">Preview untuk DOC/XLS hanya tersedia dari URL publik.</p>
              <p className="text-sm text-muted-foreground">Silakan unduh file untuk membukanya di aplikasi terkait.</p>
              <Button onClick={onDownload} className="gap-1 mt-2"><Download className="w-4 h-4" /> Unduh File</Button>
            </div>
          )}
          {type === 'unknown' && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 gap-3">
              <FileText className="w-12 h-12 text-muted-foreground" />
              <p className="text-foreground font-medium">Format tidak dapat di-preview.</p>
              <Button onClick={onDownload} className="gap-1 mt-2"><Download className="w-4 h-4" /> Unduh File</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
