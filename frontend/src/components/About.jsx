import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = ({ about }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 
            variants={textVariants}
            className="text-3xl md:text-4xl font-bold text-white mb-2"
          >
            <span className="text-[#64FFDA] font-mono text-xl mr-2">01.</span>
            About Me
          </motion.h2>
          <motion.div 
            variants={textVariants}
            className="h-[1px] bg-[#8892B0]/20 mb-12"
          ></motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div variants={containerVariants}>
              <motion.p 
                variants={textVariants}
                className="text-[#A8B2D1] text-lg leading-relaxed mb-6"
              >
                {about.description}
              </motion.p>
              <motion.p 
                variants={textVariants}
                className="text-[#A8B2D1] text-lg leading-relaxed"
              >
                I specialize in turning complex datasets into clear, actionable insights that drive business value. 
                My experience spans machine learning, statistical analysis, and business intelligence across various industries.
              </motion.p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
            >
              {about.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, borderColor: "rgba(100, 255, 218, 1)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="bg-[#112240] border-[#64FFDA]/20 p-6 hover:border-[#64FFDA] transition-all duration-300">
                    <motion.div 
                      className="text-4xl font-bold text-[#64FFDA] mb-2"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                    >
                      {highlight.value}
                    </motion.div>
                    <div className="text-[#A8B2D1] text-sm">
                      {highlight.label}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;