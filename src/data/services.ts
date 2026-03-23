export interface Service {
  id: string;
  titre: string;
  description: string;
  descriptionLongue: string;
  icon: string;
  image: string;
  avantages: string[];
  cta: string;
}

export const services: Service[] = [
  {
    id: 'vente',
    titre: 'Vente de Biens',
    description: 'Achetez ou vendez votre bien en toute sérénité avec notre accompagnement expert.',
    descriptionLongue: 'Capital Immo Group vous accompagne dans toutes les étapes de votre projet de vente immobilière. De l\'estimation précise de votre bien à la signature finale, notre équipe d\'experts met son savoir-faire à votre service. Nous disposons d\'un réseau qualifié d\'acheteurs potentiels et utilisons les meilleurs outils marketing pour donner une visibilité maximale à votre propriété. Que vous vendiez une maison familiale, un appartement, une villa de luxe ou un local commercial, nous vous garantissons un service personnalisé et des résultats optimaux.',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    avantages: [
      'Estimation gratuite et réaliste du marché',
      'Visibilité maximale sur nos canaux de diffusion',
      'Accompagnement juridique complet',
      'Négociation experte pour obtenir le meilleur prix',
      'Suivi personnalisé tout au long de la transaction'
    ],
    cta: 'Estimer mon bien'
  },
  {
    id: 'location',
    titre: 'Location Résidentielle & Commerciale',
    description: 'Trouvez le bien locatif parfait ou confiez-nous la location de votre propriété.',
    descriptionLongue: 'Notre service de location couvre l\'ensemble du marché résidentiel et commercial de Brazzaville et ses environs. Pour les locataires, nous sélectionnons des biens de qualité correspondant à vos critères et votre budget. Pour les propriétaires, nous assurons une gestion complète du processus de location : sélection rigoureuse des candidats, rédaction des baux, états des lieux et suivi tout au long du contrat. Notre objectif : créer des relations locataires-propriétaires durables et harmonieuses.',
    icon: 'Key',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    avantages: [
      'Large choix de biens dans tous les quartiers',
      'Sélection rigoureuse des locataires',
      'Baux conformes à la législation en vigueur',
      'États des lieux détaillés et photographiés',
      'Assistance en cas de litige'
    ],
    cta: 'Voir les biens à louer'
  },
  {
    id: 'gestion',
    titre: 'Gestion Locative',
    description: 'Déléguez la gestion complète de votre bien immobilier à des professionnels.',
    descriptionLongue: 'Notre service de gestion locative vous libère de toutes les contraintes liées à la location de votre bien. Nous nous occupons de tout : recherche et sélection des locataires, encaissement des loyers, gestion des impayés, entretien courant et travaux, relations avec le locataire, régularisation des charges. Vous percevez votre revenu locatif en toute tranquillité, sans aucun souci de gestion au quotidien. Un reporting régulier vous tient informé de la situation de votre investissement.',
    icon: 'Building2',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    avantages: [
      'Encaissement garanti des loyers',
      'Gestion complète des démarches administratives',
      'Entretien et maintenance du bien',
      'Relation locataire prise en charge',
      'Reporting mensuel détaillé'
    ],
    cta: 'En savoir plus'
  },
  {
    id: 'patrimoine',
    titre: 'Accompagnement Patrimonial',
    description: 'Construisez et faites fructifier votre patrimoine immobilier avec nos conseils.',
    descriptionLongue: 'L\'accompagnement patrimonial de Capital Immo Group s\'adresse aux investisseurs souhaitant développer leur patrimoine immobilier au Congo. Nos conseillers analysent votre situation personnelle et financière pour vous proposer des stratégies d\'investissement adaptées à vos objectifs. Nous vous aidons à identifier les opportunités les plus rentables, à structurer vos acquisitions et à optimiser la gestion de votre portefeuille. Que vous soyez un investisseur débutant ou expérimenté, nous vous apportons notre expertise du marché congolais.',
    icon: 'TrendingUp',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    avantages: [
      'Analyse personnalisée de votre situation',
      'Identification des meilleures opportunités',
      'Stratégie d\'investissement sur mesure',
      'Optimisation fiscale de vos acquisitions',
      'Suivi et réévaluation régulière'
    ],
    cta: 'Prendre rendez-vous'
  }
];

export const chiffresCles = [
  { valeur: 350, suffixe: '+', label: 'Biens vendus', icon: 'FileCheck' },
  { valeur: 500, suffixe: '+', label: 'Clients satisfaits', icon: 'Users' },
  { valeur: 15, suffixe: '', label: 'Années d\'expérience', icon: 'TrendingUp' },
  { valeur: 120, suffixe: '+', label: 'Biens disponibles', icon: 'Home' }
];
