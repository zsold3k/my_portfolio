import React from 'react';
import { Target, Star, Cpu, TrendingUp, Database, CheckCircle } from 'lucide-react';

// UPDATED INTERFACE WITH THEME PROP
interface AboutProps {
  scrollY?: number;
  theme?: "light" | "dark"; // Added theme prop
}

const About: React.FC<AboutProps> = ({ scrollY = 0, theme = "dark" }) => {
  // Calculate animation values based on scroll position
  const sectionStart = 800;
  const isVisible = scrollY > sectionStart;
  const progress = Math.max(0, Math.min(1, (scrollY - sectionStart) / 300));

  // Theme-based colors
  const gradientFrom = theme === "dark" ? "from-white" : "from-gray-900";
  const gradientTo = theme === "dark" ? "to-gray-400" : "to-gray-600";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const mutedTextColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const cardBg = theme === "dark" ? "bg-black/50" : "bg-white/50";
  const borderColor = theme === "dark" ? "border-gray-800" : "border-gray-300";
  const hoverBorderColor = theme === "dark" ? "hover:border-gray-600" : "hover:border-gray-400";
  const iconColor = theme === "dark" ? "text-white" : "text-gray-800";
  const sectionBg = theme === "dark" ? "bg-gray-900/50" : "bg-gray-100/50";

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Floating elements that move with scroll */}
      <div 
        className={`absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-r ${
          theme === "dark" ? "from-white/5 to-gray-500/5" : "from-gray-900/5 to-gray-600/5"
        } rounded-full blur-3xl`}
        style={{
          transform: `translateY(${Math.sin(scrollY * 0.005) * 50}px) translateX(${Math.cos(scrollY * 0.003) * 30}px)`,
          opacity: 0.2 + Math.sin(scrollY * 0.002) * 0.1,
        }}
      />
      <div 
        className={`absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-r ${
          theme === "dark" ? "from-gray-400/5 to-gray-600/5" : "from-gray-300/5 to-gray-500/5"
        } rounded-full blur-3xl`}
        style={{
          transform: `translateY(${Math.cos(scrollY * 0.004) * 40}px) translateX(${Math.sin(scrollY * 0.002) * 20}px)`,
          opacity: 0.2 + Math.cos(scrollY * 0.0015) * 0.1,
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
              About Me
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
            Hardworking and ambitious IT Graduate passionate about creating innovative digital solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div 
              className={`p-6 rounded-2xl backdrop-blur-lg ${cardBg} border ${borderColor} transition-all duration-500 hover:scale-105 ${hoverBorderColor}`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `translateX(${isVisible ? 0 : -50}px)`,
                transition: 'all 0.8s ease-out 0.3s'
              }}
            >
              <h3 className={`text-2xl font-bold mb-4 flex items-center ${textColor}`}>
                <Target className={`mr-3 ${iconColor}`} />
                Professional Summary
              </h3>
              <p className={`${mutedTextColor} mb-4`}>
                Experienced in developing Inventory Management Systems with Time-Series Forecasting. 
                Worked at BidaBoss Inc. as a Full Stack Developer, designing and developing WMS, POS, 
                and Corporate Account Systems.
              </p>
              <p className={mutedTextColor}>
                Eager to contribute to innovative projects while continuously expanding technical expertise 
                in the tech industry.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: <Cpu className={iconColor} />, label: "Full Stack", value: "Expert" },
                { icon: <TrendingUp className={iconColor} />, label: "ARIMA", value: "Advanced" },
                { icon: <Database className={iconColor} />, label: "Systems", value: "Pro" }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-xl text-center backdrop-blur-lg ${
                    theme === "dark" ? "bg-black/30" : "bg-white/30"
                  } border ${borderColor} transition-all duration-300 hover:scale-110 ${hoverBorderColor}`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: `translateY(${isVisible ? 0 : 20}px) scale(${isVisible ? 1 : 0.8})`,
                    transition: `all 0.5s ease-out ${0.4 + index * 0.1}s`
                  }}
                >
                  <div className={`${iconColor} flex justify-center mb-2`}>{item.icon}</div>
                  <div className={`font-bold ${textColor}`}>{item.label}</div>
                  <div className={`text-sm ${mutedTextColor}`}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div 
              className="relative"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `translateX(${isVisible ? 0 : 50}px)`,
                transition: 'all 0.8s ease-out 0.5s'
              }}
            >
              <div className={`p-8 rounded-3xl backdrop-blur-lg ${cardBg} border ${borderColor}`}>
                <h3 className={`text-2xl font-bold mb-6 flex items-center ${textColor}`}>
                  <Star className={`mr-3 ${iconColor}`} />
                  Key Achievements
                </h3>
                
                <div className="space-y-4">
                  {[
                    "Developed WMS that improved operational efficiency by 40%",
                    "Implemented ARIMA forecasting reducing waste by 30%",
                    "President's Lister & Dean's Lister at PLP",
                    "Top Performing Intern at JQB Digital Marketing"
                  ].map((achievement, index) => (
                    <div 
                      key={index}
                      className={`flex items-center p-4 rounded-lg bg-gradient-to-r ${
                        theme === "dark" ? "from-gray-900/50 to-black/50" : "from-gray-100/50 to-white/50"
                      } border ${borderColor} ${hoverBorderColor} transition-all duration-300 hover:translate-x-2`}
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: `translateX(${isVisible ? 0 : 30}px)`,
                        transition: `all 0.5s ease-out ${0.6 + index * 0.1}s`
                      }}
                    >
                      <CheckCircle className={`${iconColor} mr-3 flex-shrink-0`} />
                      <span className={mutedTextColor}>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Animated gradient element */}
              <div 
                className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full blur-3xl"
                style={{
                  background: `linear-gradient(45deg, ${
                    theme === "dark" 
                      ? "rgba(255,255,255,0.1), rgba(128,128,128,0.1)" 
                      : "rgba(0,0,0,0.1), rgba(100,100,100,0.1)"
                  })`,
                  transform: `rotate(${scrollY * 0.1}deg) scale(${1 + Math.sin(scrollY * 0.01) * 0.1})`,
                  opacity: 0.1 + Math.sin(scrollY * 0.005) * 0.05,
                  transition: 'all 0.1s ease-out'
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Scroll progress indicator for this section */}
        <div 
          className={`mt-12 h-1 ${theme === "dark" ? "bg-gray-800" : "bg-gray-300"} rounded-full overflow-hidden`}
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

export default About;