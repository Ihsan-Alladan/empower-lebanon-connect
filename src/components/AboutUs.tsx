
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AboutUs: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('about');
      if (!element) return;
      
      const position = element.getBoundingClientRect();
      
      // If section is in viewport
      if (position.top < window.innerHeight && position.bottom >= 0) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const imageContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", damping: 12 }
    }
  };

  // New images for the About section
  const aboutImages = [
    { url: "/lovable-uploads/lovable-uploads/course.webp", alt: "Woman on laptop", border: "border-[#F97316]" },
    { url: "/lovable-uploads/lovable-uploads/donation1.webp", alt: "Donation image", border: "border-[#D946EF]" },
    { url: "/lovable-uploads/lovable-uploads/shop10.gif", alt: "Colorful code", border: "border-[#1EAEDB]" },
    { url: "/lovable-uploads/lovable-uploads/shop8.png", alt: "Matrix code", border: "border-[#F97316]" },
    { url: "/lovable-uploads/lovable-uploads/course2.webp", alt: "Course image", border: "border-[#ea384c]" },
    { url: "/lovable-uploads/lovable-uploads/shop11.gif", alt: "Group around screens", border: "border-[#D946EF]" }
  ];

  return (
    <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gradient text-gradient-pink font-poppins mb-2 text-shadow-pop">
            About Us
          </h2>
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-[#D946EF] via-[#F97316] to-[#1EAEDB] mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div 
            className="order-2 md:order-1"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <motion.p 
              variants={itemVariants} 
              className="text-lg mb-6 text-empower-brown leading-relaxed"
            >
              EmpowEra is where passion meets purpose. We're on a mission to transform lives by turning creativity into opportunity. Through hands-on courses in handmade crafts and digital skills, we help individuals unlock their potential and earn a living doing what they love.
            </motion.p>
            <motion.p 
              variants={itemVariants}
              className="text-lg mb-6 text-empower-brown leading-relaxed"
            >
              Our built-in marketplace breaks down barriers, connecting makers directly with buyers, just meaningful support. Beyond learning and selling, EmpowEra sparks connection through community events, workshops, and inspiring talks.
            </motion.p>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-empower-brown leading-relaxed"
            >
              EmpowEra is a movement. One that aims to uplift communities, unlock talent, and create real change. Join us and be part of something powerful.
            </motion.p>
          </motion.div>

          {/* Updated Image Gallery with new images */}
          <motion.div 
            className="order-1 md:order-2 grid grid-cols-3 gap-3"
            variants={imageContainerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <div className="space-y-3">
              <motion.div 
                className="overflow-hidden rounded-lg shadow-md border-2 border-[#F97316] transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                variants={imageVariants}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <img 
                  src={aboutImages[0].url}
                  alt={aboutImages[0].alt}
                  className="w-full h-40 object-cover transition-all duration-700 hover:scale-110"
                  loading="lazy"
                />
              </motion.div>
              <motion.div 
                className="overflow-hidden rounded-lg shadow-md border-2 border-[#D946EF] transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                variants={imageVariants}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <img 
                  src={aboutImages[1].url}
                  alt={aboutImages[1].alt}
                  className="w-full h-32 object-cover transition-all duration-700 hover:scale-110"
                  loading="lazy"
                />
              </motion.div>
            </div>
            
            <div className="space-y-3">
              <motion.div 
                className="overflow-hidden rounded-lg shadow-md border-2 border-[#1EAEDB] transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                variants={imageVariants}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <img 
                  src={aboutImages[2].url}
                  alt={aboutImages[2].alt}
                  className="w-full h-32 object-cover transition-all duration-700 hover:scale-110"
                  loading="lazy"
                />
              </motion.div>
              <motion.div 
                className="overflow-hidden rounded-lg shadow-md border-2 border-[#F97316] transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                variants={imageVariants}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <img 
                  src={aboutImages[3].url}
                  alt={aboutImages[3].alt}
                  className="w-full h-40 object-cover transition-all duration-700 hover:scale-110"
                  loading="lazy"
                />
              </motion.div>
            </div>
            
            <div className="space-y-3">
              <motion.div 
                className="overflow-hidden rounded-lg shadow-md border-2 border-[#ea384c] transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                variants={imageVariants}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <img 
                  src={aboutImages[4].url}
                  alt={aboutImages[4].alt}
                  className="w-full h-40 object-cover transition-all duration-700 hover:scale-110"
                  loading="lazy"
                />
              </motion.div>
              <motion.div 
                className="overflow-hidden rounded-lg shadow-md border-2 border-[#D946EF] transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                variants={imageVariants}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <img 
                  src={aboutImages[5].url}
                  alt={aboutImages[5].alt}
                  className="w-full h-32 object-cover transition-all duration-700 hover:scale-110"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
