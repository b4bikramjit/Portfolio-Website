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

  // Neon tube lighting up effect
  const neonCharVariants = {
    hidden: { 
      opacity: 0,
      textShadow: "0 0 0px rgba(100, 255, 218, 0)",
      filter: "brightness(0.3) blur(2px)"
    },
    flicker: {
      opacity: [0, 0.3, 0.1, 0.5, 0.2, 0.8, 0.4, 1],
      textShadow: [
        "0 0 0px rgba(100, 255, 218, 0)",
        "0 0 5px rgba(100, 255, 218, 0.3)",
        "0 0 2px rgba(100, 255, 218, 0.2)",
        "0 0 10px rgba(100, 255, 218, 0.5)",
        "0 0 5px rgba(100, 255, 218, 0.4)",
        "0 0 15px rgba(100, 255, 218, 0.7)",
        "0 0 10px rgba(100, 255, 218, 0.6)",
        "0 0 20px rgba(100, 255, 218, 0.8), 0 0 30px rgba(100, 255, 218, 0.5), 0 0 40px rgba(100, 255, 218, 0.3)"
      ],
      filter: [
        "brightness(0.3) blur(2px)",
        "brightness(0.6) blur(1px)",
        "brightness(0.4) blur(1.5px)",
        "brightness(0.8) blur(0.5px)",
        "brightness(0.6) blur(1px)",
        "brightness(1) blur(0px)",
        "brightness(0.9) blur(0.2px)",
        "brightness(1.2) blur(0px)"
      ],
      transition: {
        duration: 0.6,
        times: [0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
        ease: "easeOut"
      }
    },
    visible: {
      opacity: 1,
      textShadow: "0 0 20px rgba(100, 255, 218, 0.8), 0 0 30px rgba(100, 255, 218, 0.5), 0 0 40px rgba(100, 255, 218, 0.3), 0 0 50px rgba(100, 255, 218, 0.2)",
      filter: "brightness(1.2) blur(0px)",
      transition: {
        duration: 0.3
      }
    }
  };

  // Name gets extra bright neon effect
  const neonNameVariants = {
    hidden: { 
      opacity: 0,
      textShadow: "0 0 0px rgba(100, 255, 218, 0)",
      filter: "brightness(0.3) blur(3px)"
    },
    flicker: {
      opacity: [0, 0.2, 0.05, 0.4, 0.15, 0.7, 0.3, 1],
      textShadow: [
        "0 0 0px rgba(100, 255, 218, 0)",
        "0 0 8px rgba(100, 255, 218, 0.4)",
        "0 0 3px rgba(100, 255, 218, 0.2)",
        "0 0 15px rgba(100, 255, 218, 0.6)",
        "0 0 8px rgba(100, 255, 218, 0.4)",
        "0 0 25px rgba(100, 255, 218, 0.8)",
        "0 0 15px rgba(100, 255, 218, 0.7)",
        "0 0 30px rgba(100, 255, 218, 1), 0 0 50px rgba(100, 255, 218, 0.7), 0 0 70px rgba(100, 255, 218, 0.4), 0 0 90px rgba(100, 255, 218, 0.2)"
      ],
      filter: [
        "brightness(0.3) blur(3px)",
        "brightness(0.5) blur(2px)",
        "brightness(0.3) blur(2.5px)",
        "brightness(0.7) blur(1px)",
        "brightness(0.5) blur(1.5px)",
        "brightness(1) blur(0.3px)",
        "brightness(0.9) blur(0.5px)",
        "brightness(1.3) blur(0px)"
      ],
      transition: {
        duration: 0.8,
        times: [0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
        ease: "easeOut"
      }
    },
    visible: {
      opacity: 1,
      textShadow: "0 0 30px rgba(100, 255, 218, 1), 0 0 50px rgba(100, 255, 218, 0.7), 0 0 70px rgba(100, 255, 218, 0.4), 0 0 90px rgba(100, 255, 218, 0.2), 0 0 110px rgba(100, 255, 218, 0.1)",
      filter: "brightness(1.3) blur(0px)",
      transition: {
        duration: 0.4
      }
    }
  };

  // Container for staggered neon lighting
  const neonContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 3.5,
        ease: "easeOut"
      }
    }
  };

  // Render neon text with character-by-character lighting
  const renderNeonText = (text, className, variants, delay = 0, isName = false) => {
    return (
      <motion.div
        className={className}
        variants={neonContainerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          filter: 'drop-shadow(0 0 20px rgba(100, 255, 218, 0.3))'
        }}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={variants}
            initial="hidden"
            animate={["flicker", "visible"]}
            style={{ 
              display: 'inline-block',
              whiteSpace: char === ' ' ? 'pre' : 'normal',
              color: isName ? '#FFFFFF' : '#64FFDA',
              fontWeight: isName ? '900' : '600'
            }}
            transition={{ delay: delay + index * 0.05 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A192F 0%, #0F1B2E 100%)' }}
    >
      <div className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Intro with neon glow */}
          {renderNeonText(
            "Hi, my name is",
            "text-sm md:text-lg mb-8 font-mono tracking-widest uppercase",
            neonCharVariants,
            0
          )}
          
          {/* Name with maximum neon effect */}
          <div className="mb-8">
            {renderNeonText(
              personal.name,
              "text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter",
              neonNameVariants,
              0.7,
              true
            )}
          </div>
          
          {/* Title with neon glow */}
          <div className="mb-10">
            {renderNeonText(
              personal.title,
              "text-xl md:text-3xl lg:text-4xl font-semibold tracking-wide",
              neonCharVariants,
              2.5
            )}
          </div>
          
          {/* Content fades in after neon sequence */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-[#A8B2D1] text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              {personal.tagline}
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                onClick={() => scrollToSection('projects')}
                className="bg-transparent border-2 border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10 px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(100,255,218,0.5)]"
                style={{
                  boxShadow: '0 0 10px rgba(100, 255, 218, 0.3)'
                }}
              >
                View My Work
              </Button>
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-[#64FFDA] text-[#0A192F] hover:bg-[#64FFDA]/90 px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  boxShadow: '0 0 20px rgba(100, 255, 218, 0.6)'
                }}
              >
                Get In Touch
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator with neon glow */}
      <motion.button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#64FFDA] hover:opacity-80 transition-opacity"
        initial={{ opacity: 0 }}
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
        style={{
          filter: 'drop-shadow(0 0 10px rgba(100, 255, 218, 0.6))'
        }}
      >
        <ArrowDown size={32} />
      </motion.button>
    </section>
  );
};

export default Hero;