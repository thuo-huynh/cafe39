'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { MenuItem, LocalizedStrings } from '@/lib/types';
import type { Locale } from '@/i18n';

function pick(strings: LocalizedStrings, locale: Locale) {
  return strings[locale] ?? strings.en;
}

export function HeroCard({ items }: { items: MenuItem[] }) {
  const locale = useLocale() as Locale;
  const tHero = useTranslations('hero');
  const tMenu = useTranslations('menu');
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % items.length), 5000);
    return () => clearInterval(id);
  }, [items.length]);

  const current = items[idx];
  if (!current) return null;

  return (
    <>
      <div className="lb-hero-card">
        <div className="lb-hero-stamp">
          ★★★★★
          <br />
          <span style={{ fontSize: 11, fontWeight: 600 }}>{tHero('stamp_rating')}</span>
          <br />
          {tHero('stamp_count')}
        </div>
        <div className="lb-hero-card-img">
          {items.map((it, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={it.id}
              src={it.img}
              alt={pick(it.names, locale)}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: i === idx ? 1 : 0,
                transition: 'opacity 0.8s ease',
              }}
            />
          ))}
        </div>
        <div className="lb-hero-card-cap">
          <span>{tHero('signature')}</span>
          <span>
            {current.price}k{tMenu('currency')}
          </span>
        </div>
        <div className="lb-hero-card-name">{pick(current.names, locale)}</div>
      </div>
    </>
  );
}
