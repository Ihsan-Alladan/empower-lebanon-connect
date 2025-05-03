
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Donate: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageTransition route={location.pathname}>
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-empower-brown mb-4">Make a Difference</h1>
            <div className="w-20 h-1 bg-empower-terracotta mx-auto mb-8"></div>
            <p className="text-lg max-w-3xl mx-auto text-empower-brown/80">
              Your generous donation helps us create sustainable change in our communities through education,
              enterprise support, and targeted charitable initiatives.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="bg-empower-ivory/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="text-empower-terracotta w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">One-Time Donation</h3>
              <p className="text-center mb-6">Support our work with a single contribution of any amount.</p>
              <Button className="w-full bg-empower-gold hover:bg-empower-gold/80 text-white">Donate Now</Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="bg-empower-ivory/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="text-empower-terracotta w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Monthly Giving</h3>
              <p className="text-center mb-6">Become a sustaining donor with a recurring monthly donation.</p>
              <Button className="w-full bg-empower-gold hover:bg-empower-gold/80 text-white">Give Monthly</Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="bg-empower-ivory/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="text-empower-terracotta w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Partnership</h3>
              <p className="text-center mb-6">Explore corporate giving and sponsorship opportunities.</p>
              <Button className="w-full bg-empower-gold hover:bg-empower-gold/80 text-white">Partner With Us</Button>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto bg-empower-ivory/30 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Your Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-empower-terracotta">$25</p>
                <p>Provides materials for one craft workshop</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-empower-terracotta">$100</p>
                <p>Sponsors a learner for a digital skills course</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-empower-terracotta">$500</p>
                <p>Helps an entrepreneur start their business</p>
              </div>
            </div>
          </div>
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default Donate;
