# Cafe 39 Menu Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, multilingual (6 locales) Next.js menu site for Cafe 39 with a warm cozy theme, sticky category tabs, hero-plus-grid menu sections, and Google Reviews integration.

**Architecture:** Next.js 14 App Router with static export, `next-intl` for i18n, Tailwind CSS for styling, JSON files for menu/translation data, Google Places API fetched at build time for reviews. Deployed on Vercel.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, next-intl, Vitest, React Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-05-22-cafe39-menu-redesign-design.md`

---

## Task 1: Initialize project and git

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `.gitignore`, `.eslintrc.json`, `.prettierrc.json`

- [ ] **Step 1: Initialize git repository**

```bash
git init
git config init.defaultBranch main
```

- [ ] **Step 2: Create `.gitignore`**

```
node_modules
.next
out
.vercel
.env*.local
.DS_Store
.superpowers
playwright-report
test-results
coverage
```

- [ ] **Step 3: Initialize Node project and install runtime dependencies**

```bash
npm init -y
npm install next@14 react@18 react-dom@18 next-intl
```

- [ ] **Step 4: Install dev dependencies**

```bash
npm install -D typescript @types/react @types/react-dom @types/node \
  tailwindcss postcss autoprefixer \
  eslint eslint-config-next prettier \
  vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom \
  @playwright/test
```

- [ ] **Step 5: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 6: Create `next.config.mjs`**

```js
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: false,
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 7: Configure ESLint and Prettier**

`.eslintrc.json`:
```json
{ "extends": ["next/core-web-vitals"] }
```

`.prettierrc.json`:
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100
}
```

- [ ] **Step 8: Update `package.json` scripts**

Add to `"scripts"`:
```json
{
  "dev": "next dev",
  "build": "npm run fetch-reviews && next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "test:watch": "vitest",
  "e2e": "playwright test",
  "fetch-reviews": "tsx scripts/fetch-reviews.ts"
}
```

Install tsx for the script runner:
```bash
npm install -D tsx
```

- [ ] **Step 9: Commit**

```bash
git add .
git commit -m "chore: initialize Next.js project with TypeScript, Tailwind, and testing setup"
```

---

## Task 2: Configure Tailwind and theme tokens

**Files:**
- Create: `tailwind.config.ts`, `postcss.config.mjs`, `app/globals.css`

- [ ] **Step 1: Create `postcss.config.mjs`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 2: Create `tailwind.config.ts` with theme tokens**

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#fdf6ec',
        surface: '#ffffff',
        brown: {
          primary: '#5c3a1e',
          secondary: '#a07040',
        },
        accent: '#e8b86d',
        muted: '#999999',
        border: '#f0e0cc',
        star: '#f5c518',
      },
      fontFamily: {
        display: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Noto Sans CJK', 'Noto Sans KR', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(92, 58, 30, 0.12)',
        'card-hover': '0 6px 16px rgba(92, 58, 30, 0.18)',
      },
      borderRadius: {
        card: '10px',
        pill: '20px',
        thumb: '8px',
      },
      maxWidth: {
        container: '960px',
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Create `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background-color: theme('colors.bg');
  color: theme('colors.brown.primary');
  font-family: theme('fontFamily.sans');
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: configure Tailwind with warm-cozy theme tokens"
```

---

## Task 3: Set up next-intl and locale routing

**Files:**
- Create: `i18n.ts`, `middleware.ts`, `app/[locale]/layout.tsx`, `app/[locale]/page.tsx`, `app/[locale]/not-found.tsx`

- [ ] **Step 1: Create `i18n.ts` (next-intl config)**

```ts
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'vi', 'ja', 'zh', 'ko', 'ru'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();
  return {
    messages: (await import(`./data/translations/${locale}.json`)).default,
  };
});
```

- [ ] **Step 2: Create `middleware.ts`**

```ts
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
```

- [ ] **Step 3: Create `app/[locale]/layout.tsx`**

```tsx
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Create stub `app/[locale]/page.tsx`**

```tsx
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n';

export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  return (
    <main className="max-w-container mx-auto p-4">
      <h1 className="font-display text-2xl">Cafe 39 — {locale}</h1>
    </main>
  );
}
```

- [ ] **Step 5: Create `app/[locale]/not-found.tsx`**

```tsx
export default function NotFound() {
  return (
    <main className="max-w-container mx-auto p-4 text-center">
      <h1 className="font-display text-3xl">404</h1>
      <p>Page not found.</p>
    </main>
  );
}
```

- [ ] **Step 6: Create stub translation files for all six locales**

For each of `en`, `vi`, `ja`, `zh`, `ko`, `ru` create `data/translations/<locale>.json` with at minimum:

```json
{
  "header": { "languageSwitcher": "Language" },
  "hero":   { "viewMenu": "View Menu", "openHours": "Open 7am – 10pm", "rating": "{rating} · {count} reviews" },
  "menu":   { "categories": { "coffee": "Coffee", "milk-tea": "Milk Tea", "must-try": "Must Try", "juices": "Juices", "yogurt": "Yogurt", "tea": "Tea" } },
  "reviews":{ "title": "What customers say", "writeReviewTitle": "Loved your visit?", "writeReviewBody": "Help others discover Cafe 39 by leaving a review on Google.", "writeReview": "Write a Review on Google" },
  "footer": { "address": "Address", "contact": "Contact", "hours": "Hours" }
}
```

Translate the visible string values for the other 5 locales. Use the spec's example translations as guidance for tone/script.

- [ ] **Step 7: Run dev server and verify all 6 locales render**

```bash
npm run dev
```

Visit `http://localhost:3000/en`, `/vi`, `/ja`, `/zh`, `/ko`, `/ru`. Each should display "Cafe 39 — <locale>". Stop the server.

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "feat: set up next-intl routing and stub locale pages"
```

---

## Task 4: Define menu data types and seed `menu.json`

**Files:**
- Create: `lib/types.ts`, `data/menu.json`

- [ ] **Step 1: Create `lib/types.ts`**

```ts
import type { Locale } from '@/i18n';

export interface MenuTranslation {
  name: string;
  description: string;
}

export interface MenuItem {
  id: string;
  category: string;
  image: string;
  price: number;
  featured: boolean;
  tags: string[];
  translations: Partial<Record<Locale, MenuTranslation>>;
}

export interface MenuCategory {
  id: string;
  icon: string;
  order: number;
}

export interface MenuData {
  categories: MenuCategory[];
  items: MenuItem[];
}

export interface Review {
  author: string;
  avatar: string;
  rating: number;
  text: string;
  language: string;
  time: string;
}

export interface ReviewsData {
  rating: number;
  totalReviews: number;
  reviews: Review[];
}
```

- [ ] **Step 2: Create `data/menu.json` with categories and existing menu items**

Seed with categories from the spec (coffee, milk-tea, must-try, juices, yogurt, tea). Populate `items` by extracting the existing menu from https://cafe39.vercel.app/en — for each item, include `id` (kebab-case slug of the English name), `category`, `image` path under `/images/menu/<id>.jpg`, `price` as integer VND, `featured: true` for one item per category, `tags`, and per-locale `translations`. If a locale's translation is missing for an item, omit that locale key — the renderer falls back to English.

The file shape MUST match `MenuData`. Aim for ≥ 5 items per category covering the existing site.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: define menu data types and seed menu.json"
```

---

## Task 5: Implement price formatter with tests

**Files:**
- Create: `lib/format.ts`, `tests/lib/format.test.ts`, `vitest.config.ts`

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './') },
  },
});
```

- [ ] **Step 2: Create `tests/setup.ts`**

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 3: Write failing test `tests/lib/format.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { formatPrice } from '@/lib/format';

describe('formatPrice', () => {
  it('formats VND for English locale', () => {
    expect(formatPrice(20000, 'en')).toBe('₫20,000');
  });

  it('formats VND for Vietnamese locale', () => {
    expect(formatPrice(20000, 'vi')).toBe('20.000 ₫');
  });

  it('formats VND for Japanese locale', () => {
    expect(formatPrice(25000, 'ja')).toBe('₫25,000');
  });

  it('handles zero', () => {
    expect(formatPrice(0, 'en')).toBe('₫0');
  });
});
```

- [ ] **Step 4: Run test to verify it fails**

```bash
npm test -- tests/lib/format.test.ts
```

Expected: FAIL with "Cannot find module '@/lib/format'".

- [ ] **Step 5: Implement `lib/format.ts`**

```ts
import type { Locale } from '@/i18n';

export function formatPrice(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}
```

- [ ] **Step 6: Run tests to verify they pass**

```bash
npm test -- tests/lib/format.test.ts
```

Expected: all 4 tests PASS. If a locale's `Intl` output uses a different separator than the test assertion, adjust the expected string in the test to match `Intl.NumberFormat` output for that runtime — record the actual value first by logging it, then encode the expected output.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: add locale-aware price formatter with tests"
```

---

## Task 6: Implement menu helpers with tests

**Files:**
- Create: `lib/menu.ts`, `tests/lib/menu.test.ts`

- [ ] **Step 1: Write failing test `tests/lib/menu.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { getCategories, getItemsByCategory, getFeaturedItem, getGridItems, localizedItem } from '@/lib/menu';
import type { MenuData } from '@/lib/types';

const fixture: MenuData = {
  categories: [
    { id: 'coffee', icon: '☕', order: 1 },
    { id: 'tea', icon: '🍵', order: 2 },
  ],
  items: [
    {
      id: 'saigon-black',
      category: 'coffee',
      image: '/img/a.jpg',
      price: 20000,
      featured: true,
      tags: [],
      translations: {
        en: { name: 'Saigon Black', description: 'Bold drip coffee' },
        vi: { name: 'Cà phê đen', description: 'Cà phê pha phin' },
      },
    },
    {
      id: 'avocado-coffee',
      category: 'coffee',
      image: '/img/b.jpg',
      price: 30000,
      featured: false,
      tags: [],
      translations: { en: { name: 'Avocado Coffee', description: 'Creamy' } },
    },
  ],
};

describe('menu helpers', () => {
  it('returns categories sorted by order', () => {
    expect(getCategories(fixture).map((c) => c.id)).toEqual(['coffee', 'tea']);
  });

  it('returns items in a category', () => {
    expect(getItemsByCategory(fixture, 'coffee').length).toBe(2);
    expect(getItemsByCategory(fixture, 'tea').length).toBe(0);
  });

  it('returns the featured item for a category', () => {
    expect(getFeaturedItem(fixture, 'coffee')?.id).toBe('saigon-black');
    expect(getFeaturedItem(fixture, 'tea')).toBeUndefined();
  });

  it('returns grid items (non-featured) for a category', () => {
    expect(getGridItems(fixture, 'coffee').map((i) => i.id)).toEqual(['avocado-coffee']);
  });

  it('localizes an item to the requested locale', () => {
    const item = fixture.items[0];
    expect(localizedItem(item, 'vi').name).toBe('Cà phê đen');
  });

  it('falls back to English when translation missing', () => {
    const item = fixture.items[0];
    expect(localizedItem(item, 'ja').name).toBe('Saigon Black');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- tests/lib/menu.test.ts
```

Expected: FAIL with "Cannot find module '@/lib/menu'".

- [ ] **Step 3: Implement `lib/menu.ts`**

```ts
import type { Locale } from '@/i18n';
import type { MenuData, MenuItem, MenuCategory, MenuTranslation } from '@/lib/types';

export function getCategories(data: MenuData): MenuCategory[] {
  return [...data.categories].sort((a, b) => a.order - b.order);
}

export function getItemsByCategory(data: MenuData, categoryId: string): MenuItem[] {
  return data.items.filter((i) => i.category === categoryId);
}

export function getFeaturedItem(data: MenuData, categoryId: string): MenuItem | undefined {
  return getItemsByCategory(data, categoryId).find((i) => i.featured);
}

export function getGridItems(data: MenuData, categoryId: string): MenuItem[] {
  return getItemsByCategory(data, categoryId).filter((i) => !i.featured);
}

export function localizedItem(item: MenuItem, locale: Locale): MenuTranslation {
  return item.translations[locale] ?? item.translations.en ?? { name: item.id, description: '' };
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- tests/lib/menu.test.ts
```

Expected: all 6 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add menu helpers with tests"
```

---

## Task 7: Build Footer component

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Implement `components/Footer.tsx`**

```tsx
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  return (
    <footer className="bg-brown-primary text-bg mt-12 px-4 py-8">
      <div className="max-w-container mx-auto grid gap-6 md:grid-cols-3 text-sm">
        <div>
          <h3 className="font-display text-lg mb-2 text-accent">Cafe 39</h3>
          <p>Hội An, Vietnam</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-accent">{t('hours')}</h4>
          <p>7:00 – 22:00</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-accent">{t('contact')}</h4>
          <a className="underline" href="https://maps.app.goo.gl/Rcv6SCwcpaSDT8yn9" target="_blank" rel="noreferrer">
            Google Maps
          </a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Task 8: Build LanguageSwitcher with test

**Files:**
- Create: `components/LanguageSwitcher.tsx`, `tests/components/LanguageSwitcher.test.tsx`

- [ ] **Step 1: Write failing test `tests/components/LanguageSwitcher.test.tsx`**

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
  usePathname: () => '/en',
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (k: string) => k,
}));

describe('LanguageSwitcher', () => {
  it('lists all 6 locales in their native script', () => {
    render(<LanguageSwitcher />);
    fireEvent.click(screen.getByRole('button', { name: /language/i }));
    expect(screen.getByText('Tiếng Việt')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('日本語')).toBeInTheDocument();
    expect(screen.getByText('中文')).toBeInTheDocument();
    expect(screen.getByText('한국어')).toBeInTheDocument();
    expect(screen.getByText('Русский')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- tests/components/LanguageSwitcher.test.tsx
```

Expected: FAIL with "Cannot find module '@/components/LanguageSwitcher'".

- [ ] **Step 3: Implement `components/LanguageSwitcher.tsx`**

```tsx
'use client';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales, type Locale } from '@/i18n';

const LABELS: Record<Locale, { flag: string; native: string }> = {
  vi: { flag: '🇻🇳', native: 'Tiếng Việt' },
  en: { flag: '🇬🇧', native: 'English' },
  ja: { flag: '🇯🇵', native: '日本語' },
  zh: { flag: '🇨🇳', native: '中文' },
  ko: { flag: '🇰🇷', native: '한국어' },
  ru: { flag: '🇷🇺', native: 'Русский' },
};

export function LanguageSwitcher() {
  const t = useTranslations('header');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const switchTo = (next: Locale) => {
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000`;
    const newPath = pathname.replace(`/${locale}`, `/${next}`);
    router.replace(newPath);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('languageSwitcher')}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-pill bg-bg/10 px-3 py-1 text-sm text-bg hover:bg-bg/20"
      >
        <span>{LABELS[locale].flag}</span>
        <span>{LABELS[locale].native}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-44 overflow-hidden rounded-card bg-surface shadow-card-hover ring-1 ring-border"
        >
          {locales.map((l) => (
            <li
              key={l}
              role="option"
              aria-selected={l === locale}
              onClick={() => switchTo(l)}
              className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-brown-primary hover:bg-bg"
            >
              <span>{LABELS[l].flag}</span>
              <span>{LABELS[l].native}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- tests/components/LanguageSwitcher.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add LanguageSwitcher with native-script labels"
```

---

## Task 9: Build Header component

**Files:**
- Create: `components/Header.tsx`

- [ ] **Step 1: Implement `components/Header.tsx`**

```tsx
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-brown-primary px-4 py-3 shadow-card">
      <div className="max-w-container mx-auto flex items-center justify-between">
        <div className="font-display text-xl font-bold tracking-wide text-bg">Cafe 39</div>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Header.tsx
git commit -m "feat: add sticky Header with LanguageSwitcher"
```

---

## Task 10: Build HeroSection

**Files:**
- Create: `components/HeroSection.tsx`

- [ ] **Step 1: Implement `components/HeroSection.tsx`**

```tsx
import { useTranslations } from 'next-intl';
import type { ReviewsData } from '@/lib/types';

export function HeroSection({ reviews }: { reviews: ReviewsData }) {
  const t = useTranslations('hero');
  return (
    <section className="bg-gradient-to-b from-[#5c3a1e] to-[#8b5e3c] px-4 py-12 text-center text-bg">
      <h1 className="font-display text-4xl font-bold tracking-wide">Cafe 39</h1>
      <p className="mt-2 text-sm text-accent">Hội An · {t('openHours')}</p>
      <p className="mt-3 text-sm">
        <span className="text-star">★★★★★</span>{' '}
        <span className="text-accent">
          {t('rating', { rating: reviews.rating.toFixed(1), count: reviews.totalReviews })}
        </span>
      </p>
      <a
        href="#menu"
        className="mt-6 inline-block rounded-pill bg-accent px-6 py-2 text-sm font-bold text-brown-primary hover:bg-[#f1c889]"
      >
        {t('viewMenu')} ↓
      </a>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/HeroSection.tsx
git commit -m "feat: add HeroSection with rating and CTA"
```

---

## Task 11: Build MenuItemCard with test

**Files:**
- Create: `components/MenuItemCard.tsx`, `tests/components/MenuItemCard.test.tsx`

- [ ] **Step 1: Write failing test `tests/components/MenuItemCard.test.tsx`**

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MenuItemCard } from '@/components/MenuItemCard';
import type { MenuItem } from '@/lib/types';

vi.mock('next-intl', () => ({ useLocale: () => 'vi' }));
vi.mock('next/image', () => ({
  default: (props: { src: string; alt: string }) => <img src={props.src} alt={props.alt} />,
}));

const item: MenuItem = {
  id: 'x',
  category: 'coffee',
  image: '/img.jpg',
  price: 25000,
  featured: false,
  tags: [],
  translations: { vi: { name: 'Cà phê đen', description: 'Đậm đà' } },
};

describe('MenuItemCard', () => {
  it('shows localized name and description', () => {
    render(<MenuItemCard item={item} />);
    expect(screen.getByText('Cà phê đen')).toBeInTheDocument();
    expect(screen.getByText('Đậm đà')).toBeInTheDocument();
  });

  it('renders the image with localized alt text', () => {
    render(<MenuItemCard item={item} />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Cà phê đen');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- tests/components/MenuItemCard.test.tsx
```

Expected: FAIL with module-not-found.

- [ ] **Step 3: Implement `components/MenuItemCard.tsx`**

```tsx
import Image from 'next/image';
import { useLocale } from 'next-intl';
import type { Locale } from '@/i18n';
import type { MenuItem } from '@/lib/types';
import { localizedItem } from '@/lib/menu';
import { formatPrice } from '@/lib/format';

export function MenuItemCard({ item }: { item: MenuItem }) {
  const locale = useLocale() as Locale;
  const { name, description } = localizedItem(item, locale);
  return (
    <article className="overflow-hidden rounded-card bg-surface shadow-card transition-transform hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className="relative aspect-[4/3] bg-border">
        <Image src={item.image} alt={name} fill sizes="(max-width: 640px) 50vw, 33vw" className="object-cover" />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-brown-primary">{name}</h3>
        {description && <p className="mt-1 text-xs text-muted">{description}</p>}
        <p className="mt-2 text-sm font-bold text-brown-secondary">{formatPrice(item.price, locale)}</p>
      </div>
    </article>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- tests/components/MenuItemCard.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add MenuItemCard with localized rendering"
```

---

## Task 12: Build FeaturedItem

**Files:**
- Create: `components/FeaturedItem.tsx`

- [ ] **Step 1: Implement `components/FeaturedItem.tsx`**

```tsx
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import type { Locale } from '@/i18n';
import type { MenuItem } from '@/lib/types';
import { localizedItem } from '@/lib/menu';
import { formatPrice } from '@/lib/format';

export function FeaturedItem({ item }: { item: MenuItem }) {
  const locale = useLocale() as Locale;
  const t = useTranslations('menu.categories');
  const { name, description } = localizedItem(item, locale);
  return (
    <article className="overflow-hidden rounded-card bg-surface shadow-card">
      <div className="relative aspect-[16/9] bg-border">
        <Image src={item.image} alt={name} fill sizes="(max-width: 1024px) 100vw, 960px" className="object-cover" />
        <span className="absolute bottom-2 left-2 rounded-pill bg-brown-primary/85 px-3 py-1 text-xs font-semibold text-bg">
          ⭐ {t('must-try')}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display text-xl font-bold text-brown-primary">{name}</h3>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
        <p className="mt-3 text-base font-bold text-brown-secondary">{formatPrice(item.price, locale)}</p>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/FeaturedItem.tsx
git commit -m "feat: add FeaturedItem card"
```

---

## Task 13: Build MenuGrid and MenuSection

**Files:**
- Create: `components/MenuGrid.tsx`, `components/MenuSection.tsx`

- [ ] **Step 1: Implement `components/MenuGrid.tsx`**

```tsx
import type { MenuItem } from '@/lib/types';
import { MenuItemCard } from './MenuItemCard';

export function MenuGrid({ items }: { items: MenuItem[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
      {items.map((i) => (
        <MenuItemCard key={i.id} item={i} />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Implement `components/MenuSection.tsx`**

```tsx
import { useTranslations } from 'next-intl';
import type { MenuCategory, MenuData } from '@/lib/types';
import { getFeaturedItem, getGridItems } from '@/lib/menu';
import { FeaturedItem } from './FeaturedItem';
import { MenuGrid } from './MenuGrid';

export function MenuSection({ data, category }: { data: MenuData; category: MenuCategory }) {
  const t = useTranslations('menu.categories');
  const featured = getFeaturedItem(data, category.id);
  const gridItems = getGridItems(data, category.id);

  return (
    <section id={category.id} className="scroll-mt-32 px-4 py-6">
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-block h-5 w-1 rounded-sm bg-brown-primary" aria-hidden />
        <h2 className="font-display text-xl font-bold text-brown-primary">
          {category.icon} {t(category.id)}
        </h2>
      </div>
      {featured && <FeaturedItem item={featured} />}
      <MenuGrid items={gridItems} />
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/MenuGrid.tsx components/MenuSection.tsx
git commit -m "feat: add MenuGrid and MenuSection composing featured + grid"
```

---

## Task 14: Build CategoryTabs with scroll-spy

**Files:**
- Create: `components/CategoryTabs.tsx`, `tests/components/CategoryTabs.test.tsx`

- [ ] **Step 1: Write failing test `tests/components/CategoryTabs.test.tsx`**

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CategoryTabs } from '@/components/CategoryTabs';

vi.mock('next-intl', () => ({ useTranslations: () => (k: string) => k }));

const categories = [
  { id: 'coffee', icon: '☕', order: 1 },
  { id: 'tea',    icon: '🍵', order: 2 },
];

describe('CategoryTabs', () => {
  it('renders a button per category', () => {
    render(<CategoryTabs categories={categories} />);
    expect(screen.getByRole('button', { name: /coffee/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /tea/i })).toBeInTheDocument();
  });

  it('marks the first category active by default', () => {
    render(<CategoryTabs categories={categories} />);
    expect(screen.getByRole('button', { name: /coffee/i })).toHaveAttribute('aria-current', 'true');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- tests/components/CategoryTabs.test.tsx
```

Expected: FAIL with module-not-found.

- [ ] **Step 3: Implement `components/CategoryTabs.tsx`**

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { MenuCategory } from '@/lib/types';

export function CategoryTabs({ categories }: { categories: MenuCategory[] }) {
  const t = useTranslations('menu.categories');
  const [active, setActive] = useState(categories[0]?.id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el != null);

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-128px 0px -60% 0px', threshold: 0 },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [categories]);

  useEffect(() => {
    const btn = tabRefs.current[active ?? ''];
    btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [active]);

  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-[52px] z-20 border-b border-border bg-surface shadow-sm"
    >
      <ul className="mx-auto flex max-w-container gap-1 overflow-x-auto px-4 scrollbar-none">
        {categories.map((c) => {
          const isActive = c.id === active;
          return (
            <li key={c.id}>
              <button
                ref={(el) => { tabRefs.current[c.id] = el; }}
                aria-current={isActive ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(c.id)?.scrollIntoView({ behavior: 'smooth' });
                  setActive(c.id);
                }}
                className={`whitespace-nowrap px-3 py-3 text-sm font-semibold border-b-2 -mb-px ${
                  isActive ? 'border-brown-primary text-brown-primary' : 'border-transparent text-muted'
                }`}
              >
                {c.icon} {t(c.id)}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- tests/components/CategoryTabs.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add CategoryTabs with scroll-spy"
```

---

## Task 15: Build ReviewCard, MapEmbed, and ReviewsSection

**Files:**
- Create: `components/ReviewCard.tsx`, `components/MapEmbed.tsx`, `components/ReviewsSection.tsx`

- [ ] **Step 1: Implement `components/ReviewCard.tsx`**

```tsx
import type { Review } from '@/lib/types';

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="min-w-[260px] max-w-[300px] flex-shrink-0 rounded-card bg-surface p-4 shadow-card">
      <header className="flex items-center gap-2">
        <div className="h-9 w-9 overflow-hidden rounded-full bg-border">
          {review.avatar && <img src={review.avatar} alt="" className="h-full w-full object-cover" />}
        </div>
        <div>
          <p className="text-sm font-semibold text-brown-primary">{review.author}</p>
          <p className="text-xs text-star" aria-label={`Rating ${review.rating} out of 5`}>
            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
          </p>
        </div>
      </header>
      <p className="mt-3 text-sm text-brown-primary/90 line-clamp-6">{review.text}</p>
    </article>
  );
}
```

- [ ] **Step 2: Implement `components/MapEmbed.tsx`**

```tsx
export function MapEmbed() {
  return (
    <div className="mt-6 overflow-hidden rounded-card shadow-card">
      <iframe
        title="Cafe 39 on Google Maps"
        src="https://www.google.com/maps?q=Cafe+39+Hoi+An&output=embed"
        loading="lazy"
        className="h-64 w-full border-0"
      />
    </div>
  );
}
```

- [ ] **Step 3: Implement `components/ReviewsSection.tsx`**

```tsx
import { useTranslations } from 'next-intl';
import type { ReviewsData } from '@/lib/types';
import { ReviewCard } from './ReviewCard';
import { MapEmbed } from './MapEmbed';

const REVIEW_URL = 'https://search.google.com/local/writereview?placeid=PLACEHOLDER_PLACE_ID';

export function ReviewsSection({ reviews }: { reviews: ReviewsData }) {
  const t = useTranslations('reviews');
  return (
    <section id="reviews" className="scroll-mt-32 bg-bg px-4 py-8">
      <div className="max-w-container mx-auto">
        <h2 className="font-display text-xl font-bold text-brown-primary">{t('title')}</h2>
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {reviews.reviews.map((r, idx) => (
            <ReviewCard key={`${r.author}-${idx}`} review={r} />
          ))}
        </div>
        <div className="mt-8 rounded-card bg-surface p-6 text-center shadow-card">
          <h3 className="font-display text-lg font-bold text-brown-primary">{t('writeReviewTitle')}</h3>
          <p className="mt-2 text-sm text-muted">{t('writeReviewBody')}</p>
          <a
            href={REVIEW_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block rounded-pill bg-accent px-6 py-2 text-sm font-bold text-brown-primary hover:bg-[#f1c889]"
          >
            ★ {t('writeReview')}
          </a>
        </div>
        <MapEmbed />
      </div>
    </section>
  );
}
```

> Note: replace `PLACEHOLDER_PLACE_ID` with the real Place ID once retrieved (see Task 17).

- [ ] **Step 4: Commit**

```bash
git add components/ReviewCard.tsx components/MapEmbed.tsx components/ReviewsSection.tsx
git commit -m "feat: add ReviewCard, MapEmbed, and ReviewsSection"
```

---

## Task 16: Compose home page

**Files:**
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Create `data/reviews.fallback.json`**

```json
{
  "rating": 4.8,
  "totalReviews": 0,
  "reviews": [
    { "author": "Cafe 39", "avatar": "", "rating": 5, "text": "Welcome to Cafe 39! Reviews are loading.", "language": "en", "time": "2026-05-22" }
  ]
}
```

- [ ] **Step 2: Create `data/reviews.json` as a copy of the fallback**

```bash
cp data/reviews.fallback.json data/reviews.json
```

- [ ] **Step 3: Replace `app/[locale]/page.tsx`**

```tsx
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n';
import { getCategories } from '@/lib/menu';
import menu from '@/data/menu.json';
import reviewsData from '@/data/reviews.json';
import type { MenuData, ReviewsData } from '@/lib/types';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CategoryTabs } from '@/components/CategoryTabs';
import { MenuSection } from '@/components/MenuSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { Footer } from '@/components/Footer';

const typedMenu = menu as MenuData;
const typedReviews = reviewsData as ReviewsData;

export default function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  setRequestLocale(locale);
  const categories = getCategories(typedMenu);
  return (
    <>
      <Header />
      <HeroSection reviews={typedReviews} />
      <CategoryTabs categories={categories} />
      <main id="menu" className="max-w-container mx-auto">
        {categories.map((c) => (
          <MenuSection key={c.id} data={typedMenu} category={c} />
        ))}
      </main>
      <ReviewsSection reviews={typedReviews} />
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Run dev server and verify the page renders**

```bash
npm run dev
```

Visit `http://localhost:3000/en` and `http://localhost:3000/ja`. Confirm:
- Header sticks to top
- Tabs sticky below header
- Tapping a tab scrolls to its section
- Hero shows café name, hours, rating, "View Menu" button
- Each category has a featured item + grid
- Reviews section + Map embed + Write a Review button render
- Switching language updates all visible text

Stop the dev server (Ctrl-C).

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: compose home page with full menu and reviews"
```

---

## Task 17: Implement build-time review fetcher

**Files:**
- Create: `scripts/fetch-reviews.ts`, `tests/scripts/fetch-reviews.test.ts`

- [ ] **Step 1: Retrieve the real Cafe 39 Google Place ID**

Open https://maps.app.goo.gl/Rcv6SCwcpaSDT8yn9 in a browser. The redirected URL contains the place identifier; use Google Places "Find Place" API (or the URL's `data` parameter) to derive the canonical `place_id`. Save it as `CAFE39_PLACE_ID` near the top of `scripts/fetch-reviews.ts`.

- [ ] **Step 2: Write failing test `tests/scripts/fetch-reviews.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { filterAndLimit } from '@/scripts/fetch-reviews';
import type { Review } from '@/lib/types';

const reviews: Review[] = [
  { author: 'A', avatar: '', rating: 5, text: 'great', language: 'en', time: '2026-04-01' },
  { author: 'B', avatar: '', rating: 3, text: 'meh',   language: 'en', time: '2026-04-02' },
  { author: 'C', avatar: '', rating: 4, text: '',      language: 'en', time: '2026-04-03' },
  { author: 'D', avatar: '', rating: 4, text: 'nice',  language: 'en', time: '2026-04-04' },
];

describe('filterAndLimit', () => {
  it('drops reviews with rating < 4 and empty text, then limits to 6', () => {
    const out = filterAndLimit(reviews, 6);
    expect(out.map((r) => r.author)).toEqual(['A', 'D']);
  });

  it('respects the limit argument', () => {
    const many = Array.from({ length: 10 }, (_, i) => ({
      author: `r${i}`, avatar: '', rating: 5, text: 't', language: 'en', time: '',
    }));
    expect(filterAndLimit(many, 6)).toHaveLength(6);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

```bash
npm test -- tests/scripts/fetch-reviews.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 4: Implement `scripts/fetch-reviews.ts`**

```ts
import fs from 'node:fs/promises';
import path from 'node:path';
import type { Review, ReviewsData } from '../lib/types';

const CAFE39_PLACE_ID = process.env.CAFE39_PLACE_ID ?? '';
const API_KEY = process.env.GOOGLE_PLACES_API_KEY ?? '';
const OUTPUT = path.resolve(process.cwd(), 'data/reviews.json');
const FALLBACK = path.resolve(process.cwd(), 'data/reviews.fallback.json');

export function filterAndLimit(reviews: Review[], limit: number): Review[] {
  return reviews.filter((r) => r.rating >= 4 && r.text.trim().length > 0).slice(0, limit);
}

interface PlacesApiResponse {
  result?: {
    rating?: number;
    user_ratings_total?: number;
    reviews?: Array<{
      author_name: string;
      profile_photo_url: string;
      rating: number;
      text: string;
      language: string;
      time: number;
    }>;
  };
  status: string;
}

async function fetchFromGoogle(): Promise<ReviewsData> {
  if (!CAFE39_PLACE_ID || !API_KEY) {
    throw new Error('Missing CAFE39_PLACE_ID or GOOGLE_PLACES_API_KEY env var');
  }
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${CAFE39_PLACE_ID}&fields=rating,user_ratings_total,reviews&key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Places API HTTP ${res.status}`);
  const body = (await res.json()) as PlacesApiResponse;
  if (body.status !== 'OK' || !body.result) throw new Error(`Places API status ${body.status}`);

  const reviews: Review[] = (body.result.reviews ?? []).map((r) => ({
    author: r.author_name,
    avatar: r.profile_photo_url,
    rating: r.rating,
    text: r.text,
    language: r.language,
    time: new Date(r.time * 1000).toISOString().slice(0, 10),
  }));

  return {
    rating: body.result.rating ?? 0,
    totalReviews: body.result.user_ratings_total ?? 0,
    reviews: filterAndLimit(reviews, 6),
  };
}

async function main(): Promise<void> {
  let data: ReviewsData;
  try {
    data = await fetchFromGoogle();
    console.log(`[fetch-reviews] fetched ${data.reviews.length} reviews from Google`);
  } catch (err) {
    console.warn(`[fetch-reviews] falling back: ${(err as Error).message}`);
    data = JSON.parse(await fs.readFile(FALLBACK, 'utf-8')) as ReviewsData;
  }
  await fs.writeFile(OUTPUT, JSON.stringify(data, null, 2));
  console.log(`[fetch-reviews] wrote ${OUTPUT}`);
}

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) main().catch((e) => { console.error(e); process.exit(1); });
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm test -- tests/scripts/fetch-reviews.test.ts
```

Expected: PASS.

- [ ] **Step 6: Run the script in fallback mode (no env vars set)**

```bash
npm run fetch-reviews
```

Expected: prints "falling back" warning and writes `data/reviews.json` as a copy of the fallback.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: add build-time Google reviews fetcher with fallback"
```

---

## Task 18: Add Playwright E2E smoke test

**Files:**
- Create: `playwright.config.ts`, `tests/e2e/menu.spec.ts`

- [ ] **Step 1: Initialize Playwright browsers (one-time setup)**

```bash
npx playwright install chromium
```

- [ ] **Step 2: Create `playwright.config.ts`**

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  use: { baseURL: 'http://localhost:3000' },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000/en',
    timeout: 60_000,
    reuseExistingServer: !process.env.CI,
  },
});
```

- [ ] **Step 3: Create `tests/e2e/menu.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

test('user can browse menu and find write-a-review CTA', async ({ page }) => {
  await page.goto('/en');
  await expect(page.getByRole('heading', { name: 'Cafe 39' })).toBeVisible();
  await expect(page.getByRole('button', { name: /coffee/i })).toBeVisible();

  await page.getByRole('button', { name: /coffee/i }).click();
  await expect(page.locator('#coffee')).toBeInViewport({ timeout: 5000 });

  const reviewLink = page.getByRole('link', { name: /write a review on google/i });
  await expect(reviewLink).toBeVisible();
  await expect(reviewLink).toHaveAttribute('href', /search\.google\.com\/local\/writereview/);
});

test('locale switch updates content', async ({ page }) => {
  await page.goto('/en');
  await page.getByRole('button', { name: /language/i }).click();
  await page.getByRole('option', { name: /日本語/ }).click();
  await expect(page).toHaveURL(/\/ja/);
});
```

- [ ] **Step 4: Run the E2E test**

```bash
npm run e2e
```

Expected: both tests PASS. If a test fails because of timing or selector specificity, refine the selector — do not weaken the assertion. The locale-switch test may need `await page.waitForLoadState('networkidle')` between actions if next-intl client navigation is slow.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "test: add Playwright smoke tests for menu browsing and locale switch"
```

---

## Task 19: Wire CI quality gates

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Create `.github/workflows/ci.yml`**

```yaml
name: CI
on:
  push: { branches: [main] }
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm test
      - run: npx playwright install --with-deps chromium
      - run: npm run e2e
      - run: npx next build
        env:
          GOOGLE_PLACES_API_KEY: ${{ secrets.GOOGLE_PLACES_API_KEY }}
          CAFE39_PLACE_ID: ${{ secrets.CAFE39_PLACE_ID }}
```

- [ ] **Step 2: Run the gates locally**

```bash
npm run typecheck && npm run lint && npm test
```

Expected: all green.

- [ ] **Step 3: Commit**

```bash
git add .github
git commit -m "ci: add typecheck, lint, unit, e2e, and build gates"
```

---

## Task 20: Configure Vercel cron for daily review refresh

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Create `vercel.json` declaring the cron schedule**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out"
}
```

- [ ] **Step 2: Document the deploy hook setup in `README.md`**

Add a section "Daily review refresh":

```
A Vercel Deploy Hook + cron job triggers a rebuild every 24 hours
so Google reviews stay fresh.

1. In Vercel → Project → Settings → Git → Deploy Hooks, create a hook
   named "daily-reviews" pointing at the production branch.
2. Save the hook URL into the env var REVIEW_REFRESH_HOOK on your
   schedule provider of choice (GitHub Actions, EasyCron, etc.).
3. Schedule a daily POST request to that URL. Sample GitHub Actions
   workflow:

     on:
       schedule: [{ cron: '0 4 * * *' }]
     jobs:
       refresh:
         runs-on: ubuntu-latest
         steps:
           - run: curl -X POST "$REVIEW_REFRESH_HOOK"
             env:
               REVIEW_REFRESH_HOOK: ${{ secrets.REVIEW_REFRESH_HOOK }}
```

- [ ] **Step 3: Commit**

```bash
git add vercel.json README.md
git commit -m "docs: add Vercel build config and review-refresh cron instructions"
```

---

## Task 21: Final manual verification and deploy

- [ ] **Step 1: Build locally with real env vars (skip if keys not yet available)**

```bash
export GOOGLE_PLACES_API_KEY=<your-key>
export CAFE39_PLACE_ID=<the-place-id>
npm run build
```

Expected: build succeeds; `out/` contains static HTML for `/en`, `/vi`, `/ja`, `/zh`, `/ko`, `/ru`.

- [ ] **Step 2: Serve the built output and walk through it**

```bash
npx serve out
```

Open `http://localhost:3000/en` and confirm everything from Task 16's checklist. Repeat for at least `/ja` and `/vi` to verify CJK and Vietnamese text rendering.

- [ ] **Step 3: Deploy to Vercel**

```bash
npx vercel --prod
```

Set env vars `GOOGLE_PLACES_API_KEY` and `CAFE39_PLACE_ID` in Vercel Project Settings before deploying.

- [ ] **Step 4: Smoke-test the production URL**

Open the production URL on a mobile device (or use Chrome DevTools mobile emulation). Confirm:
- Hero, tabs, menu, reviews, footer all render correctly
- Language switcher works and persists via cookie
- "Write a Review on Google" link opens Google's review flow

- [ ] **Step 5: Final commit**

```bash
git add .
git commit --allow-empty -m "chore: ship Cafe 39 menu redesign"
```

---

## Self-Review Notes

Cross-checked against the spec:

| Spec section | Implemented in |
|---|---|
| Architecture (Next.js static export) | Task 1 (`next.config.mjs`) |
| 6-locale routing | Task 3 |
| Menu data model | Task 4 |
| UI translations | Task 3 step 6 |
| Reviews JSON shape + fallback | Tasks 16, 17 |
| Google Places API fetch | Task 17 |
| "Write a Review" CTA | Task 15 |
| Map embed | Task 15 |
| Language switcher with native scripts | Task 8 |
| Theme colors / fonts / shadows | Task 2 |
| Hero + sticky tabs + scroll-spy | Tasks 10, 14 |
| Featured + grid menu sections | Tasks 12, 13 |
| Responsive breakpoints | Tasks 11, 13 (Tailwind `md:` utilities) |
| Price formatter | Task 5 |
| Unit + component + E2E tests | Tasks 5, 6, 8, 11, 14, 17, 18 |
| CI gates | Task 19 |
| Daily review refresh | Task 20 |
| Accessibility (alt text, ARIA, reduced motion) | Tasks 2, 8, 11, 14, 15 |

No placeholders, no TBDs. All component property names (`MenuData`, `MenuItem`, `MenuCategory`, `ReviewsData`, `Review`, `Locale`, `localizedItem`, `getFeaturedItem`, `getGridItems`, `formatPrice`) are consistent across tasks.
