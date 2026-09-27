import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { PROJECT_ASSETS } from '../data/gabonTrainingData';
import { HeroParallaxOffsets } from '../utils/useTerrainMotion';

interface ProofAndMapSectionProps {
  parallax: HeroParallaxOffsets;
  onConsultClick?: () => void;
}

interface DynamicMetricItem {
  id: string;
  target: number;
  formatType: 'percent' | 'thousands' | 'integer' | 'plus';
  label: string;
}

const DYNAMIC_METRICS: DynamicMetricItem[] = [
  {
    id: 'succes',
    target: 100,
    formatType: 'percent',
    label: 'Succès des projets',
  },
  {
    id: 'eleves',
    target: 3000,
    formatType: 'thousands',
    label: 'Elèves actuel',
  },
  {
    id: 'certificats',
    target: 78,
    formatType: 'integer',
    label: 'Certificat délivrer',
  },
  {
    id: 'equipe',
    target: 35,
    formatType: 'plus',
    label: 'Equipe professionelle',
  },
];

/**
 * Les 9 capitales provinciales du Gabon ordonnées pour que la liste déroulante
 * s'arrête exactement au centre sur PORT-GENTIL (index 4), avec 4 capitales au-dessus
 * et 4 capitales en dessous en gris légèrement flouté mais lisible.
 */
interface GabonCapital {
  name: string;
  province: string;
  code: string;
  isEpicenter?: boolean;
}

const GABON_NINE_CAPITALS: GabonCapital[] = [
  { name: 'Oyem', province: 'Woleu-Ntem', code: 'G9' },
  { name: 'Makokou', province: 'Ogooué-Ivindo', code: 'G6' },
  { name: 'Lambaréné', province: 'Moyen-Ogooué', code: 'G3' },
  { name: 'Libreville', province: 'Estuaire', code: 'G1' },
  {
    name: 'Port-Gentil',
    province: 'Ogooué-Maritime · Épicentre',
    code: 'G8',
    isEpicenter: true,
  },
  { name: 'Mouila', province: 'Ngounié', code: 'G4' },
  { name: 'Koulamoutou', province: 'Ogooué-Lolo', code: 'G7' },
  { name: 'Franceville', province: 'Haut-Ogooué', code: 'G2' },
  { name: 'Tchibanga', province: 'Nyanga', code: 'G5' },
];

const METHOD_STEPS = [
  {
    step: '01',
    title: 'Diagnostic & Cadrage Terrain',
    description:
      'Analyse des installations, des risques spécifiques du site et des référentiels internes de l’opérateur.',
    tag: 'AUDIT PRÉALABLE',
  },
  {
    step: '02',
    title: 'Ingénierie Pédagogique Ciblée',
    description:
      'Adaptation des modules aux équipements réels et aux procédures d’exploitation en vigueur.',
    tag: 'SUR-MESURE',
  },
  {
    step: '03',
    title: 'Transmission & Pratique sur Site',
    description:
      'Mises en situation opérationnelles dirigées par des formateurs praticiens à Port-Gentil, Libreville ou sur chantier.',
    tag: 'INTERVENTION',
  },
  {
    step: '04',
    title: 'Évaluation & Habilitation',
    description:
      'Contrôle rigoureux des acquis théoriques et pratiques, délivrance des attestations et suivi employeur.',
    tag: 'CONFORMITÉ',
  },
];

function formatMetricValue(
  item: DynamicMetricItem,
  currentVal: number,
  isComplete: boolean
): string {
  if (item.formatType === 'percent') {
    return `${Math.round(currentVal)}%`;
  }
  if (item.formatType === 'thousands') {
    if (isComplete || currentVal >= 2950) {
      return '3k+';
    }
    if (currentVal < 1000) {
      return `${Math.round(currentVal)}`;
    }
    const kVal = (currentVal / 1000).toFixed(1).replace('.0', '');
    return `${kVal}k+`;
  }
  if (item.formatType === 'plus') {
    return `${Math.round(currentVal)}+`;
  }
  return `${Math.round(currentVal)}`;
}

export const ProofAndMapSection: React.FC<ProofAndMapSectionProps> = ({
  parallax,
  onConsultClick,
}) => {
  // =========================================================================
  // ÉTAT & ANIMATION DU COMPTEUR DES 4 MÉTRIQUES (100%, 3k+, 78, 35+)
  // =========================================================================
  const metricsRef = useRef<HTMLDivElement | null>(null);
  const metricsAnimatedRef = useRef<boolean>(false);
  const metricsRafRef = useRef<number | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const runMetricsCountUp = useCallback(() => {
    if (metricsRafRef.current !== null) {
      window.cancelAnimationFrame(metricsRafRef.current);
    }

    if (parallax.isReducedMotion) {
      setProgress(1);
      return;
    }

    setProgress(0);
    const duration = 2200;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Courbe easeOutExpo fluide
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setProgress(eased);

      if (t < 1) {
        metricsRafRef.current = window.requestAnimationFrame(tick);
      } else {
        setProgress(1);
        metricsRafRef.current = null;
      }
    };

    metricsRafRef.current = window.requestAnimationFrame(tick);
  }, [parallax.isReducedMotion]);

  useEffect(() => {
    if (parallax.isReducedMotion) {
      setProgress(1);
      return;
    }

    const el = metricsRef.current;
    if (!el) return;

    const triggerIfVisible = () => {
      if (metricsAnimatedRef.current) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        metricsAnimatedRef.current = true;
        runMetricsCountUp();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !metricsAnimatedRef.current) {
            metricsAnimatedRef.current = true;
            runMetricsCountUp();
          }
        });
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    window.addEventListener('scroll', triggerIfVisible, { passive: true });
    // Vérification immédiate au montage
    const initTimer = window.setTimeout(triggerIfVisible, 150);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', triggerIfVisible);
      window.clearTimeout(initTimer);
      if (metricsRafRef.current !== null) {
        window.cancelAnimationFrame(metricsRafRef.current);
      }
    };
  }, [parallax.isReducedMotion, runMetricsCountUp]);

  // =========================================================================
  // ÉTAT & ANIMATION DE LA LISTE DÉROULANTE DES 9 CAPITALES DU GABON
  // Défile à travers les capitales puis s'arrête sur PORT-GENTIL (index 4)
  // qui s'illumine en rouge pendant que les 8 autres restent en gris légèrement flouté.
  // =========================================================================
  const epicenterRef = useRef<HTMLDivElement | null>(null);
  const epicenterAnimatedRef = useRef<boolean>(false);
  const epicenterRafRef = useRef<number | null>(null);
  // scrollStep va de 0 (début du rouleau) jusqu'à 18 (arrêt sur Port-Gentil)
  const TOTAL_ROLL_STEPS = 18;
  const [rollPosition, setRollPosition] = useState<number>(TOTAL_ROLL_STEPS);
  const [isLockedOnPortGentil, setIsLockedOnPortGentil] = useState<boolean>(true);

  const runCapitalsRoll = useCallback(() => {
    if (epicenterRafRef.current !== null) {
      window.cancelAnimationFrame(epicenterRafRef.current);
    }

    if (parallax.isReducedMotion) {
      setRollPosition(TOTAL_ROLL_STEPS);
      setIsLockedOnPortGentil(true);
      return;
    }

    setIsLockedOnPortGentil(false);
    setRollPosition(0);
    const duration = 2400; // 2.4s de défilement cinétique avant verrouillage sur Port-Gentil
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Décélération progressive type roue crantée / tambour (easeOutQuart)
      const eased = 1 - Math.pow(1 - t, 4);
      const currentStep = eased * TOTAL_ROLL_STEPS;
      setRollPosition(currentStep);

      if (t < 1) {
        epicenterRafRef.current = window.requestAnimationFrame(tick);
      } else {
        setRollPosition(TOTAL_ROLL_STEPS);
        setIsLockedOnPortGentil(true);
        epicenterRafRef.current = null;
      }
    };

    epicenterRafRef.current = window.requestAnimationFrame(tick);
  }, [parallax.isReducedMotion]);

  useEffect(() => {
    if (parallax.isReducedMotion) {
      setRollPosition(TOTAL_ROLL_STEPS);
      setIsLockedOnPortGentil(true);
      return;
    }

    const el = epicenterRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !epicenterAnimatedRef.current) {
            epicenterAnimatedRef.current = true;
            runCapitalsRoll();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (epicenterRafRef.current !== null) {
        window.cancelAnimationFrame(epicenterRafRef.current);
      }
    };
  }, [parallax.isReducedMotion, runCapitalsRoll]);

  const handleConsult = () => {
    if (onConsultClick) {
      onConsultClick();
      return;
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({
        behavior: parallax.isReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  const compassTicks = Array.from({ length: 72 }, (_, i) => i * 5);

  // Calcul du décalage pendant le défilement avant l'arrêt sur Port-Gentil
  const remainingSteps = TOTAL_ROLL_STEPS - rollPosition;
  const activeHighlightIdx =
    isLockedOnPortGentil
      ? 4
      : (4 + Math.round(remainingSteps)) % GABON_NINE_CAPITALS.length;

  return (
    <section
      id="ancrage"
      aria-label="Chiffres clés, méthodologie et présence en Afrique Centrale"
      className="relative border-b border-[#CBD5E1] bg-white"
    >
      {/* =====================================================================
          1. BANDEAU DES 4 MÉTRIQUES DYNAMIQUES (100%, 3k+, 78, 35+)
          Fond clair avec trame de carte du monde en pointillés + Compteurs animés
         ===================================================================== */}
      <div
        ref={metricsRef}
        onClick={runMetricsCountUp}
        title="Cliquer pour relancer l'animation des compteurs"
        className="relative cursor-pointer overflow-hidden border-b border-[#E2E8F0] bg-[#F7F8FA] py-14 sm:py-20"
      >
        {/* Filigrane de carte du monde en pointillés */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-60"
        >
          <svg
            viewBox="0 0 900 260"
            className="h-full w-full max-w-[1000px] object-contain"
            fill="none"
          >
            <defs>
              <pattern
                id="worldDotsPattern"
                x="0"
                y="0"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2.5" cy="2.5" r="1.6" fill="#DCE2EC" />
              </pattern>
            </defs>
            {/* Amériques */}
            <path
              d="M160,30 L255,28 L275,78 L240,115 L268,145 L298,185 L272,240 L245,220 L232,165 L195,110 L155,65 Z"
              fill="url(#worldDotsPattern)"
            />
            {/* Europe & Afrique */}
            <path
              d="M405,25 L515,22 L535,68 L555,115 L525,225 L475,230 L452,155 L402,132 L392,85 Z"
              fill="url(#worldDotsPattern)"
            />
            {/* Asie & Océanie */}
            <path
              d="M520,25 L745,32 L775,95 L715,158 L645,148 L585,125 L540,75 Z M695,180 L765,182 L770,225 L700,222 Z"
              fill="url(#worldDotsPattern)"
            />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-y-10 gap-x-6 md:grid-cols-4 md:gap-8 text-center">
            {DYNAMIC_METRICS.map((item) => {
              const currentVal = item.target * progress;
              const isComplete = progress >= 0.995;
              const formatted = formatMetricValue(item, currentVal, isComplete);

              return (
                <div
                  key={item.id}
                  className="flex flex-col items-center justify-center px-2"
                >
                  <div
                    aria-live="polite"
                    className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold leading-none tracking-[-0.03em] text-[#C82A1E] tabular-nums"
                  >
                    {formatted}
                  </div>
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-[18px] font-bold tracking-[-0.01em] text-[#0A1E46]">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. MÉTHODE OPÉRATIONNELLE & GRAND MOMENT TERRAIN
         ===================================================================== */}
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Colonne Gauche (5 cols) : Grande Photographie Terrain avec Reveal par Masque */}
          <div className="gt-reveal-mask group lg:col-span-5 flex flex-col justify-between rounded-[12px] border border-[#CBD5E1] bg-[#0A0F1D] overflow-hidden">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#001D5B]">
              <img
                src={PROJECT_ASSETS.terrainAncrageCemac}
                alt="Plateau technique et atelier de formation industrielle Gabon Training à Port-Gentil"
                referrerPolicy="no-referrer"
                style={{
                  transform: `translate3d(0, ${parallax.plan3PhotoInnerY * 0.5}px, 0)`,
                }}
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-[#0A0F1D]/25 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
              <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tech text-white/90">
                <span>TERRAIN · PORT-GENTIL & LIBREVILLE</span>
                <span className="text-[#8CFA96]">MISE EN SITUATION RÉELLE</span>
              </div>
            </div>

            <div className="p-6 sm:p-7 text-white">
              <div className="text-xs font-mono-tech tracking-[0.05em] text-[#B4C5FF]">
                TRANSMISSION & PRATIQUE OPÉRATIONNELLE
              </div>
              <h3 className="mt-2 text-lg sm:text-xl font-bold text-white">
                Du référentiel normatif au geste métier sur installation réelle
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#DBE1FF]/85">
                Nos modules combinent l’étude rigoureuse des normes (ISO, NF C
                18-510, ASME, API, CACES) et la mise en situation directe sur
                équipements industriels afin de garantir une applicabilité
                immédiate dès le retour sur poste.
              </p>
            </div>
          </div>

          {/* Colonne Droite (7 cols) : Méthodologie en 4 étapes avec ligne Navy → Rouge */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-[12px] border border-[#CBD5E1] bg-[#F8FAFC] p-6 sm:p-8">
            <div>
              <div className="gt-reveal-block flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.06em] text-[#001D5B]">
                    <span className="h-2 w-2 bg-[#E30000]" aria-hidden="true" />
                    <span>MÉTHODOLOGIE D’INTERVENTION</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-[-0.02em] text-[#0A0F1D]">
                    Du diagnostic de site à la validation des compétences
                  </h3>
                </div>
                <span className="font-mono-tech text-xs font-bold text-[#001D5B]">
                  PROTOCOLE EN 04 ÉTAPES
                </span>
              </div>

              {/* Ligne Navy → Rouge qui se dessine progressivement au scroll */}
              <div className="relative my-5 h-[3px] w-full overflow-hidden rounded-full bg-[#E2E8F0]">
                <div className="gt-method-line h-full w-full" />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {METHOD_STEPS.map((m, idx) => (
                  <div
                    key={m.step}
                    style={{ '--stagger-idx': idx } as React.CSSProperties}
                    className="gt-stagger-item flex flex-col justify-between rounded-[10px] border border-[#E2E8F0] bg-white p-4 transition-colors duration-200 hover:border-[#001D5B]"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono-tech">
                        <span
                          className={`font-extrabold text-sm ${
                            idx >= 2 ? 'text-[#E30000]' : 'text-[#001D5B]'
                          }`}
                        >
                          {m.step}.
                        </span>
                        <span className="text-[10px] font-semibold text-[#5B6472]">
                          {m.tag}
                        </span>
                      </div>
                      <h4 className="mt-2 text-sm sm:text-base font-bold text-[#0A0F1D]">
                        {m.title}
                      </h4>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#444650]">
                        {m.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. SECTION « ANCRÉE AU GABON, OUVERTE SUR L'AFRIQUE CENTRALE. »
          + LISTE DÉROULANTE DES 9 CAPITALES DU GABON S'ARRÊTANT SUR PORT-GENTIL (ÉPICENTRE ROUGE)
         ===================================================================== */}
      <div
        ref={epicenterRef}
        className="relative overflow-hidden bg-[#071336] text-white py-16 sm:py-22 lg:py-28"
      >
        {/* Dégradé radial subtil en arrière-plan */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 72% 52%, rgba(28, 56, 125, 0.52) 0%, rgba(10, 24, 64, 0.85) 52%, rgba(7, 19, 54, 1) 100%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
            {/* ===============================================================
                COLONNE GAUCHE (5 COLONNES) : TEXTE ÉDITORIAL + ROULEAU DES 9 CAPITALES
               =============================================================== */}
            <div className="gt-reveal-block lg:col-span-5">
              {/* Eyebrow : ■ AFRIQUE CENTRALE */}
              <div className="mb-4 flex items-center gap-2.5 text-[11px] sm:text-xs font-extrabold tracking-[0.14em] text-white uppercase">
                <span className="h-2 w-2 bg-[#C82A1E]" aria-hidden="true" />
                <span>AFRIQUE CENTRALE</span>
              </div>

              {/* Titre sur 3 lignes */}
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-[1.12] tracking-[-0.025em] text-white">
                <span className="block">Ancrée au Gabon,</span>
                <span className="block">ouverte sur</span>
                <span className="block">l’Afrique centrale.</span>
              </h2>

              {/* Paragraphe principal */}
              <p className="mt-5 max-w-[46ch] text-sm sm:text-base leading-[1.68] text-[#CBD5E1]">
                Depuis Port-Gentil, sur la façade atlantique du golfe de
                Guinée, Gabon Training accompagne les entreprises pétrolières
                et industrielles au cœur de l’Afrique centrale.
              </p>

              {/* =============================================================
                  LISTE DÉROULANTE CINÉTIQUE DES 9 CAPITALES PROVINCIALES DU GABON
                  Défile et s'arrête sur PORT-GENTIL qui s'illumine en rouge ;
                  les 8 autres capitales restent en arrière-plan en gris légèrement flouté mais lisible.
                 ============================================================= */}
              <div className="mt-6 rounded-[10px] border border-white/15 bg-[#040C24]/85 p-4 sm:p-5 shadow-[0_18px_40px_-10px_rgba(0,0,0,0.5)]">
                <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isLockedOnPortGentil
                          ? 'bg-[#E30000] shadow-[0_0_10px_#E30000]'
                          : 'bg-amber-400 animate-ping'
                      }`}
                    />
                    <span className="font-mono-tech text-[11px] font-bold tracking-[0.08em] text-[#CBD5E1]">
                      9 CAPITALES PROVINCIALES · ÉPICENTRE GABON
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={runCapitalsRoll}
                    className="inline-flex items-center gap-1 text-[11px] font-mono-tech text-[#94A3B8] hover:text-white transition-colors"
                    title="Relancer le défilement des 9 capitales"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Relancer</span>
                  </button>
                </div>

                {/* Fenêtre du sélecteur déroulant des 9 villes capitales */}
                <div className="relative overflow-hidden py-1">
                  <ul
                    aria-label="Les 9 capitales provinciales du Gabon avec Port-Gentil comme épicentre"
                    style={{
                      transform: `translate3d(0, ${
                        Math.sin(remainingSteps * 0.85) * (remainingSteps * 1.6)
                      }px, 0)`,
                    }}
                    className="space-y-1 transition-transform duration-75 ease-out"
                  >
                    {GABON_NINE_CAPITALS.map((city, idx) => {
                      const isTargetEpicenter = Boolean(city.isEpicenter);
                      const isCurrentlyScanned = activeHighlightIdx === idx;
                      const isIlluminatedRed =
                        isLockedOnPortGentil && isTargetEpicenter;

                      // Distance par rapport à Port-Gentil (centre index 4)
                      const distFromCenter = Math.abs(idx - 4);

                      return (
                        <li
                          key={city.code}
                          className={`relative flex items-center justify-between rounded-[6px] px-3.5 transition-all duration-300 ${
                            isIlluminatedRed
                              ? 'my-1.5 bg-gradient-to-r from-[#C82A1E] via-[#E30000] to-[#9E1C13] py-2.5 text-white shadow-[0_0_28px_rgba(227,0,0,0.55)] ring-1 ring-white/40 scale-[1.02] z-20'
                              : isCurrentlyScanned && !isLockedOnPortGentil
                              ? 'bg-white/15 py-1.5 text-white'
                              : 'py-1 text-[#94A3B8]'
                          }`}
                          style={
                            !isIlluminatedRed && isLockedOnPortGentil
                              ? {
                                  // Les 8 autres villes en arrière-plan : couleur grise, légèrement floutées mais parfaitement lisibles
                                  filter:
                                    distFromCenter === 1
                                      ? 'blur(0.45px)'
                                      : distFromCenter === 2
                                      ? 'blur(0.7px)'
                                      : 'blur(0.95px)',
                                  opacity:
                                    distFromCenter === 1
                                      ? 0.78
                                      : distFromCenter === 2
                                      ? 0.64
                                      : 0.52,
                                }
                              : undefined
                          }
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`font-mono-tech text-[10px] font-bold ${
                                isIlluminatedRed
                                  ? 'rounded bg-black/25 px-1.5 py-0.5 text-white'
                                  : 'text-[#64748B]'
                              }`}
                            >
                              {city.code}
                            </span>
                            <span
                              className={
                                isIlluminatedRed
                                  ? 'text-base sm:text-lg font-extrabold tracking-[0.04em] text-white uppercase'
                                  : 'text-xs sm:text-sm font-semibold text-[#94A3B8]'
                              }
                            >
                              {city.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={
                                isIlluminatedRed
                                  ? 'font-mono-tech text-[11px] font-bold text-white'
                                  : 'text-[11px] text-[#64748B]'
                              }
                            >
                              {city.province}
                            </span>
                            {isIlluminatedRed && (
                              <span
                                className="h-2 w-2 rounded-full bg-white animate-pulse"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Paragraphe secondaire & Bouton « Nous consulter → » */}
              <p className="mt-5 max-w-[46ch] text-xs sm:text-[13.5px] leading-[1.65] text-[#94A3B8]">
                Un besoin de formation hors de Port-Gentil ? Présentez-nous
                votre projet : nous étudions chaque demande.
              </p>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={handleConsult}
                  className="group inline-flex items-center gap-3 rounded-[4px] border border-white/40 bg-transparent px-6 py-3 text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Nous consulter</span>
                  <ArrowRight
                    className="gt-arrow-shift h-4 w-4 text-white/90"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            {/* ===============================================================
                COLONNE DROITE (7 COLONNES) : CARTOGRAPHIE AFRIQUE + ZOOM GABON / PORT-GENTIL
               =============================================================== */}
            <div className="gt-reveal-clip lg:col-span-7">
              <div className="relative mx-auto w-full max-w-[820px]">
                <svg
                  viewBox="0 0 820 600"
                  role="img"
                  aria-label="Carte d'Afrique centrale avec zoom sur le Gabon et Port-Gentil (Siège et Plateau technique)"
                  className="h-auto w-full select-none overflow-visible"
                >
                  <defs>
                    <clipPath id="gabonZoomLensClip">
                      <circle cx="280" cy="335" r="205" />
                    </clipPath>

                    <pattern
                      id="lensGrid"
                      width="36"
                      height="36"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 36 0 L 0 0 0 36"
                        fill="none"
                        stroke="rgba(255,255,255,0.055)"
                        strokeWidth="0.8"
                      />
                    </pattern>
                  </defs>

                  {/* 1. GRILLE AZIMUTALE DE FOND */}
                  <g stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" fill="none">
                    <circle cx="520" cy="300" r="180" />
                    <circle cx="520" cy="300" r="260" />
                    <circle cx="520" cy="300" r="340" />
                    <circle cx="520" cy="300" r="420" />
                    <circle cx="520" cy="300" r="500" />
                    <path d="M 120,80 Q 520,220 820,60" />
                    <path d="M 80,220 Q 520,300 820,240" />
                    <path d="M 80,380 Q 520,360 820,420" />
                    <path d="M 160,520 Q 520,440 820,550" />
                    <path d="M 350,0 Q 440,300 330,600" />
                    <path d="M 520,0 L 520,600" />
                    <path d="M 690,0 Q 600,300 710,600" />
                  </g>

                  <text
                    x="475"
                    y="96"
                    fill="rgba(203, 213, 225, 0.55)"
                    fontSize="9"
                    letterSpacing="0.22em"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    textAnchor="middle"
                  >
                    OCÉAN
                  </text>
                  <text
                    x="475"
                    y="110"
                    fill="rgba(203, 213, 225, 0.55)"
                    fontSize="9"
                    letterSpacing="0.22em"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    textAnchor="middle"
                  >
                    ATLANTIQUE
                  </text>

                  {/* 2. CARTE DU CONTINENT AFRICAIN (DROITE) */}
                  <g transform="translate(20, 0)">
                    <path
                      d="M 518,86 L 542,74 L 578,76 L 592,66 L 630,68 L 642,88 L 678,98 L 708,92 L 732,140 L 752,184 L 792,202 L 784,238 L 754,282 L 758,325 L 738,365 L 740,398 L 708,442 L 692,488 L 652,505 L 636,465 L 620,415 L 605,375 L 614,335 L 598,295 L 590,262 L 548,255 L 512,258 L 478,242 L 462,205 L 466,162 L 488,122 Z"
                      fill="#DCE6F5"
                      stroke="#BAC8E0"
                      strokeWidth="1"
                    />

                    <path
                      d="M 762,395 L 778,382 L 782,432 L 765,456 L 756,435 Z"
                      fill="#DCE6F5"
                      stroke="#BAC8E0"
                      strokeWidth="1"
                    />

                    <g stroke="#C4D1E8" strokeWidth="0.8" fill="none">
                      <path d="M 542,74 L 555,148 L 512,175 L 466,162" />
                      <path d="M 555,148 L 625,152 L 642,88" />
                      <path d="M 625,152 L 695,165 L 732,140" />
                      <path d="M 512,175 L 515,258" />
                      <path d="M 555,148 L 568,215 L 512,215" />
                      <path d="M 695,165 L 708,265 L 754,282" />
                      <path d="M 658,345 L 738,365" />
                      <path d="M 620,415 L 695,418 L 708,442" />
                    </g>

                    {/* Région AFRIQUE CENTRALE */}
                    <path
                      d="M 590,258 L 608,205 L 615,152 L 652,142 L 664,195 L 658,225 L 688,236 L 684,268 L 702,285 L 692,345 L 682,378 L 642,368 L 614,335 L 598,295 Z"
                      fill="#9E241B"
                      stroke="#DCE6F5"
                      strokeWidth="1"
                    />

                    {/* GABON sur la carte d'Afrique */}
                    <path
                      d="M 596,274 L 616,272 L 622,292 L 608,308 L 595,294 Z"
                      fill="#C92A1D"
                      stroke="#FFFFFF"
                      strokeWidth="1.3"
                    />

                    <text
                      x="656"
                      y="252"
                      fill="#FFFFFF"
                      fontSize="9.5"
                      fontWeight="800"
                      letterSpacing="0.12em"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      textAnchor="middle"
                    >
                      AFRIQUE
                    </text>
                    <text
                      x="656"
                      y="264"
                      fill="#FFFFFF"
                      fontSize="9.5"
                      fontWeight="800"
                      letterSpacing="0.12em"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      textAnchor="middle"
                    >
                      CENTRALE
                    </text>

                    <text
                      x="648"
                      y="305"
                      fill="#FFFFFF"
                      fontSize="9"
                      fontWeight="700"
                      letterSpacing="0.14em"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                    >
                      GABON
                    </text>

                    <circle
                      cx="608"
                      cy="290"
                      r="24"
                      fill="rgba(255,255,255,0.06)"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                  </g>

                  {/* 3. LIGNES DE PROJECTION */}
                  <line
                    x1="622"
                    y1="267"
                    x2="365"
                    y2="148"
                    stroke="rgba(255,255,255,0.38)"
                    strokeWidth="1"
                  />
                  <line
                    x1="622"
                    y1="313"
                    x2="412"
                    y2="492"
                    stroke="rgba(255,255,255,0.38)"
                    strokeWidth="1"
                  />

                  {/* 4. GRANDE LOUPE CIRCULAIRE DE ZOOM : CARTE DÉTAILLÉE DU GABON */}
                  <g clipPath="url(#gabonZoomLensClip)">
                    <circle cx="280" cy="335" r="205" fill="#152B63" />

                    <path
                      d="M 205,120 L 495,120 L 495,545 L 345,545 L 315,495 L 250,415 L 232,330 L 245,255 L 218,225 Z"
                      fill="#314B87"
                      stroke="rgba(255,255,255,0.22)"
                      strokeWidth="1"
                    />

                    <path
                      d="M 220,235 L 285,235 L 285,185"
                      fill="none"
                      stroke="rgba(255,255,255,0.25)"
                      strokeWidth="1"
                    />

                    <rect
                      x="75"
                      y="130"
                      width="410"
                      height="410"
                      fill="url(#lensGrid)"
                    />

                    <path
                      d="M 132,302 C 136,298 142,302 140,310 C 137,315 130,312 132,302 Z"
                      fill="#385494"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="0.8"
                    />
                    <circle cx="164" cy="248" r="3.5" fill="#385494" />

                    <line
                      x1="75"
                      y1="316"
                      x2="485"
                      y2="316"
                      stroke="rgba(255,255,255,0.32)"
                      strokeDasharray="3 3"
                      strokeWidth="1"
                    />
                    <text
                      x="438"
                      y="311"
                      fill="rgba(226, 232, 240, 0.8)"
                      fontSize="8.5"
                      letterSpacing="0.12em"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      textAnchor="middle"
                    >
                      ÉQUATEUR 0°
                    </text>

                    {/* POLYGONE GÉOGRAPHIQUE DU GABON */}
                    <path
                      d="M 244,264
                         L 262,258 L 284,258 L 285,212 L 348,212 L 352,226 L 372,224
                         L 392,245 L 406,258 L 402,282 L 388,298 L 392,315 L 414,328
                         L 418,358 L 412,395 L 402,418 L 386,412 L 375,392 L 352,395
                         L 342,415 L 315,418 L 302,438 L 312,456 L 292,472 L 272,445
                         L 242,412 L 222,385 L 208,365
                         L 202,348 L 210,338 L 218,345 L 224,332 L 220,312
                         L 228,298 L 218,288 L 234,278 L 232,268 Z"
                      fill="#C92A1D"
                      stroke="#FFFFFF"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />

                    <text
                      x="318"
                      y="194"
                      fill="rgba(226, 232, 240, 0.82)"
                      fontSize="9"
                      letterSpacing="0.14em"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      textAnchor="middle"
                    >
                      CAMEROUN
                    </text>

                    <text
                      x="252"
                      y="240"
                      fill="rgba(226, 232, 240, 0.82)"
                      fontSize="8"
                      letterSpacing="0.10em"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      textAnchor="middle"
                    >
                      GUINÉE
                    </text>
                    <text
                      x="252"
                      y="250"
                      fill="rgba(226, 232, 240, 0.82)"
                      fontSize="8"
                      letterSpacing="0.10em"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      textAnchor="middle"
                    >
                      ÉQUATORIALE
                    </text>

                    <text
                      x="382"
                      y="455"
                      fill="rgba(226, 232, 240, 0.82)"
                      fontSize="8.5"
                      letterSpacing="0.12em"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      textAnchor="middle"
                    >
                      RÉPUBLIQUE
                    </text>
                    <text
                      x="382"
                      y="467"
                      fill="rgba(226, 232, 240, 0.82)"
                      fontSize="8.5"
                      letterSpacing="0.12em"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      textAnchor="middle"
                    >
                      DU CONGO
                    </text>

                    <text
                      x="188"
                      y="468"
                      fill="rgba(203, 213, 225, 0.65)"
                      fontSize="8.5"
                      letterSpacing="0.2em"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      textAnchor="middle"
                    >
                      OCÉAN
                    </text>
                    <text
                      x="188"
                      y="480"
                      fill="rgba(203, 213, 225, 0.65)"
                      fontSize="8.5"
                      letterSpacing="0.2em"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      textAnchor="middle"
                    >
                      ATLANTIQUE
                    </text>

                    {/* Villes repères du Gabon */}
                    <circle cx="316" cy="242" r="2.3" fill="#FFFFFF" />
                    <text
                      x="322"
                      y="245"
                      fill="rgba(255,255,255,0.88)"
                      fontSize="8.5"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                    >
                      Oyem
                    </text>

                    <circle cx="236" cy="286" r="3" fill="#FFFFFF" />
                    <text
                      x="243"
                      y="293"
                      fill="#FFFFFF"
                      fontSize="10"
                      fontWeight="600"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                    >
                      Libreville
                    </text>

                    <circle cx="268" cy="342" r="2.3" fill="#FFFFFF" />
                    <text
                      x="274"
                      y="345"
                      fill="rgba(255,255,255,0.88)"
                      fontSize="8.5"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                    >
                      Lambaréné
                    </text>

                    <circle cx="382" cy="382" r="2.3" fill="#FFFFFF" />
                    <text
                      x="377"
                      y="385"
                      fill="rgba(255,255,255,0.88)"
                      fontSize="8.5"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      textAnchor="end"
                    >
                      Franceville
                    </text>

                    <text
                      x="325"
                      y="326"
                      fill="#FFFFFF"
                      fontSize="21"
                      fontWeight="800"
                      letterSpacing="0.24em"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      textAnchor="middle"
                    >
                      GABON
                    </text>

                    {/* POINT FOCAL : PORT-GENTIL (SIÈGE & PLATEAU TECHNIQUE) */}
                    <circle
                      cx="204"
                      cy="344"
                      r="18"
                      fill="rgba(201, 42, 29, 0.25)"
                      stroke="rgba(201, 42, 29, 0.55)"
                      strokeWidth="1"
                      className="gt-port-gentil-halo"
                    />
                    <circle
                      cx="204"
                      cy="344"
                      r="10"
                      fill="rgba(201, 42, 29, 0.45)"
                      stroke="rgba(255, 255, 255, 0.5)"
                      strokeWidth="1"
                    />
                    <circle
                      cx="204"
                      cy="344"
                      r="4.5"
                      fill="#C92A1D"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />

                    <line
                      x1="204"
                      y1="350"
                      x2="204"
                      y2="388"
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                    />

                    <rect
                      x="96"
                      y="388"
                      width="120"
                      height="42"
                      rx="2"
                      fill="#C92A1D"
                      stroke="rgba(255,255,255,0.35)"
                      strokeWidth="0.8"
                    />
                    <text
                      x="106"
                      y="406"
                      fill="#FFFFFF"
                      fontSize="11.5"
                      fontWeight="800"
                      letterSpacing="0.08em"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                    >
                      PORT-GENTIL
                    </text>
                    <text
                      x="106"
                      y="420"
                      fill="rgba(255,255,255,0.9)"
                      fontSize="8.2"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                    >
                      Siège &amp; Plateau technique
                    </text>

                    <text
                      x="186"
                      y="443"
                      fill="rgba(203, 213, 225, 0.78)"
                      fontSize="8"
                      letterSpacing="0.08em"
                      fontFamily="IBM Plex Mono, monospace"
                      textAnchor="middle"
                    >
                      0°43&apos; S · 8°47&apos; E
                    </text>

                    <g transform="translate(300, 512)">
                      <text
                        x="0"
                        y="0"
                        fill="rgba(226,232,240,0.85)"
                        fontSize="7.5"
                        fontFamily="IBM Plex Mono, monospace"
                      >
                        0
                      </text>
                      <text
                        x="32"
                        y="0"
                        fill="rgba(226,232,240,0.85)"
                        fontSize="7.5"
                        fontFamily="IBM Plex Mono, monospace"
                        textAnchor="end"
                      >
                        100 km
                      </text>
                      <line
                        x1="0"
                        y1="5"
                        x2="30"
                        y2="5"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />
                    </g>
                  </g>

                  {/* Anneau extérieur gradué de la loupe */}
                  <circle
                    cx="280"
                    cy="335"
                    r="205"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2.2"
                  />
                  <circle
                    cx="280"
                    cy="335"
                    r="213"
                    fill="none"
                    stroke="rgba(255,255,255,0.28)"
                    strokeWidth="1"
                  />

                  {compassTicks.map((deg) => {
                    const isMajor = deg % 30 === 0;
                    const rad = (deg * Math.PI) / 180;
                    const r1 = 213;
                    const r2 = isMajor ? 220 : 216.5;
                    const x1 = 280 + r1 * Math.cos(rad);
                    const y1 = 335 + r1 * Math.sin(rad);
                    const x2 = 280 + r2 * Math.cos(rad);
                    const y2 = 335 + r2 * Math.sin(rad);
                    return (
                      <line
                        key={deg}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={
                          isMajor
                            ? 'rgba(255,255,255,0.55)'
                            : 'rgba(255,255,255,0.25)'
                        }
                        strokeWidth={isMajor ? '1.2' : '0.8'}
                      />
                    );
                  })}
                </svg>

                {/* Légende cartographique en bas à droite */}
                <div className="mt-2 flex flex-col items-start lg:items-end gap-2 text-[11px] text-[#CBD5E1]">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block h-2.5 w-2.5 bg-[#9E241B]"
                        aria-hidden="true"
                      />
                      <span>Afrique centrale (région géographique)</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block h-2.5 w-2.5 border border-white bg-[#C92A1D]"
                        aria-hidden="true"
                      />
                      <span>Gabon</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full border-[1.5px] border-white bg-[#C92A1D]"
                        aria-hidden="true"
                      />
                      <span>Port-Gentil</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-[#64748B]">
                    Données cartographiques : Natural Earth (1:10m) · Projection
                    azimutale équivalente / Mercator (zoom)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
