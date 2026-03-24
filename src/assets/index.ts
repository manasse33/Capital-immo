/**
 * Point d'entree central pour les fichiers statiques du projet.
 *
 * Exemple d'usage :
 * 1. Ajoute ton fichier dans `src/assets/`
 * 2. Debloque ou ajoute un export ci-dessous
 * 3. Importe-le ensuite avec :
 *    `import { staticAssets } from '@/assets'`
 *    `src={staticAssets.logo}`
 */

export const staticAssets = {
  logo: new URL('./logo-navbar-white-cropped.png', import.meta.url).href,
  // logoWhite: new URL('./logo-white.svg', import.meta.url).href,
  // heroBanner: new URL('./hero-banner.jpg', import.meta.url).href,
} as const;

export type StaticAssetKey = keyof typeof staticAssets;
