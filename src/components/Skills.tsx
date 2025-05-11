import React, { useState } from 'react';

interface SkillType {
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  proficiency: number;
}

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const frontendSkills = [
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: 'from-teal-400 to-teal-600', bgColor: 'bg-navy-900/20', proficiency: 75 },
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: 'from-gold-400 to-gold-600', bgColor: 'bg-navy-900/20', proficiency: 85 },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: 'from-navy-400 to-navy-600', bgColor: 'bg-navy-900/20', proficiency: 80 },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: 'from-teal-500 to-navy-500', bgColor: 'bg-navy-900/20', proficiency: 65 },
    { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', color: 'from-navy-400 to-teal-500', bgColor: 'bg-navy-900/20', proficiency: 60 },
  ];

  const backendSkills = [
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: 'from-teal-500 to-teal-300', bgColor: 'bg-navy-900/20', proficiency: 90 },
    { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', color: 'from-slate-500 to-slate-400', bgColor: 'bg-navy-900/30', proficiency: 70 },
    { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', color: 'from-teal-600 to-teal-400', bgColor: 'bg-navy-900/20', proficiency: 60 },
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', color: 'from-gold-500 to-gold-300', bgColor: 'bg-navy-900/20', proficiency: 70 },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: 'from-teal-500 to-teal-300', bgColor: 'bg-navy-900/20', proficiency: 65 },
  ];

  const otherSkills = [
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: 'from-gold-600 to-gold-400', bgColor: 'bg-navy-900/20', proficiency: 80 },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: 'from-teal-500 to-teal-300', bgColor: 'bg-navy-900/20', proficiency: 75 },
    { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', color: 'from-navy-400 to-navy-300', bgColor: 'bg-navy-900/20', proficiency: 70 },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: 'from-gold-400 to-gold-500', bgColor: 'bg-navy-900/20', proficiency: 70 },
  ];

  const handleSkillHover = (name: string) => {
    setHoveredSkill(name);
  };

  const handleSkillLeave = () => {
    setHoveredSkill(null);
  };

  const renderSkillCard = (skill: SkillType, index: number, category: string) => (
    <div 
      key={`${category}-${index}`} 
      className={`relative overflow-hidden rounded-xl transition-all duration-500 transform ${hoveredSkill === skill.name ? 'scale-105 z-10' : 'scale-100'}`}
      style={{ 
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
        animation: `floatIn 0.6s ease-out ${index * 0.15}s forwards`
      }}
      onMouseEnter={() => handleSkillHover(skill.name)}
      onMouseLeave={handleSkillLeave}
    >
      <div className={`flex flex-col p-4 ${skill.bgColor} backdrop-blur-sm border border-navy-700/30 rounded-xl overflow-hidden group shadow-md hover:shadow-lg transition-all duration-300`}>
        {/* Background gradient that animates on hover */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
        ></div>
        
        <div className="flex items-center mb-3">
          {/* Animated icon */}
          <div className="relative z-10 mr-4 p-2 rounded-full bg-navy-800 bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-300 transform group-hover:rotate-12">
            <img 
              src={skill.icon} 
              alt={skill.name} 
              className="w-8 h-8 transition-all duration-500 group-hover:scale-110" 
            />
          </div>
          
          {/* Skill name */}
          <div className="relative z-10">
            <h3 className="text-lg font-medium text-white group-hover:text-white/90 transition-colors">{skill.name}</h3>
          </div>
        </div>
        
        {/* Proficiency bar */}
        <div className="w-full bg-navy-800 rounded-full h-3 mt-1 relative overflow-hidden shadow-inner">
          <div 
            className={`h-3 rounded-full bg-gradient-to-r ${skill.color} relative transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(var(--tw-gradient-stops))]`} 
            style={{ width: `${skill.proficiency}%`, transition: 'width 1s ease-in-out' }}
          >
            {/* Subtle shine effect that preserves original colors */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-80 group-hover:animate-shine"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div id="skills" className="py-20 px-4 relative overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-purple-900/20 to-gray-900 z-0">
        {/* Animated grid background */}
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-teal-600/10 mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-navy-600/10 mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-gold-500/10 mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-navy-400 to-gold-400 mb-4 animate-text-shimmer">
            Technical Skills
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto animate-fade-in-delay">
            Proficient in a variety of technologies across frontend, backend, and other domains
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-navy-500 mb-6 animate-fade-in-delay">
              <span className="inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Frontend
              </span>
            </h3>
            <div className="space-y-4">
              {frontendSkills.map((skill, index) => renderSkillCard(skill, index, 'frontend'))}
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-navy-400 to-teal-500 mb-6 animate-fade-in-delay">
              <span className="inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
                Backend
              </span>
            </h3>
            <div className="space-y-4">
              {backendSkills.map((skill, index) => renderSkillCard(skill, index, 'backend'))}
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 mb-6 animate-fade-in-delay">
              <span className="inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Other
              </span>
            </h3>
            <div className="space-y-4">
              {otherSkills.map((skill, index) => renderSkillCard(skill, index, 'other'))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
