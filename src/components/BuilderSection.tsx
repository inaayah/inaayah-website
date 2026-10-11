import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowUpRight, 
  ShoppingBag, 
  Palette, 
  CheckCircle2, 
  Send, 
  Boxes, 
  Workflow, 
  Globe, 
  Bot 
} from 'lucide-react';
import { InaayahEditorPreview } from './InaayahEditorPreview';

export const BuilderSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      const waitlist = JSON.parse(localStorage.getItem('inaayah_builder_waitlist') || '[]');
      waitlist.push({ email: email.trim(), date: new Date().toISOString() });
      localStorage.setItem('inaayah_builder_waitlist', JSON.stringify(waitlist));
    } catch {}
    setSubmitted(true);
  };

  return (
    <section id="builder" className="section" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(17, 94, 89, 0.05) 50%, transparent 100%)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="badge badge-gold">
              <Sparkles size={13} />
              Inaayah Builder · Visual Web Creation with Live Co-Pilot
            </span>
          </div>
          <h2 className="section-title">
            Websites built with editorial beauty, <br />
            <span style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', color: '#14b8a6' }}>
              an integrated co-pilot, and custom domains.
            </span>
          </h2>
          <p className="section-subtitle">
            Design with clean visual blocks or let the integrated site co-pilot draft copy, announce updates, and organize sections. 
            Hosted directly on the web with instant custom domain and subdomain setup—fast, responsive, and completely under your control.
          </p>
        </div>

        {/* Live Interactive Editor Preview */}
        <div style={{ maxWidth: 1080, margin: '0 auto 48px' }}>
          <InaayahEditorPreview />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginTop: 16, padding: '0 8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
              <span className="badge badge-gold" style={{ fontSize: 10 }}>Internal Testing Phase</span>
              <span>Interactive sandbox reflecting live state at <a href="https://qa.inaayah.dev" target="_blank" rel="noreferrer" style={{ color: '#14b8a6', textDecoration: 'underline' }}>qa.inaayah.dev</a></span>
            </div>
            <div style={{ display: 'flex', gap: 14 }}>
              <a 
                href="https://qa.inaayah.dev/s/demo" 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-secondary"
                style={{ padding: '8px 16px', fontSize: 12 }}
              >
                <span>Explore Live Site Demo</span>
                <ArrowUpRight size={13} />
              </a>
              <a 
                href="https://github.com/inaayah/inaayah-builder" 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-secondary"
                style={{ padding: '8px 16px', fontSize: 12 }}
              >
                <span>GitHub Repo</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* 4 Core Value Propositions */}
        <div className="features-grid" style={{ marginBottom: 48 }}>
          <div className="feature-box" style={{ border: '1px solid rgba(20, 184, 166, 0.25)', background: 'linear-gradient(145deg, rgba(19, 78, 74, 0.2) 0%, rgba(11, 14, 20, 0.7) 100%)' }}>
            <div className="feature-icon-wrapper" style={{ background: 'rgba(20, 184, 166, 0.15)', color: '#14b8a6' }}>
              <Bot size={24} />
            </div>
            <h3 style={{ fontSize: 20, color: '#fff' }}>Integrated Live Site Co-Pilot</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
              Never struggle with an empty canvas or tedious page updates. Inaayah’s live co-pilot drafts case studies, updates promotional banners, adds showcase products, and refines typography on demand—always respecting your layout constraints.
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto' }}>
              <span className="badge" style={{ fontSize: 10 }}>Conversational Edits</span>
              <span className="badge" style={{ fontSize: 10 }}>Design System Aware</span>
            </div>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper" style={{ background: 'rgba(0, 255, 136, 0.1)', color: 'var(--accent-green)' }}>
              <Globe size={24} />
            </div>
            <h3 style={{ fontSize: 20 }}>Live Edge Hosting & Custom Domains</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
              Your website lives directly on our global edge network. Connect your own custom domain or get a free .inaayah.dev subdomain in seconds, complete with automated SSL certificates and zero server maintenance.
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto' }}>
              <span className="badge" style={{ fontSize: 10 }}>Custom Domains</span>
              <span className="badge" style={{ fontSize: 10 }}>Free Subdomains</span>
            </div>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#60a5fa' }}>
              <ShoppingBag size={24} />
            </div>
            <h3 style={{ fontSize: 20 }}>Showcases & Direct Payments</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
              Sell physical creations, digital assets, or studio commissions without lock-in. Connect flexible direct payment links, embed custom inquiry forms, and manage contact requests with local CSV export.
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto' }}>
              <span className="badge" style={{ fontSize: 10 }}>Direct Payment Links</span>
              <span className="badge" style={{ fontSize: 10 }}>Inquiry Capture</span>
            </div>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper" style={{ background: 'rgba(168, 85, 247, 0.12)', color: '#c084fc' }}>
              <Palette size={24} />
            </div>
            <h3 style={{ fontSize: 20 }}>Editorial Typography & Restraint</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
              Avoid cluttered drag-and-drop mess. Inaayah is built on refined editorial design principles: curated typography pairings (Fraunces serif, Inter sans, JetBrains Mono), deliberate negative space, and cohesive light/dark tokens.
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto' }}>
              <span className="badge" style={{ fontSize: 10 }}>Fraunces Serif</span>
              <span className="badge" style={{ fontSize: 10 }}>Fluid Typography</span>
            </div>
          </div>
        </div>

        {/* Development Status & Early Access Waitlist Card */}
        <div 
          className="glass-panel" 
          style={{ 
            padding: '36px', 
            borderRadius: 'var(--radius-xl)', 
            border: '1px solid rgba(20, 184, 166, 0.3)',
            background: 'linear-gradient(135deg, rgba(13, 23, 27, 0.8) 0%, rgba(17, 22, 34, 0.95) 100%)'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 36, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span className="badge badge-gold">
                  Pre-Alpha Status Note
                </span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Internal Testbed · Active R&D
                </span>
              </div>

              <h3 style={{ fontSize: 24, color: '#fff', marginBottom: 10 }}>
                Open Development & Contributor Testing
              </h3>

              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
                Inaayah Builder is actively running in our internal QA environment. We are testing the block reconciliation engine, the integrated live co-pilot, custom domain routing, and direct checkout workflows.
              </p>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a 
                  href="https://qa.inaayah.dev" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn btn-primary"
                  style={{ fontSize: 13, padding: '10px 20px', background: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)' }}
                >
                  <span>Open QA Instance (qa.inaayah.dev)</span>
                  <ArrowUpRight size={14} />
                </a>

                <a 
                  href="https://qa.inaayah.dev/s/demo" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn btn-secondary"
                  style={{ fontSize: 13, padding: '10px 20px' }}
                >
                  <span>View Aura Studio Demo Site</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Waitlist Box */}
            <div style={{ background: 'rgba(7, 9, 14, 0.6)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-glass)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Sparkles size={16} color="#14b8a6" />
                <h4 style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>
                  Request Closed Alpha Access
                </h4>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 16 }}>
                Sign up to test private alpha builds, provide architecture feedback, and get early invitation tokens.
              </p>

              {submitted ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: 'rgba(20, 184, 166, 0.12)', border: '1px solid rgba(20, 184, 166, 0.35)', borderRadius: 'var(--radius-md)', color: '#2dd4bf', fontSize: 13 }}>
                  <CheckCircle2 size={16} />
                  <span>Request saved! We'll reach out when alpha seats open.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="waitlist-form">
                  <input 
                    type="text" 
                    placeholder="Enter email or GitHub username..." 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="waitlist-input"
                    style={{ borderColor: 'rgba(20, 184, 166, 0.3)' }}
                    required
                  />
                  <button type="submit" className="btn btn-primary" style={{ padding: '10px 18px', fontSize: 13, background: 'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)' }}>
                    <Send size={14} />
                    <span>Join</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Studio Pipeline & Future Web Utilities */}
        <div style={{ marginTop: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span className="badge badge-purple">
              <Boxes size={12} />
              Studio Pipeline
            </span>
            <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>Upcoming Creative Tools & Micro-Webapps</span>
          </div>

          <div className="tools-grid">
            <div className="tool-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <span className="badge badge-gold" style={{ fontSize: 10 }}>In Development</span>
                  <Bot size={20} color="#14b8a6" />
                </div>
                <h4 style={{ fontSize: 17, marginBottom: 8, color: '#fff' }}>Live Site Co-Pilot Expansion</h4>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Contextual drafting, seasonal promo automation, and continuous content updates directly inside your site editor.
                </p>
              </div>
              <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border-subtle)', fontSize: 12, color: '#14b8a6' }}>
                Internal QA Live
              </div>
            </div>

            <div className="tool-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <span className="badge badge-purple" style={{ fontSize: 10 }}>Architecture Phase</span>
                  <Globe size={20} color="#c084fc" />
                </div>
                <h4 style={{ fontSize: 17, marginBottom: 8, color: '#fff' }}>Custom Domain & Edge SSL</h4>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Automated DNS validation, edge SSL provisioning, and instant domain mapping for every published site.
                </p>
              </div>
              <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border-subtle)', fontSize: 12, color: '#c084fc' }}>
                Pipeline 2026 / 2027
              </div>
            </div>

            <div className="tool-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <span className="badge badge-green" style={{ fontSize: 10 }}>Concept</span>
                  <Workflow size={20} color="var(--accent-green)" />
                </div>
                <h4 style={{ fontSize: 17, marginBottom: 8, color: '#fff' }}>Privacy-First Web Utilities</h4>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Single-purpose browser utilities (SVG optimizers, cryptographic helpers, image compressor) running 100% clientside.
                </p>
              </div>
              <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border-subtle)', fontSize: 12, color: 'var(--accent-green)' }}>
                Research Lab
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
