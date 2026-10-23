import React, { useEffect, useState } from 'react';
import { Gamepad2, Play, Download, CheckCircle, ArrowUpRight, ChevronDown } from 'lucide-react';

export const GamesSection: React.FC = () => {
  const [versions, setVersions] = useState<Record<string, string>>({});
  useEffect(() => {
    let active = true;
    let pending: AbortController | undefined;
    const refresh = async () => {
      pending?.abort();
      const controller = new AbortController();
      pending = controller;
      try {
        const response = await fetch('https://releases.inaayah.dev/api/games', { cache: 'no-store', signal: controller.signal });
        if (!response.ok) return;
        const catalog: unknown = await response.json();
        if (active && Array.isArray(catalog)) {
          setVersions(Object.fromEntries(catalog.filter(item => typeof item.id === 'string' &&
            typeof item.version === 'string' && /^\d+\.\d+\.\d+$/.test(item.version)).map(item => [item.id, item.version])));
        }
      } catch { /* Keep the last successful version during a transient outage. */ }
    };
    void refresh();
    const timer = window.setInterval(refresh, 60000);
    window.addEventListener('focus', refresh);
    return () => { active = false; pending?.abort(); window.clearInterval(timer); window.removeEventListener('focus', refresh); };
  }, []);
  return (
    <section id="games" className="section" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(17, 22, 34, 0.4) 50%, transparent 100%)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="badge badge-cyan">
              <Gamepad2 size={13} />
              Gaming Division
            </span>
          </div>
          <h2 className="section-title">
            Crafted for <span className="gradient-text-cyan">Adrenaline & Cozy Strategy.</span>
          </h2>
          <p className="section-subtitle">
            From hand-drawn comic streets and 3D arcade action to cozy medieval marketplaces, discover the worlds of Inaayah Studio.
          </p>
        </div>

        <div className="games-grid">
          {/* Featured release: Vigilante: Red City */}
          <div id="vigilante-red-city" className="glass-panel game-card-featured">
            <div className="game-card-img-wrapper" style={{ height: 'auto', minHeight: 440 }}>
              <img src="/images/vigilante-red-city-cover.jpg" alt="Murat, Zeynep and Emir in Vigilante: Red City" className="game-card-img" />
              <div style={{ position: 'absolute', top: 20, left: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span className="badge badge-cyan">Featured{versions['vigilante-red-city'] ? ` · v${versions['vigilante-red-city']} Live` : ' · Available now'}</span>
                <span className="badge badge-gold">Comic Beat ’Em Up</span>
              </div>
            </div>
            <div className="game-card-content">
              <div>
                <span className="badge" style={{ marginBottom: 12 }}>One Family. One City. Bring Her Home.</span>
                <h3 style={{ fontSize: 30, marginBottom: 10 }}>Vigilante: Red City</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6 }}>
                  Vance wants the family garage. When the Demirs refuse, he takes Inaayah.
                  Fight as Murat, Zeynep or Emir across neon streets, subway platforms,
                  docks and foundries to the final rescue above Red City.
                </p>
                <ul className="game-features-list">
                  <li><CheckCircle size={16} color="var(--accent-cyan)" /><span><strong>Five Connected Stages:</strong> Comic scenes, varied enemies and five boss battles.</span></li>
                  <li><CheckCircle size={16} color="var(--accent-cyan)" /><span><strong>Fight Together:</strong> Solo, shared-screen, split-screen and direct online co-op.</span></li>
                  <li><CheckCircle size={16} color="var(--accent-cyan)" /><span><strong>Vocal Nasheed Soundtrack:</strong> An emotional journey with recorded combat sounds.</span></li>
                  <li><CheckCircle size={16} color="var(--accent-cyan)" /><span><strong>Your Completion Gift:</strong> Unlock sketchbook memories and the complete 71-page in-game comic.</span></li>
                </ul>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border-subtle)' }}>
                <a href="#launcher" className="btn btn-primary" style={{ padding: '12px 24px' }}><Download size={16} /><span>Play via Launcher</span></a>
                <a href="https://releases.inaayah.dev/api/games/vigilante-red-city/download/darwin" className="btn btn-secondary" style={{ padding: '12px 18px' }}>macOS</a>
                <a href="https://releases.inaayah.dev/api/games/vigilante-red-city/download/win32" className="btn btn-secondary" style={{ padding: '12px 18px' }}>Windows</a>
                <a href="https://releases.inaayah.dev/api/games/vigilante-red-city/download/linux" className="btn btn-secondary" style={{ padding: '12px 18px' }}>Linux</a>
              </div>
              <p className="game-availability">Available for macOS, Windows and Linux. Play solo or bring family and friends.</p>
            </div>
          </div>

          <h3 className="game-row-heading">More to play</h3>
          <article className="glass-panel game-card-compact" id="aether-rush">
            <div className="game-card-img-wrapper">
              <img src="/images/aether-rush-cover.jpg" alt="AetherRush 3D Arcade Brawler" className="game-card-img" loading="lazy" />
            </div>
            <div className="game-compact-content">
              <span className="badge badge-cyan">{versions['aether-rush'] ? `v${versions['aether-rush']} · ` : ''}Available now</span>
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
              <a href="#launcher" className="btn btn-primary"><Download size={15} />Play via Launcher</a>
              <a href="https://releases.inaayah.dev/api/games/aether-rush/download/darwin" className="btn btn-secondary">macOS download <ArrowUpRight size={14} /></a>
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
              <a href="https://kettle-court.inaayah.dev/" target="_blank" rel="noreferrer" className="btn btn-glow-magenta"><Play size={15} fill="currentColor" />Play in Browser <ArrowUpRight size={14} /></a>
            </div>
          </article>

          <h3 className="game-row-heading game-upcoming-heading">In development</h3>
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
