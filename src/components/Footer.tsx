import React from 'react';


export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div style={{ maxWidth: 360 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <img src="/icon.png" alt="Inaayah" style={{ width: 24, height: 24, borderRadius: 5 }} />
              <span style={{ fontWeight: 800, letterSpacing: '0.05em' }}>INAAYAH STUDIO</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6 }}>
              Independent gaming studio crafting high-octane 3D arcade experiences, 
              edge digital table games, and privacy-respecting desktop software.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 14 }}>
                Products
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
                <li><a href="#launcher" className="nav-link">Inaayah Launcher</a></li>
                <li><a href="#games" className="nav-link">AetherRush 3D</a></li>
                <li><a href="https://kettle-court.inaayah.dev/" target="_blank" rel="noreferrer" className="nav-link">Kettle Court</a></li>
                <li><a href="#games" className="nav-link">Cyber Tactics</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 14 }}>
                Open Source
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
                <li>
                  <a href="https://github.com/inaayah/inaayah-launcher" target="_blank" rel="noreferrer" className="nav-link">
                    Launcher Repo ↗
                  </a>
                </li>
                <li>
                  <a href="https://github.com/inaayah/inaayah-launcher/releases" target="_blank" rel="noreferrer" className="nav-link">
                    Launcher Releases ↗
                  </a>
                </li>
                <li>
                  <a href="https://github.com/inaayah/aether-rush/releases" target="_blank" rel="noreferrer" className="nav-link">
                    AetherRush Releases ↗
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 14 }}>
                Network
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--accent-green)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-green)', boxShadow: '0 0 8px var(--accent-green)' }} />
                <span>Edge Relays Operational</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 8 }}>
                Nakama 7350 · Cloudflare DO
              </p>
            </div>
          </div>
        </div>

        <div className="footer-copy">
          <div>
            © {new Date().getFullYear()} Inaayah Studio. Zero telemetry. 100% DRM-Free.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)' }}>
            <span>Built with passion & precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
