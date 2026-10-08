import React from 'react';
import { Sparkles, Code2, ArrowUpRight } from 'lucide-react';

export const LabsSection: React.FC = () => {
  return (
    <section id="labs" className="section" style={{ paddingTop: 40, paddingBottom: 80 }}>
      <div className="container">
        <div className="labs-card">
          <div style={{ maxWidth: 640 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span className="badge badge-gold">
                <Sparkles size={12} />
                Inaayah Labs · In Development
              </span>
              <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                Private Beta
              </span>
            </div>

            <h3 style={{ fontSize: 28, marginBottom: 12, color: '#fff' }}>
              Inaayah Builder: AI-Powered Edge Web Creation
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6, marginBottom: 20 }}>
              Beyond games, our engineering team is developing an intelligent visual site builder that generates, 
              customizes, and deploys production-grade web applications to edge infrastructure with custom domains. 
              Currently undergoing internal testing and feature expansion.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <a 
                href="https://qa.inaayah.dev" 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-secondary"
                style={{ fontSize: 13, padding: '10px 18px' }}
              >
                <span>QA Preview (Internal Contributors)</span>
                <ArrowUpRight size={14} />
              </a>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                Public beta invitations coming later this year.
              </span>
            </div>
          </div>

          <div 
            style={{ 
              width: 140, 
              height: 140, 
              borderRadius: 'var(--radius-xl)', 
              background: 'radial-gradient(circle, rgba(255, 183, 0, 0.15) 0%, rgba(17, 22, 34, 0.8) 100%)',
              border: '1px solid rgba(255, 183, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 0 30px rgba(255, 183, 0, 0.1)',
              flexShrink: 0
            }}
          >
            <Code2 size={36} color="var(--accent-gold)" />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--accent-gold)' }}>
              LABS BETA
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
