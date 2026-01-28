import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Code2, PenTool, Database } from 'lucide-react';

const Skills = ({ skills }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="skills" className="py-24 relative bg-transparent" ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <span className="text-cyan-500 font-mono text-sm mb-2 block">// section_03</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Skills<span className="text-cyan-400">.analytics</span>
            </h2>
            <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full"></div>
            <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-lg">
              Technical proficiency metrics across data science, machine learning, and analytics
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Programming - Blue/Cyan Theme */}
            <motion.div variants={itemVariants} className="h-full">
              <Card className="h-full bg-slate-900/80 border-cyan-500/30 p-6 shadow-lg shadow-cyan-900/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-500/20 rounded-lg text-cyan-400 border border-cyan-500/30">
                      <Code2 size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Programming</h3>
                      <p className="text-xs text-cyan-400/70">Languages & Core</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-cyan-300 bg-cyan-950/50 px-2 py-1 rounded border border-cyan-500/30">
                    {skills.programming.length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.programming.map((skill, idx) => (
                    <Badge key={idx} className="bg-cyan-950/30 text-cyan-300 border-cyan-500/30 px-3 py-1.5 text-sm cursor-default hover:bg-cyan-900/50 transition-colors">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Software - Purple/Indigo Theme */}
            <motion.div variants={itemVariants} className="h-full">
              <Card className="h-full bg-slate-900/80 border-indigo-500/30 p-6 shadow-lg shadow-indigo-900/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-500/20 rounded-lg text-indigo-400 border border-indigo-500/30">
                      <PenTool size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Software & Tools</h3>
                      <p className="text-xs text-indigo-400/70">Analytics Platforms</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-indigo-300 bg-indigo-950/50 px-2 py-1 rounded border border-indigo-500/30">
                    {skills.software.length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.software.map((skill, idx) => (
                    <Badge key={idx} className="bg-indigo-950/30 text-indigo-300 border-indigo-500/30 px-3 py-1.5 text-sm cursor-default hover:bg-indigo-900/50 transition-colors">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Techniques - Emerald/Teal Theme */}
            <motion.div variants={itemVariants} className="h-full">
              <Card className="h-full bg-slate-900/80 border-emerald-500/30 p-6 shadow-lg shadow-emerald-900/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/20 rounded-lg text-emerald-400 border border-emerald-500/30">
                      <Database size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Techniques</h3>
                      <p className="text-xs text-emerald-400/70">Methodologies</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-emerald-300 bg-emerald-950/50 px-2 py-1 rounded border border-emerald-500/30">
                    {skills.techniques.length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.techniques.map((skill, idx) => (
                    <Badge key={idx} className="bg-emerald-950/30 text-emerald-300 border-emerald-500/30 px-3 py-1.5 text-sm cursor-default hover:bg-emerald-900/50 transition-colors">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;