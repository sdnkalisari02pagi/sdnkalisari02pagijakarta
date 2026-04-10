import { useEffect, useRef } from 'react';

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const observeElements = () => {
      const children = el.querySelectorAll('.scroll-animate:not(.animate-visible)');
      children.forEach((child) => io.observe(child));
      if (el.classList.contains('scroll-animate') && !el.classList.contains('animate-visible')) {
        io.observe(el);
      }
    };

    observeElements();

    const mo = new MutationObserver(() => observeElements());
    mo.observe(el, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return ref;
}
