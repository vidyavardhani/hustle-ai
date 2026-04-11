import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const LoadingScreen = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const progress = progressRef.current;
    if (!container || !progress) return;

    // Progress bar animation
    gsap.to(progress, {
      width: '100%',
      duration: 1.5,
      ease: 'power2.inOut'
    });

    // Exit animation
    const exitTl = gsap.timeline({ delay: 1.8 });
    
    exitTl
      .to(container, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      })
      .set(container, { display: 'none' })
      .call(() => setIsLoading(false));

    return () => {
      exitTl.kill();
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
    >
      <div className="relative z-10 w-56 sm:w-64">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
            Learn By Earning
          </div>
          <div className="text-[10px] text-white/40 font-mono tracking-widest">ACADEMY</div>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div ref={progressRef} className="h-full bg-white w-0 rounded-full" />
        </div>

        {/* Loading text */}
        <div className="text-center mt-4">
          <div className="font-mono text-xs tracking-[0.2em] text-white/40">
            LOADING EXPERIENCE
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
