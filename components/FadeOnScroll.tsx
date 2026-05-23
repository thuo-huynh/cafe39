'use client';

import { useEffect } from 'react';

const SELECTORS = '.lb-section, .lb-about, .lb-reviews, .lb-visit, .lb-hours, .lb-friends-wall, .owner, .pay, .stories';

export function FadeOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(SELECTORS);
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach((e) => e.classList.add('in-view'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
