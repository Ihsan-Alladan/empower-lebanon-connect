
import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface ColorfulConfettiProps {
  duration?: number;
  particleCount?: number;
}

const ColorfulConfetti: React.FC<ColorfulConfettiProps> = ({
  duration = 3000,
  particleCount = 150,
}) => {
  const confettiRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!confettiRef.current) return;
    
    const myConfetti = confetti.create(confettiRef.current, {
      resize: true,
      useWorker: true,
    });
    
    const colors = ['#D946EF', '#F97316', '#10B981', '#FACC15', '#3B82F6'];
    
    const end = Date.now() + duration;
    
    const confettiInterval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(confettiInterval);
        return;
      }
      
      // Launch confetti from the left and right edges
      myConfetti({
        particleCount: particleCount / 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors,
      });
      
      myConfetti({
        particleCount: particleCount / 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors,
      });
      
    }, 250);
    
    return () => {
      clearInterval(confettiInterval);
    };
  }, [duration, particleCount]);

  return (
    <canvas
      ref={confettiRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default ColorfulConfetti;
