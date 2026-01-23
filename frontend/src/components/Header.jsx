import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0A192F]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection('home')}
            className="text-2xl font-bold text-[#64FFDA] hover:opacity-80 transition-opacity"
          >
            BS
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-[#64FFDA] transition-colors text-sm font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-white hover:text-[#64FFDA] transition-colors text-sm font-medium"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="text-white hover:text-[#64FFDA] transition-colors text-sm font-medium"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-white hover:text-[#64FFDA] transition-colors text-sm font-medium"
            >
              Projects
            </button>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-transparent border border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10"
            >
              Contact
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#64FFDA] hover:opacity-80 transition-opacity"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-[#64FFDA] transition-colors text-sm font-medium text-left"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-white hover:text-[#64FFDA] transition-colors text-sm font-medium text-left"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="text-white hover:text-[#64FFDA] transition-colors text-sm font-medium text-left"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-white hover:text-[#64FFDA] transition-colors text-sm font-medium text-left"
            >
              Projects
            </button>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-transparent border border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10 w-full"
            >
              Contact
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
