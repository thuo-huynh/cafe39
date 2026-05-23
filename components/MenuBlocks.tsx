'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { MenuCategory, MenuItem, LocalizedStrings } from '@/lib/types';
import type { Locale } from '@/i18n';

function pick(strings: LocalizedStrings, locale: Locale) {
  return strings[locale] ?? strings.en;
}

export function MenuBlocks({ categories }: { categories: MenuCategory[] }) {
  const locale = useLocale() as Locale;
  const tNav = useTranslations('nav');
  const tMenu = useTranslations('menu');
  const tCat = useTranslations('categories');
  const tFeatures = useTranslations('features');
  const tSearch = useTranslations('search');

  const [active, setActive] = useState(categories[0]?.id ?? '');
  const [query, setQuery] = useState('');
  const blockRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const features = useMemo(() => {
    const result: Array<MenuItem & { catId: string }> = [];
    for (const cat of categories) {
      for (const item of cat.items) {
        if (item.highlight) result.push({ ...item, catId: cat.id });
      }
    }
    return result;
  }, [categories]);

  const visibleCats = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories
      .map((c) => ({
        ...c,
        items: c.items.filter((it) =>
          Object.values(it.names).some((n) => n.toString().toLowerCase().includes(q)),
        ),
      }))
      .filter((c) => c.items.length > 0);
  }, [categories, query]);

  useEffect(() => {
    const els = categories
      .map((c) => blockRefs.current[c.id])
      .filter((el): el is HTMLDivElement => el != null);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        visible.sort(
          (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top),
        );
        const id = visible[0].target.getAttribute('data-cat');
        if (id) setActive(id);
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [categories, visibleCats]);

  const jumpTo = (id: string) => {
    const el = blockRefs.current[id];
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <div className="lb-menu-layout">
      {/* sticky category rail */}
      <div className="lb-cats-rail">
        <div className="lb-rail-head">{tNav('menu')}</div>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`lb-cat ${active === cat.id ? 'active' : ''}`}
            onClick={() => jumpTo(cat.id)}
            type="button"
          >
            <span>{tCat(cat.id)}</span>
            <span className="lb-cat-count">{cat.items.length}</span>
          </button>
        ))}
      </div>

      <div>
        {/* search */}
        <div className="lb-search">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tSearch('placeholder')}
          />
          {query.trim() && (
            <button
              className="lb-search-clear"
              type="button"
              onClick={() => setQuery('')}
              aria-label={tSearch('clear_label')}
            >
              ×
            </button>
          )}
        </div>

        {/* features strip — hidden while searching */}
        {!query.trim() && features.length > 0 && (
          <div className="lb-features">
            <div className="lb-features-head">
              <span className="lb-features-eyebrow">{tFeatures('eyebrow')}</span>
              <span className="lb-features-rule" />
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                }}
              >
                {features.length} {tFeatures('picks_suffix')}
              </span>
            </div>
            <div className="lb-features-grid">
              {features.map((it) => (
                <a
                  key={it.id}
                  href={`#menu-${it.catId}`}
                  className="lb-feature"
                  onClick={(e) => {
                    e.preventDefault();
                    jumpTo(it.catId);
                  }}
                >
                  <div className="lb-feature-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.img} alt={pick(it.names, locale)} loading="lazy" />
                    {it.highlight && <div className="lb-feature-tag">{it.highlight}</div>}
                  </div>
                  <div className="lb-feature-name">{pick(it.names, locale)}</div>
                  <div className="lb-feature-foot">
                    <span>{tCat(it.catId)}</span>
                    <span className="lb-feature-price">
                      {it.price}k{tMenu('currency')}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* category blocks */}
        {query.trim() && visibleCats.length === 0 ? (
          <div className="lb-noresult">{tSearch('no_results')}</div>
        ) : (
          visibleCats.map((cat) => (
            <div
              key={cat.id}
              className="lb-cat-block"
              data-cat={cat.id}
              id={`menu-${cat.id}`}
              ref={(el) => {
                blockRefs.current[cat.id] = el;
              }}
            >
              <div className="lb-cat-head">
                <div className="lb-cat-title">
                  <span>{cat.icon}</span>
                  <em>{tCat(cat.id)}</em>
                </div>
                <div className="lb-cat-num">
                  {String(cat.items.length).padStart(2, '0')} {tMenu('items_suffix')}
                </div>
              </div>
              <div className="lb-items">
                {cat.items.map((it) => {
                  const name = pick(it.names, locale);
                  const subtitle =
                    it.names.vi && it.names.vi !== name
                      ? it.names.vi
                      : it.notes?.en ?? tCat(cat.id);
                  const isHighlighted = !!it.highlight;
                  return (
                    <div key={it.id} className={`lb-item ${isHighlighted ? 'highlight' : ''}`}>
                      <div className="lb-item-img">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={it.img} alt={name} loading="lazy" />
                      </div>
                      <div className="lb-item-mid">
                        {(isHighlighted || it.badge) && (
                          <div
                            className={`lb-item-badge ${isHighlighted ? 'is-hl' : ''}`}
                          >
                            ⭐ {it.highlight ?? tMenu('must_try')}
                          </div>
                        )}
                        <div className="lb-item-name">{name}</div>
                        <div className="lb-item-sub">{subtitle}</div>
                      </div>
                      <div className="lb-item-price">
                        {it.price}k{tMenu('currency')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
