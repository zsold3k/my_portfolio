import React, { useState, useEffect } from 'react';
import { Code, Database, Palette, Globe, TrendingUp, Users, MessageCircle, Target, Clock, Headphones, RefreshCw, Activity, X, Search, Wrench, GitBranch } from 'lucide-react';
import type { Skill } from '../data/data';

interface SkillsProps {
  skills: Skill[];
  scrollY?: number;
  theme?: "light" | "dark";
}

interface AnimatedSkill extends Skill {
  animatedLevel: number;
}

const Skills: React.FC<SkillsProps> = ({ skills, scrollY = 0, theme = "dark" }) => {
  const [animatedSkills, setAnimatedSkills] = useState<AnimatedSkill[]>(
    skills.map(skill => ({ 
      ...skill, 
      animatedLevel: 0 
    }))
  );

  // State for orbit animation and soft skills modal
  const [showSoftSkills, setShowSoftSkills] = useState(false);
  const [orbitAnimation, setOrbitAnimation] = useState({
    rotation: 0,
    innerRotation: 0,
    isOrbiting: true,
    scale: 1
  });

  // Separate technical and soft skills
  const technicalSkills = skills.filter(skill => skill.category !== "Soft Skills");
  const softSkills = skills.filter(skill => skill.category === "Soft Skills");

  // Theme-based colors
  const gradientFrom = theme === "dark" ? "from-white" : "from-gray-900";
  const gradientTo = theme === "dark" ? "to-gray-400" : "to-gray-600";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const mutedTextColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const cardBg = theme === "dark" ? "bg-black/50" : "bg-white/50";
  const cardBorder = theme === "dark" ? "border-gray-800" : "border-gray-300";
  const hoverBorderColor = theme === "dark" ? "hover:border-gray-600" : "hover:border-gray-500";
  const iconContainerBg = theme === "dark" ? "bg-gray-900/50" : "bg-gray-100/50";
  const iconBorder = theme === "dark" ? "border-gray-800" : "border-gray-300";
  const progressTrackBg = theme === "dark" ? "bg-gray-900/70" : "bg-gray-200/70";

  // Icon colors based on theme
  const getIconColor = (iconName: string) => {
    if (theme === "dark") {
      switch(iconName) {
        case "code": return "text-blue-300";
        case "palette": return "text-rose-300";
        case "database": return "text-emerald-300";
        case "globe": return "text-sky-300";
        case "trending": return "text-purple-300";
        case "message-circle": return "text-teal-300";
        case "users": return "text-indigo-300";
        case "refresh-cw": return "text-amber-300";
        case "clock": return "text-lime-300";
        case "headphones": return "text-pink-300";
        case "target": return "text-red-300";
        case "activity": return "text-green-300";
        case "search": return "text-yellow-300";
        case "wrench": return "text-cyan-300";
        case "git": return "text-orange-300";
        default: return "text-gray-300";
      }
    } else {
      switch(iconName) {
        case "code": return "text-blue-600";
        case "palette": return "text-rose-600";
        case "database": return "text-emerald-600";
        case "globe": return "text-sky-600";
        case "trending": return "text-purple-600";
        case "message-circle": return "text-teal-600";
        case "users": return "text-indigo-600";
        case "refresh-cw": return "text-amber-600";
        case "clock": return "text-lime-600";
        case "headphones": return "text-pink-600";
        case "target": return "text-red-600";
        case "activity": return "text-green-600";
        case "search": return "text-yellow-600";
        case "wrench": return "text-cyan-600";
        case "git": return "text-orange-600";
        default: return "text-gray-600";
      }
    }
  };

  // Category gradient colors
  const getCategoryGradient = (category: string) => {
    if (theme === "dark") {
      switch(category) {
        case "Web Development": return "bg-gradient-to-r from-blue-500 to-cyan-500";
        case "Database": return "bg-gradient-to-r from-emerald-500 to-teal-500";
        case "Programming": return "bg-gradient-to-r from-purple-500 to-pink-500";
        case "Tools": return "bg-gradient-to-r from-amber-500 to-orange-500";
        case "Design": return "bg-gradient-to-r from-rose-500 to-pink-500";
        case "Analytics": return "bg-gradient-to-r from-indigo-500 to-purple-500";
        case "Development": return "bg-gradient-to-r from-sky-500 to-blue-500";
        case "Soft Skills": return "bg-gradient-to-r from-teal-500 to-emerald-500";
        case "Problem Solving": return "bg-gradient-to-r from-violet-500 to-purple-500";
        default: return "bg-gradient-to-r from-white to-gray-400";
      }
    } else {
      switch(category) {
        case "Web Development": return "bg-gradient-to-r from-blue-600 to-cyan-600";
        case "Database": return "bg-gradient-to-r from-emerald-600 to-teal-600";
        case "Programming": return "bg-gradient-to-r from-purple-600 to-pink-600";
        case "Tools": return "bg-gradient-to-r from-amber-600 to-orange-600";
        case "Design": return "bg-gradient-to-r from-rose-600 to-pink-600";
        case "Analytics": return "bg-gradient-to-r from-indigo-600 to-purple-600";
        case "Development": return "bg-gradient-to-r from-sky-600 to-blue-600";
        case "Soft Skills": return "bg-gradient-to-r from-teal-600 to-emerald-600";
        case "Problem Solving": return "bg-gradient-to-r from-violet-600 to-purple-600";
        default: return "bg-gradient-to-r from-gray-900 to-gray-600";
      }
    }
  };

  // Animation calculations based on scroll
  const sectionStart = 1200;
  const isVisible = scrollY > sectionStart;
  const progress = Math.max(0, Math.min(1, (scrollY - sectionStart) / 300));

  // Animate skill bars when section is visible
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedSkills(prev => 
          prev.map(skill => ({
            ...skill,
            animatedLevel: skill.level
          }))
        );
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Dual orbit animation
  useEffect(() => {
    if (isVisible && orbitAnimation.isOrbiting && !showSoftSkills) {
      const interval = setInterval(() => {
        setOrbitAnimation(prev => ({
          ...prev,
          rotation: (prev.rotation + 0.3) % 360, // Outer orbit slower
          innerRotation: (prev.innerRotation + 0.5) % 360 // Inner orbit faster
        }));
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isVisible, orbitAnimation.isOrbiting, showSoftSkills]);

  const getIconComponent = (iconName: string) => {
    const iconColor = getIconColor(iconName);
    switch(iconName) {
      case "code": return <Code size={20} className={iconColor} />;
      case "palette": return <Palette size={20} className={iconColor} />;
      case "database": return <Database size={20} className={iconColor} />;
      case "globe": return <Globe size={20} className={iconColor} />;
      case "trending": return <TrendingUp size={20} className={iconColor} />;
      case "message-circle": return <MessageCircle size={20} className={iconColor} />;
      case "users": return <Users size={20} className={iconColor} />;
      case "refresh-cw": return <RefreshCw size={20} className={iconColor} />;
      case "clock": return <Clock size={20} className={iconColor} />;
      case "headphones": return <Headphones size={20} className={iconColor} />;
      case "target": return <Target size={20} className={iconColor} />;
      case "activity": return <Activity size={20} className={iconColor} />;
      case "search": return <Search size={20} className={iconColor} />;
      case "wrench": return <Wrench size={20} className={iconColor} />;
      case "git": return <GitBranch size={20} className={iconColor} />;
      default: return <Code size={20} className={iconColor} />;
    }
  };

  // Handle center circle click
  const handleCenterClick = () => {
    if (!showSoftSkills) {
      setOrbitAnimation(prev => ({
        ...prev,
        isOrbiting: false,
        scale: 0.8
      }));
      
      setTimeout(() => {
        setShowSoftSkills(true);
        setOrbitAnimation(prev => ({
          ...prev,
          scale: 1
        }));
      }, 300);
    } else {
      setShowSoftSkills(false);
      setTimeout(() => {
        setOrbitAnimation(prev => ({
          ...prev,
          isOrbiting: true,
          scale: 1
        }));
      }, 300);
    }
  };

  // Calculate orbit positions for inner and outer orbits - LARGER GAP
  const getOrbitPosition = (index: number, total: number, isInner: boolean = false) => {
    const radius = isInner ? 150 : 300; // INCREASED GAP: Inner radius 100, Outer radius 240 (140px gap!)
    const rotation = isInner ? orbitAnimation.innerRotation : orbitAnimation.rotation;
    const angle = (index * (360 / total) + rotation) * (Math.PI / 180);
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  // Split skills into two groups for dual orbit
  const coreSkills = technicalSkills.slice(0, 6); // First 6 for inner orbit
  const specializedSkills = technicalSkills.slice(6, 13); // Next 7 for outer orbit
  
  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div 
        className={`absolute -top-40 left-1/4 w-80 h-80 bg-gradient-to-r ${
          theme === "dark" ? "from-white/5 to-gray-500/5" : "from-gray-900/5 to-gray-600/5"
        } rounded-full blur-3xl`}
        style={{
          transform: `translate(${Math.sin(scrollY * 0.002) * 40}px, ${Math.cos(scrollY * 0.003) * 30}px)`,
          opacity: 0.1 + Math.sin(scrollY * 0.001) * 0.1,
        }}
      />
      <div 
        className={`absolute -bottom-40 right-1/4 w-80 h-80 bg-gradient-to-r ${
          theme === "dark" ? "from-gray-400/5 to-gray-600/5" : "from-gray-300/5 to-gray-500/5"
        } rounded-full blur-3xl`}
        style={{
          transform: `translate(${Math.cos(scrollY * 0.0015) * -30}px, ${Math.sin(scrollY * 0.002) * 25}px)`,
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
              {showSoftSkills ? 'Soft Skills' : 'Technical Skills'}
            </span>
          </h2>
          <p 
            className={`text-xl ${mutedTextColor} max-w-2xl mx-auto`}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `translateY(${isVisible ? 0 : 20}px)`,
              transition: 'all 0.8s ease-out 0.2s'
            }}
          >
            {showSoftSkills 
              ? 'Interpersonal abilities that complement technical expertise' 
              : 'Expertise across full-stack development, databases, and specialized systems'}
          </p>
        </div>

        {!showSoftSkills ? (
          // Dual Orbit View - Technical Skills
          <div className="flex flex-col items-center justify-center min-h-[800px]">
            {/* Main Orbit Container - Centered with LARGER SIZE */}
            <div className="relative w-[700px] h-[700px] flex items-center justify-center">
              {/* Outer Orbit Circle */}
              <div 
                className={`absolute w-[600px] h-[600px] rounded-full border ${
                  theme === "dark" ? "border-gray-800/10" : "border-gray-300/10"
                }`}
              />
              
              {/* Inner Orbit Circle */}
              <div 
                className={`absolute w-[280px] h-[280px] rounded-full border ${
                  theme === "dark" ? "border-gray-700/20" : "border-gray-400/20"
                }`}
              />
              
              {/* Center Circle */}
              <div 
                className={`absolute z-30 w-40 h-40 rounded-full backdrop-blur-xl cursor-pointer transition-all duration-500 ${
                  theme === "dark" 
                    ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-2 border-purple-500/30 hover:border-purple-400/50" 
                    : "bg-gradient-to-r from-purple-400/20 to-pink-400/20 border-2 border-purple-300/30 hover:border-purple-500/50"
                } flex flex-col items-center justify-center hover:scale-110`}
                onClick={handleCenterClick}
                style={{
                  transform: `scale(${orbitAnimation.scale})`,
                }}
              >
                <Users className={`w-10 h-10 mb-2 ${theme === "dark" ? "text-purple-300" : "text-purple-600"}`} />
                <span className={`text-base font-bold ${textColor}`}>Soft Skills</span>
                <span className={`text-xs ${mutedTextColor}`}>Click to view</span>
              </div>
              
              {/* Inner Orbit Skills (Core Skills) - ICONS NOT ROTATING */}
              {coreSkills.map((skill, index) => {
                const position = getOrbitPosition(index, coreSkills.length, true);
                
                return (
                  <div
                    key={skill.id}
                    className="absolute z-20"
                    style={{
                      left: `calc(50% + ${position.x}px)`,
                      top: `calc(50% + ${position.y}px)`,
                      transform: 'translate(-50%, -50%)',
                      transition: 'left 0.5s ease-out, top 0.5s ease-out',
                    }}
                  >
                    <div 
                      className={`w-16 h-16 rounded-lg backdrop-blur-lg ${cardBg} border ${cardBorder} flex flex-col items-center justify-center p-1.5 transition-all duration-300 hover:scale-125 hover:shadow-xl cursor-pointer ${hoverBorderColor}`}
                      // REMOVED: transform rotate() - icons won't rotate
                    >
                      {getIconComponent(skill.icon)}
                      <span className={`text-[10px] font-medium mt-0.5 text-center ${textColor}`}>
                        {skill.name.length > 8 ? skill.name.substring(0, 8) + '...' : skill.name}
                      </span>
                      <div className="w-full h-1 mt-0.5 rounded-full bg-gray-800/30 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${getCategoryGradient(skill.category)}`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Outer Orbit Skills (Specialized Skills) - ICONS NOT ROTATING */}
              {specializedSkills.map((skill, index) => {
                const position = getOrbitPosition(index, specializedSkills.length, false);
                
                return (
                  <div
                    key={skill.id}
                    className="absolute z-10"
                    style={{
                      left: `calc(50% + ${position.x}px)`,
                      top: `calc(50% + ${position.y}px)`,
                      transform: 'translate(-50%, -50%)',
                      transition: 'left 0.5s ease-out, top 0.5s ease-out',
                    }}
                  >
                    <div 
                      className={`w-20 h-20 rounded-xl backdrop-blur-lg ${cardBg} border ${cardBorder} flex flex-col items-center justify-center p-2 transition-all duration-300 hover:scale-125 hover:shadow-xl cursor-pointer ${hoverBorderColor}`}
                      // REMOVED: transform rotate() - icons won't rotate
                    >
                      {getIconComponent(skill.icon)}
                      <span className={`text-xs font-medium mt-1 text-center ${textColor}`}>
                        {skill.name.length > 10 ? skill.name.substring(0, 10) + '...' : skill.name}
                      </span>
                      <div className="w-full h-1.5 mt-1 rounded-full bg-gray-800/30 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${getCategoryGradient(skill.category)}`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Orbit Legend */}
            <div className="mt-16 grid grid-cols-2 gap-8 max-w-3xl">
              <div className={`p-6 rounded-2xl backdrop-blur-lg ${cardBg} border ${cardBorder}`}>
                <h3 className={`text-lg font-bold mb-4 ${textColor} flex items-center`}>
                  <div className={`w-8 h-8 rounded-full mr-3 ${
                    theme === "dark" ? "bg-blue-500/20" : "bg-blue-400/20"
                  } flex items-center justify-center`}>
                    <div className={`w-3 h-3 rounded-full ${theme === "dark" ? "bg-blue-400" : "bg-blue-600"}`} />
                  </div>
                  Core Skills (Inner Orbit)
                </h3>
                <div className="space-y-3">
                  {coreSkills.map(skill => (
                    <div key={skill.id} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-lg mr-3 flex items-center justify-center ${iconContainerBg} border ${iconBorder}`}>
                          {getIconComponent(skill.icon)}
                        </div>
                        <span className={`text-sm ${textColor}`}>{skill.name}</span>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-medium ${mutedTextColor}`}>{skill.level}%</span>
                        <div className="w-16 h-1 mt-1 rounded-full bg-gray-800/30 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${getCategoryGradient(skill.category)}`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={`p-6 rounded-2xl backdrop-blur-lg ${cardBg} border ${cardBorder}`}>
                <h3 className={`text-lg font-bold mb-4 ${textColor} flex items-center`}>
                  <div className={`w-8 h-8 rounded-full mr-3 ${
                    theme === "dark" ? "bg-purple-500/20" : "bg-purple-400/20"
                  } flex items-center justify-center`}>
                    <div className={`w-3 h-3 rounded-full ${theme === "dark" ? "bg-purple-400" : "bg-purple-600"}`} />
                  </div>
                  Specialized Skills (Outer Orbit)
                </h3>
                <div className="space-y-3">
                  {specializedSkills.map(skill => (
                    <div key={skill.id} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-lg mr-3 flex items-center justify-center ${iconContainerBg} border ${iconBorder}`}>
                          {getIconComponent(skill.icon)}
                        </div>
                        <span className={`text-sm ${textColor}`}>{skill.name}</span>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-medium ${mutedTextColor}`}>{skill.level}%</span>
                        <div className="w-16 h-1 mt-1 rounded-full bg-gray-800/30 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${getCategoryGradient(skill.category)}`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Soft Skills View - Regular Layout
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Close button */}
              <button
                onClick={handleCenterClick}
                className={`absolute -top-16 right-4 w-12 h-12 rounded-full backdrop-blur-lg ${cardBg} border ${cardBorder} flex items-center justify-center ${hoverBorderColor} transition-all duration-300 hover:scale-110 hover:rotate-90 z-30`}
              >
                <X className={textColor} size={20} />
              </button>

              {/* Soft Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {softSkills.map((skill, index) => (
                  <div 
                    key={skill.id}
                    className={`p-6 rounded-2xl backdrop-blur-lg ${cardBg} border ${cardBorder} transition-all duration-500 ${hoverBorderColor} hover:scale-[1.02]`}
                    style={{
                      opacity: 0,
                      transform: `translateY(30px)`,
                      animation: `fadeInUp 0.5s ease-out ${0.2 + index * 0.1}s forwards`
                    }}
                  >
                    <div className="flex items-start mb-4">
                      <div 
                        className={`w-14 h-14 rounded-xl mr-4 flex items-center justify-center ${
                          theme === "dark" 
                            ? "bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-500/30" 
                            : "bg-gradient-to-r from-teal-400/20 to-emerald-400/20 border border-teal-400/30"
                        } flex-shrink-0`}
                      >
                        {getIconComponent(skill.icon)}
                      </div>
                      <div className="flex-grow">
                        <h3 className={`text-lg font-bold ${textColor} mb-1`}>{skill.name}</h3>
                        <p className={`text-sm ${mutedTextColor}`}>{skill.category}</p>
                      </div>
                      <span className={`text-2xl font-bold ${textColor}`}>{skill.level}%</span>
                    </div>
                    
                    <div className={`h-3 rounded-full ${progressTrackBg} overflow-hidden`}>
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out hover:shadow-lg hover:brightness-125 ${getCategoryGradient(skill.category)}`}
                        style={{ 
                          width: `${skill.level}%`
                        }}
                      />
                    </div>
                    
                    <div className="mt-4 flex justify-between text-sm">
                      <span className={mutedTextColor}>Proficiency Level</span>
                      <span className={`font-medium ${
                        skill.level >= 90 ? 'text-green-400' : 
                        skill.level >= 80 ? 'text-blue-400' : 
                        skill.level >= 70 ? 'text-yellow-400' : 
                        'text-gray-400'
                      }`}>
                        {skill.level >= 90 ? 'Expert' : 
                         skill.level >= 80 ? 'Advanced' : 
                         skill.level >= 70 ? 'Intermediate' : 
                         'Basic'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Soft Skills Summary */}
              <div 
                className={`mt-8 p-6 rounded-2xl backdrop-blur-lg ${cardBg} border ${cardBorder} transition-all duration-500`}
                style={{
                  opacity: 0,
                  transform: `translateY(30px)`,
                  animation: `fadeInUp 0.5s ease-out 0.8s forwards`
                }}
              >
                <h3 className={`text-xl font-bold mb-4 ${textColor}`}>Key Strengths</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Team Collaboration", value: "Excellent" },
                    { label: "Communication", value: "Clear & Effective" },
                    { label: "Adaptability", value: "Highly Flexible" },
                    { label: "Work Ethic", value: "Strong Dedication" }
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className={`text-sm ${mutedTextColor}`}>{item.label}</div>
                      <div className={`font-bold ${textColor}`}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scroll progress indicator */}
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

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </section>
  );
};

export default Skills;