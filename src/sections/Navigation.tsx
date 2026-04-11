import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Vision', href: '#vision' },
  { label: 'Tiers', href: '#tiers' },
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'Lab', href: '#lab' },
  { label: 'Instructors', href: '#instructors' },
  { label: 'Apply', href: '#admission' },
];

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    ScrollTrigger.create({
      trigger: '#vision',
      start: 'top 80%',
      onEnter: () => {
        setIsVisible(true);
        gsap.to(nav, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' });
      },
      onLeaveBack: () => {
        setIsVisible(false);
        gsap.to(nav, { y: -100, opacity: 0, duration: 0.3, ease: 'power3.in' });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === '#vision') st.kill();
      });
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
      >
        <div className="backdrop-blur-xl bg-black/80 border-b border-white/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-14 sm:h-16">
              <a
                href="#"
                className="font-bold text-white text-sm sm:text-base tracking-tight hover:opacity-80 transition-opacity"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                VVD HUSTLE
              </a>

              <div className="hidden md:flex items-center gap-6 lg:gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <a
                href="#admission"
                onClick={(e) => handleLinkClick(e, '#admission')}
                className="hidden md:inline-flex items-center px-4 py-2 text-sm border border-white/30 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                Apply Now
              </a>

              <button
                className="md:hidden p-2 text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-transform duration-500 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-xl text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#admission"
            onClick={(e) => handleLinkClick(e, '#admission')}
            className="mt-6 px-8 py-3 border border-white rounded-full text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Apply Now
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
