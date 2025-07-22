import React, { useState, useEffect, useRef } from 'react';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const roles = ['Frontend Developer (React)', 'Backend Developer (Flask)', 'Creative Coder', 'Problem Solver', 'UI/UX Enthusiast'];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  // Typing effect
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    
    const handleTyping = () => {
      // If deleting
      if (isDeleting) {
        setTypedText(currentRole.substring(0, typedText.length - 1));
        setTypingSpeed(50); // Faster when deleting
        
        // When fully deleted, start typing the next role
        if (typedText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((currentRoleIndex + 1) % roles.length);
          setTypingSpeed(150);
        }
      } 
      // If typing
      else {
        setTypedText(currentRole.substring(0, typedText.length + 1));
        
        // When fully typed, pause then start deleting
        if (typedText === currentRole) {
          setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      }
    };
    
    const typingTimer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimer);
  }, [typedText, currentRoleIndex, isDeleting, roles, typingSpeed]);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-slate-950 z-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.15]"></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-teal-500/20 rounded-full mix-blend-multiply filter blur-[128px] animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-navy-500/20 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
            <div>
              <h2 className="text-lg font-medium text-teal-400 mb-3">Hello, my name is</h2>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                Savitender <span className="text-teal-400">Singh</span>
              </h1>
              <div className="h-16 md:h-12">
                <p className="text-xl md:text-2xl text-slate-300 font-light">
                  <span className="text-teal-400">&gt;</span> {typedText}
                  <span className="inline-block w-2 h-6 ml-1 bg-teal-400 animate-blink"></span>
                </p>
              </div>
            </div>
            
            <p className="text-slate-300 max-w-lg">
              I craft responsive and performant web applications with clean, maintainable code. 
              Focused on creating intuitive user experiences through modern web technologies.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a 
                href="#projects" 
                className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-slate-900 font-medium rounded-md transition-colors duration-300 flex items-center gap-2"
              >
                View My Work
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://drive.google.com/file/d/1bY-dM58Vt2DrFdVXFLSTiGkOPvTidkZC/view" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 border border-teal-400 text-teal-400 hover:bg-teal-400/10 font-medium rounded-md transition-colors duration-300"
              >
                Resume
              </a>
            </div>
            
            <div className="flex items-center gap-6 justify-center md:justify-start">
              <a 
                href="https://github.com/dawgNotSoEz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-teal-400 transition-colors duration-300"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/savitendersingh/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-teal-400 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="mailto:singhsavitender4031@gmail.com" 
                className="text-slate-300 hover:text-teal-400 transition-colors duration-300"
                aria-label="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Right content - Interactive Terminal */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full max-w-md">
              {/* Terminal-style code card with hover/click expansion */}
              <div className="group relative bg-slate-900 rounded-lg border border-slate-700 shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-teal-500/50 cursor-pointer">
                {/* Terminal header */}
                <div className="bg-slate-800 px-4 py-2 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">developer.js</div>
                </div>
                
                {/* Initial code snippet (always visible) */}
                <div className="p-4 transition-all duration-300 hover:bg-slate-800/50">
                  <pre className="text-sm text-slate-300 font-mono">
                    <code>
                      <span className="text-teal-400">class</span> <span className="text-blue-400">Developer</span> {'{'}
                        <span className="text-purple-400">name</span> = <span className="text-yellow-300">'Savitender Singh'</span>
                        <span className="text-purple-400">title</span> = <span className="text-yellow-300">'Full Stack Developer'</span>
                        <span className="text-purple-400">skills</span> = [<span className="text-yellow-300">'React'</span>, <span className="text-yellow-300">'Node.js'</span>, <span className="text-yellow-300">'TypeScript'</span>]
                      {'}'}
                    </code>
                  </pre>
                </div>
                
                {/* Expanded terminal content (visible on hover/click) */}
                <div className="max-h-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-96 bg-slate-800/50">
                  <div className="p-4 border-t border-slate-700/50">
                    <div className="flex items-center mb-2">
                      <span className="text-teal-400 font-mono text-xs">$ </span>
                      <span className="text-slate-300 font-mono text-xs ml-2">developer.showDetails()</span>
                    </div>
                    <div className="text-xs text-slate-300 font-mono space-y-2">
                      <p><span className="text-teal-400">→</span> <span className="text-purple-400">location:</span> <span className="text-yellow-300">'Remote'</span></p>
                      <p><span className="text-teal-400">→</span> <span className="text-purple-400">experience:</span> <span className="text-yellow-300">'5+ years'</span></p>
                      <p><span className="text-teal-400">→</span> <span className="text-purple-400">education:</span> <span className="text-yellow-300">'Computer Science'</span></p>
                      <p><span className="text-teal-400">→</span> <span className="text-purple-400">interests:</span> [<span className="text-yellow-300">'Web Development'</span>, <span className="text-yellow-300">'UI/UX'</span>, <span className="text-yellow-300">'AI'</span>]</p>
                      <p><span className="text-teal-400">→</span> <span className="text-purple-400">currentlyLearning:</span> <span className="text-yellow-300">'Blockchain Development'</span></p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Ready to collaborate indicator */}
              <div className="flex items-center mt-4 ml-4">
                <div className="h-2 w-2 rounded-full bg-teal-400 mr-2 animate-pulse"></div>
                <span className="text-teal-400 text-sm font-mono">Ready to collaborate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
