import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Calendar, Briefcase } from 'lucide-react';
import { Card } from './ui/card';

const Experience = ({ experience }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const parseText = (text) => {
    const parts = text.split('**');
    return parts.map((part, index) =>
      index % 2 === 1 ? <span key={index} className="text-white font-semibold">{part}</span> : part
    );
  };

  return (
    <section id="experience" className="py-24 relative bg-transparent" ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-20 text-center">
            <span className="text-cyan-500 font-mono text-sm mb-2 block">// section_05</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Experience<span className="text-cyan-400">.timeline</span>
            </h2>
            <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 md:before:ml-[50%] before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}
              >


                {/* Timeline Dot */}
                <div className="absolute left-5 md:left-1/2 w-6 h-6 -ml-3 md:-ml-3 rounded-full border-2 border-cyan-500 bg-slate-950 shadow-[0_0_10px_rgba(34,211,238,0.3)] z-10"></div>

                {/* Empty space for logic */}
                <div className="hidden md:block md:w-1/2"></div>

                {/* Card */}
                <div className={`w-[calc(100%-5rem)] md:w-1/2 ml-20 md:ml-0 p-1 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <Card className="bg-slate-900/80 border-slate-800 p-6 hover:border-cyan-500/40 transition-all duration-300 relative overflow-hidden group/card backdrop-blur-sm">
                    {/* Glow Effect */}
                    <div className="absolute top-0 right-0 p-4 opacity-100 transition-opacity">
                      <Briefcase className="w-16 h-16 text-cyan-500 transform rotate-12" />
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-cyan-400 mb-1 transition-colors">
                        {exp.title}
                      </h3>
                      <div className="text-slate-200 font-medium mb-4 flex items-center gap-2 text-sm">
                        <span className="text-cyan-500">@</span> {exp.company}
                      </div>

                      <div className="flex flex-wrap gap-4 text-xs text-slate-300 font-mono mb-6 border-b border-slate-800 pb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-cyan-500" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-cyan-500" />
                          {exp.location}
                        </div>
                      </div>

                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                            <span className="text-cyan-500 mt-1 shrink-0">▹</span>
                            <span className="flex-1">{parseText(achievement)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;