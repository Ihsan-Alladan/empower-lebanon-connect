
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import OurMission from '@/components/OurMission';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { useLocation } from 'react-router-dom';

const Index: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageTransition route={location.pathname}>
        <main>
          <Hero />
          <AboutUs />
          <OurMission />
          <Services />
          <Testimonials />
          <Newsletter />
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default Index;
