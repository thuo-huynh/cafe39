// shared.jsx — LangPicker renders inline flag buttons (one for each language).
// Reads/writes current lang via window.__setLang / window.__lang.

function LangPicker({ variant = 'b', compact = false }) {
  const [lang, setLang] = React.useState(window.__lang || 'en');

  React.useEffect(() => {
    const onLang = (e) => setLang(e.detail);
    window.addEventListener('langchange', onLang);
    return () => window.removeEventListener('langchange', onLang);
  }, []);

  const buttons = (
    <div className={`langrow langrow-${variant}`}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          className={`langbtn ${l.code === lang ? 'active' : ''}`}
          onClick={() => window.__setLang?.(l.code)}
          title={l.label}
          aria-label={l.label}
          aria-pressed={l.code === lang}
        >
          <span className="langbtn-flag">{l.flag}</span>
          {!compact && <span className="langbtn-label">{l.label}</span>}
        </button>
      ))}
      <style>{`
        .langrow { display: inline-flex; flex-wrap: wrap; gap: 6px; }
        .langbtn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 10px;
          border: 1.5px solid transparent;
          background: color-mix(in srgb, var(--ink) 4%, transparent);
          color: var(--ink); cursor: pointer;
          font-family: var(--mono, ui-monospace, monospace);
          font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase;
          border-radius: 3px;
          transition: background 0.15s, border-color 0.15s, transform 0.15s, color 0.15s;
        }
        .langbtn:hover { background: color-mix(in srgb, var(--accent) 14%, transparent); }
        .langbtn.active {
          background: var(--ink); color: var(--bg);
          border-color: var(--ink);
        }
        .langbtn-flag { font-size: 14px; line-height: 1; }
        .langrow-a .langbtn { border-radius: 999px; }
      `}</style>
    </div>
  );

  return buttons;
}

window.LangPicker = LangPicker;
