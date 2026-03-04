import React from 'react';
import { Mail, Github, MapPin, ChevronRight, Sparkles} from 'lucide-react';
import type { User } from '../data/data';

interface HeroProps {
  irumiUser: User;
  animatedStats: {
    projects: number;
    experience: number;
    skills: number;
    clients: number;
  };
  statsRef: React.RefObject<HTMLDivElement | null>;
  scrollToSection: (sectionId: string) => void;
  scrollY?: number;
  theme?: "light" | "dark"; // Added theme prop
}

const Hero: React.FC<HeroProps> = ({
  irumiUser,
  animatedStats,
  statsRef,
  scrollToSection,
  scrollY = 0,
  theme = "dark" // Added default value
}) => {
  // Theme-based colors
  const gradientFrom = theme === "dark" ? "from-white" : "from-gray-900";
  const gradientTo = theme === "dark" ? "to-gray-400" : "to-gray-600";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const mutedTextColor = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const cardBg = theme === "dark" ? "from-gray-900 to-black" : "from-gray-100 to-white";
  const cardBorder = theme === "dark" ? "border-gray-800" : "border-gray-300";
  const cardHoverBorder = theme === "dark" ? "hover:border-gray-600" : "hover:border-gray-500";
  const statsBg = theme === "dark" ? "bg-gray-900/50" : "bg-gray-100/50";
  const statsBorder = theme === "dark" ? "border-gray-800" : "border-gray-300";
  const statsHoverBorder = theme === "dark" ? "hover:border-gray-600" : "hover:border-gray-500";
  const buttonGradient = theme === "dark" ? "from-white to-gray-300" : "from-gray-900 to-gray-700";
  const buttonText = theme === "dark" ? "text-black" : "text-white";
  const secondaryButtonText = theme === "dark" ? "text-white" : "text-gray-900";
  const secondaryButtonBorder = theme === "dark" ? "border-white" : "border-gray-900";
  const secondaryButtonHoverBg = theme === "dark" ? "hover:bg-white" : "hover:bg-gray-900";
  const secondaryButtonHoverText = theme === "dark" ? "hover:text-black" : "hover:text-white";
  const socialBg = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const socialBorder = theme === "dark" ? "border-gray-800" : "border-gray-300";
  const socialHoverBg = theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200";
  const scrollBorder = theme === "dark" ? "border-gray-400" : "border-gray-600";
  const scrollDot = theme === "dark" ? "bg-gray-400" : "bg-gray-600";

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    img.style.display = 'none';
    
    // Create fallback element
    const fallback = document.createElement('div');
    fallback.className = `w-full h-full bg-gradient-to-br ${
      theme === "dark" ? "from-gray-700 to-black" : "from-gray-300 to-gray-100"
    } flex items-center justify-center`;
    fallback.innerHTML = '<span class="text-5xl">👨‍💻</span>';
    
    img.parentNode?.appendChild(fallback);
  };

  // Calculate animations based on scroll
  const heroProgress = Math.min(1, scrollY / 500);
  const textOpacity = 1 - Math.min(1, scrollY / 200);
  const textTranslateY = Math.min(30, scrollY / 10);

  // GMAIL COMPOSE FUNCTION
  const handleGmailClick = () => {
    const firstName = irumiUser.name.split(' ')[0];
    const subject = "Potential Opportunity Inquiry";
    const body = `Hi ${firstName},\n\nI came across your portfolio and was impressed by your work. I would like to discuss...\n\nBest regards,`;
    
    // Gmail web compose URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(irumiUser.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open Gmail in new tab
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Animated background elements that move with scroll */}
      <div 
        className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r ${
          theme === "dark" ? "from-white/5 to-gray-500/5" : "from-gray-900/5 to-gray-600/5"
        } rounded-full blur-3xl`}
        style={{
          transform: `translate(${Math.sin(scrollY * 0.002) * 50}px, ${Math.cos(scrollY * 0.003) * 30}px)`,
          opacity: 0.2 + Math.sin(scrollY * 0.001) * 0.1,
        }}
      />
      <div 
        className={`absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r ${
          theme === "dark" ? "from-gray-400/5 to-gray-600/5" : "from-gray-300/5 to-gray-500/5"
        } rounded-full blur-3xl`}
        style={{
          transform: `translate(${Math.cos(scrollY * 0.0015) * -40}px, ${Math.sin(scrollY * 0.002) * 20}px)`,
          opacity: 0.2 + Math.cos(scrollY * 0.0008) * 0.1,
        }}
      />

      {/* Floating code brackets */}
      <div 
        className={`absolute left-10 top-1/3 text-6xl ${
          theme === "dark" ? "text-white/5" : "text-gray-900/5"
        } font-mono pointer-events-none select-none`}
        style={{
          transform: `translateY(${Math.sin(scrollY * 0.005) * 50}px) rotate(${scrollY * 0.02}deg)`,
          opacity: 0.1,
        }}
      >
        {'{'}
      </div>
      <div 
        className={`absolute right-10 top-2/3 text-6xl ${
          theme === "dark" ? "text-white/5" : "text-gray-900/5"
        } font-mono pointer-events-none select-none`}
        style={{
          transform: `translateY(${Math.cos(scrollY * 0.004) * 40}px) rotate(${scrollY * -0.015}deg)`,
          opacity: 0.1,
        }}
      >
        {'}'}
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div 
            className="space-y-8"
            style={{
              opacity: textOpacity,
              transform: `translateY(${textTranslateY}px)`,
              transition: 'all 0.5s ease-out'
            }}
          >
            <div 
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${
                theme === "dark" ? "from-white/10 to-gray-500/10" : "from-gray-900/10 to-gray-600/10"
              } border ${
                theme === "dark" ? "border-gray-700" : "border-gray-400"
              }`}
              style={{
                transform: `translateX(${heroProgress * -20}px)`,
                opacity: 1 - heroProgress * 0.5,
              }}
            >
              <Sparkles className={`w-4 h-4 ${textColor}`} />
              <span className={`text-sm ${textColor}`}>Available for Opportunities</span>
            </div>
            
            <div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span 
                  className={`block ${textColor} transition-all duration-700`}
                  style={{
                    transform: `translateX(${heroProgress * -30}px)`,
                    opacity: 1 - heroProgress * 0.3,
                  }}
                >
                  Building The
                </span>
                <span 
                  className={`block bg-gradient-to-r ${gradientFrom} via-gray-300 ${gradientTo} bg-clip-text text-transparent transition-all duration-700`}
                  style={{
                    transform: `translateX(${heroProgress * 40}px)`,
                    opacity: 1 - heroProgress * 0.2,
                  }}
                >
                  Future With Code
                </span>
              </h1>
            </div>
            
            <p 
              className={`text-xl ${mutedTextColor} max-w-2xl transition-all duration-700`}
              style={{
                transform: `translateY(${heroProgress * 20}px)`,
                opacity: 1 - heroProgress * 0.4,
              }}
            >
              IT Graduate & Full Stack Developer specializing in web systems, 
              ARIMA forecasting, and innovative digital solutions that drive business efficiency.
            </p>
            
            <div 
              className="flex flex-wrap gap-4"
              style={{
                transform: `translateY(${heroProgress * 30}px)`,
                opacity: 1 - heroProgress * 0.5,
              }}
            >
              <button 
                onClick={() => scrollToSection("projects")}
                className={`group relative px-8 py-4 bg-gradient-to-r ${buttonGradient} rounded-full font-bold ${buttonText} overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
              >
                <span className="relative z-10">View My Work</span>
                <div className={`absolute inset-0 bg-gradient-to-r ${
                  theme === "dark" ? "from-gray-300 to-gray-400" : "from-gray-700 to-gray-600"
                } transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500`}></div>
              </button>
              
              <button 
                onClick={() => scrollToSection("contact")}
                className={`group px-8 py-4 border-2 ${secondaryButtonBorder} rounded-full font-bold ${secondaryButtonText} transition-all duration-300 ${secondaryButtonHoverBg} ${secondaryButtonHoverText} hover:scale-105`}
              >
                <span className="flex items-center">
                  Contact Me
                  <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
            </div>
          </div>
          
          {/* Right Column - Profile Card */}
          <div className="relative">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Animated profile card */}
              <div 
                className={`relative bg-gradient-to-br ${cardBg} rounded-3xl p-8 shadow-2xl border ${cardBorder} transition-all duration-500 hover:scale-105 hover:shadow-2xl ${cardHoverBorder}`}
                style={{
                  transform: `translateY(${Math.sin(scrollY * 0.003) * 20}px) rotate(${Math.sin(scrollY * 0.001) * 1}deg)`,
                  boxShadow: `0 25px 50px -12px ${
                    theme === "dark" 
                      ? `rgba(0, 0, 0, ${0.5 + Math.sin(scrollY * 0.002) * 0.2})`
                      : `rgba(100, 100, 100, ${0.3 + Math.sin(scrollY * 0.002) * 0.1})`
                  }`,
                }}
              >
                {/* Animated gradient background */}
                <div 
                  className="absolute -top-6 -right-6 w-32 h-32 rounded-full blur-3xl"
                  style={{
                    background: `linear-gradient(45deg, ${
                      theme === "dark" 
                        ? "rgba(255,255,255,0.1), rgba(128,128,128,0.1)"
                        : "rgba(0,0,0,0.1), rgba(100,100,100,0.1)"
                    })`,
                    transform: `rotate(${scrollY * 0.05}deg) scale(${1 + Math.sin(scrollY * 0.01) * 0.1})`,
                    opacity: 0.2,
                  }}
                />
                
                <div className="flex items-center space-x-6 mb-8 relative z-10">
                  <div className="relative">
                    {/* Rotating ring */}
                    <div 
                      className="absolute inset-0 rounded-full border-2 border-transparent"
                      style={{
                        background: `linear-gradient(${scrollY * 0.1}deg, ${
                          theme === "dark" 
                            ? "rgba(255,255,255,0.2), rgba(128,128,128,0.2)"
                            : "rgba(0,0,0,0.2), rgba(100,100,100,0.2)"
                        })`,
                        animation: 'spin-slow 8s linear infinite',
                      }}
                    />
                    
                    {/* Profile image container */}
                    <div className={`relative w-32 h-32 rounded-full overflow-hidden border-4 ${
                      theme === "dark" ? "border-gray-800" : "border-gray-300"
                    }`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img 
                          src={irumiUser.profileImage} 
                          alt={irumiUser.name}
                          className="min-w-full min-h-full object-cover"
                          style={{ 
                            transform: 'scale(1.0, 0.8)',
                            filter: `brightness(${1 + Math.sin(scrollY * 0.002) * 0.1})`
                          }}
                          onError={handleImageError}
                          loading="lazy"
                        />
                      </div>
                    </div>  
                  </div>
                  
                  <div>
                    <h2 className={`text-3xl font-bold ${textColor}`}>{irumiUser.name}</h2>
                    <p className={mutedTextColor}>Full Stack Developer</p>
                    <div className={`flex items-center mt-2 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}>
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{irumiUser.location}</span>
                    </div>
                  </div>
                </div>
                
                {/* Stats Grid */}
                <div ref={statsRef} className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                  {[
                    { value: animatedStats.projects, label: 'Projects' },
                    { value: animatedStats.experience, label: 'Years Exp' },
                    { value: animatedStats.skills, label: 'Skills' },
                    { value: animatedStats.clients, label: 'Clients' }
                  ].map((stat, index) => (
                    <div 
                      key={index}
                      className={`${statsBg} border ${statsBorder} rounded-xl p-4 text-center ${statsHoverBorder} transition-all duration-300 hover:scale-105`}
                      style={{
                        transform: `translateY(${Math.sin(scrollY * 0.005 + index) * 5}px)`,
                      }}
                    >
                      <div className={`text-3xl font-bold ${textColor}`}>{stat.value}+</div>
                      <div className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}>{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                {/* Social Links */}
                <div className="flex space-x-4 relative z-10">
                  {/* GMAIL COMPOSE BUTTON */}
                  <button
                    onClick={handleGmailClick}
                    className={`flex-1 py-3 ${socialBg} border ${socialBorder} rounded-lg flex items-center justify-center transition-all duration-300 ${socialHoverBg} hover:scale-105 ${cardHoverBorder} group relative cursor-pointer`}
                    style={{
                      transform: `translateY(${Math.sin(scrollY * 0.004) * 3}px)`,
                    }}
                    title="Compose Email in Gmail"
                  >
                    <Mail className={`w-5 h-5 ${textColor} group-hover:scale-110 transition-transform`} />
                    <div className={`absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity ${
                      theme === "dark" ? "bg-black/80" : "bg-white/80"
                    } px-2 py-1 rounded text-xs whitespace-nowrap ${textColor}`}>
                      Email via Gmail
                    </div>
                  </button>
                  
                  {/* GitHub link */}
                  <a 
                    href={irumiUser.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 py-3 ${socialBg} border ${socialBorder} rounded-lg flex items-center justify-center transition-all duration-300 ${socialHoverBg} hover:scale-105 ${cardHoverBorder} group relative cursor-pointer`}
                    style={{
                      transform: `translateY(${Math.sin(scrollY * 0.004 + 1) * 3}px)`,
                    }}
                    title="GitHub Profile"
                  >
                    <Github className={`w-5 h-5 ${textColor} group-hover:scale-110 transition-transform`} />
                    <div className={`absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity ${
                      theme === "dark" ? "bg-black/80" : "bg-white/80"
                    } px-2 py-1 rounded text-xs whitespace-nowrap ${textColor}`}>
                      GitHub Profile
                    </div>
                  </a>
                </div>
              </div>
              
              {/* Floating elements with scroll animations */}
              <div 
                className={`absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-2xl opacity-20 blur-xl`}
                style={{
                  transform: `rotate(${12 + scrollY * 0.01}deg) translateY(${Math.sin(scrollY * 0.003) * 30}px)`,
                  animation: 'float 6s ease-in-out infinite',
                }}
              />
              <div 
                className={`absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r ${
                  theme === "dark" ? "from-gray-400 to-gray-600" : "from-gray-500 to-gray-700"
                } rounded-2xl opacity-20 blur-xl`}
                style={{
                  transform: `rotate(${-12 - scrollY * 0.008}deg) translateY(${Math.cos(scrollY * 0.004) * 25}px)`,
                  animation: 'float 8s ease-in-out infinite 2s',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400"
        style={{
          opacity: Math.max(0, 1 - scrollY / 100),
        }}
      >
        <span className={`text-sm mb-2 ${
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        }`}>Scroll to explore</span>
        <div className={`w-6 h-10 border-2 ${scrollBorder} rounded-full flex justify-center`}>
          <div 
            className={`w-1 h-3 ${scrollDot} rounded-full mt-2 animate-bounce`}
            style={{
              animationDuration: '2s',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;