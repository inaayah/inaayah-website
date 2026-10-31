import React from 'react';
import { Cpu, ShieldCheck, Zap, Globe, Layers, Terminal } from 'lucide-react';

export const TechSection: React.FC = () => {
  return (
    <section id="technology" className="section">
      <div className="container">
        <div className="section-rule">
          <span className="section-index">
            <span className="section-index-num">04 //</span>
            <span>STUDIO ARCHITECTURE</span>
          </span>
          <span>GODOT 4 · NAKAMA 7350 · CLOUDFLARE EDGE</span>
        </div>

        <div className="section-header-split">
          <h2 className="section-title">
            <span className="tone-muted">Built for speed,</span> reliability,{' '}
            <span className="tone-serif">and edge performance.</span>
          </h2>
          <p className="section-subtitle">
            Engineered for low-latency responsiveness and native desktop performance.
            Whether deploying edge web builders or compiling native 2D and 3D games, our software runs on modern distributed systems.
          </p>
        </div>

        <div className="bento-grid-3">
          {/* Card 1: Godot 4 Engine */}
          <div className="bento-card">
            <div className="bento-schematic">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ padding: '4px 8px', borderRadius: 4, background: 'var(--btn-secondary-bg)', border: '1px solid var(--border-subtle)' }}>Blender .blend</span>
                <span style={{ color: 'var(--text-muted)' }}>→</span>
                <span style={{ padding: '4px 8px', borderRadius: 4, background: 'var(--btn-secondary-bg)', border: '1px solid var(--border-subtle)' }}>Godot 4.3</span>
                <span style={{ color: 'var(--text-muted)' }}>→</span>
                <span style={{ padding: '4px 8px', borderRadius: 4, background: 'rgba(45,212,191,0.1)', border: '1px solid rgba(45,212,191,0.28)', color: 'var(--brand-accent-soft)' }}>Vulkan / Metal</span>
              </div>
              <div style={{ marginTop: 12, fontSize: 10, color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                <span>PIPELINE: HEADLESS EXPORT</span>
                <span style={{ color: 'var(--brand-accent)' }}>60–120 FPS NATIVE</span>
              </div>
            </div>
            <div className="bento-body">
              <div className="bento-title-row">
                <Cpu size={16} color="var(--brand-accent)" />
                <span>Godot 4 Engine</span>
              </div>
              <p>
                Native cross-platform compilation targeting Vulkan and Metal. Headless automated Blender
                asset pipelines export high-performance 3D character meshes directly into clean bytecode.
              </p>
            </div>
          </div>

          {/* Card 2: Nakama Game Cluster */}
          <div className="bento-card">
            <div className="bento-schematic">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', borderRadius: 4, background: 'var(--btn-secondary-bg)', border: '1px solid var(--border-subtle)' }}>
                  <span>OPCODE 0x04 · STATE_SYNC</span>
                  <span style={{ color: 'var(--brand-stone)' }}>30Hz Tick</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', borderRadius: 4, background: 'var(--btn-secondary-bg)', border: '1px solid var(--border-subtle)' }}>
                  <span>NAKAMA RELAY · PORT 7350</span>
                  <span style={{ color: 'var(--brand-accent)' }}>CONNECTED</span>
                </div>
              </div>
            </div>
            <div className="bento-body">
              <div className="bento-title-row">
                <Zap size={16} color="var(--brand-accent)" />
                <span>Nakama Game Cluster</span>
              </div>
              <p>
                Shared state relay and authentication backbone. Delivers 30Hz compressed state packets,
                instant matchmaking, and synchronized multiplayer brawling with global low latency.
              </p>
            </div>
          </div>

          {/* Card 3: Edge Compute & Workers */}
          <div className="bento-card">
            <div className="bento-schematic">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>CF_WORKER :: DURABLE_OBJECT</span>
                  <span style={{ color: 'var(--brand-amber)' }}>0.4ms cold</span>
                </div>
                <div style={{ height: 6, borderRadius: 99, background: 'var(--border-glass)', overflow: 'hidden' }}>
                  <div style={{ width: '88%', height: '100%', background: 'linear-gradient(90deg, var(--brand-accent), var(--brand-stone))' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)' }}>
                  <span>300+ EDGE POPs</span>
                  <span>WEBSOCKET HIBERNATION</span>
                </div>
              </div>
            </div>
            <div className="bento-body">
              <div className="bento-title-row">
                <Globe size={16} color="var(--brand-accent)" />
                <span>Edge Compute &amp; Workers</span>
              </div>
              <p>
                Cloudflare edge compute powers both our upcoming visual web builder deployments and real-time
                Durable Object game rooms with sub-millisecond global cold starts.
              </p>
            </div>
          </div>

          {/* Card 4: Verified Integrity & Cloud Sync */}
          <div className="bento-card">
            <div className="bento-schematic">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 10.5 }}>
                <div style={{ color: 'var(--text-muted)' }}>$ sha256sum --check release.manifest</div>
                <div style={{ color: 'var(--brand-accent-soft)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>vigilante-v1.0.2.pck</span>
                  <span>VERIFIED OK</span>
                </div>
                <div style={{ color: 'var(--brand-accent-soft)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>aether-rush-delta.bin</span>
                  <span>VERIFIED OK</span>
                </div>
              </div>
            </div>
            <div className="bento-body">
              <div className="bento-title-row">
                <ShieldCheck size={16} color="var(--brand-accent)" />
                <span>Verified Integrity &amp; Cloud Sync</span>
              </div>
              <p>
                Cryptographic SHA-256 package verification, seamless delta patching, and lightweight
                account synchronization across desktop and browser experiences.
              </p>
            </div>
          </div>

          {/* Card 5: Dynamic Multi-Tier Catalog */}
          <div className="bento-card">
            <div className="bento-schematic">
              <div style={{ padding: '8px 10px', borderRadius: 6, background: 'var(--btn-secondary-bg)', border: '1px solid var(--border-subtle)', fontSize: 10.5 }}>
                <div style={{ color: 'var(--brand-accent-soft)' }}>GET /api/games HTTP/2</div>
                <div style={{ color: 'var(--text-muted)', marginTop: 4 }}>
                  {`{ "catalog": "edge-d1", "hot_reload": true }`}
                </div>
              </div>
            </div>
            <div className="bento-body">
              <div className="bento-title-row">
                <Layers size={16} color="var(--brand-accent)" />
                <span>Dynamic Multi-Tier Catalog</span>
              </div>
              <p>
                Inaayah Launcher queries Cloudflare edge gateways and GitHub manifests dynamically.
                New titles, patches, and artwork publish instantly without rebuilding the desktop launcher.
              </p>
            </div>
          </div>

          {/* Card 6: Open Release Pipelines */}
          <div className="bento-card">
            <div className="bento-schematic">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, textAlign: 'center', fontSize: 10 }}>
                <div style={{ padding: '6px 4px', borderRadius: 4, background: 'var(--btn-secondary-bg)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>macOS</div>
                  <div style={{ color: 'var(--brand-accent)', marginTop: 2 }}>.dmg ✓</div>
                </div>
                <div style={{ padding: '6px 4px', borderRadius: 4, background: 'var(--btn-secondary-bg)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Windows</div>
                  <div style={{ color: 'var(--brand-accent)', marginTop: 2 }}>.exe ✓</div>
                </div>
                <div style={{ padding: '6px 4px', borderRadius: 4, background: 'var(--btn-secondary-bg)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Linux</div>
                  <div style={{ color: 'var(--brand-accent)', marginTop: 2 }}>.AppImage ✓</div>
                </div>
              </div>
            </div>
            <div className="bento-body">
              <div className="bento-title-row">
                <Terminal size={16} color="var(--brand-accent)" />
                <span>Open Release Pipelines</span>
              </div>
              <p>
                Automated multi-OS GitHub Actions matrices compile universal macOS bundles,
                Windows and Linux packages directly from tagged source releases, including runtime-only game archives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
