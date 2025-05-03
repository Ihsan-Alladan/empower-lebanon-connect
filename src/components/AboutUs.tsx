
import React, { useState, useEffect } from 'react';

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

  return (
    <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gradient text-gradient-pink font-poppins mb-2 text-shadow-pop">
              About Us
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#D946EF] via-[#F97316] to-[#1EAEDB] mx-auto mb-6 transition-transform duration-1000 ease-in-out" 
                 style={{transform: isVisible ? 'scaleX(1)' : 'scaleX(0)'}}></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div 
            className={`order-2 md:order-1 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[-20px] opacity-0'}`}
            data-aos="fade-right"
          >
            <p className="text-lg mb-6 text-empower-brown leading-relaxed text-focus-in" style={{animationDelay: '0.3s'}}>
              EmpowEra is where passion meets purpose. We're on a mission to transform lives by turning creativity into opportunity. Through hands-on courses in handmade crafts and digital skills, we help individuals unlock their potential and earn a living doing what they love.
            </p>
            <p className="text-lg mb-6 text-empower-brown leading-relaxed text-focus-in" style={{animationDelay: '0.6s'}}>
              Our built-in marketplace breaks down barriers, connecting makers directly with buyers, just meaningful support. Beyond learning and selling, EmpowEra sparks connection through community events, workshops, and inspiring talks.
            </p>
            <p className="text-lg text-empower-brown leading-relaxed text-focus-in" style={{animationDelay: '0.9s'}}>
              EmpowEra is a movement. One that aims to uplift communities, unlock talent, and create real change. Join us and be part of something powerful.
            </p>
          </div>

          {/* Enhanced Image Gallery with animations */}
          <div className={`order-1 md:order-2 grid grid-cols-3 gap-3 transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[20px] opacity-0'}`} data-aos="fade-left">
            <div className="space-y-3">
              <div className="overflow-hidden rounded-lg shadow-md border-2 border-[#F97316] transition-all duration-500 hover:shadow-xl"
                   style={{transform: isVisible ? 'translateY(0)' : 'translateY(20px)', opacity: isVisible ? 1 : 0, transition: 'transform 0.8s ease, opacity 0.8s ease'}}>
                <img 
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1000&auto=format&fit=crop" 
                  alt="Community learning together" 
                  className="w-full h-40 object-cover transition-all duration-700 hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-md border-2 border-[#D946EF] transition-all duration-500 hover:shadow-xl"
                   style={{transform: isVisible ? 'translateY(0)' : 'translateY(20px)', opacity: isVisible ? 1 : 0, transition: 'transform 0.8s ease 0.1s, opacity 0.8s ease 0.1s'}}>
                <img 
                  src="https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1000&auto=format&fit=crop" 
                  alt="Artisan craftsmanship" 
                  className="w-full h-32 object-cover transition-all duration-700 hover:scale-110"
                  loading="lazy"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="overflow-hidden rounded-lg shadow-md border-2 border-[#1EAEDB] transition-all duration-500 hover:shadow-xl"
                   style={{transform: isVisible ? 'translateY(0)' : 'translateY(20px)', opacity: isVisible ? 1 : 0, transition: 'transform 0.8s ease 0.2s, opacity 0.8s ease 0.2s'}}>
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop" 
                  alt="Digital learning" 
                  className="w-full h-32 object-cover transition-all duration-700 hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-md border-2 border-[#F97316] transition-all duration-500 hover:shadow-xl"
                   style={{transform: isVisible ? 'translateY(0)' : 'translateY(20px)', opacity: isVisible ? 1 : 0, transition: 'transform 0.8s ease 0.3s, opacity 0.8s ease 0.3s'}}>
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop" 
                  alt="Digital skills workshop" 
                  className="w-full h-40 object-cover transition-all duration-700 hover:scale-110"
                  loading="lazy"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="overflow-hidden rounded-lg shadow-md border-2 border-[#ea384c] transition-all duration-500 hover:shadow-xl"
                   style={{transform: isVisible ? 'translateY(0)' : 'translateY(20px)', opacity: isVisible ? 1 : 0, transition: 'transform 0.8s ease 0.4s, opacity 0.8s ease 0.4s'}}>
                <img 
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop" 
                  alt="Tech education" 
                  className="w-full h-40 object-cover transition-all duration-700 hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-md border-2 border-[#D946EF] transition-all duration-500 hover:shadow-xl"
                   style={{transform: isVisible ? 'translateY(0)' : 'translateY(20px)', opacity: isVisible ? 1 : 0, transition: 'transform 0.8s ease 0.5s, opacity 0.8s ease 0.5s'}}>
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=1000&auto=format&fit=crop" 
                  alt="Online learning" 
                  className="w-full h-32 object-cover transition-all duration-700 hover:scale-110"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
