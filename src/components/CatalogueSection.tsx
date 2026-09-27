import React, { useState, useMemo } from 'react';
import { Search, ArrowUpRight, CheckCircle2, X, Layers } from 'lucide-react';
import {
  TRAINING_CATALOGUE,
  TRAINING_POLES,
  TrainingProgram,
  PROJECT_ASSETS,
} from '../data/gabonTrainingData';

interface CatalogueSectionProps {
  onSelectCourseForQuote: (course: TrainingProgram) => void;
}

export const CatalogueSection: React.FC<CatalogueSectionProps> = ({
  onSelectCourseForQuote,
}) => {
  const [selectedPole, setSelectedPole] = useState<string>('Tous les pôles');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [motionCycle, setMotionCycle] = useState<number>(0);
  const [activeProgramModal, setActiveProgramModal] =
    useState<TrainingProgram | null>(null);

  const handleSelectPole = (pole: string) => {
    setSelectedPole(pole);
    setMotionCycle((prev) => prev + 1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setMotionCycle((prev) => prev + 1);
  };

  const filteredPrograms = useMemo(() => {
    return TRAINING_CATALOGUE.filter((prog) => {
      const matchesPole =
        selectedPole === 'Tous les pôles' || prog.pole === selectedPole;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        prog.title.toLowerCase().includes(q) ||
        prog.code.toLowerCase().includes(q) ||
        prog.pole.toLowerCase().includes(q) ||
        prog.summary.toLowerCase().includes(q);
      return matchesPole && matchesSearch;
    });
  }, [selectedPole, searchQuery]);

  return (
    <section
      id="formations"
      aria-label="Catalogue des formations industrielles"
      className="relative border-b border-[#CBD5E1] bg-[#F8FAFC] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* En-tête éditorial du Catalogue */}
        <div className="gt-reveal-block flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 border-b border-[#CBD5E1] pb-8">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.06em] text-[#001D5B]">
              <span className="h-2 w-2 bg-[#E30000]" aria-hidden="true" />
              <span>CATALOGUE OPÉRATIONNEL · RÉFÉRENTIELS CERTIFIANTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.02em] text-[#0A0F1D] [text-wrap:balance]">
              Programmes de formation et d’habilitation par pôle métier.
            </h2>
          </div>

          {/* Barre de recherche technique */}
          <div className="w-full lg:w-80">
            <label htmlFor="catalogue-search" className="sr-only">
              Rechercher une formation ou un code
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A7A7A]"
                aria-hidden="true"
              />
              <input
                id="catalogue-search"
                type="search"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Rechercher (ex: QHSE, ATEX, CACES...)"
                className="h-12 w-full rounded-[8px] border border-[#CBD5E1] bg-white pl-10 pr-4 text-sm text-[#0A0F1D] placeholder-[#7A7A7A] focus:border-2 focus:border-[#001D5B] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Contrôles de filtrage interactifs avec retour Motion Design à chaque clic */}
        <div
          role="tablist"
          aria-label="Filtrer par pôle de compétence"
          className="gt-reveal-block mt-6 flex flex-wrap items-center gap-2"
        >
          {TRAINING_POLES.map((pole) => {
            const isActive = selectedPole === pole;
            const count =
              pole === 'Tous les pôles'
                ? TRAINING_CATALOGUE.length
                : TRAINING_CATALOGUE.filter((p) => p.pole === pole).length;

            return (
              <button
                key={pole}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelectPole(pole)}
                className={`group relative overflow-hidden rounded-[8px] px-4 py-2.5 text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#001D5B] text-white shadow-[0_6px_16px_-4px_rgba(0,29,91,0.32)] -translate-y-0.5'
                    : 'border border-[#CBD5E1] bg-white text-[#444650] hover:border-[#001D5B] hover:text-[#001D5B] hover:-translate-y-0.5'
                }`}
              >
                {/* Filet d'accentuation rouge actif sous l'onglet sélectionné */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[3px] w-full bg-[#E30000]"
                  />
                )}
                <span className="inline-flex items-center gap-2">
                  <span>{pole}</span>
                  <span
                    className={`font-mono-tech text-[11px] ${
                      isActive
                        ? 'text-[#FFB4A8]'
                        : 'text-[#7A7A7A] group-hover:text-[#001D5B]'
                    }`}
                  >
                    ({count})
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Barre d'état dynamique animée à chaque changement de pôle */}
        <div
          key={`status-${motionCycle}`}
          className="gt-catalogue-status-anim mt-5 flex flex-wrap items-center justify-between gap-3 rounded-[8px] border border-[#E2E8F0] bg-white px-4 py-2.5 text-xs"
        >
          <div className="flex items-center gap-2.5 text-[#001D5B] font-bold">
            <Layers className="h-4 w-4 text-[#E30000]" aria-hidden="true" />
            <span>Pôle actif :</span>
            <span className="text-[#0A0F1D]">{selectedPole}</span>
          </div>
          <div className="font-mono-tech text-[#5B6472]">
            <span className="font-bold text-[#E30000]">
              0{filteredPrograms.length}
            </span>{' '}
            {filteredPrograms.length > 1
              ? 'CURSUS CERTIFIANTS DISPONIBLES'
              : 'CURSUS CERTIFIANT DISPONIBLE'}
          </div>
        </div>

        {/* Bandeau visuel d'atelier pratique avec Reveal par Masque */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 rounded-[12px] border border-[#CBD5E1] bg-white p-5 sm:p-6">
          <div className="gt-reveal-mask lg:col-span-4 aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden rounded-[8px] bg-[#001D5B]">
            <img
              src={PROJECT_ASSETS.formationAtelierQhse}
              alt="Session pratique d'étalonnage et de vérification sécurité sur équipement industriel"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="gt-reveal-block lg:col-span-8">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono-tech text-[#001D5B]">
              <span>INGÉNIERIE SUR MESURE</span>
              <span aria-hidden="true">·</span>
              <span>INTRA-ENTREPRISE SUR VOS INSTALLATIONS</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#E30000]">CAHIER DES CHARGES DÉDIÉ</span>
            </div>
            <h3 className="mt-2 text-lg sm:text-xl font-bold text-[#0A0F1D]">
              Adaptation intégrale des cursus aux équipements et procédures de votre site
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#444650]">
              Chaque module du catalogue peut être déployé en session dédiée sur
              vos sites d’exploitation (Port-Gentil, Libreville, Moanda, Gamba ou
              en zone CEMAC) après audit technique préalable avec vos équipes HSE
              et Maintenance.
            </p>
          </div>
        </div>

        {/* Grille des Cartes de Formation avec Chorégraphie Motion Design à chaque sélection */}
        {filteredPrograms.length === 0 ? (
          <div
            key={`empty-${motionCycle}`}
            className="gt-catalogue-motion-card mt-8 rounded-[12px] border border-[#CBD5E1] bg-white p-10 text-center"
          >
            <p className="text-base font-bold text-[#0A0F1D]">
              Aucun programme ne correspond à votre filtre actuel.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedPole('Tous les pôles');
                setSearchQuery('');
                setMotionCycle((prev) => prev + 1);
              }}
              className="mt-4 rounded-[8px] bg-[#001D5B] px-4 py-2 text-xs font-bold text-white"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div
            key={`grid-${motionCycle}`}
            className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredPrograms.map((program, idx) => (
              <article
                key={`${program.code}-${motionCycle}`}
                style={{ '--card-idx': idx } as React.CSSProperties}
                className="gt-catalogue-motion-card gt-card-interactive group relative flex flex-col justify-between overflow-hidden rounded-[12px] border border-[#E2E8F0] bg-white p-6 shadow-[0_1px_3px_rgba(10,15,29,0.06)]"
              >
                {/* Balayage laser / ligne de cadrage Motion Design à l'apparition + hover */}
                <span
                  aria-hidden="true"
                  style={{ '--card-idx': idx } as React.CSSProperties}
                  className="gt-catalogue-motion-sweep pointer-events-none absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#001D5B] via-[#E30000] to-[#001D5B]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-[#E30000] transition-transform duration-200 group-hover:scale-x-100"
                />

                <div>
                  {/* Kicker non-encapsulé (Zero-Pill) : Code technique + Pôle */}
                  <div className="flex items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3 text-xs">
                    <span className="font-mono-tech font-bold text-[#001D5B]">
                      {program.code}
                    </span>
                    <span className="font-semibold text-[#E30000] truncate">
                      {program.pole}
                    </span>
                  </div>

                  {/* Titre principal de la formation */}
                  <h3 className="mt-4 text-lg font-bold leading-snug text-[#0A0F1D] transition-colors duration-150 group-hover:text-[#001D5B]">
                    {program.title}
                  </h3>

                  {/* Résumé */}
                  <p className="mt-2.5 text-sm leading-relaxed text-[#444650]">
                    {program.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
                  {/* Métadonnées non-encapsulées avec séparateurs · */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#5B6472]">
                    <span className="font-mono-tech font-semibold text-[#0A0F1D]">
                      {program.duration}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{program.modality}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tech text-[#065F46]">
                      {program.complianceStandard}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveProgramModal(program)}
                      className="text-xs font-bold text-[#001D5B] underline-offset-4 hover:underline whitespace-nowrap"
                    >
                      Voir le programme détaillé
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectCourseForQuote(program)}
                      className="gt-btn-primary inline-flex items-center gap-1.5 rounded-[8px] bg-[#001D5B] px-3.5 py-2 text-xs font-bold text-white whitespace-nowrap group-hover:bg-[#E30000]"
                    >
                      <span>Inscrire / Devis</span>
                      <ArrowUpRight
                        className="gt-arrow-shift h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Fiche Technique Programme */}
      {activeProgramModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-program-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0F1D]/70 p-4 backdrop-blur-xs"
        >
          <div className="w-full max-w-2xl rounded-[12px] border border-[#CBD5E1] bg-white p-6 sm:p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-[#E2E8F0] pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-tech font-bold text-[#E30000]">
                  <span>{activeProgramModal.code}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#001D5B]">{activeProgramModal.pole}</span>
                </div>
                <h3
                  id="modal-program-title"
                  className="mt-1.5 text-xl sm:text-2xl font-extrabold text-[#0A0F1D]"
                >
                  {activeProgramModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveProgramModal(null)}
                aria-label="Fermer la fiche programme"
                className="rounded-[8px] border border-[#CBD5E1] p-2 text-[#444650] hover:bg-[#F8FAFC] hover:text-[#0A0F1D]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-sm text-[#444650]">
              <p className="leading-relaxed">{activeProgramModal.summary}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-[8px] border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs">
                <div>
                  <span className="font-bold text-[#0A0F1D]">Durée : </span>
                  <span className="font-mono-tech">{activeProgramModal.duration}</span>
                </div>
                <div>
                  <span className="font-bold text-[#0A0F1D]">Modalité : </span>
                  <span>{activeProgramModal.modality}</span>
                </div>
                <div>
                  <span className="font-bold text-[#0A0F1D]">Lieux : </span>
                  <span>{activeProgramModal.location}</span>
                </div>
                <div>
                  <span className="font-bold text-[#0A0F1D]">Référentiel : </span>
                  <span className="font-mono-tech text-[#065F46]">
                    {activeProgramModal.complianceStandard}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold tracking-[0.05em] text-[#001D5B]">
                  OBJECTIFS OPÉRATIONNELS DE LA FORMATION
                </h4>
                <ul className="mt-2.5 space-y-2">
                  {activeProgramModal.objectives.map((obj) => (
                    <li key={obj} className="flex items-start gap-2.5 text-sm text-[#0A0F1D]">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#065F46]"
                        aria-hidden="true"
                      />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-[#E2E8F0] pt-4">
              <button
                type="button"
                onClick={() => setActiveProgramModal(null)}
                className="rounded-[8px] border border-[#CBD5E1] px-4 py-2.5 text-xs font-bold text-[#444650] hover:bg-[#F8FAFC]"
              >
                Fermer
              </button>
              <button
                type="button"
                onClick={() => {
                  const chosen = activeProgramModal;
                  setActiveProgramModal(null);
                  onSelectCourseForQuote(chosen);
                }}
                className="gt-btn-red rounded-[8px] bg-[#E30000] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#BC0000]"
              >
                Planifier cette formation pour nos équipes
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
