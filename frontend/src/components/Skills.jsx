import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from './ui/badge';

const Skills = ({ skills }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const badgeContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <section id="skills" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 
            variants={sectionVariants}
            className="text-3xl md:text-4xl font-bold text-white mb-2"
          >
            <span className="text-[#64FFDA] font-mono text-xl mr-2">02.</span>
            Skills & Technologies
          </motion.h2>
          <motion.div 
            variants={sectionVariants}
            className="h-[1px] bg-[#8892B0]/20 mb-12"
          ></motion.div>

          <div className="space-y-8">
            {/* Programming */}
            <motion.div variants={sectionVariants}>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <motion.span 
                  className="w-2 h-2 bg-[#64FFDA] rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.span>
                Programming Languages & Libraries
              </h3>
              <motion.div 
                className="flex flex-wrap gap-3"
                variants={badgeContainerVariants}
              >
                {skills.programming.map((skill, index) => (
                  <motion.div key={index} variants={badgeVariants}>
                    <Badge
                      className="bg-[#112240] text-[#64FFDA] border border-[#64FFDA]/30 hover:border-[#64FFDA] hover:bg-[#64FFDA]/10 px-4 py-2 text-sm transition-all duration-300 cursor-pointer"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Software */}
            <motion.div variants={sectionVariants}>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <motion.span 
                  className="w-2 h-2 bg-[#64FFDA] rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                ></motion.span>
                Software & Tools
              </h3>
              <motion.div 
                className="flex flex-wrap gap-3"
                variants={badgeContainerVariants}
              >
                {skills.software.map((skill, index) => (
                  <motion.div key={index} variants={badgeVariants}>
                    <Badge
                      className="bg-[#112240] text-[#64FFDA] border border-[#64FFDA]/30 hover:border-[#64FFDA] hover:bg-[#64FFDA]/10 px-4 py-2 text-sm transition-all duration-300 cursor-pointer"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Techniques */}
            <motion.div variants={sectionVariants}>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <motion.span 
                  className="w-2 h-2 bg-[#64FFDA] rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                ></motion.span>
                Techniques & Methodologies
              </h3>
              <motion.div 
                className="flex flex-wrap gap-3"
                variants={badgeContainerVariants}
              >
                {skills.techniques.map((skill, index) => (
                  <motion.div key={index} variants={badgeVariants}>
                    <Badge
                      className="bg-[#112240] text-[#64FFDA] border border-[#64FFDA]/30 hover:border-[#64FFDA] hover:bg-[#64FFDA]/10 px-4 py-2 text-sm transition-all duration-300 cursor-pointer"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;