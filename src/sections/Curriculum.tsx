import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Palette, Award, Clock, Users, Zap, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    id: 1,
    name: 'LEARN',
    subtitle: 'Encounter + Explore',
    duration: '60 min',
    description: 'Curiosity hook, then guided AI tool activity with structured scaffolding. Students understand how AI thinks, responds, and can be directed.',
    icon: BookOpen,
    outcomes: ['Mental models', 'Prompt literacy', 'Critical awareness'],
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20',
    borderColor: 'border-emerald-500/30'
  },
  {
    id: 2,
    name: 'CREATE',
    subtitle: 'Student-Directed',
    duration: '60 min',
    description: 'Student-directed creation — personal, owned, and meaningful. Students use AI to produce original, personally meaningful work.',
    icon: Palette,
    outcomes: ['Creative confidence', 'Tool proficiency', 'Ownership'],
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/20',
    borderColor: 'border-violet-500/30'
  },
  {
    id: 3,
    name: 'EARN',
    subtitle: 'Reflect + Share',
    duration: '40 min',
    description: 'Metacognitive reflection, then public sharing with the peer group. Students earn recognition through portfolio-building.',
    icon: Award,
    outcomes: ['Real-world recognition', 'Creator identity', 'Showcasable proof'],
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
    borderColor: 'border-amber-500/30'
  }
];

const stats = [
  { value: '10', label: 'Days', icon: Clock },
  { value: '30', label: 'Hours', icon: Zap },
  { value: '3', label: 'Tiers', icon: Users },
];

const Curriculum = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const header = section.querySelector('.curriculum-header');
    const cards = section.querySelectorAll('.phase-card');
    const connector = section.querySelector('.connector');
    const statsEl = section.querySelectorAll('.stat-item');

    // Header animation
    gsap.fromTo(header,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Cards animation with stagger
    gsap.fromTo(cards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Connector animation
    gsap.fromTo(connector,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Stats animation
    gsap.fromTo(statsEl,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 40%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="curriculum" 
      className="relative w-full min-h-screen bg-black py-20 lg:py-28"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse at 30% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 40%),
              radial-gradient(ellipse at 70% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 40%),
              radial-gradient(ellipse at 50% 80%, rgba(245, 158, 11, 0.08) 0%, transparent 40%)
            `
          }}
        />
      </div>

      <div className="relative z-10 px-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="curriculum-header text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-4">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-white/60 font-mono tracking-wider">DAILY STRUCTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            <span className="text-emerald-400">LEARN</span>
            <span className="text-white/30 mx-2 sm:mx-4">→</span>
            <span className="text-violet-400">CREATE</span>
            <span className="text-white/30 mx-2 sm:mx-4">→</span>
            <span className="text-amber-400">EARN</span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto">
            Every day follows this proven 3-phase learning model. Not just at the end — every single day.
          </p>
        </div>

        {/* Phase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {phases.map((phase) => {
            const Icon = phase.icon;

            return (
              <div 
                key={phase.id}
                className={`phase-card rounded-2xl border ${phase.borderColor} bg-white/5 backdrop-blur-sm overflow-hidden hover:bg-white/10 transition-all duration-300`}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className={`text-4xl sm:text-5xl font-bold ${phase.color}`}>
                      0{phase.id}
                    </span>
                    <div className={`p-3 rounded-xl ${phase.bgColor}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl font-bold mb-1 ${phase.color}`}>
                    {phase.name}
                  </h3>

                  {/* Subtitle */}
                  <div className="flex items-center gap-2 text-xs text-white/40 mb-4">
                    <span>{phase.subtitle}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span>{phase.duration}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/60 mb-5">
                    {phase.description}
                  </p>

                  {/* Outcomes */}
                  <div className="flex flex-wrap gap-2">
                    {phase.outcomes.map((outcome, i) => (
                      <span 
                        key={i} 
                        className={`px-3 py-1.5 ${phase.bgColor} text-white/80 text-xs rounded-full`}
                      >
                        {outcome}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Connector - desktop only */}
        <div className="connector hidden md:flex justify-center items-center mb-10 origin-left">
          <div className="flex items-center gap-4">
            <div className="w-24 h-[2px] bg-gradient-to-r from-emerald-500/50 to-violet-500/50" />
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <ArrowRight className="w-5 h-5 text-white/60" />
            </div>
            <div className="w-24 h-[2px] bg-gradient-to-r from-violet-500/50 to-amber-500/50" />
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-12 sm:gap-16 md:gap-24">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="stat-item text-center">
                <div className="flex items-center justify-center gap-2 text-white/40 mb-2">
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase">{stat.label}</span>
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Curriculum;
