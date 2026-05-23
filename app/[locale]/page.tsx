import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n';
import { Landing } from '@/components/Landing';

export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  return <Landing locale={locale} />;
}
