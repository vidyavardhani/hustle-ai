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

      // 🔥 FIX 1: Less offset → faster visible
      gsap.set([header, stage, dots, mobileGrid], { autoAlpha: 0 });
      gsap.set(header, { y: 16 });
      gsap.set([stage, mobileGrid], { y: 12, scale: 0.98 });
      gsap.set(dots, { y: 10 });

      const cardPhaseStart = 0.1;   // 🔥 earlier
      const cardPhaseEnd = 0.75;    // smoother spread

      const scrollTl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: section,

          // 🔥 FIX 2: start earlier (pre-reveal)
          start: 'top 85%',

          // 🔥 FIX 3: shorter scroll distance
          end: '+=130vh',

          pin: true,

          // 🔥 FIX 4: faster response
          scrub: 0.2,

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

      // 🔥 FIX 5: no delay between elements (instant reveal)
      scrollTl
        .to(header, { autoAlpha: 1, y: 0, duration: 0.25 }, 0)
        .to(stage, { autoAlpha: 1, y: 0, scale: 1, duration: 0.25 }, 0)
        .to(mobileGrid, { autoAlpha: 1, y: 0, scale: 1, duration: 0.25 }, 0)
        .to(dots, { autoAlpha: 1, y: 0, duration: 0.25 }, 0)

        // smooth holding phase
        .to(stage, { scale: 1, duration: 0.5, ease: 'none' }, 0.2)

        // exit animation
        .to([header, stage, dots, mobileGrid], {
          autoAlpha: 0,
          y: -24,
          duration: 0.25,
          ease: 'power1.in'
        }, 0.85);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="lab"
      className="relative w-full h-[80svh] min-h-9/10 bg-black overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between px-4 py-20 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="lab-header mx-auto w-full max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-4">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-xs text-white/60 font-mono tracking-wider">
              EXPERIMENTAL PROJECTS
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            THE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400">
              LAB
            </span>
          </h2>
        </div>

        {/* STAGE */}
        <div className="lab-stage flex flex-1 items-center justify-center overflow-hidden py-6">

          {/* DESKTOP */}
          <div className="hidden md:block w-full max-w-5xl mx-auto px-4" style={{ perspective: '1000px' }}>
            <div className="relative mx-auto h-[50vh] max-w-4xl">

              <div
                className="absolute inset-0 flex items-center justify-center transition-transform duration-150"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${rotation}deg)`
                }}
              >
                {labItems.map((item, index) => {
                  const angle = (index / labItems.length) * 360;
                  const isActive = index === activeIndex;
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.id}
                      className="absolute w-64 transition-all duration-400"
                      style={{
                        transform: `rotateY(${angle}deg) translateZ(12rem)`
                      }}
                    >
                      <div className={`p-5 rounded-2xl border transition-all duration-400 ${
                        isActive
                          ? 'bg-white/10 border-white/30 shadow-xl'
                          : 'bg-black/60 border-white/10'
                      }`}>
                        <Icon className={`mb-3 ${isActive ? 'text-white' : 'text-white/40'}`} />

                        <h3 className={`text-xl font-bold ${
                          isActive ? 'text-white' : 'text-white/60'
                        }`}>
                          {item.title}
                        </h3>

                        <p className="text-sm text-white/60">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* MOBILE */}
          <div className="lab-mobile-grid md:hidden w-full max-w-sm mx-auto">
            <div className="grid grid-cols-2 gap-3">
              {labItems.map((item, index) => {
                const isActive = index === activeIndex;
                const Icon = item.icon;

                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl border ${
                      isActive
                        ? 'bg-white/10 border-white/30'
                        : 'bg-black/40 border-white/10'
                    }`}
                  >
                    <Icon className="mb-2" />
                    <h3 className="text-sm font-bold">{item.title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* DOTS */}
        <div className="lab-dots flex justify-center gap-3">
          {labItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === activeIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Lab;
