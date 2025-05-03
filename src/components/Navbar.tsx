
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo - replaced text with image */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/22a31812-0de9-4dde-9442-b766171923c5.png" 
              alt="EmpowEra Logo" 
              className="h-10 md:h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-empower-brown hover:text-empower-terracotta transition-colors">Home</Link>
            <Link to="/courses" className="text-empower-brown hover:text-empower-terracotta transition-colors">Courses</Link>
            <Link to="/shop" className="text-empower-brown hover:text-empower-terracotta transition-colors">Shop</Link>
            <Link to="/donate" className="text-empower-brown hover:text-empower-terracotta transition-colors">Donate</Link>
            <Link to="/workshops" className="text-empower-brown hover:text-empower-terracotta transition-colors">Workshops</Link>
            <Link to="/events" className="text-empower-brown hover:text-empower-terracotta transition-colors">Events</Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" onClick={handleLogin} className="text-empower-brown hover:text-empower-terracotta">Login</Button>
            <Button className="bg-empower-terracotta hover:bg-empower-terracotta/90" onClick={handleSignUp}>Sign Up</Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-empower-brown hover:text-empower-terracotta transition-colors">Home</Link>
              <Link to="/courses" className="text-empower-brown hover:text-empower-terracotta transition-colors">Courses</Link>
              <Link to="/shop" className="text-empower-brown hover:text-empower-terracotta transition-colors">Shop</Link>
              <Link to="/donate" className="text-empower-brown hover:text-empower-terracotta transition-colors">Donate</Link>
              <Link to="/workshops" className="text-empower-brown hover:text-empower-terracotta transition-colors">Workshops</Link>
              <Link to="/events" className="text-empower-brown hover:text-empower-terracotta transition-colors">Events</Link>
              <div className="flex space-x-2 pt-2">
                <Button variant="ghost" onClick={handleLogin} className="text-empower-brown hover:text-empower-terracotta">Login</Button>
                <Button className="bg-empower-terracotta hover:bg-empower-terracotta/90" onClick={handleSignUp}>Sign Up</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
