import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-slate-950 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-500/10 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-navy-500/10 rounded-full mix-blend-multiply filter blur-[100px] animate-blob"></div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section heading */}
        <div className="flex flex-col items-center justify-center mb-16">
          <h2 className="text-sm font-medium text-teal-400 uppercase tracking-widest mb-3">About Me</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            My Background & Experience
          </h3>
          <div className="w-16 h-1 bg-teal-400 rounded-full mb-6"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left column - Image */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative">
              {/* Main image frame */}
              <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden border-4 border-slate-800 shadow-xl">
                {/* Placeholder for profile image - replace with your actual image */}
                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                  <span className="text-teal-400 text-lg font-mono">[ Your Photo ]</span>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-6 -right-6 w-64 h-64 md:w-80 md:h-80 border-4 border-teal-400/20 rounded-lg -z-10"></div>
              <div className="absolute -bottom-6 -left-6 w-64 h-64 md:w-80 md:h-80 border-4 border-navy-400/20 rounded-lg -z-10"></div>
            </div>
          </div>
          
          {/* Right column - Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Student Developer with a passion for both frontend and backend technologies</h3>
              
              <p className="text-slate-300 leading-relaxed">
                I'm a student developer with a focus on creating exceptional digital experiences. I specialize in React for frontend development and Flask for backend solutions, building accessible, user-centered applications.
              </p>
              
              <p className="text-slate-300 leading-relaxed">
                My journey in tech began with a curiosity about how digital experiences are created, which led me to pursue a degree in Computer Science. I'm constantly learning and challenging myself with new projects that allow me to apply classroom knowledge to real-world problems.
              </p>
              
              <p className="text-slate-300 leading-relaxed">
                When I'm not coding or studying, I enjoy exploring new technologies, participating in hackathons, and collaborating with fellow student developers on innovative projects.
              </p>
            </div>
            
            {/* Key facts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-lg border border-slate-800/50">
                <div className="text-teal-400 text-3xl font-bold mb-1">2+</div>
                <div className="text-slate-300 text-sm">Years Coding</div>
              </div>
              
              <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-lg border border-slate-800/50">
                <div className="text-teal-400 text-3xl font-bold mb-1">5+</div>
                <div className="text-slate-300 text-sm">Projects Built</div>
              </div>
              
              <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-lg border border-slate-800/50">
                <div className="text-teal-400 text-3xl font-bold mb-1">8+</div>
                <div className="text-slate-300 text-sm">Technologies</div>
              </div>
              
              <div className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-lg border border-slate-800/50">
                <div className="text-teal-400 text-3xl font-bold mb-1">3+</div>
                <div className="text-slate-300 text-sm">Hackathons</div>
              </div>
            </div>
            
            {/* CTA */}
            <div className="pt-6 flex flex-wrap gap-4">
              <a 
                href="/Savitender_Singh_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-slate-900 font-medium rounded-md transition-colors duration-300 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                </svg>
                Download Resume
              </a>
              
              <a 
                href="#contact" 
                className="px-6 py-3 border border-teal-400 text-teal-400 hover:bg-teal-400/10 font-medium rounded-md transition-colors duration-300"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
