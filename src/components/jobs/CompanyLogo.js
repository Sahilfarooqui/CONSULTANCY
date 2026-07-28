import React, { useMemo, useState } from 'react';
import { getCompanyBrand } from '../../utils/companyBranding';

/**
 * LinkedIn-style company logo with multi-source fallback.
 */
const CompanyLogo = ({ company, size = 56, className = '' }) => {
  const brand = useMemo(() => getCompanyBrand(company), [company]);
  const [idx, setIdx] = useState(0);
  const candidates = brand.logoCandidates || [brand.logoUrl];
  const src = candidates[Math.min(idx, candidates.length - 1)];
  const px = typeof size === 'number' ? size : 56;

  const onError = () => {
    if (idx < candidates.length - 1) setIdx((i) => i + 1);
  };

  return (
    <div
      className={`relative shrink-0 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm flex items-center justify-center ${className}`}
      style={{ width: px, height: px }}
      title={brand.name}
    >
      <img
        src={src}
        alt={`${brand.name} logo`}
        width={px}
        height={px}
        className="w-full h-full object-contain p-1.5"
        onError={onError}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export default CompanyLogo;
