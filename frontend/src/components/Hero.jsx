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

  // Character flickering animation
  const charFlickerVariants = {
    hidden: { 
      opacity: 0,
    },
    visible: {
      opacity: [0, 0.3, 0, 0.7, 0.2, 1, 0.5, 1],
      transition: {
        duration: 0.6,
        times: [0, 0.1, 0.2, 0.4, 0.5, 0.7, 0.85, 1],
        ease: "easeInOut"
      }
    }
  };

  // Container for staggered character animation
  const textContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // Delay between each character
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 2.5 // After text finishes
      }
    }
  };

  // Split text into characters
  const renderFlickeringText = (text, className, delay = 0) => {
    return (
      <motion.div
        className={className}
        variants={textContainerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'inline-block' }}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={charFlickerVariants}
            style={{ 
              display: 'inline-block',
              whiteSpace: char === ' ' ? 'pre' : 'normal'
            }}
            transition={{ delay: delay + index * 0.03 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <div className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* "Hi, my name is" with character flicker */}
          {renderFlickeringText(
            "Hi, my name is",
            "text-[#64FFDA] text-sm md:text-base mb-4 font-mono",
            0
          )}
          
          {/* Name with character flicker and glow */}
          <div className="mb-4">
            {renderFlickeringText(
              personal.name,
              "text-4xl md:text-6xl lg:text-7xl font-bold text-white",
              0.4
            )}
          </div>
          
          {/* Title with character flicker */}
          <div className="mb-6">
            {renderFlickeringText(
              personal.title,
              "text-2xl md:text-4xl lg:text-5xl font-bold text-[#A8B2D1]",
              1.2
            )}
          </div>
          
          {/* Tagline appears normally after text */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            className="text-[#A8B2D1] text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          >
            {personal.tagline}
          </motion.p>
          
          {/* Buttons appear last */}
          <motion.div 
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            className="flex gap-4 justify-center flex-wrap"
          >
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
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#64FFDA] hover:opacity-80 transition-opacity"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          y: [0, 10, 0]
        }}
        transition={{
          opacity: { delay: 2.5, duration: 0.5 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 2.5 }
        }}
      >
        <ArrowDown size={32} />
      </motion.button>
    </section>
  );
};

export default Hero;