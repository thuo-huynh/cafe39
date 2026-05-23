// menu-layouts.jsx — alternate menu renderers for LandingB.
// Each exports a component taking { lang, t, blockRefs } and renders the menu body.
// blockRefs is shared with the sticky rail's scroll-spy in LandingB.

const { useState, useEffect, useRef, useMemo } = React;

// ─── A · Sticky photo + scrolling list ──────────────────────────────────────
// Big photo on the left stays put while items scroll on the right.
// Hover an item or scroll past it → the photo + caption swap to that drink.
function MenuSticky({ lang, t, blockRefs }) {
  const all = useMemo(() => MENU.flatMap((c) => c.items.map((it) => ({ ...it, catId: c.id }))), []);
  const [active, setActive] = useState(all[0]);
  const itemRefs = useRef({});

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const v = entries.filter((e) => e.isIntersecting);
        if (!v.length) return;
        v.sort((a, b) => Math.abs(a.boundingClientRect.top - 200) - Math.abs(b.boundingClientRect.top - 200));
        const id = v[0].target.dataset.it;
        const item = all.find((x) => x.id === id);
        if (item) setActive(item);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    Object.values(itemRefs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [all]);

  const css = `
    .ms-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; }
    .ms-photo { position: sticky; top: 90px; align-self: start;
      aspect-ratio: 4/5; border-radius: 8px; overflow: hidden;
      background: var(--paper);
      box-shadow: 0 30px 60px -25px color-mix(in srgb, var(--ink) 30%, transparent);
    }
    .ms-photo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
      animation: ms-fade .5s ease both; }
    @keyframes ms-fade { from { opacity: 0; transform: scale(1.04); } to { opacity: 1; transform: scale(1); } }
    .ms-cap { position: absolute; left: 0; right: 0; bottom: 0; padding: 22px 22px 20px;
      background: linear-gradient(to top, rgba(0,0,0,0.55), transparent);
      color: #fff; font-family: var(--display); }
    .ms-cap-eyebrow { font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em;
      text-transform: uppercase; opacity: 0.7; margin-bottom: 4px; }
    .ms-cap-name { font-size: 30px; font-style: italic; line-height: 1.1; }
    .ms-cap-price { display: inline-block; margin-left: 8px; font-style: normal;
      font-size: 18px; color: color-mix(in srgb, var(--accent) 80%, #fff); }
    .ms-list { display: flex; flex-direction: column; gap: 12px; padding-bottom: 200px; }
    .ms-cat-head { display: flex; align-items: baseline; gap: 14px; margin-top: 36px;
      padding-bottom: 10px; border-bottom: 1px solid var(--rule); }
    .ms-cat-head:first-child { margin-top: 0; }
    .ms-cat-title { font-family: var(--display); font-size: 36px; line-height: 1;
      letter-spacing: -0.01em; }
    .ms-cat-title em { font-style: italic; color: var(--accent); }
    .ms-cat-num { font-family: var(--mono); font-size: 10px; letter-spacing: 0.18em;
      text-transform: uppercase; color: var(--muted); margin-left: auto; }
    .ms-it { display: grid; grid-template-columns: 24px 1fr auto; align-items: baseline;
      gap: 14px; padding: 14px 4px; border-bottom: 1px dashed var(--rule);
      cursor: pointer; transition: padding-left .15s, color .15s; }
    .ms-it:hover, .ms-it.active { padding-left: 12px; }
    .ms-it.active .ms-it-name { color: var(--accent); }
    .ms-it-num { font-family: var(--mono); font-size: 11px; color: var(--muted); }
    .ms-it-name { font-family: var(--display); font-size: 22px; line-height: 1.15; transition: color .15s; }
    .ms-it-sub { font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--muted); margin-top: 2px; }
    .ms-it-price { font-family: var(--display); font-size: 20px; color: var(--accent);
      font-variant-numeric: tabular-nums; white-space: nowrap; }
    .ms-it-badge { display: inline-block; margin-left: 8px; font-family: var(--mono);
      font-size: 9px; letter-spacing: 0.12em; padding: 2px 6px; border-radius: 2px;
      background: var(--accent); color: var(--bg); vertical-align: middle; }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="ms-wrap">
        <div className="ms-photo">
          <img key={active.id} src={active.img} alt={active.names.en} />
          <div className="ms-cap">
            <div className="ms-cap-eyebrow">{t[`cat_${active.catId}`] || active.catId}</div>
            <div className="ms-cap-name">
              {active.names[lang] || active.names.en}
              <span className="ms-cap-price">{active.price}{t.menu_currency}</span>
            </div>
          </div>
        </div>
        <div className="ms-list">
          {MENU.map((cat) => (
            <div key={cat.id} data-cat={cat.id} id={`menu-${cat.id}`}
                 ref={(el) => { blockRefs.current[cat.id] = el; }}>
              <div className="ms-cat-head">
                <div className="ms-cat-title"><span>{cat.icon}</span> <em>{t[`cat_${cat.id}`] || cat.id}</em></div>
                <div className="ms-cat-num">{String(cat.items.length).padStart(2,'0')} items</div>
              </div>
              {cat.items.map((it, i) => (
                <div
                  key={it.id}
                  className={`ms-it ${active.id === it.id ? 'active' : ''}`}
                  data-it={it.id}
                  ref={(el) => { itemRefs.current[it.id] = el; }}
                  onMouseEnter={() => setActive(it)}
                >
                  <div className="ms-it-num">{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <div className="ms-it-name">
                      {it.names[lang] || it.names.en}
                      {it.badge && <span className="ms-it-badge">★</span>}
                    </div>
                    {it.names.vi && it.names.vi !== (it.names[lang] || it.names.en) && (
                      <div className="ms-it-sub">{it.names.vi}</div>
                    )}
                  </div>
                  <div className="ms-it-price">{it.price}{t.menu_currency}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── C · Horizontal carousel per category ──────────────────────────────────
// Each category becomes a horizontal scroll strip of large cards.
// Drag or scroll laterally; cards reveal more info on hover.
function MenuCarousel({ lang, t, blockRefs }) {
  const css = `
    .mc-wrap { display: flex; flex-direction: column; gap: 64px; }
    .mc-cat { }
    .mc-cat-head { display: flex; align-items: baseline; gap: 16px; padding: 0 0 18px;
      border-bottom: 1px solid var(--rule); margin-bottom: 24px; }
    .mc-cat-title { font-family: var(--display); font-size: 44px; line-height: 1; letter-spacing: -0.01em; }
    .mc-cat-title em { font-style: italic; color: var(--accent); }
    .mc-cat-meta { margin-left: auto; display: flex; align-items: center; gap: 14px;
      font-family: var(--mono); font-size: 10px; letter-spacing: 0.18em;
      text-transform: uppercase; color: var(--muted); }
    .mc-scroll { display: flex; gap: 18px; overflow-x: auto; padding: 6px 4px 24px;
      scroll-snap-type: x mandatory; scrollbar-width: thin;
      scrollbar-color: var(--accent) transparent; }
    .mc-scroll::-webkit-scrollbar { height: 6px; }
    .mc-scroll::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--accent) 60%, transparent); border-radius: 3px; }
    .mc-card { flex: 0 0 280px; scroll-snap-align: start; position: relative;
      border-radius: 10px; overflow: hidden; background: var(--paper);
      aspect-ratio: 3/4; transition: transform .3s; cursor: pointer;
      box-shadow: 0 10px 24px -12px color-mix(in srgb, var(--ink) 24%, transparent);
    }
    .mc-card:hover { transform: translateY(-6px) scale(1.02); }
    .mc-card img { position: absolute; inset: 0; width: 100%; height: 100%;
      object-fit: cover; transition: transform .6s ease, filter .3s; }
    .mc-card:hover img { transform: scale(1.06); filter: brightness(0.78); }
    .mc-card-grad { position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.12) 38%, transparent 60%); }
    .mc-card-body { position: absolute; left: 0; right: 0; bottom: 0; padding: 16px 18px 18px;
      color: #fff; font-family: var(--display); }
    .mc-card-name { font-size: 22px; line-height: 1.15; font-style: italic; }
    .mc-card-sub { font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em;
      text-transform: uppercase; opacity: 0.75; margin-top: 4px; }
    .mc-card-price { position: absolute; top: 12px; right: 12px;
      background: rgba(0,0,0,0.55); backdrop-filter: blur(8px); color: #fff;
      padding: 6px 10px; border-radius: 999px; font-family: var(--mono);
      font-size: 11px; letter-spacing: 0.06em; font-weight: 600; }
    .mc-card-badge { position: absolute; top: 12px; left: 12px;
      background: var(--accent); color: var(--bg);
      padding: 4px 10px; border-radius: 2px; font-family: var(--mono);
      font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; }
    .mc-hint { display: inline-flex; align-items: center; gap: 6px;
      font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--muted); }
    .mc-hint::after { content: '←  →'; letter-spacing: 0; color: var(--accent); }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="mc-wrap">
        {MENU.map((cat) => (
          <div key={cat.id} className="mc-cat" data-cat={cat.id} id={`menu-${cat.id}`}
               ref={(el) => { blockRefs.current[cat.id] = el; }}>
            <div className="mc-cat-head">
              <div className="mc-cat-title"><span>{cat.icon}</span> <em>{t[`cat_${cat.id}`] || cat.id}</em></div>
              <div className="mc-cat-meta">
                <span>{String(cat.items.length).padStart(2,'0')} items</span>
                <span className="mc-hint">scroll</span>
              </div>
            </div>
            <div className="mc-scroll">
              {cat.items.map((it) => (
                <div key={it.id} className="mc-card">
                  <img src={it.img} alt={it.names.en} loading="lazy" />
                  <div className="mc-card-grad" />
                  <div className="mc-card-price">{it.price}{t.menu_currency}</div>
                  {it.badge && <div className="mc-card-badge">★ Must Try</div>}
                  <div className="mc-card-body">
                    <div className="mc-card-name">{it.names[lang] || it.names.en}</div>
                    {it.names.vi && it.names.vi !== (it.names[lang] || it.names.en) && (
                      <div className="mc-card-sub">{it.names.vi}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── D · Bento grid ─────────────────────────────────────────────────────────
// Asymmetric grid per category: signatures span 2 columns, others 1.
// Sizes cycle to create visual rhythm even when no item is flagged.
function MenuBento({ lang, t, blockRefs }) {
  // Returns a per-item size class. Items with badge get "lg"; otherwise
  // every 5th item gets "wide" to break the grid up.
  const sizeOf = (it, i) => {
    if (it.badge) return 'bn-lg';
    if (i % 5 === 0) return 'bn-wide';
    if (i % 7 === 3) return 'bn-tall';
    return '';
  };

  const css = `
    .bn-wrap { display: flex; flex-direction: column; gap: 64px; }
    .bn-cat-head { display: flex; align-items: baseline; gap: 14px; padding: 0 0 18px;
      border-bottom: 1px solid var(--rule); margin-bottom: 22px; }
    .bn-cat-title { font-family: var(--display); font-size: 44px; line-height: 1; letter-spacing: -0.01em; }
    .bn-cat-title em { font-style: italic; color: var(--accent); }
    .bn-cat-num { margin-left: auto; font-family: var(--mono); font-size: 10px; letter-spacing: 0.18em;
      text-transform: uppercase; color: var(--muted); }
    .bn-grid { display: grid; grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 200px; gap: 14px; grid-auto-flow: dense; }
    .bn-it { position: relative; border-radius: 10px; overflow: hidden;
      background: var(--paper); cursor: pointer;
      box-shadow: 0 8px 20px -12px color-mix(in srgb, var(--ink) 20%, transparent);
      transition: transform .25s, box-shadow .25s; }
    .bn-it:hover { transform: translateY(-4px) scale(1.01);
      box-shadow: 0 16px 32px -14px color-mix(in srgb, var(--ink) 32%, transparent); z-index: 1; }
    .bn-it img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
      transition: transform .6s ease, filter .3s; }
    .bn-it:hover img { transform: scale(1.06); filter: brightness(0.82); }
    .bn-it::after { content: ''; position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.05) 45%, transparent 70%);
      pointer-events: none; }
    .bn-body { position: absolute; left: 0; right: 0; bottom: 0; padding: 14px 16px;
      color: #fff; z-index: 1; font-family: var(--display); }
    .bn-name { font-size: 18px; line-height: 1.15; font-style: italic; }
    .bn-sub { font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em;
      text-transform: uppercase; opacity: 0.7; margin-top: 2px; }
    .bn-price { position: absolute; top: 10px; right: 10px;
      background: rgba(0,0,0,0.55); backdrop-filter: blur(8px); color: #fff;
      padding: 5px 10px; border-radius: 999px; font-family: var(--mono);
      font-size: 11px; font-weight: 600; z-index: 1; }
    .bn-badge { position: absolute; top: 10px; left: 10px;
      background: var(--accent); color: var(--bg);
      padding: 4px 9px; border-radius: 2px; font-family: var(--mono);
      font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; z-index: 1; }
    .bn-lg { grid-column: span 2; grid-row: span 2; }
    .bn-lg .bn-name { font-size: 28px; }
    .bn-wide { grid-column: span 2; }
    .bn-tall { grid-row: span 2; }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="bn-wrap">
        {MENU.map((cat) => (
          <div key={cat.id} data-cat={cat.id} id={`menu-${cat.id}`}
               ref={(el) => { blockRefs.current[cat.id] = el; }}>
            <div className="bn-cat-head">
              <div className="bn-cat-title"><span>{cat.icon}</span> <em>{t[`cat_${cat.id}`] || cat.id}</em></div>
              <div className="bn-cat-num">{String(cat.items.length).padStart(2,'0')} items</div>
            </div>
            <div className="bn-grid">
              {cat.items.map((it, i) => (
                <div key={it.id} className={`bn-it ${sizeOf(it, i)}`}>
                  <img src={it.img} alt={it.names.en} loading="lazy" />
                  <div className="bn-price">{it.price}{t.menu_currency}</div>
                  {it.badge && <div className="bn-badge">★ Must Try</div>}
                  <div className="bn-body">
                    <div className="bn-name">{it.names[lang] || it.names.en}</div>
                    {it.names.vi && it.names.vi !== (it.names[lang] || it.names.en) && (
                      <div className="bn-sub">{it.names.vi}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── E · Vintage printed menu (no photos, dotted leaders) ──────────────────
// Classic restaurant carte. Two columns, serif italic headers, dotted leader
// lines between name and price. No photos — pure typography.
function MenuVintage({ lang, t, blockRefs }) {
  const css = `
    .mv {
      background: linear-gradient(180deg,
        color-mix(in srgb, var(--paper) 70%, var(--bg)),
        color-mix(in srgb, var(--paper) 90%, var(--bg)));
      padding: 56px 48px 64px; border-radius: 8px;
      box-shadow: inset 0 0 0 1px var(--rule),
        0 30px 60px -30px color-mix(in srgb, var(--ink) 24%, transparent);
      position: relative;
    }
    .mv::before, .mv::after {
      content: ''; position: absolute; left: 50%; transform: translateX(-50%);
      width: 80px; height: 1px; background: var(--ink); opacity: 0.4;
    }
    .mv::before { top: 28px; }
    .mv::after  { bottom: 28px; }
    .mv-hd { text-align: center; margin-bottom: 48px; padding-bottom: 24px;
      border-bottom: 1px solid var(--rule); }
    .mv-hd-eyebrow { font-family: var(--mono); font-size: 10px; letter-spacing: 0.32em;
      text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
    .mv-hd-title { font-family: var(--display); font-size: 56px; font-style: italic;
      line-height: 1; letter-spacing: -0.01em; }
    .mv-hd-sub { font-family: var(--display); font-style: italic; font-size: 14px;
      color: var(--muted); margin-top: 10px; letter-spacing: 0.04em; }
    .mv-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; }
    @media (max-width: 900px) { .mv-cols { grid-template-columns: 1fr; gap: 32px; } }
    .mv-cat { break-inside: avoid; }
    .mv-cat + .mv-cat { margin-top: 40px; }
    .mv-cat-title { text-align: center; font-family: var(--display); font-size: 26px;
      font-style: italic; letter-spacing: 0.02em; margin-bottom: 4px; color: var(--accent); }
    .mv-cat-orn { text-align: center; color: var(--accent); opacity: 0.6;
      font-size: 14px; margin-bottom: 18px; letter-spacing: 0.4em; }
    .mv-it { display: flex; align-items: baseline; padding: 7px 0;
      font-family: var(--display); font-size: 17px; line-height: 1.3; }
    .mv-it + .mv-it { border-top: none; }
    .mv-it-l { display: flex; flex-direction: column; }
    .mv-it-name { font-style: italic; color: var(--ink); }
    .mv-it-sub { font-family: var(--mono); font-size: 9px; letter-spacing: 0.14em;
      text-transform: uppercase; color: var(--muted); margin-top: 1px;
      font-style: normal; }
    .mv-it-dots { flex: 1; border-bottom: 1px dotted var(--ink); opacity: 0.35;
      margin: 0 8px 5px; min-width: 24px; }
    .mv-it-price { font-variant-numeric: tabular-nums; white-space: nowrap; color: var(--ink); }
    .mv-it-badge { margin-left: 4px; color: var(--accent); font-size: 11px; }
    .mv-foot { text-align: center; margin-top: 40px; font-family: var(--display);
      font-style: italic; color: var(--muted); font-size: 13px; letter-spacing: 0.04em; }
  `;
  // distribute categories across 2 columns by balancing item count
  const totals = MENU.map((c) => c.items.length);
  let target = totals.reduce((a, b) => a + b, 0) / 2;
  const colA = [], colB = [];
  let sumA = 0;
  for (let i = 0; i < MENU.length; i++) {
    if (sumA + MENU[i].items.length <= target || colA.length === 0) {
      colA.push(MENU[i]); sumA += MENU[i].items.length;
    } else {
      colB.push(MENU[i]);
    }
  }

  const renderCat = (cat) => (
    <div key={cat.id} className="mv-cat" data-cat={cat.id} id={`menu-${cat.id}`}
         ref={(el) => { blockRefs.current[cat.id] = el; }}>
      <div className="mv-cat-title">{t[`cat_${cat.id}`] || cat.id}</div>
      <div className="mv-cat-orn">· · ·</div>
      {cat.items.map((it) => (
        <div key={it.id} className="mv-it">
          <div className="mv-it-l">
            <span className="mv-it-name">
              {it.names[lang] || it.names.en}
              {it.badge && <span className="mv-it-badge">★</span>}
            </span>
            {it.names.vi && it.names.vi !== (it.names[lang] || it.names.en) && (
              <span className="mv-it-sub">{it.names.vi}</span>
            )}
          </div>
          <div className="mv-it-dots" />
          <div className="mv-it-price">{it.price}{t.menu_currency}</div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <style>{css}</style>
      <div className="mv">
        <div className="mv-hd">
          <div className="mv-hd-eyebrow">Established 2019 · Saigon</div>
          <div className="mv-hd-title">La Carte</div>
          <div className="mv-hd-sub">{t.menu_title}</div>
        </div>
        <div className="mv-cols">
          <div>{colA.map(renderCat)}</div>
          <div>{colB.map(renderCat)}</div>
        </div>
        <div className="mv-foot">— ★ ★ ★ —<br/>{t.foot_tag}</div>
      </div>
    </>
  );
}

// ─── F · Spotlight slideshow ───────────────────────────────────────────────
// One drink fills the stage at a time. Big photo on the left, info on the right.
// Click a thumbnail strip at the bottom (or use arrow keys / autoplay) to switch.
function MenuSpotlight({ lang, t, blockRefs }) {
  const [catIdx, setCatIdx] = useState(0);
  const [itemIdx, setItemIdx] = useState(0);
  const cat = MENU[catIdx];
  const item = cat.items[itemIdx];

  // arrow keys
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const next = () => {
    if (itemIdx < cat.items.length - 1) setItemIdx(itemIdx + 1);
    else if (catIdx < MENU.length - 1) { setCatIdx(catIdx + 1); setItemIdx(0); }
  };
  const prev = () => {
    if (itemIdx > 0) setItemIdx(itemIdx - 1);
    else if (catIdx > 0) { setCatIdx(catIdx - 1); setItemIdx(MENU[catIdx - 1].items.length - 1); }
  };

  const total = MENU.reduce((a, c) => a + c.items.length, 0);
  const flat = MENU.flatMap((c, ci) => c.items.map((it, ii) => ({ ci, ii, it, cat: c })));
  const currentFlatIdx = flat.findIndex((f) => f.ci === catIdx && f.ii === itemIdx);

  const css = `
    .sp { position: relative; min-height: 720px;
      background: var(--paper); border-radius: 10px; overflow: hidden;
      box-shadow: 0 30px 60px -25px color-mix(in srgb, var(--ink) 28%, transparent);
    }
    .sp-stage { display: grid; grid-template-columns: 1.1fr 0.9fr;
      min-height: 600px; align-items: stretch; }
    .sp-photo { position: relative; overflow: hidden; background: var(--ink); }
    .sp-photo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
      animation: sp-zoom 8s ease-out infinite alternate; }
    @keyframes sp-zoom { from { transform: scale(1.02); } to { transform: scale(1.10); } }
    .sp-photo::after { content: ''; position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(0,0,0,0.18), transparent 50%, rgba(0,0,0,0.32)); }
    .sp-info { padding: 48px 48px 32px; display: flex; flex-direction: column; }
    .sp-cat { font-family: var(--mono); font-size: 11px; letter-spacing: 0.24em;
      text-transform: uppercase; color: var(--accent); margin-bottom: 18px;
      display: flex; align-items: center; gap: 10px; }
    .sp-cat::after { content: ''; flex: 1; height: 1px;
      background: linear-gradient(to right, var(--accent), transparent); opacity: 0.6; }
    .sp-name { font-family: var(--display); font-size: 64px; line-height: 0.98;
      letter-spacing: -0.02em; margin-bottom: 6px; }
    .sp-name em { font-style: italic; color: var(--accent); }
    .sp-name-vi { font-family: var(--display); font-style: italic; font-size: 22px;
      color: var(--muted); margin-bottom: 24px; }
    .sp-meta { display: flex; align-items: baseline; gap: 24px; padding: 18px 0;
      border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule);
      margin-bottom: 24px; }
    .sp-price { font-family: var(--display); font-size: 36px; color: var(--accent);
      font-variant-numeric: tabular-nums; }
    .sp-badge { display: inline-flex; align-items: center; gap: 6px;
      padding: 5px 12px; background: var(--accent); color: var(--bg);
      border-radius: 2px; font-family: var(--mono); font-size: 10px;
      letter-spacing: 0.16em; text-transform: uppercase; }
    .sp-counter { margin-left: auto; font-family: var(--mono); font-size: 12px;
      letter-spacing: 0.12em; color: var(--muted); }
    .sp-counter b { color: var(--ink); font-weight: 700; }
    .sp-desc { font-size: 15px; line-height: 1.6; color: var(--muted); flex: 1; }
    .sp-nav { display: flex; gap: 8px; margin-top: 24px; }
    .sp-arrow { width: 48px; height: 48px; border-radius: 50%;
      background: var(--ink); color: var(--bg); border: none; cursor: pointer;
      font-size: 18px; transition: background 0.2s, transform 0.2s;
      display: grid; place-items: center; font-family: inherit; }
    .sp-arrow:hover { background: var(--accent); transform: scale(1.06); }
    .sp-arrow:disabled { opacity: 0.3; cursor: not-allowed; transform: none; background: var(--ink); }
    .sp-hint { font-family: var(--mono); font-size: 10px; letter-spacing: 0.18em;
      text-transform: uppercase; color: var(--muted); margin-left: auto; align-self: center; }
    .sp-strip { padding: 16px 24px 20px; background: color-mix(in srgb, var(--ink) 8%, var(--paper));
      border-top: 1px solid var(--rule); display: flex; gap: 8px; overflow-x: auto;
      scrollbar-width: thin; scrollbar-color: var(--accent) transparent; }
    .sp-strip::-webkit-scrollbar { height: 4px; }
    .sp-strip::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }
    .sp-thumb { flex: 0 0 56px; height: 72px; border-radius: 4px; overflow: hidden;
      cursor: pointer; opacity: 0.55; transition: opacity .2s, transform .2s, box-shadow .2s;
      position: relative; background: var(--ink); }
    .sp-thumb img { width: 100%; height: 100%; object-fit: cover; }
    .sp-thumb:hover { opacity: 0.85; transform: translateY(-2px); }
    .sp-thumb.active { opacity: 1; transform: translateY(-3px);
      box-shadow: 0 0 0 2px var(--accent), 0 6px 14px rgba(0,0,0,0.18); }
    .sp-divider { flex: 0 0 1px; align-self: stretch; margin: 0 6px;
      background: var(--rule); }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="sp" id={`menu-${cat.id}`} data-cat={cat.id}
           ref={(el) => { blockRefs.current[cat.id] = el; }}>
        <div className="sp-stage">
          <div className="sp-photo">
            <img key={item.id} src={item.img} alt={item.names.en} />
          </div>
          <div className="sp-info">
            <div className="sp-cat">{cat.icon} {t[`cat_${cat.id}`] || cat.id}</div>
            <div className="sp-name">
              {(item.names[lang] || item.names.en).split(' ').map((w, i, arr) => (
                <span key={i}>{i === arr.length - 1 ? <em>{w}</em> : w + ' '}</span>
              ))}
            </div>
            {item.names.vi && item.names.vi !== (item.names[lang] || item.names.en) && (
              <div className="sp-name-vi">{item.names.vi}</div>
            )}
            <div className="sp-meta">
              <div className="sp-price">{item.price}{t.menu_currency}</div>
              {item.badge && <div className="sp-badge">★ Must Try</div>}
              <div className="sp-counter">
                <b>{String(currentFlatIdx + 1).padStart(2, '0')}</b> / {total}
              </div>
            </div>
            <div className="sp-desc">
              {item.notes?.[lang] || item.notes?.en ||
                `A house ${(t[`cat_${cat.id}`] || cat.id).toLowerCase()} — made fresh, poured to order.`}
            </div>
            <div className="sp-nav">
              <button className="sp-arrow" onClick={prev} disabled={currentFlatIdx === 0} aria-label="Previous">←</button>
              <button className="sp-arrow" onClick={next} disabled={currentFlatIdx === total - 1} aria-label="Next">→</button>
              <div className="sp-hint">← → keys · click thumb</div>
            </div>
          </div>
        </div>
        <div className="sp-strip">
          {MENU.map((c, ci) => (
            <React.Fragment key={c.id}>
              {ci > 0 && <div className="sp-divider" />}
              {c.items.map((it, ii) => (
                <div
                  key={it.id}
                  className={`sp-thumb ${ci === catIdx && ii === itemIdx ? 'active' : ''}`}
                  onClick={() => { setCatIdx(ci); setItemIdx(ii); }}
                  title={it.names[lang] || it.names.en}
                >
                  <img src={it.img} alt="" loading="lazy" />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

Object.assign(window, { MenuSticky, MenuCarousel, MenuBento, MenuVintage, MenuSpotlight });

// Mobile responsive for all menu layouts
if (typeof document !== 'undefined' && !document.getElementById('ml-mobile-css')) {
  const s = document.createElement('style');
  s.id = 'ml-mobile-css';
  s.textContent = `
    @media (max-width: 700px) {
      /* sticky photo layout → stack */
      .ms-wrap { grid-template-columns: 1fr !important; gap: 24px !important; }
      .ms-photo { position: relative !important; top: 0 !important; aspect-ratio: 4/3 !important;
        max-height: 56vh; }
      .ms-cat-title { font-size: 26px !important; }
      .ms-cap-name { font-size: 22px !important; }
      .ms-it { grid-template-columns: 24px 1fr auto !important; padding: 12px 4px !important; }
      .ms-it-name { font-size: 17px !important; }
      .ms-it-price { font-size: 16px !important; }
      .ms-list { padding-bottom: 24px !important; }

      /* horizontal carousel — card size + spacing */
      .mc-cat-title { font-size: 28px !important; }
      .mc-card { flex: 0 0 220px !important; }

      /* bento grid → 2 cols */
      .bn-grid { grid-template-columns: 1fr 1fr !important; grid-auto-rows: 160px !important; gap: 10px !important; }
      .bn-cat-title { font-size: 28px !important; }
      .bn-lg { grid-column: span 2 !important; grid-row: span 2 !important; }
      .bn-lg .bn-name { font-size: 22px !important; }
      .bn-name { font-size: 15px !important; }

      /* vintage menu — already has its own breakpoint at 900px */
      .mv { padding: 36px 20px 40px !important; }
      .mv-hd-title { font-size: 36px !important; }

      /* spotlight slideshow → stack */
      .sp { min-height: 0 !important; }
      .sp-stage { grid-template-columns: 1fr !important; min-height: 0 !important; }
      .sp-photo { aspect-ratio: 4/3 !important; }
      .sp-info { padding: 24px 20px !important; }
      .sp-name { font-size: 36px !important; }
      .sp-name-vi { font-size: 16px !important; }
      .sp-price { font-size: 26px !important; }
      .sp-meta { gap: 14px !important; flex-wrap: wrap; }
      .sp-strip { padding: 12px 12px !important; }
      .sp-thumb { flex: 0 0 44px !important; height: 56px !important; }
    }
  `;
  document.head.appendChild(s);
}
