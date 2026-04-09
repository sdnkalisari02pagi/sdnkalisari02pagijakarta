import { useEffect, useRef } from 'react';

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    // Observe the container and all scroll-animate children
    const children = el.querySelectorAll('.scroll-animate');
    children.forEach((child) => observer.observe(child));
    if (el.classList.contains('scroll-animate')) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}
