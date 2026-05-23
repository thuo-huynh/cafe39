// landing-b.jsx — Variation B: "Vintage Boutique"
// Magazine/scrapbook layout: sticky vertical category rail, asymmetric menu rows,
// postcard reviews with slight rotation, oversized map. More texture and personality.

function LandingB({ lang, sections, palette, fonts, menuLayout = 'list', width = 1100 }) {
  const t = I18N[lang] || I18N.en;
  const sec = (id) => sections[id] !== false;
  const { useState, useEffect, useRef } = React;
  const [activeCat, setActiveCat] = useState(MENU[0].id);
  const [searchQ, setSearchQ] = useState('');
  const [heroIdx, setHeroIdx] = useState(0);
  const blockRefs = useRef({});

  // hero photo crossfade through 3 highlight items
  const HERO_ITEMS = [MENU[0].items[2], MENU[2].items[0], MENU[0].items[5]]; // salt, avo smoothie, bac xiu
  useEffect(() => {
    const id = setInterval(() => setHeroIdx((i) => (i + 1) % HERO_ITEMS.length), 5000);
    return () => clearInterval(id);
  }, []);
  const heroItem = HERO_ITEMS[heroIdx];

  // scroll-spy: highlight rail entry for the category in view
  useEffect(() => {
    if (!sec("menu")) return;
    const els = MENU.map((c) => blockRefs.current[c.id]).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        // pick the entry whose top is closest to 1/4 of the viewport (and intersecting)
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          visible.sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
          const id = visible[0].target.dataset.cat;
          if (id) setActiveCat(id);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections.menu]);

  const jumpTo = (id) => {
    const el = blockRefs.current[id];
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // Fade-up on scroll for all major sections
  useEffect(() => {
    const els = document.querySelectorAll(
      '.lb-section, .lb-about, .lb-reviews, .lb-visit, .lb-hours, .lb-friends-wall, .owner, .pay, .stories'
    );
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach((e) => e.classList.add('in-view'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const css = `
    .lb {
      --bg: ${palette.bg};
      --paper: ${palette.paper};
      --ink: ${palette.ink};
      --muted: ${palette.muted};
      --accent: ${palette.accent};
      --rule: ${palette.rule};
      --display: ${fonts.display};
      --body: ${fonts.body};
      --mono: 'JetBrains Mono', ui-monospace, monospace;
      background:
        radial-gradient(ellipse at top left, color-mix(in srgb, var(--accent) 8%, transparent), transparent 40%),
        radial-gradient(ellipse at bottom right, color-mix(in srgb, var(--ink) 6%, transparent), transparent 50%),
        var(--bg);
      color: var(--ink);
      font-family: var(--body);
      font-size: 15px;
      line-height: 1.5;
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      min-height: 100vh;
      position: relative;
      isolation: isolate;
      box-shadow: 0 0 60px color-mix(in srgb, var(--ink) 6%, transparent);
    }
    .lb * { box-sizing: border-box; }
    .lb h1, .lb h2, .lb h3 { font-family: var(--display); font-weight: 400; margin: 0; }
    :where(.lb) a { color: inherit; text-decoration: none; }

    /* paper grain */
    .lb::before {
      content: ''; position: absolute; inset: 0; pointer-events: none;
      background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.04) 1px, transparent 0);
      background-size: 3px 3px;
      opacity: 0.4; mix-blend-mode: multiply; z-index: 1;
    }
    .lb > * { position: relative; z-index: 2; }

    /* lang bar */
    .lb-langbar {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      padding: 10px 24px; flex-wrap: wrap;
      background: color-mix(in srgb, var(--ink) 6%, transparent);
      border-bottom: 1px solid var(--rule);
      font-family: var(--mono);
    }
    .lb-langbar-label {
      font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
      color: var(--muted); margin-right: 4px;
    }

    /* nav */
    .lb-nav {
      display: flex; align-items: center; justify-content: space-between;
      padding: 20px 48px;
    }
    .lb-logo { display: flex; align-items: center; gap: 12px; }
    .lb-logo-mark {
      width: 44px; height: 44px; border-radius: 4px; background: var(--ink); color: var(--bg);
      display: grid; place-items: center; font-family: var(--display); font-style: italic; font-size: 22px;
      transform: rotate(-3deg);
    }
    .lb-logo-text { font-family: var(--display); font-size: 24px; font-style: italic; }
    .lb-logo-sub { font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }
    .lb-navlinks {
      display: flex; gap: 28px; font-family: var(--mono);
      font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted);
    }
    .lb-navlinks a { transition: color 0.15s; }
    .lb-navlinks a:hover { color: var(--accent); }

    .lb-langpicker { position: relative; }

    /* hero */
    .lb-hero {
      padding: 40px 48px 64px;
      display: grid; grid-template-columns: 1fr 1.1fr; gap: 56px; align-items: end;
    }
    .lb-hero-l { padding-bottom: 24px; }
    .lb-hero-eyebrow {
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
      color: var(--muted); margin-bottom: 24px; display: flex; align-items: center; gap: 10px;
    }
    .lb-hero-eyebrow::before { content: '◇'; color: var(--accent); }
    .lb-hero h1 {
      font-size: 88px; line-height: 0.95; letter-spacing: -0.03em; white-space: pre-line;
    }
    .lb-hero h1 em { font-style: italic; color: var(--accent); font-weight: 400; }
    .lb-hero-sub { font-size: 17px; line-height: 1.6; color: var(--muted); max-width: 460px; margin-top: 24px; }
    .lb-cta-row { display: flex; gap: 14px; margin-top: 36px; align-items: center; }
    .lb-btn {
      display: inline-flex; align-items: center; gap: 10px; padding: 14px 26px;
      border-radius: 4px; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer;
      border: 1.5px solid var(--ink); background: var(--ink); color: var(--bg);
      font-family: var(--mono); transition: transform 0.18s, background 0.18s, color 0.18s;
    }
    .lb-btn:hover { transform: translateY(-2px); background: var(--accent); border-color: var(--accent); }
    .lb-btn.ghost { background: transparent; color: var(--ink); }
    .lb-btn.ghost:hover { background: var(--ink); color: var(--bg); border-color: var(--ink); }

    .lb-hero-r { position: relative; }
    .lb-hero-card {
      background: var(--paper); border-radius: 6px; padding: 16px; transform: rotate(2deg);
      box-shadow: 0 30px 60px -20px color-mix(in srgb, var(--ink) 25%, transparent),
                  0 2px 6px color-mix(in srgb, var(--ink) 10%, transparent);
      max-width: 460px; margin-left: auto;
    }
    .lb-hero-card-img { aspect-ratio: 1/1; border-radius: 3px; overflow: hidden; position: relative; }
    .lb-hero-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
    .lb-hero-card:hover .lb-hero-card-img img { transform: scale(1.04); }
    .lb-hero-card-cap {
      display: flex; justify-content: space-between; align-items: baseline; padding: 12px 6px 4px;
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
      color: var(--muted);
    }
    .lb-hero-card-name {
      font-family: var(--display); font-size: 22px; font-style: italic; color: var(--ink);
      text-transform: none; letter-spacing: 0; margin-top: 4px; padding: 0 6px;
    }

    .lb-hero-stamp {
      position: absolute; top: -16px; left: -32px; width: 100px; height: 100px;
      border: 2px solid var(--accent); color: var(--accent); border-radius: 50%;
      display: grid; place-items: center; text-align: center; padding: 6px;
      font-family: var(--mono); font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
      transform: rotate(-12deg); line-height: 1.3;
      background: color-mix(in srgb, var(--bg) 80%, transparent);
    }

    /* tape */
    .lb-tape {
      display: inline-block; padding: 3px 14px; background: color-mix(in srgb, var(--accent) 25%, transparent);
      font-family: var(--mono); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
      transform: rotate(-2deg); color: var(--ink);
    }

    /* section heads */
    .lb-section { padding: 80px 48px; position: relative; }
    .lb-section-head { margin-bottom: 48px; max-width: 720px; }
    .lb-section-eyebrow {
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
      color: var(--accent); margin-bottom: 16px;
    }
    .lb-section h2 { font-size: 64px; line-height: 1; letter-spacing: -0.02em; white-space: pre-line; }
    .lb-section h2 em { font-style: italic; color: var(--accent); }
    .lb-rule { height: 1px; background: var(--rule); margin: 0 48px; }

    /* menu */
    .lb-menu-layout { display: grid; grid-template-columns: 200px 1fr; gap: 48px; align-items: start; }
    .lb-cats-rail {
      position: sticky; top: 24px; align-self: start;
      display: flex; flex-direction: column; gap: 2px;
      font-family: var(--mono); font-size: 13px;
      padding: 8px 0;
    }
    .lb-rail-head {
      font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
      color: var(--muted); margin-bottom: 10px;
    }
    .lb-cat {
      padding: 12px 4px; background: transparent; border: none; cursor: pointer; text-align: left;
      color: var(--muted); border-bottom: 1px solid var(--rule); font-family: inherit; font-size: inherit;
      display: flex; align-items: center; gap: 10px;
      transition: color 0.15s, padding-left 0.2s;
    }
    .lb-cat:hover { color: var(--ink); padding-left: 8px; }
    .lb-cat.active { color: var(--ink); font-weight: 600; }
    .lb-cat.active::before { content: '→'; color: var(--accent); }
    .lb-cat-count { margin-left: auto; font-size: 10px; color: var(--muted); opacity: 0.7; }

    .lb-cat-block { padding-top: 24px; }
    .lb-cat-block:first-child { padding-top: 0; }
    .lb-cat-block + .lb-cat-block { margin-top: 56px; border-top: 1px dashed var(--rule); }
    .lb-cat-head {
      display: flex; align-items: baseline; justify-content: space-between;
      margin-bottom: 24px; gap: 16px;
    }
    .lb-cat-title {
      font-family: var(--display); font-size: 48px; line-height: 1; letter-spacing: -0.02em;
      display: flex; align-items: baseline; gap: 16px;
    }
    .lb-cat-title em { font-style: italic; color: var(--accent); }
    .lb-cat-num {
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted);
    }

    .lb-items { display: flex; flex-direction: column; gap: 16px; }

    .lb-search {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 16px; margin-bottom: 28px;
      background: var(--paper); border-radius: 999px;
      border: 1px solid var(--rule);
      transition: border-color 0.15s, background 0.15s;
    }
    .lb-search:focus-within { border-color: var(--accent); }
    .lb-search svg { flex: 0 0 18px; color: var(--muted); }
    .lb-search input {
      flex: 1; min-width: 0; border: none; background: transparent;
      font-family: var(--body); font-size: 15px; color: var(--ink);
      outline: none;
    }
    .lb-search input::placeholder { color: var(--muted); }
    .lb-search-clear {
      border: none; background: color-mix(in srgb, var(--ink) 6%, transparent);
      color: var(--muted); cursor: pointer;
      width: 22px; height: 22px; border-radius: 50%; line-height: 1;
      font-size: 14px; transition: background 0.15s, color 0.15s;
    }
    .lb-search-clear:hover { background: var(--accent); color: var(--bg); }
    .lb-search-count {
      font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--muted);
      padding-right: 6px;
    }
    .lb-noresult {
      padding: 48px 0; text-align: center; color: var(--muted); font-style: italic;
      font-family: var(--display); font-size: 18px;
    }

    /* features strip — highlighted items at top of menu */
    .lb-features { margin-bottom: 56px; }
    .lb-features-head {
      display: flex; align-items: center; gap: 14px; margin-bottom: 18px;
    }
    .lb-features-eyebrow {
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.2em;
      text-transform: uppercase; color: var(--accent);
      display: flex; align-items: center; gap: 8px;
    }
    .lb-features-eyebrow::before { content: '★'; font-size: 14px; }
    .lb-features-rule {
      flex: 1; height: 1px;
      background: linear-gradient(to right, var(--accent), transparent); opacity: 0.55;
    }
    .lb-features-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;
    }
    .lb-feature {
      position: relative; background: var(--paper); border-radius: 10px; overflow: hidden;
      cursor: pointer; transition: transform 0.25s, box-shadow 0.25s;
      box-shadow: 0 10px 24px -14px color-mix(in srgb, var(--ink) 22%, transparent);
    }
    .lb-feature:hover {
      transform: translateY(-5px);
      box-shadow: 0 18px 36px -14px color-mix(in srgb, var(--accent) 45%, transparent);
    }
    .lb-feature-img { aspect-ratio: 16/10; overflow: hidden; position: relative; }
    .lb-feature-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
    .lb-feature:hover .lb-feature-img img { transform: scale(1.06); }
    .lb-feature-tag {
      position: absolute; top: 10px; left: 10px; background: var(--accent); color: var(--bg);
      padding: 4px 10px; border-radius: 2px; font-family: var(--mono);
      font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase;
    }
    .lb-feature-name {
      font-family: var(--display); font-size: 22px; line-height: 1.15;
      padding: 14px 16px 4px; letter-spacing: -0.01em;
    }
    .lb-feature-foot {
      display: flex; justify-content: space-between; align-items: baseline;
      padding: 0 16px 14px;
      font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--muted);
    }
    .lb-feature-price {
      font-family: var(--display); font-style: italic; font-size: 20px; color: var(--accent);
      text-transform: none; letter-spacing: 0;
    }

    /* highlighted list rows */
    .lb-item.highlight {
      background: linear-gradient(to right,
        color-mix(in srgb, var(--accent) 12%, transparent),
        color-mix(in srgb, var(--accent) 4%, transparent) 70%,
        transparent);
      padding-left: 20px;
      border-left: 3px solid var(--accent);
      box-shadow: 0 1px 0 color-mix(in srgb, var(--accent) 14%, transparent) inset;
    }
    .lb-item.highlight:hover {
      background: linear-gradient(to right,
        color-mix(in srgb, var(--accent) 18%, transparent),
        color-mix(in srgb, var(--accent) 8%, transparent) 70%,
        transparent);
    }
    .lb-item.highlight .lb-item-name { color: var(--ink); }
    .lb-item.highlight .lb-item-img {
      box-shadow: 0 8px 18px -8px color-mix(in srgb, var(--accent) 50%, transparent);
    }
    .lb-item-badge.is-hl {
      background: var(--ink); color: var(--bg);
    }
    .lb-item {
      display: grid; grid-template-columns: 140px 1fr auto; gap: 24px; align-items: center;
      padding: 14px 16px; border-radius: 8px; transition: background 0.2s, transform 0.2s;
    }
    .lb-item:hover { background: var(--paper); transform: translateX(4px); }
    .lb-item-img {
      width: 140px; aspect-ratio: 1; border-radius: 6px; overflow: hidden; background: var(--paper);
      transition: transform 0.3s;
    }
    .lb-item:hover .lb-item-img { transform: rotate(-2deg); }
    .lb-item-img img { width: 100%; height: 100%; object-fit: cover; }
    .lb-item-mid { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
    .lb-item-name { font-family: var(--display); font-size: 24px; line-height: 1.15; letter-spacing: -0.01em; }
    .lb-item-sub { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
    .lb-item-dots {
      flex: 1; border-bottom: 1px dotted var(--rule); margin: 0 8px; align-self: end; padding-bottom: 4px;
    }
    .lb-item-row-bot { display: flex; align-items: baseline; margin-top: 6px; }
    .lb-item-price { font-family: var(--display); font-size: 28px; color: var(--accent); font-variant-numeric: tabular-nums; white-space: nowrap; }
    .lb-item-badge {
      font-family: var(--mono); font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
      background: var(--accent); color: var(--bg); padding: 3px 8px; border-radius: 2px;
      display: inline-block; margin-bottom: 6px;
    }

    /* about strip */
    .lb-about {
      padding: 96px 48px; position: relative;
      background: linear-gradient(to bottom, transparent, color-mix(in srgb, var(--ink) 5%, transparent));
    }
    .lb-about-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 64px; align-items: center; }
    .lb-about h2 { font-size: 56px; line-height: 1.05; white-space: pre-line; margin-bottom: 28px; }
    .lb-about-body { font-size: 18px; line-height: 1.7; color: var(--muted); max-width: 580px; }
    .lb-about-imgs { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .lb-about-imgs > div {
      aspect-ratio: 3/4; border-radius: 6px; overflow: hidden; background: var(--paper);
      box-shadow: 0 20px 40px -15px color-mix(in srgb, var(--ink) 20%, transparent);
    }
    .lb-about-imgs > div:first-child { transform: rotate(-3deg) translateY(20px); }
    .lb-about-imgs > div:last-child { transform: rotate(2deg) translateY(-20px); }
    .lb-about-imgs img { width: 100%; height: 100%; object-fit: cover; }
    .lb-quote {
      font-family: var(--display); font-style: italic; font-size: 22px; line-height: 1.4;
      padding: 20px 24px; border-left: 3px solid var(--accent); margin-top: 32px; color: var(--ink);
    }

    /* reviews */
    .lb-reviews { padding: 80px 48px; }
    .lb-reviews-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px 24px;
    }
    .lb-postcard {
      background: var(--paper); padding: 24px 22px;
      border-radius: 4px;
      box-shadow: 0 20px 36px -16px color-mix(in srgb, var(--ink) 18%, transparent),
                  0 2px 6px color-mix(in srgb, var(--ink) 8%, transparent);
      position: relative; transition: transform 0.25s;
      display: flex; flex-direction: column; gap: 14px;
    }
    .lb-postcard:nth-child(3n+1) { transform: rotate(-1.5deg); }
    .lb-postcard:nth-child(3n+2) { transform: rotate(0.8deg); }
    .lb-postcard:nth-child(3n+3) { transform: rotate(-0.5deg) translateY(12px); }
    .lb-postcard:hover { transform: rotate(0deg) translateY(-6px); }
    .lb-postcard::before {
      content: ''; position: absolute; top: -8px; left: 50%; transform: translateX(-50%) rotate(-3deg);
      width: 60px; height: 14px;
      background: color-mix(in srgb, var(--accent) 30%, transparent);
    }
    .lb-pc-stars { color: var(--accent); letter-spacing: 3px; font-size: 14px; }
    .lb-pc-body { font-size: 15px; line-height: 1.55; flex: 1; }
    .lb-pc-foot {
      display: flex; justify-content: space-between; align-items: center;
      padding-top: 12px; border-top: 1px dashed var(--rule);
      font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase;
      color: var(--muted);
    }
    .lb-pc-name { color: var(--ink); font-weight: 600; }

    /* visit map */
    .lb-visit { padding: 0 0 80px; position: relative; }
    .lb-map-wrap {
      position: relative; margin: 0 48px; aspect-ratio: 16/9;
      border-radius: 8px; overflow: hidden; background: var(--paper);
      box-shadow: 0 30px 60px -25px color-mix(in srgb, var(--ink) 30%, transparent);
    }
    .lb-map-wrap iframe { width: 100%; height: 100%; border: 0; filter: saturate(0.8) sepia(0.15); }
    .lb-map-card {
      position: absolute; bottom: 24px; left: 24px; max-width: 380px;
      background: var(--bg); border-radius: 6px; padding: 24px;
      box-shadow: 0 12px 30px color-mix(in srgb, var(--ink) 18%, transparent);
    }
    .lb-map-title { font-family: var(--display); font-size: 26px; margin-bottom: 12px; }
    .lb-map-addr { font-size: 14px; line-height: 1.5; color: var(--muted); margin-bottom: 16px; }
    .lb-map-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 18px; background: var(--ink); color: var(--bg); border-radius: 3px;
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
      transition: background 0.2s;
    }
    .lb-map-btn:hover { background: var(--accent); }

    /* hours strip */
    .lb-hours {
      padding: 64px 48px; display: grid; grid-template-columns: auto 1fr; gap: 64px; align-items: center;
    }
    .lb-hours h3 { font-size: 56px; line-height: 1; font-style: italic; color: var(--accent); }
    .lb-hours-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
    .lb-hours-cell { display: flex; flex-direction: column; gap: 4px; padding-left: 16px; border-left: 2px solid var(--rule); }
    .lb-hours-day { font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
    .lb-hours-time { font-family: var(--display); font-size: 26px; }

    /* friends wall (customer + owner photos) */
    .lb-friends-wall {
      padding: 16px 48px 80px;
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 56px 32px;
    }
    .lb-polaroid {
      background: #fdfbf3;
      padding: 12px 12px 8px;
      border-radius: 2px;
      box-shadow:
        0 20px 40px -15px color-mix(in srgb, var(--ink) 28%, transparent),
        0 2px 8px color-mix(in srgb, var(--ink) 10%, transparent);
      position: relative;
      transform: rotate(var(--r, 0deg));
      transition: transform 0.35s cubic-bezier(.2,.7,.3,1), box-shadow 0.3s;
    }
    .lb-polaroid:hover {
      transform: rotate(0deg) translateY(-10px) scale(1.03);
      z-index: 3;
      box-shadow:
        0 32px 60px -20px color-mix(in srgb, var(--ink) 38%, transparent),
        0 4px 12px color-mix(in srgb, var(--ink) 14%, transparent);
    }
    .lb-polaroid:nth-child(4n+1) { --r: -2.5deg; }
    .lb-polaroid:nth-child(4n+2) { --r: 1.5deg; margin-top: 22px; }
    .lb-polaroid:nth-child(4n+3) { --r: -1deg; margin-top: 8px; }
    .lb-polaroid:nth-child(4n+4) { --r: 2.4deg; margin-top: 30px; }
    .lb-polaroid::before {
      content: ''; position: absolute; top: -10px; left: 50%;
      transform: translateX(-50%) rotate(-3deg);
      width: 72px; height: 18px;
      background: color-mix(in srgb, var(--accent) 24%, #fff);
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    }
    .lb-polaroid image-slot {
      display: block; width: 100%; aspect-ratio: 4/5;
      background: #e9dfc8;
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.05em;
    }
    .lb-polaroid-cap {
      display: flex; align-items: baseline; gap: 8px;
      padding: 14px 6px 6px;
      font-family: var(--display); font-style: italic; font-size: 16px; color: #2a1e14;
      border-top: 1px dashed rgba(0,0,0,0.08); margin-top: 6px;
    }
    .lb-polaroid-flag { font-size: 18px; font-style: normal; }
    .lb-polaroid-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .lb-polaroid-date {
      font-family: var(--mono); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase;
      color: rgba(0,0,0,0.42); font-style: normal;
    }
    .lb-friends-sub {
      font-family: var(--mono); font-size: 12px; letter-spacing: 0.06em;
      color: var(--muted); margin-top: 14px; display: flex; align-items: center; gap: 10px;
    }
    .lb-friends-sub::before { content: '✪'; color: var(--accent); font-size: 14px; }

    /* foot */
    .lb-foot {
      padding: 48px 48px 36px; border-top: 1px dashed var(--rule);
      display: grid; grid-template-columns: 1fr auto 1fr; gap: 24px; align-items: center;
    }
    .lb-foot-l { font-family: var(--display); font-style: italic; font-size: 18px; color: var(--muted); }
    .lb-foot-c { font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); }
    .lb-foot-r { font-family: var(--mono); font-size: 11px; color: var(--muted); text-align: right; }

    /* entry */
    .lb-fade { opacity: 0; transform: translateY(16px); animation: lb-fade 0.7s 0.1s forwards cubic-bezier(.2,.7,.3,1); }
    @keyframes lb-fade { to { opacity: 1; transform: none; } }

    /* IntersectionObserver-applied fade-up (sections add .in-view) */
    .lb-section, .lb-about, .lb-reviews, .lb-visit, .lb-hours, .lb-friends-wall,
    .owner, .pay, .stories {
      opacity: 0; transform: translateY(24px);
      transition: opacity 0.7s cubic-bezier(.2,.7,.3,1), transform 0.7s cubic-bezier(.2,.7,.3,1);
    }
    .in-view, .lb-section.in-view, .lb-about.in-view, .lb-reviews.in-view,
    .lb-visit.in-view, .lb-hours.in-view, .lb-friends-wall.in-view,
    .owner.in-view, .pay.in-view, .stories.in-view {
      opacity: 1; transform: none;
    }
    /* sections above the fold should be visible immediately */
    .lb-hero, .lb-langbar, .lb-nav { opacity: 1; transform: none; }

    .lb-nav-mid { display: flex; align-items: center; gap: 12px; }

    /* ─── Mobile responsive ─────────────────────────────────────────────── */
    @media (max-width: 900px) {
      .lb { font-size: 14px; }
      .lb-langbar { padding: 8px 12px; }
      .langbtn { padding: 5px 8px; font-size: 10px; }
      .langbtn-label { display: none; }

      .lb-nav { padding: 14px 20px; gap: 12px; flex-wrap: wrap; }
      .lb-logo-mark { width: 36px; height: 36px; font-size: 18px; }
      .lb-logo-text { font-size: 18px; }
      .lb-logo-sub { font-size: 9px; }
      .lb-nav-mid { order: 3; width: 100%; justify-content: center; padding-top: 4px; }
      .lb-navlinks { gap: 14px; font-size: 10px; }

      .lb-hero { grid-template-columns: 1fr; padding: 24px 20px 36px; gap: 32px; }
      .lb-hero h1 { font-size: 48px; line-height: 1; }
      .lb-hero-sub { font-size: 15px; }
      .lb-hero-stamp { width: 78px; height: 78px; left: 8px; top: -8px; font-size: 8px; }
      .lb-hero-card { max-width: 100%; margin-left: 0; transform: rotate(0deg); }
      .lb-btn { padding: 11px 18px; font-size: 11px; }

      .lb-section { padding: 48px 20px; }
      .lb-section-head h2,
      .lb-section h2 { font-size: 36px !important; }

      .lb-menu-layout { grid-template-columns: 1fr; gap: 16px; }
      .lb-cats-rail {
        position: relative; top: auto;
        flex-direction: row; overflow-x: auto; gap: 6px;
        padding: 4px 0 8px; scrollbar-width: none;
      }
      .lb-cats-rail::-webkit-scrollbar { display: none; }
      .lb-rail-head { display: none; }
      .lb-cat { flex: 0 0 auto; padding: 8px 14px; border-bottom: none;
        border-radius: 999px; background: color-mix(in srgb, var(--ink) 5%, transparent); }
      .lb-cat:hover { padding-left: 14px; }
      .lb-cat.active { background: var(--ink); color: var(--bg); }
      .lb-cat.active::before { content: ''; }
      .lb-cat-count { display: none; }

      .lb-features-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
      .lb-feature-name { font-size: 16px; padding: 10px 12px 2px; }
      .lb-feature-foot { padding: 0 12px 10px; font-size: 9px; }
      .lb-feature-price { font-size: 16px; }

      .lb-cat-title { font-size: 32px; }
      .lb-item { grid-template-columns: 92px 1fr auto; gap: 14px; padding: 10px 12px; }
      .lb-item-img { width: 92px; }
      .lb-item-name { font-size: 18px; }
      .lb-item-price { font-size: 16px; }
      .lb-item.highlight { padding-left: 14px; }

      .lb-about { padding: 56px 20px; }
      .lb-about-grid { grid-template-columns: 1fr; gap: 28px; }
      .lb-about h2 { font-size: 36px; }
      .lb-about-body { font-size: 15px; }
      .lb-about-imgs > div:first-child { transform: rotate(-2deg); }
      .lb-about-imgs > div:last-child { transform: rotate(2deg); }
      .lb-quote { font-size: 17px; }

      .lb-reviews { padding: 48px 20px; }
      .lb-reviews-grid { grid-template-columns: 1fr; gap: 20px; }
      .lb-postcard:nth-child(n) { transform: rotate(0deg) !important; }

      .lb-friends-wall { grid-template-columns: 1fr 1fr; gap: 28px 14px; padding: 16px 20px 48px; }
      .lb-polaroid:nth-child(n) { transform: rotate(0deg) !important; margin-top: 0 !important; }

      .lb-visit .lb-section { padding-bottom: 16px; }
      .lb-map-wrap { margin: 0 20px; aspect-ratio: 4/3; }
      .lb-map-card { position: static; max-width: none; margin: 16px 20px 0;
        box-shadow: 0 8px 20px color-mix(in srgb, var(--ink) 14%, transparent); }

      .lb-hours { padding: 36px 20px; grid-template-columns: 1fr; gap: 20px; }
      .lb-hours h3 { font-size: 36px; }
      .lb-hours-grid { grid-template-columns: 1fr; gap: 12px; }
      .lb-hours-cell { padding-left: 12px; }
      .lb-hours-time { font-size: 22px; }

      .lb-foot { flex-direction: column; padding: 32px 20px; gap: 8px;
        grid-template-columns: 1fr; text-align: center; }
      .lb-foot-r { text-align: center; }

      /* features.jsx components */
      .stories { padding: 24px 20px 0; }
      .story { flex: 0 0 64px; }
      .story-ring { width: 64px; height: 64px; }

      .owner { padding: 56px 20px; }
      .owner-grid { grid-template-columns: 1fr; gap: 28px; }
      .owner-title { font-size: 32px; }
      .owner-body { font-size: 15px; }
      .owner-stamp { width: 80px; height: 80px; font-size: 9px; right: -8px; bottom: -8px; }

      .pay { padding: 48px 20px; }
      .pay-title { font-size: 32px; }
      .pay-row { grid-template-columns: 1fr; gap: 14px; max-width: 320px; }

      .cta-bar { grid-template-columns: 1fr 1fr; }
      .cta-btn-text {  }
      .cta-btn { padding: 12px 8px; font-size: 11px; letter-spacing: 0.06em; }

      .promo { font-size: 10px; padding: 6px 10px; gap: 8px; }
      .promo-text { font-size: 10px; }
    }

    @media (max-width: 480px) {
      .lb-nav { padding: 12px 16px; }
      .lb-navlinks { gap: 10px; }
      .lb-hero h1 { font-size: 40px; }
      .lb-section h2 { font-size: 30px !important; }
      .lb-cat-title { font-size: 26px; }
      .lb-item { grid-template-columns: 76px 1fr; }
      .lb-item-price { grid-column: 2; justify-self: end; margin-top: 4px; font-size: 14px; }
      .lb-item-img { width: 76px; }
      .lb-features-grid { grid-template-columns: 1fr; }
      .cta-btn-text { font-size: 10px; }
    }

    /* ─── Print stylesheet (clean PDF menu) ─────────────────────────────── */
    @media print {
      .lb-langbar, .lb-nav, .lb-hero, .lb-marquee,
      .stories, .owner, .lb-reviews, .lb-friends-wall, .lb-visit,
      .pay, .lb-foot, .cta-bar, .cta-bar-spacer, .scrollprog, .promo,
      .lb-features, .lb-search, .lb-cats-rail { display: none !important; }
      .lb {
        background: white !important; color: black !important;
        max-width: none; box-shadow: none;
      }
      .lb-section { page-break-after: always; padding: 24px 32px; opacity: 1; transform: none; }
      .lb-section h2 { font-size: 36px; color: black; }
      .lb-menu-layout { display: block; }
      .lb-cat-block { page-break-inside: avoid; margin-bottom: 28px; }
      .lb-cat-title { color: black; font-size: 24px; }
      .lb-item { background: none !important; border-left: none !important; padding: 8px 0;
        display: grid; grid-template-columns: 1fr auto; gap: 12px; }
      .lb-item-img { display: none; }
      .lb-item-name { font-size: 15px; color: black; }
      .lb-item-sub { color: #666; }
      .lb-item-price { color: black; font-size: 15px; }
      .lb-item-badge { background: white !important; color: black !important;
        border: 1px solid black; }
      .lb-hours { display: block; padding: 12px 32px; }
    }
  `;

  return (
    <div className="lb">
      <style>{css}</style>
      <ScrollProgress />
      <PromoBanner t={t} />

      {/* TOP LANG BAR — all 6 language buttons inline */}
      <div className="lb-langbar">
        <span className="lb-langbar-label">{t.nav_menu === 'Menu' ? 'Language' : 'Language / ' + t.nav_menu}</span>
        <LangPicker variant="b" />
      </div>

      {/* NAV */}
      <nav className="lb-nav">
        <a className="lb-logo" href="#top">
          <div className="lb-logo-mark">39</div>
          <div>
            <div className="lb-logo-text">Cafe Trente-Neuf</div>
            <div className="lb-logo-sub">Saigon · Est. 2019</div>
          </div>
        </a>
        <div className="lb-nav-mid"><OpenNow t={t} /></div>
        <div className="lb-navlinks">
          {sec("menu") && <a href="#menu">{t.nav_menu}</a>}
          {sec("about") && <a href="#about">{t.nav_about}</a>}
          {sec("reviews") && <a href="#reviews">{t.nav_reviews}</a>}
          {sec("gallery") && <a href="#friends">{t.nav_gallery}</a>}
          {sec("visit") && <a href="#visit">{t.nav_visit}</a>}
        </div>
      </nav>

      <div className="lb-rule" />

      {/* HERO */}
      <section className="lb-hero lb-fade" id="top">
        <div className="lb-hero-l">
          <div className="lb-tape">Phin Brew · Real Vietnamese Coffee</div>
          <h1 style={{ marginTop: 28 }}>
            {t.hero_title.split("\n").map((l, i) => (
              <span key={i} style={{ display: 'block' }}>{i === 1 ? <em>{l}</em> : l}</span>
            ))}
          </h1>
          <div className="lb-hero-sub">{t.hero_sub}</div>
          <div className="lb-cta-row">
            <a href="#menu" className="lb-btn">{t.hero_cta} →</a>
            <a href="#visit" className="lb-btn ghost">{t.hero_cta2}</a>
          </div>
        </div>

        <div className="lb-hero-r">
          <div className="lb-hero-stamp">
            ★ ★ ★ ★ ★<br />
            <span style={{ fontSize: 11, fontWeight: 600 }}>4.9 / 5</span><br />
            500+ reviews
          </div>
          <div className="lb-hero-card">
            <div className="lb-hero-card-img">
            {HERO_ITEMS.map((it, i) => (
              <img
                key={it.id}
                src={it.img}
                alt={it.names.en}
                style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'cover',
                  opacity: i === heroIdx ? 1 : 0,
                  transition: 'opacity 0.8s ease',
                }}
              />
            ))}
          </div>
          <div className="lb-hero-card-cap">
            <span>House signature</span>
            <span>{heroItem.price}k{t.menu_currency}</span>
          </div>
          <div className="lb-hero-card-name">{heroItem.names[lang] || heroItem.names.en}</div>
          </div>
        </div>
      </section>

      <div className="lb-rule" />

      {/* STORIES STRIP — IG-style circular image-slots */}
      <StoriesStrip t={t} />

      {/* MENU */}
      {sec("menu") && (
      <section className="lb-section" id="menu">
        <div className="lb-section-head">
          <div className="lb-section-eyebrow">{t.menu_eyebrow} · {MENU.reduce((a, c) => a + c.items.length, 0)} items</div>
          <h2><em>{t.menu_title}</em></h2>
        </div>

        {menuLayout === 'list' && (
        <div className="lb-menu-layout">
          <div className="lb-cats-rail">
            <div className="lb-rail-head">{t.nav_menu}</div>
            {MENU.map((cat) => (
              <button
                key={cat.id}
                className={`lb-cat ${activeCat === cat.id ? 'active' : ''}`}
                onClick={() => jumpTo(cat.id)}
              >
                <span>{t[`cat_${cat.id}`] || cat.id}</span>
                <span className="lb-cat-count">{cat.items.length}</span>
              </button>
            ))}
          </div>

          <div>
            {/* SEARCH */}
            <div className="lb-search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder={t.search_placeholder || 'Search the menu…'}
              />
              {searchQ.trim() && (
                <button className="lb-search-clear" onClick={() => setSearchQ('')} aria-label="Clear search">×</button>
              )}
            </div>

            {/* FEATURES STRIP — hidden when searching */}
            {!searchQ.trim() && (() => {
              const features = MENU.flatMap((c) =>
                c.items.filter((it) => it.highlight).map((it) => ({ ...it, catId: c.id }))
              );
              if (!features.length) return null;
              return (
                <div className="lb-features">
                  <div className="lb-features-head">
                    <span className="lb-features-eyebrow">Loved by locals</span>
                    <span className="lb-features-rule" />
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                      {features.length} picks
                    </span>
                  </div>
                  <div className="lb-features-grid">
                    {features.map((it) => (
                      <a
                        key={it.id}
                        href={`#menu-${it.catId}`}
                        className="lb-feature"
                        onClick={(e) => { e.preventDefault(); jumpTo(it.catId); }}
                      >
                        <div className="lb-feature-img">
                          <img src={it.img} alt={it.names.en} loading="lazy" />
                          <div className="lb-feature-tag">{it.highlight}</div>
                        </div>
                        <div className="lb-feature-name">{it.names[lang] || it.names.en}</div>
                        <div className="lb-feature-foot">
                          <span>{t[`cat_${it.catId}`] || it.catId}</span>
                          <span className="lb-feature-price">{it.price}{t.menu_currency}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })()}

            {(() => {
              const q = searchQ.trim().toLowerCase();
              const match = (it) => !q || Object.values(it.names).some((n) => n && n.toString().toLowerCase().includes(q));
              const visibleCats = MENU.map((cat) => ({ ...cat, items: cat.items.filter(match) }))
                .filter((c) => c.items.length);
              if (q && !visibleCats.length) {
                return <div className="lb-noresult">{t.search_no_results || 'Nothing matches that — try another word.'}</div>;
              }
              return visibleCats.map((cat) => (
                <div
                  key={cat.id}
                  className="lb-cat-block"
                  data-cat={cat.id}
                  id={`menu-${cat.id}`}
                  ref={(el) => { blockRefs.current[cat.id] = el; }}
                >
                  <div className="lb-cat-head">
                    <div className="lb-cat-title">
                      <span>{cat.icon}</span>
                      <em>{t[`cat_${cat.id}`] || cat.id}</em>
                    </div>
                    <div className="lb-cat-num">{String(cat.items.length).padStart(2, '0')} items</div>
                  </div>
                  <div className="lb-items">
                    {cat.items.map((it) => (
                      <div key={it.id} className={`lb-item ${it.highlight ? 'highlight' : ''}`}>
                        <div className="lb-item-img">
                          <img src={it.img} alt={it.names.en} loading="lazy" />
                        </div>
                        <div className="lb-item-mid">
                          {(it.highlight || it.badge) && (
                            <div className={`lb-item-badge ${it.highlight ? 'is-hl' : ''}`} style={{ alignSelf: 'flex-start' }}>
                              {it.badge ? '★ ' : ''}{it.highlight || 'Must Try'}
                            </div>
                          )}
                          <div className="lb-item-name">{it.names[lang] || it.names.en}</div>
                          <div className="lb-item-sub">
                            {it.names.vi && it.names.vi !== (it.names[lang] || it.names.en) ? it.names.vi : (it.notes?.en || (t[`cat_${cat.id}`] || cat.id))}
                          </div>
                        </div>
                        <div className="lb-item-price">{it.price}{t.menu_currency}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
        )}
        {menuLayout === 'sticky'    && <MenuSticky    lang={lang} t={t} blockRefs={blockRefs} />}
        {menuLayout === 'carousel'  && <MenuCarousel  lang={lang} t={t} blockRefs={blockRefs} />}
        {menuLayout === 'bento'     && <MenuBento     lang={lang} t={t} blockRefs={blockRefs} />}
        {menuLayout === 'vintage'   && <MenuVintage   lang={lang} t={t} blockRefs={blockRefs} />}
        {menuLayout === 'spotlight' && <MenuSpotlight lang={lang} t={t} blockRefs={blockRefs} />}
      </section>
      )}

      {/* ABOUT */}
      {sec("about") && (
      <section className="lb-about" id="about">
        <div className="lb-about-grid">
          <div>
            <div className="lb-section-eyebrow">{t.about_eyebrow}</div>
            <h2 style={{ marginTop: 16 }}>{t.about_title}</h2>
            <div className="lb-about-body">{t.about_body}</div>
            <div className="lb-quote">"{REVIEWS[0].body[lang] || REVIEWS[0].body.en}"
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 12, fontStyle: 'normal', color: 'var(--muted)' }}>— {REVIEWS[0].name}, regular</div>
            </div>
          </div>
          <div className="lb-about-imgs">
            <div><img src={MENU[0].items[0].img} alt="" /></div>
            <div><img src={MENU[2].items[3].img} alt="" /></div>
          </div>
        </div>
      </section>
      )}

      {/* OWNER STORY */}
      <OwnerStory t={t} />

      {/* REVIEWS */}
      {sec("reviews") && (
      <section className="lb-reviews" id="reviews">
        <div className="lb-section-head">
          <div className="lb-section-eyebrow">{t.reviews_eyebrow}</div>
          <h2>{t.reviews_title.replace(/\.$/, '')} <em>★ 4.9</em></h2>
        </div>
        <div className="lb-reviews-grid">
          {REVIEWS.map((r, i) => (
            <div key={i} className="lb-postcard">
              <div className="lb-pc-stars">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
              <div className="lb-pc-body">{r.body[lang] || r.body.en}</div>
              <div className="lb-pc-foot">
                <span className="lb-pc-name">{r.name}</span>
                <span>{r.date}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a className="lb-btn ghost" href={GOOGLE_MAPS_URL} target="_blank" rel="noopener">{t.reviews_more} →</a>
        </div>
      </section>
      )}

      {/* FRIENDS WALL (customers + owner) — right after reviews */}
      {sec("gallery") && (
      <section id="friends">
        <div className="lb-section" style={{ paddingBottom: 16 }}>
          <div className="lb-section-eyebrow">{t.gallery_eyebrow}</div>
          <h2><em>{t.gallery_title}</em></h2>
          <div className="lb-friends-sub">{t.friends_sub || 'Drop your customer photos onto the cards — they save here.'}</div>
        </div>
        <div className="lb-friends-wall">
          {FRIENDS.map((f) => (
            <div key={f.id} className="lb-polaroid">
              <image-slot
                id={`friend-${f.id}`}
                placeholder={f.placeholder}
                shape="rect"
              ></image-slot>
              <div className="lb-polaroid-cap">
                <span className="lb-polaroid-flag">{f.flag}</span>
                <span className="lb-polaroid-name">{f.name}</span>
                <span className="lb-polaroid-date">{f.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* VISIT */}
      {sec("visit") && (
      <section className="lb-visit" id="visit">
        <div className="lb-section" style={{ paddingBottom: 32 }}>
          <div className="lb-section-eyebrow">{t.visit_eyebrow}</div>
          <h2>{t.visit_title}</h2>
        </div>
        <div className="lb-map-wrap">
          <iframe src={GOOGLE_MAPS_EMBED} loading="lazy" title="Map" />
          <div className="lb-map-card">
            <div className="lb-map-title">Cafe 39</div>
            <div className="lb-map-addr">
              39 Đường Lê Lợi<br />
              Quận 1, TP. Hồ Chí Minh, Vietnam<br />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>+84 28 1234 5678</span>
            </div>
            <a className="lb-map-btn" href={GOOGLE_MAPS_URL} target="_blank" rel="noopener">{t.visit_dir} →</a>
          </div>
        </div>
      </section>
      )}

      {/* PAYMENT QR */}
      <PaymentQR t={t} />

      {/* HOURS */}
      {sec("hours") && (
      <section className="lb-hours">
        <h3><em>{t.hours_title}</em></h3>
        <div className="lb-hours-grid">
          <div className="lb-hours-cell">
            <span className="lb-hours-day">{t.hours_mf}</span>
            <span className="lb-hours-time">{t.hours_mf_time}</span>
          </div>
          <div className="lb-hours-cell">
            <span className="lb-hours-day">{t.hours_sat}</span>
            <span className="lb-hours-time">{t.hours_sat_time}</span>
          </div>
          <div className="lb-hours-cell">
            <span className="lb-hours-day">{t.hours_sun}</span>
            <span className="lb-hours-time">{t.hours_sun_time}</span>
          </div>
        </div>
      </section>
      )}

      {/* FOOT */}
      <footer className="lb-foot">
        <div className="lb-foot-l">{t.foot_tag}</div>
        <div className="lb-foot-c">◆ ◆ ◆</div>
        <div className="lb-foot-r">{t.foot_copy}</div>
      </footer>

      <CTABar t={t} />
    </div>
  );
}

window.LandingB = LandingB;
