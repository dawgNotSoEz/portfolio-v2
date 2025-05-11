import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectsSection from './components/ProjectsSection';
import GitHubSection from './components/GitHubSection';

function App() {
  useEffect(() => {
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80, // Offset for navbar
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }, []);

  return (
    <Router>
      <div className="bg-slate-950 text-white min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <ProjectsSection showSection={true} />
          <GitHubSection showSection={true} />
          <Contact />
          <Footer />
        </main>
      </div>
    </Router>
  );
}

export default App;
