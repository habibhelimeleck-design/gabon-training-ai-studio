import React from 'react';

export const ApplicationSection: React.FC = () => {
  return (
    <section
      id="application"
      aria-label="Architecture fonctionnelle de l'application Gabon Training"
      className="relative border-b border-[#CBD5E1] bg-[#001D5B] py-16 sm:py-20 lg:py-24 text-white"
    >
      <div
        aria-hidden="true"
        className="gt-technical-grid-dark pointer-events-none absolute inset-0 opacity-70"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Colonne Gauche : Animation d'entrée Produit (1. Texte → 2. Bénéfices séquentiels) */}
          <div className="lg:col-span-6">
            <div className="gt-reveal-block">
              <div className="mb-3 flex items-center gap-2 text-xs font-mono-tech font-bold tracking-[0.06em] text-[#FFB4A8]">
                <span className="h-2 w-2 bg-[#E30000]" aria-hidden="true" />
                <span>OUTIL NUMÉRIQUE DE SUIVI OPÉRATIONNEL</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.02em] text-white [text-wrap:balance]">
                Continuité pédagogique et traçabilité des habilitations terrain.
              </h2>

              <p className="mt-4 max-w-[58ch] text-sm sm:text-base leading-relaxed text-[#DBE1FF]">
                Conçue en complément des sessions présentielles sur site,
                l’architecture applicative Gabon Training structure le suivi des
                parcours, la consultation des supports normatifs et la
                vérification des attestations de formation pour les directions RH
                et HSE.
              </p>
            </div>

            {/* 2. Bénéfices avec stagger séquentiel */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div
                style={{ '--stagger-idx': 1 } as React.CSSProperties}
                className="gt-stagger-item rounded-[10px] border border-white/15 bg-[#00092B]/65 p-5 transition-colors duration-200 hover:border-white/35"
              >
                <div className="font-mono-tech text-xs font-bold text-[#E30000]">
                  01. RÉFÉRENTIELS MÉTIERS
                </div>
                <h3 className="mt-1.5 text-sm font-bold text-white">
                  Supports techniques & fiches réflexes chantier
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#DBE1FF]/80">
                  Accès structuré aux procédures consignées étudiées durant les
                  sessions pratiques.
                </p>
              </div>

              <div
                style={{ '--stagger-idx': 2 } as React.CSSProperties}
                className="gt-stagger-item rounded-[10px] border border-white/15 bg-[#00092B]/65 p-5 transition-colors duration-200 hover:border-white/35"
              >
                <div className="font-mono-tech text-xs font-bold text-[#8CFA96]">
                  02. REGISTRE D’HABILITATION
                </div>
                <h3 className="mt-1.5 text-sm font-bold text-white">
                  Suivi de validité & échéances de recyclage
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#DBE1FF]/80">
                  Visibilité centralisée pour les employeurs sur les titres et
                  certificats délivrés.
                </p>
              </div>
            </div>
          </div>

          {/* Colonne Droite : 3. Représentation de l'application (Clip-path reveal produit, sans faux screenshots) */}
          <div className="gt-reveal-clip lg:col-span-6">
            <div className="rounded-[12px] border border-white/20 bg-[#00092B] p-6 sm:p-8 shadow-[0_20px_48px_-12px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between pb-4 text-xs font-mono-tech text-[#B4C5FF]">
                <span>SCHÉMA D’ARCHITECTURE FONCTIONNELLE</span>
                <span>SYNCHRONISATION TERRAIN</span>
              </div>

              {/* Ligne de progression produit qui se dessine */}
              <div className="h-[2px] w-full overflow-hidden bg-white/10">
                <div className="gt-draw-line h-full w-full bg-gradient-to-r from-[#E30000] to-[#8CFA96]" />
              </div>

              <div className="mt-6 space-y-4">
                <div
                  style={{ '--stagger-idx': 1 } as React.CSSProperties}
                  className="gt-stagger-item flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-[8px] border border-white/15 bg-[#001D5B]/75 p-4 transition-transform duration-200 hover:translate-x-1"
                >
                  <div>
                    <span className="font-mono-tech text-[11px] text-[#8CFA96]">
                      MODULE A · PLANIFICATION
                    </span>
                    <p className="mt-0.5 text-sm font-bold text-white">
                      Inscription Intra / Inter & Feuilles d’Émargement
                    </p>
                  </div>
                  <span className="font-mono-tech text-xs text-[#DBE1FF]">
                    Flux Entreprise
                  </span>
                </div>

                <div
                  style={{ '--stagger-idx': 2 } as React.CSSProperties}
                  className="gt-stagger-item flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-[8px] border border-white/15 bg-[#001D5B]/75 p-4 transition-transform duration-200 hover:translate-x-1"
                >
                  <div>
                    <span className="font-mono-tech text-[11px] text-[#FFB4A8]">
                      MODULE B · ÉVALUATION PRATIQUE
                    </span>
                    <p className="mt-0.5 text-sm font-bold text-white">
                      Validation des acquis par le Formateur Habilitant
                    </p>
                  </div>
                  <span className="font-mono-tech text-xs text-[#DBE1FF]">
                    Plateau Technique
                  </span>
                </div>

                <div
                  style={{ '--stagger-idx': 3 } as React.CSSProperties}
                  className="gt-stagger-item flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-[8px] border border-white/15 bg-[#001D5B]/75 p-4 transition-transform duration-200 hover:translate-x-1"
                >
                  <div>
                    <span className="font-mono-tech text-[11px] text-[#B4C5FF]">
                      MODULE C · CONFORMITÉ & AUDIT
                    </span>
                    <p className="mt-0.5 text-sm font-bold text-white">
                      Délivrance des Attestations & Archivage Employeur
                    </p>
                  </div>
                  <span className="font-mono-tech text-xs text-[#DBE1FF]">
                    Direction HSE / RH
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-white/15 pt-4 text-xs text-[#DBE1FF]/75">
                Déploiement réservé aux entreprises clientes et stagiaires
                inscrits aux programmes Gabon Training.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
