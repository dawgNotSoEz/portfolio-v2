import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('/');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update active section based on scroll position
      const sections = ['/', '/about', '/projects', '/contact'];
      const sectionElements = sections.map(section => {
        const element = document.getElementById(section.replace('/', '') || 'home');
        return { section, top: element?.offsetTop || 0 };
      });

      const currentSection = sectionElements.reduce((prev, curr) => {
        return (Math.abs(curr.top - scrollPosition) < Math.abs(prev.top - scrollPosition)) ? curr : prev;
      });

      setActiveSection(currentSection.section);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-gray-900/80 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link 
              to="/" 
              className={`text-2xl font-bold transition-all duration-500 ${scrolled ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600'}`}
              style={{ textShadow: scrolled ? 'none' : '0 0 15px rgba(101, 116, 255, 0.5)' }}
            >
              <span className="animate-text-reveal inline-block" style={{ animationDelay: '0.1s' }}>S</span>
              <span className="animate-text-reveal inline-block" style={{ animationDelay: '0.2s' }}>a</span>
              <span className="animate-text-reveal inline-block" style={{ animationDelay: '0.3s' }}>v</span>
              <span className="animate-text-reveal inline-block" style={{ animationDelay: '0.4s' }}>i</span>
              <span className="animate-text-reveal inline-block" style={{ animationDelay: '0.5s' }}>t</span>
              <span className="animate-text-reveal inline-block" style={{ animationDelay: '0.6s' }}>e</span>
              <span className="animate-text-reveal inline-block" style={{ animationDelay: '0.7s' }}>n</span>
              <span className="animate-text-reveal inline-block" style={{ animationDelay: '0.8s' }}>d</span>
              <span className="animate-text-reveal inline-block" style={{ animationDelay: '0.9s' }}>e</span>
              <span className="animate-text-reveal inline-block" style={{ animationDelay: '1.0s' }}>r</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-2 py-1 overflow-hidden group ${activeSection === item.path ? 'text-blue-400' : 'text-white'}`}
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-blue-400">
                  {item.label}
                </span>
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 ${activeSection === item.path ? 'w-full' : 'group-hover:w-full'}`}></span>
                <span className="absolute inset-0 w-full h-full bg-blue-400/10 scale-0 rounded-lg transition-transform duration-300 group-hover:scale-100"></span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute h-0.5 w-6 bg-current transform transition duration-500 ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}></span>
                <span className={`absolute h-0.5 w-6 bg-current transform transition duration-500 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute h-0.5 w-6 bg-current transform transition duration-500 ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700/30 backdrop-blur-sm transition-all duration-300 transform ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10">{item.label}</span>
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 ${activeSection === item.path ? 'w-full' : ''}`}></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
