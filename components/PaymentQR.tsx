import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n';

const QR_IMAGE = '/qr/image.png';

export async function PaymentQR({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'payment' });
  return (
    <section className="pay" id="pay">
      <div className="pay-head">
        <div className="pay-eyebrow">{t('eyebrow')}</div>
        <h2 className="pay-title">
          <em>{t('title')}</em>
        </h2>
        <div className="pay-sub">{t('sub')}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
        <div className="pay-card">
          <div className="pay-card-head">
            <span className="pay-card-dot" style={{ background: '#d52b1e' }} />
            <span className="pay-card-label">VietQR</span>
          </div>
          <div className="pay-qr">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={QR_IMAGE}
              alt="VietQR payment code"
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
            />
          </div>
          <div className="pay-card-sub">Any Vietnamese bank</div>
        </div>
      </div>
    </section>
  );
}
