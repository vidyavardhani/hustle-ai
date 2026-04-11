import { useCallback, useRef } from 'react';
import gsap from 'gsap';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export const useTextScramble = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = useCallback((
    element: HTMLElement,
    finalText: string,
    duration: number = 1.5,
    onComplete?: () => void
  ) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const textLength = finalText.length;
    let iteration = 0;
    const totalIterations = textLength * 3;
    const intervalTime = (duration * 1000) / totalIterations;

    intervalRef.current = setInterval(() => {
      element.innerText = finalText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration / 3) {
            return finalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      iteration++;

      if (iteration >= totalIterations) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        element.innerText = finalText;
        onComplete?.();
      }
    }, intervalTime);
  }, []);

  const decode = useCallback((
    element: HTMLElement,
    finalText: string,
    duration: number = 1
  ) => {
    gsap.to(element, {
      opacity: 1,
      duration: 0.1,
      onStart: () => scramble(element, finalText, duration)
    });
  }, [scramble]);

  return { scramble, decode };
};

export default useTextScramble;
