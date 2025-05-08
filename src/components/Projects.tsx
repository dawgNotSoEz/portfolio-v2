import React from 'react';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const projects = [
    {
      title: "TPO Portal",
      description: "A full-stack internship portal website built with Flask as the backend, featuring real-time internship postings and application management.",
      technologies: ["React", "Flask", "SQLite", "HTML/CSS"],
      image: "https://raw.githubusercontent.com/yourusername/tpo-portal/main/screenshot.png",
      link: "https://github.com/yourusername/tpo-portal"
    },
    {
      title: "Student Management System",
      description: "A comprehensive Django-based system for managing student records, attendance, and academic performance with an intuitive dashboard.",
      technologies: ["Django", "Python", "HTML/CSS", "JavaScript"],
      image: "https://raw.githubusercontent.com/yourusername/student-management/main/screenshot.png",
      link: "https://github.com/yourusername/student-management"
    },
    {
      title: "Portfolio Website",
      description: "A modern portfolio website built with React and Vite, showcasing my projects and skills with responsive design.",
      technologies: ["React", "Vite", "Tailwind CSS", "TypeScript"],
      image: "https://raw.githubusercontent.com/yourusername/portfolio/main/screenshot.png",
      link: "https://github.com/yourusername/portfolio"
    },
    {
      title: "Inventory Management Desktop App",
      description: "A desktop application built with Python and Tkinter for managing inventory, generating reports, and tracking product movement.",
      technologies: ["Python", "Tkinter", "SQLite", "Matplotlib"],
      image: "https://raw.githubusercontent.com/yourusername/inventory-app/main/screenshot.png",
      link: "https://github.com/yourusername/inventory-app"
    },
    {
      title: "Weather Forecast App",
      description: "A web application that provides real-time weather forecasts and historical weather data for any location using the OpenWeatherMap API.",
      technologies: ["React", "CSS", "OpenWeather API", "Chart.js"],
      image: "https://raw.githubusercontent.com/yourusername/weather-app/main/screenshot.png",
      link: "https://github.com/yourusername/weather-app"
    },
    {
      title: "Task Tracker",
      description: "A Flask-based task management application with user authentication, task categorization, and deadline notifications.",
      technologies: ["Flask", "Python", "HTML/CSS", "JavaScript"],
      image: "https://raw.githubusercontent.com/yourusername/task-tracker/main/screenshot.png",
      link: "https://github.com/yourusername/task-tracker"
    }
  ];

  return (
    <div className="py-20 px-4 relative overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-900 to-purple-900 z-0">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4 text-center animate-text-shimmer">
          My Projects
        </h2>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12 animate-fade-in-delay">
          Explore my latest work showcasing my skills in React, Flask, Django, and more.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
                animation: `fadeIn 0.8s ease-out ${index * 0.2}s forwards`
              }}
            >
              <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-700 hover:border-indigo-500 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    View Project
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
