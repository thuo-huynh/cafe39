'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales, localeMeta, type Locale } from '@/i18n';

export function LangPicker() {
  const current = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (next: Locale) => {
    if (next === current) return;
    const segments = pathname.split('/');
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = next;
    } else {
      segments.unshift('', next);
    }
    router.push(segments.join('/') || `/${next}`);
  };

  return (
    <div className="langrow">
      {locales.map((code) => {
        const { label, flag } = localeMeta[code];
        const active = code === current;
        return (
          <button
            key={code}
            className={`langbtn ${active ? 'active' : ''}`}
            onClick={() => switchTo(code)}
            title={label}
            aria-label={label}
            aria-pressed={active}
            type="button"
          >
            <span className="langbtn-flag">{flag}</span>
            <span className="langbtn-label">{label}</span>
          </button>
        );
      })}
      <style>{`
        .langrow { display: inline-flex; flex-wrap: wrap; gap: 6px; justify-content: center; }
        .langbtn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 10px;
          border: 1.5px solid transparent;
          background: color-mix(in srgb, var(--ink) 4%, transparent);
          color: var(--ink); cursor: pointer;
          font-family: var(--mono);
          font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase;
          border-radius: 3px;
          transition: background 0.15s, border-color 0.15s, transform 0.15s, color 0.15s;
        }
        .langbtn:hover { background: color-mix(in srgb, var(--accent) 14%, transparent); }
        .langbtn.active {
          background: var(--ink); color: var(--bg);
          border-color: var(--ink);
        }
        .langbtn-flag { font-size: 14px; line-height: 1; }
      `}</style>
    </div>
  );
}
