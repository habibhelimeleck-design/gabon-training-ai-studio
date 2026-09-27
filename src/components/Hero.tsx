import React from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import { PROJECT_ASSETS } from '../data/gabonTrainingData';
import { HeroParallaxOffsets } from '../utils/useTerrainMotion';

interface HeroProps {
  parallax: HeroParallaxOffsets;
  onExploreCatalogue: () => void;
  onRequestQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  parallax,
  onExploreCatalogue,
  onRequestQuote,
}) => {
  return (
    <section
      id="top"
      aria-label="Présentation Gabon Training"
      className="relative isolate overflow-hidden border-b border-[#CBD5E1] bg-[#F8FAFC] pt-10 pb-16 sm:pt-14 sm:pb-22 lg:pt-20 lg:pb-28"
    >
      {/* =====================================================================
          PLAN 1 : BACKGROUND PHOTOGRAPHIQUE ATMOSPHÉRIQUE (MOUVEMENT LENT)
          Très grande échelle, crop éditorial, faible contraste, désaturation importante,
          voile blanc / navy progressif et disparition vers la zone de lecture du texte.
         ===================================================================== */}
      <div
        aria-hidden="true"
        className="hero-seq-1-atmosphere pointer-events-none absolute inset-0 -z-30 overflow-hidden"
      >
        <div
          style={{
            transform: `translate3d(0, ${parallax.plan0AtmosphereY}px, 0) scale(1.08)`,
          }}
          className="h-full w-full will-change-transform"
        >
          <img
            src={PROJECT_ASSETS.heroAtmosphereBg}
            alt=""
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-[68%_38%] opacity-[0.19] grayscale-[90%] contrast-[82%]"
          />
        </div>

        {/* Voile blanc / navy directionnel : disparition progressive vers la zone de lecture gauche */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(248,250,252,0.99) 0%, rgba(248,250,252,0.96) 38%, rgba(248,250,252,0.78) 66%, rgba(0,29,91,0.08) 100%)',
          }}
        />

        {/* Fondu progressif vertical supérieur et inférieur pour ancrer la transition de scroll */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(248,250,252,0.90) 0%, rgba(248,250,252,0.12) 32%, rgba(0,29,91,0.04) 72%, rgba(248,250,252,0.96) 100%)',
          }}
        />
      </div>

      {/* =====================================================================
          PLAN 2 : GRILLE TECHNIQUE SIGNATURE (MOUVEMENT EXTRÊMEMENT LÉGER)
         ===================================================================== */}
      <div
        aria-hidden="true"
        style={{
          transform: `translate3d(${parallax.plan1GridX}px, ${parallax.plan1GridY}px, 0)`,
          opacity: parallax.plan1GridOpacity,
        }}
        className="hero-seq-2-grid gt-technical-grid pointer-events-none absolute inset-0 -z-20 will-change-transform"
      >
        <div className="mx-auto flex h-full max-w-[1440px] flex-col justify-between px-5 py-3.5 sm:px-8 lg:px-12">
          <div className="hidden sm:flex items-center justify-between text-[11px] font-mono-tech tracking-[0.06em] text-[#001D5B]/40">
            <span>RÉFÉRENTIEL TERRAIN · PORT-GENTIL & LIBREVILLE</span>
            <span>00°43&apos;00&quot;S · 08°47&apos;00&quot;E</span>
          </div>
          <div className="hidden sm:flex items-center justify-between text-[11px] font-mono-tech tracking-[0.06em] text-[#001D5B]/35">
            <span>INGÉNIERIE & TRANSMISSION OPÉRATIONNELLE</span>
            <span>ZONE CEMAC</span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          COMPOSITION GÉNÉRALE : TEXTE À GAUCHE + PHOTO TERRAIN À DROITE
         ===================================================================== */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          {/* =================================================================
              PLAN 3 : CONTENU TEXTE À GAUCHE (MOUVEMENT MINIMAL / ENTRÉE STAGGERÉE)
             ================================================================= */}
          <div
            style={{
              transform: `translate3d(0, ${parallax.plan2EditorialY}px, 0)`,
            }}
            className="lg:col-span-7 will-change-transform"
          >
            {/* Ordre 2 : Eyebrow conservé à l'identique */}
            <div className="hero-seq-3-eyebrow mb-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-bold tracking-[0.06em] text-[#001D5B]">
              <span
                className="inline-block h-2 w-2 bg-[#E30000] shrink-0"
                aria-hidden="true"
              />
              <span>FORMATION PROFESSIONNELLE / PORT-GENTIL · GABON</span>
            </div>

            {/* Ordre 3 : Headline par groupes visuels (sans machine à écrire) */}
            <h1 className="max-w-[18ch] text-[36px] leading-[1.12] sm:text-[48px] sm:leading-[1.1] xl:text-[64px] xl:leading-[1.08] font-extrabold tracking-[-0.03em] text-[#0A0F1D] [text-wrap:balance]">
              <span className="hero-seq-4-headline-1 block">
                La maîtrise technique sur le terrain.
              </span>
              <span className="hero-seq-4-headline-2 mt-1 block text-[#001D5B]">
                L’exigence opérationnelle en Afrique Centrale.
              </span>
            </h1>

            {/* Ordre 4 : Paragraphe */}
            <p className="hero-seq-5-paragraph mt-5 max-w-[62ch] text-base sm:text-lg leading-[1.65] text-[#444650]">
              Gabon Training accompagne les opérateurs pétroliers, miniers,
              portuaires et industriels dans la montée en compétence de leurs
              équipes. Des formations certifiantes conçues et animées par des
              praticiens du terrain, directement sur vos installations ou au
              sein de nos pôles techniques.
            </p>

            {/* Ordre 5 : CTA principal + CTA secondaire */}
            <div className="hero-seq-6-cta mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <button
                type="button"
                onClick={onExploreCatalogue}
                className="group gt-btn-primary inline-flex items-center justify-center gap-2.5 rounded-[8px] bg-[#001D5B] px-6 py-3.5 text-sm sm:text-base font-bold text-white whitespace-nowrap hover:bg-[#00092B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#001D5B]"
              >
                <span>Consulter le catalogue des formations</span>
                <ArrowRight className="gt-arrow-shift h-4 w-4 shrink-0" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onRequestQuote}
                className="group gt-btn-secondary inline-flex items-center justify-center gap-2.5 rounded-[8px] border-[1.5px] border-[#001D5B] bg-white px-6 py-3.5 text-sm sm:text-base font-bold text-[#001D5B] whitespace-nowrap hover:bg-[#EFF4FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#001D5B]"
              >
                <span>Planifier une session sur site</span>
                <FileText className="gt-arrow-shift h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
            </div>

            {/* Ordre 6 : Métadonnées (Texte épuré avec séparateurs typographiques) */}
            <div className="hero-seq-7-meta mt-8 border-t border-[#CBD5E1] pt-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm font-medium text-[#5B6472]">
                <span className="font-semibold text-[#0A0F1D]">
                  Modalités Intra & Inter-entreprises
                </span>
                <span aria-hidden="true" className="text-[#CBD5E1]">
                  ·
                </span>
                <span>Audits & Conformité QHSE</span>
                <span aria-hidden="true" className="text-[#CBD5E1]">
                  ·
                </span>
                <span>Port-Gentil · Libreville · Zone CEMAC</span>
              </div>
            </div>
          </div>

          {/* =================================================================
              PLAN 4 & PLAN 5 : PHOTOGRAPHIE TERRAIN PRINCIPALE + CADRE DÉCALÉ
              (DROITE — 5 COLONNES SUR DESKTOP, ZÉRO GLASSMORPHISM)
             ================================================================= */}
          <div className="lg:col-span-5 relative mt-2 lg:mt-0">
            <div className="relative mx-auto max-w-[560px] lg:max-w-none pb-4 pr-3 sm:pb-6 sm:pr-6">
              {/* PLAN 5 (Ordre 8) : CADRE GRAPHIQUE DÉCALÉ (Apparaît légèrement après la photo) */}
              <div
                aria-hidden="true"
                style={{
                  transform: `translate3d(${parallax.plan4FrameX}px, ${parallax.plan4FrameY}px, 0)`,
                }}
                className="hero-seq-9-frame pointer-events-none absolute top-4 left-4 right-0 bottom-0 sm:top-5 sm:left-5 rounded-[12px] border-[1.5px] border-[#001D5B]/45 bg-[#001D5B]/[0.025] will-change-transform"
              >
                {/* Repères d'angle architecturaux signature */}
                <span className="absolute -bottom-[2px] -right-[2px] h-7 w-7 border-b-[3px] border-r-[3px] border-[#E30000] rounded-br-[12px]" />
                <span className="absolute -top-[2px] -left-[2px] h-5 w-5 border-t-[2px] border-l-[2px] border-[#001D5B] rounded-tl-[12px]" />
              </div>

              {/* PLAN 4 (Ordre 7) : PHOTOGRAPHIE TERRAIN PRINCIPALE (Reveal / Mask + mouvement interne) */}
              <div
                style={{
                  transform: `translate3d(0, ${parallax.plan3PhotoContainerY}px, 0)`,
                }}
                className="hero-seq-8-photo relative z-10 overflow-hidden rounded-[12px] border border-[#CBD5E1] bg-[#001D5B] shadow-[0_14px_34px_-8px_rgba(0,29,91,0.20)] will-change-transform"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={PROJECT_ASSETS.heroTerrainMain}
                    alt="Ingénieurs et formateurs Gabon Training en inspection de sécurité opérationnelle sur site industriel à Port-Gentil"
                    referrerPolicy="no-referrer"
                    style={{
                      transform: `translate3d(0, ${parallax.plan3PhotoInnerY}px, 0) scale(1.07)`,
                    }}
                    className="h-full w-full object-cover object-center will-change-transform"
                  />
                </div>

                {/* Scrim sobre en pied de photographie */}
                <div className="bg-gradient-to-t from-[#0A0F1D]/90 via-[#0A0F1D]/45 to-transparent px-4 pt-8 pb-3.5 text-white">
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono-tech tracking-[0.04em] text-white/90">
                    <span>TERRAIN · PORT-GENTIL & LIBREVILLE</span>
                    <span className="shrink-0 text-[#8CFA96]">OPÉRATIONNEL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
