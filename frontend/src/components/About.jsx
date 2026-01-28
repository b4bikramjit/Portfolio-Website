import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card } from './ui/card';
import { MapPin, Calendar, GraduationCap, Code } from 'lucide-react';

const About = ({ about }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="about" className="py-24 relative bg-transparent" ref={ref}>
      {/* Background Dots */}


      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <span className="text-cyan-500 font-mono text-sm mb-2 block">// section_02</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About<span className="text-cyan-400">.me</span>
            </h2>
            <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Column: Code Window */}
            <motion.div variants={itemVariants} className="relative">
              {/* Window Controls */}
              <div className="absolute -top-6 left-0 right-0 h-12 bg-slate-800 rounded-t-xl flex items-center px-4 gap-2 z-10 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 font-mono text-xs text-slate-400">bikramjit_profile.json</div>
              </div>

              {/* Code Content */}
              <Card className="bg-slate-900 border-slate-800 p-8 pt-8 rounded-xl font-mono text-sm shadow-2xl relative mt-6">
                <div className="text-slate-300 space-y-2 leading-relaxed">
                  <div><span className="text-amber-500">{`{`}</span></div>
                  <div className="pl-4">
                    <span className="text-sky-400">"name"</span>: <span className="text-emerald-400">"Bikramjit Singh"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-sky-400">"role"</span>: <span className="text-emerald-400">"Data Analyst"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-sky-400">"passion"</span>: <span className="text-emerald-400">"Turning data into insights"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-sky-400">"status"</span>: <span className="text-amber-400">"seeking_opportunities"</span>
                  </div>
                  <div><span className="text-amber-500">{`}`}</span></div>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                    <div className="p-2 bg-slate-700 rounded-md">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Location</div>
                      <div className="text-slate-300 text-xs">Waterloo, ON</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                    <div className="p-2 bg-slate-700 rounded-md">
                      <GraduationCap className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Education</div>
                      <div className="text-slate-300 text-xs text-nowrap">BMath Statistics @ UWaterloo</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                    <div className="p-2 bg-slate-700 rounded-md">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Expected Grad</div>
                      <div className="text-slate-300 text-xs">2027</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                    <div className="p-2 bg-slate-700 rounded-md">
                      <Code className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Focus</div>
                      <div className="text-slate-300 text-xs">Data Science & ML</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Right Column: Narrative */}
            <motion.div variants={itemVariants} className="text-slate-300 text-lg leading-loose">
              <p className="mb-6">
                I'm a Statistics student at the <span className="text-cyan-400 font-semibold relative inline-block">University of Waterloo<span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400/50"></span></span> with a deep passion for uncovering stories hidden in data. My journey combines rigorous mathematical foundations with practical machine learning applications.
              </p>
              <p className="mb-6">
                From building regression & classification models to analyzing large datasets, I thrive on transforming raw data into actionable insights. My experience spans market research, ML development, and creating analytics dashboards that drive real business decisions.
              </p>
              <p>
                When I'm not wrangling data, you'll find me exploring new visualization techniques or diving into the latest ML research papers. I believe that great data science is about asking the right questions, not just finding the answers.
              </p>

              <div className="mt-8 flex gap-3 flex-wrap">
                {["Python", "SQL", "ML", "Data Viz", "Statistics"].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-sm font-mono hover:bg-cyan-500/20 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
