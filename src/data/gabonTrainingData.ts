import heroTerrainImg from '../assets/images/hero_terrain_main_1790510855443.jpg';
import heroAtmosphereImg from '../assets/images/hero_atmosphere_bg_1790510868564.jpg';
import terrainAncrageImg from '../assets/images/terrain_ancrage_cemac_1790510881008.jpg';
import formationAtelierImg from '../assets/images/formation_atelier_qhse_1790510893522.jpg';

export const PROJECT_ASSETS = {
  heroTerrainMain: heroTerrainImg,
  heroAtmosphereBg: heroAtmosphereImg,
  terrainAncrageCemac: terrainAncrageImg,
  formationAtelierQhse: formationAtelierImg,
};

/**
 * SECTION 10 — CONTENU VALIDÉ PAR LE PORTEUR DU PROJET POUR LA BANDE « NOS PARTENAIRES »
 * Affichage en texte uniquement (aucun logo). BI Pipelines inclus conformément à la décision validée.
 */
export const VALIDATED_PARTNERS: string[] = [
  'GERT Consulting',
  'QHSE Academy',
  'SmartTec',
  'NeamSarl',
  'Saphir Conseil',
  'BI Pipelines',
  'MD Services',
];

/**
 * SECTION 12 — SECTION ÉQUIPE (HIÉRARCHIE STRICTE : [ FORMATEUR ] [ FONDATEUR / DG ] [ FORMATEUR ])
 */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  positionOrder: 'left' | 'center' | 'right';
  isFounder: boolean;
  domains: string;
  summary: string;
  certificationNote: string;
  expectedAssetPath: string;
  initials: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'diagbouga-emmanuel',
    name: 'DIAGBOUGA Emmanuel',
    role: 'Formateur',
    positionOrder: 'left',
    isFounder: false,
    domains: 'QHSE · Sécurité Opérationnelle · Interventions Site',
    summary:
      'Spécialiste des protocoles de prévention des risques industriels, de la conformité terrain et des audits opérationnels en environnement critique.',
    certificationNote: 'Intervenant habilité · Missions Intra & Inter-entreprises',
    expectedAssetPath: 'design/assets/equipe/diagbouga-emmanuel.webp',
    initials: 'DE',
  },
  {
    id: 'akoure-loic',
    name: 'AKOURE Loïc',
    role: 'Fondateur et Formateur des Formateurs',
    positionOrder: 'center',
    isFounder: true,
    domains: 'Direction Générale · Ingénierie Pédagogique · Leadership Industriel',
    summary:
      'Fondateur de Gabon Training. Garant de l’exigence méthodologique, de l’ancrage industriel en zone CEMAC et de la certification des formateurs sur le terrain.',
    certificationNote: 'Direction Générale · Architecture des Référentiels CEMAC',
    expectedAssetPath: 'design/assets/equipe/akoure-loic.webp',
    initials: 'AL',
  },
  {
    id: 'wassim-mansour',
    name: 'Wassim Mansour',
    role: 'Formateur',
    positionOrder: 'right',
    isFounder: false,
    domains: 'Ingénierie Technique · Procédés Industriels · Conformité',
    summary:
      'Formateur expert dédié à la maîtrise des installations techniques, au contrôle opérationnel et au transfert de compétences vers les équipes de maintenance.',
    certificationNote: 'Intervenant habilité · Référentiels Internationaux',
    expectedAssetPath: 'design/assets/equipe/wassim-mansour.webp',
    initials: 'WM',
  },
];

export interface TrainingProgram {
  code: string;
  title: string;
  pole: string;
  duration: string;
  modality: string;
  targetAudience: string;
  location: string;
  summary: string;
  objectives: string[];
  complianceStandard: string;
}

export const TRAINING_POLES = [
  'Tous les pôles',
  'QHSE & Sécurité Industrielle',
  'Pétrole, Gaz & Pipelines',
  'Génie Électrique & Instrumentation',
  'Manutention, Levage & CACES',
  'Maintenance & Mécanique',
  'Management & Audit Opérationnel',
] as const;

export const TRAINING_CATALOGUE: TrainingProgram[] = [
  {
    code: 'GT-QHSE-01',
    title: 'Supervision QHSE & Prévention des Risques sur Sites Industriels',
    pole: 'QHSE & Sécurité Industrielle',
    duration: '5 jours (35h)',
    modality: 'Présentiel chantier / Intra & Inter',
    targetAudience: 'Superviseurs HSE, chefs de chantier, responsables d’exploitation',
    location: 'Libreville · Port-Gentil · Sur site CEMAC',
    summary:
      'Maîtrise opérationnelle des permis de travail, consignations LOTO, analyses de risques (JSA/APR) et gestion des situations d’urgence sur installations classées.',
    objectives: [
      'Auditer la conformité sécurité d’une unité de production ou de chantier',
      'Déployer le système de Permis de Travail et de consignation énergétique',
      'Conduire un arbre des causes après incident ou presqu’accident',
    ],
    complianceStandard: 'ISO 45001 · ISO 14001 · Référentiels Pétroliers',
  },
  {
    code: 'GT-PGP-02',
    title: 'Intégrité des Pipelines, Robinetterie & Exploitation Pétrolière',
    pole: 'Pétrole, Gaz & Pipelines',
    duration: '5 jours (35h)',
    modality: 'Présentiel technique / Sur site',
    targetAudience: 'Ingénieurs d’exploitation, techniciens pipelines, inspecteurs',
    location: 'Port-Gentil · Libreville · Bassin Côtier',
    summary:
      'Inspection, suivi d’intégrité mécanique, prévention de la corrosion et protocoles d’épreuve hydraulique des réseaux de transport d’hydrocarbures.',
    objectives: [
      'Identifier les mécanismes de dégradation et de corrosion interne/externe',
      'Appliquer les procédures de contrôle non destructif et de suivi de ligne',
      'Sécuriser les opérations de vannage et de raclage en exploitation',
    ],
    complianceStandard: 'ASME B31.4 / B31.8 · API 1160',
  },
  {
    code: 'GT-ELEC-03',
    title: 'Habilitation Électrique H0/B0, B1V, B2V, BC, BR & Atmosphères ATEX',
    pole: 'Génie Électrique & Instrumentation',
    duration: '3 à 4 jours (21h–28h)',
    modality: 'Théorie + Bancs d’essais pratiques',
    targetAudience: 'Électriciens industriels, instrumentistes, électromécaniciens',
    location: 'Libreville · Port-Gentil · Intra-entreprise',
    summary:
      'Exécution sécurisée des travaux d’ordre électrique et d’instrumentation en basse et haute tension, ainsi qu’en zones à risque d’explosion (ATEX 0, 1, 2).',
    objectives: [
      'Exécuter une consignation électrique complète en sécurité selon NF C 18-510',
      'Intervenir sur des armoires et équipements en zone classée ATEX',
      'Vérifier les protections différentielles, mises à la terre et continuités',
    ],
    complianceStandard: 'NF C 18-510 · Directive ATEX / IECEx',
  },
  {
    code: 'GT-LEV-04',
    title: 'Conduite Sécurisée d’Engins, Grues Auxiliaires, Ponts Roulants & Élingage',
    pole: 'Manutention, Levage & CACES',
    duration: '4 jours (28h)',
    modality: 'Pratique terrain sur aire d’évolution',
    targetAudience: 'Conducteurs d’engins, grutiers, chefs de manœuvre, élingueurs',
    location: 'Libreville · Port-Gentil · Sites miniers & portuaires',
    summary:
      'Validation des aptitudes pratiques à la conduite d’engins de manutention, calcul des charges d’élingage, gestes de commandement et stabilité des charges.',
    objectives: [
      'Réaliser les vérifications journalières et la prise de poste d’un engin',
      'Sélectionner les accessoires de levage selon le centre de gravité et l’angle',
      'Exécuter les manœuvres de précision en zone portuaire ou industrielle encombrée',
    ],
    complianceStandard: 'Référentiels R489 / R484 / R490',
  },
  {
    code: 'GT-MAINT-05',
    title: 'Maintenance Préventive, Alignement Laser & Diagnostic Vibratoire',
    pole: 'Maintenance & Mécanique',
    duration: '5 jours (35h)',
    modality: 'Atelier mécanique & études de cas réels',
    targetAudience: 'Techniciens de maintenance, mécaniciens machines tournantes',
    location: 'Libreville · Port-Gentil · Sites industriels',
    summary:
      'Fiabilisation des machines tournantes (pompes, compresseurs, moteurs), plans de graissage, lignage d’arbres et réduction des arrêts non planifiés.',
    objectives: [
      'Structurer un plan de maintenance préventive et conditionnelle (AMDEC)',
      'Interpréter les défauts de balourd, délignage et jeux de roulements',
      'Optimiser le taux de disponibilité des équipements critiques',
    ],
    complianceStandard: 'ISO 55000 · Normes ISO 10816',
  },
  {
    code: 'GT-MGT-06',
    title: 'Ingénierie Pédagogique : Formation de Formateurs Internes & Tuteurs Terrain',
    pole: 'Management & Audit Opérationnel',
    duration: '4 jours (28h)',
    modality: 'Présentiel intensif & mises en situation',
    targetAudience: 'Experts techniques, ingénieurs seniors, coordinateurs formation',
    location: 'Libreville · Zone CEMAC',
    summary:
      'Structurer, animer et évaluer des séquences de formation technique pour transmettre durablement les savoir-faire critiques au sein des équipes opérationnelles.',
    objectives: [
      'Concevoir un déroulé pédagogique orienté compétences opérationnelles',
      'Animer des séquences pratiques sur poste de travail et en salle',
      'Construire des grilles d’évaluation d’acquisition des compétences terrain',
    ],
    complianceStandard: 'Ingénierie des Compétences · ISO 29993',
  },
];

export interface CemacNode {
  id: string;
  country: string;
  city: string;
  role: string;
  status: 'Siège & Pôle Principal' | 'Déploiement Régional CEMAC';
  coordinates: { x: number; y: number };
}

export const CEMAC_NODES: CemacNode[] = [
  {
    id: 'gabon-lbv',
    country: 'Gabon',
    city: 'Libreville & Port-Gentil',
    role: 'Direction Générale, Centre de Formation & Interventions Onshore/Offshore',
    status: 'Siège & Pôle Principal',
    coordinates: { x: 34, y: 66 },
  },
  {
    id: 'cameroun-dla',
    country: 'Cameroun',
    city: 'Douala & Kribi',
    role: 'Missions Intra-entreprises Industrialisation & Logistique Portuaire',
    status: 'Déploiement Régional CEMAC',
    coordinates: { x: 35, y: 47 },
  },
  {
    id: 'congo-pnr',
    country: 'République du Congo',
    city: 'Pointe-Noire & Brazzaville',
    role: 'Formations Pétrole, Gaz, QHSE & Maintenance des Installations',
    status: 'Déploiement Régional CEMAC',
    coordinates: { x: 46, y: 78 },
  },
  {
    id: 'guinee-eq',
    country: 'Guinée Équatoriale',
    city: 'Malabo & Bata',
    role: 'Programmes Techniques Énergie & Sécurité Opérationnelle',
    status: 'Déploiement Régional CEMAC',
    coordinates: { x: 28, y: 57 },
  },
  {
    id: 'tchad-ndj',
    country: 'Tchad',
    city: 'N’Djamena',
    role: 'Accompagnement Ingénierie, Pipelines & Conformité HSE',
    status: 'Déploiement Régional CEMAC',
    coordinates: { x: 58, y: 22 },
  },
  {
    id: 'rca-bgf',
    country: 'République Centrafricaine',
    city: 'Bangui',
    role: 'Renforcement des Compétences Techniques & Management',
    status: 'Déploiement Régional CEMAC',
    coordinates: { x: 68, y: 48 },
  },
];
