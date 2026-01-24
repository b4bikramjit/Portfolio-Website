import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, MapPin, Send } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = ({ personal }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      toast({
        title: "Message Sent!",
        description: response.data.message || "Thank you for reaching out. I'll get back to you soon.",
      });
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const contactItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="contact" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-white mb-2"
          >
            <span className="text-[#64FFDA] font-mono text-xl mr-2">05.</span>
            Get In Touch
          </motion.h2>
          <motion.div 
            variants={itemVariants}
            className="h-[1px] bg-[#8892B0]/20 mb-12"
          ></motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div variants={containerVariants}>
              <motion.p 
                variants={itemVariants}
                className="text-[#A8B2D1] text-lg mb-8 leading-relaxed"
              >
                I'm currently open to new opportunities and collaborations. 
                Whether you have a project in mind or just want to connect, 
                feel free to reach out!
              </motion.p>

              <motion.div 
                className="space-y-4"
                variants={containerVariants}
              >
                <motion.a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-3 text-[#A8B2D1] hover:text-[#64FFDA] transition-colors group"
                  variants={contactItemVariants}
                  whileHover={{ x: 10 }}
                >
                  <div className="p-3 bg-[#112240] rounded-lg group-hover:bg-[#64FFDA]/10 transition-colors">
                    <Mail size={20} className="text-[#64FFDA]" />
                  </div>
                  <span>{personal.email}</span>
                </motion.a>

                <motion.a
                  href={`tel:${personal.phone}`}
                  className="flex items-center gap-3 text-[#A8B2D1] hover:text-[#64FFDA] transition-colors group"
                  variants={contactItemVariants}
                  whileHover={{ x: 10 }}
                >
                  <div className="p-3 bg-[#112240] rounded-lg group-hover:bg-[#64FFDA]/10 transition-colors">
                    <Phone size={20} className="text-[#64FFDA]" />
                  </div>
                  <span>{personal.phone}</span>
                </motion.a>

                <motion.div 
                  className="flex items-center gap-3 text-[#A8B2D1]"
                  variants={contactItemVariants}
                >
                  <div className="p-3 bg-[#112240] rounded-lg">
                    <MapPin size={20} className="text-[#64FFDA]" />
                  </div>
                  <span>{personal.location}</span>
                </motion.div>
              </motion.div>

              <motion.div 
                className="flex gap-4 mt-8"
                variants={containerVariants}
              >
                <motion.a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#112240] rounded-lg hover:bg-[#64FFDA]/10 transition-colors group"
                  variants={contactItemVariants}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={24} className="text-[#64FFDA]" />
                </motion.a>
                <motion.a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#112240] rounded-lg hover:bg-[#64FFDA]/10 transition-colors group"
                  variants={contactItemVariants}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin size={24} className="text-[#64FFDA]" />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <Card className="bg-[#112240] border-[#64FFDA]/20 p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="text-[#64FFDA] text-sm mb-2 block font-mono">
                      Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="bg-[#0A192F] border-[#64FFDA]/30 text-white focus:border-[#64FFDA]"
                      placeholder="Your name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="text-[#64FFDA] text-sm mb-2 block font-mono">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="bg-[#0A192F] border-[#64FFDA]/30 text-white focus:border-[#64FFDA]"
                      placeholder="your.email@example.com"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="text-[#64FFDA] text-sm mb-2 block font-mono">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      rows={5}
                      className="bg-[#0A192F] border-[#64FFDA]/30 text-white focus:border-[#64FFDA] resize-none"
                      placeholder="Your message..."
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#64FFDA] text-[#0A192F] hover:bg-[#64FFDA]/90 py-6 text-base font-semibold disabled:opacity-50"
                    >
                      <Send size={18} className="mr-2" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </motion.div>
                </form>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;