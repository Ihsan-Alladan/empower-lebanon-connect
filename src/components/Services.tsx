
import React from 'react';
import { Book, ShoppingCart, Heart, Calendar, Hammer, Users } from 'lucide-react';

const serviceCards = [
  {
    title: "Courses",
    description: "Online & in-person learning experiences to build valuable skills",
    icon: Book,
    color: "bg-empower-terracotta",
    textColor: "text-empower-terracotta",
    borderClass: "border-2 border-[#1EAEDB]",
    delay: 100
  },
  {
    title: "Shop",
    description: "Browse handmade products crafted by local Lebanese artisans",
    icon: ShoppingCart,
    color: "bg-[#F97316]",
    textColor: "text-[#F97316]",
    borderClass: "border-pulse-orange",
    delay: 200
  },
  {
    title: "Donations",
    description: "Support initiatives that create lasting positive change",
    icon: Heart,
    color: "bg-[#D946EF]",
    textColor: "text-[#D946EF]",
    borderClass: "border-pulse-pink",
    delay: 300
  },
  {
    title: "Events",
    description: "Join community gatherings and special occasions",
    icon: Calendar,
    color: "bg-[#ea384c]",
    textColor: "text-[#ea384c]",
    borderClass: "border-pulse-red",
    delay: 400
  },
  {
    title: "Workshops",
    description: "Hands-on experiences to learn new skills directly from experts",
    icon: Hammer,
    color: "bg-empower-olive",
    textColor: "text-empower-olive",
    borderClass: "border-2 border-[#1EAEDB]",
    delay: 500
  },
  {
    title: "Volunteer & Support",
    description: "Contribute your time and skills to make a difference",
    icon: Users,
    color: "bg-empower-gold",
    textColor: "text-empower-gold",
    borderClass: "border-2 border-[#1EAEDB]",
    delay: 600
  }
];

const Services: React.FC = () => {
  return (
    <section className="py-20 bg-empower-ivory/70" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient text-gradient-blue font-poppins mb-2 text-shadow-pop">
            Our Services
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#1EAEDB] via-[#D946EF] to-[#F97316] mx-auto mb-6"></div>
          <p className="text-lg text-empower-brown max-w-3xl mx-auto text-focus-in">
            Discover how EmpowEra connects and uplifts communities through our diverse range of offerings
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCards.map((service, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-md overflow-hidden hover-zoom transition-all duration-300 ${service.borderClass}`}
            >
              <div className={`p-6 flex flex-col items-center text-center`}>
                <div className={`${service.color} p-4 rounded-full mb-6`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className={`font-poppins font-semibold text-xl mb-3 text-float ${service.textColor}`}>
                  {service.title}
                </h3>
                <p className="text-empower-brown">
                  {service.description}
                </p>
                <button className={`mt-6 text-sm font-medium ${service.textColor} hover:underline flex items-center`}>
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
