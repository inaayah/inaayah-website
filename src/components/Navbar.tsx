import React, { useState, useEffect } from 'react';
import { Download, ChevronDown, Sparkles } from 'lucide-react';

interface NavbarProps {
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollTo }) => {
  const [downloadUrl, setDownloadUrl] = useState('https://releases.inaayah.dev/api/launcher/download/mac');
  const [osName, setOsName] = useState('macOS');
  const [version, setVersion] = useState('v0.2.5');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.includes('win')) {
      setOsName('Windows');
      setDownloadUrl('https://releases.inaayah.dev/api/launcher/download/windows');
    } else if (ua.includes('linux')) {
      setOsName('Linux');
      setDownloadUrl('https://releases.inaayah.dev/api/launcher/download/linux');
    } else {
      setOsName('macOS');
      setDownloadUrl('https://releases.inaayah.dev/api/launcher/download/mac');
    }

    // Resolve latest release version dynamically
    fetch('https://releases.inaayah.dev/api/launcher/latest')
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        if (!data) return;
        const ver = data.version || data.tag_name;
        if (ver) setVersion(ver.startsWith('v') ? ver : `v${ver}`);
      })
      .catch(() => {});
  }, []);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#" className="nav-logo">
          <img 
            src="/icon.png" 
            alt="Inaayah Studio" 
            style={{ width: 28, height: 28, borderRadius: 6, boxShadow: '0 0 14px rgba(0, 240, 255, 0.4)' }} 
          />
          <span>INAAYAH STUDIO</span>
        </a>

        <nav className="nav-links">
          <a 
            href="#builder" 
            className="nav-link" 
            onClick={(e) => { e.preventDefault(); onScrollTo('builder'); }}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <span>Website Builder</span>
            <span className="badge badge-gold" style={{ fontSize: 9, padding: '1px 6px' }}>Pre-Alpha</span>
          </a>
          <a 
            href="#games" 
            className="nav-link" 
            onClick={(e) => { e.preventDefault(); onScrollTo('games'); }}
          >
            Games & Launcher
          </a>
          <a 
            href="#technology" 
            className="nav-link" 
            onClick={(e) => { e.preventDefault(); onScrollTo('technology'); }}
          >
            Engineering
          </a>
        </nav>

        {/* Top-Right Download Action with Platform Dropdown */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            <a 
              href={downloadUrl}
              className="btn btn-secondary"
              style={{ 
                padding: '8px 14px', 
                fontSize: 13,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderRight: 'none',
                background: 'rgba(255, 255, 255, 0.08)'
              }}
              title={`Direct download for ${osName} (${version})`}
            >
              <Download size={14} color="var(--accent-cyan)" />
              <span>Get Launcher {version}</span>
            </a>

            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="btn btn-secondary"
              style={{
                padding: '8px 9px',
                fontSize: 13,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(255, 255, 255, 0.08)'
              }}
              title="Choose operating system or view formats"
            >
              <ChevronDown 
                size={14} 
                style={{ 
                  transform: showDropdown ? 'rotate(180deg)' : 'none', 
                  transition: 'transform 0.2s ease' 
                }} 
              />
            </button>
          </div>

          {/* Platform Selector Dropdown */}
          {showDropdown && (
            <div 
              className="glass-panel"
              style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                right: 0,
                width: 250,
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                zIndex: 250,
                boxShadow: '0 14px 40px rgba(0, 0, 0, 0.75)',
                background: '#0e131d',
                borderColor: 'var(--border-glass)'
              }}
            >
              <div style={{ padding: '6px 10px', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Download for OS ({version})
              </div>

              <a
                href="https://releases.inaayah.dev/api/launcher/download/mac"
                className="btn btn-secondary"
                style={{ 
                  justifyContent: 'flex-start', 
                  padding: '8px 12px', 
                  fontSize: 12,
                  borderColor: osName === 'macOS' ? 'var(--accent-cyan)' : 'transparent',
                  background: osName === 'macOS' ? 'rgba(0, 240, 255, 0.08)' : 'transparent'
                }}
                onClick={() => setShowDropdown(false)}
              >
                <Download size={13} color="var(--accent-cyan)" />
                <span>macOS (.dmg / arm64)</span>
              </a>

              <a
                href="https://releases.inaayah.dev/api/launcher/download/windows"
                className="btn btn-secondary"
                style={{ 
                  justifyContent: 'flex-start', 
                  padding: '8px 12px', 
                  fontSize: 12,
                  borderColor: osName === 'Windows' ? 'var(--accent-cyan)' : 'transparent',
                  background: osName === 'Windows' ? 'rgba(0, 240, 255, 0.08)' : 'transparent'
                }}
                onClick={() => setShowDropdown(false)}
              >
                <Download size={13} color="var(--accent-cyan)" />
                <span>Windows (.exe installer)</span>
              </a>

              <a
                href="https://releases.inaayah.dev/api/launcher/download/linux"
                className="btn btn-secondary"
                style={{ 
                  justifyContent: 'flex-start', 
                  padding: '8px 12px', 
                  fontSize: 12,
                  borderColor: osName === 'Linux' ? 'var(--accent-cyan)' : 'transparent',
                  background: osName === 'Linux' ? 'rgba(0, 240, 255, 0.08)' : 'transparent'
                }}
                onClick={() => setShowDropdown(false)}
              >
                <Download size={13} color="var(--accent-cyan)" />
                <span>Linux (.AppImage)</span>
              </a>

              <div style={{ borderTop: '1px solid var(--border-subtle)', margin: '4px 0' }} />

              <button
                type="button"
                onClick={() => {
                  setShowDropdown(false);
                  onScrollTo('launcher');
                }}
                className="btn btn-secondary"
                style={{ 
                  justifyContent: 'flex-start', 
                  padding: '8px 12px', 
                  fontSize: 12, 
                  background: 'transparent',
                  color: 'var(--text-secondary)'
                }}
              >
                <Sparkles size={13} color="var(--accent-gold)" />
                <span>View Full Launcher Details ↓</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
