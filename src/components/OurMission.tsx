
import React from 'react';
import { motion } from 'framer-motion';

const OurMission: React.FC = () => {
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.7 }
    }
  };

  return (
    <section id="mission" className="py-16 bg-gradient-to-b from-empower-ivory to-white overflow-hidden relative">
      {/* Decorative circles in the background */}
      <div className="absolute top-20 left-10 w-48 h-48 rounded-full bg-empower-gold/10 mix-blend-multiply animate-pulse"></div>
      <div className="absolute bottom-40 right-10 w-32 h-32 rounded-full bg-empower-terracotta/10 mix-blend-multiply animate-pulse"></div>
      
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
              <span className="font-semibold text-empower-terracotta">EmpowEra</span> is a team of passionate individuals dedicated to making a difference in the lives of Lebanese citizens.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-lg text-empower-brown/90 leading-relaxed">
              Our mission is to <span className="highlight-blue">empower individuals</span> in Lebanon, especially in Beqaa, through education, entrepreneurship, and community support.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-lg text-empower-brown/90 leading-relaxed">
              We believe that everyone deserves the <span className="text-gradient text-gradient-blue">opportunity to thrive and succeed</span>, regardless of their background or circumstances.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 mt-8"
            >
              <span className="bg-empower-ivory px-4 py-2 rounded-full text-empower-brown border-2 border-empower-terracotta/20 shadow-sm">Education</span>
              <span className="bg-empower-ivory px-4 py-2 rounded-full text-empower-brown border-2 border-empower-gold/20 shadow-sm">Entrepreneurship</span>
              <span className="bg-empower-ivory px-4 py-2 rounded-full text-empower-brown border-2 border-empower-terracotta/20 shadow-sm">Community</span>
              <span className="bg-empower-ivory px-4 py-2 rounded-full text-empower-brown border-2 border-empower-gold/20 shadow-sm">Support</span>
            </motion.div>
          </motion.div>
          
          {/* Image collage */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 gap-4 relative p-2"
          >
            {/* Large central image with border animation */}
            <motion.div 
              variants={imageVariants} 
              className="col-span-2 relative overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-empower-terracotta/30 to-transparent mix-blend-overlay"></div>
              <img 
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Lebanese landscape" 
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 border-2 border-white/30 rounded-lg"></div>
            </motion.div>
            
            {/* Smaller supporting images */}
            <motion.div 
              variants={imageVariants} 
              className="overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
            >
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Community support" 
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>
            
            <motion.div 
              variants={imageVariants} 
              className="overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
            >
              <img 
                src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Empowerment through education" 
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
