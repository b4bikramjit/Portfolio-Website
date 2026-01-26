import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ParticleBackground from './components/ParticleBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get(`${API}/portfolio`);
        setPortfolioData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching portfolio data:', err);
        const errorMessage = err.response?.data?.detail || err.message || 'Failed to load portfolio data';
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchPortfolioData();
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

  if (error || !portfolioData) {
    return (
      <div className="App">
        <ParticleBackground />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-red-500 text-xl mb-4">{error || 'No data available'}</div>
          <div className="text-gray-400 text-sm font-mono bg-black/50 p-4 rounded">
            <p>Debug Info:</p>
            <p>Target URL: {API}/portfolio</p>
            <p>Backend URL Env: {BACKEND_URL || 'Undefined'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <ParticleBackground />
      <Header />
      <main>
        <Hero personal={portfolioData.personal} />
        <About about={portfolioData.about} />
        <Skills skills={portfolioData.skills} />
        <Experience experience={portfolioData.experience} />
        <Projects projects={portfolioData.projects} />
        <Contact personal={portfolioData.personal} />
      </main>
      <Footer personal={portfolioData.personal} />
      <Toaster />
    </div>
  );
}

export default App;
