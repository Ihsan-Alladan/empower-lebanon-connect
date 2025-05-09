
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-empower-brown text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <span className="font-poppins font-bold text-2xl text-white">
                Empow<span className="text-empower-gold">Era</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-white/80">
              Empowering communities through education, enterprise, and charitable initiatives in Lebanon.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-white hover:text-empower-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-empower-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-empower-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-poppins">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-empower-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/#about" className="text-white/80 hover:text-empower-gold transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/courses" className="text-white/80 hover:text-empower-gold transition-colors">Courses</Link>
              </li>
              <li>
                <Link to="/shop" className="text-white/80 hover:text-empower-gold transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/donate" className="text-white/80 hover:text-empower-gold transition-colors">Donate</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-poppins">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/workshops" className="text-white/80 hover:text-empower-gold transition-colors">Workshops</Link>
              </li>
              <li>
                <Link to="/events" className="text-white/80 hover:text-empower-gold transition-colors">Events</Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-white/80 hover:text-empower-gold transition-colors">Volunteer</Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/80 hover:text-empower-gold transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-empower-gold transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-poppins">Stay Connected</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/newsletter" className="text-white/80 hover:text-empower-gold transition-colors">Newsletter</Link>
              </li>
              <li>
                <address className="not-italic text-white/80">
                  <p>Beirut, Lebanon</p>
                  <p>Email: info@empowera.org</p>
                  <p>Phone: +961 1 234 567</p>
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Quote and Copyright */}
        <div className="mt-12 pt-6 border-t border-white/20 text-center">
          <p className="text-lg italic font-poppins mb-4 flex items-center justify-center">
            Together, we empower a brighter tomorrow <Heart className="text-empower-terracotta ml-2 w-4 h-4 animate-bounce-light" />
          </p>
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} EmpowEra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
