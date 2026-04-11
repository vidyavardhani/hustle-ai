import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Twitter, Award, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const instructors = [
  {
    id: 1,
    name: 'ANKUR GURJAR',
    role: 'Chief Technology Officer',
    bio: 'IIT Kharagpur graduate with extensive experience in AI systems architecture. Leading technical innovation and curriculum development.',
    image: '/instructor-ankur.png',
    stats: ['IIT Kharagpur', 'CTO', 'AI Architect']
  },
];

const Instructors = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const header = section.querySelector('.instructors-header');
    const cards = section.querySelectorAll('.instructor-card');

    gsap.fromTo(header,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    cards.forEach((card, index) => {
      const image = card.querySelector('.instructor-image');
      const content = card.querySelector('.instructor-content');
      const stats = card.querySelectorAll('.stat-badge');

      gsap.fromTo(image,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(content,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.15 + 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(stats,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          delay: index * 0.15 + 0.35,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="instructors"
      className="relative w-full min-h-screen bg-black py-16 sm:py-20 lg:py-28"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse at 10% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 90% 80%, rgba(6, 182, 212, 0.08) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="instructors-header text-center mb-10 sm:mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 mb-3 sm:mb-4">
            <Award className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
            <span className="text-[10px] sm:text-xs text-white/60 font-mono tracking-wider">WORLD-CLASS GUIDE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-3 sm:mb-4">
            INSTRUCTORS
          </h2>
          <p className="text-white/50 text-sm sm:text-base max-w-md mx-auto">
            Learn from industry leaders who have built AI systems at the world&apos;s most innovative companies.
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="gap-10 sm:gap-8 lg:gap-12">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="instructor-card flex flex-col items-center text-center"
            >
              {/* Image */}
              <div className="relative mb-5 sm:mb-6 lg:mb-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/30 to-cyan-500/30 blur-2xl scale-110" />

                <div className="instructor-image relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 overflow-hidden rounded-full">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-full object-cover object-top grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1 sm:py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 whitespace-nowrap">
                  <span className="text-[10px] sm:text-xs font-mono text-white/80">{instructor.role}</span>
                </div>
              </div>

              {/* Content */}
              <div className="instructor-content">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
                  {instructor.name}
                </h3>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center mb-3 sm:mb-4">
                  {instructor.stats.map((stat, i) => (
                    <span
                      key={i}
                      className="stat-badge px-2 sm:px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] sm:text-xs text-white/70 flex items-center gap-1"
                    >
                      {i === 0 && <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                      {stat}
                    </span>
                  ))}
                </div>

                <p className="text-white/50 text-xs sm:text-sm max-w-xs mb-4 sm:mb-5">
                  {instructor.bio}
                </p>

                {/* Social Links */}
                <div className="flex gap-2 sm:gap-3 justify-center">
                  <a href="https://www.linkedin.com/in/aliveankur/" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white hover:text-black transition-all duration-300 hover:scale-110">
                    <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />

                  </a>
                  <a href="https://x.com/a_liveankur" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white hover:text-black transition-all duration-300 hover:scale-110">
                    <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructors;
