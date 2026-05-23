# Cafe 39 — Menu Website Redesign

**Status:** Design approved, pending implementation
**Date:** 2026-05-22
**Author:** vietmai@everfit.io

## Goal

Redesign the Cafe 39 menu website (current: https://cafe39.vercel.app/en) into a polished, multilingual, mobile-first frontend that:

1. Looks warm and inviting — matching the personality of a Vietnamese café in Hội An
2. Showcases the menu clearly across 6 languages (Vietnamese, English, Japanese, Chinese, Korean, Russian)
3. Surfaces real Google customer reviews and encourages new visitors to leave a review
4. Stays simple to maintain — no CMS, no backend

The current site has functional menu data and i18n but the UI/UX lacks polish. This redesign keeps the same data shape and locales, replacing the presentation layer.

## Non-Goals

- No backend, no database, no authentication
- No ordering, payments, or shopping cart
- No CMS dashboard — content is updated by editing JSON files in the repo
- No real-time review updates (reviews refresh on rebuild, not live)
- No native mobile app

## Architecture

**Stack:**
- Next.js 14 App Router with static export (`output: 'export'`)
- TypeScript
- Tailwind CSS (with custom theme tokens)
- `next-intl` for internationalization
- Vitest + React Testing Library for unit/component tests
- Playwright for E2E smoke tests
- Deployed on Vercel

**Routing:**

| Path | Language |
|------|----------|
| `/vi` | Tiếng Việt |
| `/en` | English |
| `/ja` | 日本語 |
| `/zh` | 中文 |
| `/ko` | 한국어 |
| `/ru` | Русский |
| `/`   | Redirects to user's preferred locale via `Accept-Language`, defaulting to `/en` |

Each locale is statically pre-rendered at build time via `generateStaticParams`. The site ships as fully static HTML — no runtime locale resolution.

**Locale persistence:** Selecting a language in the switcher sets a cookie so the user's preference is honored on subsequent visits when they land on `/`.

## Component Composition

```
app/[locale]/page.tsx
├── <Header>              Sticky logo + <LanguageSwitcher>
├── <HeroSection>         Café name, location, hours, rating, "View Menu" CTA
├── <CategoryTabs>        Sticky horizontal tabs with scroll-spy
├── <MenuSection>         One per category:
│   ├── <FeaturedItem>      Large card for category's featured/"must try" item
│   └── <MenuGrid>          2-col grid of <MenuItemCard>
├── <ReviewsSection>      Carousel of Google reviews + CTA
│   ├── <ReviewCard>
│   └── <MapEmbed>          Google Maps iframe pinned at Cafe 39's location
└── <Footer>              Address, hours, social links
```

### Key Component Behaviors

**`<CategoryTabs>`** — sticky below the header, smooth-scrolls to the tapped category, and uses an `IntersectionObserver` to update the active tab as the user scrolls through sections.

**`<HeroSection>`** — shows the café name in serif type, location/hours, an aggregated star rating (from reviews), and a "View Menu" button that scrolls to the first category.

**`<MenuItemCard>`** — image, localized name, localized description, price formatted for the active locale. Hover lifts gently (`translateY(-2px)`).

**`<FeaturedItem>`** — visually larger card at the top of each category. Items with `featured: true` are pinned here; the rest fall into `<MenuGrid>`.

**`<ReviewsSection>`** — displays 5–6 most recent 4★+ reviews. Beneath the reviews, a prominent "★ Write a Review on Google" deep-link CTA opens Google's native review flow.

**`<LanguageSwitcher>`** — dropdown showing each language in its native script with a flag (🇻🇳 Tiếng Việt, 🇬🇧 English, 🇯🇵 日本語, 🇨🇳 中文, 🇰🇷 한국어, 🇷🇺 Русский).

## Data Model

All content lives in JSON files in the repo, version-controlled with the code.

### `data/menu.json`

```json
{
  "categories": [
    { "id": "coffee",   "icon": "☕", "order": 1 },
    { "id": "milk-tea", "icon": "🧋", "order": 2 },
    { "id": "must-try", "icon": "⭐", "order": 3 },
    { "id": "juices",   "icon": "🍹", "order": 4 },
    { "id": "yogurt",   "icon": "🥛", "order": 5 },
    { "id": "tea",      "icon": "🍵", "order": 6 }
  ],
  "items": [
    {
      "id": "saigon-black",
      "category": "coffee",
      "image": "/images/menu/saigon-black.jpg",
      "price": 20000,
      "featured": true,
      "tags": ["must-try"],
      "translations": {
        "en": { "name": "Saigon Black Coffee", "description": "Rich Vietnamese drip coffee" },
        "vi": { "name": "Cà phê đen Sài Gòn",  "description": "Cà phê pha phin đậm đà" },
        "ja": { "name": "サイゴンブラックコーヒー", "description": "濃厚なベトナム式ドリップコーヒー" },
        "zh": { "name": "西贡黑咖啡", "description": "浓郁的越南滴漏咖啡" },
        "ko": { "name": "사이공 블랙 커피", "description": "진한 베트남식 드립 커피" },
        "ru": { "name": "Сайгонский чёрный кофе", "description": "Насыщенный вьетнамский капельный кофе" }
      }
    }
  ]
}
```

**Conventions:**
- `price` is stored as an integer in VND (Vietnamese dong). Display formatting is locale-specific (e.g., `20.000đ` for VI, `₫20,000` for EN).
- `image` paths are relative to `/public`.
- `featured: true` pins an item to the top of its category as a `<FeaturedItem>`.
- Missing translations fall back to English at render time, with a build-time warning logged listing missing translations.

### `data/translations/{locale}.json`

UI strings only — section headings, button labels, error messages. Kept separate from menu content because UI text changes rarely while menu content changes often.

```json
{
  "header": { "languageSwitcher": "Language" },
  "hero":   { "viewMenu": "View Menu", "openHours": "Open 7am – 10pm" },
  "menu":   { "categories": { "coffee": "Coffee", "milk-tea": "Milk Tea" } },
  "reviews":{ "title": "What customers say", "writeReview": "Review us on Google" },
  "footer": { "address": "Address", "contact": "Contact" }
}
```

### `data/reviews.json` (generated)

Written at build time by `scripts/fetch-reviews.ts`. Never edited by hand.

```json
{
  "rating": 4.8,
  "totalReviews": 230,
  "reviews": [
    {
      "author": "Sarah K.",
      "avatar": "https://...",
      "rating": 5,
      "text": "Best avocado coffee in Hội An!",
      "language": "en",
      "time": "2026-04-12"
    }
  ]
}
```

### `data/reviews.fallback.json`

Manually curated reviews used if the Places API call fails at build time. Same shape as `reviews.json`.

## Google Reviews Integration

### Build-time fetch

A Node script (`scripts/fetch-reviews.ts`) runs as a `prebuild` step:

1. Calls Google Places API `place/details` endpoint with the Cafe 39 Place ID.
2. Filters reviews: keep `rating >= 4` and non-empty `text`.
3. Limits to the 6 most recent (Google's API returns max 5 per call).
4. Writes the result to `data/reviews.json`.
5. On API failure (no internet, quota exceeded, malformed response), logs a warning and uses `data/reviews.fallback.json` as a backup so the section is never empty.

**Secrets:**
- `GOOGLE_PLACES_API_KEY` — stored as a Vercel env var, never bundled to the client.
- The Place ID is hardcoded in the script.

### Refresh cadence

A daily Vercel Cron Job (free on the Hobby plan) triggers a redeploy, refreshing reviews every 24 hours. Alternatively, a GitHub Action scheduled workflow can call Vercel's Deploy Hook.

### "Write a Review" CTA

Below the reviews, a card with:
- Title: "Loved your visit?" (translated)
- Body: encouragement to share their experience
- Button: deep-link to `https://search.google.com/local/writereview?placeid=<PLACE_ID>` — opens Google's native review flow on web or in the Google Maps app on mobile.
- Below the button: `<MapEmbed>` showing Cafe 39's pin via Google Maps iframe (no API key needed).

## Multilingual System

**Library:** `next-intl` — handles routing, message loading, formatting, and locale detection for the App Router.

**Locale detection priority (for `/` requests):**
1. Explicit URL segment (`/ja` always shows Japanese)
2. Cookie set by `<LanguageSwitcher>`
3. `Accept-Language` header
4. Default: `en`

**Static generation:** `generateStaticParams` produces one HTML file per locale at build time. Each is fully self-contained — no runtime locale negotiation.

**Font handling:** system fonts cover all required scripts without shipping large web font files:
- Latin (en/vi): Georgia for headings, system-ui sans-serif for body
- CJK + Cyrillic: `Noto Sans CJK`, `Noto Sans KR`, system fallbacks

**Price formatting per locale:** centralized in `lib/format.ts` using `Intl.NumberFormat` with locale-specific currency rules.

## Visual Design

### Color Tokens

| Token | Hex | Purpose |
|-------|-----|---------|
| `--bg` | `#fdf6ec` | Page background (warm cream) |
| `--surface` | `#ffffff` | Cards |
| `--brown-primary` | `#5c3a1e` | Headings, header bg, primary CTAs |
| `--brown-secondary` | `#a07040` | Prices, decorative |
| `--accent` | `#e8b86d` | Featured badges, hover states |
| `--muted` | `#999999` | Descriptions, inactive tabs |
| `--border` | `#f0e0cc` | Soft dividers |
| `--star` | `#f5c518` | Rating stars |

All combinations verified to meet WCAG AA contrast for text use.

### Typography

- **Display:** Georgia, serif — logo, hero, section titles, café-classic feel
- **Body & UI:** system-ui sans-serif stack
- **Scale:** mobile-first, 14px base scaling up to 16px on tablet+

### Shape & Motion

- Border radius: `10px` cards, `20px` pills (tabs, badges), `8px` thumbnails
- Soft shadow: `0 2px 8px rgba(92, 58, 30, 0.12)`
- Tab switch: smooth scroll
- Card hover: gentle lift (`translateY(-2px)`)
- Section reveal: subtle fade-in on scroll via `IntersectionObserver`, gated by `prefers-reduced-motion`

### Responsive Breakpoints

| Range | Layout |
|-------|--------|
| `< 640px` (mobile) | Single column for featured, 2-col grid for rest |
| `640–1024px` (tablet) | 2-col featured, 3-col grid |
| `> 1024px` (desktop) | Max-width 960px centered container |

## Image Handling

- All menu photos served via Next.js `<Image>` for auto-srcset, lazy loading, WebP conversion.
- Stored under `/public/images/menu/{item-id}.jpg`.
- Fallback placeholder shown if a referenced image is missing (no broken images).

## Project Structure

```
cafe39/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── not-found.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── LanguageSwitcher.tsx
│   ├── HeroSection.tsx
│   ├── CategoryTabs.tsx
│   ├── MenuSection.tsx
│   ├── FeaturedItem.tsx
│   ├── MenuGrid.tsx
│   ├── MenuItemCard.tsx
│   ├── ReviewsSection.tsx
│   ├── ReviewCard.tsx
│   ├── MapEmbed.tsx
│   └── Footer.tsx
├── data/
│   ├── menu.json
│   ├── reviews.json
│   ├── reviews.fallback.json
│   └── translations/
│       ├── en.json  ja.json  zh.json  ko.json  ru.json  vi.json
├── lib/
│   ├── i18n.ts
│   ├── menu.ts
│   └── format.ts
├── scripts/
│   └── fetch-reviews.ts
├── public/
│   └── images/menu/
├── tests/
│   ├── components/
│   └── e2e/
├── messages/                    (next-intl convention; re-exports from data/translations)
├── i18n.ts
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Testing Strategy

| Layer | Tool | Coverage |
|-------|------|----------|
| Unit | Vitest | `lib/format.ts` (price formatters), `lib/menu.ts` (typed menu helpers), `scripts/fetch-reviews.ts` (filtering logic) |
| Component | Vitest + React Testing Library | `<MenuItemCard>` renders translated name; `<CategoryTabs>` highlights active tab on scroll; `<LanguageSwitcher>` navigates and persists cookie |
| E2E | Playwright | One happy-path smoke test: load `/en`, switch to `/ja`, scroll categories, click "Write a Review" link is correct |

## Quality Gates (CI)

- `tsc --noEmit` — type check
- `eslint` + `prettier --check`
- `vitest run`
- `playwright test`
- `next build` succeeds with all 6 locales generated

## Accessibility

- All menu images have descriptive `alt` text (item name + category, localized)
- WCAG AA color contrast verified for the cream/brown palette
- Keyboard navigation supported on tabs, language switcher, all interactive elements
- `prefers-reduced-motion` honored — disables fade-ins and hover lifts
- Proper landmark roles: `<header>`, `<main>`, `<nav>`, `<footer>`

## Open Questions / Decisions for Implementation

These are explicitly out of scope of this spec but should be confirmed during implementation:

1. **Menu item lightbox** — clicking a `<MenuItemCard>` could open a larger image view; spec leaves this as an optional enhancement.
2. **Existing menu data import** — the current cafe39.vercel.app site already has menu items and translations. The first implementation step should be extracting that data into the new `menu.json` shape.
3. **Cafe 39 Place ID** — the actual Google Maps Place ID for Cafe 39 must be retrieved from Google Maps URL (`https://maps.app.goo.gl/Rcv6SCwcpaSDT8yn9` resolves to a place page) and added to the fetch script and review URLs.
