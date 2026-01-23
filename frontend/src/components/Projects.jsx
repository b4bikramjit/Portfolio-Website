import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const Projects = ({ projects }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" className="py-20 relative" ref={ref}>
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
            <span className="text-[#64FFDA] font-mono text-xl mr-2">04.</span>
            Featured Projects
          </motion.h2>
          <motion.div 
            variants={cardVariants}
            className="h-[1px] bg-[#8892B0]/20 mb-12"
          ></motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="bg-[#112240] border-[#64FFDA]/20 overflow-hidden hover:border-[#64FFDA] transition-all duration-300 flex flex-col h-full">
                  {/* Project Image */}
                  <motion.div 
                    className="w-full h-48 overflow-hidden relative group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#112240] to-transparent opacity-60"></div>
                  </motion.div>

                  <div className="p-6 flex-1 flex flex-col">
                    <motion.h3 
                      className="text-xl font-bold text-white mb-3"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {project.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-[#A8B2D1] text-sm mb-4 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {project.description}
                    </motion.p>

                    {/* Metrics */}
                    <motion.div 
                      className="mb-4 space-y-1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.4 }}
                    >
                      {Object.entries(project.metrics).map(([key, value], index) => (
                        <motion.div 
                          key={key} 
                          className="text-[#64FFDA] text-base font-mono font-semibold"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          {value}
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Technologies */}
                    <motion.div 
                      className="flex flex-wrap gap-2 mb-4"
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      variants={{
                        visible: {
                          transition: {
                            staggerChildren: 0.05,
                            delayChildren: 0.6
                          }
                        }
                      }}
                    >
                      {project.technologies.map((tech, idx) => (
                        <motion.div
                          key={idx}
                          variants={{
                            hidden: { opacity: 0, scale: 0 },
                            visible: { opacity: 1, scale: 1 }
                          }}
                        >
                          <Badge className="bg-[#0A192F] text-[#64FFDA] border-none text-xs px-2 py-1">
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Links */}
                    <motion.div 
                      className="flex gap-3 mt-auto"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Button
                        onClick={() => window.open(project.github, '_blank')}
                        className="bg-transparent border border-[#64FFDA]/30 text-[#64FFDA] hover:bg-[#64FFDA]/10 flex-1 py-2"
                      >
                        <Github size={16} className="mr-2" />
                        Code
                      </Button>
                      <Button
                        onClick={() => window.open(project.link, '_blank')}
                        className="bg-transparent border border-[#64FFDA]/30 text-[#64FFDA] hover:bg-[#64FFDA]/10 flex-1 py-2"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Demo
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;