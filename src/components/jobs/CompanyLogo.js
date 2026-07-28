import React, { useMemo } from 'react';
import { getCompanyBrand } from '../../utils/companyBranding';

/**
 * Always-visible company logo tile (no external image CDN).
 * Uses brand colours + airline code (6E, AI, SG…) like a real job board badge.
 */
const CompanyLogo = ({ company, size = 56, className = '' }) => {
  const brand = useMemo(() => getCompanyBrand(company), [company]);
  const px = typeof size === 'number' ? size : 56;
  const fontSize = Math.max(11, Math.round(px * 0.28));
  const planeSize = Math.max(10, Math.round(px * 0.22));

  return (
    <div
      className={`relative shrink-0 rounded-xl overflow-hidden shadow-md flex flex-col items-center justify-center text-white select-none ${className}`}
      style={{
        width: px,
        height: px,
        background: `linear-gradient(145deg, ${brand.color} 0%, ${brand.color2 || brand.color} 100%)`,
        boxShadow: `0 4px 14px ${brand.color}40`,
      }}
      title={brand.name}
      role="img"
      aria-label={`${brand.name} logo`}
    >
      {/* subtle shine */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, transparent 50%)',
        }}
      />

      {/* plane icon */}
      <svg
        width={planeSize}
        height={planeSize}
        viewBox="0 0 24 24"
        fill="currentColor"
        className="relative opacity-90 mb-0.5"
        aria-hidden
      >
        <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
      </svg>

      {/* airline / company code */}
      <span
        className="relative font-extrabold tracking-tight leading-none"
        style={{ fontSize: `${fontSize}px`, letterSpacing: '-0.02em' }}
      >
        {brand.short || brand.initials}
      </span>
    </div>
  );
};

export default CompanyLogo;
