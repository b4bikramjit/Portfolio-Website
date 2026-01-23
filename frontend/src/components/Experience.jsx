import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { portfolioData } from '../mock';
import { Card } from './ui/card';

const Experience = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            <span className="text-[#64FFDA] font-mono text-xl mr-2">03.</span>
            Work Experience
          </h2>
          <div className="h-[1px] bg-[#8892B0]/20 mb-12"></div>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <Card
                key={exp.id}
                className="bg-[#112240] border-[#64FFDA]/20 p-6 md:p-8 hover:border-[#64FFDA] transition-all duration-300 hover:transform hover:translate-x-2"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-[#64FFDA] text-lg font-semibold mb-2">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex flex-col md:items-end gap-1 text-[#A8B2D1] text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-[#A8B2D1] flex gap-3">
                      <span className="text-[#64FFDA] mt-1.5">▹</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
