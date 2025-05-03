
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Book, ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    "/lovable-uploads/57514e04-8524-41e5-8cbd-c63693884459.png", // Crochet workshop
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=2070&auto=format&fit=crop"  // Technology workshop
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Typing animation variables
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const fullText = "EmpowEra";
  
  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[index]);
        setIndex(index + 1);
      }, 150);
      
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  return (
    <section className="relative h-[85vh] overflow-hidden">
      {/* Image Carousel */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 1 : 0 }}
            transition={{ duration: 1 }}
            style={{
              backgroundImage: `url(${slide})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
      </div>

      {/* Content */}
      <div className="relative h-full flex items-end pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl text-white">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-2"
            >
              <h1 className="mb-2 text-4xl md:text-5xl lg:text-6xl font-bold font-poppins">
                <span className="inline-block">
                  {displayText}
                  <span className="inline-block w-[2px] h-[0.9em] bg-white animate-blink ml-1 align-middle"></span>
                </span>
              </h1>
            </motion.div>
            
            <motion.h2 
              className="mb-6 text-3xl md:text-4xl lg:text-5xl font-semibold font-poppins" 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-[#FEC6A1] via-[#FFDEE2] to-[#FDE1D3] bg-clip-text text-transparent">
                A New Era of Learning and Giving.
              </span>
            </motion.h2>
            
            <motion.p 
              className="mb-10 text-lg md:text-xl opacity-90"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              Join our vibrant community today and unlock endless opportunities to learn, create, and give back—where passion meets purpose and every click makes a difference!
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg"
                  className="bg-empower-terracotta hover:bg-empower-terracotta/90 shadow-lg"
                >
                  <Book className="mr-2 h-5 w-5" /> Explore Courses
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg"
                  className="bg-[#F97316] hover:bg-[#F97316]/90 shadow-lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> Visit Our Shop
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg"
                  className="bg-[#D946EF] hover:bg-[#D946EF]/90 shadow-lg text-white"
                >
                  <Heart className="mr-2 h-5 w-5" /> Donate Now
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={currentSlide === index ? 
              { width: "24px", transition: { duration: 0.3 } } : 
              { width: "12px", transition: { duration: 0.3 } }
            }
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
