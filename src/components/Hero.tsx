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
  const [latestVersion, setLatestVersion] = useState('v0.2.5');
  const [activeTab, setActiveTab] = useState<'builder' | 'games' | 'kettle'>('builder');
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

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
    setIsAutoPlay(false);
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
        <div className="section-rule">
          <span className="section-index">
            <span className="section-index-num">01 //</span>
            <span>INAAYAH STUDIO</span>
          </span>
          <span>INDEPENDENT GAMES &amp; WEB SOFTWARE</span>
        </div>

        <div className="hero-header-grid">
          <div>
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              <span>Launcher {latestVersion} Live · Builder in Pre-Alpha</span>
            </div>
            <h1 className="hero-title">
              <span className="tone-muted">Crafting high-octane</span> indie games,{' '}
              tactile web tools, <span className="tone-muted">and</span>{' '}
              <span className="tone-serif">edge software.</span>
            </h1>
          </div>

          <div id="launcher" className="hero-right-col">
            <p className="hero-subtitle">
              Inaayah is an independent software and game studio. We build story-driven 2D and 3D co-op games,
              a visual website builder with a live site co-pilot, and instant browser games hosted on edge infrastructure.
            </p>

            <div className="download-cta-row">
              <button
                onClick={() => handleScroll('builder')}
                className="btn btn-primary"
                style={{ padding: '12px 22px', fontSize: 14 }}
              >
                <span>Explore Web Builder</span>
                <ArrowRight size={15} />
              </button>

              <a
                href={activePlatform.url}
                className="btn btn-secondary"
                style={{ padding: '12px 20px', fontSize: 14 }}
              >
                <Download size={15} />
                <span>Get Launcher ({activePlatform.name})</span>
              </a>

              <button
                onClick={() => setShowAllPlatforms(!showAllPlatforms)}
                className="btn btn-secondary"
                style={{ padding: '12px 14px', fontSize: 13 }}
                title="Select another OS"
              >
                <span>OS</span>
                <ChevronDown size={14} style={{ transform: showAllPlatforms ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
            </div>

            {showAllPlatforms && (
              <div
                className="glass-panel"
                style={{
                  padding: '12px 14px',
                  display: 'flex',
                  gap: 10,
                  flexWrap: 'wrap'
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
                        padding: '8px 12px',
                        fontSize: 12,
                        borderColor: detectedOs === key ? 'rgba(255, 255, 255, 0.28)' : 'var(--border-glass)'
                      }}
                    >
                      <Download size={13} />
                      <span>{p.name} {p.ext}</span>
                    </a>
                  );
                })}
                <a
                  href="https://github.com/inaayah/inaayah-launcher/releases/latest"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                  style={{ padding: '8px 12px', fontSize: 12 }}
                >
                  <span>All Release Archives ↗</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Double-Bezel Interactive Stage with Docked Switcher */}
        <div
          className="stage-bezel"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="stage-inner">
            <div className="stage-dock">
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ display: 'flex', gap: 6 }} aria-hidden="true">
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.16)' }} />
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.16)' }} />
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.16)' }} />
                </div>

                <div className="stage-tabs" role="tablist" aria-label="Studio product showcase">
                  <button
                    onClick={() => handleSelectTab('builder')}
                    className={`stage-tab ${activeTab === 'builder' ? 'active' : ''} ${activeTab === 'builder' && isAutoPlay ? 'is-autoplay' : ''} ${isHovered ? 'is-paused' : ''}`}
                  >
                    <span className="stage-tab-index">01</span>
                    <Code2 size={14} />
                    <span>Inaayah Builder</span>
                    <span className="badge badge-gold" style={{ fontSize: 9, padding: '1px 5px' }}>Pre-Alpha</span>
                  </button>

                  <button
                    onClick={() => handleSelectTab('games')}
                    className={`stage-tab ${activeTab === 'games' ? 'active' : ''} ${activeTab === 'games' && isAutoPlay ? 'is-autoplay' : ''} ${isHovered ? 'is-paused' : ''}`}
                  >
                    <span className="stage-tab-index">02</span>
                    <Gamepad2 size={14} />
                    <span>Launcher &amp; Vigilante</span>
                    <span className="badge badge-cyan" style={{ fontSize: 9, padding: '1px 5px' }}>v1.0.2</span>
                  </button>

                  <button
                    onClick={() => handleSelectTab('kettle')}
                    className={`stage-tab ${activeTab === 'kettle' ? 'active' : ''} ${activeTab === 'kettle' && isAutoPlay ? 'is-autoplay' : ''} ${isHovered ? 'is-paused' : ''}`}
                  >
                    <span className="stage-tab-index">03</span>
                    <Compass size={14} />
                    <span>Kettle Court</span>
                    <span className="badge badge-green" style={{ fontSize: 9, padding: '1px 5px' }}>Web</span>
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {isAutoPlay ? (
                  <span>{isHovered ? 'PAUSED' : 'AUTO-CYCLE · 6S'}</span>
                ) : (
                  <button
                    onClick={() => setIsAutoPlay(true)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    RESUME CYCLE
                  </button>
                )}
              </div>
            </div>

            <div
              className="stage-viewport"
              onClick={() => {
                if (isAutoPlay) setIsAutoPlay(false);
              }}
            >
              {activeTab === 'builder' && (
                <div className="studio-builder-teaser">
                  <div className="studio-builder-copy">
                    <span className="badge badge-gold">01 // VISUAL WEB CREATION</span>
                    <h2>A home for your next great idea.</h2>
                    <p>Shape your site with structured editorial blocks, refine copy with your integrated co-pilot, and publish on your own custom domain.</p>
                    <div className="studio-builder-steps">
                      <span>01. ARRANGE</span>
                      <span>02. REFINE</span>
                      <span>03. PUBLISH</span>
                    </div>
                    <button className="btn btn-primary" onClick={() => handleScroll('builder')}>
                      <span>Explore the Builder</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                  <div className="studio-builder-paper" aria-hidden="true">
                    <span>YOUR SPACE ON THE WEB</span>
                    <div>Make something<br /><em>worth sharing.</em></div>
                    <i />
                    <small>Stories. Projects. Possibilities.</small>
                  </div>
                </div>
              )}

              {activeTab === 'games' && (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <img
                    src="/images/vigilante-red-city-banner.jpg"
                    alt="Vigilante: Red City — the Demir family"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.92 }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(6,7,10,0.08) 0%, rgba(6,7,10,0.82) 72%, rgba(6,7,10,0.97) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: 'clamp(22px, 4vw, 40px)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
                      <div style={{ textAlign: 'left' }}>
                        <span className="badge badge-cyan" style={{ marginBottom: 10 }}>02 // FEATURED DESKTOP TITLE</span>
                        <h2 style={{ fontSize: 'clamp(24px, 3.8vw, 34px)', fontWeight: 800, marginBottom: 8, color: '#fff' }}>Vigilante: Red City</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 14.5, maxWidth: 540 }}>
                          Bring Inaayah home in a five-stage comic rescue adventure. Three heroes, local and online co-op, and a vocal nasheed soundtrack.
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: 12 }}>
                        <button
                          onClick={() => handleScroll('games')}
                          className="btn btn-primary"
                        >
                          <Play size={15} fill="currentColor" />
                          <span>Explore Game Releases</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'kettle' && (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <img
                    src="/images/kettle-court-banner.jpg"
                    alt="Kettle Court Table Game"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.92 }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(6,7,10,0.08) 0%, rgba(6,7,10,0.82) 72%, rgba(6,7,10,0.97) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: 'clamp(22px, 4vw, 40px)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
                      <div style={{ textAlign: 'left' }}>
                        <span className="badge badge-green" style={{ marginBottom: 10 }}>03 // INSTANT BROWSER STRATEGY</span>
                        <h2 style={{ fontSize: 'clamp(24px, 3.8vw, 34px)', fontWeight: 800, marginBottom: 8, color: '#fff' }}>Kettle Court: Medieval Strategy</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 14.5, maxWidth: 540 }}>
                          Turn-based cozy fairground strategy game for 2 to 5 players. Play directly in any desktop or mobile browser with zero installs.
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: 12 }}>
                        <a
                          href="https://kettle-court.inaayah.dev/"
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary"
                        >
                          <Play size={15} fill="currentColor" />
                          <span>Play in Browser</span>
                          <ArrowUpRight size={15} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Architectural Spec Strip */}
        <div className="hero-spec-strip">
          <div className="hero-spec-item">
            <ShieldCheck size={16} color="var(--accent-green)" />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>SHA-256 Verified Releases</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Cryptographic delta package integrity</div>
            </div>
          </div>
          <div className="hero-spec-item">
            <Zap size={16} color="var(--accent-gold)" />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Sub-Second Edge Infrastructure</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Cloudflare Workers &amp; Nakama 7350 relays</div>
            </div>
          </div>
          <div className="hero-spec-item">
            <Sparkles size={16} color="var(--accent-cyan)" />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Native Cross-Platform Builds</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Universal macOS, Windows x64 &amp; Linux</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
