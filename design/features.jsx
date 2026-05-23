// features.jsx — additional UI bits added to LandingB
//  - OpenNow:        live "Open/Closed" badge based on HOURS data
//  - CTABar:         sticky bottom contact bar (Call/Zalo/Order)
//  - PromoBanner:    top promo strip
//  - StoriesStrip:   IG-stories-style image-slot circles
//  - OwnerStory:     owner intro section with image-slot
//  - PaymentQR:      banking QR row (VietQR/MoMo/ZaloPay)
//  - MenuSearch:     menu search input + clear
//  - ScrollProgress: thin top bar tracking page scroll
//
// All read translation strings via the passed `t` (I18N[lang]).

const { useState: useState_f, useEffect: useEffect_f, useRef: useRef_f } = React;

// helper — current minutes since midnight in user's local timezone
const _nowMins = () => {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
};
const _hmToMins = (s) => {
  const [h, m] = s.split(':').map(Number);
  return h * 60 + m;
};

// ─── OpenNow ────────────────────────────────────────────────────────────────
function OpenNow({ t }) {
  const [, tick] = useState_f(0);
  useEffect_f(() => {
    const id = setInterval(() => tick((x) => x + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  const now = _nowMins();
  const dow = new Date().getDay();
  const today = HOURS[dow];
  const isOpen = today && now >= _hmToMins(today.open) && now < _hmToMins(today.close);

  // Compute next change label
  let label;
  if (isOpen) {
    label = `${t.now_closes_at || 'Closes at'} ${today.close}`;
  } else {
    // Find next opening
    let day = dow;
    if (today && now < _hmToMins(today.open)) {
      label = `${t.now_opens_at || 'Opens at'} ${today.open}`;
    } else {
      // tomorrow
      for (let i = 1; i <= 7; i++) {
        const d = (dow + i) % 7;
        if (HOURS[d]) {
          label = `${t.now_opens_at || 'Opens'} ${HOURS[d].label} ${HOURS[d].open}`;
          break;
        }
      }
    }
  }

  return (
    <div className={`opennow ${isOpen ? 'is-open' : 'is-closed'}`}>
      <span className="opennow-dot" />
      <span className="opennow-status">{isOpen ? (t.now_open || 'Open now') : (t.now_closed || 'Closed')}</span>
      <span className="opennow-sub">· {label}</span>
      <style>{`
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
          box-shadow: 0 0 0 0 #2cb67d80;
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
      `}</style>
    </div>
  );
}

// ─── PromoBanner ─────────────────────────────────────────────────────────────
function PromoBanner({ t }) {
  const [dismissed, set] = useState_f(false);
  if (dismissed) return null;
  return (
    <div className="promo">
      <span className="promo-tag">★</span>
      <span className="promo-text">{t.promo}</span>
      <button className="promo-x" onClick={() => set(true)} aria-label="Dismiss">×</button>
      <style>{`
        .promo {
          background: var(--ink); color: var(--bg);
          padding: 8px 16px; display: flex; align-items: center; gap: 12px;
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em;
        }
        .promo-tag { color: var(--accent); }
        .promo-text { flex: 1; text-align: center; }
        .promo-x {
          background: transparent; border: none; color: color-mix(in srgb, var(--bg) 60%, transparent);
          font-size: 18px; cursor: pointer; padding: 0 4px;
          line-height: 1;
        }
        .promo-x:hover { color: var(--bg); }
      `}</style>
    </div>
  );
}

// ─── CTABar (sticky bottom contact) ─────────────────────────────────────────
function CTABar({ t }) {
  return (
    <>
      <div className="cta-bar">
        <a className="cta-btn cta-call" href={`tel:${CONTACT.phoneRaw}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span className="cta-btn-text">{t.cta_call_long || t.cta_call}</span>
        </a>
        <a className="cta-btn cta-zalo" href={`https://zalo.me/${CONTACT.zalo.replace(/\D/g, '')}`} target="_blank" rel="noopener">
          <span className="cta-zalo-mark">Z</span>
          <span className="cta-btn-text">{t.cta_zalo_long || t.cta_zalo}</span>
        </a>
      </div>
      <div className="cta-bar-spacer" />
      <style>{`
        .cta-bar {
          position: fixed; left: 50%; transform: translateX(-50%);
          bottom: 16px; z-index: 100; max-width: 420px; width: calc(100% - 24px);
          display: grid; grid-template-columns: 1fr 1fr; gap: 6px;
          padding: 6px;
          background: var(--ink); border-radius: 999px;
          box-shadow: 0 12px 32px -8px rgba(0,0,0,0.4),
                      0 4px 12px -4px rgba(0,0,0,0.25),
                      inset 0 0 0 1px color-mix(in srgb, var(--bg) 12%, transparent);
          font-family: var(--mono);
        }
        .cta-bar-spacer { height: 76px; }
        .cta-btn {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 8px; padding: 12px 14px; border-radius: 999px;
          color: var(--bg); font-size: 12px; letter-spacing: 0.1em;
          text-transform: uppercase; font-weight: 500; transition: background 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .cta-btn:hover { transform: translateY(-1px); }
        .cta-call:hover  { background: color-mix(in srgb, var(--accent) 40%, var(--ink)); }
        .cta-zalo        { background: #0068ff; }
        .cta-zalo:hover  { background: #2880ff; }
        .cta-zalo-mark {
          width: 18px; height: 18px; border-radius: 4px;
          background: #fff; color: #0068ff;
          display: grid; place-items: center; font-weight: 700; font-size: 11px;
          font-family: var(--mono);
        }
        .cta-order       { background: var(--accent); color: var(--bg); }
        .cta-order:hover { filter: brightness(1.1); }
        .cta-btn svg { flex: 0 0 16px; }
      `}</style>
    </>
  );
}

// ─── StoriesStrip ───────────────────────────────────────────────────────────
const STORY_IDS = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8'];
const STORY_LABELS = ['Phin', 'Morning', 'Locals', 'Beans', 'Crew', 'Sunset', 'Latte art', 'Live'];
function StoriesStrip({ t }) {
  return (
    <div className="stories">
      <div className="stories-eyebrow">{t.stories_eyebrow}</div>
      <div className="stories-row">
        {STORY_IDS.map((id, i) => (
          <div key={id} className="story">
            <div className="story-ring">
              <image-slot id={`story-${id}`} placeholder={`Drop story · ${STORY_LABELS[i]}`} shape="circle"></image-slot>
            </div>
            <div className="story-label">{STORY_LABELS[i]}</div>
          </div>
        ))}
      </div>
      <style>{`
        .stories { padding: 32px 48px 0; }
        .stories-eyebrow {
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--accent);
          display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
        }
        .stories-eyebrow::after { content: ''; flex: 1; height: 1px;
          background: linear-gradient(to right, var(--accent), transparent); opacity: 0.5; }
        .stories-row { display: flex; gap: 18px; overflow-x: auto;
          padding: 4px 0 14px; scroll-snap-type: x mandatory;
          scrollbar-width: none;
        }
        .stories-row::-webkit-scrollbar { display: none; }
        .story { flex: 0 0 76px; display: flex; flex-direction: column;
          align-items: center; gap: 8px; scroll-snap-align: start; }
        .story-ring {
          width: 76px; height: 76px; border-radius: 50%;
          padding: 3px;
          background: conic-gradient(from 0deg, var(--accent), color-mix(in srgb, var(--accent) 40%, var(--ink)), var(--accent));
          transition: transform 0.2s;
        }
        .story:hover .story-ring { transform: scale(1.05); }
        .story-ring image-slot {
          display: block; width: 100%; height: 100%; border-radius: 50%;
          background: var(--paper);
          border: 3px solid var(--bg);
        }
        .story-label {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.06em;
          text-transform: uppercase; color: var(--muted); max-width: 76px;
          text-align: center; overflow: hidden; text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
}

// ─── OwnerStory ─────────────────────────────────────────────────────────────
function OwnerStory({ t }) {
  return (
    <section className="owner" id="owner">
      <div className="owner-grid">
        <div className="owner-photo-wrap">
          <image-slot id="owner-portrait" placeholder="Drop owner portrait" shape="rect"></image-slot>
          <div className="owner-stamp">EST. 2019</div>
        </div>
        <div>
          <div className="owner-eyebrow">{t.owner_eyebrow}</div>
          <h2 className="owner-title">{t.owner_title}</h2>
          <p className="owner-body">{t.owner_body}</p>
          <div className="owner-signoff">{t.owner_signoff}</div>
        </div>
      </div>
      <style>{`
        .owner { padding: 80px 48px; }
        .owner-grid {
          display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 56px; align-items: center;
        }
        .owner-photo-wrap { position: relative; }
        .owner-photo-wrap image-slot {
          display: block; width: 100%; aspect-ratio: 4/5;
          border-radius: 6px; background: var(--paper);
          box-shadow: 0 24px 50px -20px color-mix(in srgb, var(--ink) 28%, transparent);
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
      `}</style>
    </section>
  );
}

// ─── PaymentQR ──────────────────────────────────────────────────────────────
// Simple SVG "QR-style" placeholder grid until owner drops a real one
function _FakeQR({ color, seed }) {
  // deterministic dot pattern
  const cells = [];
  let s = seed;
  for (let y = 0; y < 21; y++) {
    for (let x = 0; x < 21; x++) {
      s = (s * 9301 + 49297) % 233280;
      const v = s / 233280;
      // corners (finder patterns) — outlined squares 7x7
      const inFinder = (
        (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13)
      );
      if (inFinder) {
        const onEdge = (x === 0 || x === 6 || y === 0 || y === 6 ||
                        x === 14 || x === 20 || y === 14 || y === 20);
        const onCore = ((x >= 2 && x <= 4 && y >= 2 && y <= 4) ||
                        (x >= 16 && x <= 18 && y >= 2 && y <= 4) ||
                        (x >= 2 && x <= 4 && y >= 16 && y <= 18));
        if (onEdge || onCore) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={color} />);
      } else if (v > 0.55) {
        cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={color} />);
      }
    }
  }
  return (
    <svg viewBox="0 0 21 21" width="100%" height="100%" shapeRendering="crispEdges">
      <rect width="21" height="21" fill="white"/>
      {cells}
    </svg>
  );
}
function PaymentQR({ t }) {
  return (
    <section className="pay" id="pay">
      <div className="pay-head">
        <div className="pay-eyebrow">{t.payment_eyebrow}</div>
        <h2 className="pay-title"><em>{t.payment_title}</em></h2>
        <div className="pay-sub">{t.payment_sub}</div>
      </div>
      <div className="pay-row">
        {PAYMENT.map((p, i) => (
          <div key={p.id} className="pay-card">
            <div className="pay-card-head">
              <span className="pay-card-dot" style={{ background: p.color }} />
              <span className="pay-card-label">{p.label}</span>
            </div>
            <div className="pay-qr"><_FakeQR color={p.color} seed={i * 13 + 7} /></div>
            <div className="pay-card-sub">{p.sub}</div>
          </div>
        ))}
      </div>
      <style>{`
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
          text-align: center;
          color: #2a1e14;
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
      `}</style>
    </section>
  );
}

// ─── ScrollProgress ─────────────────────────────────────────────────────────
function ScrollProgress() {
  useEffect_f(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      document.documentElement.style.setProperty('--scroll-pct', pct.toFixed(4));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="scrollprog">
      <style>{`
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
      `}</style>
    </div>
  );
}

Object.assign(window, { OpenNow, PromoBanner, CTABar, StoriesStrip, OwnerStory, PaymentQR, ScrollProgress });

// Global mobile responsive overrides for features.
// These ride alongside the components' own <style> tags but are written with
// higher selector specificity (so they win regardless of stylesheet order).
if (typeof document !== 'undefined' && !document.getElementById('feat-mobile-css')) {
  const s = document.createElement('style');
  s.id = 'feat-mobile-css';
  s.textContent = `
    /* Safe-area for iPhone home indicator */
    .cta-bar { bottom: max(16px, env(safe-area-inset-bottom)) !important; }
    .cta-bar-spacer { height: calc(76px + env(safe-area-inset-bottom)) !important; }

    @media (max-width: 700px) {
      .lb .pay-row { grid-template-columns: 1fr !important; max-width: 320px !important; gap: 14px !important; }
      .lb .pay { padding: 48px 20px !important; }
      .lb .pay-title { font-size: 32px !important; }
      .lb .owner { padding: 56px 20px !important; }
      .lb .owner-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
      .lb .owner-title { font-size: 30px !important; }
      .lb .owner-body { font-size: 15px !important; }
      .lb .owner-stamp { width: 76px !important; height: 76px !important; font-size: 9px !important;
        right: -8px !important; bottom: -8px !important; }
      .lb .stories { padding: 24px 20px 0 !important; }
      .lb .story { flex: 0 0 64px !important; }
      .lb .story-ring { width: 64px !important; height: 64px !important; }
      .lb .opennow { font-size: 9px !important; padding: 5px 10px !important; }
      .lb .opennow-sub { display: none; }

      .cta-bar { width: calc(100% - 16px) !important; padding: 5px !important; gap: 4px !important; }
      .cta-btn { padding: 11px 6px !important; font-size: 10px !important; letter-spacing: 0.04em !important; gap: 6px !important; }
      .cta-btn svg { flex: 0 0 14px !important; width: 14px; height: 14px; }
      .cta-zalo-mark { width: 16px !important; height: 16px !important; font-size: 10px !important; }
    }

    @media (max-width: 380px) {
      .cta-btn-text { display: none; }
      .cta-btn { padding: 13px 0 !important; justify-content: center; }
    }
  `;
  document.head.appendChild(s);
}
