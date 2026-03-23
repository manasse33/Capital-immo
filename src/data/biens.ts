export interface Bien {
  id: string;
  titre: string;
  description: string;
  prix: number;
  surface: number;
  pieces: number;
  chambres: number;
  salleDeBain: number;
  etage?: number;
  type: 'maison' | 'villa' | 'appartement' | 'local' | 'terrain';
  transaction: 'vente' | 'location';
  zone: string;
  quartier: string;
  images: string[];
  reference: string;
  statut: 'disponible' | 'vendu' | 'reserve';
  enVedette: boolean;
  caracteristiques: string[];
}

export const biens: Bien[] = [
  {
    id: '1',
    titre: 'Villa Luxueuse avec Piscine',
    description: 'Magnifique villa contemporaine située dans un quartier résidentiel prestigieux de Brazzaville. Cette propriété d\'exception offre des finitions haut de gamme, de vastes espaces de vie et un jardin paysager avec piscine privée. Idéale pour une famille exigeante recherchant confort et élégance.',
    prix: 450000000,
    surface: 450,
    pieces: 8,
    chambres: 5,
    salleDeBain: 4,
    etage: 2,
    type: 'villa',
    transaction: 'vente',
    zone: 'Centre-ville',
    quartier: 'Ouenzé',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    ],
    reference: 'CIG-V-001',
    statut: 'disponible',
    enVedette: true,
    caracteristiques: ['Piscine', 'Jardin paysager', 'Garage 2 voitures', 'Climatisation', 'Sécurité 24/7', 'Cuisine équipée']
  },
  {
    id: '2',
    titre: 'Appartement Moderne Centre-Ville',
    description: 'Bel appartement rénové situé au cœur de Brazzaville, à proximité de toutes commodités. Lumineux et fonctionnel, il offre un cadre de vie idéal pour jeunes actifs ou couples. Vue dégagée sur la ville.',
    prix: 75000000,
    surface: 85,
    pieces: 3,
    chambres: 2,
    salleDeBain: 1,
    etage: 4,
    type: 'appartement',
    transaction: 'vente',
    zone: 'Centre-ville',
    quartier: 'Poto-Poto',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    ],
    reference: 'CIG-A-002',
    statut: 'disponible',
    enVedette: true,
    caracteristiques: ['Ascenseur', 'Parking', 'Balcon', 'Cuisine équipée', 'Interphone']
  },
  {
    id: '3',
    titre: 'Local Commercial Stratégique',
    description: 'Excellent emplacement pour ce local commercial situé sur une artère passante. Grande vitrine, espace modulable, parfait pour commerce de détail, restaurant ou bureau. Forte visibilité et passage garanti.',
    prix: 150000,
    surface: 120,
    pieces: 2,
    chambres: 0,
    salleDeBain: 1,
    etage: 0,
    type: 'local',
    transaction: 'location',
    zone: 'Centre-ville',
    quartier: 'Bacongo',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
    ],
    reference: 'CIG-L-003',
    statut: 'disponible',
    enVedette: true,
    caracteristiques: ['Grande vitrine', 'Fort passage', 'Parking client', 'Climatisation', 'Alarme']
  },
  {
    id: '4',
    titre: 'Maison Familiale avec Jardin',
    description: 'Charmante maison familiale dans un environnement calme et verdoyant. Parfait pour une famille avec enfants, elle dispose d\'un grand jardin arboré et d\'un espace de jeux. Proche des écoles et commerces.',
    prix: 185000000,
    surface: 200,
    pieces: 6,
    chambres: 4,
    salleDeBain: 2,
    etage: 1,
    type: 'maison',
    transaction: 'vente',
    zone: 'Périphérie',
    quartier: 'Mfilou',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
    ],
    reference: 'CIG-M-004',
    statut: 'disponible',
    enVedette: false,
    caracteristiques: ['Jardin arboré', 'Garage', 'Terrasse', 'Cuisine équipée', 'Bureau']
  },
  {
    id: '5',
    titre: 'Terrain Constructible 1000m²',
    description: 'Superbe terrain plat et viabilisé, idéal pour construction de votre maison de rêve. Situé dans un secteur en plein développement avec vue panoramique. Accès facile et voisinage agréable.',
    prix: 95000000,
    surface: 1000,
    pieces: 0,
    chambres: 0,
    salleDeBain: 0,
    type: 'terrain',
    transaction: 'vente',
    zone: 'Périphérie',
    quartier: 'Talisman',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
      'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800',
    ],
    reference: 'CIG-T-005',
    statut: 'disponible',
    enVedette: false,
    caracteristiques: ['Viabilisé', 'Terrain plat', 'Vue panoramique', 'Accès routier', 'Borné']
  },
  {
    id: '6',
    titre: 'Appartement Haut Standing',
    description: 'Superbe appartement de standing dans une résidence sécurisée avec piscine commune. Prestations de qualité, matériaux nobles, grande terrasse avec vue. Résidence calme et bien entretenue.',
    prix: 280000,
    surface: 110,
    pieces: 4,
    chambres: 3,
    salleDeBain: 2,
    etage: 3,
    type: 'appartement',
    transaction: 'location',
    zone: 'Centre-ville',
    quartier: 'Ouenzé',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    ],
    reference: 'CIG-A-006',
    statut: 'disponible',
    enVedette: true,
    caracteristiques: ['Piscine commune', 'Terrasse', 'Parking', 'Cave', 'Gardien', 'Climatisation']
  },
  {
    id: '7',
    titre: 'Villa Contemporaine avec Vue',
    description: 'Architecture moderne et épurée pour cette villa offrant une vue imprenable. Espaces ouverts, baies vitrées, matériaux contemporains. Un lieu de vie exceptionnel pour les amateurs de design.',
    prix: 380000000,
    surface: 320,
    pieces: 7,
    chambres: 4,
    salleDeBain: 3,
    etage: 2,
    type: 'villa',
    transaction: 'vente',
    zone: 'Périphérie',
    quartier: 'Montagne Sainte',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    ],
    reference: 'CIG-V-007',
    statut: 'disponible',
    enVedette: false,
    caracteristiques: ['Vue panoramique', 'Piscine à débordement', 'Domotique', 'Garage', 'Jardin suspendu']
  },
  {
    id: '8',
    titre: 'Bureau Professionnel Centre Affaires',
    description: 'Espace de bureau moderne et fonctionnel dans un immeuble de standing. Open space modulable, salles de réunion, kitchenette. Idéal pour entreprise en croissance.',
    prix: 850000,
    surface: 150,
    pieces: 4,
    chambres: 0,
    salleDeBain: 2,
    etage: 2,
    type: 'local',
    transaction: 'location',
    zone: 'Centre-ville',
    quartier: 'Centre-ville',
    images: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800',
    ],
    reference: 'CIG-B-008',
    statut: 'disponible',
    enVedette: false,
    caracteristiques: ['Open space', 'Salle de réunion', 'Climatisation', 'Fibre optique', 'Parking', 'Accès 24/7']
  },
  {
    id: '9',
    titre: 'Duplex de Charme',
    description: 'Duplex atypique avec belle hauteur sous plafond et mezzanine. Ambiance loft dans un immeuble ancien rénové. Parquet, poutres apparentes, cachet garanti.',
    prix: 95000000,
    surface: 95,
    pieces: 3,
    chambres: 2,
    salleDeBain: 1,
    etage: 3,
    type: 'appartement',
    transaction: 'vente',
    zone: 'Centre-ville',
    quartier: 'Poto-Poto',
    images: [
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800',
    ],
    reference: 'CIG-D-009',
    statut: 'disponible',
    enVedette: false,
    caracteristiques: ['Mezzanine', 'Parquet', 'Poutres apparentes', 'Cheminée', 'Cuisine ouverte']
  }
];

export const getBiensVedette = () => biens.filter(b => b.enVedette && b.statut === 'disponible');
export const getBiensByType = (type: string) => biens.filter(b => b.type === type && b.statut === 'disponible');
export const getBiensByTransaction = (transaction: string) => biens.filter(b => b.transaction === transaction && b.statut === 'disponible');
export const getBienById = (id: string) => biens.find(b => b.id === id);
export const getBiensSimilaires = (bien: Bien, limit = 3) => {
  return biens
    .filter(b => b.id !== bien.id && b.type === bien.type && b.statut === 'disponible')
    .slice(0, limit);
};

export const formatPrix = (prix: number, transaction: string) => {
  if (transaction === 'location') {
    return `${prix.toLocaleString('fr-FR')} FCFA/mois`;
  }
  if (prix >= 1000000000) {
    return `${(prix / 1000000000).toFixed(1)} Mds FCFA`;
  }
  return `${(prix / 1000000).toFixed(0)} M FCFA`;
};

export const zones = ['Toutes les zones', 'Centre-ville', 'Périphérie', 'Ouenzé', 'Poto-Poto', 'Bacongo', 'Mfilou', 'Talisman', 'Montagne Sainte'];
export const types = [
  { value: 'all', label: 'Tous les types' },
  { value: 'maison', label: 'Maison' },
  { value: 'villa', label: 'Villa' },
  { value: 'appartement', label: 'Appartement' },
  { value: 'local', label: 'Local commercial' },
  { value: 'terrain', label: 'Terrain' }
];
