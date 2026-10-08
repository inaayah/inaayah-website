import React, { useState, useEffect } from 'react';
import { 
  Download, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  ChevronDown, 
  Play, 
  Code2, 
  Gamepad2, 
  Compass, 
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import { InaayahEditorPreview } from './InaayahEditorPreview';

interface PlatformOption {
  os: 'mac' | 'windows' | 'linux';
  name: string;
  ext: string;
  filename: string;
  url: string;
  size: string;
}

const PLATFORMS: Record<'mac' | 'windows' | 'linux', PlatformOption> = {
  mac: {
    os: 'mac',
    name: 'macOS',
    ext: '.dmg',
    filename: 'Inaayah-Launcher-mac.dmg',
    url: 'https://releases.inaayah.dev/api/launcher/download/mac',
    size: 'Latest'
  },
  windows: {
    os: 'windows',
    name: 'Windows',
    ext: '.exe',
    filename: 'Inaayah-Launcher-Setup.exe',
    url: 'https://releases.inaayah.dev/api/launcher/download/windows',
    size: 'Latest'
  },
  linux: {
    os: 'linux',
    name: 'Linux',
    ext: '.AppImage',
    filename: 'Inaayah-Launcher.AppImage',
    url: 'https://releases.inaayah.dev/api/launcher/download/linux',
    size: 'Latest'
  }
};

const TABS: Array<'builder' | 'games' | 'kettle'> = ['builder', 'games', 'kettle'];

interface HeroProps {
  onScrollTo?: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollTo }) => {
  const [detectedOs, setDetectedOs] = useState<'mac' | 'windows' | 'linux'>('mac');
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);
  const [platforms, setPlatforms] = useState(PLATFORMS);
  const [latestVersion, setLatestVersion] = useState('v0.2.1');
  const [activeTab, setActiveTab] = useState<'builder' | 'games' | 'kettle'>('builder');
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance slideshow every 6s until user explicitly selects a tab
  useEffect(() => {
    if (!isAutoPlay || isHovered) return;

    const timer = setInterval(() => {
      setActiveTab((prev) => {
        const idx = TABS.indexOf(prev);
        return TABS[(idx + 1) % TABS.length];
      });
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlay, isHovered]);

  const handleSelectTab = (tab: 'builder' | 'games' | 'kettle') => {
    setActiveTab(tab);
    setIsAutoPlay(false); // User clicked: permanently stop auto-advancing
  };

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.includes('win')) {
      setDetectedOs('windows');
    } else if (ua.includes('linux')) {
      setDetectedOs('linux');
    } else {
      setDetectedOs('mac');
    }

    // Fetch latest release metadata from edge gateway (with GitHub API fallback)
    const fetchLatest = async () => {
      try {
        let release: any = null;
        try {
          const edgeRes = await fetch('https://releases.inaayah.dev/api/launcher/latest');
          if (edgeRes.ok) release = await edgeRes.json();
        } catch {}

        if (!release) {
          const ghRes = await fetch('https://api.github.com/repos/inaayah/inaayah-launcher/releases/latest');
          if (ghRes.ok) release = await ghRes.json();
        }

        if (!release) return;
        const ver = release.version || release.tag_name;
        if (ver) setLatestVersion(ver.startsWith('v') ? ver : `v${ver}`);

        const formatSize = (bytes: number) => bytes ? `${Math.round(bytes / (1024 * 1024))} MB` : '';
        const assets: any[] = release.assets || [];
        const macAsset = assets.find((a: any) => a.name.endsWith('.dmg'));
        const winAsset = assets.find((a: any) => a.name.endsWith('.exe'));
        const linuxAsset = assets.find((a: any) => a.name.endsWith('.AppImage'));

        setPlatforms((prev) => ({
          mac: {
            ...prev.mac,
            filename: macAsset?.name || prev.mac.filename,
            url: 'https://releases.inaayah.dev/api/launcher/download/mac',
            size: macAsset ? formatSize(macAsset.size) : prev.mac.size
          },
          windows: {
            ...prev.windows,
            filename: winAsset?.name || prev.windows.filename,
            url: 'https://releases.inaayah.dev/api/launcher/download/windows',
            size: winAsset ? formatSize(winAsset.size) : prev.windows.size
          },
          linux: {
            ...prev.linux,
            filename: linuxAsset?.name || prev.linux.filename,
            url: 'https://releases.inaayah.dev/api/launcher/download/linux',
            size: linuxAsset ? formatSize(linuxAsset.size) : prev.linux.size
          }
        }));
      } catch (e) {
        console.warn('Could not resolve latest release dynamically:', e);
      }
    };

    fetchLatest();
  }, []);

  const activePlatform = platforms[detectedOs];

  const handleScroll = (id: string) => {
    if (onScrollTo) {
      onScrollTo(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="overview" className="hero-section">
      <div className="container">
        {/* Studio Pill */}
        <div className="hero-pill">
          <span className="badge badge-cyan">
            <Sparkles size={12} />
            Independent Creative Software & Indie Studio
          </span>
        </div>

        {/* Elevated Title */}
        <h1 className="hero-title">
          Engineering Intelligent Web Tools, <br />
          <span className="gradient-text-cyan">Modern Webapps & Indie Worlds.</span>
        </h1>

        {/* Expanded Subtitle */}
        <p className="hero-subtitle">
          Inaayah is a multidisciplinary digital studio. We build next-generation visual site builders, 
          privacy-respecting web utilities, and high-octane indie games—grounded in zero telemetry, 
          open standards, and extreme speed.
        </p>

        {/* Studio CTA Row */}
        <div className="hero-cta-group">
          <div className="download-cta-row">
            <button 
              onClick={() => handleScroll('builder')}
              className="btn btn-primary"
              style={{ padding: '16px 32px', fontSize: 16 }}
            >
              <Code2 size={18} />
              <span>Explore Web Builder (Pre-Alpha)</span>
              <ArrowRight size={16} />
            </button>

            <a 
              href={activePlatform.url} 
              className="btn btn-secondary"
              style={{ padding: '16px 28px', fontSize: 15 }}
            >
              <Download size={18} color="var(--accent-cyan)" />
              <span>Get Launcher ({activePlatform.name})</span>
            </a>

            <button 
              onClick={() => setShowAllPlatforms(!showAllPlatforms)}
              className="btn btn-secondary"
              style={{ padding: '16px 18px', fontSize: 14 }}
              title="Select another OS"
            >
              <span>Other OS</span>
              <ChevronDown size={16} style={{ transform: showAllPlatforms ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
          </div>

          {showAllPlatforms && (
            <div 
              className="glass-panel" 
              style={{ 
                padding: '16px 24px', 
                display: 'flex', 
                gap: 16, 
                flexWrap: 'wrap', 
                justifyContent: 'center',
                maxWidth: 620,
                marginTop: 8
              }}
            >
              {(Object.keys(platforms) as Array<'mac' | 'windows' | 'linux'>).map((key) => {
                const p = platforms[key];
                return (
                  <a
                    key={key}
                    href={p.url}
                    className="btn btn-secondary"
                    style={{ 
                      padding: '10px 16px', 
                      fontSize: 13,
                      borderColor: detectedOs === key ? 'var(--accent-cyan)' : 'var(--border-glass)'
                    }}
                  >
                    <Download size={14} color={detectedOs === key ? 'var(--accent-cyan)' : undefined} />
                    <span>{p.name} {p.ext}</span>
                  </a>
                );
              })}
              <a
                href="https://github.com/inaayah/inaayah-launcher/releases/latest"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
                style={{ padding: '10px 16px', fontSize: 13 }}
              >
                <span>View All Assets (.zip / .tar.gz) ↗</span>
              </a>
            </div>
          )}

          {/* Studio Principles Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 13, marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={16} color="var(--accent-green)" />
              <span>Zero Telemetry / No Surveillance</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Zap size={16} color="var(--accent-gold)" />
              <span>Sub-Second Edge Infrastructure</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={16} color="var(--accent-cyan)" />
              <span>100% DRM-Free & Open Standards</span>
            </div>
          </div>
        </div>

        {/* Interactive Studio Switcher Segmented Control */}
        <div 
          className="studio-tabs-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div className="studio-tabs">
              <button 
                onClick={() => handleSelectTab('builder')}
                className={`studio-tab-btn tab-builder ${activeTab === 'builder' ? 'active' : ''} ${activeTab === 'builder' && isAutoPlay ? 'is-autoplay' : ''} ${isHovered ? 'is-paused' : ''}`}
                title="Inaayah Builder"
              >
                <Code2 size={16} />
                <span>Inaayah Builder</span>
                <span className="badge badge-gold" style={{ fontSize: 9, padding: '1px 6px' }}>Pre-Alpha</span>
              </button>

              <button 
                onClick={() => handleSelectTab('games')}
                className={`studio-tab-btn tab-games ${activeTab === 'games' ? 'active' : ''} ${activeTab === 'games' && isAutoPlay ? 'is-autoplay' : ''} ${isHovered ? 'is-paused' : ''}`}
                title="AetherRush 3D & Launcher"
              >
                <Gamepad2 size={16} />
                <span>Launcher & AetherRush 3D</span>
                <span className="badge badge-cyan" style={{ fontSize: 9, padding: '1px 6px' }}>Live v1.2</span>
              </button>

              <button 
                onClick={() => handleSelectTab('kettle')}
                className={`studio-tab-btn tab-kettle ${activeTab === 'kettle' ? 'active' : ''} ${activeTab === 'kettle' && isAutoPlay ? 'is-autoplay' : ''} ${isHovered ? 'is-paused' : ''}`}
                title="Kettle Court Web Game"
              >
                <Compass size={16} />
                <span>Kettle Court</span>
                <span className="badge badge-green" style={{ fontSize: 9, padding: '1px 6px' }}>Live Web</span>
              </button>
            </div>

            {/* Subtle Carousel Progress & Play/Pause Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--text-muted)' }}>
              {isAutoPlay ? (
                <>
                  <span 
                    style={{ 
                      width: 6, 
                      height: 6, 
                      borderRadius: '50%', 
                      background: isHovered ? 'var(--accent-gold)' : 'var(--accent-cyan)',
                      boxShadow: isHovered ? '0 0 6px var(--accent-gold)' : '0 0 6px var(--accent-cyan)'
                    }} 
                  />
                  <span>
                    {isHovered ? 'Paused (hovering) · Click any tab to pin' : 'Auto-previewing studio portfolio · Click any tab to pin'}
                  </span>
                </>
              ) : (
                <>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#64748b' }} />
                  <span>Pinned to selection ·</span>
                  <button 
                    onClick={() => setIsAutoPlay(true)}
                    style={{ 
                      background: 'transparent', 
                      border: 'none', 
                      color: 'var(--accent-cyan)', 
                      fontSize: 11, 
                      cursor: 'pointer', 
                      textDecoration: 'underline',
                      padding: 0 
                    }}
                  >
                    Resume auto-play
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Mockup Frame that switches based on activeTab */}
        <div 
          className="mockup-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            if (isAutoPlay) setIsAutoPlay(false);
          }}
        >
          {activeTab === 'builder' ? (
            <InaayahEditorPreview />
          ) : (
            <div className="mockup-inner">
              <div className="mockup-titlebar">
                <div className="mockup-dots">
                  <div className="mockup-dot" style={{ background: '#ff5f56' }} />
                  <div className="mockup-dot" style={{ background: '#ffbd2e' }} />
                  <div className="mockup-dot" style={{ background: '#27c93f' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                  <img src="/icon.png" alt="Inaayah" style={{ width: 14, height: 14, borderRadius: 3 }} />
                  <span style={{ fontWeight: 600, letterSpacing: '0.05em' }}>
                    {activeTab === 'games' && `INAAYAH LAUNCHER ${latestVersion.toUpperCase()} · 3D ARCADE SUITE`}
                    {activeTab === 'kettle' && 'KETTLE COURT · CLOUDFLARE EDGE DURABLE OBJECTS'}
                  </span>
                </div>
                <div style={{ width: 48 }} />
              </div>

              {/* TAB 2: GAMES & LAUNCHER */}
            {activeTab === 'games' && (
              <div id="launcher" style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: '#0b0e14' }}>
                <img 
                  src="/images/aether-rush-banner.jpg" 
                  alt="Inaayah Launcher Interface" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} 
                />
                <div 
                  style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'linear-gradient(180deg, rgba(11,14,20,0.1) 0%, rgba(11,14,20,0.85) 75%, rgba(11,14,20,0.98) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '36px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
                    <div style={{ textAlign: 'left' }}>
                      <span className="badge badge-cyan" style={{ marginBottom: 8 }}>Featured Studio Title</span>
                      <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8, color: '#fff' }}>AetherRush: Cyber Brawler 3D</h2>
                      <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 520 }}>
                        High-octane 2.5D beat 'em up featuring full controller support, 6 dynamic stages, and live Nakama multiplayer.
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <button 
                        onClick={() => handleScroll('games')}
                        className="btn btn-primary" 
                        style={{ padding: '12px 24px' }}
                      >
                        <Play size={16} fill="currentColor" />
                        <span>Explore Game Releases</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: KETTLE COURT */}
            {activeTab === 'kettle' && (
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: '#0b0e14' }}>
                <img 
                  src="/images/kettle-court-banner.jpg" 
                  alt="Kettle Court Table Game" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} 
                />
                <div 
                  style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'linear-gradient(180deg, rgba(11,14,20,0.1) 0%, rgba(11,14,20,0.85) 75%, rgba(11,14,20,0.98) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '36px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
                    <div style={{ textAlign: 'left' }}>
                      <span className="badge badge-green" style={{ marginBottom: 8 }}>Instant Web Play · Edge Durable Objects</span>
                      <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8, color: '#fff' }}>Kettle Court: Medieval Strategy</h2>
                      <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 520 }}>
                        Turn-based cozy fairground strategy game for 2 to 5 players. Play directly in any desktop or mobile browser with zero installs.
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <a 
                        href="https://kettle-court.inaayah.dev/" 
                        target="_blank" 
                        rel="noreferrer"
                        className="btn btn-glow-magenta" 
                        style={{ padding: '12px 24px' }}
                      >
                        <Play size={16} fill="currentColor" />
                        <span>Play in Browser Now</span>
                        <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        </div>
      </div>
    </section>
  );
};
