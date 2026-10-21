import React, { useState } from 'react';
import { 
  Monitor, 
  Smartphone, 
  Check, 
  ArrowUpRight,
  ShoppingBag,
  Sliders,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  Layers,
  Sparkles,
  Globe
} from 'lucide-react';

interface InaayahEditorPreviewProps {
  compact?: boolean;
}

interface BlockDetail {
  label: string;
  value: string;
}

interface BlockConfig {
  id: string;
  name: string;
  category: string;
  htmlTag: string;
  font: string;
  fontSize: string;
  alignment: 'left' | 'center' | 'right';
  padding: string;
  bgHex: string;
  bgName: string;
  textHex: string;
  details: BlockDetail[];
}

const BLOCK_CONFIGS: Record<string, BlockConfig> = {
  hero: {
    id: 'hero',
    name: 'Hero Section',
    category: 'Display & Header',
    htmlTag: '<section class="hero">',
    font: 'Fraunces Serif',
    fontSize: '28px / 1.25',
    alignment: 'center',
    padding: '36px 24px',
    bgHex: '#ffffff',
    bgName: 'Studio Canvas',
    textHex: '#1c1917',
    details: [
      { label: 'Typography', value: 'Fraunces Display 500' },
      { label: 'Max Width', value: '660px (Contained)' },
      { label: 'Primary CTA', value: 'Explore collection' },
      { label: 'Secondary CTA', value: 'Read story' },
      { label: 'Responsive', value: 'Fluid clamp()' }
    ]
  },
  announcementBar: {
    id: 'announcementBar',
    name: 'Announcement Bar',
    category: 'Notice & Promo',
    htmlTag: '<aside class="banner">',
    font: 'Inter Sans',
    fontSize: '11px / 1.4',
    alignment: 'center',
    padding: '7px 12px',
    bgHex: '#134e4a',
    bgName: 'Deep Forest',
    textHex: '#ffffff',
    details: [
      { label: 'Promo Code', value: 'AUTUMN15 (-15%)' },
      { label: 'Font Weight', value: '500 Medium' },
      { label: 'Link Target', value: '/shop' },
      { label: 'Dismissible', value: 'Optional' }
    ]
  },
  navbar: {
    id: 'navbar',
    name: 'Site Navigation',
    category: 'Header & Links',
    htmlTag: '<nav class="site-nav">',
    font: 'Fraunces & Inter',
    fontSize: '16px / 12px',
    alignment: 'left',
    padding: '12px 20px',
    bgHex: '#ffffff',
    bgName: 'Clean Surface',
    textHex: '#1c1917',
    details: [
      { label: 'Studio Mark', value: 'Aura Studio' },
      { label: 'Nav Items', value: 'Works, Shop, Journal' },
      { label: 'Cart Badge', value: 'Direct Checkout' },
      { label: 'Border', value: '1px subtle stone' }
    ]
  },
  productList: {
    id: 'productList',
    name: 'Product Showcase',
    category: 'Catalog & Store',
    htmlTag: '<section class="catalog">',
    font: 'Inter Sans',
    fontSize: '11px / 13px',
    alignment: 'left',
    padding: '16px',
    bgHex: '#fafaf9',
    bgName: 'Warm Sand',
    textHex: '#1c1917',
    details: [
      { label: 'Grid Layout', value: '2-Column Responsive' },
      { label: 'Catalog Items', value: '2 Curated Pieces' },
      { label: 'Pricing Tokens', value: '$48 & $85' },
      { label: 'Payment Mode', value: 'Direct Payment Link' },
      { label: 'Inquiry Form', value: 'Custom Embed Supported' }
    ]
  },
  newsletter: {
    id: 'newsletter',
    name: 'Journal & Newsletter',
    category: 'Audience & Form',
    htmlTag: '<section class="subscribe">',
    font: 'Fraunces & Inter',
    fontSize: '18px / 12px',
    alignment: 'center',
    padding: '24px 20px',
    bgHex: '#ffffff',
    bgName: 'Studio Canvas',
    textHex: '#1c1917',
    details: [
      { label: 'Data Destination', value: 'Local CSV / Webhook' },
      { label: 'Protection', value: 'Honeypot (No Captcha)' },
      { label: 'Privacy', value: '0% Third-Party Trackers' },
      { label: 'Export', value: 'One-Click Download' }
    ]
  },
  footer: {
    id: 'footer',
    name: 'Colophon & Footer',
    category: 'Footer & Links',
    htmlTag: '<footer class="colophon">',
    font: 'Inter Sans',
    fontSize: '11px / 1.5',
    alignment: 'left',
    padding: '20px 20px',
    bgHex: '#f5f5f4',
    bgName: 'Stone Warm',
    textHex: '#78716c',
    details: [
      { label: 'Colophon', value: 'Aura Studio · Kyoto & Global' },
      { label: 'Links', value: 'Shipping, Care, Inquiries' },
      { label: 'Licensing', value: '100% DRM-Free Open' }
    ]
  }
};

export const InaayahEditorPreview: React.FC<InaayahEditorPreviewProps> = ({ compact = false }) => {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedBlock, setSelectedBlock] = useState<string>('hero');
  const [activePage, setActivePage] = useState<string>('home');
  const [rightTab, setRightTab] = useState<'copilot' | 'inspector'>('copilot');

  const blocks = [
    { id: 'announcementBar', label: 'announcementBar' },
    { id: 'navbar', label: 'navbar' },
    { id: 'hero', label: 'hero' },
    { id: 'productList', label: 'productList' },
    { id: 'newsletter', label: 'newsletter' },
    { id: 'footer', label: 'footer' }
  ];

  const currentConfig = BLOCK_CONFIGS[selectedBlock] || BLOCK_CONFIGS.hero;

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
            inaayah-builder · aura-studio
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
            Live at aurastudio.inaayah.dev
          </span>
          <a
            href="https://qa-builder.inaayah.dev/"
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

      {/* Editor Body Grid: Left Sidebar, Canvas, Right Inspector */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: compact ? '1fr' : '180px 1fr 290px',
          minHeight: compact ? 420 : 540,
          background: '#f7f3ea'
        }}
      >
        {/* LEFT COLUMN: Site Pages & Blocks */}
        {!compact && (
          <div 
            style={{
              background: 'rgba(255, 255, 255, 0.92)',
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
                    Live
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
                        Catalog
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#57534e', marginBottom: 8 }}>
                Page Blocks
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 3, fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                {blocks.map((b) => (
                  <li 
                    key={b.id}
                    onClick={() => {
                      setSelectedBlock(b.id);
                      setRightTab('inspector');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '6px 8px',
                      borderRadius: 6,
                      background: selectedBlock === b.id ? '#ffffff' : 'transparent',
                      color: selectedBlock === b.id ? '#1c1917' : '#78716c',
                      fontWeight: selectedBlock === b.id ? 600 : 400,
                      boxShadow: selectedBlock === b.id ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                      border: selectedBlock === b.id ? '1px solid #e7e5e4' : '1px solid transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <span 
                      style={{ 
                        width: 6, 
                        height: 6, 
                        borderRadius: '50%', 
                        background: selectedBlock === b.id ? '#0d9488' : '#d6d3d1' 
                      }} 
                    />
                    <span>{b.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid #e7e5e4', fontSize: 11, color: '#78716c' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <Layers size={13} color="#0d9488" />
                <span style={{ fontWeight: 600, color: '#1c1917' }}>Deterministic CSS</span>
              </div>
              <p style={{ margin: 0, fontSize: 10, lineHeight: 1.4 }}>
                Structured primitives ensure zero overflow and clean mobile layouts.
              </p>
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
            {/* Block 1: Announcement Bar */}
            <div 
              onClick={() => {
                setSelectedBlock('announcementBar');
                setRightTab('inspector');
              }}
              style={{
                background: '#134e4a',
                color: '#ffffff',
                padding: '7px 12px',
                textAlign: 'center',
                fontSize: 11,
                fontWeight: 500,
                outline: selectedBlock === 'announcementBar' ? '2px solid #0d9488' : 'none',
                outlineOffset: -2,
                cursor: 'pointer'
              }}
            >
              Autumn Edit: Enjoy 15% off bespoke ceramics with code{' '}
              <span style={{ fontWeight: 700, textDecoration: 'underline' }}>AUTUMN15</span>
            </div>

            {/* Block 2: Site Nav */}
            <div 
              onClick={() => {
                setSelectedBlock('navbar');
                setRightTab('inspector');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 20px',
                borderBottom: '1px solid #f5f5f4',
                outline: selectedBlock === 'navbar' ? '2px solid #0d9488' : 'none',
                outlineOffset: -2,
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

            {/* Block 3: Hero Section */}
            <div 
              onClick={() => {
                setSelectedBlock('hero');
                setRightTab('inspector');
              }}
              style={{
                padding: viewport === 'mobile' ? '24px 16px' : '36px 24px',
                textAlign: 'center',
                outline: selectedBlock === 'hero' ? '2px solid #0d9488' : 'none',
                outlineOffset: -2,
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

            {/* Block 4: Product Showcase Grid */}
            <div 
              onClick={() => {
                setSelectedBlock('productList');
                setRightTab('inspector');
              }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                padding: '16px',
                background: '#fafaf9',
                borderTop: '1px solid #f5f5f4',
                outline: selectedBlock === 'productList' ? '2px solid #0d9488' : 'none',
                outlineOffset: -2,
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
                <div style={{ marginTop: 4, fontSize: 10, color: '#0d9488', fontWeight: 500 }}>
                  Direct Pay Link / Inquire →
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
                <div style={{ marginTop: 4, fontSize: 10, color: '#0d9488', fontWeight: 500 }}>
                  Direct Pay Link / Inquire →
                </div>
              </div>
            </div>

            {/* Block 5: Newsletter Block */}
            <div 
              onClick={() => {
                setSelectedBlock('newsletter');
                setRightTab('inspector');
              }}
              style={{
                padding: '24px 20px',
                background: '#ffffff',
                borderTop: '1px solid #f5f5f4',
                textAlign: 'center',
                outline: selectedBlock === 'newsletter' ? '2px solid #0d9488' : 'none',
                outlineOffset: -2,
                cursor: 'pointer'
              }}
            >
              <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 600, color: '#1c1917', marginBottom: 4 }}>
                Join the Aura Studio Journal
              </h4>
              <p style={{ fontSize: 11, color: '#78716c', marginBottom: 12 }}>
                Subtle notes on upcoming kiln releases and studio essays.
              </p>
              <div style={{ display: 'flex', maxWidth: 300, margin: '0 auto', gap: 6 }}>
                <input 
                  type="email" 
                  readOnly 
                  value="collector@domain.com" 
                  style={{ flex: 1, padding: '6px 10px', fontSize: 11, border: '1px solid #e7e5e4', borderRadius: 6, background: '#fafaf9', color: '#78716c' }} 
                />
                <button 
                  type="button" 
                  style={{ background: '#134e4a', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}
                >
                  Join
                </button>
              </div>
            </div>

            {/* Block 6: Colophon Footer */}
            <div 
              onClick={() => {
                setSelectedBlock('footer');
                setRightTab('inspector');
              }}
              style={{
                padding: '16px 20px',
                background: '#f5f5f4',
                borderTop: '1px solid #e7e5e4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 10,
                color: '#78716c',
                outline: selectedBlock === 'footer' ? '2px solid #0d9488' : 'none',
                outlineOffset: -2,
                cursor: 'pointer'
              }}
            >
              <span>© 2026 Aura Studio · Kyoto</span>
              <div style={{ display: 'flex', gap: 10 }}>
                <span>Shipping</span>
                <span>Commissions</span>
                <span>Inquiries</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Dual Mode (Live Site Co-Pilot / Block Inspector) */}
        {!compact && (
          <div 
            style={{
              background: 'rgba(255, 255, 255, 0.94)',
              borderLeft: '1px solid #e7e5e4',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflowY: 'auto'
            }}
          >
            <div>
              {/* Tab Switcher: Co-Pilot vs Inspector */}
              <div style={{ display: 'flex', background: '#f5f5f4', borderRadius: 8, padding: 3, marginBottom: 14, border: '1px solid #e7e5e4' }}>
                <button
                  type="button"
                  onClick={() => setRightTab('copilot')}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    padding: '5px 8px',
                    fontSize: 11,
                    fontWeight: 600,
                    borderRadius: 6,
                    border: 'none',
                    cursor: 'pointer',
                    background: rightTab === 'copilot' ? '#ffffff' : 'transparent',
                    color: rightTab === 'copilot' ? '#115e59' : '#78716c',
                    boxShadow: rightTab === 'copilot' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Sparkles size={12} color={rightTab === 'copilot' ? '#0d9488' : '#78716c'} />
                  <span>Site Co-Pilot</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRightTab('inspector')}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    padding: '5px 8px',
                    fontSize: 11,
                    fontWeight: 600,
                    borderRadius: 6,
                    border: 'none',
                    cursor: 'pointer',
                    background: rightTab === 'inspector' ? '#ffffff' : 'transparent',
                    color: rightTab === 'inspector' ? '#115e59' : '#78716c',
                    boxShadow: rightTab === 'inspector' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Sliders size={12} color={rightTab === 'inspector' ? '#0d9488' : '#78716c'} />
                  <span>Inspector</span>
                </button>
              </div>

              {/* VIEW 1: LIVE SITE CO-PILOT */}
              {rightTab === 'copilot' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e7e5e4', paddingBottom: 8, marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0d9488', boxShadow: '0 0 6px #0d9488' }} />
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#1c1917' }}>Live Site Co-Pilot</span>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#115e59', background: '#f0fdfa', padding: '2px 6px', borderRadius: 4 }}>
                      Ready to Assist
                    </span>
                  </div>

                  {/* Chat / Action History */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ background: '#f5f5f4', borderRadius: 8, padding: '8px 10px', fontSize: 11, color: '#292524' }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: '#78716c', marginBottom: 2 }}>Site Owner</div>
                      Feature our new Autumn ceramics collection with a 15% discount announcement bar and update the hero headline.
                    </div>

                    <div style={{ background: '#f0fdfa', border: '1px solid rgba(13, 148, 136, 0.25)', borderRadius: 8, padding: '10px', fontSize: 11, color: '#134e4a' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontWeight: 700, fontSize: 11, color: '#115e59', marginBottom: 6 }}>
                        <Check size={13} color="#0d9488" strokeWidth={3} />
                        <span>Live Edits Applied</span>
                      </div>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4, fontSize: 10, color: '#334155' }}>
                        <li>• Activated announcement bar with code AUTUMN15.</li>
                        <li>• Updated hero headline & specialty ceramics copy.</li>
                        <li>• Connected catalog items with direct payment links.</li>
                      </ul>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(13, 148, 136, 0.15)', marginTop: 8, paddingTop: 6, fontSize: 9 }}>
                        <span style={{ color: '#0d9488', fontWeight: 600 }}>Design System Intact</span>
                        <span style={{ background: '#115e59', color: '#ffffff', padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>
                          Live on Web
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Chips */}
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: '#78716c', marginBottom: 6 }}>Quick Actions</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      <span style={{ fontSize: 10, background: '#f5f5f4', padding: '3px 8px', borderRadius: 12, border: '1px solid #e7e5e4', color: '#57534e' }}>
                        + Add newsletter form
                      </span>
                      <span style={{ fontSize: 10, background: '#f5f5f4', padding: '3px 8px', borderRadius: 12, border: '1px solid #e7e5e4', color: '#57534e' }}>
                        + Reformat hero copy
                      </span>
                    </div>
                  </div>

                  {/* Prompt Input Box */}
                  <div style={{ marginTop: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f5f5f4', borderRadius: 6, padding: '7px 10px', fontSize: 11, color: '#a8a29e', border: '1px solid #e7e5e4' }}>
                      <span>Ask co-pilot to write or edit...</span>
                      <Sparkles size={12} color="#0d9488" />
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 2: GRANULAR BLOCK INSPECTOR */}
              {rightTab === 'inspector' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e7e5e4', paddingBottom: 8, marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Sliders size={13} color="#0d9488" />
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#1c1917' }}>Block Properties</span>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#115e59', background: '#f0fdfa', border: '1px solid rgba(20, 184, 166, 0.3)', padding: '2px 7px', borderRadius: 4 }}>
                      {currentConfig.name}
                    </span>
                  </div>

                  {/* Tag & Category */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, fontSize: 11 }}>
                    <span style={{ color: '#78716c' }}>{currentConfig.category}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#0f766e', background: '#f0fdfa', padding: '1px 5px', borderRadius: 3 }}>
                      {currentConfig.htmlTag}
                    </span>
                  </div>

                  {/* Typography Card */}
                  <div style={{ background: '#fafaf9', border: '1px solid #e7e5e4', borderRadius: 8, padding: '10px', marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, color: '#292524', marginBottom: 6 }}>
                      <Type size={12} color="#0d9488" />
                      <span>Typography</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 11 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#57534e' }}>
                        <span>Typeface</span>
                        <span style={{ fontWeight: 600, color: '#1c1917' }}>{currentConfig.font}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#57534e' }}>
                        <span>Scale / Leading</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#1c1917' }}>{currentConfig.fontSize}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, paddingTop: 4, borderTop: '1px solid #e7e5e4' }}>
                        <span style={{ color: '#57534e' }}>Alignment</span>
                        <div style={{ display: 'flex', gap: 2, background: '#e7e5e4', borderRadius: 4, padding: 2 }}>
                          <button type="button" style={{ border: 'none', background: currentConfig.alignment === 'left' ? '#fff' : 'transparent', borderRadius: 3, padding: '2px 4px', cursor: 'pointer', display: 'flex' }}>
                            <AlignLeft size={11} color={currentConfig.alignment === 'left' ? '#0d9488' : '#78716c'} />
                          </button>
                          <button type="button" style={{ border: 'none', background: currentConfig.alignment === 'center' ? '#fff' : 'transparent', borderRadius: 3, padding: '2px 4px', cursor: 'pointer', display: 'flex' }}>
                            <AlignCenter size={11} color={currentConfig.alignment === 'center' ? '#0d9488' : '#78716c'} />
                          </button>
                          <button type="button" style={{ border: 'none', background: currentConfig.alignment === 'right' ? '#fff' : 'transparent', borderRadius: 3, padding: '2px 4px', cursor: 'pointer', display: 'flex' }}>
                            <AlignRight size={11} color={currentConfig.alignment === 'right' ? '#0d9488' : '#78716c'} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Surface & Color Tokens */}
                  <div style={{ background: '#fafaf9', border: '1px solid #e7e5e4', borderRadius: 8, padding: '10px', marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, color: '#292524', marginBottom: 6 }}>
                      <Palette size={12} color="#0d9488" />
                      <span>Surface & Spacing</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 11 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#57534e' }}>Background</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ width: 12, height: 12, borderRadius: 3, background: currentConfig.bgHex, border: '1px solid #d6d3d1' }} />
                          <span style={{ fontWeight: 500, color: '#1c1917' }}>{currentConfig.bgName}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#57534e' }}>Padding Y/X</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#1c1917' }}>{currentConfig.padding}</span>
                      </div>
                    </div>
                  </div>

                  {/* Attributes List */}
                  <div style={{ background: '#ffffff', border: '1px solid #e7e5e4', borderRadius: 8, padding: '10px' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#78716c', marginBottom: 6 }}>
                      Block Configuration
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 11 }}>
                      {currentConfig.details.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: idx < currentConfig.details.length - 1 ? '1px solid #f5f5f4' : 'none', paddingBottom: 3 }}>
                          <span style={{ color: '#78716c', fontSize: 10 }}>{item.label}</span>
                          <span style={{ fontWeight: 500, color: '#1c1917', fontSize: 11 }}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Hosting & Deployment Status */}
            <div style={{ borderTop: '1px solid #e7e5e4', paddingTop: 12, marginTop: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: '#047857' }}>
                  <Check size={11} strokeWidth={3} />
                  <span>Hosted live on edge infrastructure</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: '#047857' }}>
                  <Check size={11} strokeWidth={3} />
                  <span>Custom domain & subdomain enabled</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: '#047857' }}>
                  <Check size={11} strokeWidth={3} />
                  <span>Direct payment links & forms</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f5f5f4', borderRadius: 6, padding: '6px 10px', fontSize: 11, border: '1px solid #e7e5e4' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Globe size={13} color="#115e59" />
                  <span style={{ color: '#1c1917', fontWeight: 600, fontSize: 11 }}>aurastudio.inaayah.dev</span>
                </div>
                <span style={{ background: '#115e59', color: '#ffffff', padding: '2px 6px', borderRadius: 4, fontSize: 10, fontWeight: 600 }}>
                  Live Site
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
