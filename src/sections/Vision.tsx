import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Vision = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [line3, setLine3] = useState('');
  const hasAnimated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Text scramble function
    const scrambleText = (
      setText: React.Dispatch<React.SetStateAction<string>>, 
      finalText: string, 
      delay: number
    ) => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let iteration = 0;
      
      setTimeout(() => {
        const interval = setInterval(() => {
          setText(
            finalText
              .split('')
              .map((char, index) => {
                if (char === ' ') return ' ';
                if (index < iteration) return finalText[index];
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join('')
          );
          iteration += 0.5;
          if (iteration >= finalText.length) {
            clearInterval(interval);
            setText(finalText);
          }
        }, 40);
      }, delay);
    };

    // Scroll trigger for animation
    ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        
        scrambleText(setLine1, 'AI IS RESHAPING', 0);
        scrambleText(setLine2, 'THE WORLD', 300);
        scrambleText(setLine3, 'ARE YOU READY TO BUILD IT?', 600);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="vision" 
      className="relative w-full min-h-screen bg-black flex items-center justify-center py-16 sm:py-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(80,80,120,0.2) 0%, transparent 60%)'
          }}
        />
      </div>

      {/* Floating cube decoration - hidden on mobile */}
      <div className="absolute right-[5%] sm:right-[10%] top-[15%] w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 opacity-40 hidden sm:block" style={{ perspective: '800px' }}>
        <div 
          className="w-full h-full relative"
          style={{ 
            transformStyle: 'preserve-3d',
            animation: 'cubeRotate 10s linear infinite'
          }}
        >
          {[
            { transform: 'translateZ(20px)' },
            { transform: 'translateZ(-20px) rotateY(180deg)' },
            { transform: 'translateX(20px) rotateY(90deg)' },
            { transform: 'translateX(-20px) rotateY(-90deg)' },
            { transform: 'translateY(-20px) rotateX(90deg)' },
            { transform: 'translateY(20px) rotateX(-90deg)' },
          ].map((face, i) => (
            <div 
              key={i} 
              className="absolute inset-0 border border-white/20"
              style={{ transform: face.transform, backfaceVisibility: 'visible' }} 
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="overflow-hidden mb-1 sm:mb-2">
          <div 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tighter"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {line1 || 'AI IS RESHAPING'}
          </div>
        </div>

        <div className="overflow-hidden mb-4 sm:mb-6">
          <div 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tighter"
            style={{ 
              fontFamily: 'Space Grotesk, sans-serif',
              textShadow: '0 0 40px rgba(255,255,255,0.15)'
            }}
          >
            {line2 || 'THE WORLD'}
          </div>
        </div>

        <div className="overflow-hidden">
          <div 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 tracking-wide"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {line3 || 'ARE YOU READY TO BUILD IT?'}
          </div>
        </div>

        {/* Decorative line */}
        <div className="mt-8 sm:mt-12 flex justify-center items-center gap-3 sm:gap-4">
          <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
          <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>
      </div>

      <style>{`
        @keyframes cubeRotate {
          0% { transform: rotateX(15deg) rotateY(0deg); }
          100% { transform: rotateX(15deg) rotateY(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Vision;
