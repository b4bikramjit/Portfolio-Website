import React, { useState, useEffect } from 'react';
import { portfolioData } from './data/portfolioData';
import ParticleBackground from './components/ParticleBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Storytelling from './components/Storytelling';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a brief loading time to keep the original feel, or just set it immediately.
    // Adding a small delay for the particle background to initialize smoothly.
    const timer = setTimeout(() => {
      setData(portfolioData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="App">
        <ParticleBackground />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-[#64FFDA] text-xl font-mono">Loading...</div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="App">
        <ParticleBackground />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-red-500 text-xl mb-4">No data available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <ParticleBackground />
      <Header />
      <main>
        <Hero personal={data.personal} />
        <About about={data.about} />
        <Skills skills={data.skills} />
        <Experience experience={data.experience} />
        <Projects projects={data.projects} />
        <Storytelling storytelling={data.storytelling} />
        <Contact personal={data.personal} />
      </main>
      <Footer personal={data.personal} />
      <Toaster />
    </div>
  );
}

export default App;
