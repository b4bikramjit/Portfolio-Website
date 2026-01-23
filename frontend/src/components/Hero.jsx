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

  // Flickering animation that stabilizes
  const flickerVariants = {
    hidden: { 
      opacity: 0,
    },
    flicker: {
      opacity: [0, 0.2, 0, 0.8, 0.3, 1, 0.5, 1, 0.8, 1],
      transition: {
        duration: 1.2,
        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1],
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  // Glitch effect for name
  const glitchVariants = {
    hidden: { 
      opacity: 0,
      x: 0
    },
    glitch: {
      opacity: [0, 1, 0, 1, 0.5, 1],
      x: [0, -5, 5, -3, 3, 0],
      filter: [
        "blur(0px)",
        "blur(2px)",
        "blur(0px)",
        "blur(3px)",
        "blur(1px)",
        "blur(0px)"
      ],
      transition: {
        duration: 0.8,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.3
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <motion.div 
        className="container mx-auto px-6 py-20 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto">
          {/* Flickering intro text */}
          <motion.p 
            variants={flickerVariants}
            initial="hidden"
            animate={["flicker", "visible"]}
            className="text-[#64FFDA] text-sm md:text-base mb-4 font-mono"
          >
            Hi, my name is
          </motion.p>
          
          {/* Glitching name */}
          <motion.h1 
            variants={glitchVariants}
            initial="hidden"
            animate={["glitch", "visible"]}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
            style={{ textShadow: "0 0 10px rgba(100, 255, 218, 0.3)" }}
          >
            {personal.name}
          </motion.h1>
          
          {/* Flickering title */}
          <motion.h2 
            variants={flickerVariants}
            initial="hidden"
            animate={["flicker", "visible"]}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#A8B2D1] mb-6"
          >
            {personal.title}
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-[#A8B2D1] text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          >
            {personal.tagline}
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
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
      </motion.div>

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