export interface MembreEquipe {
  id: string;
  prenom: string;
  nom: string;
  poste: string;
  email: string;
  telephone: string;
  photo: string;
  description: string;
}

export const equipe: MembreEquipe[] = [
  {
    id: '1',
    prenom: 'Julio',
    nom: 'KIBONGUI',
    poste: 'Président Directeur Général',
    email: 'julio.kibongui@capitalimogroup.com',
    telephone: '+242 04 411 3436',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    description: 'Fondateur de Capital Immo Group, Julio KIBONGUI cumule plus de 15 ans d\'expérience dans l\'immobilier au Congo. Sa vision et son leadership ont fait de l\'agence une référence du secteur.'
  },
  {
    id: '2',
    prenom: 'Sarah',
    nom: 'MOUSSAVOU',
    poste: 'Directrice Commerciale',
    email: 'sarah.moussavou@capitalimogroup.com',
    telephone: '+242 04 411 3437',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    description: 'Experte en négociation immobilière, Sarah supervise l\'ensemble des transactions et veille à la satisfaction de chaque client.'
  },
  {
    id: '3',
    prenom: 'Marc',
    nom: 'NGOMA',
    poste: 'Responsable Gestion Locative',
    email: 'marc.ngoma@capitalimogroup.com',
    telephone: '+242 04 411 3438',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    description: 'Marc assure la gestion quotidienne des biens en location, garantissant tranquillité aux propriétaires et confort aux locataires.'
  },
  {
    id: '4',
    prenom: 'Grace',
    nom: 'MAKITA',
    poste: 'Conseillère Patrimoniale',
    email: 'grace.makita@capitalimogroup.com',
    telephone: '+242 04 411 3439',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    description: 'Spécialisée en accompagnement patrimonial, Grace aide les investisseurs à construire et optimiser leur portefeuille immobilier.'
  }
];

export const valeurs = [
  {
    titre: 'Confiance',
    description: 'La transparence et l\'honnêteté sont au cœur de chaque relation que nous établissons avec nos clients.',
    icon: 'Shield'
  },
  {
    titre: 'Proximité',
    description: 'Nous connaissons intimement le marché immobilier congolais et maintenons une relation personnalisée avec chaque client.',
    icon: 'Heart'
  },
  {
    titre: 'Excellence',
    description: 'Nous visons l\'excellence dans chaque service rendu, de la première prise de contact à la finalisation de la transaction.',
    icon: 'Award'
  },
  {
    titre: 'Transparence',
    description: 'Nos honoraires sont clairs, nos processus sont expliqués, et nous communiquons régulièrement sur l\'avancement de votre dossier.',
    icon: 'Eye'
  }
];

export const entrepriseInfo = {
  nom: 'Capital Immo Group',
  slogan: 'Plus qu\'un bien immobilier, nous trouvons le lieu où commence votre histoire.',
  description: 'Capital Immo Group est une agence immobilière de référence à Brazzaville, spécialisée dans la vente, la location et la gestion de biens immobiliers. Forte de 15 ans d\'expérience, notre équipe d\'experts accompagne particuliers, entreprises et investisseurs dans tous leurs projets immobiliers.',
  histoire: 'Fondée en 2011 par Julio KIBONGUI, Capital Immo Group est née d\'une vision : professionnaliser le secteur immobilier en République du Congo et offrir aux clients un service à la hauteur de leurs attentes. Depuis plus d\'une décennie, nous avons accompagné des centaines de familles et d\'investisseurs dans la réalisation de leurs projets immobiliers. Notre ancrage local et notre connaissance approfondie du marché nous permettent d\'offrir un service personnalisé et des conseils avisés.',
  mission: 'Accompagner nos clients avec professionnalisme et intégrité dans la réalisation de leurs projets immobiliers, en leur offrant un service personnalisé et des solutions adaptées à leurs besoins.',
  dateCreation: '2011',
  adresse: 'Rue Monseigneur Biéchy 2015, Brazzaville, République du Congo',
  telephone: '+242 04 411 3436',
  whatsapp: '+242 04 411 3436',
  email: 'contact@capital-immo-group.com',
  facebook: '@capitalimogroup01',
  facebookUrl: 'https://facebook.com/capitalimogroup01',
  horaires: {
    lundi: '08:00 - 17:00',
    mardi: '08:00 - 17:00',
    mercredi: '08:00 - 17:00',
    jeudi: '08:00 - 17:00',
    vendredi: '08:00 - 17:00',
    samedi: '09:00 - 13:00',
    dimanche: 'Fermé'
  },
  coordonnees: {
    lat: -4.2634,
    lng: 15.2429
  }
};
