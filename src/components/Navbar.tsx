import React, { useState, useEffect } from 'react';
import { Download, ChevronDown, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onScrollTo: (id: string) => void;
  onNavigate?: (path: string, sectionId?: string) => void;
  isGamesRoute?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onScrollTo,
  onNavigate,
  isGamesRoute = false,
}) => {
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
        <a
          href={isGamesRoute ? '/games' : '/'}
          className="nav-logo"
          onClick={(e) => {
            if (onNavigate) {
              e.preventDefault();
              onNavigate(isGamesRoute ? '/games' : '/');
            }
          }}
        >
          <BrandLogo division={isGamesRoute ? 'games' : 'studio'} />
        </a>

        <nav className="nav-links">
          <a
            href="/#builder"
            className="nav-link"
            onClick={(e) => { e.preventDefault(); onScrollTo('builder'); }}
            style={{ display: 'flex', alignItems: 'center', gap: 7 }}
          >
            <span>Website Builder</span>
            <span className="badge badge-gold" style={{ fontSize: 9, padding: '1px 6px' }}>Pre-Alpha</span>
          </a>
          <a
            href="/games"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('/games');
              else onScrollTo('games');
            }}
            style={{
              color: isGamesRoute ? 'var(--text-primary)' : undefined,
              fontWeight: isGamesRoute ? 600 : undefined,
            }}
          >
            Games & Launcher
          </a>
          <a
            href="https://arcade.inaayah.dev"
            target="_blank"
            rel="noreferrer"
            className="nav-link"
          >
            Web Arcade ↗
          </a>
          <a
            href="#technology"
            className="nav-link"
            onClick={(e) => { e.preventDefault(); onScrollTo('technology'); }}
          >
            Engineering
          </a>
        </nav>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <div className="navbar-split-btn">
            <a
              href={downloadUrl}
              className="split-btn-action"
              title={`Download Inaayah Launcher for ${osName} (${version})`}
            >
              <Download size={13} />
              <span>Get Launcher {version}</span>
            </a>

            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="split-btn-dropdown"
              title="Choose operating system or view formats"
            >
              <ChevronDown
                size={13}
                style={{
                  transform: showDropdown ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease'
                }}
              />
            </button>
          </div>

          {showDropdown && (
            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                right: 0,
                width: 248,
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                zIndex: 250,
                boxShadow: '0 18px 44px rgba(0, 0, 0, 0.85)',
                background: '#0b0e15',
                borderColor: 'var(--border-glass)'
              }}
            >
              <div style={{ padding: '6px 10px', fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Select OS ({version})
              </div>

              <a
                href="https://releases.inaayah.dev/api/launcher/download/mac"
                className="btn btn-secondary"
                style={{
                  justifyContent: 'flex-start',
                  padding: '8px 12px',
                  fontSize: 12,
                  borderColor: osName === 'macOS' ? 'rgba(255, 255, 255, 0.22)' : 'transparent',
                  background: osName === 'macOS' ? 'rgba(255, 255, 255, 0.06)' : 'transparent'
                }}
                onClick={() => setShowDropdown(false)}
              >
                <Download size={13} />
                <span>macOS (.dmg / arm64)</span>
              </a>

              <a
                href="https://releases.inaayah.dev/api/launcher/download/windows"
                className="btn btn-secondary"
                style={{
                  justifyContent: 'flex-start',
                  padding: '8px 12px',
                  fontSize: 12,
                  borderColor: osName === 'Windows' ? 'rgba(255, 255, 255, 0.22)' : 'transparent',
                  background: osName === 'Windows' ? 'rgba(255, 255, 255, 0.06)' : 'transparent'
                }}
                onClick={() => setShowDropdown(false)}
              >
                <Download size={13} />
                <span>Windows (.exe installer)</span>
              </a>

              <a
                href="https://releases.inaayah.dev/api/launcher/download/linux"
                className="btn btn-secondary"
                style={{
                  justifyContent: 'flex-start',
                  padding: '8px 12px',
                  fontSize: 12,
                  borderColor: osName === 'Linux' ? 'rgba(255, 255, 255, 0.22)' : 'transparent',
                  background: osName === 'Linux' ? 'rgba(255, 255, 255, 0.06)' : 'transparent'
                }}
                onClick={() => setShowDropdown(false)}
              >
                <Download size={13} />
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
