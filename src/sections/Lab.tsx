import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Eye, Ear, Layers, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const labItems = [
  {
    id: 1,
    title: 'NLP',
    fullTitle: 'Natural Language Processing',
    description: 'Chatbots, sentiment analysis, text generation, and conversational AI systems.',
    icon: Brain,
    color: 'from-pink-500 to-rose-500',
    projects: ['Conversational AI', 'Text Summarization']
  },
  {
    id: 2,
    title: 'VISION',
    fullTitle: 'Computer Vision',
    description: 'Object detection, image generation, facial recognition, and medical imaging.',
    icon: Eye,
    color: 'from-cyan-500 to-blue-500',
    projects: ['Object Detection', 'Image Generation']
  },
  {
    id: 3,
    title: 'AUDIO',
    fullTitle: 'Audio & Speech',
    description: 'Speech recognition, music generation, voice cloning, and audio enhancement.',
    icon: Ear,
    color: 'from-emerald-500 to-teal-500',
    projects: ['Speech Recognition', 'Music Generation']
  },
  {
    id: 4,
    title: 'MULTIMODAL',
    fullTitle: 'Multimodal AI',
    description: 'Combine text, images, and audio for powerful cross-modal applications.',
    icon: Layers,
    color: 'from-violet-500 to-purple-500',
    projects: ['Image Captioning', 'Video Analysis']
  }
];

const Lab = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const header = section.querySelector('.lab-header');
      const stage = section.querySelector('.lab-stage');
      const dots = section.querySelector('.lab-dots');
      const mobileGrid = section.querySelector('.lab-mobile-grid');

      gsap.set([header, stage, dots, mobileGrid], { autoAlpha: 0 });
      gsap.set(header, { y: 36 });
      gsap.set([stage, mobileGrid], { y: 28, scale: 0.96 });
      gsap.set(dots, { y: 18 });

      const cardPhaseStart = 0.2;
      const cardPhaseEnd = 0.78;

      const scrollTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=240vh',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const phasedProgress = gsap.utils.clamp(
              0,
              1,
              (self.progress - cardPhaseStart) / (cardPhaseEnd - cardPhaseStart)
            );
            const nextIndex = Math.min(
              Math.round(phasedProgress * (labItems.length - 1)),
              labItems.length - 1
            );

            setRotation(phasedProgress * 270);
            setActiveIndex(nextIndex);
          }
        }
      });

      scrollTl
        .to(header, { autoAlpha: 1, y: 0, duration: 0.14 }, 0)
        .to(stage, { autoAlpha: 1, y: 0, scale: 1, duration: 0.18 }, 0.06)
        .to(mobileGrid, { autoAlpha: 1, y: 0, scale: 1, duration: 0.18 }, 0.06)
        .to(dots, { autoAlpha: 1, y: 0, duration: 0.14 }, 0.1)
        .to(stage, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: 'none' }, 0.2)
        .to([header, stage, dots, mobileGrid], {
          autoAlpha: 0,
          y: -36,
          duration: 0.2,
          ease: 'power2.in'
        }, 0.82);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="lab" className="relative w-full h-[80svh] min-h-9/10 bg-black overflow-hidden">
      {/* Background */}

      <div className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between px-4 py-20 sm:px-6 sm:py-20 lg:px-8 lg:py-20">
        <div className="lab-header mx-auto w-full max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-2 sm:mb-4">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-violet-400" />
            <span className="text-[10px] sm:text-xs text-white/60 font-mono tracking-wider">EXPERIMENTAL PROJECTS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400">LAB</span>
          </h2>
        </div>

        <div className="lab-stage flex flex-1 items-center justify-center overflow-hidden py-4 sm:py-6 lg:py-8">
          <div
            className="hidden md:block w-full max-w-5xl mx-auto px-4"
            style={{ perspective: '1000px' }}
          >
            <div className="relative mx-auto h-[min(22rem,46vh)] sm:h-[min(24rem,48vh)] lg:h-[min(28rem,54vh)] max-w-4xl">
              <div
                className="absolute inset-0 flex items-center justify-center transition-transform duration-150"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${rotation}deg)`,
                }}
              >
                {labItems.map((item, index) => {
                  const angle = (index / labItems.length) * 360;
                  const isActive = index === activeIndex;
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.id}
                      className="absolute w-52 sm:w-60 lg:w-72 transition-all duration-500"
                      style={{
                        transform: `rotateY(${angle}deg) translateZ(clamp(9rem, 20vw, 12rem))`,
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'hidden'
                      }}
                    >
                      <div className={`relative p-4 sm:p-5 lg:p-6 rounded-2xl border transition-all duration-500 ${isActive
                        ? 'bg-white/10 border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.1)]'
                        : 'bg-black/60 border-white/10'
                        }`}>
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-0 transition-opacity duration-500 ${isActive ? 'opacity-15' : ''}`} />

                        <div className="relative">
                          <div className={`mb-3 sm:mb-4 relative ${isActive ? 'text-white' : 'text-white/40'}`}>
                            <div className={`absolute inset-0 blur-xl bg-gradient-to-r ${item.color} transition-opacity duration-500 ${isActive ? 'opacity-50' : 'opacity-0'}`} />
                            <Icon className="w-6 h-6 sm:w-8 sm:h-8 relative z-10" />
                          </div>

                          <div className={`text-[10px] sm:text-xs font-mono mb-1 ${isActive ? 'text-white/60' : 'text-white/30'}`}>
                            {item.fullTitle}
                          </div>

                          <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold mb-2 ${isActive ? 'text-white' : 'text-white/60'}`}>
                            {item.title}
                          </h3>

                          <p className={`text-xs sm:text-sm mb-3 sm:mb-4 ${isActive ? 'text-white/70' : 'text-white/40'}`}>
                            {item.description}
                          </p>

                          <div className="flex flex-wrap gap-1 sm:gap-1.5">
                            {item.projects.slice(0, isActive ? 4 : 2).map((project, i) => (
                              <span key={i} className={`px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full border transition-all duration-300 ${isActive
                                ? `bg-gradient-to-r ${item.color} bg-opacity-20 text-white border-white/20`
                                : 'bg-white/5 text-white/40 border-white/10'
                                }`}>
                                {project}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/20" />
              </div>
            </div>
          </div>

          <div className="lab-mobile-grid md:hidden w-full max-w-sm mx-auto px-1">
            <div className="grid grid-cols-2 gap-3">
              {labItems.map((item, index) => {
                const isActive = index === activeIndex;
                const Icon = item.icon;

                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl border transition-all duration-300 ${isActive
                      ? 'bg-white/10 border-white/30'
                      : 'bg-black/40 border-white/10'
                      }`}
                  >
                    <div className={`mb-2 ${isActive ? 'text-white' : 'text-white/50'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className={`text-sm font-bold mb-1 ${isActive ? 'text-white' : 'text-white/70'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-[10px] ${isActive ? 'text-white/60' : 'text-white/40'}`}>
                      {item.description.slice(0, 50)}...
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lab-dots mx-auto flex w-full max-w-5xl justify-center gap-2 sm:gap-3">
          {labItems.map((item, index) => {
            const isActive = index === activeIndex;
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border transition-all duration-300 ${isActive
                  ? 'bg-white/20 border-white/40 text-white'
                  : 'bg-transparent border-white/10 text-white/40 hover:border-white/20'
                  }`}
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-[10px] sm:text-xs font-medium hidden sm:inline">{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Lab;
