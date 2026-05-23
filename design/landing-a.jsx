// landing-a.jsx — Variation A: "Editorial Warm"
// Clean modern editorial layout. Serif display headline, generous whitespace,
// horizontal category bar, image-led menu grid, framed map.

const { useState, useEffect, useRef, useMemo } = React;

function LandingA({ lang, sections, palette, fonts, width = 1100 }) {
  const t = I18N[lang] || I18N.en;
  const sec = (id) => sections[id] !== false;

  // category tab state
  const [activeCat, setActiveCat] = useState(MENU[0].id);
  const activeCategory = MENU.find((c) => c.id === activeCat) || MENU[0];

  const css = `
    .la {
      --bg: ${palette.bg};
      --paper: ${palette.paper};
      --ink: ${palette.ink};
      --muted: ${palette.muted};
      --accent: ${palette.accent};
      --rule: ${palette.rule};
      --display: ${fonts.display};
      --body: ${fonts.body};
      background: var(--bg);
      color: var(--ink);
      font-family: var(--body);
      font-size: 15px;
      line-height: 1.5;
      width: 100%;
      overflow: hidden;
      position: relative;
    }
    .la * { box-sizing: border-box; }
    .la h1, .la h2, .la h3 { font-family: var(--display); font-weight: 400; letter-spacing: -0.01em; margin: 0; }
    :where(.la) a { color: inherit; text-decoration: none; }

    /* nav */
    .la-nav {
      display: flex; align-items: center; justify-content: space-between;
      padding: 22px 56px; border-bottom: 1px solid var(--rule);
      position: sticky; top: 0; background: color-mix(in srgb, var(--bg) 90%, transparent);
      backdrop-filter: blur(8px); z-index: 10;
    }
    .la-logo { display: flex; align-items: center; gap: 10px; font-family: var(--display); font-size: 22px; }
    .la-logo-mark {
      width: 32px; height: 32px; border-radius: 50%; background: var(--ink); color: var(--bg);
      display: grid; place-items: center; font-family: var(--display); font-size: 14px;
    }
    .la-navlinks { display: flex; gap: 30px; font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase; color: var(--muted); }
    .la-navlinks a { transition: color 0.2s; }
    .la-navlinks a:hover { color: var(--accent); }
    .la-langpicker { position: relative; }
    .la-langbtn {
      display: flex; align-items: center; gap: 6px; padding: 7px 12px;
      border: 1px solid var(--rule); border-radius: 999px; font-size: 12px; cursor: pointer;
      background: transparent; color: inherit; font-family: inherit; transition: border-color 0.2s, background 0.2s;
    }
    .la-langbtn:hover { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 8%, transparent); }
    .la-langflag { font-size: 14px; }

    /* hero */
    .la-hero {
      padding: 64px 56px 32px;
      display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 56px; align-items: center;
    }
    .la-hero-eyebrow {
      font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent);
      display: flex; align-items: center; gap: 12px;
    }
    .la-hero-eyebrow::before { content: ''; display: block; width: 28px; height: 1px; background: var(--accent); }
    .la-hero h1 {
      font-size: 78px; line-height: 0.98; margin: 24px 0 24px;
      white-space: pre-line; letter-spacing: -0.025em;
    }
    .la-hero h1 em { font-style: italic; color: var(--accent); }
    .la-hero-sub { font-size: 17px; line-height: 1.55; color: var(--muted); max-width: 460px; }
    .la-cta-row { display: flex; gap: 12px; margin-top: 32px; flex-wrap: wrap; }
    .la-btn {
      display: inline-flex; align-items: center; gap: 8px; padding: 13px 22px; border-radius: 999px;
      font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase; cursor: pointer;
      border: 1px solid var(--ink); background: var(--ink); color: var(--bg);
      font-family: inherit; transition: transform 0.18s, box-shadow 0.18s, background 0.18s;
    }
    .la-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px color-mix(in srgb, var(--ink) 22%, transparent); }
    .la-btn.ghost { background: transparent; color: var(--ink); border-color: var(--ink); }
    .la-btn.ghost:hover { background: var(--ink); color: var(--bg); }
    .la-btn-arrow { font-size: 16px; transition: transform 0.18s; }
    .la-btn:hover .la-btn-arrow { transform: translateX(3px); }

    .la-hero-img {
      aspect-ratio: 4/5; border-radius: 12px; overflow: hidden; position: relative;
      background: var(--paper);
    }
    .la-hero-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
    .la-hero-img:hover img { transform: scale(1.04); }
    .la-hero-tag {
      position: absolute; bottom: 20px; left: 20px; right: 20px;
      background: color-mix(in srgb, var(--bg) 92%, transparent);
      backdrop-filter: blur(8px); padding: 14px 18px; border-radius: 8px;
      display: flex; justify-content: space-between; align-items: baseline;
      font-size: 13px;
    }
    .la-hero-tag-name { font-family: var(--display); font-size: 18px; }

    /* marquee */
    .la-marquee {
      border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule);
      padding: 18px 0; overflow: hidden; white-space: nowrap; margin-top: 32px;
    }
    .la-marquee-inner {
      display: inline-flex; gap: 48px; animation: la-scroll 38s linear infinite;
      font-family: var(--display); font-size: 28px; font-style: italic; color: var(--muted);
    }
    .la-marquee-inner span { display: inline-flex; align-items: center; gap: 48px; }
    .la-marquee-inner i { font-style: normal; color: var(--accent); }
    @keyframes la-scroll { to { transform: translateX(-50%); } }

    /* menu */
    .la-section { padding: 80px 56px; }
    .la-section-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; margin-bottom: 40px; }
    .la-section-eyebrow { font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); }
    .la-section h2 { font-size: 56px; line-height: 1; letter-spacing: -0.02em; max-width: 720px; white-space: pre-line; }
    .la-section-head-right { font-size: 14px; color: var(--muted); max-width: 340px; text-align: right; }

    .la-cats {
      display: flex; gap: 6px; flex-wrap: wrap; padding: 4px;
      background: var(--paper); border-radius: 999px; width: fit-content;
      margin-bottom: 36px;
    }
    .la-cat {
      padding: 10px 20px; border-radius: 999px; font-size: 13px; cursor: pointer;
      transition: background 0.2s, color 0.2s;
      letter-spacing: 0.02em; color: var(--muted); border: none; background: transparent;
      font-family: inherit;
    }
    .la-cat.active { background: var(--ink); color: var(--bg); }
    .la-cat:not(.active):hover { color: var(--ink); }

    .la-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px 24px; }
    .la-item {
      cursor: pointer; transition: transform 0.25s;
    }
    .la-item:hover { transform: translateY(-4px); }
    .la-item-img {
      aspect-ratio: 4/5; border-radius: 10px; overflow: hidden; background: var(--paper); margin-bottom: 14px;
      position: relative;
    }
    .la-item-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
    .la-item:hover .la-item-img img { transform: scale(1.05); }
    .la-item-badge {
      position: absolute; top: 12px; left: 12px; background: var(--accent); color: var(--bg);
      padding: 4px 10px; border-radius: 999px; font-size: 11px; letter-spacing: 0.08em;
    }
    .la-item-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
    .la-item-name { font-family: var(--display); font-size: 19px; line-height: 1.15; }
    .la-item-price { font-variant-numeric: tabular-nums; font-size: 14px; color: var(--muted); white-space: nowrap; }
    .la-item-note { font-size: 12px; color: var(--muted); margin-top: 4px; font-style: italic; }

    /* about */
    .la-about {
      background: var(--paper); padding: 96px 56px;
      display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 56px; align-items: center;
    }
    .la-about-img { aspect-ratio: 4/5; border-radius: 12px; overflow: hidden; }
    .la-about-img img { width: 100%; height: 100%; object-fit: cover; }
    .la-about h2 { font-size: 48px; line-height: 1.05; letter-spacing: -0.02em; white-space: pre-line; margin-bottom: 24px; }
    .la-about-body { font-size: 17px; line-height: 1.65; color: var(--muted); max-width: 560px; }
    .la-about-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-top: 40px; padding-top: 32px; border-top: 1px solid var(--rule); }
    .la-stat-n { font-family: var(--display); font-size: 42px; color: var(--accent); }
    .la-stat-l { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); margin-top: 4px; }

    /* reviews */
    .la-reviews-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
    .la-review {
      background: var(--paper); padding: 28px 28px 24px; border-radius: 12px;
      display: flex; flex-direction: column; gap: 16px; transition: transform 0.2s, box-shadow 0.2s;
    }
    .la-review:hover { transform: translateY(-3px); box-shadow: 0 12px 32px color-mix(in srgb, var(--ink) 8%, transparent); }
    .la-review-stars { color: var(--accent); letter-spacing: 2px; font-size: 14px; }
    .la-review-body { font-size: 16px; line-height: 1.55; }
    .la-review-foot { display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: var(--muted); }
    .la-review-avatar {
      width: 32px; height: 32px; border-radius: 50%; background: var(--accent); color: var(--bg);
      display: grid; place-items: center; font-family: var(--display); font-size: 13px;
    }
    .la-review-meta { display: flex; align-items: center; gap: 10px; }

    /* visit / map */
    .la-visit { padding: 80px 56px; }
    .la-visit-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 32px; }
    .la-map {
      aspect-ratio: 5/4; border-radius: 12px; overflow: hidden; position: relative;
      background: var(--paper); border: 1px solid var(--rule);
    }
    .la-map iframe { width: 100%; height: 100%; border: 0; filter: saturate(0.85) hue-rotate(-10deg); }
    .la-info {
      background: var(--paper); border-radius: 12px; padding: 32px;
      display: flex; flex-direction: column; gap: 24px;
    }
    .la-info-row { display: flex; flex-direction: column; gap: 4px; }
    .la-info-label { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
    .la-info-value { font-size: 16px; }
    .la-hours-rows { display: grid; gap: 8px; font-size: 14px; }
    .la-hours-row { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px dashed var(--rule); }
    .la-hours-row:last-child { border-bottom: none; }

    /* gallery */
    .la-gallery {
      display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 200px; gap: 12px;
      padding: 0 56px 80px;
    }
    .la-gallery > div {
      border-radius: 8px; overflow: hidden; background: var(--paper);
    }
    .la-gallery > div:nth-child(1) { grid-row: span 2; }
    .la-gallery > div:nth-child(4) { grid-row: span 2; }
    .la-gallery img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
    .la-gallery > div:hover img { transform: scale(1.06); }

    /* footer */
    .la-foot { padding: 48px 56px; border-top: 1px solid var(--rule); display: flex; justify-content: space-between; align-items: center; }
    .la-foot-l { font-family: var(--display); font-style: italic; color: var(--muted); font-size: 16px; }
    .la-foot-r { font-size: 12px; color: var(--muted); }

    /* entry animations */
    .la-fade { opacity: 0; transform: translateY(12px); animation: la-fade 0.7s 0.1s forwards cubic-bezier(.2,.7,.3,1); }
    .la-fade-2 { animation-delay: 0.25s; }
    .la-fade-3 { animation-delay: 0.4s; }
    @keyframes la-fade { to { opacity: 1; transform: none; } }
  `;

  return (
    <div className="la">
      <style>{css}</style>

      {/* NAV */}
      <nav className="la-nav">
        <a className="la-logo" href="#top">
          <div className="la-logo-mark">39</div>
          <span>Cafe 39</span>
        </a>
        <div className="la-navlinks">
          {sec("menu") && <a href="#menu">{t.nav_menu}</a>}
          {sec("about") && <a href="#about">{t.nav_about}</a>}
          {sec("reviews") && <a href="#reviews">{t.nav_reviews}</a>}
          {sec("visit") && <a href="#visit">{t.nav_visit}</a>}
        </div>
        <LangPicker variant="a" />
      </nav>

      {/* HERO */}
      <section className="la-hero la-fade" id="top">
        <div>
          <div className="la-hero-eyebrow">{t.hero_eyebrow}</div>
          <h1>{t.hero_title.split("\n").map((l, i) => (
            <span key={i} style={{ display: 'block' }}>{i === 1 ? <em>{l}</em> : l}</span>
          ))}</h1>
          <div className="la-hero-sub">{t.hero_sub}</div>
          <div className="la-cta-row">
            <a href="#menu" className="la-btn">{t.hero_cta} <span className="la-btn-arrow">→</span></a>
            <a href="#visit" className="la-btn ghost">{t.hero_cta2}</a>
          </div>
        </div>
        <div className="la-hero-img la-fade la-fade-2">
          <img src={MENU[2].items[0].img} alt="Avocado smoothie" />
          <div className="la-hero-tag">
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>Signature</div>
              <div className="la-hero-tag-name">{MENU[2].items[0].names[lang] || MENU[2].items[0].names.en}</div>
            </div>
            <div>30k{t.menu_currency}</div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="la-marquee">
        <div className="la-marquee-inner">
          <span>Phin coffee <i>·</i> Cà phê muối <i>·</i> Avocado smoothie <i>·</i> Trà sữa <i>·</i> Cocoa <i>·</i> Bạc xỉu <i>·</i> </span>
          <span>Phin coffee <i>·</i> Cà phê muối <i>·</i> Avocado smoothie <i>·</i> Trà sữa <i>·</i> Cocoa <i>·</i> Bạc xỉu <i>·</i> </span>
        </div>
      </div>

      {/* MENU */}
      {sec("menu") && (
      <section className="la-section" id="menu">
        <div className="la-section-head">
          <div>
            <div className="la-section-eyebrow">{t.menu_eyebrow}</div>
            <h2 style={{ marginTop: 12 }}>{t.menu_title}</h2>
          </div>
          <div className="la-section-head-right">
            {MENU.reduce((a, c) => a + c.items.length, 0)} drinks · pulled, blended, and poured to order · prices in {t.menu_currency === '₫' ? 'thousand VND' : 'VND'}.
          </div>
        </div>

        <div className="la-cats">
          {MENU.map((cat) => (
            <button
              key={cat.id}
              className={`la-cat ${activeCat === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCat(cat.id)}
            >
              {t[`cat_${cat.id}`] || cat.id}
            </button>
          ))}
        </div>

        <div className="la-grid" key={activeCat}>
          {activeCategory.items.map((it, i) => (
            <div key={it.id} className="la-item la-fade" style={{ animationDelay: `${0.05 + i * 0.04}s` }}>
              <div className="la-item-img">
                <img src={it.img} alt={it.names.en} loading="lazy" />
                {it.badge && <div className="la-item-badge">★ Must try</div>}
              </div>
              <div className="la-item-head">
                <div className="la-item-name">{it.names[lang] || it.names.en}</div>
                <div className="la-item-price">{it.price}{t.menu_currency}</div>
              </div>
              {it.notes?.[lang] && <div className="la-item-note">{it.notes[lang]}</div>}
              {!it.notes?.[lang] && it.notes?.en && <div className="la-item-note">{it.notes.en}</div>}
            </div>
          ))}
        </div>
      </section>
      )}

      {/* ABOUT */}
      {sec("about") && (
      <section className="la-about" id="about">
        <div className="la-about-img">
          <img src={MENU[0].items[5].img} alt="Coffee shop" />
        </div>
        <div>
          <div className="la-section-eyebrow">{t.about_eyebrow}</div>
          <h2 style={{ marginTop: 12 }}>{t.about_title}</h2>
          <div className="la-about-body">{t.about_body}</div>
          <div className="la-about-stats">
            <div>
              <div className="la-stat-n">6</div>
              <div className="la-stat-l">years open</div>
            </div>
            <div>
              <div className="la-stat-n">39</div>
              <div className="la-stat-l">drinks on rotation</div>
            </div>
            <div>
              <div className="la-stat-n">4.9</div>
              <div className="la-stat-l">avg rating</div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* REVIEWS */}
      {sec("reviews") && (
      <section className="la-section" id="reviews">
        <div className="la-section-head">
          <div>
            <div className="la-section-eyebrow">{t.reviews_eyebrow}</div>
            <h2 style={{ marginTop: 12 }}>{t.reviews_title}</h2>
          </div>
          <a className="la-btn ghost" href={GOOGLE_MAPS_URL} target="_blank" rel="noopener">{t.reviews_more} <span className="la-btn-arrow">→</span></a>
        </div>
        <div className="la-reviews-grid">
          {REVIEWS.slice(0, 4).map((r, i) => (
            <div key={i} className="la-review">
              <div className="la-review-stars">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
              <div className="la-review-body">"{r.body[lang] || r.body.en}"</div>
              <div className="la-review-foot">
                <div className="la-review-meta">
                  <div className="la-review-avatar">{r.name[0]}</div>
                  <div>
                    <div style={{ color: 'var(--ink)' }}>{r.name}</div>
                    <div style={{ fontSize: 12 }}>{r.date}</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Google</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* VISIT */}
      {sec("visit") && (
      <section className="la-visit" id="visit">
        <div className="la-section-head">
          <div>
            <div className="la-section-eyebrow">{t.visit_eyebrow}</div>
            <h2 style={{ marginTop: 12 }}>{t.visit_title}</h2>
          </div>
        </div>
        <div className="la-visit-grid">
          <div className="la-map">
            <iframe src={GOOGLE_MAPS_EMBED} loading="lazy" title="Map" />
          </div>
          <div className="la-info">
            <div className="la-info-row">
              <div className="la-info-label">Address</div>
              <div className="la-info-value">39 Đường Lê Lợi<br />Quận 1, TP. Hồ Chí Minh<br />Vietnam</div>
            </div>
            {sec("hours") && (
            <div className="la-info-row">
              <div className="la-info-label">{t.hours_title}</div>
              <div className="la-hours-rows" style={{ marginTop: 6 }}>
                <div className="la-hours-row"><span>{t.hours_mf}</span><span>{t.hours_mf_time}</span></div>
                <div className="la-hours-row"><span>{t.hours_sat}</span><span>{t.hours_sat_time}</span></div>
                <div className="la-hours-row"><span>{t.hours_sun}</span><span>{t.hours_sun_time}</span></div>
              </div>
            </div>
            )}
            <a className="la-btn" href={GOOGLE_MAPS_URL} target="_blank" rel="noopener" style={{ alignSelf: 'flex-start' }}>{t.visit_dir} <span className="la-btn-arrow">→</span></a>
          </div>
        </div>
      </section>
      )}

      {/* GALLERY */}
      {sec("gallery") && (
      <>
        <div className="la-section" style={{ paddingBottom: 32 }}>
          <div className="la-section-eyebrow">{t.gallery_eyebrow}</div>
          <h2 style={{ marginTop: 12 }}>{t.gallery_title}</h2>
        </div>
        <div className="la-gallery">
          <div><img src={MENU[0].items[2].img} alt="" loading="lazy" /></div>
          <div><img src={MENU[1].items[3].img} alt="" loading="lazy" /></div>
          <div><img src={MENU[3].items[1].img} alt="" loading="lazy" /></div>
          <div><img src={MENU[4].items[5].img} alt="" loading="lazy" /></div>
          <div><img src={MENU[0].items[0].img} alt="" loading="lazy" /></div>
          <div><img src={MENU[2].items[1].img} alt="" loading="lazy" /></div>
        </div>
      </>
      )}

      {/* FOOTER */}
      <footer className="la-foot">
        <div className="la-foot-l">{t.foot_tag}</div>
        <div className="la-foot-r">{t.foot_copy}</div>
      </footer>
    </div>
  );
}

window.LandingA = LandingA;
