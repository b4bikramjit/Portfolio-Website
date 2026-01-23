import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Button } from './ui/button';

const Hero = ({ personal }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const [displayedText, setDisplayedText] = useState({ intro: '', name: '', title: '' });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Typewriter effect
  useEffect(() => {
    if (!isInView) {
      setDisplayedText({ intro: '', name: '', title: '' });
      return;
    }

    const intro = "Hi, my name is";
    const name = personal.name;
    const title = personal.title;

    let introIndex = 0;
    let nameIndex = 0;
    let titleIndex = 0;

    // Type intro
    const introTimer = setInterval(() => {
      if (introIndex <= intro.length) {
        setDisplayedText(prev => ({ ...prev, intro: intro.slice(0, introIndex) }));
        introIndex++;
      } else {
        clearInterval(introTimer);
        
        // Start typing name after intro
        const nameTimer = setInterval(() => {
          if (nameIndex <= name.length) {
            setDisplayedText(prev => ({ ...prev, name: name.slice(0, nameIndex) }));
            nameIndex++;
          } else {
            clearInterval(nameTimer);
            
            // Start typing title after name
            const titleTimer = setInterval(() => {
              if (titleIndex <= title.length) {
                setDisplayedText(prev => ({ ...prev, title: title.slice(0, titleIndex) }));
                titleIndex++;
              } else {
                clearInterval(titleTimer);
              }
            }, 50);
          }
        }, 80);
      }
    }, 60);

    return () => {
      clearInterval(introTimer);
    };
  }, [isInView, personal.name, personal.title]);

  return (
    <section 
      id="home" 
      ref={ref}
      className="min-h-screen flex items-center justify-center relative"
    >
      <div className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Intro text with typewriter */}
          <p className="text-[#64FFDA] text-sm md:text-base mb-4 font-mono">
            {displayedText.intro}
            {displayedText.intro.length < "Hi, my name is".length && (
              <span className="animate-pulse">|</span>
            )}
          </p>
          
          {/* Name with typewriter */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 min-h-[4rem] md:min-h-[6rem]">
            {displayedText.name}
            {displayedText.intro === "Hi, my name is" && displayedText.name.length < personal.name.length && (
              <span className="animate-pulse">|</span>
            )}
          </h1>
          
          {/* Title with typewriter */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#A8B2D1] mb-6 min-h-[3rem] md:min-h-[4rem]">
            {displayedText.title}
            {displayedText.name === personal.name && displayedText.title.length < personal.title.length && (
              <span className="animate-pulse">|</span>
            )}
          </h2>
          
          {/* Tagline and buttons appear after typing completes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: displayedText.title === personal.title ? 1 : 0 
            }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#A8B2D1] text-lg md:text-xl mb-8 max-w-2xl mx-auto">
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
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#64FFDA] hover:opacity-80 transition-opacity"
        animate={{
          y: [0, 10, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ArrowDown size={32} />
      </motion.button>
    </section>
  );
};

export default Hero;