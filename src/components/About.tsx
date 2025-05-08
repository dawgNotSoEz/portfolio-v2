import React from 'react';

const About = () => {
  const skills = [
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'TypeScript', level: 75 },
    { name: 'Three.js', level: 70 },
    { name: 'CSS/SCSS', level: 85 },
  ];

  return (
    <div className="py-20 px-4 relative overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 z-0">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-40 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        </div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 mb-12 text-center animate-text-shimmer">
          About Me
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 shadow-xl animate-fade-in-delay transform transition-all duration-500 hover:shadow-indigo-500/20 hover:border-indigo-500/50">
            <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-6">Who I Am</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              I'm a passionate full-stack developer with expertise in building modern web applications.
              With a strong foundation in both frontend and backend technologies, I create seamless,
              user-friendly experiences that solve real-world problems.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              My journey in tech began with a curiosity about how digital experiences are created,
              which led me to pursue a degree in Computer Science. Since then, I've worked on various
              projects ranging from e-commerce platforms to data visualization tools.
            </p>
            <p className="text-gray-300 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source
              projects, or sharing my knowledge through blog posts and community events.
            </p>
            
            <div className="mt-8 flex space-x-4">
              <a href="#" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                Download Resume
              </a>
            </div>
          </div>
          
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 shadow-xl animate-fade-in-delay-2 transform transition-all duration-500 hover:shadow-indigo-500/20 hover:border-indigo-500/50">
            <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-6">Skills</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="transform transition-all duration-500 hover:translate-x-2">
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-indigo-400 font-medium">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 shadow-inner overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000 ease-out transform origin-left" 
                      style={{ 
                        width: `${skill.level}%`,
                        animation: `slideRight 1.5s ease-out ${index * 0.1 + 0.5}s both`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="bg-gray-700 bg-opacity-50 p-3 rounded-lg text-center transform transition-all duration-300 hover:scale-110 hover:bg-indigo-900 hover:bg-opacity-30">
                <span className="text-3xl font-bold text-white">4+</span>
                <p className="text-gray-300 text-sm mt-1">Years Experience</p>
              </div>
              <div className="bg-gray-700 bg-opacity-50 p-3 rounded-lg text-center transform transition-all duration-300 hover:scale-110 hover:bg-indigo-900 hover:bg-opacity-30">
                <span className="text-3xl font-bold text-white">20+</span>
                <p className="text-gray-300 text-sm mt-1">Projects</p>
              </div>
              <div className="bg-gray-700 bg-opacity-50 p-3 rounded-lg text-center transform transition-all duration-300 hover:scale-110 hover:bg-indigo-900 hover:bg-opacity-30">
                <span className="text-3xl font-bold text-white">10+</span>
                <p className="text-gray-300 text-sm mt-1">Technologies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
