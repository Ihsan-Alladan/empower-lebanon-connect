
import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    quote: "The courses provided by EmpowEra have completely transformed my career prospects. I've gained valuable skills that employers are actively seeking.",
    name: "Sara Khoury",
    role: "Course Graduate",
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "Selling my handcrafted items through EmpowEra's shop has provided me with financial independence and connected me with customers worldwide.",
    name: "Layla Bassam",
    role: "Artisan Partner",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "As a donor, I can see the direct impact of my contributions. The transparency and community focus make supporting EmpowEra incredibly rewarding.",
    name: "Michel Hadid",
    role: "Monthly Donor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  }
];

const stats = [
  { number: "200+", label: "Courses Offered" },
  { number: "3000+", label: "Beneficiaries" },
  { number: "120+", label: "Products Sold" },
  { number: "50+", label: "Community Events" }
];

const Testimonials: React.FC = () => {
  const [animatedStats, setAnimatedStats] = useState<{[key: string]: number}>({});
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('stats-section');
      if (!element || hasAnimated) return;
      
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      
      if (isVisible) {
        setHasAnimated(true);
        animateStats();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAnimated]);

  const animateStats = () => {
    stats.forEach(stat => {
      const target = parseInt(stat.number.replace(/\D/g, ''));
      const duration = 2000; // 2 seconds
      const stepTime = 50; // Update every 50ms
      const totalSteps = duration / stepTime;
      const stepValue = target / totalSteps;
      
      let current = 0;
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedStats(prev => ({...prev, [stat.label]: Math.floor(current)}));
      }, stepTime);
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-empower-brown font-poppins mb-2">
            Testimonials & Impact
          </h2>
          <div className="w-20 h-1 bg-empower-terracotta mx-auto mb-6"></div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((item, index) => (
            <div 
              key={index} 
              className="bg-empower-ivory/40 p-6 rounded-lg shadow-md flex flex-col hover-zoom"
            >
              <div className="flex-grow">
                <svg className="h-8 w-8 text-empower-gold mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-empower-brown italic mb-4">{item.quote}</p>
              </div>
              <div className="flex items-center mt-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-poppins font-medium text-empower-brown">{item.name}</h4>
                  <p className="text-sm text-empower-brown/70">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Counter */}
        <div id="stats-section" className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold font-poppins text-empower-terracotta mb-2">
                {hasAnimated 
                  ? `${animatedStats[stat.label] || 0}${stat.number.includes('+') ? '+' : ''}` 
                  : '0'}
              </div>
              <p className="text-empower-brown text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
