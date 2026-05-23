import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n';
import { CONTACT } from '@/lib/config';

export async function CTABar({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'cta' });
  const zaloNumber = CONTACT.zalo.replace(/\D/g, '');
  return (
    <>
      <div className="cta-bar">
        <a className="cta-btn cta-call" href={`tel:${CONTACT.phoneRaw}`}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
          </svg>
          <span className="cta-btn-text">{t('call_long')}</span>
        </a>
        <a
          className="cta-btn cta-zalo"
          href={`https://zalo.me/${zaloNumber}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="cta-zalo-mark">Z</span>
          <span className="cta-btn-text">{t('zalo_long')}</span>
        </a>
      </div>
      <div className="cta-bar-spacer" />
    </>
  );
}
