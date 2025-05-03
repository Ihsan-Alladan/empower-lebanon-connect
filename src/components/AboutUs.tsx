
import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient font-poppins mb-2 text-shadow-pop">
            Who We Are
          </h2>
          <div className="w-20 h-1 bg-empower-terracotta mx-auto mb-6"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div 
            className="order-2 md:order-1 animate-fade-in-left" 
            data-aos="fade-right"
          >
            <p className="text-lg mb-6 text-empower-brown leading-relaxed text-focus-in" style={{animationDelay: '0.3s'}}>
              EmpowEra is a vibrant online platform fostering community development by connecting 
              learners, artisans, donors, and volunteers. Our goal is to uplift marginalized 
              communities in Lebanon through education, skill-building, social enterprise, 
              and charitable initiatives.
            </p>
            <p className="text-lg mb-6 text-empower-brown leading-relaxed text-focus-in" style={{animationDelay: '0.6s'}}>
              We believe that access to education and opportunities is a fundamental right. By bringing 
              together passionate educators, skilled artisans, and generous supporters, we create an 
              ecosystem where everyone can thrive and grow together.
            </p>
            <p className="text-lg text-empower-brown leading-relaxed text-focus-in" style={{animationDelay: '0.9s'}}>
              Join us in our mission to make a lasting positive impact in Lebanese communities and beyond.
            </p>
          </div>

          {/* Image collage */}
          <div className="order-1 md:order-2 grid grid-cols-2 gap-4 animate-fade-in-right" data-aos="fade-left">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1000&auto=format&fit=crop" 
                  alt="Community learning together" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1000&auto=format&fit=crop" 
                  alt="Artisan craftsmanship" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="mt-8">
              <div className="overflow-hidden rounded-lg shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop" 
                  alt="Digital learning" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
