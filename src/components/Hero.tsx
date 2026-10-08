import React, { useState, useEffect } from 'react';
import { Download, ShieldCheck, Sparkles, Zap, ChevronDown, Play } from 'lucide-react';

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
    filename: 'Inaayah-Launcher-0.1.0-arm64.dmg',
    url: 'https://github.com/inaayah/inaayah-launcher/releases/download/v0.1.0/Inaayah-Launcher-0.1.0-arm64.dmg',
    size: '109 MB'
  },
  windows: {
    os: 'windows',
    name: 'Windows',
    ext: '.exe',
    filename: 'Inaayah-Launcher-Setup-0.1.0.exe',
    url: 'https://github.com/inaayah/inaayah-launcher/releases/download/v0.1.0/Inaayah-Launcher-Setup-0.1.0.exe',
    size: '89 MB'
  },
  linux: {
    os: 'linux',
    name: 'Linux',
    ext: '.AppImage',
    filename: 'Inaayah-Launcher-0.1.0.AppImage',
    url: 'https://github.com/inaayah/inaayah-launcher/releases/download/v0.1.0/Inaayah-Launcher-0.1.0.AppImage',
    size: '116 MB'
  }
};

export const Hero: React.FC = () => {
  const [detectedOs, setDetectedOs] = useState<'mac' | 'windows' | 'linux'>('mac');
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.includes('win')) {
      setDetectedOs('windows');
    } else if (ua.includes('linux')) {
      setDetectedOs('linux');
    } else {
      setDetectedOs('mac');
    }
  }, []);

  const activePlatform = PLATFORMS[detectedOs];

  return (
    <section id="launcher" className="hero-section">
      <div className="container">
        <div className="hero-pill">
          <span className="badge badge-cyan">
            <Sparkles size={12} />
            Official Desktop Client · v0.1.0 Released
          </span>
        </div>

        <h1 className="hero-title">
          One Gateway to <br />
          <span className="gradient-text-cyan">Next-Gen Indie Gaming.</span>
        </h1>

        <p className="hero-subtitle">
          Download the official <strong>Inaayah Launcher</strong>. Discover high-octane 3D arcade brawlers 
          and instant edge board games with zero telemetry, seamless auto-updates, and low-latency multiplayer.
        </p>

        <div className="hero-cta-group">
          <div className="download-cta-row">
            <a 
              href={activePlatform.url} 
              className="btn btn-primary"
              style={{ padding: '16px 36px', fontSize: 16 }}
            >
              <Download size={20} />
              <span>Download for {activePlatform.name} ({activePlatform.ext})</span>
              <span style={{ opacity: 0.7, fontSize: 13, marginLeft: 4 }}>• {activePlatform.size}</span>
            </a>

            <button 
              onClick={() => setShowAllPlatforms(!showAllPlatforms)}
              className="btn btn-secondary"
              style={{ padding: '16px 20px', fontSize: 14 }}
              title="Select another platform"
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
              {(Object.keys(PLATFORMS) as Array<'mac' | 'windows' | 'linux'>).map((key) => {
                const p = PLATFORMS[key];
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
                href="https://github.com/inaayah/inaayah-launcher/releases/tag/v0.1.0"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
                style={{ padding: '10px 16px', fontSize: 13 }}
              >
                <span>View All Assets (.zip / .tar.gz) ↗</span>
              </a>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 13, marginTop: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={16} color="var(--accent-green)" />
              <span>Zero Telemetry / DRM-Free</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Zap size={16} color="var(--accent-gold)" />
              <span>Instant Edge Downloads</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={16} color="var(--accent-cyan)" />
              <span>Automatic Background Updates</span>
            </div>
          </div>
        </div>

        {/* Interactive Desktop App Preview Frame */}
        <div className="mockup-container">
          <div className="mockup-inner">
            <div className="mockup-titlebar">
              <div className="mockup-dots">
                <div className="mockup-dot" style={{ background: '#ff5f56' }} />
                <div className="mockup-dot" style={{ background: '#ffbd2e' }} />
                <div className="mockup-dot" style={{ background: '#27c93f' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                <img src="/icon.png" alt="Inaayah" style={{ width: 14, height: 14, borderRadius: 3 }} />
                <span style={{ fontWeight: 600, letterSpacing: '0.05em' }}>INAAYAH LAUNCHER v0.1.0</span>
              </div>
              <div style={{ width: 48 }} />
            </div>

            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: '#0b0e14' }}>
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
                  <div>
                    <span className="badge badge-cyan" style={{ marginBottom: 8 }}>Featured Studio Title</span>
                    <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8, color: '#fff' }}>AetherRush: Cyber Brawler 3D</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 480 }}>
                      High-octane 2.5D beat 'em up featuring full controller support, 6 dynamic stages, and live Nakama multiplayer.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <a href="#games" className="btn btn-primary" style={{ padding: '12px 24px' }}>
                      <Play size={16} fill="currentColor" />
                      <span>Explore Showcase</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
