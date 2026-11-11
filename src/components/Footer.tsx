import React from 'react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate?: (path: string, sectionId?: string) => void;
  isGamesRoute?: boolean;
}

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC<FooterProps> = ({ onNavigate, isGamesRoute = false }) => {
  const navigateToSection = (event: React.MouseEvent<HTMLAnchorElement>, path: string, sectionId: string) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path, sectionId);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div style={{ maxWidth: 340 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <a
                href="/"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('/');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                style={{ display: 'inline-flex' }}
              >
                <BrandLogo division={isGamesRoute ? 'games' : 'studio'} size={28} />
              </a>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.6 }}>
              {isGamesRoute
                ? 'Gaming division of Inaayah Studio — crafting native desktop co-op campaigns and instant daily browser games.'
                : 'Independent creative software studio crafting high-energy indie games, tactile visual web tools, and modern software.'}
            </p>
            <div className="status-pill">
              <span className="status-pill-dot" />
              <span>All edge relays operational · Nakama 7350</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 14 }}>
                Products &amp; Tools
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
                <li>
                  <a href="/#builder" onClick={(event) => navigateToSection(event, '/', 'builder')} className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>Inaayah Builder</span>
                    <span className="badge badge-gold" style={{ fontSize: 9, padding: '0 5px' }}>Pre-Alpha</span>
                  </a>
                </li>
                <li><a href="/games" onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate('/games'); } }} className="nav-link">Games &amp; Launcher (/games)</a></li>
                <li><a href="https://arcade.inaayah.dev" target="_blank" rel="noreferrer" className="nav-link">Inaayah Web Arcade ↗</a></li>
                <li><a href="/games#vigilante-red-city" onClick={(event) => navigateToSection(event, '/games', 'vigilante-red-city')} className="nav-link">Vigilante: Red City</a></li>
                <li><a href="/games#aether-rush" onClick={(event) => navigateToSection(event, '/games', 'aether-rush')} className="nav-link">AetherRush 3D</a></li>
                <li><a href="https://arcade.inaayah.dev/eyetest" target="_blank" rel="noreferrer" className="nav-link">Optik: Daily EyeTest ↗</a></li>
                <li><a href="https://kettle-court.inaayah.dev/" target="_blank" rel="noreferrer" className="nav-link">Kettle Court ↗</a></li>
                <li><a href="/games#games" onClick={(event) => navigateToSection(event, '/games', 'games')} className="nav-link">Cyber Tactics</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 14 }}>
                Downloads &amp; Releases
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
                <li>
                  <a href="https://github.com/inaayah/inaayah-launcher" target="_blank" rel="noreferrer" className="nav-link">
                    Launcher Repository ↗
                  </a>
                </li>
                <li>
                  <a href="https://github.com/inaayah/inaayah-launcher/releases" target="_blank" rel="noreferrer" className="nav-link">
                    Launcher Releases ↗
                  </a>
                </li>
                <li>
                  <a href="/games#vigilante-red-city" onClick={(event) => navigateToSection(event, '/games', 'vigilante-red-city')} className="nav-link">
                    Vigilante: Red City ↗
                  </a>
                </li>
                <li>
                  <a href="/games#aether-rush" onClick={(event) => navigateToSection(event, '/games', 'aether-rush')} className="nav-link">
                    AetherRush · Coming soon ↗
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 14 }}>
                Infrastructure
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
                <li><a href="/#technology" onClick={(event) => navigateToSection(event, '/', 'technology')} className="nav-link">Godot 4 Pipeline</a></li>
                <li><a href="/#technology" onClick={(event) => navigateToSection(event, '/', 'technology')} className="nav-link">Cloudflare Durable Objects</a></li>
                <li><a href="/#technology" onClick={(event) => navigateToSection(event, '/', 'technology')} className="nav-link">SHA-256 Delta Releases</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-copy">
          <div>
            © {CURRENT_YEAR} Inaayah Studio. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
            <span>INAAYAH.DEV // EDGE PRODUCTION</span>
          </div>
        </div>

        <div className="footer-watermark" aria-hidden="true">
          INAAYAH
        </div>
      </div>
    </footer>
  );
};
