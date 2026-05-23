'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { HOURS } from '@/lib/config';

const nowMins = () => {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
};
const hmToMins = (s: string) => {
  const [h, m] = s.split(':').map(Number);
  return h * 60 + m;
};

export function OpenNow() {
  const t = useTranslations('opennow');
  const [mounted, setMounted] = useState(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTick((x) => x + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return <div className="opennow is-closed" />;

  const now = nowMins();
  const dow = new Date().getDay();
  const today = HOURS[dow];
  const isOpen = !!(today && now >= hmToMins(today.open) && now < hmToMins(today.close));

  let label = '';
  if (isOpen) {
    label = `${t('closes_at')} ${today.close}`;
  } else if (today && now < hmToMins(today.open)) {
    label = `${t('opens_at')} ${today.open}`;
  } else {
    for (let i = 1; i <= 7; i++) {
      const d = (dow + i) % 7;
      const day = HOURS[d];
      if (day) {
        label = `${t('opens_at')} ${day.label} ${day.open}`;
        break;
      }
    }
  }

  return (
    <div className={`opennow ${isOpen ? 'is-open' : 'is-closed'}`}>
      <span className="opennow-dot" />
      <span className="opennow-status">{isOpen ? t('open') : t('closed')}</span>
      <span className="opennow-sub">· {label}</span>
    </div>
  );
}
