import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiAnimationProps {
  trigger: boolean;
  onComplete?: () => void;
}

export function ConfettiAnimation({ trigger, onComplete }: ConfettiAnimationProps) {
  useEffect(() => {
    if (!trigger) return;

    // Portfolio-themed confetti colors matching the design
    const colors = [
      '#3b82f6', // blue-500
      '#8b5cf6', // purple-500
      '#10b981', // emerald-500
      '#06b6d4', // cyan-500
      '#f59e0b', // amber-500
      '#ef4444', // red-500
    ];

    // First burst - celebration explosion
    const firstBurst = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
        shapes: ['circle', 'square'],
        scalar: 1.2,
        drift: 0,
        gravity: 0.8,
        ticks: 200,
      });
    };

    // Second burst - side cannons
    const sideCannons = () => {
      const end = Date.now() + 1000;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: colors,
          shapes: ['circle'],
          scalar: 0.8,
        });
        
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: colors,
          shapes: ['circle'],
          scalar: 0.8,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    };

    // Third burst - gentle rain
    const gentleRain = () => {
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 100,
          origin: { y: 0.3 },
          colors: colors,
          shapes: ['circle'],
          scalar: 0.6,
          drift: 0.1,
          gravity: 0.3,
          ticks: 300,
        });
      }, 500);
    };

    // Execute the sequence
    firstBurst();
    setTimeout(sideCannons, 200);
    gentleRain();

    // Call onComplete after all animations
    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, 2500);

    return () => {
      clearTimeout(completeTimer);
    };
  }, [trigger, onComplete]);

  return null; // This component doesn't render anything visible
}

// Utility function for quick confetti burst
export const triggerSuccessConfetti = () => {
  const colors = [
    '#3b82f6', // blue-500
    '#8b5cf6', // purple-500
    '#10b981', // emerald-500
    '#06b6d4', // cyan-500
  ];

  // Quick success burst
  confetti({
    particleCount: 80,
    spread: 60,
    origin: { y: 0.7 },
    colors: colors,
    shapes: ['circle', 'square'],
    scalar: 1,
    gravity: 0.9,
    ticks: 150,
  });

  // Follow-up sparkles
  setTimeout(() => {
    confetti({
      particleCount: 30,
      spread: 80,
      origin: { y: 0.4 },
      colors: colors,
      shapes: ['circle'],
      scalar: 0.7,
      gravity: 0.4,
      ticks: 200,
    });
  }, 300);
};
