import React from 'react';
import { Code, FileText, Menu, X, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  scrollY: number;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  scrollToSection: (sectionId: string) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({
  activeSection,
  scrollY,
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollToSection,
  theme = "dark",
  toggleTheme
}) => {
  const navItems = ["home", "about", "skills", "projects", "experience", "contact"];
  
  // Theme-based colors
  const headerBg = theme === "dark" 
    ? (scrollY > 100 ? 'bg-black/95' : 'bg-black/80')
    : (scrollY > 100 ? 'bg-white/95' : 'bg-white/80');
  
  const borderColor = theme === "dark" ? "border-gray-300" : "border-gray-200";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const mutedTextColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const iconBg = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const iconBorder = theme === "dark" ? "border-gray-700" : "border-gray-300";
  const gradientFrom = theme === "dark" ? "from-white" : "from-gray-900";
  const gradientTo = theme === "dark" ? "to-gray-400" : "to-gray-3  00";
  const mobileMenuBg = theme === "dark" ? "bg-gray-800" : "bg-gray-100";
  const mobileMenuHover = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200";
  const mobileActiveBg = theme === "dark" 
    ? "bg-gradient-to-r from-white to-gray-300 text-black" 
    : "bg-gradient-to-r from-gray-400 to-gray-300 text-white";
  const buttonBg = theme === "dark" ? "bg-white" : "bg-gray-900";
  const buttonText = theme === "dark" ? "text-black" : "text-white";
  const buttonHover = theme === "dark" ? "hover:bg-gray-200" : "hover:bg-gray-800";
  const menuButtonBg = theme === "dark" ? "bg-gray-400" : "bg-gray-100";
  const menuButtonHover = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200";

  const handleResumeClick = () => {
    // Open resume in new tab for viewing
    window.open('./public/Curriculum Vitae (Final).pdf', '_blank');

    // Optional: You can add some visual feedback or tracking here
    console.log('Resume opened in new tab');
    
    // Optional: Show a subtle notification (you could replace this with a toast)
    // setTimeout(() => {
    //   if (newTab && !newTab.closed) {
    //     // If tab is still open after 2 seconds, user is viewing it
    //     console.log('User is viewing resume');
    //   }
    // }, 2000);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 backdrop-blur-lg border-b ${borderColor} ${
      scrollY > 100 ? 'py-2' : 'py-4'
    } ${headerBg}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative group cursor-pointer">
              <div className={`absolute -inset-1 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-full blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 animate-tilt`}></div>
              <div className={`relative w-12 h-12 rounded-full flex items-center justify-center ${iconBg} border ${iconBorder} transition-all duration-300 hover:scale-110`}>
                <Code className={`w-6 h-6 ${textColor}`} />
              </div>
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${textColor}`}>Irumi Reyes</h1>
              <p className={mutedTextColor}>Full Stack Developer</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`relative px-4 py-2 rounded-full font-medium transition-all duration-300 group overflow-hidden ${
                  activeSection === section 
                  ? `${textColor} font-bold`
                  : `${mutedTextColor} hover:${textColor}`
                }`}
              >
                <span className="relative z-10">{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                <span className={`absolute inset-0 bg-gradient-to-r ${gradientFrom} ${gradientTo} transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ${
                  activeSection === section ? 'translate-y-0' : ''
                }`}></span>
              </button>
            ))}
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`ml-2 p-2 rounded-full ${
                theme === "dark" 
                  ? "bg-white/10 hover:bg-white/20 border border-gray-700" 
                  : "bg-gray-900/10 hover:bg-gray-900/20 border border-gray-300"
              } transition-all duration-300 hover:scale-110`}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
            
            {/* Resume Button - Option 2 Implementation */}
            <button
              onClick={handleResumeClick}
              className={`ml-2 px-4 py-2 ${buttonBg} ${buttonText} rounded-full font-medium ${buttonHover} transition-all duration-300 flex items-center relative group`}
              title="Click to view resume in new tab. You can save it from there."
            >
              <FileText className="w-4 h-4 mr-2" />
              View Resume
              {/* Tooltip for desktop */}
              <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 rounded-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-600 text-white"
              }`}>
                Opens in new tab
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-${
                  theme === "dark" ? "gray-700" : "gray-600"
                }`}></div>
              </div>
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle Button for Mobile */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                theme === "dark" 
                  ? "bg-white/10 hover:bg-white/20 border border-gray-700" 
                  : "bg-gray-900/10 hover:bg-gray-900/20 border border-gray-300"
              } transition-all duration-300 hover:scale-110`}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${menuButtonBg} ${menuButtonHover} transition-colors`}
            >
              {mobileMenuOpen ? (
                <X size={24} className={textColor} />
              ) : (
                <Menu size={24} className={textColor} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    scrollToSection(section);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                    activeSection === section
                      ? mobileActiveBg
                      : `${mobileMenuBg} ${mobileMenuHover} ${textColor}`
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
              
              {/* Theme Toggle in Mobile Menu */}
              <button
                onClick={() => {
                  toggleTheme();
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-3 rounded-lg flex items-center justify-center ${mobileMenuBg} ${mobileMenuHover} transition-all duration-300`}
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="w-5 h-5 mr-2 text-yellow-400" />
                    <span className={textColor}>Switch to Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5 mr-2 text-gray-700" />
                    <span className={textColor}>Switch to Dark Mode</span>
                  </>
                )}
              </button>
              
              {/* Resume Button for Mobile - Option 2 Implementation */}
              <button
                onClick={() => {
                  handleResumeClick();
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-3 ${buttonBg} ${buttonText} rounded-lg font-medium ${buttonHover} transition-all duration-300 flex items-center justify-center`}
              >
                <FileText className="w-4 h-4 mr-2" />
                View Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;