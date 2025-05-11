
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
}

interface DonationHeroSliderProps {
  scrollToCauses: () => void;
}

const DonationHeroSlider: React.FC<DonationHeroSliderProps> = ({ scrollToCauses }) => {
  const slides: Slide[] = [
    {
      id: 1,
      title: "Support a Learner's Journey",
      subtitle: "Help unlock potential through education",
      imageUrl: "/lovable-uploads/f6ddb42e-7197-483b-b428-24ce8a62075d.png"
    },
    {
      id: 2,
      title: "Empower Women Entrepreneurs",
      subtitle: "Your donation builds sustainable futures",
      imageUrl: "/lovable-uploads/88cb08a3-5df1-4252-b772-5ebb5ed8b0d5.png"
    },
    {
      id: 3,
      title: "Support Youth Development",
      subtitle: "Invest in tomorrow's leaders today",
      imageUrl: "/lovable-uploads/c9caa428-0f2f-4648-8934-29a619641101.png"
    }
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };
  
  // Auto slide every 5 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div 
            className="w-full h-full bg-cover bg-center flex flex-col items-center justify-center text-white"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slides[currentIndex].imageUrl})` 
            }}
          >
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-center mb-3 max-w-3xl px-4"
            >
              {slides[currentIndex].title}
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-center max-w-2xl px-4 mb-8"
            >
              {slides[currentIndex].subtitle}
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button 
                onClick={scrollToCauses} 
                size="lg"
                className="bg-empower-terracotta hover:bg-empower-terracotta/90 text-white font-medium px-8 py-6 rounded-md"
              >
                Donate Now
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute inset-x-0 bottom-6 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-empower-terracotta scale-125' : 'bg-white/70'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default DonationHeroSlider;
