import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, Home, Trophy, Shield, Youtube, ShoppingCart, FileText } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const Projects = ({ projects }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Helper to get icon based on project title (mock logic since we don't have per-project icon data)
  const getProjectIcon = (title) => {
    if (title.includes("House")) return <Home className="w-8 h-8 text-cyan-400" />;
    if (title.includes("IPL")) return <Trophy className="w-8 h-8 text-cyan-400" />;
    if (title.includes("Phishing")) return <Shield className="w-8 h-8 text-cyan-400" />;
    if (title.includes("YouTube")) return <Youtube className="w-8 h-8 text-cyan-400" />;
    if (title.includes("SuperStore")) return <ShoppingCart className="w-8 h-8 text-cyan-400" />;
    if (title.includes("Marketing")) return <FileText className="w-8 h-8 text-cyan-400" />;
    return <Github className="w-8 h-8 text-cyan-400" />;
  };

  return (
    <section id="projects" className="py-24 relative bg-transparent" ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={cardVariants} className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Projects<span className="text-cyan-400">.showcase</span>
            </h2>
            <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full"></div>
            <p className="text-slate-400 mt-6 max-w-2xl mx-auto leading-relaxed">
              A collection of data science and machine learning projects demonstrating end-to-end analytics capabilities
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className="h-full"
              >
                <Card className="h-full bg-slate-900 border-slate-800 flex flex-col hover:border-cyan-500/30 transition-all duration-300 relative group overflow-hidden">

                  {/* Cover Image */}
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={project.image || `https://source.unsplash.com/random/800x600?data,${index}`} // Fallback or use seeded image
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-transparent group-hover:bg-slate-950/20 transition-colors" />

                    {/* Floating Icon */}
                    <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md p-2 rounded-lg border border-slate-700/50 text-cyan-400 shadow-lg">
                      {getProjectIcon(project.title)}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    {/* Background Number */}
                    <div className="absolute top-52 right-6 text-6xl font-bold text-slate-800/20 pointer-events-none select-none z-0">
                      0{index + 1}
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors relative z-10">
                      {project.title}
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed mb-4 relative z-10 flex-grow">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    <div className="flex gap-6 mb-4 border-t border-slate-800 pt-4 relative z-10">
                      {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-xl font-bold text-cyan-400 mb-1">{value}</div>
                          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <Badge key={idx} className="bg-slate-950 text-slate-400 border-slate-800 hover:text-cyan-400 hover:border-cyan-500/30">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-4 border-t border-slate-800/50 relative z-10">
                      <button
                        onClick={() => window.open(project.github, '_blank')}
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <Github size={18} /> Code
                      </button>
                      <button
                        onClick={() => window.open(project.link, '_blank')}
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <ExternalLink size={18} /> Live Demo
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-16 text-center">
            <Button
              className="bg-transparent border border-cyan-500/30 text-cyan-400 hover:bg-cyan-950/30 hover:border-cyan-400 px-8 py-6 rounded-lg font-mono text-sm transition-all"
              onClick={() => window.open('https://github.com/b4bikramjit?tab=repositories', '_blank')}
            >
              view_more_on_github()
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;