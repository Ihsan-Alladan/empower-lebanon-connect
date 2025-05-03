
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Book, ShoppingCart, Heart } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=2070&auto=format&fit=crop"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-[85vh] overflow-hidden">
      {/* Image Carousel */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-black/30 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
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
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl text-white">
            <div className="text-reveal mb-2 inline-block">
              <h1 className="mb-2 text-4xl md:text-5xl lg:text-6xl font-bold font-poppins">
                <span className="hero-text inline-block">
                  EmpowEra
                </span>
              </h1>
            </div>
            <h2 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-semibold font-poppins text-shadow-pop" style={{animationDelay: '1s'}}>
              <span className="bg-gradient-to-r from-[#FEC6A1] via-[#FFDEE2] to-[#FDE1D3] bg-clip-text text-transparent">
                A New Era of Learning and Giving.
              </span>
            </h2>
            <p className="mb-10 text-lg md:text-xl text-focus-in opacity-90" style={{animationDelay: '1.5s'}}>
              Join our vibrant community today and unlock endless opportunities to learn, create, and give back—where passion meets purpose and every click makes a difference!
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-start animate-fade-in">
              <Button size="lg" className="bg-empower-terracotta hover:bg-empower-terracotta/90 hover-zoom shadow-lg">
                <Book className="mr-2 h-5 w-5" /> Explore Courses
              </Button>
              <Button size="lg" className="bg-[#F97316] hover:bg-[#F97316]/90 hover-zoom shadow-lg">
                <ShoppingCart className="mr-2 h-5 w-5" /> Visit Our Shop
              </Button>
              <Button size="lg" className="bg-[#D946EF] hover:bg-[#D946EF]/90 hover-zoom shadow-lg text-white">
                <Heart className="mr-2 h-5 w-5" /> Donate Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            } transition-all`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
