import React from 'react';
import { Download } from 'lucide-react';

interface NavbarProps {
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollTo }) => {
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a 
            href="#launcher" 
            onClick={(e) => { e.preventDefault(); onScrollTo('launcher'); }}
            className="btn btn-secondary"
            style={{ padding: '8px 16px', fontSize: 13 }}
          >
            <Download size={15} color="var(--accent-cyan)" />
            <span>Launcher v0.2.1</span>
          </a>
        </div>
      </div>
    </header>
  );
};
