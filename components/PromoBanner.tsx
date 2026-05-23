'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { GOOGLE_MAPS_URL } from '@/lib/config';

export function PromoBanner() {
  const t = useTranslations();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="promo">
      <span className="promo-tag">★</span>
      <a
        className="promo-text"
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}
      >{t('promo')}</a>
      <button
        className="promo-x"
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
