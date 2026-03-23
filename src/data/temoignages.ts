export interface Temoignage {
  id: string;
  nom: string;
  initiale: string;
  role: string;
  message: string;
  avatar: string;
  note: number;
}

export const temoignages: Temoignage[] = [
  {
    id: '1',
    nom: 'Marie K.',
    initiale: 'K.',
    role: 'Propriétaire vendeuse',
    message: 'Capital Immo Group a vendu ma maison en moins de 3 mois, alors que je cherchais depuis plus d\'un an. Leur professionnalisme et leur connaissance du marché font toute la différence. Je les recommande vivement !',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    note: 5
  },
  {
    id: '2',
    nom: 'Jean-Pierre M.',
    initiale: 'M.',
    role: 'Investisseur',
    message: 'Grâce à l\'accompagnement patrimonial de Capital Immo Group, j\'ai pu constituer un portefeuille de 5 appartements en location. Leur expertise du marché congolais est inégalée.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    note: 5
  },
  {
    id: '3',
    nom: 'Sophie N.',
    initiale: 'N.',
    role: 'Locataire',
    message: 'J\'ai trouvé l\'appartement de mes rêves grâce à leur équipe. Ils ont pris le temps de comprendre mes besoins et m\'ont proposé des biens correspondant parfaitement à mes critères.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    note: 5
  },
  {
    id: '4',
    nom: 'Patrick L.',
    initiale: 'L.',
    role: 'Propriétaire bailleur',
    message: 'La gestion locative de Capital Immo Group me permet de percevoir mes loyers sereinement. Plus besoin de me soucier des démarches administratives ou des problèmes de maintenance.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    note: 5
  },
  {
    id: '5',
    nom: 'Aminata D.',
    initiale: 'D.',
    role: 'Acheteuse première maison',
    message: 'En tant que première acheteuse, j\'avais beaucoup d\'interrogations. L\'équipe de Capital Immo Group a été patiente et pédagogue, m\'accompagnant à chaque étape de mon achat.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    note: 5
  }
];
