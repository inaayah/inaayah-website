import React, { useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Send,
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
    <section id="builder" className="section">
      <div className="container">
        <div className="section-rule">
          <span className="section-index">
            <span className="section-index-num">02 //</span>
            <span>INAAYAH BUILDER</span>
          </span>
          <span>VISUAL WEB CREATION · PRE-ALPHA</span>
        </div>

        <div className="section-header-split">
          <h2 className="section-title">
            <span className="tone-muted">Websites built with</span> editorial beauty,{' '}
            <span className="tone-serif">
              a live co-pilot, and custom domains.
            </span>
          </h2>
          <p className="section-subtitle">
            Compose with structured visual blocks or let the integrated site co-pilot draft copy, announce updates, and organize sections.
            Hosted directly on the edge with custom domain and subdomain routing.
          </p>
        </div>

        {/* Live Interactive Editor Preview in Double-Bezel Frame */}
        <div style={{ marginBottom: 48 }}>
          <div className="bezel-outer">
            <div className="bezel-inner">
              <InaayahEditorPreview />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginTop: 14, padding: '0 4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10, fontSize: 13, color: 'var(--text-secondary)' }}>
              <span className="badge badge-gold">Internal Testing Phase</span>
              <span>Interactive sandbox reflecting live state at <a href="https://qa-builder.inaayah.dev" target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}>qa-builder.inaayah.dev</a></span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <a
                href="https://qa-builder.inaayah.dev/s/demo"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
                style={{ padding: '8px 14px', fontSize: 12 }}
              >
                <span>Explore Live Site Demo</span>
                <ArrowUpRight size={13} />
              </a>
              <a
                href="https://github.com/inaayah/inaayah-builder"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
                style={{ padding: '8px 14px', fontSize: 12 }}
              >
                <span>GitHub Repo</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* 4-Column Architectural Hairline Strip (Linear Inspired) */}
        <div className="hairline-grid-4">
          <div className="hairline-col">
            <span className="hairline-num">1.0 Co-Pilot</span>
            <h3>Integrated Live Site Co-Pilot</h3>
            <p>
              Draft case studies, update promotional banners, add showcase products, and refine typography on demand while respecting your layout constraints.
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 8 }}>
              <span className="badge">Conversational Edits</span>
              <span className="badge">Design System Aware</span>
            </div>
          </div>

          <div className="hairline-col">
            <span className="hairline-num">2.0 Edge Hosting</span>
            <h3>Live Edge Hosting &amp; Custom Domains</h3>
            <p>
              Every site runs on our global edge network. Connect your own custom domain or claim a free .inaayah.dev subdomain with automated SSL certificates.
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 8 }}>
              <span className="badge">Custom Domains</span>
              <span className="badge">Free Subdomains</span>
            </div>
          </div>

          <div className="hairline-col">
            <span className="hairline-num">3.0 Direct Commerce</span>
            <h3>Showcases &amp; Direct Payments</h3>
            <p>
              Present physical creations, digital assets, or studio commissions. Connect direct payment links, embed inquiry forms, and export leads as CSV.
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 8 }}>
              <span className="badge">Payment Links</span>
              <span className="badge">Inquiry Capture</span>
            </div>
          </div>

          <div className="hairline-col">
            <span className="hairline-num">4.0 Editorial System</span>
            <h3>Editorial Typography &amp; Restraint</h3>
            <p>
              Built around curated typography pairings (Fraunces serif, Outfit sans, JetBrains Mono), balanced spacing scales, and cohesive light and dark tokens.
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 8 }}>
              <span className="badge">Fraunces Serif</span>
              <span className="badge">Fluid Scale</span>
            </div>
          </div>
        </div>

        {/* Development Status & Early Access Waitlist in Double-Bezel Frame */}
        <div className="bezel-outer">
          <div className="bezel-inner" style={{ padding: 'clamp(24px, 3.5vw, 36px)' }}>
            <div className="builder-access-grid">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                  <span className="badge badge-gold">Pre-Alpha Status</span>
                  <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    INTERNAL TESTBED · ACTIVE R&amp;D
                  </span>
                </div>

                <h3 style={{ fontSize: 22, color: 'var(--text-primary)', marginBottom: 10 }}>
                  Open Development &amp; Contributor Testing
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginBottom: 18 }}>
                  Inaayah Builder is running in our internal QA environment. We are testing the block reconciliation engine, the integrated live co-pilot, custom domain routing, and direct checkout workflows.
                </p>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a
                    href="https://qa-builder.inaayah.dev"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                    style={{ fontSize: 13, padding: '10px 18px' }}
                  >
                    <span>Open Builder QA</span>
                    <ArrowUpRight size={14} />
                  </a>

                  <a
                    href="https://qa-builder.inaayah.dev/s/demo"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary"
                    style={{ fontSize: 13, padding: '10px 18px' }}
                  >
                    <span>View Aura Studio Demo Site</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              <div style={{ background: 'var(--bg-subtle-box)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
                  Request Closed Alpha Access
                </h4>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 14 }}>
                  Sign up to test private alpha builds, share feedback, and receive early invitation tokens.
                </p>

                {submitted ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px', background: 'var(--badge-teal-bg)', border: '1px solid var(--badge-teal-border)', borderRadius: 'var(--radius-md)', color: 'var(--brand-accent-soft)', fontSize: 13 }}>
                    <CheckCircle2 size={16} />
                    <span>Request saved. We will reach out when alpha seats open.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="waitlist-form">
                    <input
                      type="text"
                      placeholder="Enter email or GitHub username..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="waitlist-input"
                      required
                    />
                    <button type="submit" className="btn btn-primary" style={{ padding: '10px 18px', fontSize: 13 }}>
                      <Send size={13} />
                      <span>Join</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Studio Pipeline & Upcoming Web Utilities */}
        <div style={{ marginTop: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              STUDIO PIPELINE // UPCOMING CREATIVE TOOLS &amp; WEB UTILITIES
            </span>
          </div>

          <div className="tools-grid">
            <div className="tool-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span className="badge badge-gold">In Development</span>
                  <Bot size={18} color="var(--text-secondary)" />
                </div>
                <h4 style={{ fontSize: 16, marginBottom: 6, color: 'var(--text-primary)' }}>Live Site Co-Pilot Expansion</h4>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Contextual drafting, seasonal promo automation, and continuous content updates directly inside your site editor.
                </p>
              </div>
              <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border-subtle)', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                INTERNAL QA LIVE
              </div>
            </div>

            <div className="tool-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span className="badge badge-purple">Architecture Phase</span>
                  <Globe size={18} color="var(--text-secondary)" />
                </div>
                <h4 style={{ fontSize: 16, marginBottom: 6, color: 'var(--text-primary)' }}>Custom Domain &amp; Edge SSL</h4>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Automated DNS validation, edge SSL provisioning, and instant domain mapping for every published site.
                </p>
              </div>
              <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border-subtle)', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                PIPELINE 2026 / 2027
              </div>
            </div>

            <div className="tool-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span className="badge badge-green">Concept</span>
                  <Workflow size={18} color="var(--text-secondary)" />
                </div>
                <h4 style={{ fontSize: 16, marginBottom: 6, color: 'var(--text-primary)' }}>Client-Side Web Utilities</h4>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Single-purpose browser utilities (SVG optimizers, cryptographic helpers, image compressor) running in the browser.
                </p>
              </div>
              <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border-subtle)', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                RESEARCH LAB
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
