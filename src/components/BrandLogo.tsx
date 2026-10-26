import type { CSSProperties } from 'react';

export type BrandDivision = 'studio' | 'games' | 'builder' | 'arcade';

interface BrandLogoProps {
  division?: BrandDivision;
  size?: number;
}

export const BrandLogo = ({ division = 'studio', size = 32 }: BrandLogoProps) => {
  const isGaming = division === 'games' || division === 'arcade';
  return (
    <span
      className="brand-logo"
      role="img"
      aria-label={`Inaayah ${division.charAt(0).toUpperCase()}${division.slice(1)}`}
      style={{ '--brand-size': `${size}px` } as CSSProperties}
    >
      <img
        className="brand-symbol"
        src={isGaming ? '/brand/inaayah-games-icon.png' : '/brand/inaayah-symbol.svg'}
        alt=""
        aria-hidden="true"
        style={isGaming ? { borderRadius: 6 } : undefined}
      />
      <span className="brand-wordmark" aria-hidden="true">
        <span className="brand-name">INAAYAH</span>
        <span className="brand-division">{division}</span>
      </span>
    </span>
  );
};
