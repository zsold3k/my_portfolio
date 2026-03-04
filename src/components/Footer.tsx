import React, { useState, useEffect } from 'react';
import { Code, ArrowUp, Heart } from 'lucide-react';

interface FooterProps {
  scrollToSection: (sectionId: string) => void;
  scrollY?: number;
  theme?: "light" | "dark"; // Added theme prop
}

const Footer: React.FC<FooterProps> = ({ scrollToSection, scrollY = 0, theme = "dark" }) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Update year on mount
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Show back to top button based on scroll
  useEffect(() => {
    setShowBackToTop(scrollY > 500);
  }, [scrollY]);

  // Animation calculations
  const footerStart = 3500;
  const isVisible = scrollY > footerStart;

  // Theme-based colors
  const bgColor = theme === "dark" ? "bg-black" : "bg-gray-50";
  const borderColor = theme === "dark" ? "border-gray-800" : "border-gray-300";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const mutedTextColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const iconBg = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const iconBorder = theme === "dark" ? "border-gray-700" : "border-gray-300";
  const iconHoverBorder = theme === "dark" ? "hover:border-white" : "hover:border-gray-900";
  const particleColor = theme === "dark" ? "bg-white/10" : "bg-gray-900/10";
  const dotColor = theme === "dark" ? "bg-gray-600" : "bg-gray-400";
  const dotHoverColor = theme === "dark" ? "group-hover:bg-white" : "group-hover:bg-gray-900";
  const buttonGradient = theme === "dark" ? "from-white to-gray-300" : "from-gray-900 to-gray-700";
  const buttonText = theme === "dark" ? "text-black" : "text-white";
  const scrollIndicator = theme === "dark" ? "via-gray-600" : "via-gray-400";

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative z-10 ${bgColor} border-t ${borderColor} py-12 overflow-hidden`}>
      {/* Animated background elements */}
      <div 
        className={`absolute -top-40 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r ${
          theme === "dark" ? "from-white/3 to-gray-500/3" : "from-gray-900/3 to-gray-600/3"
        } rounded-full blur-3xl`}
        style={{
          transform: `translateX(-50%) translateY(${Math.sin(scrollY * 0.002) * 40}px)`,
          opacity: 0.1 + Math.sin(scrollY * 0.001) * 0.05,
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 ${particleColor} rounded-full`}
          style={{
            left: `${(i * 12) % 100}%`,
            top: `${20 + (i * 8) % 60}%`,
            transform: `translateY(${Math.sin(scrollY * 0.005 + i) * 20}px)`,
            opacity: 0.3 + Math.sin(scrollY * 0.003 + i) * 0.2,
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? 0 : 50}px)`,
            transition: 'all 0.8s ease-out'
          }}
        >
          <div>
            <div 
              className="flex items-center space-x-3 mb-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `translateX(${isVisible ? 0 : -30}px)`,
                transition: 'all 0.8s ease-out 0.2s'
              }}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg} border ${iconBorder} ${iconHoverBorder} transition-all duration-300 group`}
                style={{
                  transform: `rotate(${scrollY * 0.01}deg)`,
                }}
              >
                <Code className={`w-5 h-5 ${textColor} group-hover:scale-110 transition-transform`} />
              </div>
              <div>
                <h3 className={`text-xl font-bold ${textColor}`}>Irumi Reyes</h3>
                <p className={`${mutedTextColor} text-sm`}>Full Stack Developer</p>
              </div>
            </div>
            <p 
              className={`${mutedTextColor} text-sm`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `translateX(${isVisible ? 0 : -20}px)`,
                transition: 'all 0.8s ease-out 0.3s'
              }}
            >
              Building innovative digital solutions that drive business efficiency.
            </p>
          </div>

          <div>
            <h4 
              className={`${textColor} font-semibold mb-4`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `translateY(${isVisible ? 0 : 20}px)`,
                transition: 'all 0.8s ease-out 0.4s'
              }}
            >
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2">
              {["home", "about", "skills", "projects", "contact"].map((section, index) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`${mutedTextColor} hover:${textColor} text-left transition-all duration-300 group flex items-center`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: `translateX(${isVisible ? 0 : -15}px)`,
                    transition: `all 0.5s ease-out ${0.5 + index * 0.1}s`
                  }}
                >
                  <span className={`w-2 h-2 ${dotColor} rounded-full mr-3 ${dotHoverColor} group-hover:scale-125 transition-all duration-300`}></span>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                  <span className={`ml-2 opacity-0 group-hover:opacity-100 transition-opacity ${textColor}`}>→</span>
                </button>
              ))}
            </nav>
          </div>

          <div>
            <h4 
              className={`${textColor} font-semibold mb-4`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `translateY(${isVisible ? 0 : 20}px)`,
                transition: 'all 0.8s ease-out 0.4s'
              }}
            >
              Connect
            </h4>
            <div className={`flex flex-col space-y-2 ${mutedTextColor} text-sm`}>
              <p 
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: `translateX(${isVisible ? 0 : 20}px)`,
                  transition: 'all 0.8s ease-out 0.5s'
                }}
              >
                📍 Pasig City, Philippines
              </p>
              <p 
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: `translateX(${isVisible ? 0 : 25}px)`,
                  transition: 'all 0.8s ease-out 0.6s'
                }}
              >
                🚀 Available for opportunities
              </p>
            </div>
          </div>
        </div>

        <div 
          className={`border-t ${borderColor} pt-8 text-center`}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? 0 : 30}px)`,
            transition: 'all 0.8s ease-out 0.7s'
          }}
        >
          <p className={`${mutedTextColor} text-sm flex items-center justify-center`}>
            Made with 
            <Heart className="w-4 h-4 text-red-400 mx-2 animate-pulse" /> 
            by Irumi Reyes • © {currentYear} • All rights reserved
          </p>
          <p className={`${theme === "dark" ? "text-gray-500" : "text-gray-400"} text-xs mt-2`}>
            Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={handleBackToTop}
          className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r ${buttonGradient} flex items-center justify-center ${buttonText} font-bold shadow-2xl z-40 hover:scale-110 transition-all duration-300 group`}
          style={{
            transform: `translateY(${Math.sin(scrollY * 0.05) * 10}px) scale(${isVisible ? 1 : 0.8})`,
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.3s ease-out'
          }}
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}

      {/* Scroll indicator for footer */}
      <div 
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent ${scrollIndicator} to-transparent`}
        style={{
          opacity: isVisible ? 0.3 : 0,
          transition: 'opacity 0.5s ease'
        }}
      />
    </footer>
  );
};

export default Footer;