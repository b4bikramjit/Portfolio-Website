import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = ({ personal }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-[#8892B0]/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[#A8B2D1] text-sm">
            © {currentYear} {personal.name}. Built with data and passion.
          </div>

          <div className="flex gap-4">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A8B2D1] hover:text-[#64FFDA] transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A8B2D1] hover:text-[#64FFDA] transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="text-[#A8B2D1] hover:text-[#64FFDA] transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
