import React, { useState, useEffect } from 'react';
import { Download, ChevronDown, Sparkles, Sun, Moon } from 'lucide-react';
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
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof document !== 'undefined') {
      const current = document.documentElement.getAttribute('data-theme');
      if (current === 'light' || current === 'dark') return current;
    }
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const applyTheme = (next: 'light' | 'dark') => {
      setTheme(next);
      document.documentElement.setAttribute('data-theme', next);
    };

    const saved = localStorage.getItem('inaayah_theme');
    if (saved === 'light' || saved === 'dark') {
      applyTheme(saved);
    } else {
      applyTheme(media.matches ? 'light' : 'dark');
    }

    const onSystemChange = (e: MediaQueryListEvent) => {
      const override = localStorage.getItem('inaayah_theme');
      if (override !== 'light' && override !== 'dark') {
        applyTheme(e.matches ? 'light' : 'dark');
      }
    };

    media.addEventListener('change', onSystemChange);
    return () => media.removeEventListener('change', onSystemChange);
  }, []);

  const toggleTheme = () => {
    const next: 'light' | 'dark' = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      const sysDefault: 'light' | 'dark' = window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      if (next === sysDefault) {
        localStorage.removeItem('inaayah_theme');
      } else {
        localStorage.setItem('inaayah_theme', next);
      }
    } catch {}
  };

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
            Games &amp; Launcher
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

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

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
                boxShadow: 'var(--shadow-bezel)',
                background: 'var(--bg-dropdown)',
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
                  borderColor: osName === 'macOS' ? 'var(--border-strong)' : 'transparent',
                  background: osName === 'macOS' ? 'var(--btn-secondary-hover)' : 'transparent'
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
                  borderColor: osName === 'Windows' ? 'var(--border-strong)' : 'transparent',
                  background: osName === 'Windows' ? 'var(--btn-secondary-hover)' : 'transparent'
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
                  borderColor: osName === 'Linux' ? 'var(--border-strong)' : 'transparent',
                  background: osName === 'Linux' ? 'var(--btn-secondary-hover)' : 'transparent'
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
                <Sparkles size={13} color="var(--brand-amber)" />
                <span>View Full Launcher Details ↓</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
