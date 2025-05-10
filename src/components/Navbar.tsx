import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Update scrolled state
      setScrolled(window.scrollY > 50);
      
      // Determine which section is currently in view
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      let currentSection = 'home';
      let minDistance = Infinity;
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = section;
          }
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for navbar height
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      setIsOpen(false);
    }
  };

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-slate-950/90 backdrop-blur-md shadow-lg' : 'py-5 bg-transparent'}`}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#home" 
            className="text-2xl font-semibold tracking-tight text-white hover:text-teal-400 transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
          >
            <span className="text-teal-400">S</span>avitender
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`relative text-sm uppercase tracking-widest font-medium transition-colors duration-300 ${activeSection === item.id ? 'text-teal-400' : 'text-white hover:text-teal-400'}`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-teal-400 transform origin-left transition-transform duration-300 ${activeSection === item.id ? 'scale-x-100' : 'scale-x-0'}`}></span>
              </a>
            ))}
          </nav>

          {/* Resume Button (Desktop) */}
          <div className="hidden md:block">
            <a 
              href="/Savitender_Singh_Resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-2 border border-teal-400 text-teal-400 rounded hover:bg-teal-400 hover:text-slate-950 transition-all duration-300 text-sm font-medium tracking-wide"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5">
              <span className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
              <span className={`absolute h-0.5 w-6 bg-current transform transition duration-300 top-2 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute h-0.5 w-6 bg-current transform transition duration-300 top-4 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="bg-slate-900/90 backdrop-blur-md rounded-lg p-4 shadow-xl border border-slate-800/50">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`py-2 px-4 rounded-md transition-colors duration-300 ${activeSection === item.id ? 'text-teal-400 bg-slate-800/50' : 'text-white hover:bg-slate-800/30'}`}
                >
                  {item.label}
                </a>
              ))}
              <a 
                href="/Savitender_Singh_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="py-2 px-4 mt-2 border border-teal-400 text-teal-400 rounded-md text-center hover:bg-teal-400 hover:text-slate-900 transition-all duration-300"
              >
                Resume
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
