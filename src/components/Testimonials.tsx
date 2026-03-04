import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Award, Zap } from 'lucide-react';
import type { Testimonial } from '../data/data';

interface TestimonialsProps {
  testimonials: Testimonial[];
  currentTestimonial: number;
  nextTestimonial: () => void;
  prevTestimonial: () => void;
  scrollY?: number;
  theme?: "light" | "dark"; // Added theme prop
}

const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials,
  currentTestimonial,
  nextTestimonial,
  prevTestimonial,
  scrollY = 0,
  theme = "dark" // Added default value
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Theme-based colors
  const gradientFrom = theme === "dark" ? "from-white" : "from-gray-900";
  const gradientTo = theme === "dark" ? "to-gray-400" : "to-gray-600";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const mutedTextColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const cardBg = theme === "dark" ? "bg-black/50" : "bg-white/50";
  const cardBorder = theme === "dark" ? "border-gray-800" : "border-gray-300";
  const hoverBorderColor = theme === "dark" ? "hover:border-gray-600" : "hover:border-gray-500";
  const statsBg = theme === "dark" ? "from-gray-900/50 to-black/50" : "from-gray-100/50 to-white/50";
  const statsBorder = theme === "dark" ? "border-gray-800" : "border-gray-300";
  const statsItemBg = theme === "dark" ? "bg-black/30" : "bg-gray-100/30";
  const previewCardBg = theme === "dark" ? "bg-black/30" : "bg-white/30";
  const previewCardBorder = theme === "dark" ? "border-gray-800" : "border-gray-300";
  const activePreviewBorder = theme === "dark" ? "border-gray-600" : "border-gray-500";
  const navButtonBg = theme === "dark" 
    ? "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(128,128,128,0.1))" 
    : "linear-gradient(135deg, rgba(0,0,0,0.1), rgba(100,100,100,0.1))";
  const navButtonBorder = theme === "dark" 
    ? "1px solid rgba(255,255,255,0.2)" 
    : "1px solid rgba(0,0,0,0.2)";
  const navButtonText = theme === "dark" ? "text-white" : "text-gray-900";

  // Animation calculations based on scroll
  const sectionStart = 2400;
  const isVisible = scrollY > sectionStart;
  const progress = Math.max(0, Math.min(1, (scrollY - sectionStart) / 300));

  const getAvatarImage = (avatar: string) => {
    switch(avatar) {
      case "avatar1": return "👨‍💼";
      case "avatar2": return "👩‍💼";
      case "avatar3": return "👨‍🏫";
      default: return "👤";
    }
  };

  const getAvatarGradient = (index: number) => {
    if (theme === "dark") {
      const gradients = [
        "from-blue-500 to-cyan-500",
        "from-purple-500 to-pink-500", 
        "from-amber-500 to-orange-500",
        "from-emerald-500 to-teal-500"
      ];
      return gradients[index % gradients.length];
    } else {
      const gradients = [
        "from-blue-600 to-cyan-600",
        "from-purple-600 to-pink-600", 
        "from-amber-600 to-orange-600",
        "from-emerald-600 to-teal-600"
      ];
      return gradients[index % gradients.length];
    }
  };

  const getTestimonialStatsByIndex = (index: number) => {
    const allStats = [
      [
        { icon: <Zap className="w-4 h-4" />, label: "Efficiency", value: "40% ↑" },
        { icon: <Star className="w-4 h-4" />, label: "Satisfaction", value: "4.9/5" },
        { icon: <Award className="w-4 h-4" />, label: "Reliability", value: "99%" }
      ],
      [
        { icon: <Zap className="w-4 h-4" />, label: "Productivity", value: "35% ↑" },
        { icon: <Star className="w-4 h-4" />, label: "Satisfaction", value: "4.8/5" },
        { icon: <Award className="w-4 h-4" />, label: "Accuracy", value: "98%" }
      ],
      [
        { icon: <Zap className="w-4 h-4" />, label: "Learning", value: "Fast" },
        { icon: <Star className="w-4 h-4" />, label: "Performance", value: "Top 5%" },
        { icon: <Award className="w-4 h-4" />, label: "Dedication", value: "100%" }
      ]
    ];
    return allStats[index % allStats.length];
  };

  const handlePrevClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    prevTestimonial();
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNextClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    nextTestimonial();
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto scroll indicators
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        handleNextClick();
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [isVisible, currentTestimonial]);

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div 
        className={`absolute -top-40 left-1/3 w-64 h-64 bg-gradient-to-r ${
          theme === "dark" ? "from-white/5 to-gray-500/5" : "from-gray-900/5 to-gray-600/5"
        } rounded-full blur-3xl`}
        style={{
          transform: `translate(${Math.sin(scrollY * 0.002) * 50}px, ${Math.cos(scrollY * 0.003) * 40}px)`,
          opacity: 0.1 + Math.sin(scrollY * 0.001) * 0.1,
        }}
      />
      <div 
        className={`absolute -bottom-40 right-1/3 w-64 h-64 bg-gradient-to-r ${
          theme === "dark" ? "from-gray-400/5 to-gray-600/5" : "from-gray-300/5 to-gray-500/5"
        } rounded-full blur-3xl`}
        style={{
          transform: `translate(${Math.cos(scrollY * 0.0015) * -40}px, ${Math.sin(scrollY * 0.002) * 35}px)`,
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
              Testimonials
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
            What clients and colleagues say about working with me
          </p>
        </div>
        
        <div 
          className="relative max-w-6xl mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? 0 : 40}px) scale(${isVisible ? 1 : 0.95})`,
            transition: 'all 0.8s ease-out 0.3s'
          }}
        >
          {/* Main testimonial carousel */}
          <div className={`overflow-hidden rounded-3xl backdrop-blur-lg ${cardBg} border ${cardBorder} transition-all duration-500 ${hoverBorderColor}`}>
            <div 
              className={`flex transition-transform duration-500 ease-out ${isAnimating ? 'opacity-90' : 'opacity-100'}`}
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => {
                const stats = getTestimonialStatsByIndex(index);
                
                return (
                  <div key={testimonial.id} className="w-full flex-shrink-0 p-8 md:p-12">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Left side - Testimonial content */}
                      <div className="lg:w-2/3">
                        <p className={`text-2xl md:text-3xl ${mutedTextColor} mb-8 leading-relaxed`}>
                          {testimonial.text}
                        </p>
                        
                        {/* Author info */}
                        <div className="flex items-center">
                          <div 
                            className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl mr-6 transition-all duration-300 hover:scale-110 bg-gradient-to-r ${getAvatarGradient(index)}`}
                            style={{
                              transform: `translateY(${Math.sin(scrollY * 0.004 + index) * 5}px)`,
                            }}
                          >
                            {getAvatarImage(testimonial.avatar)}
                          </div>
                          <div>
                            <div className={`text-2xl font-bold ${textColor}`}>{testimonial.name}</div>
                            <div className={`${mutedTextColor} text-lg`}>{testimonial.role}</div>
                            {/* Rating stars */}
                            <div className="flex items-center mt-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star}
                                  className="w-5 h-5 text-amber-400 fill-amber-400 mr-1"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right side - Stats */}
                      <div className="lg:w-1/3">
                        <div className={`p-6 rounded-2xl bg-gradient-to-br ${statsBg} border ${statsBorder}`}>
                          <h4 className={`text-xl font-bold ${textColor} mb-6 flex items-center`}>
                            <Zap className="w-5 h-5 mr-2 text-amber-400" />
                            Impact Metrics
                          </h4>
                          <div className="space-y-4">
                            {stats.map((stat, statIndex) => (
                              <div 
                                key={statIndex}
                                className={`flex items-center justify-between p-3 rounded-lg ${statsItemBg} border ${statsBorder} ${hoverBorderColor} transition-colors`}
                                style={{
                                  transform: `translateX(${isVisible ? 0 : 20}px)`,
                                  transition: `all 0.5s ease-out ${0.5 + statIndex * 0.2}s`
                                }}
                              >
                                <div className="flex items-center">
                                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${
                                    theme === "dark" ? "from-white/10 to-gray-400/10" : "from-gray-900/10 to-gray-600/10"
                                  } flex items-center justify-center mr-3`}>
                                    {stat.icon}
                                  </div>
                                  <div>
                                    <p className={`${mutedTextColor} text-sm`}>{stat.label}</p>
                                    <p className={`text-xl font-bold ${textColor}`}>{stat.value}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {/* Verified badge */}
                          <div className={`mt-6 pt-6 border-t ${theme === "dark" ? "border-gray-800" : "border-gray-300"}`}>
                            <div className={`flex items-center text-sm ${mutedTextColor}`}>
                              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${
                                theme === "dark" ? "from-green-500 to-emerald-500" : "from-green-400 to-emerald-400"
                              } flex items-center justify-center mr-3`}>
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span>Verified Client Review</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Navigation controls */}
          <div 
            className="flex justify-center items-center space-x-8 mt-12"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `translateY(${isVisible ? 0 : 30}px)`,
              transition: 'all 0.8s ease-out 0.4s'
            }}
          >
            <button
              onClick={handlePrevClick}
              disabled={isAnimating}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group ${
                isAnimating 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:scale-110 hover:shadow-3xl'
              }`}
              style={{
                background: navButtonBg,
                backdropFilter: 'blur(10px)',
                border: navButtonBorder,
                transform: `translateX(${Math.sin(scrollY * 0.005) * 5}px)`,
              }}
            >
              <ChevronLeft className={`w-7 h-7 ${navButtonText} group-hover:-translate-x-1 transition-transform`} />
            </button>
            
            {/* Testimonial indicators */}
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating && index !== currentTestimonial) {
                      setIsAnimating(true);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? `bg-gradient-to-r ${gradientFrom} ${gradientTo} scale-125` 
                      : `${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-400"
                        } hover:${
                          theme === "dark" ? "bg-gray-500" : "bg-gray-600"
                        }`
                  }`}
                  style={{
                    transform: index === currentTestimonial 
                      ? `scale(1.25) translateY(${Math.sin(scrollY * 0.01) * 3}px)` 
                      : 'scale(1)',
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={handleNextClick}
              disabled={isAnimating}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group ${
                isAnimating 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:scale-110 hover:shadow-3xl'
              }`}
              style={{
                background: navButtonBg,
                backdropFilter: 'blur(10px)',
                border: navButtonBorder,
                transform: `translateX(${Math.cos(scrollY * 0.005) * 5}px)`,
              }}
            >
              <ChevronRight className={`w-7 h-7 ${navButtonText} group-hover:translate-x-1 transition-transform`} />
            </button>
          </div>
          
          {/* Current testimonial indicator */}
          <div 
            className={`text-center mt-6 ${mutedTextColor}`}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `translateY(${isVisible ? 0 : 20}px)`,
              transition: 'all 0.8s ease-out 0.5s'
            }}
          >
            Testimonial {currentTestimonial + 1} of {testimonials.length}
          </div>
        </div>

        {/* Additional testimonials preview */}
        <div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? 0 : 50}px)`,
            transition: 'all 0.8s ease-out 0.6s'
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`p-6 rounded-2xl backdrop-blur-sm ${previewCardBg} border transition-all duration-300 hover:scale-105 cursor-pointer ${
                index === currentTestimonial 
                  ? `${activePreviewBorder} scale-105` 
                  : `${previewCardBorder} ${hoverBorderColor}`
              }`}
              onClick={() => {
                if (!isAnimating && index !== currentTestimonial) {
                  setIsAnimating(true);
                  setTimeout(() => setIsAnimating(false), 500);
                }
              }}
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.003 + index) * 5}px)`,
              }}
            >
              <div className="flex items-start mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mr-4 bg-gradient-to-r ${getAvatarGradient(index)}`}>
                  {getAvatarImage(testimonial.avatar)}
                </div>
                <div>
                  <div className={`font-bold ${textColor}`}>{testimonial.name}</div>
                  <div className={`text-sm ${mutedTextColor}`}>{testimonial.role}</div>
                </div>
              </div>
              <p className={`${mutedTextColor} line-clamp-3`}>{testimonial.text}</p>
            </div>
          ))}
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

export default Testimonials;