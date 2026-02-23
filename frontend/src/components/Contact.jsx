import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, MapPin, Send, Code, Terminal } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from '../hooks/use-toast';
const Contact = ({ personal }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ... (handleSubmit and handleChange methods identical to before ...
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.message.length < 10) {
      toast({
        title: "Validation Error",
        description: "Message should be at least 10 characters.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message.",
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
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="contact" className="py-24 relative bg-transparent" ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-20 text-center">
            <span className="text-cyan-500 font-mono text-sm mb-2 block">// section_06</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get In<span className="text-cyan-400">.touch</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto">
              Interested in collaborating on data projects or have an opportunity? Let's connect!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Contact Info Card */}
            <motion.div variants={itemVariants}>
              <div className="relative">
                {/* Decorative Header */}
                <div className="h-8 bg-[#1e293b] rounded-t-lg flex items-center px-4 gap-2 border border-slate-700 border-b-0">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-xs text-slate-500 font-mono">contact_info.sh</span>
                </div>

                <Card className="bg-[#0f172a] border-slate-700 rounded-b-lg rounded-t-none p-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 group">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 group-hover:border-cyan-500/50 transition-colors">
                        <Mail className="text-cyan-500" size={20} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-bold uppercase mb-1">Email</div>
                        <div className="text-white font-mono text-sm">{personal.email}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 group-hover:border-cyan-500/50 transition-colors">
                        <Phone className="text-cyan-500" size={20} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-bold uppercase mb-1">Phone</div>
                        <div className="text-white font-mono text-sm">{personal.phone}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 group-hover:border-cyan-500/50 transition-colors">
                        <MapPin className="text-cyan-500" size={20} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-bold uppercase mb-1">Location</div>
                        <div className="text-white font-mono text-sm">{personal.location}</div>
                      </div>
                    </div>
                  </div>

                  {/* Social Buttons */}
                  <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-800">
                    <a href={personal.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white hover:border-cyan-500/50 transition-all">
                      <Github size={18} /> <span>GitHub</span>
                    </a>
                    <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white hover:border-cyan-500/50 transition-all">
                      <Linkedin size={18} /> <span>LinkedIn</span>
                    </a>
                  </div>
                </Card>
              </div>
            </motion.div>

            {/* Right: Code Editor Form */}
            <motion.div variants={itemVariants}>
              <div className="relative">
                {/* Decorative Header */}
                <div className="h-8 bg-[#1e293b] rounded-t-lg flex items-center px-4 gap-2 border border-slate-700 border-b-0">
                  <Terminal size={14} className="text-slate-400" />
                  <span className="ml-2 text-xs text-slate-400 font-mono">send_message.py</span>
                </div>

                <Card className="bg-[#0f172a] border-slate-700 rounded-b-lg rounded-t-none p-8">
                  <form onSubmit={handleSubmit} className="space-y-6 font-mono text-sm">

                    <div className="group">
                      <label className="block text-purple-400 mb-2">name <span className="text-white">=</span> <span className="text-green-400">"</span></label>
                      <div className="relative">
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-slate-900 border-slate-800 text-white pl-4 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 shadow-inner h-12"
                          placeholder="Your Name"
                        />
                        <span className="absolute right-3 top-3 text-green-400">"</span>
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-purple-400 mb-2">email <span className="text-white">=</span> <span className="text-green-400">"</span></label>
                      <div className="relative">
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-slate-900 border-slate-800 text-white pl-4 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 shadow-inner h-12"
                          placeholder="your@email.com"
                        />
                        <span className="absolute right-3 top-3 text-green-400">"</span>
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-purple-400 mb-2">message <span className="text-white">=</span> <span className="text-green-400">"""</span></label>
                      <div className="relative">
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="bg-slate-900 border-slate-800 text-white p-4 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 shadow-inner resize-none leading-relaxed"
                          placeholder="Your message..."
                        />
                        <div className="absolute bottom-2 right-2 text-green-400 text-xs">"""</div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-6 mt-4 font-sans font-semibold disabled:opacity-50 transition-all rounded-lg shadow-lg shadow-cyan-900/20"
                    >
                      <Send size={18} className="mr-2" />
                      <span className="font-mono">send_message()</span>
                    </Button>

                  </form>
                </Card>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Contact;