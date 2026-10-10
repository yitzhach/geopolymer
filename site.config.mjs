// Temporary canonical origin until the owner selects a custom domain.
// Set SITE_ORIGIN in Cloudflare build variables when the domain is attached.
export const siteOrigin = new URL(process.env.SITE_ORIGIN || 'https://geopolymer.bobdylan2000.workers.dev').origin;
export const contentUpdated = '2026-10-10';
