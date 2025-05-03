
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const AboutUs: React.FC = () => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1000&auto=format&fit=crop",
      alt: "Community learning together",
      border: "border-[#F97316]"
    },
    {
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1000&auto=format&fit=crop",
      alt: "Artisan craftsmanship",
      border: "border-[#D946EF]"
    },
    {
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop",
      alt: "Digital learning",
      border: "border-[#1EAEDB]"
    },
    {
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
      alt: "Digital skills workshop",
      border: "border-[#F97316]"
    },
    {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
      alt: "Tech education",
      border: "border-[#ea384c]"
    },
    {
      src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=1000&auto=format&fit=crop",
      alt: "Online learning",
      border: "border-[#D946EF]"
    }
  ];

  return (
    <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient text-gradient-pink font-poppins mb-2 text-shadow-pop">
            About Us
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#D946EF] via-[#F97316] to-[#1EAEDB] mx-auto mb-6"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div 
            className="order-2 md:order-1 animate-fade-in-left" 
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

          {/* Image Carousel */}
          <div className="order-1 md:order-2 animate-fade-in-right h-full flex items-center" data-aos="fade-left">
            <Carousel className="w-full">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className={`overflow-hidden rounded-lg shadow-md border-2 h-full aspect-[4/3] ${image.border}`}>
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
