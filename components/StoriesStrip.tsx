import fs from 'fs';
import path from 'path';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n';
import { STORY_LABELS } from '@/lib/config';
import { StoriesClient } from './StoriesClient';

export async function StoriesStrip({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'stories' });

  const videosDir = path.join(process.cwd(), 'public/videos/stories');
  let videos: string[] = [];
  try {
    videos = fs.readdirSync(videosDir)
      .filter(f => /\.(mp4|mov|webm)$/i.test(f))
      .sort()
      .map(f => `/videos/stories/${f}`);
  } catch { /* folder missing or empty */ }

  return (
    <div className="stories">
      <div className="stories-eyebrow">{t('eyebrow')}</div>
      <StoriesClient videos={videos} labels={STORY_LABELS} />
    </div>
  );
}
