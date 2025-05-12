
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

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

  // Updated Image data for the carousel
  const missionImages = [
    {
      url: "/lovable-uploads/lovable-uploads/team.webp",
      alt: "Team collaboration"
    },
    {
      url: "/lovable-uploads/lovable-uploads/team1.webp",
      alt: "Team meeting"
    },
    {
      url: "/lovable-uploads/lovable-uploads/technologyW1.jpg",
      alt: "Technology workshop"
    },
    {
      url: "/lovable-uploads/lovable-uploads/technologyW2.jpg",
      alt: "Technology education"
    },
    {
      url: "/lovable-uploads/lovable-uploads/workshop1.avif",
      alt: "Creative workshop"
    },
    {
      url: "/lovable-uploads/lovable-uploads/workshop2.webp",
      alt: "Educational workshop"
    }
  ];

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
          
          {/* Image slider/carousel with updated images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="w-full"
          >
            <Carousel className="w-full">
              <CarouselContent>
                {missionImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative overflow-hidden rounded-lg shadow-lg p-1">
                      <img 
                        src={image.url} 
                        alt={image.alt} 
                        className="w-full h-80 object-cover rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 bg-empower-terracotta text-white border-none hover:bg-empower-brown" />
              <CarouselNext className="right-2 bg-empower-terracotta text-white border-none hover:bg-empower-brown" />
            </Carousel>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
