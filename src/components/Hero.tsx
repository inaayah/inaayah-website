import React, { useState, useEffect, useRef } from 'react';
import {
  Download,
  ShieldCheck,
  Sparkles,
  Zap,
  ChevronDown,
  Play,
  Gamepad2,
  Compass,
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import { fetchLauncherRelease, fetchGamesVersions } from '../lib/releases';

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
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  const [vigilanteVersion, setVigilanteVersion] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'builder' | 'games' | 'kettle'>('builder');
  const [isAutoPlay, setIsAutoPlay] = useState(() =>
    !window.matchMedia('(max-width: 760px), (prefers-reduced-motion: reduce)').matches
  );
  const [isHovered, setIsHovered] = useState(false);
  const osMenuRef = useRef<HTMLDivElement>(null);
  const swipeStartXRef = useRef<number | null>(null);

  const activeIndex = TABS.indexOf(activeTab);

  const handleSwipeStart = (clientX: number) => {
    swipeStartXRef.current = clientX;
  };

  const handleSwipeEnd = (clientX: number) => {
    if (swipeStartXRef.current === null) return;
    const deltaX = clientX - swipeStartXRef.current;
    swipeStartXRef.current = null;
    if (Math.abs(deltaX) < 42) return;

    setIsAutoPlay(false);
    if (deltaX < 0) {
      setActiveTab(TABS[(activeIndex + 1) % TABS.length]);
    } else {
      setActiveTab(TABS[(activeIndex - 1 + TABS.length) % TABS.length]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (osMenuRef.current && !osMenuRef.current.contains(e.target as Node)) {
        setShowAllPlatforms(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

    fetchLauncherRelease().then((release) => {
      if (!release) return;
      setLatestVersion(release.version);

      const formatSize = (bytes?: number) => (bytes ? `${Math.round(bytes / (1024 * 1024))} MB` : '');
      const assets = release.assets || [];
      const macAsset = assets.find((a) => a.name.endsWith('.dmg'));
      const winAsset = assets.find((a) => a.name.endsWith('.exe'));
      const linuxAsset = assets.find((a) => a.name.endsWith('.AppImage'));

      setPlatforms((prev) => ({
        mac: {
          ...prev.mac,
          filename: macAsset?.name || prev.mac.filename,
          url: 'https://releases.inaayah.dev/api/launcher/download/mac',
          size: macAsset?.size ? formatSize(macAsset.size) : prev.mac.size
        },
        windows: {
          ...prev.windows,
          filename: winAsset?.name || prev.windows.filename,
          url: 'https://releases.inaayah.dev/api/launcher/download/windows',
          size: winAsset?.size ? formatSize(winAsset.size) : prev.windows.size
        },
        linux: {
          ...prev.linux,
          filename: linuxAsset?.name || prev.linux.filename,
          url: 'https://releases.inaayah.dev/api/launcher/download/linux',
          size: linuxAsset?.size ? formatSize(linuxAsset.size) : prev.linux.size
        }
      }));
    });

    fetchGamesVersions().then((versions) => {
      if (versions['vigilante-red-city']) {
        setVigilanteVersion(`v${versions['vigilante-red-city']}`);
      }
    });
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
              <span>
                Launcher{' '}
                <span className="version-slot version-slot-eyebrow">
                  {latestVersion ?? <span className="version-skeleton" aria-hidden="true" />}
                </span>{' '}
                Live · Builder in Pre-Alpha
              </span>
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
              <a className="btn btn-primary hero-mobile-play" href="https://arcade.inaayah.dev/">
                <Play size={15} fill="currentColor" />
                <span>Play Web Arcade</span>
              </a>
              <button
                onClick={() => handleScroll('builder')}
                className="btn btn-primary hero-builder-cta"
                style={{ padding: '11px 20px', fontSize: 14 }}
              >
                <span>Explore Web Builder</span>
                <ArrowRight size={15} />
              </button>

              <div ref={osMenuRef} className="hero-launcher-control">
                <div className="hero-split-btn">
                  <a
                    href={activePlatform.url}
                    className="hero-split-action"
                  >
                    <Download size={15} />
                    <span>Get Launcher ({activePlatform.name})</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setShowAllPlatforms(!showAllPlatforms)}
                    className="hero-split-dropdown"
                    title="Select another operating system"
                    aria-label="Select another operating system"
                    aria-expanded={showAllPlatforms}
                  >
                    <ChevronDown
                      size={14}
                      style={{
                        transform: showAllPlatforms ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s ease'
                      }}
                    />
                  </button>
                </div>

                {showAllPlatforms && (
                  <div
                    className="glass-panel"
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      right: 0,
                      width: 248,
                      padding: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      zIndex: 80,
                      background: 'var(--bg-dropdown)',
                      borderColor: 'var(--border-glass)',
                      boxShadow: 'var(--shadow-bezel)'
                    }}
                  >
                    <div
                      style={{
                        padding: '6px 10px',
                        fontSize: 10,
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>Select OS</span>
                      <span className="version-slot version-slot-badge">
                        {latestVersion ?? <span className="version-skeleton" aria-hidden="true" />}
                      </span>
                    </div>
                    {(Object.keys(platforms) as Array<'mac' | 'windows' | 'linux'>).map((key) => {
                      const p = platforms[key];
                      return (
                        <a
                          key={key}
                          href={p.url}
                          onClick={() => setShowAllPlatforms(false)}
                          className="btn btn-secondary"
                          style={{
                            justifyContent: 'flex-start',
                            padding: '8px 12px',
                            fontSize: 12,
                            borderColor: detectedOs === key ? 'var(--brand-accent)' : 'transparent',
                            background: detectedOs === key ? 'var(--btn-secondary-hover)' : 'transparent'
                          }}
                        >
                          <Download size={13} />
                          <span>{p.name} ({p.ext})</span>
                        </a>
                      );
                    })}
                    <div style={{ height: 1, background: 'var(--border-subtle)', margin: '4px 0' }} />
                    <a
                      href="https://github.com/inaayah/inaayah-launcher/releases/latest"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setShowAllPlatforms(false)}
                      className="btn btn-secondary"
                      style={{
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        fontSize: 11,
                        color: 'var(--text-secondary)',
                        borderColor: 'transparent',
                        background: 'transparent'
                      }}
                    >
                      <span>All Release Archives</span>
                      <span>↗</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
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
              <div className="stage-dock-main">
                <div className="stage-dock-dots" aria-hidden="true">
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--border-strong)' }} />
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--border-strong)' }} />
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--border-strong)' }} />
                </div>

                <div className="stage-tabs" role="group" aria-label="Studio product showcase">
                  <button
                    onClick={() => handleSelectTab('builder')}
                    aria-pressed={activeTab === 'builder'}
                    className={`stage-tab ${activeTab === 'builder' ? 'active' : ''} ${activeTab === 'builder' && isAutoPlay ? 'is-autoplay' : ''} ${isHovered ? 'is-paused' : ''}`}
                  >
                    <span className="stage-tab-index">01</span>
                    <img src="/brand/inaayah-builder-icon.svg?v=monolith" alt="" width="18" height="18" />
                    <span><span className="stage-tab-long-label">Inaayah </span>Builder</span>
                    <span className="badge badge-gold" style={{ fontSize: 9, padding: '1px 5px' }}>Pre-Alpha</span>
                  </button>

                  <button
                    onClick={() => handleSelectTab('games')}
                    aria-pressed={activeTab === 'games'}
                    className={`stage-tab ${activeTab === 'games' ? 'active' : ''} ${activeTab === 'games' && isAutoPlay ? 'is-autoplay' : ''} ${isHovered ? 'is-paused' : ''}`}
                  >
                    <span className="stage-tab-index">02</span>
                    <Gamepad2 size={14} />
                    <span><span className="stage-tab-long-label">Launcher &amp; </span>Vigilante</span>
                    <span className="badge badge-cyan" style={{ fontSize: 9, padding: '1px 5px' }}>
                      <span className="version-slot version-slot-badge">
                        {vigilanteVersion ?? <span className="version-skeleton" aria-hidden="true" />}
                      </span>
                    </span>
                  </button>

                  <button
                    onClick={() => handleSelectTab('kettle')}
                    aria-pressed={activeTab === 'kettle'}
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
                    START AUTO-CYCLE
                  </button>
                )}
              </div>
            </div>

            <div
              className="stage-viewport"
              onTouchStart={(e) => handleSwipeStart(e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (e.changedTouches[0]) handleSwipeEnd(e.changedTouches[0].clientX);
              }}
              onMouseDown={(e) => handleSwipeStart(e.clientX)}
              onMouseUp={(e) => handleSwipeEnd(e.clientX)}
            >
              <div
                className="stage-track"
                style={{
                  transform: `translate3d(-${activeIndex * 100}%, 0, 0)`
                }}
              >
                {/* Slide 01: Inaayah Builder */}
                <div
                  className={`stage-slide ${activeTab === 'builder' ? 'is-active' : ''}`}
                  aria-hidden={activeTab !== 'builder'}
                >
                  <div className="studio-builder-teaser">
                    <div className="studio-builder-copy stage-slide-caption">
                      <span className="badge badge-gold">01 // VISUAL WEB CREATION</span>
                      <h2>A home for your next great idea.</h2>
                      <p>Shape your site with structured editorial blocks, refine copy with your integrated co-pilot, and publish on your own custom domain.</p>
                      <div className="studio-builder-steps">
                        <span>01. ARRANGE</span>
                        <span>02. REFINE</span>
                        <span>03. PUBLISH</span>
                      </div>
                      <button
                        className="btn btn-primary"
                        tabIndex={activeTab === 'builder' ? 0 : -1}
                        onClick={() => handleScroll('builder')}
                      >
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
                </div>

                {/* Slide 02: Vigilante: Red City */}
                <div
                  className={`stage-slide ${activeTab === 'games' ? 'is-active' : ''}`}
                  aria-hidden={activeTab !== 'games'}
                >
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <img
                      src="/images/vigilante-red-city-banner.jpg"
                      alt="Vigilante: Red City — the Demir family"
                      className="stage-slide-art stage-slide-art-vigilante"
                      decoding="async"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(12,15,23,0.08) 0%, rgba(12,15,23,0.82) 72%, rgba(12,15,23,0.97) 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: 'clamp(22px, 4vw, 40px)'
                      }}
                    >
                      <div
                        className="stage-slide-caption"
                        style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}
                      >
                        <div style={{ textAlign: 'left' }}>
                          <span className="badge badge-cyan" style={{ marginBottom: 10 }}>02 // FEATURED DESKTOP TITLE</span>
                          <h2 style={{ fontSize: 'clamp(24px, 3.8vw, 34px)', fontWeight: 800, marginBottom: 8, color: '#F4F1EA' }}>Vigilante: Red City</h2>
                          <p style={{ color: '#9AA5BC', fontSize: 14.5, maxWidth: 540 }}>
                            Bring Inaayah home in a five-stage comic rescue adventure. Three heroes, local and online co-op, and a vocal nasheed soundtrack.
                          </p>
                        </div>
                        <div style={{ display: 'flex', gap: 12 }}>
                          <button
                            onClick={() => handleScroll('games')}
                            tabIndex={activeTab === 'games' ? 0 : -1}
                            className="btn btn-primary"
                          >
                            <Play size={15} fill="currentColor" />
                            <span>Explore Game Releases</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide 03: Kettle Court */}
                <div
                  className={`stage-slide ${activeTab === 'kettle' ? 'is-active' : ''}`}
                  aria-hidden={activeTab !== 'kettle'}
                >
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <img
                      src="/images/kettle-court-banner.jpg"
                      alt="Kettle Court Table Game"
                      className="stage-slide-art"
                      decoding="async"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(12,15,23,0.08) 0%, rgba(12,15,23,0.82) 72%, rgba(12,15,23,0.97) 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: 'clamp(22px, 4vw, 40px)'
                      }}
                    >
                      <div
                        className="stage-slide-caption"
                        style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}
                      >
                        <div style={{ textAlign: 'left' }}>
                          <span className="badge badge-green" style={{ marginBottom: 10 }}>03 // INSTANT BROWSER STRATEGY</span>
                          <h2 style={{ fontSize: 'clamp(24px, 3.8vw, 34px)', fontWeight: 800, marginBottom: 8, color: '#F4F1EA' }}>Kettle Court: Medieval Strategy</h2>
                          <p style={{ color: '#9AA5BC', fontSize: 14.5, maxWidth: 540 }}>
                            Turn-based cozy fairground strategy game for 2 to 5 players. Play directly in any desktop or mobile browser with zero installs.
                          </p>
                        </div>
                        <div style={{ display: 'flex', gap: 12 }}>
                          <a
                            href="https://kettle-court.inaayah.dev/"
                            target="_blank"
                            rel="noreferrer"
                            tabIndex={activeTab === 'kettle' ? 0 : -1}
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
                </div>
              </div>
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
