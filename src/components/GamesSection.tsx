import React, { useEffect, useState } from 'react';
import { Play, Download, CheckCircle, ArrowUpRight, ChevronDown, Sparkles, Globe } from 'lucide-react';
import { fetchGamesVersions } from '../lib/releases';

interface GamesSectionProps {
  isStandalonePage?: boolean;
}

export const GamesSection: React.FC<GamesSectionProps> = ({ isStandalonePage = false }) => {
  const [versions, setVersions] = useState<Record<string, string>>({});
  useEffect(() => {
    fetchGamesVersions().then(setVersions);
  }, []);

  return (
    <section id="games" className="section">
      <div className="container">
        <div className="section-rule">
          <span className="section-index">
            <span className="section-index-num">03 //</span>
            <span>{isStandalonePage ? 'INAAYAH GAMES · DESKTOP & WEB ARCADE' : 'GAMING DIVISION'}</span>
          </span>
          <span>DESKTOP CO-OP &amp; INSTANT WEB RELEASES</span>
        </div>

        <div className="section-header-split">
          <h2 className="section-title">
            <span className="tone-muted">Crafted for</span> adrenaline, precision,{' '}
            <span className="tone-serif">and cozy strategy.</span>
          </h2>
          <p className="section-subtitle">
            Play native 2.5D &amp; 3D co-op campaigns through the <strong>Inaayah Desktop Launcher</strong>, or jump straight into instant daily browser games at <a href="https://arcade.inaayah.dev" target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}>arcade.inaayah.dev</a>.
          </p>
        </div>

        {/* Dedicated Desktop Launcher Banner in Double-Bezel Frame */}
        <div
          id={isStandalonePage ? 'launcher' : 'launcher-spotlight'}
          className="bezel-outer"
          style={{ marginBottom: 28 }}
        >
          <div
            className="bezel-inner"
            style={{
              padding: '24px 28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 20
            }}
          >
            <div style={{ maxWidth: 560, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                <span className="badge badge-cyan">Inaayah Desktop Launcher</span>
                <span className="badge badge-gold">SHA-256 Verified · Auto-Updating</span>
              </div>
              <h3 style={{ fontSize: 21, marginBottom: 6 }}>One Native Hub for Desktop Releases</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.55 }}>
                Install, patch, and launch our full Godot 4 desktop games with SHA-256 verified delta downloads and controller support.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href="https://releases.inaayah.dev/api/launcher/download/mac" className="btn btn-primary" style={{ padding: '10px 16px', fontSize: 13 }}>
                <Download size={14} />
                <span>macOS (.dmg)</span>
              </a>
              <a href="https://releases.inaayah.dev/api/launcher/download/windows" className="btn btn-secondary" style={{ padding: '10px 15px', fontSize: 13 }}>
                <Download size={14} />
                <span>Windows (.exe)</span>
              </a>
              <a href="https://releases.inaayah.dev/api/launcher/download/linux" className="btn btn-secondary" style={{ padding: '10px 15px', fontSize: 13 }}>
                <Download size={14} />
                <span>Linux (.AppImage)</span>
              </a>
            </div>
          </div>
        </div>

        <div className="games-grid">
          {/* Featured release: Vigilante: Red City */}
          <div id="vigilante-red-city" className="bezel-outer" style={{ gridColumn: 'span 12' }}>
            <div className="bezel-inner game-card-featured">
              <div className="game-card-img-wrapper" style={{ height: 'auto', minHeight: 420 }}>
                <img
                  src="/images/vigilante-red-city-cover.jpg"
                  alt="Murat, Zeynep and Emir in Vigilante: Red City"
                  className="game-card-img"
                  loading={isStandalonePage ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <div style={{ position: 'absolute', top: 18, left: 18, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span className="badge badge-cyan">
                    <span>Featured ·</span>
                    <span className="version-slot version-slot-badge">
                      {versions['vigilante-red-city'] ? `v${versions['vigilante-red-city']}` : <span className="version-skeleton" aria-hidden="true" />}
                    </span>
                    <span>Live</span>
                  </span>
                  <span className="badge badge-gold">Comic Beat ’Em Up</span>
                </div>
              </div>
              <div className="game-card-content">
                <div>
                  <span className="badge" style={{ marginBottom: 12 }}>One Family. One City. Bring Her Home.</span>
                  <h3 style={{ fontSize: 28, marginBottom: 10 }}><a href="/games/vigilante-red-city/">Vigilante: Red City</a></h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14.5, lineHeight: 1.6 }}>
                    Vance wants the family garage. When the Demirs refuse, he takes Inaayah.
                    Fight as Murat, Zeynep or Emir across neon streets, subway platforms,
                    docks and foundries to the final rescue above Red City.
                  </p>
                  <ul className="game-features-list">
                    <li><CheckCircle size={15} color="var(--accent-cyan)" style={{ marginTop: 3, flexShrink: 0 }} /><span><strong>Five Connected Stages:</strong> Comic scenes, varied enemies and five boss battles.</span></li>
                    <li><CheckCircle size={15} color="var(--accent-cyan)" style={{ marginTop: 3, flexShrink: 0 }} /><span><strong>Fight Together:</strong> Solo, shared-screen, split-screen and direct online co-op.</span></li>
                    <li><CheckCircle size={15} color="var(--accent-cyan)" style={{ marginTop: 3, flexShrink: 0 }} /><span><strong>Vocal Nasheed Soundtrack:</strong> An emotional journey with recorded combat sounds.</span></li>
                    <li><CheckCircle size={15} color="var(--accent-cyan)" style={{ marginTop: 3, flexShrink: 0 }} /><span><strong>Your Completion Gift:</strong> Unlock sketchbook memories and the complete 71-page in-game comic.</span></li>
                  </ul>
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--border-subtle)' }}>
                  <a href="/games#launcher" className="btn btn-primary" style={{ padding: '11px 20px' }}><Download size={15} /><span>Play via Launcher</span></a>
                  <a href="/games/vigilante-red-city/" className="btn btn-secondary" style={{ padding: '11px 18px' }}>Explore the game <ArrowUpRight size={15} /></a>
                </div>
                <p className="game-availability">Available through Inaayah Launcher for macOS, Windows and Linux. Play solo or bring family and friends.</p>
              </div>
            </div>
          </div>

          <h3 className="game-row-heading">More to play</h3>
          <article className="glass-panel game-card-compact" id="aether-rush">
            <div className="game-card-img-wrapper">
              <img src="/images/aether-rush-cover.jpg" alt="AetherRush 3D Arcade Brawler" className="game-card-img" loading="lazy" />
            </div>
            <div className="game-compact-content">
              <span className="badge badge-cyan">
                <span className="version-slot version-slot-badge">
                  {versions['aether-rush'] ? `v${versions['aether-rush']}` : <span className="version-skeleton" aria-hidden="true" />}
                </span>
                <span>· Available now</span>
              </span>
              <h3>AetherRush: Cyber Brawler 3D</h3>
              <p>A neon-soaked arcade brawler with acrobatic combat and online co-op.</p>
              <details className="game-details">
                <summary>Game details <ChevronDown size={15} aria-hidden="true" /></summary>
                <ul>
                  <li>Six action stages across streets, subways, docks and Syndicate Tower.</li>
                  <li>Combo chains, aerial recoveries, boss battles and gamepad support.</li>
                  <li>Play together with synchronized online co-op.</li>
                </ul>
              </details>
            </div>
            <div className="game-compact-actions">
              <a href="#launcher" className="btn btn-primary"><Download size={14} />Play via Launcher</a>
            </div>
          </article>

          <article className="glass-panel game-card-compact" id="kettle-court">
            <div className="game-card-img-wrapper">
              <img src="/images/kettle-court-cover.jpg" alt="Kettle Court medieval marketplace board game" className="game-card-img" loading="lazy" />
            </div>
            <div className="game-compact-content">
              <span className="badge badge-green">Play in your browser</span>
              <h3>Kettle Court</h3>
              <p>A cozy marketplace board game for 2–5 players. No installation needed.</p>
              <details className="game-details">
                <summary>Game details <ChevronDown size={15} aria-hidden="true" /></summary>
                <ul>
                  <li>Claim artisan stalls around a 40-step circuit and seven districts.</li>
                  <li>Weather cards bring sun, drizzle, gusts and downpours.</li>
                  <li>Shared stipends and no player elimination keep everyone in the game.</li>
                </ul>
              </details>
            </div>
            <div className="game-compact-actions">
              <a href="https://kettle-court.inaayah.dev/" target="_blank" rel="noreferrer" className="btn btn-primary"><Play size={14} fill="currentColor" />Play in Browser <ArrowUpRight size={14} /></a>
            </div>
          </article>

          {/* Inaayah Web Arcade Hub Spotlight */}
          <h3 className="game-row-heading" style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <span>Inaayah Web Arcade · Instant Browser Games</span>
            <a
              href="https://arcade.inaayah.dev"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
              style={{ padding: '7px 14px', fontSize: 12, textTransform: 'none', letterSpacing: 'normal', fontFamily: 'var(--font-sans)' }}
            >
              <Globe size={13} />
              <span>Visit arcade.inaayah.dev</span>
              <ArrowUpRight size={13} />
            </a>
          </h3>

          <article className="glass-panel game-card-compact" id="eyetest">
            <div className="game-card-img-wrapper">
              <img src="/images/eyetest-cover.jpg" alt="Optik: Daily EyeTest optical calibration game" className="game-card-img" loading="lazy" />
            </div>
            <div className="game-compact-content">
              <span className="badge badge-green">Daily Browser Ritual · 10-Game Pool</span>
              <h3>Optik: Daily EyeTest</h3>
              <p>5 daily visual calibration rounds drawn from a rotating pool of 10 optical mini-games.</p>
              <details className="game-details">
                <summary>Game details <ChevronDown size={15} aria-hidden="true" /></summary>
                <ul>
                  <li>Rotating 10-challenge pool: Chroma, Centroid, Kerning, Bisect, Angle, Parallel, Symmetry, Aperture, Circumcenter &amp; Midtone.</li>
                  <li>Pure 0–100% Optical Accuracy + 1.00×–1.25× Speed Multiplier.</li>
                  <li>Instant ~3 KB SVG visual scorecards &amp; head-to-head challenge links.</li>
                </ul>
              </details>
            </div>
            <div className="game-compact-actions">
              <a href="https://arcade.inaayah.dev/eyetest" target="_blank" rel="noreferrer" className="btn btn-primary"><Play size={14} fill="currentColor" />Play Today&apos;s EyeTest <ArrowUpRight size={14} /></a>
              <a href="https://arcade.inaayah.dev/" target="_blank" rel="noreferrer" className="btn btn-secondary"><Sparkles size={13} />All Arcade Games <ArrowUpRight size={13} /></a>
            </div>
          </article>

          <h3 className="game-row-heading">In development</h3>
          <div className="game-upcoming-grid">
            <article className="glass-panel game-card-mini">
              <div className="game-card-img-wrapper">
                <img src="/images/cyber-tactics-cover.jpg" alt="Cyber Tactics: Syndicate Wars concept art" className="game-card-img" loading="lazy" />
              </div>
              <div className="game-mini-content">
                <span className="badge badge-gold">In development</span>
                <h3>Cyber Tactics: Syndicate Wars</h3>
                <p>Turn-based tactics · Sci-fi RPG</p>
                <details className="game-details">
                  <summary>Project preview <ChevronDown size={15} aria-hidden="true" /></summary>
                  <p>Lead cybernetic mercenaries through the AetherRush syndicate universe, using tactical cover, cyberware and neural upgrades.</p>
                </details>
              </div>
            </article>
            <article className="glass-panel game-card-mini">
              <div className="game-card-img-wrapper">
                <img src="/images/sundered-depths-banner.jpg" alt="Sundered Depths fantasy adventure concept art" className="game-card-img" loading="lazy" />
              </div>
              <div className="game-mini-content">
                <span className="badge badge-gold">In development</span>
                <h3>Sundered Depths</h3>
                <p>Co-op action roguelite · Horde survival</p>
                <details className="game-details">
                  <summary>Project preview <ChevronDown size={15} aria-hidden="true" /></summary>
                  <p>Descend through subterranean biomes with five classes, changing objectives and couch or online co-op. Currently in development.</p>
                </details>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
