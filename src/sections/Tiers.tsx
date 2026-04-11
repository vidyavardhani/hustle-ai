import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Wrench, Rocket, Star, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  {
    id: 1,
    name: 'EXPLORERS',
    subtitle: 'Tier 1',
    age: 'Ages 6-10',
    theme: 'AI is a creative friend you learn to talk to',
    description: 'Children discover they can think with AI through stories, poems, and image play. Heavy gamification with metaphor-driven learning.',
    skills: ['AI Conversations', 'Story Creation', 'Image Generation', 'The Better Question Game'],
    outcome: 'A student who explains AI using their own analogy and has built 8-10 AI-assisted works.',
    icon: Sparkles,
    gradient: 'from-violet-500/20 via-purple-500/20 to-fuchsia-500/20',
    accent: 'text-violet-400',
    border: 'border-violet-500/30'
  },
  {
    id: 2,
    name: 'BUILDERS',
    subtitle: 'Tier 2',
    age: 'Ages 11-14',
    theme: 'AI is a powerful tool — you choose how to use it',
    description: 'Students become confident AI creators through prompt engineering, research skills, and independent projects with peer critique.',
    skills: ['Prompt Engineering', 'AI Research', 'Fact-Checking', 'Independent Projects'],
    outcome: 'A student who can run a full AI-assisted project independently and articulate their decisions.',
    icon: Wrench,
    gradient: 'from-cyan-500/20 via-blue-500/20 to-indigo-500/20',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/30'
  },
  {
    id: 3,
    name: 'INNOVATORS',
    subtitle: 'Tier 3',
    age: 'Ages 15-18',
    theme: 'AI is career-shaping — master it before the world moves on',
    description: 'Students master advanced techniques including multi-tool workflows, ethics, and building functional mini AI products.',
    skills: ['Advanced Prompting', 'Multi-tool Workflows', 'AI Ethics', 'Mini AI Products'],
    outcome: 'A student who can design professional AI workflows and has a live creator profile.',
    icon: Rocket,
    gradient: 'from-amber-500/20 via-orange-500/20 to-red-500/20',
    accent: 'text-amber-400',
    border: 'border-amber-500/30'
  }
];

const Tiers = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTier, setActiveTier] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const header = section.querySelector('.tiers-header');
    const cards = section.querySelectorAll('.tier-card');

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

    gsap.fromTo(cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
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
      id="tiers" 
      className="relative w-full min-h-screen bg-black py-16 sm:py-20 lg:py-28"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse at 10% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 90% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="tiers-header text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 mb-3 sm:mb-4">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
            <span className="text-[10px] sm:text-xs text-white/60 font-mono tracking-wider">AGE-TIERED LEARNING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            THREE TIERS. <span className="text-white/40">ONE JOURNEY.</span>
          </h2>
        </div>

        {/* Desktop: Horizontal cards */}
        <div className="hidden md:flex gap-4 lg:gap-6 h-auto min-h-[500px]">
          {tiers.map((tier, index) => {
            const isActive = activeTier === index;
            const Icon = tier.icon;

            return (
              <div 
                key={tier.id}
                className={`tier-card relative rounded-2xl lg:rounded-3xl border ${tier.border} overflow-hidden cursor-pointer transition-all duration-700 ${
                  isActive ? 'flex-[2] bg-white/10' : 'flex-1 bg-black/40 hover:bg-white/5'
                }`}
                onClick={() => setActiveTier(index)}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} transition-opacity duration-500 ${isActive ? 'opacity-60' : 'opacity-30'}`} />
                
                <div className="relative h-full p-5 lg:p-8 flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 lg:mb-6">
                    <div className={`text-[10px] sm:text-xs font-mono tracking-wider px-2.5 sm:px-3 py-1 rounded-full border ${
                      isActive ? 'bg-white/20 border-white/30 text-white' : 'bg-white/5 border-white/10 text-white/50'
                    }`}>
                      {tier.subtitle}
                    </div>
                    <div className={`text-[10px] sm:text-xs font-mono ${isActive ? 'text-white/70' : 'text-white/40'}`}>
                      {tier.age}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`mb-4 lg:mb-6 ${tier.accent}`}>
                    <div className={`absolute inset-0 blur-xl transition-opacity duration-500 ${isActive ? 'opacity-50' : 'opacity-0'}`}>
                      <Icon size={32} />
                    </div>
                    <Icon size={32} className="relative z-10" />
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl lg:text-2xl xl:text-3xl font-bold mb-2 lg:mb-3 ${isActive ? 'text-white' : 'text-white/80'}`}>
                    {tier.name}
                  </h3>

                  {/* Theme */}
                  <p className={`text-xs sm:text-sm italic mb-3 lg:mb-4 ${isActive ? 'text-white/70' : 'text-white/40'}`}>
                    &ldquo;{tier.theme}&rdquo;
                  </p>

                  {/* Expandable content */}
                  <div className={`flex-1 overflow-hidden transition-all duration-500 ${isActive ? 'opacity-100 max-h-[400px]' : 'opacity-0 max-h-0'}`}>
                    <p className="text-white/60 text-xs sm:text-sm mb-3 lg:mb-4">{tier.description}</p>
                    
                    <div className="mb-3 lg:mb-4">
                      <div className="text-[10px] sm:text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Key Skills</div>
                      <div className="flex flex-wrap gap-1.5">
                        {tier.skills.map((skill, i) => (
                          <span key={i} className="px-2 py-1 bg-white/10 text-white/80 text-[10px] sm:text-xs rounded-full border border-white/10">{skill}</span>
                        ))}
                      </div>
                    </div>

                    <div className="text-[10px] sm:text-xs text-white/50 border-t border-white/10 pt-2 lg:pt-3">
                      <span className="text-white/70 font-medium">Outcome:</span> {tier.outcome}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className={`mt-auto pt-4 flex items-center gap-2 text-xs sm:text-sm font-medium transition-all duration-300 ${isActive ? 'text-white' : 'text-white/50'}`}>
                    <span>Explore {tier.name}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'translate-x-1' : ''}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: Vertical accordion */}
        <div className="md:hidden space-y-3">
          {tiers.map((tier, index) => {
            const isActive = activeTier === index;
            const Icon = tier.icon;

            return (
              <div 
                key={tier.id}
                className={`tier-card rounded-xl border ${tier.border} overflow-hidden cursor-pointer transition-all duration-500 ${
                  isActive ? 'bg-white/10' : 'bg-black/40'
                }`}
                onClick={() => setActiveTier(index)}
              >
                <div className={`p-4 bg-gradient-to-br ${tier.gradient}`}>
                  <div className="flex items-center gap-3">
                    <div className={tier.accent}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-mono text-white/50">{tier.age}</div>
                      <h3 className={`text-lg font-bold truncate ${isActive ? 'text-white' : 'text-white/80'}`}>
                        {tier.name}
                      </h3>
                    </div>
                    <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform ${isActive ? 'rotate-90 text-white' : 'text-white/30'}`} />
                  </div>
                  
                  {isActive && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <p className="text-white/60 text-xs italic mb-2">&ldquo;{tier.theme}&rdquo;</p>
                      <p className="text-white/50 text-xs mb-3">{tier.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {tier.skills.map((skill, i) => (
                          <span key={i} className="px-2 py-0.5 bg-white/10 text-white/70 text-[10px] rounded-full">{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tab buttons */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
          {tiers.map((t, index) => {
            const Icon = t.icon;
            return (
              <button
                key={index}
                onClick={() => setActiveTier(index)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-all duration-300 ${
                  activeTier === index
                    ? 'bg-white/20 border-white/40 text-white'
                    : 'bg-transparent border-white/10 text-white/40 hover:border-white/20'
                }`}
              >
                <Icon size={14} className="sm:w-4 sm:h-4" />
                <span className="text-[10px] sm:text-xs font-medium hidden sm:inline">{t.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Tiers;
