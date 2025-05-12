
import React, { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { useLocation } from 'react-router-dom';
import { Heart, Award, BookOpen, Users } from 'lucide-react';
import DonationHeroSlider from '@/components/donations/DonationHeroSlider';
import DonationCauseCard, { DonationCause } from '@/components/donations/DonationCauseCard';
import DonationRecentDonors from '@/components/donations/DonationRecentDonors';
import { motion } from 'framer-motion';

const Donate: React.FC = () => {
  const location = useLocation();
  const causesRef = useRef<HTMLDivElement>(null);
  
  const scrollToCauses = () => {
    causesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Sample causes data
  const causes: DonationCause[] = [
    {
      id: 'edu-tech',
      title: "Fund Women's Coding Courses",
      description: "Help women develop tech skills that lead to sustainable careers and economic independence.",
      imageUrl: "/lovable-uploads/lovable-uploads/best_free_coding_courses_for_women_in_london_women_who_code.jpg",
      currentAmount: 8750,
      goalAmount: 15000,
      suggestedAmount: 50
    },
    {
      id: 'youth-dev',
      title: "Youth Leadership Program",
      description: "Support workshops that build confidence and leadership skills for underserved youth.",
      imageUrl: "/lovable-uploads/lovable-uploads/BenefitsOfYouthLeadershipPrograms-300x175 (2).png",
      currentAmount: 4200,
      goalAmount: 10000,
      suggestedAmount: 35
    },
    {
      id: 'entrepreneur',
      title: "Small Business Grants",
      description: "Provide seed funding to help local entrepreneurs start sustainable businesses.",
      imageUrl: "/lovable-uploads/lovable-uploads/shutterstock_1931936252-1030x687.jpg",
      currentAmount: 12500,
      goalAmount: 20000,
      suggestedAmount: 75
    },
    {
      id: 'education',
      title: "School Supplies Drive",
      description: "Help provide essential learning materials to students in underserved communities.",
      imageUrl: "/lovable-uploads/dccc32b9-798a-4692-9816-6e03d3cfedf2.png",
      currentAmount: 3800,
      goalAmount: 8000,
      suggestedAmount: 25
    },
    {
      id: 'community-center',
      title: "Community Center Renovation",
      description: "Support the renovation of our community center to create more learning spaces.",
      imageUrl: "/lovable-uploads/lovable-uploads/maple-grove-community-center-rendering.jpg",
      currentAmount: 25000,
      goalAmount: 50000,
      suggestedAmount: 100
    },
    {
      id: 'emergency-aid',
      title: "Emergency Relief Fund",
      description: "Provide immediate assistance to community members facing unexpected hardship.",
      imageUrl: "/lovable-uploads/lovable-uploads/Student-Emergency-Relief-Fund-DRAFT.jpg",
      currentAmount: 7500,
      goalAmount: 15000,
      suggestedAmount: 45
    }
  ];
  
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageTransition route={location.pathname}>
        <main className="flex-1">
          {/* Hero Slider */}
          <DonationHeroSlider scrollToCauses={scrollToCauses} />
          
          {/* Impact Summary */}
          <section className="py-12 bg-empower-ivory/30">
            <div className="container mx-auto px-4">
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
                initial="hidden"
                whileInView="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.2 } }
                }}
                viewport={{ once: true }}
              >
                <motion.div variants={fadeInUpVariants} className="p-6">
                  <div className="mb-4 mx-auto bg-empower-terracotta/10 w-16 h-16 rounded-full flex items-center justify-center">
                    <Heart className="text-empower-terracotta w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-empower-brown">10,000+</h3>
                  <p className="text-gray-600">Lives Impacted</p>
                </motion.div>
                
                <motion.div variants={fadeInUpVariants} className="p-6">
                  <div className="mb-4 mx-auto bg-empower-terracotta/10 w-16 h-16 rounded-full flex items-center justify-center">
                    <BookOpen className="text-empower-terracotta w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-empower-brown">250+</h3>
                  <p className="text-gray-600">Education Programs</p>
                </motion.div>
                
                <motion.div variants={fadeInUpVariants} className="p-6">
                  <div className="mb-4 mx-auto bg-empower-terracotta/10 w-16 h-16 rounded-full flex items-center justify-center">
                    <Award className="text-empower-terracotta w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-empower-brown">52</h3>
                  <p className="text-gray-600">Community Partners</p>
                </motion.div>
                
                <motion.div variants={fadeInUpVariants} className="p-6">
                  <div className="mb-4 mx-auto bg-empower-terracotta/10 w-16 h-16 rounded-full flex items-center justify-center">
                    <Users className="text-empower-terracotta w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-empower-brown">85%</h3>
                  <p className="text-gray-600">Women & Youth</p>
                </motion.div>
              </motion.div>
            </div>
          </section>
          
          {/* Causes Section */}
          <section ref={causesRef} className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl font-bold text-empower-brown mb-4">Support Our Causes</h2>
                <div className="w-20 h-1 bg-empower-terracotta mx-auto mb-6"></div>
                <p className="max-w-3xl mx-auto text-lg text-empower-brown/80">
                  Your contribution makes a significant difference in our community. Choose a cause that resonates with you and help us create lasting change.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {causes.map((cause) => (
                  <DonationCauseCard key={cause.id} cause={cause} />
                ))}
              </div>
            </div>
          </section>
          
          {/* Why Donate & Recent Donors Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div 
                  className="lg:col-span-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold text-empower-brown mb-6">Why Donate to EmpowEra?</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-semibold text-empower-brown mb-2">Transparent Impact</h3>
                      <p className="text-gray-600">
                        100% of your donation goes directly to our programs. We provide detailed reports showing exactly how your contribution makes a difference.
                      </p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-semibold text-empower-brown mb-2">Community-Led Initiatives</h3>
                      <p className="text-gray-600">
                        Our projects are designed with and for the communities we serve, ensuring sustainable, culturally-appropriate solutions.
                      </p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-semibold text-empower-brown mb-2">Tax Deductible</h3>
                      <p className="text-gray-600">
                        All donations are tax-deductible. You'll receive an official receipt for your records immediately after your contribution.
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <DonationRecentDonors />
                </motion.div>
              </div>
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default Donate;
