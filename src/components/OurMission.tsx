
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

const OurMission: React.FC = () => {
  // Add state for current slide
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Animation variants for staggered text fade-in
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Image data for the carousel
  const missionImages = [
    {
      url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      alt: "Lebanese landscape"
    },
    {
      url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      alt: "Community support"
    },
    {
      url: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      alt: "Empowerment through education"
    }
  ];

  // Auto-slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === missionImages.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [missionImages.length]);

  return (
    <section id="mission" className="py-16 bg-gradient-to-b from-empower-ivory to-white overflow-hidden relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-bold text-empower-brown mb-4"
          >
            Our Mission
          </motion.h2>
          <motion.div 
            variants={itemVariants}
            className="w-20 h-1 bg-empower-terracotta mx-auto mb-8"
          ></motion.div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <motion.p variants={itemVariants} className="text-lg text-empower-brown/90 leading-relaxed">
              EmpowEra is a team of passionate individuals dedicated to making a difference in the lives of Lebanese citizens.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-lg text-empower-brown/90 leading-relaxed">
              Our mission is to empower individuals in Lebanon, especially in Beqaa, through education, entrepreneurship, and community support.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-lg text-empower-brown/90 leading-relaxed">
              We believe that everyone deserves the opportunity to thrive and succeed, regardless of their background or circumstances.
            </motion.p>
          </motion.div>
          
          {/* Image slider/carousel with auto-sliding */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="w-full"
          >
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              {missionImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentSlide === index ? 1 : 0 }}
                  transition={{ duration: 1 }}
                >
                  <img 
                    src={image.url} 
                    alt={image.alt} 
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </motion.div>
              ))}
              
              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {missionImages.map((_, index) => (
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
