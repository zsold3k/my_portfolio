import React from 'react';
import { Calendar, Building, CheckCircle } from 'lucide-react';
import { type Experience as ExperienceType } from '../data/data';

interface ExperienceProps {
  experiences: ExperienceType[];
  scrollY?: number;
  theme?: "light" | "dark"; // Added theme prop
}

const Experience: React.FC<ExperienceProps> = ({ experiences, scrollY = 0, theme = "dark" }) => {
  // Animation calculations based on scroll
  const sectionStart = 2800;
  const isVisible = scrollY > sectionStart;
  const progress = Math.max(0, Math.min(1, (scrollY - sectionStart) / 300));

  // Theme-based colors
  const gradientFrom = theme === "dark" ? "from-white" : "from-gray-900";
  const gradientTo = theme === "dark" ? "to-gray-400" : "to-gray-600";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const mutedTextColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const cardBg = theme === "dark" ? "from-gray-900/80 to-black/80" : "from-gray-100/80 to-white/80";
  const borderColor = theme === "dark" ? "border-gray-800" : "border-gray-300";
  const hoverBorderColor = theme === "dark" ? "hover:border-gray-600" : "hover:border-gray-400";
  const iconBg = theme === "dark" ? "from-white/10 to-gray-400/10" : "from-gray-900/10 to-gray-600/10";
  const tagBg = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const tagText = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const statusBg = theme === "dark" ? "from-white/10 to-gray-400/10" : "from-gray-900/10 to-gray-600/10";
  const statusText = theme === "dark" ? "text-white" : "text-gray-900";
  const timelineColor = theme === "dark" ? "from-white to-gray-400" : "from-gray-900 to-gray-600";
  const dotBorder = theme === "dark" ? "border-black" : "border-white";

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div 
        className={`absolute -top-40 left-1/4 w-96 h-96 bg-gradient-to-r ${
          theme === "dark" ? "from-white/5 to-gray-500/5" : "from-gray-900/5 to-gray-600/5"
        } rounded-full blur-3xl`}
        style={{
          transform: `translate(${Math.sin(scrollY * 0.002) * 50}px, ${Math.cos(scrollY * 0.003) * 40}px)`,
          opacity: 0.1 + Math.sin(scrollY * 0.001) * 0.1,
        }}
      />
      <div 
        className={`absolute -bottom-40 right-1/4 w-96 h-96 bg-gradient-to-r ${
          theme === "dark" ? "from-gray-400/5 to-gray-600/5" : "from-gray-300/5 to-gray-500/5"
        } rounded-full blur-3xl`}
        style={{
          transform: `translate(${Math.cos(scrollY * 0.0015) * -50}px, ${Math.sin(scrollY * 0.002) * 35}px)`,
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
              Professional Journey
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
            From internship to professional development roles
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => {
            const isEven = index % 2 === 0;
            const delay = 0.3 + index * 0.2;
            
            return (
              <div 
                key={experience.id}
                className={`relative mb-12 ${isEven ? 'text-left' : 'text-right'}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: `translateY(${isVisible ? 0 : 50}px)`,
                  transition: `all 0.8s ease-out ${delay}s`
                }}
              >
                {/* Timeline connector */}
                <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b ${timelineColor}`}></div>
                
                {/* Timeline dot */}
                <div 
                  className={`absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-full border-4 ${dotBorder} z-10`}
                  style={{
                    boxShadow: `0 0 20px ${
                      theme === "dark" 
                        ? `rgba(255, 255, 255, ${0.2 + Math.sin(scrollY * 0.005 + index) * 0.1})`
                        : `rgba(0, 0, 0, ${0.2 + Math.sin(scrollY * 0.005 + index) * 0.1})`
                    }`,
                  }}
                ></div>

                {/* Experience Card */}
                <div className={`relative ${isEven ? 'pr-8 lg:pr-1/2' : 'pl-8 lg:pl-1/2'}`}>
                  <div 
                    className={`bg-gradient-to-br ${cardBg} border ${borderColor} rounded-2xl p-8 transition-all duration-500 ${hoverBorderColor} ${
                      isEven ? 'hover:translate-x-2' : 'hover:-translate-x-2'
                    }`}
                    style={{
                      transform: `translateY(${Math.sin(scrollY * 0.004 + index) * 5}px)`,
                    }}
                  >
                    {/* Header */}
                    <div className={`flex items-center mb-6 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className={`${isEven ? 'mr-4' : 'ml-4'}`}>
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${iconBg} flex items-center justify-center`}>
                          <Building className={`w-8 h-8 ${textColor}`} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Calendar className={`w-4 h-4 ${mutedTextColor} ${isEven ? 'mr-2' : 'ml-2'}`} />
                          <span className={`text-sm ${mutedTextColor}`}>{experience.duration}</span>
                        </div>
                        <h3 className={`text-2xl font-bold ${textColor} mt-2`}>{experience.position}</h3>
                        <p className={`text-xl ${mutedTextColor}`}>{experience.company}</p>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div className="space-y-4">
                      <h4 className={`text-lg font-semibold ${textColor} flex items-center`}>
                        <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-3">
                        {experience.responsibilities.map((responsibility, respIndex) => (
                          <li 
                            key={respIndex}
                            className="flex items-start"
                            style={{
                              opacity: isVisible ? 1 : 0,
                              transform: `translateX(${isVisible ? 0 : (isEven ? -20 : 20)}px)`,
                              transition: `all 0.5s ease-out ${delay + 0.2 + respIndex * 0.1}s`
                            }}
                          >
                            <div className={`w-1.5 h-1.5 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-full mt-2 mr-3 flex-shrink-0`}></div>
                            <span className={mutedTextColor}>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Tags */}
                    <div className={`mt-6 pt-6 border-t ${borderColor}`}>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Web Development",
                          "System Integration", 
                          "UI/UX Design",
                          "Database Management"
                        ].map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className={`px-3 py-1.5 ${tagBg} border ${borderColor} rounded-lg text-sm ${tagText} ${hoverBorderColor} transition-colors`}
                            style={{
                              transform: `translateY(${Math.sin(scrollY * 0.006 + techIndex) * 3}px)`,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Current Status */}
          <div 
            className="mt-20 text-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `translateY(${isVisible ? 0 : 30}px)`,
              transition: 'all 0.8s ease-out 0.8s'
            }}
          >
            <div className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${statusBg} border ${borderColor} rounded-full`}>
              <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3 animate-pulse"></div>
              <span className={`font-medium ${statusText}`}>Currently open to opportunities</span>
            </div>
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

export default Experience;