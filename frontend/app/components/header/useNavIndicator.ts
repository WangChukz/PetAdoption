import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navLinks } from './navLinks';

interface IndicatorStyle {
  left: number;
  width: number;
  opacity: number;
}

export function useNavIndicator() {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState<IndicatorStyle>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Exact match for "/" to avoid matching all routes, startsWith for others
  const activeIndex = navLinks.findIndex((link) =>
    link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
  );

  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = linkRefs.current[activeIndex];
      const navEl = navRef.current;

      if (!activeEl || !navEl) {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const navRect = navEl.getBoundingClientRect();
      const linkRect = activeEl.getBoundingClientRect();

      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        opacity: 1,
      });
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeIndex, pathname]);

  return { navRef, linkRefs, indicatorStyle, activeIndex, pathname };
}
