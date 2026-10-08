import React from 'react';
import { Gamepad2, Play, Download, CheckCircle, ArrowUpRight } from 'lucide-react';

export const GamesSection: React.FC = () => {
  return (
    <section id="games" className="section" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(17, 22, 34, 0.4) 50%, transparent 100%)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="badge badge-cyan">
              <Gamepad2 size={13} />
              Gaming Division · Shipped Titles
            </span>
          </div>
          <h2 className="section-title">
            Crafted for <span className="gradient-text-cyan">Adrenaline & Cozy Strategy.</span>
          </h2>
          <p className="section-subtitle">
            From 3D neo-cyberpunk streets to medieval marketplace cobblestones, each title is engineered for instant feedback and multiplayer excellence.
          </p>
        </div>

        <div className="games-grid">
          {/* Game 1: AetherRush (Featured Full Width) */}
          <div className="glass-panel game-card-featured">
            <div className="game-card-img-wrapper" style={{ height: 'auto', minHeight: 340 }}>
              <img 
                src="/images/aether-rush-cover.jpg" 
                alt="AetherRush 3D Arcade Brawler" 
                className="game-card-img" 
              />
              <div 
                style={{ 
                  position: 'absolute', 
                  top: 20, 
                  left: 20, 
                  display: 'flex', 
                  gap: 8, 
                  flexWrap: 'wrap' 
                }}
              >
                <span className="badge badge-cyan">v1.2.0 Live</span>
                <span className="badge badge-gold">Godot 4.3</span>
              </div>
            </div>

            <div className="game-card-content">
              <div>
                <span className="badge" style={{ marginBottom: 12 }}>3D Action · Arcade Brawler</span>
                <h3 style={{ fontSize: 30, marginBottom: 10 }}>AetherRush: Cyber Brawler 3D</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6 }}>
                  Fight through neo-metropolitan streets in this pulse-pounding 2.5D beat 'em up. 
                  Master combo chains, acrobatic kicks, aerial recoveries, and takedowns across neon-lit 
                  highways and criminal syndicate strongholds with synchronized online co-op.
                </p>

                <ul className="game-features-list">
                  <li>
                    <CheckCircle size={16} color="var(--accent-cyan)" />
                    <span><strong>6 Full Action Stages:</strong> Downtown Avenue, Subway, Docks & Syndicate Tower</span>
                  </li>
                  <li>
                    <CheckCircle size={16} color="var(--accent-cyan)" />
                    <span><strong>Boss Mechanics:</strong> Heavyweight stagger resistance and grab immunities</span>
                  </li>
                  <li>
                    <CheckCircle size={16} color="var(--accent-cyan)" />
                    <span><strong>Synchronized Online Co-Op:</strong> Low-latency Nakama WebSocket match relay</span>
                  </li>
                  <li>
                    <CheckCircle size={16} color="var(--accent-cyan)" />
                    <span><strong>Full Gamepad Support:</strong> Xbox, PlayStation, and generic arcade sticks</span>
                  </li>
                </ul>
              </div>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border-subtle)' }}>
                <a href="#launcher" className="btn btn-primary" style={{ padding: '12px 24px' }}>
                  <Download size={16} />
                  <span>Play via Launcher</span>
                </a>
                <a 
                  href="https://github.com/inaayah/aether-rush/releases/tag/v1.2.0" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-secondary"
                  style={{ padding: '12px 20px' }}
                >
                  <span>Standalone Binaries ↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Game 2: Kettle Court (Half Width) */}
          <div className="glass-panel game-card-standard">
            <div className="game-card-img-wrapper">
              <img 
                src="/images/kettle-court-cover.jpg" 
                alt="Kettle Court Medieval Table Game" 
                className="game-card-img" 
              />
              <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 8 }}>
                <span className="badge badge-green">Instant Web Play</span>
                <span className="badge">No Install Needed</span>
              </div>
            </div>

            <div className="game-card-content">
              <div>
                <span className="badge" style={{ marginBottom: 10 }}>Digital Board Game · Cozy Strategy</span>
                <h3 style={{ fontSize: 24, marginBottom: 10 }}>Kettle Court</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
                  Step into a bustling medieval fairground! Claim artisan stalls across Bakery Row, Candle Row, 
                  and Harbor Row, draw from the Weather Deck, and share hot kettle stipends with 2 to 5 players.
                </p>

                <ul className="game-features-list">
                  <li>
                    <CheckCircle size={15} color="var(--accent-green)" />
                    <span>40-step cobblestone circuit & 7 artisan districts</span>
                  </li>
                  <li>
                    <CheckCircle size={15} color="var(--accent-green)" />
                    <span>Dynamic Weather Deck (Sun, Drizzle, Gust, Downpour)</span>
                  </li>
                  <li>
                    <CheckCircle size={15} color="var(--accent-green)" />
                    <span>No player elimination — casual, strategic recovery</span>
                  </li>
                </ul>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
                <a 
                  href="https://kettle-court.inaayah.dev/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-glow-magenta"
                  style={{ flex: 1 }}
                >
                  <Play size={16} fill="currentColor" />
                  <span>Play in Browser Now</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Game 3: Cyber Tactics (Half Width Teaser) */}
          <div className="glass-panel game-card-standard">
            <div className="game-card-img-wrapper">
              <img 
                src="/images/cyber-tactics-cover.jpg" 
                alt="Cyber Tactics: Syndicate Wars" 
                className="game-card-img" 
                style={{ filter: 'brightness(0.85)' }}
              />
              <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 8 }}>
                <span className="badge badge-gold">In Development</span>
                <span className="badge">Alpha Teaser</span>
              </div>
            </div>

            <div className="game-card-content">
              <div>
                <span className="badge" style={{ marginBottom: 10 }}>Turn-Based Tactics · Sci-Fi RPG</span>
                <h3 style={{ fontSize: 24, marginBottom: 10 }}>Cyber Tactics: Syndicate Wars</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
                  Lead an elite cell of cybernetic mercenaries fighting corporate supremacy in turn-based 
                  tactical combat. Customize neural implants, flank armored enforcers, and breach security networks.
                </p>

                <ul className="game-features-list">
                  <li>
                    <CheckCircle size={15} color="var(--accent-gold)" />
                    <span>Tactical cover & destructible neon environments</span>
                  </li>
                  <li>
                    <CheckCircle size={15} color="var(--accent-gold)" />
                    <span>Deep cyberware augmentation & neuro-hacking trees</span>
                  </li>
                  <li>
                    <CheckCircle size={15} color="var(--accent-gold)" />
                    <span>Set in the shared AetherRush syndicate universe</span>
                  </li>
                </ul>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
                <button 
                  disabled 
                  className="btn btn-secondary" 
                  style={{ flex: 1, opacity: 0.6, cursor: 'not-allowed' }}
                >
                  <span>Coming Late 2026 (Alpha Preview)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
