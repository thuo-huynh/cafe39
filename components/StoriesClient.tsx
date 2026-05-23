'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  videos: string[];
  labels: string[];
}

export function StoriesClient({ videos, labels }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // lock body scroll when modal is open
  useEffect(() => {
    if (active !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [active]);

  // keyboard navigation
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight' && active < videos.length - 1) setActive(active + 1);
      if (e.key === 'ArrowLeft' && active > 0) setActive(active - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, videos.length]);

  // reload + play when active changes
  useEffect(() => {
    if (active !== null && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [active]);

  if (videos.length === 0) return null;

  return (
    <>
      <div className="stories-row">
        {videos.map((src, i) => (
          <button
            key={src}
            className="story"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            onClick={() => setActive(i)}
            aria-label={labels[i] ?? `Story ${i + 1}`}
          >
            <div className="story-ring">
              <div className="story-slot" style={{ position: 'relative', overflow: 'hidden' }}>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video
                  src={src}
                  muted
                  preload="metadata"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', display: 'block' }}
                />
                <span style={{
                  position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
                  background: 'rgba(0,0,0,0.2)', color: '#fff', fontSize: 16,
                }}>▶</span>
              </div>
            </div>
            <div className="story-label">{labels[i] ?? `Story ${i + 1}`}</div>
          </button>
        ))}
      </div>

      {active !== null && createPortal(
        <div
          style={{
            position: 'fixed', inset: 0,
            zIndex: 9999,
            background: '#000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={() => setActive(null)}
        >
          {/* inner wrapper — stops click-through */}
          <div
            style={{
              position: 'relative',
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* label */}
            <div style={{
              position: 'absolute', top: 20, left: 20, zIndex: 10,
              color: '#fff', fontFamily: 'var(--mono)', fontSize: 11,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              textShadow: '0 1px 4px rgba(0,0,0,0.6)',
            }}>
              {labels[active] ?? `Story ${active + 1}`}
            </div>

            {/* close */}
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              style={{
                position: 'absolute', top: 16, right: 16, zIndex: 10,
                background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)',
                border: 'none', color: '#fff', borderRadius: '50%',
                width: 40, height: 40, fontSize: 18, cursor: 'pointer',
                display: 'grid', placeItems: 'center',
              }}
            >✕</button>

            {/* prev */}
            {active > 0 && (
              <button
                onClick={() => setActive(active - 1)}
                aria-label="Previous"
                style={navBtn('left')}
              >‹</button>
            )}

            {/* next */}
            {active < videos.length - 1 && (
              <button
                onClick={() => setActive(active + 1)}
                aria-label="Next"
                style={navBtn('right')}
              >›</button>
            )}

            {/* video */}
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              ref={videoRef}
              key={videos[active]}
              src={videos[active]}
              controls
              playsInline
              style={{
                maxWidth: '100vw',
                maxHeight: '100dvh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />

            {/* dot indicators */}
            {videos.length > 1 && (
              <div style={{
                position: 'absolute', bottom: 24,
                left: '50%', transform: 'translateX(-50%)',
                display: 'flex', gap: 6, zIndex: 10,
              }}>
                {videos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Go to story ${i + 1}`}
                    style={{
                      width: i === active ? 20 : 6,
                      height: 6, borderRadius: 3,
                      background: i === active ? '#fff' : 'rgba(255,255,255,0.4)',
                      border: 'none', cursor: 'pointer', padding: 0,
                      transition: 'all 0.2s',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        ,
        document.body
      )}
    </>
  );
}

function navBtn(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute',
    top: '50%', transform: 'translateY(-50%)',
    [side]: 16,
    background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)',
    border: 'none', color: '#fff', borderRadius: '50%',
    width: 44, height: 44, fontSize: 24,
    cursor: 'pointer', zIndex: 10,
    display: 'grid', placeItems: 'center',
  };
}
