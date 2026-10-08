import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck, 
  ShoppingBag, 
  Palette, 
  Bot, 
  CheckCircle2, 
  Send,
  Boxes,
  FileCode2,
  Workflow
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
              Inaayah Labs · The Living Website Builder
            </span>
          </div>
          <h2 className="section-title">
            Your website shouldn't stop evolving <br />
            <span style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', color: '#14b8a6' }}>
              once it's published.
            </span>
          </h2>
          <p className="section-subtitle">
            Design with clean visual blocks, sell products with native Stripe checkout, and let an autonomous site copilot 
            write posts, update offerings, and optimize SEO—all without breaking layouts or writing code.
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

        {/* 4 Core Value Propositions from qa.inaayah.dev */}
        <div className="features-grid" style={{ marginBottom: 48 }}>
          <div className="feature-box" style={{ border: '1px solid rgba(20, 184, 166, 0.25)', background: 'linear-gradient(145deg, rgba(19, 78, 74, 0.2) 0%, rgba(11, 14, 20, 0.7) 100%)' }}>
            <div className="feature-icon-wrapper" style={{ background: 'rgba(20, 184, 166, 0.15)', color: '#14b8a6' }}>
              <Bot size={24} />
            </div>
            <h3 style={{ fontSize: 20, color: '#fff' }}>The Living Website Co-Pilot</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
              Every other builder gives you an empty canvas that goes stale the day you publish. Inaayah’s AI lives inside your site as an ongoing webmaster: drafting case studies, adding shop products, updating promotional copy, and performing SEO audits on demand.
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto' }}>
              <span className="badge" style={{ fontSize: 10 }}>Gemini 2.5</span>
              <span className="badge" style={{ fontSize: 10 }}>Autonomous SEO</span>
            </div>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper" style={{ background: 'rgba(0, 255, 136, 0.1)', color: 'var(--accent-green)' }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: 20 }}>Zero Broken Layouts</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
              Code-generators hallucinate invalid CSS and break on mobile. Inaayah uses strict typed block primitives verified with Zod schemas. The AI cannot misalign margins, break mobile responsiveness, or inject vulnerable code.
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto' }}>
              <span className="badge" style={{ fontSize: 10 }}>Strict Zod Schemas</span>
              <span className="badge" style={{ fontSize: 10 }}>Deterministic Mobile</span>
            </div>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#60a5fa' }}>
              <ShoppingBag size={24} />
            </div>
            <h3 style={{ fontSize: 20 }}>Built-in Commerce & CMS</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
              Sell physical pieces or digital downloads with one-click native Stripe Checkout. No third-party store plugins or recurring app fees. Native contact inbox, newsletter capture, and CSV subscriber export included.
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto' }}>
              <span className="badge" style={{ fontSize: 10 }}>Stripe Checkout</span>
              <span className="badge" style={{ fontSize: 10 }}>Digital Downloads</span>
            </div>
          </div>

          <div className="feature-box">
            <div className="feature-icon-wrapper" style={{ background: 'rgba(168, 85, 247, 0.12)', color: '#c084fc' }}>
              <Palette size={24} />
            </div>
            <h3 style={{ fontSize: 20 }}>Awwwards-Grade Editorial Design</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
              Avoid generic AI templates that look like cheap local business flyers. Inaayah is built on refined Scandinavian editorial design: curated typography pairings (Fraunces, Playfair, Inter), intentional negative space, and cohesive light/dark tokens.
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto' }}>
              <span className="badge" style={{ fontSize: 10 }}>Fraunces Serif</span>
              <span className="badge" style={{ fontSize: 10 }}>Modern Inter</span>
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
                Inaayah Builder is actively running in our internal QA environment. We are testing the block reconciliation engine, Stripe Webhooks integration, and multi-turn autonomous copilot agents.
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
                <h4 style={{ fontSize: 17, marginBottom: 8, color: '#fff' }}>Inaayah Site Copilot</h4>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Autonomous webmaster agent living inside your site. Performs automated SEO audits, product updates, and content drafting.
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
                  <FileCode2 size={20} color="#c084fc" />
                </div>
                <h4 style={{ fontSize: 17, marginBottom: 8, color: '#fff' }}>Edge Markdown & Docs</h4>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Zero-config technical documentation generator compiled directly to Cloudflare edge workers.
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
                <h4 style={{ fontSize: 17, marginBottom: 8, color: '#fff' }}>Privacy Web Utilities</h4>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Single-purpose browser utilities (SVG optimizers, cryptographic helpers) running 100% clientside.
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
