import React, { useEffect, useMemo, useState } from 'react';
import { getCompanyBrand, getLogoCandidates } from '../../utils/companyBranding';

/**
 * Company logo — real favicon/Clearbit image with LinkedIn-style white tile,
 * falling back to gradient airline-code badge when images fail.
 */
const CompanyLogo = ({ company, logoUrl, size = 56, className = '' }) => {
  const brand = useMemo(() => getCompanyBrand(company), [company]);
  const candidates = useMemo(
    () => getLogoCandidates({ domain: brand.domain, logoUrl }),
    [brand.domain, logoUrl]
  );

  const [srcIndex, setSrcIndex] = useState(0);
  const [useBadge, setUseBadge] = useState(candidates.length === 0);

  useEffect(() => {
    setSrcIndex(0);
    setUseBadge(candidates.length === 0);
  }, [candidates]);

  const px = typeof size === 'number' ? size : 56;
  const fontSize = Math.max(11, Math.round(px * 0.28));
  const planeSize = Math.max(10, Math.round(px * 0.22));
  const radius = Math.max(8, Math.round(px * 0.18));

  const handleImgError = () => {
    const next = srcIndex + 1;
    if (next < candidates.length) {
      setSrcIndex(next);
    } else {
      setUseBadge(true);
    }
  };

  if (!useBadge && candidates[srcIndex]) {
    return (
      <div
        className={`relative shrink-0 overflow-hidden bg-white flex items-center justify-center select-none ${className}`}
        style={{
          width: px,
          height: px,
          borderRadius: radius,
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.04)',
        }}
        title={brand.name}
        role="img"
        aria-label={`${brand.name} logo`}
      >
        <img
          key={candidates[srcIndex]}
          src={candidates[srcIndex]}
          alt=""
          width={px}
          height={px}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={handleImgError}
          className="object-contain p-1.5"
          style={{ width: px, height: px }}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative shrink-0 overflow-hidden shadow-md flex flex-col items-center justify-center text-white select-none ${className}`}
      style={{
        width: px,
        height: px,
        borderRadius: radius,
        background: `linear-gradient(145deg, ${brand.color} 0%, ${brand.color2 || brand.color} 100%)`,
        boxShadow: `0 4px 14px ${brand.color}40`,
      }}
      title={brand.name}
      role="img"
      aria-label={`${brand.name} logo`}
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, transparent 50%)',
        }}
      />
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
