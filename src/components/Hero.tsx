
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Book, ShoppingCart, Heart } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const slides = [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=2070&auto=format&fit=crop"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    // Trigger animation after component mount
    setIsLoaded(true);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-[85vh] overflow-hidden">
      {/* Image Carousel */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-black/30 transition-opacity duration-1500 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${slide})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        {/* Enhanced overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" /> 
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className={`max-w-3xl mx-auto text-center text-white transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <h1 className="mb-2 text-4xl md:text-5xl lg:text-6xl font-bold font-poppins">
              <span className="hero-text inline-block bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent">
                Empowering Communities,
              </span>
            </h1>
            <h2 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-semibold font-poppins transition-all duration-700 delay-300 animate-fade-in">
              <span className="bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent">One Skill at a Time.</span>
            </h2>
            <p className="mb-10 text-lg md:text-xl animate-fade-in opacity-90 transition-all duration-700 delay-500">
              Join our mission to uplift marginalized communities in Lebanon through education, 
              skill-building, social enterprise, and charitable initiatives.
            </p>
            
            {/* CTA Buttons with enhanced animations */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center stagger-in">
              <Button size="lg" className="bg-primary hover:bg-primary/90 hover-zoom shadow-lg">
                <Book className="mr-2 h-5 w-5 animate-pulse-soft" /> Explore Courses
              </Button>
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 hover-zoom shadow-lg">
                <ShoppingCart className="mr-2 h-5 w-5 animate-pulse-soft" /> Visit Our Shop
              </Button>
              <Button size="lg" className="bg-accent hover:bg-accent/90 hover-zoom shadow-lg text-accent-foreground">
                <Heart className="mr-2 h-5 w-5 animate-pulse-soft" /> Donate Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators with enhanced styling */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              currentSlide === index 
                ? 'bg-white w-6 scale-110' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
