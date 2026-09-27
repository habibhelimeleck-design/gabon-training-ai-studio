import React from 'react';
import { VALIDATED_PARTNERS } from '../data/gabonTrainingData';

interface PartnersMarqueeProps {
  isReducedMotion: boolean;
}

export const PartnersMarquee: React.FC<PartnersMarqueeProps> = ({ isReducedMotion }) => {
  // Pour couvrir largement 2560px+ sans aucune zone vide, chaque demi-piste répète la séquence 4 fois
  const repeatedHalfTrack = [
    ...VALIDATED_PARTNERS,
    ...VALIDATED_PARTNERS,
    ...VALIDATED_PARTNERS,
    ...VALIDATED_PARTNERS,
  ];

  return (
    <section
      id="partenaires"
      aria-label="Nos partenaires"
      className="relative w-full overflow-hidden border-b border-[#CBD5E1] bg-[#001D5B] text-white"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col md:flex-row md:items-center">
        {/* Libellé fixe « NOS PARTENAIRES » */}
        <div className="relative z-20 flex shrink-0 items-center justify-between border-b border-white/15 bg-[#00092B] px-5 py-3.5 sm:px-8 md:border-b-0 md:border-r md:py-5 lg:px-10">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 bg-[#E30000]" aria-hidden="true" />
            <h2 className="font-mono-tech text-xs sm:text-sm font-bold tracking-[0.08em] text-white whitespace-nowrap">
              NOS PARTENAIRES
            </h2>
          </div>
          <span className="md:hidden font-mono-tech text-[11px] text-[#B4C5FF]">
            07 RÉFÉRENCES
          </span>
        </div>

        {/* Zone de défilement (ou liste statique unique si prefers-reduced-motion est actif) */}
        {isReducedMotion ? (
          <div className="w-full px-5 py-4 sm:px-8">
            <ul
              aria-label="Liste officielle des partenaires Gabon Training"
              className="flex flex-wrap items-center justify-start gap-x-6 gap-y-2.5 text-sm sm:text-base font-bold tracking-[-0.01em] text-white"
            >
              {VALIDATED_PARTNERS.map((partner, idx) => (
                <li key={partner} className="flex items-center gap-6 whitespace-nowrap">
                  <span>{partner}</span>
                  {idx < VALIDATED_PARTNERS.length - 1 && (
                    <span aria-hidden="true" className="text-[#E30000] font-mono-tech">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="gt-partners-viewport relative flex-1 overflow-hidden py-4 md:py-5">
            {/* Fondus latéraux subtils pour une entrée/sortie éditoriale propre */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-16 bg-gradient-to-r from-[#001D5B] to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-16 bg-gradient-to-l from-[#001D5B] to-transparent"
            />

            {/* Piste continue Droite → Gauche composée de 2 demi-pistes identiques (chacune > 2800px) */}
            <div className="gt-partners-track items-center">
              {/* Demi-piste A (accessible aux lecteurs d'écran sur les 7 premiers items) */}
              <div className="flex shrink-0 items-center">
                {repeatedHalfTrack.map((partner, index) => (
                  <div
                    key={`half-a-${index}-${partner}`}
                    aria-hidden={index >= VALIDATED_PARTNERS.length ? 'true' : undefined}
                    className="flex shrink-0 items-center"
                  >
                    <span className="px-6 sm:px-8 text-sm sm:text-base font-bold tracking-[0.01em] text-white/95 whitespace-nowrap transition-colors duration-150 hover:text-white">
                      {partner}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-xs font-mono-tech text-[#E30000] select-none"
                    >
                      /
                    </span>
                  </div>
                ))}
              </div>

              {/* Demi-piste B (clone exact pour boucle infinie sans saut à -50%) */}
              <div className="flex shrink-0 items-center" aria-hidden="true">
                {repeatedHalfTrack.map((partner, index) => (
                  <div
                    key={`half-b-${index}-${partner}`}
                    className="flex shrink-0 items-center"
                  >
                    <span className="px-6 sm:px-8 text-sm sm:text-base font-bold tracking-[0.01em] text-white/95 whitespace-nowrap">
                      {partner}
                    </span>
                    <span className="text-xs font-mono-tech text-[#E30000] select-none">
                      /
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
