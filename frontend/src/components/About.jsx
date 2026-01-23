import React from 'react';
import { Card } from './ui/card';

const About = ({ about }) => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            <span className="text-[#64FFDA] font-mono text-xl mr-2">01.</span>
            About Me
          </h2>
          <div className="h-[1px] bg-[#8892B0]/20 mb-12"></div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-[#A8B2D1] text-lg leading-relaxed mb-6">
                {about.description}
              </p>
              <p className="text-[#A8B2D1] text-lg leading-relaxed">
                I specialize in turning complex datasets into clear, actionable insights that drive business value. 
                My experience spans machine learning, statistical analysis, and business intelligence across various industries.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {about.highlights.map((highlight, index) => (
                <Card
                  key={index}
                  className="bg-[#112240] border-[#64FFDA]/20 p-6 hover:border-[#64FFDA] transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="text-4xl font-bold text-[#64FFDA] mb-2">
                    {highlight.value}
                  </div>
                  <div className="text-[#A8B2D1] text-sm">
                    {highlight.label}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
