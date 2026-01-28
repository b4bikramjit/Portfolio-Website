import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowDown, BarChart2, Zap, Briefcase, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const Hero = ({ personal }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = "> Initializing portfolio.data...";

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setIsTypingComplete(true);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { icon: <BarChart2 className="w-6 h-6 text-indigo-400" />, value: "6+", label: "Projects" },
    { icon: <Zap className="w-6 h-6 text-amber-400" />, value: "15+", label: "Skills" },
    { icon: <Briefcase className="w-6 h-6 text-rose-400" />, value: "3", label: "Experience" },
    { icon: <Target className="w-6 h-6 text-emerald-400" />, value: "86%", label: "Accuracy" },
  ];

  return (
    <section
      id="home"
      ref={ref}
      className="min-h-screen flex items-center justify-center relative bg-transparent overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-cyan-500 rounded-full opacity-20 animate-pulse" />
        <div className="absolute top-[40%] right-[20%] w-1 h-1 bg-indigo-500 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[30%] left-[25%] w-1.5 h-1.5 bg-teal-500 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/50 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-mono text-xs tracking-wide">Status: Available for opportunities</span>
          </motion.div>

          {/* Terminal/Typewriter Heading */}
          <div className="mb-6 h-6">
            {/* Fixed height to prevent layout shift */}
            <span className="text-cyan-400 font-mono text-sm md:text-base">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTypingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
              {personal.name.split(' ')[0]} <span className="text-cyan-400">{personal.name.split(' ')[1]}</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTypingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-4 text-slate-400 text-lg md:text-xl font-light mb-16"
          >
            <span className="h-px w-12 bg-slate-700"></span>
            <span className="text-white">Data Analyst & ML Enthusiast</span>
            <span className="h-px w-12 bg-slate-700"></span>
          </motion.div>

          {/* Stat Cards */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={isTypingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {stats.map((stat, idx) => (
              <Card key={idx} className="bg-slate-900/50 border-slate-800 p-6 flex flex-col items-center justify-center hover:border-cyan-500/30 transition-colors group">
                <div className="mb-3 p-3 rounded-full bg-slate-800/50 group-hover:bg-slate-800 transition-colors">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{stat.label}</div>
              </Card>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isTypingComplete ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <Button
              onClick={() => scrollToSection('projects')}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-6 text-base rounded-lg shadow-lg shadow-cyan-900/20"
            >
              <BarChart2 className="w-4 h-4 mr-2" /> View Projects
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-transparent border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-6 text-base rounded-lg"
            >
              Get In Touch
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown size={24} />
      </motion.button>
    </section>
  );
};

export default Hero;
