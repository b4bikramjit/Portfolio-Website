import React from 'react';
import { ArrowDown } from 'lucide-react';
import { portfolioData } from '../mock';
import { Button } from './ui/button';

const Hero = () => {
  const { personal } = portfolioData;

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <div className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#64FFDA] text-sm md:text-base mb-4 font-mono">Hi, my name is</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            {personal.name}
          </h1>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#8892B0] mb-6">
            {personal.title}
          </h2>
          <p className="text-[#8892B0] text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            {personal.tagline}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => scrollToSection('projects')}
              className="bg-transparent border border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10 px-8 py-6 text-base"
            >
              View My Work
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-[#64FFDA] text-[#0A192F] hover:bg-[#64FFDA]/90 px-8 py-6 text-base"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#64FFDA] animate-bounce hover:opacity-80 transition-opacity"
      >
        <ArrowDown size={32} />
      </button>
    </section>
  );
};

export default Hero;
