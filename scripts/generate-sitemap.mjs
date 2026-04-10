import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const readEnvFile = async () => {
  try {
    return await fs.readFile(path.join(root, '.env'), 'utf8');
  } catch {
    return '';
  }
};

const parseEnv = (raw) => {
  const entries = raw.split(/\r?\n/);
  const result = {};
  for (const line of entries) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) {
      continue;
    }
    const [key, ...rest] = trimmed.split('=');
    result[key] = rest.join('=').trim();
  }
  return result;
};

const envRaw = await readEnvFile();
const env = parseEnv(envRaw);

const SITE_ORIGIN = (process.env.SITE_ORIGIN || env.SITE_ORIGIN || 'https://capital-immo-group.com').replace(/\/+$/, '');
const API_BASE_URL = (process.env.VITE_API_BASE_URL || env.VITE_API_BASE_URL || '').replace(/\/+$/, '');

if (!API_BASE_URL) {
  console.error('VITE_API_BASE_URL manquant. Ajoute-le dans app/.env ou passe-le en variable d\'environnement.');
  process.exit(1);
}

const staticRoutes = ['/', '/biens', '/a-propos', '/services', '/contact'];

const fetchBiens = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/biens?per_page=1000`);
    if (!response.ok) {
      console.warn('Impossible de récupérer les biens:', response.status, response.statusText);
      return [];
    }
    const data = await response.json();
    if (Array.isArray(data)) {
      return data;
    }
    if (Array.isArray(data?.data)) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.warn('Erreur lors de la récupération des biens:', error);
    return [];
  }
};

const biens = await fetchBiens();

const toLoc = (route) => `${SITE_ORIGIN}${route}`;
const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const urls = [
  ...staticRoutes.map((route) => ({
    loc: toLoc(route),
    changefreq: route === '/biens' ? 'daily' : 'weekly',
    priority: route === '/' ? '1.0' : route === '/biens' ? '0.9' : '0.7',
  })),
  ...biens.map((bien) => ({
    loc: toLoc(`/biens/${bien.slug || bien.id}`),
    lastmod: bien.updated_at ? new Date(bien.updated_at).toISOString() : undefined,
    changefreq: 'weekly',
    priority: '0.8',
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map((item) => {
    const lastmod = item.lastmod ? `\n    <lastmod>${escapeXml(item.lastmod)}</lastmod>` : '';
    return `  <url>\n    <loc>${escapeXml(item.loc)}</loc>${lastmod}\n    <changefreq>${item.changefreq}</changefreq>\n    <priority>${item.priority}</priority>\n  </url>`;
  })
  .join('\n')}\n</urlset>\n`;

await fs.mkdir(path.join(root, 'public'), { recursive: true });
await fs.writeFile(path.join(root, 'public', 'sitemap.xml'), xml, 'utf8');

console.log(`Sitemap généré avec ${urls.length} URLs.`);
