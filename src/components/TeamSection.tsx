import React from 'react';
import { TEAM_MEMBERS, TeamMember } from '../data/gabonTrainingData';

export const TeamSection: React.FC = () => {
  const getMotionClass = (order: TeamMember['positionOrder']) => {
    if (order === 'left') return 'gt-team-left';
    if (order === 'center') return 'gt-team-center';
    return 'gt-team-right';
  };

  return (
    <section
      id="equipe"
      aria-label="Équipe pédagogique et Direction"
      className="relative overflow-hidden border-b border-[#CBD5E1] bg-white py-16 sm:py-20 lg:py-28"
    >
      {/* Grille technique subtile en fond de section */}
      <div
        aria-hidden="true"
        className="gt-technical-grid pointer-events-none absolute inset-0 opacity-55"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* En-tête éditorial avec ligne qui se dessine */}
        <div className="gt-reveal-block mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center justify-center gap-2 text-xs font-bold tracking-[0.06em] text-[#001D5B]">
            <span className="h-2 w-2 bg-[#E30000]" aria-hidden="true" />
            <span>CORPS PÉDAGOGIQUE & DIRECTION TECHNIQUE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.02em] text-[#0A0F1D] [text-wrap:balance]">
            L’expertise terrain portée par des formateurs praticiens.
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#5B6472]">
            Une direction pédagogique engagée au cœur des réalités industrielles
            gabonaises, entourée de formateurs spécialisés dans la transmission
            des savoir-faire opérationnels.
          </p>
          <div className="mx-auto mt-6 h-[2px] w-24 overflow-hidden bg-[#E2E8F0]">
            <div className="gt-draw-line h-full w-full bg-[#E30000]" />
          </div>
        </div>

        {/* =================================================================
            TRIPTYQUE OBLIGATOIRE :
            [ SECONDARY : FORMATEUR ] — [ PRIMARY : FONDATEUR ] — [ SECONDARY : FORMATEUR ]
            Gauche : DIAGBOUGA Emmanuel | Centre : AKOURE Loïc | Droite : Wassim Mansour
           ================================================================= */}
        <div className="gt-team-triptych mt-12 lg:mt-16 grid grid-cols-1 items-stretch gap-7 lg:grid-cols-12 lg:items-center lg:gap-8">
          {TEAM_MEMBERS.map((member) => {
            const isCenter = member.isFounder;
            const motionClass = getMotionClass(member.positionOrder);

            if (isCenter) {
              // ===============================================================
              // CARTE CENTRALE (PRIMARY) : AKOURE Loïc
              // Traitement rouge distinctif, nom en blanc, fonction en blanc,
              // carte légèrement plus haute / dominante, accent visuel & animation spécifique.
              // ===============================================================
              return (
                <article
                  key={member.id}
                  aria-label={`${member.name} — ${member.role}`}
                  className={`${motionClass} group relative lg:col-span-4 lg:-my-6 z-20`}
                >
                  {/* Cadre architectural décalé soulignant la dominance centrale */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-2 rounded-[14px] border-[1.5px] border-[#001D5B]/35 bg-[#001D5B]/[0.02]"
                  />

                  <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[12px] border-2 border-[#BC0000] bg-gradient-to-b from-[#BC0000] via-[#A80000] to-[#001D5B] text-white shadow-[0_24px_54px_-12px_rgba(188,0,0,0.38)]">
                    {/* Barre d'accent supérieur qui se déploie à l'entrée */}
                    <div className="relative overflow-hidden border-b border-white/20 bg-[#00092B] px-5 py-3">
                      <div
                        aria-hidden="true"
                        className="gt-founder-accent-bar absolute bottom-0 left-0 h-[3px] w-full bg-[#E30000]"
                      />
                      <div className="flex items-center justify-between text-xs font-mono-tech font-bold tracking-[0.06em] text-white">
                        <span>FONDATEUR · DIRECTION GÉNÉRALE</span>
                        <span className="text-[#FFB4A8]">CENTRAL</span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8">
                      {/* Zone Portrait (avec zoom léger au hover desktop, sans portrait IA inventé) */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px] border border-white/25 bg-[#00092B]">
                        <div
                          aria-hidden="true"
                          className="gt-technical-grid-dark absolute inset-0 opacity-75 transition-transform duration-500 ease-out group-hover:scale-105"
                        />

                        <div className="relative z-10 flex h-full flex-col items-center justify-center p-4 text-center transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                          <div className="flex h-20 w-20 items-center justify-center rounded-[10px] border-2 border-[#E30000] bg-[#BC0000] font-mono-tech text-2xl font-extrabold tracking-wider text-white shadow-lg">
                            {member.initials}
                          </div>
                          <p className="mt-3 font-mono-tech text-[11px] font-semibold tracking-[0.05em] text-white">
                            PORTRAIT OFFICIEL · FONDATEUR
                          </p>
                          <p className="mt-0.5 font-mono-tech text-[10px] text-white/70">
                            {member.expectedAssetPath}
                          </p>
                        </div>

                        <span
                          aria-hidden="true"
                          className="absolute bottom-2.5 right-2.5 h-4 w-4 border-b-2 border-r-2 border-white/80"
                        />
                      </div>

                      {/* Informations avec stagger interne : Nom en blanc & Fonction en blanc */}
                      <div className="gt-team-info-stagger mt-6">
                        <h3 className="text-2xl sm:text-[28px] font-extrabold tracking-[-0.02em] text-white">
                          {member.name}
                        </h3>
                        <p className="mt-1.5 text-sm sm:text-base font-bold text-white">
                          {member.role}
                        </p>

                        <div className="mt-3 h-[2px] w-12 bg-white/40" aria-hidden="true" />

                        <p className="mt-4 text-sm leading-relaxed text-white/90">
                          {member.summary}
                        </p>
                      </div>
                    </div>

                    {/* Pied de carte Fondateur */}
                    <div className="border-t border-white/15 bg-[#00092B]/80 px-6 py-4 text-xs sm:px-8">
                      <div className="font-mono-tech text-[11px] text-[#FFB4A8]">
                        {member.domains}
                      </div>
                      <div className="mt-1 font-semibold text-white">
                        {member.certificationNote}
                      </div>
                    </div>
                  </div>
                </article>
              );
            }

            // =================================================================
            // CARTES GAUCHE & DROITE (SECONDARY) : FORMATEURS
            // DIAGBOUGA Emmanuel (Gauche) & Wassim Mansour (Droite)
            // Même famille visuelle claire, traitement secondaire structuré
            // =================================================================
            return (
              <article
                key={member.id}
                aria-label={`${member.name} — ${member.role}`}
                className={`${motionClass} group lg:col-span-4 flex h-full flex-col justify-between overflow-hidden rounded-[12px] border border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#001D5B] hover:shadow-[0_14px_30px_-8px_rgba(0,29,91,0.12)]`}
              >
                <div>
                  {/* En-tête secondaire sobre */}
                  <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-white px-5 py-2.5 text-xs font-mono-tech font-bold tracking-[0.05em] text-[#5B6472]">
                    <span>FORMATEUR</span>
                    <span className="text-[#001D5B]">
                      {member.positionOrder === 'left' ? ' ÉQUIPE 01' : 'ÉQUIPE 03'}
                    </span>
                  </div>

                  <div className="p-6">
                    {/* Zone Portrait Formateur avec léger zoom au survol */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px] border border-[#CBD5E1] bg-white">
                      <div
                        aria-hidden="true"
                        className="gt-technical-grid absolute inset-0 opacity-80 transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="relative z-10 flex h-full flex-col items-center justify-center p-4 text-center transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                        <div className="flex h-16 w-16 items-center justify-center rounded-[8px] border-[1.5px] border-[#001D5B] bg-[#F8FAFC] font-mono-tech text-xl font-extrabold text-[#001D5B]">
                          {member.initials}
                        </div>
                        <p className="mt-3 font-mono-tech text-[11px] font-bold tracking-[0.04em] text-[#001D5B]">
                          PORTRAIT OFFICIEL · FORMATEUR
                        </p>
                        <p className="mt-0.5 font-mono-tech text-[10px] text-[#5B6472]">
                          {member.expectedAssetPath}
                        </p>
                      </div>
                    </div>

                    {/* Informations avec stagger interne */}
                    <div className="gt-team-info-stagger mt-5">
                      <h3 className="text-xl sm:text-2xl font-extrabold tracking-[-0.01em] text-[#0A0F1D]">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-sm font-bold text-[#001D5B]">
                        {member.role}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-[#444650]">
                        {member.summary}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pied de carte secondaire */}
                <div className="border-t border-[#E2E8F0] bg-white px-6 py-4 text-xs">
                  <div className="font-mono-tech text-[11px] font-semibold text-[#001D5B]">
                    {member.domains}
                  </div>
                  <div className="mt-1 text-[#5B6472]">{member.certificationNote}</div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
