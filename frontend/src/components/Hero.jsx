import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Button } from './ui/button';

const Hero = ({ personal }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cinematic character reveal with various effects
  const cinematicCharVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.3,
      rotateX: -90,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9], // Cinematic easing
      }
    }
  };

  // Name gets more dramatic entrance
  const nameCharVariants = {
    hidden: { 
      opacity: 0,
      y: 100,
      scale: 0,
      rotateZ: -45,
      filter: "blur(15px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateZ: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.6, 0.05, 0.01, 0.9],
      }
    }
  };

  // Title with slide and fade
  const titleCharVariants = {
    hidden: { 
      opacity: 0,
      x: -50,
      scale: 0.5,
      filter: "blur(8px)"
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.6, 0.05, 0.01, 0.9],
      }
    }
  };

  // Container for staggered animation
  const textContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04, // Timing between characters
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 3.5, // After all text appears
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  // Render text with cinematic character animation
  const renderCinematicText = (text, className, variants, delay = 0, additionalStyles = {}) => {
    return (
      <motion.div
        className={className}
        variants={textContainerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          perspective: '1000px',
          ...additionalStyles
        }}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={variants}
            style={{ 
              display: 'inline-block',
              whiteSpace: char === ' ' ? 'pre' : 'normal',
              transformStyle: 'preserve-3d',
            }}
            transition={{ delay: delay + index * 0.04 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Intro text with cinematic reveal */}
          {renderCinematicText(
            "Hi, my name is",
            "text-[#64FFDA] text-sm md:text-base mb-6 font-mono tracking-wider",
            cinematicCharVariants,
            0
          )}
          
          {/* Name with dramatic entrance */}
          <div className="mb-6">
            {renderCinematicText(
              personal.name,
              "text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight",
              nameCharVariants,
              0.6,
              { 
                textShadow: "0 0 30px rgba(100, 255, 218, 0.3), 0 0 60px rgba(100, 255, 218, 0.1)",
                letterSpacing: '-0.02em'
              }
            )}
          </div>
          
          {/* Title with slide animation */}
          <div className="mb-8">
            {renderCinematicText(
              personal.title,
              "text-xl md:text-3xl lg:text-4xl font-bold text-[#A8B2D1] tracking-wide",
              titleCharVariants,
              2.2
            )}
          </div>
          
          {/* Content fades in after title sequence */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-[#A8B2D1] text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              {personal.tagline}
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                onClick={() => scrollToSection('projects')}
                className="bg-transparent border-2 border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10 px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105"
              >
                View My Work
              </Button>
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-[#64FFDA] text-[#0A192F] hover:bg-[#64FFDA]/90 px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105"
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1,
          y: [0, 10, 0]
        }}
        transition={{
          opacity: { delay: 4, duration: 0.5 },
          y: { 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 4
          }
        }}
      >
        <ArrowDown size={32} />
      </motion.button>
    </section>
  );
};

export default Hero;