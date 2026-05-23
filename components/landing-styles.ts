export const landingStyles = `
    .lb {
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

    /* scroll progress */
    .scrollprog {
      position: fixed; top: 0; left: 0; right: 0; height: 2px;
      background: transparent; z-index: 200; pointer-events: none;
    }
    .scrollprog::after {
      content: ''; display: block; height: 100%;
      width: calc(var(--scroll-pct, 0) * 100%);
      background: linear-gradient(to right, var(--accent), color-mix(in srgb, var(--accent) 70%, var(--ink)));
      transition: width 0.05s linear;
    }

    /* promo banner */
    .promo {
      background: var(--ink); color: var(--bg);
      padding: 8px 16px; display: flex; align-items: center; gap: 12px;
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em;
    }
    .promo-tag { color: var(--accent); }
    .promo-text { flex: 1; text-align: center; }
    .promo-x {
      background: transparent; border: none;
      color: color-mix(in srgb, var(--bg) 60%, transparent);
      font-size: 18px; cursor: pointer; padding: 0 4px; line-height: 1;
    }
    .promo-x:hover { color: var(--bg); }

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
      display: flex; align-items: center; justify-content: space-between; gap: 16px;
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
    .lb-nav-mid { display: flex; align-items: center; gap: 12px; }
    .lb-navlinks {
      display: flex; gap: 28px; font-family: var(--mono);
      font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted);
    }
    .lb-navlinks a { transition: color 0.15s; }
    .lb-navlinks a:hover { color: var(--accent); }

    /* OpenNow */
    .opennow {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 6px 12px; border-radius: 999px;
      font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em;
      text-transform: uppercase;
      background: color-mix(in srgb, var(--ink) 6%, transparent);
    }
    .opennow.is-open { color: #1f8a5b; }
    .opennow.is-open .opennow-dot {
      background: #2cb67d;
      animation: opennow-pulse 2s ease-out infinite;
    }
    .opennow.is-closed { color: var(--muted); }
    .opennow.is-closed .opennow-dot { background: var(--muted); }
    .opennow-dot { width: 7px; height: 7px; border-radius: 50%; flex: 0 0 auto; }
    .opennow-sub { color: var(--muted); }
    @keyframes opennow-pulse {
      0% { box-shadow: 0 0 0 0 rgba(44,182,125,0.4); }
      70% { box-shadow: 0 0 0 8px rgba(44,182,125,0); }
      100% { box-shadow: 0 0 0 0 rgba(44,182,125,0); }
    }

    /* hero */
    .lb-hero {
      padding: 40px 48px 64px;
      display: grid; grid-template-columns: 1fr 1.1fr; gap: 56px; align-items: end;
    }
    .lb-hero-l { padding-bottom: 24px; }
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
      position: relative;
      background: var(--paper); border-radius: 6px; padding: 16px; transform: rotate(2deg);
      box-shadow: 0 30px 60px -20px color-mix(in srgb, var(--ink) 25%, transparent),
                  0 2px 6px color-mix(in srgb, var(--ink) 10%, transparent);
      max-width: 460px; margin-left: auto;
    }
    .lb-hero-card-img { aspect-ratio: 1/1; border-radius: 3px; overflow: hidden; position: relative; }
    .lb-hero-card-img img { width: 100%; height: 100%; object-fit: cover; }
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
      position: absolute; top: -40px; right: -40px; width: 124px; height: 124px;
      border: 2px solid var(--accent); color: var(--accent); border-radius: 50%;
      display: grid; place-items: center; text-align: center; padding: 8px;
      font-family: var(--mono); font-size: 8px; letter-spacing: 0.04em; text-transform: uppercase;
      transform: rotate(-12deg); line-height: 1.3;
      background: color-mix(in srgb, var(--bg) 92%, transparent);
      z-index: 5;
      box-shadow: 0 4px 12px color-mix(in srgb, var(--ink) 14%, transparent);
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

    /* stories strip */
    .stories { padding: 32px 48px 0; }
    .stories-eyebrow {
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.2em;
      text-transform: uppercase; color: var(--accent);
      display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
    }
    .stories-eyebrow::after {
      content: ''; flex: 1; height: 1px;
      background: linear-gradient(to right, var(--accent), transparent); opacity: 0.5;
    }
    .stories-row {
      display: flex; gap: 18px; overflow-x: auto;
      padding: 4px 0 14px; scroll-snap-type: x mandatory;
      scrollbar-width: none;
    }
    .stories-row::-webkit-scrollbar { display: none; }
    .story {
      flex: 0 0 76px; display: flex; flex-direction: column;
      align-items: center; gap: 8px; scroll-snap-align: start;
    }
    .story-ring {
      width: 76px; height: 76px; border-radius: 50%;
      padding: 3px;
      background: conic-gradient(from 0deg, var(--accent), color-mix(in srgb, var(--accent) 40%, var(--ink)), var(--accent));
      transition: transform 0.2s;
    }
    .story:hover .story-ring { transform: scale(1.05); }
    .story-slot {
      width: 100%; height: 100%; border-radius: 50%;
      background: var(--paper);
      border: 3px solid var(--bg);
      overflow: hidden;
    }
    .story-label {
      font-family: var(--mono); font-size: 10px; letter-spacing: 0.06em;
      text-transform: uppercase; color: var(--muted); max-width: 76px;
      text-align: center; overflow: hidden; text-overflow: ellipsis;
    }

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

    /* search */
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
    .lb-noresult {
      padding: 48px 0; text-align: center; color: var(--muted); font-style: italic;
      font-family: var(--display); font-size: 18px;
    }

    /* features strip */
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
      display: block;
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
    .lb-item-price { font-family: var(--display); font-size: 28px; color: var(--accent); font-variant-numeric: tabular-nums; white-space: nowrap; }
    .lb-item-badge {
      font-family: var(--mono); font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
      background: var(--accent); color: var(--bg); padding: 3px 8px; border-radius: 2px;
      align-self: flex-start; margin-bottom: 6px;
    }
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
    .lb-item-badge.is-hl { background: var(--ink); color: var(--bg); }

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

    /* owner story */
    .owner { padding: 80px 48px; }
    .owner-grid {
      display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 56px; align-items: center;
    }
    .owner-photo-wrap { position: relative; }
    .owner-photo-slot {
      width: 100%; aspect-ratio: 4/5;
      border-radius: 6px; background: var(--paper);
      box-shadow: 0 24px 50px -20px color-mix(in srgb, var(--ink) 28%, transparent);
      object-fit: cover;
    }
    .owner-stamp {
      position: absolute; bottom: -16px; right: -16px;
      width: 110px; height: 110px; border: 2px solid var(--accent);
      border-radius: 50%; color: var(--accent);
      display: grid; place-items: center; text-align: center;
      font-family: var(--mono); font-size: 12px; letter-spacing: 0.2em;
      background: color-mix(in srgb, var(--bg) 90%, transparent);
      transform: rotate(-8deg);
    }
    .owner-eyebrow {
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.2em;
      text-transform: uppercase; color: var(--accent); margin-bottom: 16px;
    }
    .owner-title {
      font-family: var(--display); font-size: 48px; line-height: 1.05;
      letter-spacing: -0.02em; margin: 0 0 24px; font-weight: 400;
    }
    .owner-body { font-size: 17px; line-height: 1.7; color: var(--muted); margin: 0 0 24px; max-width: 540px; }
    .owner-signoff {
      font-family: var(--display); font-style: italic; font-size: 22px;
      color: var(--accent);
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

    /* payment */
    .pay { padding: 64px 48px; }
    .pay-head { text-align: center; margin-bottom: 36px; }
    .pay-eyebrow {
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.2em;
      text-transform: uppercase; color: var(--accent);
    }
    .pay-title {
      font-family: var(--display); font-size: 48px; letter-spacing: -0.02em;
      font-weight: 400; margin: 12px 0 8px;
    }
    .pay-title em { font-style: italic; color: var(--accent); }
    .pay-sub { color: var(--muted); font-size: 15px; }
    .pay-row {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
      max-width: 720px; margin: 0 auto;
    }
    .pay-card {
      background: #fff; border-radius: 10px; padding: 18px 18px 16px;
      box-shadow: 0 14px 32px -16px color-mix(in srgb, var(--ink) 28%, transparent);
      text-align: center; color: #2a1e14;
    }
    .pay-card-head { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 12px; }
    .pay-card-dot { width: 10px; height: 10px; border-radius: 50%; }
    .pay-card-label {
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em;
      text-transform: uppercase; font-weight: 600;
    }
    .pay-qr {
      width: 100%; aspect-ratio: 1;
      background: white; border-radius: 6px; padding: 6px;
      box-shadow: inset 0 0 0 1px rgba(0,0,0,0.06);
    }
    .pay-card-sub {
      font-family: var(--mono); font-size: 10px; letter-spacing: 0.06em;
      color: rgba(0,0,0,0.5); margin-top: 10px;
    }

    /* hours strip */
    .lb-hours {
      padding: 64px 48px; display: grid; grid-template-columns: auto 1fr; gap: 64px; align-items: center;
    }
    .lb-hours h3 { font-size: 56px; line-height: 1; font-style: italic; color: var(--accent); }
    .lb-hours-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
    .lb-hours-cell { display: flex; flex-direction: column; gap: 4px; padding-left: 16px; border-left: 2px solid var(--rule); }
    .lb-hours-day { font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
    .lb-hours-time { font-family: var(--display); font-size: 26px; }

    /* friends wall */
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
    .lb-polaroid-img {
      display: grid; place-items: center; text-align: center;
      width: 100%; aspect-ratio: 4/5;
      background: #e9dfc8; color: rgba(0,0,0,0.4);
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.05em;
      padding: 12px;
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

    /* cta bar */
    .cta-bar {
      position: fixed; left: 50%; transform: translateX(-50%);
      bottom: max(16px, env(safe-area-inset-bottom));
      z-index: 100; max-width: 420px; width: calc(100% - 24px);
      display: grid; grid-template-columns: 1fr 1fr; gap: 6px;
      padding: 6px;
      background: var(--ink); border-radius: 999px;
      box-shadow: 0 12px 32px -8px rgba(0,0,0,0.4),
                  0 4px 12px -4px rgba(0,0,0,0.25),
                  inset 0 0 0 1px color-mix(in srgb, var(--bg) 12%, transparent);
      font-family: var(--mono);
    }
    .cta-bar-spacer { height: calc(76px + env(safe-area-inset-bottom)); }
    .cta-btn {
      display: inline-flex; align-items: center; justify-content: center;
      gap: 8px; padding: 12px 14px; border-radius: 999px;
      color: var(--bg); font-size: 12px; letter-spacing: 0.1em;
      text-transform: uppercase; font-weight: 500;
      transition: background 0.2s, transform 0.15s;
      white-space: nowrap;
    }
    .cta-btn:hover { transform: translateY(-1px); }
    .cta-call:hover { background: color-mix(in srgb, var(--accent) 40%, var(--ink)); }
    .cta-zalo { background: #0068ff; }
    .cta-zalo:hover { background: #2880ff; }
    .cta-zalo-mark {
      width: 18px; height: 18px; border-radius: 4px;
      background: #fff; color: #0068ff;
      display: grid; place-items: center; font-weight: 700; font-size: 11px;
    }
    .cta-btn svg { flex: 0 0 16px; }

    /* fade entry */
    .lb-fade { opacity: 0; transform: translateY(16px); animation: lb-fade 0.7s 0.1s forwards cubic-bezier(.2,.7,.3,1); }
    @keyframes lb-fade { to { opacity: 1; transform: none; } }

    /* IntersectionObserver fade-up */
    .lb-section, .lb-about, .lb-reviews, .lb-visit, .lb-hours, .lb-friends-wall, .owner, .pay, .stories {
      opacity: 0; transform: translateY(24px);
      transition: opacity 0.7s cubic-bezier(.2,.7,.3,1), transform 0.7s cubic-bezier(.2,.7,.3,1);
    }
    .lb-section.in-view, .lb-about.in-view, .lb-reviews.in-view,
    .lb-visit.in-view, .lb-hours.in-view, .lb-friends-wall.in-view,
    .owner.in-view, .pay.in-view, .stories.in-view {
      opacity: 1; transform: none;
    }
    .lb-hero, .lb-langbar, .lb-nav, .promo, #menu { opacity: 1; transform: none; }

    /* responsive */
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

      .opennow { font-size: 9px; padding: 5px 10px; }
      .opennow-sub { display: none; }

      .lb-hero { grid-template-columns: 1fr; padding: 24px 20px 36px; gap: 32px; }
      .lb-hero h1 { font-size: 48px; line-height: 1; }
      .lb-hero-sub { font-size: 15px; }
      .lb-hero-r { padding-top: 56px; }
      .lb-hero-stamp { width: 88px; height: 88px; top: -28px; right: -20px; left: auto; transform: rotate(-12deg); font-size: 8px; z-index: 5; }
      .lb-hero-card { max-width: 100%; margin-left: 0; transform: rotate(0deg); }
      .lb-btn { padding: 11px 18px; font-size: 11px; }

      .stories { padding: 24px 20px 0; }
      .story { flex: 0 0 64px; }
      .story-ring { width: 64px; height: 64px; }

      .lb-section { padding: 48px 20px; }
      .lb-section-head h2, .lb-section h2 { font-size: 36px; }

      .lb-menu-layout { grid-template-columns: 1fr; gap: 16px; }
      .lb-cats-rail {
        position: sticky; top: 0;
        flex-direction: row; overflow-x: auto; gap: 6px;
        padding: 8px 20px; scrollbar-width: none;
        margin: 0 -20px;
        background: var(--bg);
        z-index: 10;
        box-shadow: 0 1px 0 var(--rule);
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

      .owner { padding: 56px 20px; }
      .owner-grid { grid-template-columns: 1fr; gap: 28px; }
      .owner-title { font-size: 30px; }
      .owner-body { font-size: 15px; }
      .owner-stamp { width: 76px; height: 76px; font-size: 9px; right: -8px; bottom: -8px; }

      .lb-reviews { padding: 48px 20px; }
      .lb-reviews-grid { grid-template-columns: 1fr; gap: 20px; }
      .lb-postcard:nth-child(n) { transform: rotate(0deg) !important; }

      .lb-friends-wall { grid-template-columns: 1fr 1fr; gap: 28px 14px; padding: 16px 20px 48px; }
      .lb-polaroid:nth-child(n) { transform: rotate(0deg) !important; margin-top: 0 !important; }

      .lb-visit .lb-section { padding-bottom: 16px; }
      .lb-map-wrap { margin: 0 20px; aspect-ratio: 4/3; }
      .lb-map-card { position: static; max-width: none; margin: 16px 20px 0;
        box-shadow: 0 8px 20px color-mix(in srgb, var(--ink) 14%, transparent); }

      .pay { padding: 48px 20px; }
      .pay-row { grid-template-columns: 1fr; max-width: 320px; gap: 14px; }
      .pay-title { font-size: 32px; }

      .lb-hours { padding: 36px 20px; grid-template-columns: 1fr; gap: 20px; }
      .lb-hours h3 { font-size: 36px; }
      .lb-hours-grid { grid-template-columns: 1fr; gap: 12px; }
      .lb-hours-cell { padding-left: 12px; }
      .lb-hours-time { font-size: 22px; }

      .lb-foot { padding: 32px 20px; grid-template-columns: 1fr; text-align: center; }
      .lb-foot-r { text-align: center; }

      .cta-bar { width: calc(100% - 16px); padding: 5px; gap: 4px; }
      .cta-btn { padding: 11px 6px; font-size: 10px; letter-spacing: 0.04em; gap: 6px; }
      .cta-btn svg { flex: 0 0 14px; width: 14px; height: 14px; }
      .cta-zalo-mark { width: 16px; height: 16px; font-size: 10px; }

      .promo { font-size: 10px; padding: 6px 10px; gap: 8px; }
    }

    @media (max-width: 480px) {
      .lb-nav { padding: 12px 16px; }
      .lb-navlinks { gap: 10px; }
      .lb-hero h1 { font-size: 40px; }
      .lb-section h2 { font-size: 30px; }
      .lb-cat-title { font-size: 26px; }
      .lb-item { grid-template-columns: 76px 1fr; }
      .lb-item-price { grid-column: 2; justify-self: end; margin-top: 4px; font-size: 14px; }
      .lb-item-img { width: 76px; }
      .lb-features-grid { grid-template-columns: 1fr; }
    }

    @media (max-width: 380px) {
      .cta-btn-text { display: none; }
      .cta-btn { padding: 13px 0; justify-content: center; }
    }
`;
