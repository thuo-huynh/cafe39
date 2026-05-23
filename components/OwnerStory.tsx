import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n';

export async function OwnerStory({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'owner' });
  return (
    <section className="owner" id="owner">
      <div className="owner-grid">
        <div className="owner-photo-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/owner/2aOboQYGPZX6ehsjuLS5NlPQPacbkvni2YB75AA4.jpg"
            alt="Owner portrait"
            className="owner-photo-slot"
            style={{ objectFit: 'cover', display: 'block' }}
          />
          <div className="owner-stamp">{t('stamp')}</div>
        </div>
        <div>
          <div className="owner-eyebrow">{t('eyebrow')}</div>
          <h2 className="owner-title">{t('title')}</h2>
          <p className="owner-body">{t('body')}</p>
          <div className="owner-signoff">{t('signoff')}</div>
        </div>
      </div>
    </section>
  );
}
