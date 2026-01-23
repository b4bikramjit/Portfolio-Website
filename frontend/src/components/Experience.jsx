import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { Card } from './ui/card';

const Experience = ({ experience }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const achievementVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <section id="experience" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 
            variants={cardVariants}
            className="text-3xl md:text-4xl font-bold text-white mb-2"
          >
            <span className="text-[#64FFDA] font-mono text-xl mr-2">03.</span>
            Work Experience
          </motion.h2>
          <motion.div 
            variants={cardVariants}
            className="h-[1px] bg-[#8892B0]/20 mb-12"
          ></motion.div>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={cardVariants}
                whileHover={{ x: 8, transition: { duration: 0.2 } }}
              >
                <Card className="bg-[#112240] border-[#64FFDA]/20 p-6 md:p-8 hover:border-[#64FFDA] transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-[#64FFDA] text-lg font-semibold mb-2">
                        {exp.company}
                      </p>
                    </motion.div>
                    <motion.div 
                      className="flex flex-col md:items-end gap-1 text-[#A8B2D1] text-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.2 + 0.1 }}
                    >
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{exp.location}</span>
                      </div>
                    </motion.div>
                  </div>

                  <motion.ul 
                    className="space-y-3"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: index * 0.2 + 0.2
                        }
                      }
                    }}
                  >
                    {exp.achievements.map((achievement, idx) => (
                      <motion.li 
                        key={idx} 
                        className="text-[#A8B2D1] flex gap-3"
                        variants={achievementVariants}
                      >
                        <span className="text-[#64FFDA] mt-1.5">▹</span>
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;