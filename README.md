# Cafe Cafe39 — Menu Website

Multilingual digital menu and landing page for **Cafe Cafe39**, a neighbourhood coffee shop in Đà Nẵng, Vietnam. Est. 2006.

**Live:** [cafe39.vercel.app](https://cafe39.vercel.app) · **Address:** 39 Nguyễn Thiện Kế, An Hải, Sơn Trà, Đà Nẵng

---

## Features

- **Multilingual** — 7 languages: Vietnamese, English, Chinese, Japanese, Korean, French, Russian
- **Full menu** — 5 categories (Coffee, Milk Tea, Smoothie, Juice, Tea) with photos and prices
- **Video stories** — Instagram-style story viewer with local MP4 videos
- **Customer gallery** — Polaroid-style photo wall of regulars
- **Live open/closed status** — based on shop hours
- **Google review link** — promo banner links directly to Google Maps review page
- **VietQR payment** — real QR code for MB Bank (DANG THI CHIN)
- **Sticky category nav** — filter bar stays pinned while scrolling the menu on mobile
- **Static export** — fast, no server required, deploys to Vercel in one click

---

## Tech Stack

| | |
|---|---|
| Framework | Next.js 14 (App Router) |
| i18n | next-intl v3 |
| Styling | Inline CSS-in-JS (landing-styles.ts) |
| Output | Static export (`output: 'export'`) |
| Deployment | Vercel |

---

## Project Structure

```
cafe39/
├── app/                        # Next.js App Router pages
│   └── [locale]/               # Locale-based routing (en, vi, zh, ja, ko, fr, ru)
├── components/
│   ├── Landing.tsx             # Main page layout
│   ├── MenuBlocks.tsx          # Menu with search + category filter
│   ├── HeroCard.tsx            # Hero image card with rating stamp
│   ├── StoriesStrip.tsx        # Story circles (server, reads videos/)
│   ├── StoriesClient.tsx       # Story fullscreen modal (client)
│   ├── OwnerStory.tsx          # Owner biography section
│   ├── PaymentQR.tsx           # VietQR payment section
│   ├── PromoBanner.tsx         # Top banner with Google review link
│   └── landing-styles.ts      # All CSS as a tagged template string
├── data/
│   ├── menu.json               # All menu items (id, price, image, names in 7 langs)
│   ├── friends.json            # Customer gallery photos
│   ├── reviews.json            # Customer reviews
│   └── translations/           # i18n strings per locale (en.json, vi.json, …)
├── lib/
│   ├── config.ts               # Brand info, address, hours, payment, story labels
│   └── types.ts                # TypeScript interfaces
└── public/
    ├── images/
    │   ├── coffee/             # Coffee item photos
    │   ├── milk-tea/
    │   ├── smoothie/
    │   ├── juice/
    │   ├── tea/
    │   ├── must-try/
    │   ├── owner/              # Owner portrait
    │   └── customers/          # Customer gallery photos
    ├── videos/stories/         # MP4 files for story viewer
    └── qr/                     # VietQR payment image
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/vi` (Vietnamese) by default.

---

## Updating Content

### Add / remove a menu item
Edit `data/menu.json`. Each item follows this shape:
```json
{
  "id": "unique-id",
  "price": 25,
  "img": "/images/coffee/my-drink.jpg",
  "names": {
    "en": "Salt Coffee", "vi": "Cà phê muối",
    "zh": "...", "ja": "...", "ko": "...", "fr": "...", "ru": "..."
  }
}
```
Add a `"highlight": "Must Try"` field to mark an item with a ⭐ badge.

### Add a video story
Drop an `.mp4` file into `public/videos/stories/`. Stories are loaded automatically sorted by filename. Update `STORY_LABELS` in `lib/config.ts` to add a label for the new video.

### Add a customer photo
1. Put the image in `public/images/customers/`
2. Add an entry to `data/friends.json`:
```json
{ "id": "f3", "flag": "🇻🇳", "name": "Khách quen", "date": "JAN 25", "placeholder": "...", "img": "/images/customers/photo.jpg" }
```

### Update opening hours
Edit the `HOURS` object in `lib/config.ts`.

### Update translations
Edit the relevant key in `data/translations/{locale}.json`. All 7 locale files should stay in sync.

---

## Deployment

Push to GitHub and import the repo on [vercel.com](https://vercel.com). No extra configuration needed — Vercel detects Next.js automatically and runs `next build`.

The static output is served from the `/out` directory. No environment variables are required.

---

## Shop Info

| | |
|---|---|
| Name | Cafe Cafe39 |
| Address | 39 Nguyễn Thiện Kế, An Hải, Sơn Trà, Đà Nẵng |
| Phone | +84 935 556 808 |
| Hours | Mon–Fri 06:30–22:30 · Sat 07:00–23:00 · Sun 07:00–22:00 |
| Payment | VietQR / MB Bank (DANG THI CHIN) |
