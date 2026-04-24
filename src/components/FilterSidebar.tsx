import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  children: ReactNode;
  title?: string;
}

/** Sticky left sidebar (desktop) + slide-in sheet (mobile). Wrap your filter controls. */
export default function FilterSidebar({ children, title }: Props) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const titleText = title || t('filter');

  return (
    <>
      {/* Desktop sticky sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-20 space-y-4 bg-card rounded-lg border p-4 shadow-sm">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" /> {titleText}
          </h3>
          <div className="space-y-3">{children}</div>
        </div>
      </aside>

      {/* Mobile trigger */}
      <div className="lg:hidden mb-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2 w-full">
              <SlidersHorizontal className="w-4 h-4" /> {titleText}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80vw] max-w-sm overflow-y-auto">
            <SheetHeader><SheetTitle>{titleText}</SheetTitle></SheetHeader>
            <div className="space-y-3 mt-4">{children}</div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
