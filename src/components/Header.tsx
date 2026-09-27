import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onRequestQuote: (courseCode?: string) => void;
}

const NAV_ITEMS = [
  { label: 'Partenaires', href: '#partenaires' },
  { label: 'Ancrage CEMAC', href: '#ancrage' },
  { label: 'Formations', href: '#formations' },
  { label: 'Équipe', href: '#equipe' },
  { label: 'Application', href: '#application' },
];

export const Header: React.FC<HeaderProps> = ({ onRequestQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);

      const sections = ['partenaires', 'ancrage', 'formations', 'equipe', 'application', 'contact'];
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            current = `#${id}`;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 h-16 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#CBD5E1] shadow-[0_6px_20px_-6px_rgba(0,29,91,0.10)]'
          : 'bg-[#FFFFFF] border-b border-[#E2E8F0]'
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Zone 1 : Brand Wordmark (single clean text element) */}
        <a
          href="#top"
          className="text-lg sm:text-xl font-extrabold tracking-[-0.03em] text-[#001D5B] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#001D5B]"
        >
          GABON TRAINING
        </a>

        {/* Zone 2 : 5 Single-Line Navigation Links */}
        <nav
          aria-label="Navigation principale"
          className="hidden lg:flex items-center gap-7 xl:gap-9"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative py-1 text-sm font-semibold whitespace-nowrap transition-colors duration-150 ${
                  isActive
                    ? 'text-[#001D5B]'
                    : 'text-[#5B6472] hover:text-[#0A0F1D]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#E30000] transition-transform duration-200 origin-left ${
                    isActive ? 'w-full scale-x-100' : 'w-full scale-x-0 hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3 : Primary Action */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onRequestQuote()}
            className="gt-btn-primary inline-flex items-center gap-2 rounded-[8px] bg-[#E30000] px-4 py-2.5 text-xs sm:text-sm font-bold text-white whitespace-nowrap shrink-0 hover:bg-[#BC0000] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#001D5B]"
          >
            <span>Demander un devis</span>
            <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-[8px] border border-[#CBD5E1] bg-white text-[#001D5B] hover:bg-[#F8FAFC]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#CBD5E1] bg-white px-5 py-4 shadow-lg">
          <nav aria-label="Menu mobile" className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-[8px] px-3 py-2.5 text-sm font-semibold text-[#0A0F1D] hover:bg-[#F1F5F9]"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="h-4 w-4 text-[#5B6472]" />
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
