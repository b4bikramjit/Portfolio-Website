import React from 'react';
import { portfolioData } from '../mock';
import { Badge } from './ui/badge';

const Skills = () => {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            <span className="text-[#64FFDA] font-mono text-xl mr-2">02.</span>
            Skills & Technologies
          </h2>
          <div className="h-[1px] bg-[#8892B0]/20 mb-12"></div>

          <div className="space-y-8">
            {/* Programming */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#64FFDA] rounded-full"></span>
                Programming Languages & Libraries
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.programming.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-[#112240] text-[#64FFDA] border border-[#64FFDA]/30 hover:border-[#64FFDA] hover:bg-[#64FFDA]/10 px-4 py-2 text-sm transition-all duration-300"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Software */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#64FFDA] rounded-full"></span>
                Software & Tools
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.software.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-[#112240] text-[#64FFDA] border border-[#64FFDA]/30 hover:border-[#64FFDA] hover:bg-[#64FFDA]/10 px-4 py-2 text-sm transition-all duration-300"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Techniques */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#64FFDA] rounded-full"></span>
                Techniques & Methodologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.techniques.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-[#112240] text-[#64FFDA] border border-[#64FFDA]/30 hover:border-[#64FFDA] hover:bg-[#64FFDA]/10 px-4 py-2 text-sm transition-all duration-300"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
