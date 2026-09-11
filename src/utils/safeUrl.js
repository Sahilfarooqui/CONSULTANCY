/**
 * Allow only absolute http(s) URLs — blocks javascript:, data:, and protocol-relative tricks.
 */
export function safeHttpUrl(raw, { maxLength = 2048 } = {}) {
  if (raw == null) return null;
  const s = String(raw).trim();
  if (!s || s.length > maxLength) return null;
  try {
    const u = new URL(s);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    return u.toString();
  } catch {
    return null;
  }
}

/** Clamp free-text query params used for client-side filtering only. */
export function sanitizeSearchQuery(raw, { maxLength = 120 } = {}) {
  if (raw == null) return '';
  return String(raw).replace(/[\u0000-\u001F\u007F]/g, '').slice(0, maxLength);
}
