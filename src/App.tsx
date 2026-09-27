/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PartnersMarquee } from './components/PartnersMarquee';
import { ProofAndMapSection } from './components/ProofAndMapSection';
import { CatalogueSection } from './components/CatalogueSection';
import { TeamSection } from './components/TeamSection';
import { ApplicationSection } from './components/ApplicationSection';
import { ContactFooterSection } from './components/ContactFooterSection';
import { TrainingProgram } from './data/gabonTrainingData';
import { useHeroParallax, useScrollReveal } from './utils/useTerrainMotion';

export default function App() {
  const [forceReducedMotion, setForceReducedMotion] = useState(false);
  const [preselectedCourse, setPreselectedCourse] =
    useState<TrainingProgram | null>(null);

  const parallax = useHeroParallax(forceReducedMotion);
  useScrollReveal(forceReducedMotion);

  useEffect(() => {
    const root = document.documentElement;
    if (forceReducedMotion) {
      root.classList.add('force-reduced-motion');
    } else {
      root.classList.remove('force-reduced-motion');
    }
  }, [forceReducedMotion]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: parallax.isReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  const handleRequestQuote = () => {
    scrollToSection('contact');
  };

  const handleExploreCatalogue = () => {
    scrollToSection('formations');
  };

  const handleSelectCourseForQuote = (course: TrainingProgram) => {
    setPreselectedCourse(course);
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F8FAFC] text-[#0A0F1D]">
      {/* 1. HEADER (Top Bar 3-Zone Contract) */}
      <Header onRequestQuote={handleRequestQuote} />

      <main>
        {/* 2. HERO IMMERSIF MULTI-PLANS (Plan 0 → Plan 4 + Liquid Glass contrôlé + Parallaxe) */}
        <Hero
          parallax={parallax}
          onExploreCatalogue={handleExploreCatalogue}
          onRequestQuote={handleRequestQuote}
        />

        {/* 3. BANDE « NOS PARTENAIRES » IMMÉDIATEMENT SOUS LE HERO (7 noms validés, texte uniquement) */}
        <PartnersMarquee isReducedMotion={parallax.isReducedMotion} />

        {/* 4. PREUVE / CHIFFRES + ANCRAGE TERRAIN & CARTE AFRIQUE CENTRALE */}
        <ProofAndMapSection
          parallax={parallax}
          onConsultClick={handleRequestQuote}
        />

        {/* 5. FORMATIONS / CATALOGUE */}
        <CatalogueSection onSelectCourseForQuote={handleSelectCourseForQuote} />

        {/* 6. SECTION ÉQUIPE ([ FORMATEUR ] — [ FONDATEUR / DG AU CENTRE ] — [ FORMATEUR ]) */}
        <TeamSection />

        {/* 7. SECTION APPLICATION (Structure conservée sans fausse capture ni faux liens Store) */}
        <ApplicationSection />
      </main>

      {/* 8. FORMULAIRE DE CADRAGE & FOOTER INSTITUTIONNEL */}
      <ContactFooterSection
        preselectedCourse={preselectedCourse}
        forceReducedMotion={forceReducedMotion}
        onToggleReducedMotion={() => setForceReducedMotion((prev) => !prev)}
      />
    </div>
  );
}
