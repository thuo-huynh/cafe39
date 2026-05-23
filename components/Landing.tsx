import { getTranslations } from 'next-intl/server';
import menuData from '@/data/menu.json';
import reviewsData from '@/data/reviews.json';
import friendsData from '@/data/friends.json';
import type { MenuData, Review, Friend, LocalizedStrings } from '@/lib/types';
import type { Locale } from '@/i18n';
import {
  BRAND_NAME,
  BRAND_SUB,
  ADDRESS_LINES,
  PHONE,
  GOOGLE_MAPS_URL,
  GOOGLE_MAPS_EMBED,
} from '@/lib/config';
import { LangPicker } from './LangPicker';
import { MenuBlocks } from './MenuBlocks';
import { HeroCard } from './HeroCard';
import { OpenNow } from './OpenNow';
import { PromoBanner } from './PromoBanner';
import { ScrollProgress } from './ScrollProgress';
import { StoriesStrip } from './StoriesStrip';
import { OwnerStory } from './OwnerStory';
import { PaymentQR } from './PaymentQR';
import { CTABar } from './CTABar';
import { FadeOnScroll } from './FadeOnScroll';
import { landingStyles } from './landing-styles';

const menu = menuData as MenuData;
const reviews = reviewsData as Review[];
const friends = friendsData as Friend[];

function pick(strings: LocalizedStrings, locale: Locale): string {
  return strings[locale] ?? strings.en;
}

export async function Landing({ locale }: { locale: Locale }) {
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tHero = await getTranslations({ locale, namespace: 'hero' });
  const tMenu = await getTranslations({ locale, namespace: 'menu' });
  const tAbout = await getTranslations({ locale, namespace: 'about' });
  const tReviews = await getTranslations({ locale, namespace: 'reviews' });
  const tGallery = await getTranslations({ locale, namespace: 'gallery' });
  const tVisit = await getTranslations({ locale, namespace: 'visit' });
  const tHours = await getTranslations({ locale, namespace: 'hours' });
  const tFooter = await getTranslations({ locale, namespace: 'footer' });

  const totalItems = menu.categories.reduce((acc, c) => acc + c.items.length, 0);

  // hero crossfade pool: salt coffee, avocado smoothie, bạc xỉu
  const heroPool = [
    menu.categories[0]?.items[2],
    menu.categories[2]?.items[0],
    menu.categories[0]?.items[5],
  ].filter(Boolean) as MenuData['categories'][number]['items'];

  const aboutImg1 = menu.categories[0]?.items[0]?.img;
  const aboutImg2 = menu.categories[0]?.items[1]?.img;
  const featuredReview = reviews[0];

  return (
    <div className="lb">
      <style>{landingStyles}</style>

      <ScrollProgress />
      <PromoBanner />
      <FadeOnScroll />

      {/* TOP LANGUAGE BAR */}
      <div className="lb-langbar">
        <span className="lb-langbar-label">{tNav('language')}</span>
        <LangPicker />
      </div>

      {/* NAV */}
      <nav className="lb-nav">
        <a className="lb-logo" href="#top">
          <div className="lb-logo-mark">39</div>
          <div>
            <div className="lb-logo-text">{BRAND_NAME}</div>
            <div className="lb-logo-sub">{BRAND_SUB}</div>
          </div>
        </a>
        <div className="lb-nav-mid">
          <OpenNow />
        </div>
        <div className="lb-navlinks">
          <a href="#menu">{tNav('menu')}</a>
          <a href="#owner">{tNav('about')}</a>
          <a href="#reviews">{tNav('reviews')}</a>
          <a href="#friends">{tNav('gallery')}</a>
          <a href="#visit">{tNav('visit')}</a>
        </div>
      </nav>

      <div className="lb-rule" />

      {/* HERO */}
      <section className="lb-hero lb-fade" id="top">
        <div className="lb-hero-l">
          <div className="lb-tape">{tHero('tape')}</div>
          <h1 style={{ marginTop: 28 }}>
            <span style={{ display: 'block' }}>{tHero('title_line1')}</span>
            <em style={{ display: 'block' }}>{tHero('title_line2')}</em>
          </h1>
          <div className="lb-hero-sub">{tHero('sub')}</div>
          <div className="lb-cta-row">
            <a href="#menu" className="lb-btn">
              {tHero('cta')} →
            </a>
            <a href="#visit" className="lb-btn ghost">
              {tHero('cta2')}
            </a>
          </div>
        </div>

        <div className="lb-hero-r">
          <HeroCard items={heroPool} />
        </div>
      </section>

      <div className="lb-rule" />

      {/* STORIES STRIP */}
      <StoriesStrip locale={locale} />

      {/* MENU */}
      <section className="lb-section" id="menu">
        <div className="lb-section-head">
          <div className="lb-section-eyebrow">
            {tMenu('eyebrow')} · {totalItems} {tMenu('items_suffix')}
          </div>
          <h2>
            <em>{tMenu('title')}</em>
          </h2>
        </div>

        <MenuBlocks categories={menu.categories} />
      </section>

      {/* ABOUT */}
      <section className="lb-about" id="about">
        <div className="lb-about-grid">
          <div>
            <div className="lb-section-eyebrow">{tAbout('eyebrow')}</div>
            <h2 style={{ marginTop: 16 }}>
              <span style={{ display: 'block' }}>{tAbout('title_line1')}</span>
              <span style={{ display: 'block' }}>{tAbout('title_line2')}</span>
              <span style={{ display: 'block' }}>{tAbout('title_line3')}</span>
            </h2>
            <div className="lb-about-body">{tAbout('body')}</div>
            {featuredReview && (
              <div className="lb-quote">
                &ldquo;{pick(featuredReview.body, locale)}&rdquo;
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginTop: 12,
                    fontStyle: 'normal',
                    color: 'var(--muted)',
                  }}
                >
                  — {featuredReview.name}, {tAbout('quote_role')}
                </div>
              </div>
            )}
          </div>
          <div className="lb-about-imgs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div>{aboutImg1 && <img src={aboutImg1} alt="" />}</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div>{aboutImg2 && <img src={aboutImg2} alt="" />}</div>
          </div>
        </div>
      </section>

      {/* OWNER STORY */}
      <OwnerStory locale={locale} />

      {/* REVIEWS */}
      <section className="lb-reviews" id="reviews">
        <div className="lb-section-head">
          <div className="lb-section-eyebrow">{tReviews('eyebrow')}</div>
          <h2>
            {tReviews('title').replace(/\.$/, '')} <em>★ 4.9</em>
          </h2>
        </div>
        <div className="lb-reviews-grid">
          {reviews.map((r, i) => (
            <div key={i} className="lb-postcard">
              <div className="lb-pc-stars">
                {'★'.repeat(r.stars)}
                {'☆'.repeat(5 - r.stars)}
              </div>
              <div className="lb-pc-body">{pick(r.body, locale)}</div>
              <div className="lb-pc-foot">
                <span className="lb-pc-name">{r.name}</span>
                <span>{r.date}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a
            className="lb-btn ghost"
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {tReviews('more')} →
          </a>
        </div>
      </section>

      {/* FRIENDS WALL */}
      <section id="friends">
        <div className="lb-section" style={{ paddingBottom: 16 }}>
          <div className="lb-section-eyebrow">{tGallery('eyebrow')}</div>
          <h2>
            <em>{tGallery('title')}</em>
          </h2>
          <div className="lb-friends-sub">{tGallery('sub')}</div>
        </div>
        <div className="lb-friends-wall">
          {friends.map((f) => (
            <div key={f.id} className="lb-polaroid">
              <div className="lb-polaroid-img" aria-label={f.placeholder}>
                {f.img
                  ? <img src={f.img} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  : f.placeholder}
              </div>
              <div className="lb-polaroid-cap">
                <span className="lb-polaroid-flag">{f.flag}</span>
                <span className="lb-polaroid-name">{f.name}</span>
                <span className="lb-polaroid-date">{f.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VISIT */}
      <section className="lb-visit" id="visit">
        <div className="lb-section" style={{ paddingBottom: 32 }}>
          <div className="lb-section-eyebrow">{tVisit('eyebrow')}</div>
          <h2>{tVisit('title')}</h2>
        </div>
        <div className="lb-map-wrap">
          <iframe src={GOOGLE_MAPS_EMBED} loading="lazy" title="Cafe 39 on Google Maps" />
          <div className="lb-map-card">
            <div className="lb-map-title">Cafe 39</div>
            <div className="lb-map-addr">
              {ADDRESS_LINES.map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                }}
              >
                {PHONE}
              </span>
            </div>
            <a
              className="lb-map-btn"
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tVisit('directions')} →
            </a>
          </div>
        </div>
      </section>

      {/* PAYMENT QR */}
      <PaymentQR locale={locale} />

      {/* HOURS */}
      <section className="lb-hours">
        <h3>
          <em>{tHours('title')}</em>
        </h3>
        <div className="lb-hours-grid">
          <div className="lb-hours-cell">
            <span className="lb-hours-day">{tHours('mf')}</span>
            <span className="lb-hours-time">{tHours('mf_time')}</span>
          </div>
          <div className="lb-hours-cell">
            <span className="lb-hours-day">{tHours('sat')}</span>
            <span className="lb-hours-time">{tHours('sat_time')}</span>
          </div>
          <div className="lb-hours-cell">
            <span className="lb-hours-day">{tHours('sun')}</span>
            <span className="lb-hours-time">{tHours('sun_time')}</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lb-foot">
        <div className="lb-foot-l">{tFooter('tag')}</div>
        <div className="lb-foot-c">◆ ◆ ◆</div>
        <div className="lb-foot-r">{tFooter('copy')}</div>
      </footer>

      <CTABar locale={locale} />
    </div>
  );
}
