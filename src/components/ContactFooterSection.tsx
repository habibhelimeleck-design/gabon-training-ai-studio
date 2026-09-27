import React, { useState, useEffect } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import {
  TRAINING_CATALOGUE,
  TrainingProgram,
  VALIDATED_PARTNERS,
} from '../data/gabonTrainingData';

interface ContactFooterSectionProps {
  preselectedCourse: TrainingProgram | null;
  forceReducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export const ContactFooterSection: React.FC<ContactFooterSectionProps> = ({
  preselectedCourse,
  forceReducedMotion,
  onToggleReducedMotion,
}) => {
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCode, setSelectedCode] = useState('');
  const [modality, setModality] = useState('Intra-entreprise (sur site client)');
  const [participants, setParticipants] = useState('6 à 12 collaborateurs');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedCourse) {
      setSelectedCode(preselectedCourse.code);
      setSubmitted(false);
    }
  }, [preselectedCourse]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!company.trim() || !contactName.trim() || !email.trim()) {
      setErrorMsg(
        'Veuillez renseigner le nom de votre entreprise, votre nom et votre adresse e-mail professionnelle.'
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMsg('Veuillez saisir une adresse e-mail professionnelle valide.');
      return;
    }

    setSubmitted(true);
  };

  return (
    <>
      {/* =====================================================================
          SECTION CONTACT / DEMANDE DE DEVIS & PLANIFICATION DE SESSION
         ===================================================================== */}
      <section
        id="contact"
        aria-label="Demande de devis et planification de session"
        className="relative border-b border-[#CBD5E1] bg-[#F8FAFC] py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Colonne Gauche : Coordonnées Institutionnelles */}
            <div className="gt-reveal-block lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.06em] text-[#001D5B]">
                  <span className="h-2 w-2 bg-[#E30000]" aria-hidden="true" />
                  <span>CONTACT & INGÉNIERIE DE FORMATION</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.02em] text-[#0A0F1D] [text-wrap:balance]">
                  Planifier une session ou solliciter un cahier des charges.
                </h2>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#444650]">
                  Notre direction pédagogique analyse vos besoins de formation
                  et d’habilitation pour construire une proposition adaptée à
                  vos contraintes d’exploitation au Gabon et en zone CEMAC.
                </p>

                <div className="my-6 h-[2px] w-full overflow-hidden bg-[#E2E8F0]">
                  <div className="gt-method-line h-full w-full" />
                </div>

                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="font-mono-tech text-xs font-bold text-[#001D5B]">
                      PÔLES D’INTERVENTION PRINCIPAUX
                    </dt>
                    <dd className="mt-1 font-semibold text-[#0A0F1D]">
                      Libreville & Port-Gentil (Gabon) · Déploiement sur site en Zone CEMAC
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono-tech text-xs font-bold text-[#001D5B]">
                      MODALITÉS PÉDAGOGIQUES
                    </dt>
                    <dd className="mt-1 text-[#444650]">
                      Intra-entreprise sur installations industrielles · Inter-entreprises en centre
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono-tech text-xs font-bold text-[#001D5B]">
                      DIRECTION TECHNIQUE
                    </dt>
                    <dd className="mt-1 text-[#444650]">
                      AKOURE Loïc — Fondateur et Formateur des Formateurs
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 rounded-[10px] border border-[#CBD5E1] bg-white p-5">
                <div className="font-mono-tech text-xs font-bold text-[#E30000]">
                  PROTOCOLE DE RÉPONSE
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[#444650]">
                  Chaque demande fait l’objet d’une qualification technique par
                  un formateur référent avec transmission du programme détaillé,
                  des prérequis stagiaires et du chiffrage opérationnel.
                </p>
              </div>
            </div>

            {/* Colonne Droite : Formulaire Structuré */}
            <div className="gt-reveal-clip lg:col-span-7">
              <div className="rounded-[12px] border border-[#CBD5E1] bg-white p-6 sm:p-8 shadow-[0_1px_3px_rgba(10,15,29,0.06)]">
                {submitted ? (
                  <div className="py-8 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[8px] bg-[#ECFDF5] border border-[#61CE70] text-[#065F46]">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-xl font-extrabold text-[#0A0F1D]">
                      Demande de cahier des charges enregistrée
                    </h3>
                    <p className="mx-auto mt-2 max-w-md text-sm text-[#444650]">
                      Merci {contactName}. Les éléments concernant{' '}
                      <span className="font-bold text-[#001D5B]">{company}</span>{' '}
                      ({modality}) sont prêts pour traitement par notre équipe
                      pédagogique.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-6 rounded-[8px] bg-[#001D5B] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#00092B]"
                    >
                      Modifier ou soumettre une autre demande
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="border-b border-[#E2E8F0] pb-3">
                      <h3 className="text-lg font-bold text-[#0A0F1D]">
                        Formulaire de cadrage opérationnel
                      </h3>
                      <p className="text-xs text-[#5B6472]">
                        Les champs marqués d’un astérisque (*) sont requis.
                      </p>
                    </div>

                    {errorMsg && (
                      <div
                        role="alert"
                        className="rounded-[8px] border border-[#E30000] bg-[#FEF2F2] px-4 py-3 text-xs font-semibold text-[#991B1B]"
                      >
                        {errorMsg}
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="gt-company"
                          className="block text-xs font-bold text-[#0A0F1D]"
                        >
                          Entreprise / Organisation *
                        </label>
                        <input
                          id="gt-company"
                          type="text"
                          required
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Ex : Opérateur Industriel Gabon"
                          className="mt-1.5 h-12 w-full rounded-[8px] border border-[#CBD5E1] bg-white px-3.5 text-sm text-[#0A0F1D] placeholder-[#7A7A7A] focus:border-2 focus:border-[#001D5B] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="gt-name"
                          className="block text-xs font-bold text-[#0A0F1D]"
                        >
                          Nom & Fonction du demandeur *
                        </label>
                        <input
                          id="gt-name"
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Ex : Responsable HSE / Formation"
                          className="mt-1.5 h-12 w-full rounded-[8px] border border-[#CBD5E1] bg-white px-3.5 text-sm text-[#0A0F1D] placeholder-[#7A7A7A] focus:border-2 focus:border-[#001D5B] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="gt-email"
                          className="block text-xs font-bold text-[#0A0F1D]"
                        >
                          E-mail professionnel *
                        </label>
                        <input
                          id="gt-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="contact@entreprise.ga"
                          className="mt-1.5 h-12 w-full rounded-[8px] border border-[#CBD5E1] bg-white px-3.5 text-sm text-[#0A0F1D] placeholder-[#7A7A7A] focus:border-2 focus:border-[#001D5B] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="gt-phone"
                          className="block text-xs font-bold text-[#0A0F1D]"
                        >
                          Téléphone (Libreville / Port-Gentil / CEMAC)
                        </label>
                        <input
                          id="gt-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+241 ..."
                          className="mt-1.5 h-12 w-full rounded-[8px] border border-[#CBD5E1] bg-white px-3.5 text-sm text-[#0A0F1D] placeholder-[#7A7A7A] focus:border-2 focus:border-[#001D5B] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="gt-course"
                          className="block text-xs font-bold text-[#0A0F1D]"
                        >
                          Programme ou pôle souhaité
                        </label>
                        <select
                          id="gt-course"
                          value={selectedCode}
                          onChange={(e) => setSelectedCode(e.target.value)}
                          className="mt-1.5 h-12 w-full rounded-[8px] border border-[#CBD5E1] bg-white px-3 text-sm text-[#0A0F1D] focus:border-2 focus:border-[#001D5B] focus:outline-none"
                        >
                          <option value="">
                            Programme sur mesure / Plusieurs modules
                          </option>
                          {TRAINING_CATALOGUE.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.code} — {c.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="gt-modality"
                          className="block text-xs font-bold text-[#0A0F1D]"
                        >
                          Modalité d’intervention
                        </label>
                        <select
                          id="gt-modality"
                          value={modality}
                          onChange={(e) => setModality(e.target.value)}
                          className="mt-1.5 h-12 w-full rounded-[8px] border border-[#CBD5E1] bg-white px-3 text-sm text-[#0A0F1D] focus:border-2 focus:border-[#001D5B] focus:outline-none"
                        >
                          <option value="Intra-entreprise (sur site client)">
                            Intra-entreprise (sur site client)
                          </option>
                          <option value="Inter-entreprises (en centre Gabon Training)">
                            Inter-entreprises (en centre Gabon Training)
                          </option>
                          <option value="Audit de conformité & Ingénierie pédagogique">
                            Audit de conformité & Ingénierie pédagogique
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="gt-participants"
                        className="block text-xs font-bold text-[#0A0F1D]"
                      >
                        Effectif prévisionnel & site d’intervention
                      </label>
                      <input
                        id="gt-participants"
                        type="text"
                        value={participants}
                        onChange={(e) => setParticipants(e.target.value)}
                        className="mt-1.5 h-12 w-full rounded-[8px] border border-[#CBD5E1] bg-white px-3.5 text-sm text-[#0A0F1D] focus:border-2 focus:border-[#001D5B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="gt-message"
                        className="block text-xs font-bold text-[#0A0F1D]"
                      >
                        Précisions techniques ou contraintes de calendrier
                      </label>
                      <textarea
                        id="gt-message"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Indiquez vos équipements spécifiques, normes internes ou créneaux souhaités..."
                        className="mt-1.5 w-full rounded-[8px] border border-[#CBD5E1] bg-white p-3.5 text-sm text-[#0A0F1D] placeholder-[#7A7A7A] focus:border-2 focus:border-[#001D5B] focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                      <span className="text-xs text-[#5B6472]">
                        Traitement confidentiel par la Direction Pédagogique.
                      </span>
                      <button
                        type="submit"
                        className="gt-btn-primary inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#E30000] px-6 py-3.5 text-sm font-bold text-white whitespace-nowrap hover:bg-[#BC0000]"
                      >
                        <span>Transmettre la demande</span>
                        <Send className="h-4 w-4 shrink-0" aria-hidden="true" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FOOTER INSTITUTIONNEL SOBRE
         ===================================================================== */}
      <footer className="bg-[#0A0F1D] text-white py-12 border-t border-white/10">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 pb-10 border-b border-white/10">
            <div className="md:col-span-5">
              <div className="text-lg font-extrabold tracking-[-0.03em] text-white">
                GABON TRAINING
              </div>
              <p className="mt-2.5 max-w-sm text-xs leading-relaxed text-[#CBD5E1]">
                Centre de formation professionnelle et d’accompagnement
                opérationnel pour les secteurs industriels, pétroliers, miniers
                et tertiaires au Gabon et dans l’espace CEMAC.
              </p>
            </div>

            <div className="md:col-span-4">
              <div className="font-mono-tech text-xs font-bold tracking-[0.06em] text-[#B4C5FF]">
                PARTENAIRES TECHNIQUES VALIDÉS
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-[#CBD5E1]">
                {VALIDATED_PARTNERS.join(' · ')}
              </p>
            </div>

            <div className="md:col-span-3 flex flex-col justify-between">
              <div>
                <div className="font-mono-tech text-xs font-bold tracking-[0.06em] text-[#B4C5FF]">
                  NAVIGATION RAPIDE
                </div>
                <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[#CBD5E1]">
                  <a href="#top" className="hover:text-white">
                    Accueil
                  </a>
                  <a href="#partenaires" className="hover:text-white">
                    Partenaires
                  </a>
                  <a href="#ancrage" className="hover:text-white">
                    Ancrage CEMAC
                  </a>
                  <a href="#formations" className="hover:text-white">
                    Formations
                  </a>
                  <a href="#equipe" className="hover:text-white">
                    Équipe
                  </a>
                </div>
              </div>

              {/* Contrôle d'accessibilité prefers-reduced-motion */}
              <div className="mt-5">
                <button
                  type="button"
                  onClick={onToggleReducedMotion}
                  aria-pressed={forceReducedMotion}
                  className="rounded-[6px] border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] font-mono-tech text-[#CBD5E1] hover:border-white/40 hover:text-white"
                >
                  {forceReducedMotion
                    ? 'Accessibilité : Mouvement réduit (Actif)'
                    : 'Accessibilité : Activer mouvement réduit'}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#7A7A7A]">
            <span>
              © {new Date().getFullYear()} Gabon Training. Tous droits réservés.
            </span>
            <span>Libreville & Port-Gentil, République Gabonaise · Zone CEMAC</span>
          </div>
        </div>
      </footer>
    </>
  );
};
