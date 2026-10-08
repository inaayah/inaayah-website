import React, { useState } from 'react';
import { 
  Monitor, 
  Smartphone, 
  Sparkles, 
  Check, 
  ArrowUpRight,
  ShoppingBag
} from 'lucide-react';

interface InaayahEditorPreviewProps {
  compact?: boolean;
}

export const InaayahEditorPreview: React.FC<InaayahEditorPreviewProps> = ({ compact = false }) => {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedBlock, setSelectedBlock] = useState<string>('hero');
  const [activePage, setActivePage] = useState<string>('home');

  const blocks = [
    { id: 'announcementBar', label: 'announcementBar' },
    { id: 'navbar', label: 'navbar' },
    { id: 'hero', label: 'hero (selected)' },
    { id: 'productList', label: 'productList' },
    { id: 'newsletter', label: 'newsletter' },
    { id: 'footer', label: 'footer' }
  ];

  return (
    <div 
      className="inaayah-editor-container" 
      style={{
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        border: '1px solid rgba(220, 215, 201, 0.4)',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(17, 94, 89, 0.15)',
        background: '#1a1f2c',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Top Titlebar */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          background: '#ffffff',
          borderBottom: '1px solid #e7e5e4'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f87171' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fbbf24' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#34d399' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: '#57534e', marginLeft: 6 }}>
            inaayah-editor · aura-studio
          </span>
        </div>

        {/* Viewport Toggles */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#f5f5f4',
            borderRadius: 8,
            padding: 3,
            border: '1px solid #e7e5e4'
          }}
        >
          <button
            type="button"
            onClick={() => setViewport('desktop')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 10px',
              fontSize: 11,
              fontWeight: 600,
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              background: viewport === 'desktop' ? '#ffffff' : 'transparent',
              color: viewport === 'desktop' ? '#1c1917' : '#78716c',
              boxShadow: viewport === 'desktop' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Monitor size={13} />
            <span>Desktop</span>
          </button>

          <button
            type="button"
            onClick={() => setViewport('mobile')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 10px',
              fontSize: 11,
              fontWeight: 600,
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              background: viewport === 'mobile' ? '#ffffff' : 'transparent',
              color: viewport === 'mobile' ? '#1c1917' : '#78716c',
              boxShadow: viewport === 'mobile' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Smartphone size={13} />
            <span>Mobile</span>
          </button>
        </div>

        {/* Publish & Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span 
            style={{
              display: compact ? 'none' : 'inline-flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 11,
              fontWeight: 500,
              color: '#047857',
              background: '#ecfdf5',
              padding: '2px 8px',
              borderRadius: 9999
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
            Live at aurastudio.dev
          </span>
          <a
            href="https://qa.inaayah.dev/"
            target="_blank"
            rel="noreferrer"
            style={{
              background: '#1c1917',
              color: '#ffffff',
              fontSize: 11,
              fontWeight: 600,
              padding: '5px 12px',
              borderRadius: 6,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            <span>Live QA</span>
            <ArrowUpRight size={11} />
          </a>
        </div>
      </div>

      {/* Editor Body Grid: Left Sidebar, Canvas, Right Co-Pilot */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: compact ? '1fr' : '180px 1fr 280px',
          minHeight: compact ? 420 : 500,
          background: '#f7f3ea'
        }}
      >
        {/* LEFT COLUMN: Site Pages & Blocks */}
        {!compact && (
          <div 
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              borderRight: '1px solid #e7e5e4',
              padding: '16px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16
            }}
          >
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#57534e', marginBottom: 8 }}>
                Site Pages
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 3, fontSize: 12 }}>
                <li 
                  onClick={() => setActivePage('home')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '5px 8px',
                    borderRadius: 6,
                    background: activePage === 'home' ? 'rgba(17, 94, 89, 0.12)' : 'transparent',
                    color: activePage === 'home' ? '#115e59' : '#57534e',
                    fontWeight: activePage === 'home' ? 600 : 400,
                    cursor: 'pointer'
                  }}
                >
                  <span>/ (Home)</span>
                  <span style={{ fontSize: 9, background: 'rgba(17, 94, 89, 0.15)', color: '#115e59', padding: '1px 5px', borderRadius: 4 }}>
                    Draft
                  </span>
                </li>
                {['/about', '/shop', '/journal', '/contact'].map((p) => (
                  <li 
                    key={p}
                    onClick={() => setActivePage(p)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '5px 8px',
                      borderRadius: 6,
                      color: activePage === p ? '#115e59' : '#78716c',
                      background: activePage === p ? 'rgba(17, 94, 89, 0.12)' : 'transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{p}</span>
                    {p === '/shop' && (
                      <span style={{ fontSize: 8, background: '#e7e5e4', color: '#44403c', padding: '1px 4px', borderRadius: 3 }}>
                        Cart
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#57534e', marginBottom: 8 }}>
                Layout Blocks
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 3, fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                {blocks.map((b) => (
                  <li 
                    key={b.id}
                    onClick={() => setSelectedBlock(b.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '5px 8px',
                      borderRadius: 6,
                      background: selectedBlock === b.id ? '#ffffff' : 'transparent',
                      color: selectedBlock === b.id ? '#1c1917' : '#78716c',
                      fontWeight: selectedBlock === b.id ? 600 : 400,
                      boxShadow: selectedBlock === b.id ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#0d9488' }} />
                    <span>{b.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* CENTER COLUMN: Live Scandinavian Editorial Canvas */}
        <div 
          style={{
            padding: viewport === 'mobile' ? '20px 10px' : '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            overflowY: 'auto'
          }}
        >
          <div 
            style={{
              width: '100%',
              maxWidth: viewport === 'mobile' ? 360 : 660,
              background: '#ffffff',
              borderRadius: 14,
              border: '1px solid #d6d3d1',
              boxShadow: '0 8px 30px rgba(41, 37, 36, 0.08)',
              overflow: 'hidden',
              transition: 'max-width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Announcement Bar */}
            <div 
              onClick={() => setSelectedBlock('announcementBar')}
              style={{
                background: '#134e4a',
                color: '#ffffff',
                padding: '7px 12px',
                textAlign: 'center',
                fontSize: 11,
                fontWeight: 500,
                outline: selectedBlock === 'announcementBar' ? '2px solid #0d9488' : 'none',
                cursor: 'pointer'
              }}
            >
              Autumn Edit: Enjoy 15% off bespoke ceramics with code{' '}
              <span style={{ fontWeight: 700, textDecoration: 'underline' }}>AUTUMN15</span>
            </div>

            {/* Site Nav */}
            <div 
              onClick={() => setSelectedBlock('navbar')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 20px',
                borderBottom: '1px solid #f5f5f4',
                outline: selectedBlock === 'navbar' ? '2px solid #0d9488' : 'none',
                cursor: 'pointer'
              }}
            >
              <span style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 600, color: '#1c1917' }}>
                Aura Studio
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, color: '#57534e' }}>
                <span>Works</span>
                <span>Shop</span>
                <span>Journal</span>
                <span 
                  style={{
                    background: '#1c1917',
                    color: '#ffffff',
                    padding: '3px 8px',
                    borderRadius: 9999,
                    fontSize: 10,
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  <ShoppingBag size={11} />
                  <span>Cart (0)</span>
                </span>
              </div>
            </div>

            {/* Hero Section */}
            <div 
              onClick={() => setSelectedBlock('hero')}
              style={{
                padding: viewport === 'mobile' ? '24px 16px' : '36px 24px',
                textAlign: 'center',
                outline: selectedBlock === 'hero' ? '2px solid #0d9488' : 'none',
                cursor: 'pointer',
                background: selectedBlock === 'hero' ? 'rgba(13, 148, 136, 0.02)' : 'transparent'
              }}
            >
              <span 
                style={{
                  display: 'inline-block',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#115e59',
                  marginBottom: 8
                }}
              >
                Specialty Objects
              </span>
              <h3 
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: viewport === 'mobile' ? 22 : 28,
                  lineHeight: 1.25,
                  fontWeight: 500,
                  color: '#1c1917',
                  marginBottom: 10
                }}
              >
                Considered ceramics for mindful living.
              </h3>
              <p style={{ fontSize: 12, color: '#78716c', maxWidth: 360, margin: '0 auto 16px', lineHeight: 1.5 }}>
                Wheel-thrown in Kyoto, finished with natural wood ash glazes.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                <span 
                  style={{
                    background: '#115e59',
                    color: '#ffffff',
                    padding: '6px 14px',
                    borderRadius: 9999,
                    fontSize: 11,
                    fontWeight: 600
                  }}
                >
                  Explore collection
                </span>
                <span 
                  style={{
                    border: '1px solid #d6d3d1',
                    color: '#44403c',
                    padding: '6px 14px',
                    borderRadius: 9999,
                    fontSize: 11,
                    fontWeight: 500
                  }}
                >
                  Read story
                </span>
              </div>
            </div>

            {/* Product List Grid */}
            <div 
              onClick={() => setSelectedBlock('productList')}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                padding: '16px',
                background: '#fafaf9',
                borderTop: '1px solid #f5f5f4',
                outline: selectedBlock === 'productList' ? '2px solid #0d9488' : 'none',
                cursor: 'pointer'
              }}
            >
              <div style={{ background: '#ffffff', border: '1px solid #e7e5e4', borderRadius: 8, padding: 10 }}>
                <div style={{ aspectRatio: '1/1', background: '#f5f5f4', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                  🍵
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, fontSize: 11, fontWeight: 600, color: '#1c1917' }}>
                  <span>Tenmoku Yunomi</span>
                  <span style={{ color: '#115e59' }}>$48</span>
                </div>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e7e5e4', borderRadius: 8, padding: 10 }}>
                <div style={{ aspectRatio: '1/1', background: '#f5f5f4', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                  🏺
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, fontSize: 11, fontWeight: 600, color: '#1c1917' }}>
                  <span>Shino Chawan</span>
                  <span style={{ color: '#115e59' }}>$85</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Living Website Co-Pilot (Gemini) */}
        {!compact && (
          <div 
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              borderLeft: '1px solid #e7e5e4',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e7e5e4', paddingBottom: 10, marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0d9488', boxShadow: '0 0 6px #0d9488' }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#1c1917' }}>Site Agent Co-Pilot</span>
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#115e59', background: '#f0fdfa', padding: '2px 6px', borderRadius: 4 }}>
                  Gemini 2.5
                </span>
              </div>

              {/* Chat Thread */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {/* User Prompt */}
                <div style={{ background: '#f5f5f4', borderRadius: 8, padding: '8px 10px', fontSize: 11, color: '#292524' }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: '#78716c', marginBottom: 2 }}>Site Owner</div>
                  Feature our new Autumn ceramics collection with a 15% discount announcement bar and update the hero headline.
                </div>

                {/* Copilot Action Report */}
                <div style={{ background: '#f0fdfa', border: '1px solid rgba(13, 148, 136, 0.25)', borderRadius: 8, padding: '10px', fontSize: 11, color: '#134e4a' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontWeight: 700, fontSize: 11, color: '#115e59', marginBottom: 6 }}>
                    <Check size={13} color="#0d9488" strokeWidth={3} />
                    <span>Draft Plan Applied (3 changes)</span>
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4, fontSize: 10, color: '#334155' }}>
                    <li>• Activated announcement bar with code AUTUMN15.</li>
                    <li>• Refined hero heading and typography.</li>
                    <li>• Populated featured ceramics from CMS.</li>
                  </ul>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(13, 148, 136, 0.15)', marginTop: 8, paddingTop: 6, fontSize: 9 }}>
                    <span style={{ color: '#0d9488', fontWeight: 600 }}>Strict Zod verified</span>
                    <span style={{ background: '#115e59', color: '#ffffff', padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>
                      Ready to publish
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prompt Input Box */}
            <div style={{ borderTop: '1px solid #e7e5e4', paddingTop: 10, marginTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f5f5f4', borderRadius: 6, padding: '6px 10px', fontSize: 11, color: '#a8a29e' }}>
                <span>Ask your agent to write or edit...</span>
                <Sparkles size={12} color="#0d9488" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
