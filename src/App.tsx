import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { PROJECTS, DEFAULT_USERS, SKILLS, EXPERIENCES, IRUMI_USER } from "./data/data";
import { Sun, Moon } from "lucide-react";

export default function App() {
  const [users] = useState(DEFAULT_USERS);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    experience: 0,
    skills: 0,
    clients: 0
  });
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const statsRef = useRef<HTMLDivElement>(null);

  const irumiUser = IRUMI_USER || users[0];

  // Initialize theme from localStorage or prefer-color-scheme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? currentScrollY / totalHeight : 0;
      setScrollProgress(progress);
      
      updateActiveSection();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animate stats when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animate = (endValue: number, setter: (value: number) => void) => {
              let start = 0;
              const duration = 2000;
              const increment = endValue / (duration / 16);
              
              const timer = window.setInterval(() => {
                start += increment;
                if (start >= endValue) {
                  setter(endValue);
                  clearInterval(timer);
                } else {
                  setter(Math.floor(start));
                }
              }, 16);
            };

            animate(12, (value) => setAnimatedStats(prev => ({ ...prev, projects: value })));
            animate(1, (value) => setAnimatedStats(prev => ({ ...prev, experience: value })));
            animate(10, (value) => setAnimatedStats(prev => ({ ...prev, skills: value })));
            animate(4, (value) => setAnimatedStats(prev => ({ ...prev, clients: value })));
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const updateActiveSection = () => {
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(sections[i]);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
          setActiveSection(sections[i]);
          break;
        }
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
      }
    );

    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const getParallaxOffset = (speed: number = 0.5) => {
    return scrollY * speed;
  };

  // Theme-based background colors
  const bgColor = theme === "dark" ? "bg-black" : "bg-gray-50";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const gradientFrom = theme === "dark" ? "from-white" : "from-gray-900";
  const gradientTo = theme === "dark" ? "to-gray-400" : "to-gray-600";

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} overflow-x-hidden transition-colors duration-300`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className={`absolute top-1/4 left-1/4 w-72 h-72 ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-200"
          } rounded-full mix-blend-screen filter blur-xl opacity-10`}
          style={{
            transform: `translateY(${getParallaxOffset(0.1)}px) rotate(${scrollY * 0.05}deg)`
          }}
        ></div>
        <div 
          className={`absolute top-1/3 right-1/4 w-72 h-72 ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-300"
          } rounded-full mix-blend-screen filter blur-xl opacity-10`}
          style={{
            transform: `translateY(${getParallaxOffset(0.2)}px) rotate(${scrollY * 0.03}deg)`
          }}
        ></div>
        <div 
          className={`absolute bottom-1/4 left-1/2 w-72 h-72 ${
            theme === "dark" ? "bg-gray-600" : "bg-gray-400"
          } rounded-full mix-blend-screen filter blur-xl opacity-10`}
          style={{
            transform: `translateY(${getParallaxOffset(0.15)}px) rotate(${scrollY * 0.07}deg)`
          }}
        ></div>

        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 ${
              theme === "dark" ? "bg-white/20" : "bg-gray-900/20"
            } rounded-full`}
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${20 + (i * 5) % 80}%`,
              transform: `translateY(${Math.sin(scrollY * 0.01 + i) * 50}px)`,
              opacity: 0.3 + Math.sin(scrollY * 0.005 + i) * 0.2,
            }}
          />
        ))}
      </div>

      {/* Mouse follower */}
      <div 
        className={`fixed w-96 h-96 rounded-full bg-gradient-to-r ${
          theme === "dark" ? "from-white/5 to-gray-500/5" : "from-gray-900/5 to-gray-600/5"
        } pointer-events-none z-0`}
        style={{
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
          transition: 'left 0.3s ease-out, top 0.3s ease-out, transform 0.3s ease-out'
        }}
      />

      {/* Scroll progress indicator */}
      <div 
        className={`fixed top-0 left-0 h-1 bg-gradient-to-r ${gradientFrom} via-gray-300 ${gradientTo} z-50 transition-all duration-150`}
        style={{
          width: `${scrollProgress * 100}%`,
        }}
      />

      {/* Theme Toggle Button with Text Labels */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-24 md:right-32 z-50 px-4 py-2 rounded-full flex items-center space-x-2 ${
          theme === "dark" 
            ? "bg-white/10 hover:bg-white/20 text-white" 
            : "bg-gray-900/10 hover:bg-gray-900/20 text-gray-900"
        } backdrop-blur-lg border ${
          theme === "dark" ? "border-gray-700" : "border-gray-300"
        } transition-all duration-300 hover:scale-105`}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? (
          <>
            <Sun className="w-5 h-5 text-yellow-400" />
            <span className="font-medium">Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="w-5 h-5 text-gray-700" />
            <span className="font-medium">Dark Mode</span>
          </>
        )}
      </button>

      {/* Alternative: Toggle Switch Style */}
      {/* <div className={`fixed top-6 right-24 md:right-32 z-50 flex items-center space-x-2`}>
        <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Light</span>
        <button
          onClick={toggleTheme}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
            theme === "dark" ? "bg-blue-600" : "bg-gray-300"
          }`}
          aria-label="Toggle theme"
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              theme === "dark" ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <span className={`text-sm ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Dark</span>
      </div> */}

      <Header 
        activeSection={activeSection}
        scrollY={scrollY}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollToSection={scrollToSection}
        theme={theme}
        toggleTheme={toggleTheme} // IDAGDAG ITO
      />

      <main className="relative z-10">
        <Hero 
          irumiUser={irumiUser}
          animatedStats={animatedStats}
          statsRef={statsRef}
          scrollToSection={scrollToSection}
          scrollY={scrollY}
          theme={theme}
        />
        
        <About scrollY={scrollY} theme={theme} />
        <Skills skills={SKILLS} scrollY={scrollY} theme={theme} />
        <Projects projects={PROJECTS} scrollY={scrollY} theme={theme} />
        <Experience experiences={EXPERIENCES} scrollY={scrollY} theme={theme} />
        {/* <Testimonials 
          testimonials={TESTIMONIALS}
          currentTestimonial={currentTestimonial}
          nextTestimonial={nextTestimonial}
          prevTestimonial={prevTestimonial}
          scrollY={scrollY}
          theme={theme}
        /> */}
        <Contact irumiUser={irumiUser} scrollY={scrollY} theme={theme} />
      </main>

      <Footer scrollToSection={scrollToSection} scrollY={scrollY} theme={theme} />

      {/* Scroll to top button */}
      {scrollY > 500 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r ${gradientFrom} to-gray-300 rounded-full flex items-center justify-center ${
            theme === "dark" ? "text-black" : "text-white"
          } font-bold shadow-2xl z-40 hover:scale-110 transition-all duration-300`}
          style={{
            transform: `translateY(${Math.sin(scrollY * 0.05) * 10}px)`
          }}
        >
          ↑
        </button>
      )}
    </div>
  );
}