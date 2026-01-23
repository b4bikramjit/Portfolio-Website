import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github, MapPin, Send } from 'lucide-react';
import { portfolioData } from '../mock';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from '../hooks/use-toast';

const Contact = () => {
  const { personal } = portfolioData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            <span className="text-[#64FFDA] font-mono text-xl mr-2">05.</span>
            Get In Touch
          </h2>
          <div className="h-[1px] bg-[#8892B0]/20 mb-12"></div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <p className="text-[#A8B2D1] text-lg mb-8 leading-relaxed">
                I'm currently open to new opportunities and collaborations. 
                Whether you have a project in mind or just want to connect, 
                feel free to reach out!
              </p>

              <div className="space-y-4">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-3 text-[#A8B2D1] hover:text-[#64FFDA] transition-colors group"
                >
                  <div className="p-3 bg-[#112240] rounded-lg group-hover:bg-[#64FFDA]/10 transition-colors">
                    <Mail size={20} className="text-[#64FFDA]" />
                  </div>
                  <span>{personal.email}</span>
                </a>

                <a
                  href={`tel:${personal.phone}`}
                  className="flex items-center gap-3 text-[#A8B2D1] hover:text-[#64FFDA] transition-colors group"
                >
                  <div className="p-3 bg-[#112240] rounded-lg group-hover:bg-[#64FFDA]/10 transition-colors">
                    <Phone size={20} className="text-[#64FFDA]" />
                  </div>
                  <span>{personal.phone}</span>
                </a>

                <div className="flex items-center gap-3 text-[#A8B2D1]">
                  <div className="p-3 bg-[#112240] rounded-lg">
                    <MapPin size={20} className="text-[#64FFDA]" />
                  </div>
                  <span>{personal.location}</span>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#112240] rounded-lg hover:bg-[#64FFDA]/10 transition-colors group"
                >
                  <Github size={24} className="text-[#64FFDA]" />
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#112240] rounded-lg hover:bg-[#64FFDA]/10 transition-colors group"
                >
                  <Linkedin size={24} className="text-[#64FFDA]" />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-[#112240] border-[#64FFDA]/20 p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[#64FFDA] text-sm mb-2 block font-mono">
                    Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-[#0A192F] border-[#64FFDA]/30 text-white focus:border-[#64FFDA]"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="text-[#64FFDA] text-sm mb-2 block font-mono">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-[#0A192F] border-[#64FFDA]/30 text-white focus:border-[#64FFDA]"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="text-[#64FFDA] text-sm mb-2 block font-mono">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-[#0A192F] border-[#64FFDA]/30 text-white focus:border-[#64FFDA] resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#64FFDA] text-[#0A192F] hover:bg-[#64FFDA]/90 py-6 text-base font-semibold"
                >
                  <Send size={18} className="mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
