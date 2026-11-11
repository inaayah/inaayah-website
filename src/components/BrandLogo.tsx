import type { CSSProperties } from 'react';

export type BrandDivision = 'studio' | 'games' | 'builder' | 'arcade';

interface BrandLogoProps {
  division?: BrandDivision;
  size?: number;
}

const DIVISION_ICON_MAP: Record<BrandDivision, string> = {
  studio: '/brand/inaayah-symbol.svg?v=opt2',
  games: '/brand/inaayah-games-icon.svg?v=opt2',
  arcade: '/brand/inaayah-arcade-icon.svg?v=opt2',
  builder: '/brand/inaayah-builder-icon.svg?v=opt2',
};

export const BrandLogo = ({ division = 'studio', size = 32 }: BrandLogoProps) => {
  const isTileIcon = division !== 'studio';
  return (
    <span
      className="brand-logo"
      role="img"
      aria-label={`Inaayah ${division.charAt(0).toUpperCase()}${division.slice(1)}`}
      style={{ '--brand-size': `${size}px` } as CSSProperties}
    >
      <img
        className="brand-symbol"
        src={DIVISION_ICON_MAP[division]}
        alt=""
        aria-hidden="true"
        style={isTileIcon ? { borderRadius: 6 } : undefined}
      />
      <span className="brand-wordmark" aria-hidden="true">
        <span className="brand-name">INAAYAH</span>
        <span className="brand-division">{division}</span>
      </span>
    </span>
  );
};
