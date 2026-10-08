import React from 'react';
import { Cpu, ShieldCheck, Zap, Globe, Layers, Terminal } from 'lucide-react';

export const TechSection: React.FC = () => {
  return (
    <section id="technology" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="badge badge-cyan">
              <Cpu size={13} />
              Studio Infrastructure
            </span>
          </div>
          <h2 className="section-title">
            Built for Speed, Privacy, <span className="gradient-text-cyan">& Edge Performance.</span>
          </h2>
          <p className="section-subtitle">
            We reject surveillance telemetry, vendor lock-in, and bloatware. 
            Whether deploying edge web builders or compiling native 3D games, our software runs on open standards and modern distributed systems.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-box">
            <div className="feature-icon-wrapper">
              <Cpu size={24} />
            </div>
            <h3 style={{ fontSize: 20 }}>Godot 4.3 Engine</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
              Native cross-platform compilation targeting Vulkan and Metal. Headless automated Blender 
              asset pipelines export high-performance 3D character meshes directly into clean bytecode.
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper" style={{ background: 'rgba(255, 0, 85, 0.1)', color: 'var(--accent-magenta)' }}>
              <Zap size={24} />
            </div>
            <h3 style={{ fontSize: 20 }}>Nakama Game Cluster</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
              Shared state relay and authentication backbone. Delivers 30Hz compressed state packets, 
              instant matchmaking, and synchronized multiplayer brawling with global low latency.
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper" style={{ background: 'rgba(255, 183, 0, 0.1)', color: 'var(--accent-gold)' }}>
              <Globe size={24} />
            </div>
            <h3 style={{ fontSize: 20 }}>Edge Compute & Workers</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
              Cloudflare edge compute powers both our upcoming visual web builder deployments and real-time 
              Durable Object game rooms with sub-millisecond global cold starts.
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper" style={{ background: 'rgba(0, 255, 136, 0.1)', color: 'var(--accent-green)' }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: 20 }}>Zero Telemetry / Privacy-First</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
              No ad tracking, third-party analytics pixels, or spyware. Across every Inaayah tool, webapp, and 
              game, your drafts, configurations, and playtime remain 100% on your local machine.
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper">
              <Layers size={24} />
            </div>
            <h3 style={{ fontSize: 20 }}>Dynamic Multi-Tier Catalog</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
              Inaayah Launcher queries Cloudflare edge gateways and GitHub manifests dynamically. 
              New titles, patches, and artwork publish instantly without rebuilding the desktop launcher.
            </p>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper" style={{ background: 'rgba(153, 0, 255, 0.1)', color: '#b566ff' }}>
              <Terminal size={24} />
            </div>
            <h3 style={{ fontSize: 20 }}>Open Release Pipelines</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
              Automated multi-OS GitHub Actions matrices compile universal macOS bundles (.dmg), 
              Windows NSIS packages (.exe), and Linux AppImages directly from tagged source releases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
