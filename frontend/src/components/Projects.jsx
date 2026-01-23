import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const Projects = ({ projects }) => {
  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            <span className="text-[#64FFDA] font-mono text-xl mr-2">04.</span>
            Featured Projects
          </h2>
          <div className="h-[1px] bg-[#8892B0]/20 mb-12"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="bg-[#112240] border-[#64FFDA]/20 overflow-hidden hover:border-[#64FFDA] transition-all duration-300 hover:transform hover:scale-105 flex flex-col"
              >
                {/* Project Image */}
                <div className="w-full h-48 overflow-hidden relative group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#112240] to-transparent opacity-60"></div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-[#A8B2D1] text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="mb-4 space-y-1">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="text-[#64FFDA] text-base font-mono font-semibold">
                        {value}
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <Badge
                        key={idx}
                        className="bg-[#0A192F] text-[#64FFDA] border-none text-xs px-2 py-1"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 mt-auto">
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
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
