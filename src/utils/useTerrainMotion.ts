import { useEffect, useState } from 'react';

export interface HeroParallaxOffsets {
  plan0AtmosphereY: number;
  plan1GridY: number;
  plan1GridX: number;
  plan1GridOpacity: number;
  plan2EditorialY: number;
  plan3PhotoContainerY: number;
  plan3PhotoInnerY: number;
  plan4FrameY: number;
  plan4FrameX: number;
  isReducedMotion: boolean;
  viewportTier: 'desktop' | 'tablet' | 'mobile';
}

const INITIAL_OFFSETS: HeroParallaxOffsets = {
  plan0AtmosphereY: 0,
  plan1GridY: 0,
  plan1GridX: 0,
  plan1GridOpacity: 1,
  plan2EditorialY: 0,
  plan3PhotoContainerY: 0,
  plan3PhotoInnerY: 0,
  plan4FrameY: 0,
  plan4FrameX: 0,
  isReducedMotion: false,
  viewportTier: 'desktop',
};

export function useHeroParallax(forceReducedMotion: boolean): HeroParallaxOffsets {
  const [offsets, setOffsets] = useState<HeroParallaxOffsets>(INITIAL_OFFSETS);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let rafId: number | null = null;

    const getViewportTier = (): 'desktop' | 'tablet' | 'mobile' => {
      const w = window.innerWidth;
      if (w >= 1024) return 'desktop';
      if (w >= 768) return 'tablet';
      return 'mobile';
    };

    const updateParallax = () => {
      rafId = null;
      const sysReduced = mediaQuery.matches || forceReducedMotion;
      const tier = getViewportTier();

      // Section 8 & 9 : Mobile et prefers-reduced-motion désactivent le parallaxe
      if (sysReduced || tier === 'mobile') {
        setOffsets({
          plan0AtmosphereY: 0,
          plan1GridY: 0,
          plan1GridX: 0,
          plan1GridOpacity: 1,
          plan2EditorialY: 0,
          plan3PhotoContainerY: 0,
          plan3PhotoInnerY: 0,
          plan4FrameY: 0,
          plan4FrameX: 0,
          isReducedMotion: sysReduced,
          viewportTier: tier,
        });
        return;
      }

      // Desktop : expérience complète (1.0) | Tablet : parallaxe réduit (0.4)
      const factor = tier === 'desktop' ? 1 : 0.4;
      const scrollY = Math.max(0, Math.min(window.scrollY, 900));

      setOffsets({
        // PLAN 1 : Background photographique → mouvement lent
        plan0AtmosphereY: Number((scrollY * 0.12 * factor).toFixed(2)),
        // PLAN 2 : Grille technique → mouvement extrêmement léger (presque imperceptible)
        plan1GridY: Number((scrollY * 0.026 * factor).toFixed(2)),
        plan1GridX: Number((scrollY * -0.008 * factor).toFixed(2)),
        plan1GridOpacity: Number(Math.max(0.55, 1 - scrollY / 1800).toFixed(3)),
        // PLAN 3 : Contenu texte → mouvement minimal
        plan2EditorialY: Number((scrollY * -0.012 * factor).toFixed(2)),
        // PLAN 4 : Photo principale → léger mouvement interne différent du background
        plan3PhotoContainerY: Number((scrollY * -0.038 * factor).toFixed(2)),
        plan3PhotoInnerY: Number((scrollY * 0.046 * factor).toFixed(2)),
        // PLAN 5 : Cadre graphique → mouvement extrêmement léger
        plan4FrameY: Number((scrollY * -0.058 * factor).toFixed(2)),
        plan4FrameX: Number((scrollY * 0.012 * factor).toFixed(2)),
        isReducedMotion: false,
        viewportTier: tier,
      });
    };

    const onScrollOrResize = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    mediaQuery.addEventListener('change', onScrollOrResize);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      mediaQuery.removeEventListener('change', onScrollOrResize);
    };
  }, [forceReducedMotion]);

  return offsets;
}

export function useScrollReveal(forceReducedMotion: boolean) {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const targets = document.querySelectorAll(
      '.gt-reveal, .gt-reveal-block, .gt-reveal-mask, .gt-reveal-clip, .gt-draw-line, .gt-method-line, .gt-stagger-item, .gt-team-left, .gt-team-center, .gt-team-right'
    );

    if (mediaQuery.matches || forceReducedMotion) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -36px 0px',
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [forceReducedMotion]);
}
