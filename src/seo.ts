export type SeoMeta = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
  robots?: string;
  canonical?: string;
};

const DEFAULT_ORIGIN = 'https://capital-immo-group.com';

const DEFAULT_SEO: SeoMeta = {
  title: 'Capital Immo Group | Agence Immobilière à Brazzaville',
  description:
    'Capital Immo Group - Votre agence immobilière de confiance à Brazzaville. Vente, location, gestion locative et accompagnement patrimonial au Congo.',
  image: '/favicon/favicon-tab-512.png',
  type: 'website',
  robots: 'index, follow',
};

const ROUTE_SEO: Record<string, SeoMeta> = {
  '/': {
    title: 'Capital Immo Group | Agence Immobilière à Brazzaville',
    description:
      'Capital Immo Group - Votre agence immobilière de confiance à Brazzaville. Vente, location, gestion locative et accompagnement patrimonial au Congo.',
  },
  '/biens': {
    title: 'Biens immobiliers | Capital Immo Group',
    description:
      'Parcourez nos biens à vendre et à louer à Brazzaville et dans ses environs. Sélection rigoureuse, visites et accompagnement personnalisé.',
  },
  '/a-propos': {
    title: 'À propos | Capital Immo Group',
    description:
      'Découvrez Capital Immo Group, notre histoire, notre mission et nos valeurs au service de vos projets immobiliers au Congo.',
  },
  '/services': {
    title: 'Services immobiliers | Capital Immo Group',
    description:
      'Vente, location, gestion locative, accompagnement patrimonial et conseils sur-mesure pour vos projets immobiliers.',
  },
  '/contact': {
    title: 'Contact | Capital Immo Group',
    description:
      'Contactez Capital Immo Group pour vos projets immobiliers. Réponse rapide, conseils personnalisés et équipe dédiée à Brazzaville.',
  },
};

const trimToLength = (value: string, max = 160) => {
  const compact = value.replace(/\s+/g, ' ').trim();
  if (compact.length <= max) {
    return compact;
  }
  return `${compact.slice(0, max - 1)}…`;
};

const getOrigin = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_ORIGIN;
  }
  return window.location.origin || DEFAULT_ORIGIN;
};

const toAbsoluteUrl = (value: string, origin: string) => {
  if (!value) {
    return value;
  }
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }
  return new URL(value, origin).toString();
};

const upsertMeta = (attr: 'name' | 'property', key: string, content: string) => {
  if (!content) {
    return;
  }
  let element = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const upsertLink = (rel: string, href: string) => {
  if (!href) {
    return;
  }
  let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

const upsertJsonLd = (id: string, data: unknown) => {
  if (!data) {
    return;
  }
  let element = document.head.querySelector(
    `script[data-seo="${id}"]`
  ) as HTMLScriptElement | null;
  if (!element) {
    element = document.createElement('script');
    element.type = 'application/ld+json';
    element.setAttribute('data-seo', id);
    document.head.appendChild(element);
  }
  element.text = JSON.stringify(data);
};

export const resolveSeo = (pathname: string): SeoMeta => {
  if (pathname.startsWith('/admin')) {
    return {
      title: 'Administration | Capital Immo Group',
      description: 'Espace administration sécurisé.',
      robots: 'noindex, nofollow',
      path: pathname,
    };
  }

  if (pathname.startsWith('/biens/')) {
    return {
      title: 'Bien immobilier | Capital Immo Group',
      description: 'Découvrez ce bien immobilier proposé par Capital Immo Group.',
      path: pathname,
    };
  }

  return {
    ...DEFAULT_SEO,
    ...ROUTE_SEO[pathname],
    path: pathname,
  };
};

export const applySeo = (meta: SeoMeta) => {
  if (typeof document === 'undefined') {
    return;
  }

  const origin = getOrigin();
  const merged: SeoMeta = {
    ...DEFAULT_SEO,
    ...meta,
  };

  const path = merged.path ?? '/';
  const url = merged.canonical ?? new URL(path, origin).toString();
  const image = toAbsoluteUrl(merged.image ?? DEFAULT_SEO.image ?? '', origin);
  const title = merged.title ?? DEFAULT_SEO.title;
  const description = trimToLength(merged.description ?? DEFAULT_SEO.description ?? '');
  const type = merged.type ?? DEFAULT_SEO.type ?? 'website';
  const robots = merged.robots ?? DEFAULT_SEO.robots ?? 'index, follow';

  document.title = title;
  upsertMeta('name', 'description', description);
  upsertMeta('name', 'robots', robots);

  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:type', type);
  upsertMeta('property', 'og:url', url);
  upsertMeta('property', 'og:image', image);
  upsertMeta('property', 'og:site_name', 'Capital Immo Group');
  upsertMeta('property', 'og:locale', 'fr_CG');

  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);
  upsertMeta('name', 'twitter:image', image);

  upsertLink('canonical', url);
};

export const applyJsonLd = (id: string, data: unknown) => {
  if (typeof document === 'undefined') {
    return;
  }
  upsertJsonLd(id, data);
};

export const buildBienSeo = (params: {
  titre: string;
  description: string;
  image?: string;
  path?: string;
  reference?: string;
}) => {
  const title = params.reference
    ? `${params.titre} (Réf: ${params.reference}) | Capital Immo Group`
    : `${params.titre} | Capital Immo Group`;

  return {
    title,
    description: params.description,
    image: params.image,
    path: params.path,
  } as SeoMeta;
};
