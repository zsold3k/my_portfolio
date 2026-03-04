import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from '../data/data';
import CodeIcon from './CodeIcon.tsx';

interface ProjectsProps {
  projects: Project[];
  scrollY?: number;
  theme?: "light" | "dark"; // Added theme prop
}

const Projects: React.FC<ProjectsProps> = ({ projects, scrollY = 0, theme = "dark" }) => {
  const [currentProject, setCurrentProject] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [, setAnimationDirection] = useState<'next' | 'prev' | 'shuffle'>('next');

  // Theme-based colors
  const gradientFrom = theme === "dark" ? "from-white" : "from-gray-900";
  const gradientTo = theme === "dark" ? "to-gray-400" : "to-gray-600";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const mutedTextColor = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const cardBg = theme === "dark" ? "bg-black/50" : "bg-white/50";
  const cardBorder = theme === "dark" ? "border-gray-800" : "border-gray-300";
  const hoverBorderColor = theme === "dark" ? "hover:border-gray-600" : "hover:border-gray-500";
  const techBg = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const techBorder = theme === "dark" ? "border-gray-800" : "border-gray-300";
  const techText = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const techHoverText = theme === "dark" ? "group-hover:text-white" : "group-hover:text-gray-900";
  const iconBg = theme === "dark" ? "from-white/10 to-gray-400/10" : "from-gray-900/10 to-gray-600/10";
  const categoryGradient = theme === "dark" 
    ? "from-gray-300 to-gray-500 text-black" 
    : "from-gray-700 to-gray-900 text-white";
  const academicGradient = theme === "dark" 
    ? "from-white to-gray-300 text-black" 
    : "from-gray-800 to-gray-600 text-white";
  const statusGradient = theme === "dark" 
    ? "from-green-500 to-emerald-500 text-white" 
    : "from-green-400 to-emerald-400 text-white";
  const arrowGradient = theme === "dark" ? "from-white to-gray-300 text-black" : "from-gray-900 to-gray-700 text-white";
  const indicatorBg = theme === "dark" ? "bg-black/30" : "bg-white/30";
  const indicatorBorder = theme === "dark" ? "border-gray-800" : "border-gray-300";
  const indicatorHoverBorder = theme === "dark" ? "hover:border-gray-600" : "hover:border-gray-500";
  const activeIndicatorBg = theme === "dark" 
    ? "bg-gradient-to-r from-white to-gray-300 text-black" 
    : "bg-gradient-to-r from-gray-900 to-gray-700 text-white";
  const activeIndicatorBorder = theme === "dark" ? "border-white" : "border-gray-900";
  const dotColor = theme === "dark" ? "bg-black" : "bg-white";
  const inactiveDotColor = theme === "dark" ? "bg-gray-600" : "bg-gray-400";

  // Animation calculations based on scroll
  const sectionStart = 1800;
  const isVisible = scrollY > sectionStart;
  const progress = Math.max(0, Math.min(1, (scrollY - sectionStart) / 300));

  const getProjectImage = (image: string) => {
    switch(image) {
      case "project1": return "📊";
      case "project2": return "🏢";
      case "project3": return "💰";
      case "project4": return "🤝";
      default: return "💻";
    }
  };

  const nextProject = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setAnimationDirection('next');
    
    setTimeout(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
      setTimeout(() => setIsAnimating(false), 300);
    }, 300);
  };

  const prevProject = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setAnimationDirection('prev');
    
    setTimeout(() => {
      setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
      setTimeout(() => setIsAnimating(false), 300);
    }, 300);
  };

  const goToProject = (index: number) => {
    if (isAnimating || index === currentProject) return;
    
    setIsAnimating(true);
    setAnimationDirection(index > currentProject ? 'next' : 'prev');
    
    setTimeout(() => {
      setCurrentProject(index);
      setTimeout(() => setIsAnimating(false), 300);
    }, 300);
  };

  // Auto-rotate every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextProject();
    }, 15000);

    return () => clearInterval(interval);
  }, [currentProject, isAnimating]);

  const currentProjectData = projects[currentProject];

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div 
        className={`absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r ${
          theme === "dark" ? "from-white/5 to-gray-500/5" : "from-gray-900/5 to-gray-600/5"
        } rounded-full blur-3xl`}
        style={{
          transform: `translate(${Math.sin(scrollY * 0.002) * 60}px, ${Math.cos(scrollY * 0.003) * 40}px)`,
          opacity: 0.1 + Math.sin(scrollY * 0.001) * 0.1,
        }}
      />
      <div 
        className={`absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r ${
          theme === "dark" ? "from-gray-400/5 to-gray-600/5" : "from-gray-300/5 to-gray-500/5"
        } rounded-full blur-3xl`}
        style={{
          transform: `translate(${Math.cos(scrollY * 0.0015) * -50}px, ${Math.sin(scrollY * 0.002) * 30}px)`,
          opacity: 0.1 + Math.cos(scrollY * 0.0008) * 0.1,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `translateY(${isVisible ? 0 : 30}px)`,
              transition: 'all 0.8s ease-out'
            }}
          >
            <span className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}>
              Project Showcase
            </span>
          </h2>
          <p 
            className={`text-xl ${mutedTextColor} max-w-3xl mx-auto`}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `translateY(${isVisible ? 0 : 20}px)`,
              transition: 'all 0.8s ease-out 0.2s'
            }}
          >
            Real solutions delivering measurable impact
          </p>
        </div>
        
        {/* Main Project Display */}
        <div className="max-w-6xl mx-auto mb-20">
          {/* Project Header */}
          <div 
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `translateY(${isVisible ? 0 : 40}px)`,
              transition: 'all 0.8s ease-out 0.3s'
            }}
          >
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center space-x-4 mb-4">
                <div 
                  className="text-5xl transition-transform duration-500 hover:scale-110"
                  style={{
                    transform: `rotate(${Math.sin(scrollY * 0.005) * 10}deg)`,
                  }}
                >
                  {getProjectImage(currentProjectData.image)}
                </div>
                <div>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 bg-gradient-to-r ${
                    currentProjectData.category === 'work' 
                      ? categoryGradient
                      : academicGradient
                  }`}>
                    {currentProjectData.category === 'work' ? 'Work Project' : 'Academic Project'}
                  </span>
                </div>
              </div>
              <h3 className={`text-4xl md:text-5xl font-bold ${textColor} mb-4`}>
                {currentProjectData.title}
              </h3>
              <p className={`text-xl ${mutedTextColor} max-w-3xl`}>
                {currentProjectData.description}
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Project Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tech Stack Card */}
              <div 
                className={`${cardBg} border ${cardBorder} rounded-2xl p-8 transition-all duration-500 ${hoverBorderColor}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: `translateY(${isVisible ? 0 : 30}px)`,
                  transition: 'all 0.8s ease-out 0.4s'
                }}
              >
                <h4 className={`text-2xl font-bold ${textColor} mb-6`}>Technology Stack</h4>
                <div className="flex flex-wrap gap-3">
                  {currentProjectData.tech.map((tech, index) => (
                    <div 
                      key={index}
                      className={`px-5 py-3 rounded-xl ${techBg} border ${techBorder} ${hoverBorderColor} transition-all duration-300 group`}
                      style={{
                        transform: `translateY(${Math.sin(scrollY * 0.004 + index) * 3}px)`,
                      }}
                    >
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${iconBg} flex items-center justify-center mr-3`}>
                          <CodeIcon tech={tech} size={20} theme={theme} />
                        </div>
                        <span className={`text-lg ${techText} ${techHoverText}`}>{tech}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features Card */}
              <div 
                className={`${cardBg} border ${cardBorder} rounded-2xl p-8 transition-all duration-500 ${hoverBorderColor}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: `translateY(${isVisible ? 0 : 40}px)`,
                  transition: 'all 0.8s ease-out 0.5s'
                }}
              >
                <h4 className={`text-2xl font-bold ${textColor} mb-6`}>Core Features</h4>
                <ul className="space-y-4">
                  {currentProjectData.details.map((detail, index) => (
                    <li 
                      key={index} 
                      className="flex items-start"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: `translateX(${isVisible ? 0 : -20}px)`,
                        transition: `all 0.5s ease-out ${0.6 + index * 0.1}s`
                      }}
                    >
                      <div className={`w-2 h-2 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-full mt-2 mr-4 flex-shrink-0`}></div>
                      <span className={`text-lg ${mutedTextColor}`}>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Project Info */}
            <div className="space-y-8">
              {/* Project Info Card */}
              <div 
                className={`${cardBg} border ${cardBorder} rounded-2xl p-8 transition-all duration-500 ${hoverBorderColor}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: `translateX(${isVisible ? 0 : 40}px)`,
                  transition: 'all 0.8s ease-out 0.4s'
                }}
              >
                <h4 className={`text-2xl font-bold ${textColor} mb-6`}>Project Overview</h4>
                <div className="space-y-4">
                  {[
                    { label: "Project Type", value: currentProjectData.category === 'work' ? 'Professional' : 'Academic' },
                    { label: "Development Time", value: "3-6 Months" },
                    { label: "Team Composition", value: "2-4 Developers" },
                    { label: "Project Status", value: "Completed", isStatus: true }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className={`flex items-center justify-between py-3 border-b ${
                        theme === "dark" ? "border-gray-800" : "border-gray-300"
                      }`}
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: `translateX(${isVisible ? 0 : 10}px)`,
                        transition: `all 0.5s ease-out ${0.5 + index * 0.1}s`
                      }}
                    >
                      <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{item.label}</span>
                      {item.isStatus ? (
                        <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${statusGradient} text-sm font-bold`}>
                          {item.value}
                        </span>
                      ) : (
                        <span className={`${textColor} font-medium`}>{item.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Empty space for better visual balance */}
              <div className="h-16"></div>
            </div>
          </div>
        </div>

        {/* Project Navigation */}
        <div className="max-w-4xl mx-auto">
          {/* Project Indicators */}
          <div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `translateY(${isVisible ? 0 : 50}px)`,
              transition: 'all 0.8s ease-out 0.6s'
            }}
          >
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => goToProject(index)}
                disabled={isAnimating}
                className={`flex items-center px-6 py-3 rounded-full border transition-all duration-300 ${
                  index === currentProject
                    ? `${activeIndicatorBg} scale-110 ${activeIndicatorBorder}`
                    : `${indicatorBg} ${indicatorBorder} ${mutedTextColor} ${indicatorHoverBorder} hover:${textColor}`
                } ${isAnimating ? 'cursor-not-allowed' : ''}`}
                style={{
                  transform: index === currentProject 
                    ? `scale(1.1) translateY(${Math.sin(scrollY * 0.01) * 5}px)` 
                    : `scale(1)`
                }}
              >
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  index === currentProject ? dotColor : inactiveDotColor
                }`} />
                <span className="font-medium">{project.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div 
            className="flex justify-center items-center space-x-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `translateY(${isVisible ? 0 : 30}px)`,
              transition: 'all 0.8s ease-out 0.7s'
            }}
          >
            <button 
              onClick={prevProject}
              disabled={isAnimating}
              className={`w-14 h-14 bg-gradient-to-r ${arrowGradient} rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group ${
                isAnimating 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:scale-110 hover:shadow-3xl'
              }`}
              style={{
                transform: `translateX(${Math.sin(scrollY * 0.005) * 5}px)`,
              }}
            >
              <ChevronLeft className="w-7 h-7 group-hover:-translate-x-1 transition-transform" />
            </button>
            
            <div className="text-center">
              <p className={`${mutedTextColor}`}>Project {currentProject + 1} of {projects.length}</p>
              <p className={`text-xl ${textColor} font-bold`}>{currentProjectData.title.split(' - ')[0]}</p>
            </div>
            
            <button 
              onClick={nextProject}
              disabled={isAnimating}
              className={`w-14 h-14 bg-gradient-to-r ${arrowGradient} rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group ${
                isAnimating 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:scale-110 hover:shadow-3xl'
              }`}
              style={{
                transform: `translateX(${Math.cos(scrollY * 0.005) * 5}px)`,
              }}
            >
              <ChevronRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Scroll progress indicator for this section */}
        <div 
          className={`mt-12 h-1 ${theme === "dark" ? "bg-gray-800" : "bg-gray-300"} rounded-full overflow-hidden mx-auto max-w-2xl`}
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        >
          <div 
            className={`h-full bg-gradient-to-r ${gradientFrom} ${gradientTo} transition-all duration-300`}
            style={{
              width: `${progress * 100}%`
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;