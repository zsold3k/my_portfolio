import React from 'react';

interface CodeIconProps {
  tech: string;
  size?: number;
  className?: string;
  theme?: "light" | "dark"; // Added theme prop
}

const CodeIcon: React.FC<CodeIconProps> = ({ tech, size = 24, className = "", theme = "dark" }) => {
  const techLower = tech.toLowerCase();
  const style = { width: `${size}px`, height: `${size}px` };
  const isDarkTheme = theme === "dark";
  
  // PHP
  if (techLower.includes('php'))
    return (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-plain.svg" 
        alt="PHP" 
        style={style}
        className={`${className}`}
      />
    );
  
  // MySQL
  if (techLower.includes('mysql'))
    return (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" 
        alt="MySQL" 
        style={style}
        className={`${className}`}
      />
    );
  
  // JavaScript
  if (techLower.includes('javascript') || techLower.includes('js'))
    return (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" 
        alt="JavaScript" 
        style={style}
        className={`${className}`}
      />
    );
  
  // HTML
  if (techLower.includes('html'))
    return (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" 
        alt="HTML" 
        style={style}
        className={`${className}`}
      />
    );
  
  // CSS
  if (techLower.includes('css'))
    return (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" 
        alt="CSS" 
        style={style}
        className={`${className}`}
      />
    );
  
  // Python
  if (techLower.includes('python'))
    return (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" 
        alt="Python" 
        style={style}
        className={`${className}`}
      />
    );
  
  // Java
  if (techLower.includes('java'))
    return (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" 
        alt="Java" 
        style={style}
        className={`${className}`}
      />
    );
  
  // jQuery
  if (techLower.includes('jquery'))
    return (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original.svg" 
        alt="jQuery" 
        style={style}
        className={`${className}`}
      />
    );
  
  // Bootstrap
  if (techLower.includes('bootstrap'))
    return (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" 
        alt="Bootstrap" 
        style={style}
        className={`${className}`}
      />
    );
  
  // Chart.js
  if (techLower.includes('chart.js') || techLower.includes('chartjs'))
    return (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chartjs/chartjs-original.svg" 
        alt="Chart.js" 
        style={style}
        className={`${className}`}
      />
    );
  
  // Git
  if (techLower.includes('git'))
    return (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" 
        alt="Git" 
        style={style}
        className={`${className}`}
      />
    );
  
  // GitHub
  if (techLower.includes('github'))
    return (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" 
        alt="GitHub" 
        style={style}
        className={`${className}`}
      />
    );
  
  // React - Added this
  if (techLower.includes('react'))
    return (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" 
        alt="React" 
        style={style}
        className={`${className}`}
      />
    );
  
  // TypeScript - Added this
  if (techLower.includes('typescript') || techLower.includes('ts'))
    return (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" 
        alt="TypeScript" 
        style={style}
        className={`${className}`}
      />
    );
  
  // Tailwind CSS - Added this
  if (techLower.includes('tailwind'))
    return (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" 
        alt="Tailwind CSS" 
        style={style}
        className={`${className}`}
      />
    );
  
  // ARIMA - Custom emoji
  if (techLower.includes('arima'))
    return (
      <div className={`flex items-center justify-center ${className}`} style={style}>
        <span className="text-lg">📈</span>
      </div>
    );
  
  // API - Custom emoji
  if (techLower.includes('api'))
    return (
      <div className={`flex items-center justify-center ${className}`} style={style}>
        <span className="text-lg">🔌</span>
      </div>
    );
  
  // System Integration - Custom emoji
  if (techLower.includes('system') || techLower.includes('integration'))
    return (
      <div className={`flex items-center justify-center ${className}`} style={style}>
        <span className="text-lg">🔗</span>
      </div>
    );
  
  // Real-time - Custom emoji
  if (techLower.includes('real-time') || techLower.includes('realtime'))
    return (
      <div className={`flex items-center justify-center ${className}`} style={style}>
        <span className="text-lg">⚡</span>
      </div>
    );
  
  // Database - Custom emoji
  if (techLower.includes('database') || techLower.includes('db'))
    return (
      <div className={`flex items-center justify-center ${className}`} style={style}>
        <span className="text-lg">🗄️</span>
      </div>
    );
  
  // REST API - Custom emoji
  if (techLower.includes('rest'))
    return (
      <div className={`flex items-center justify-center ${className}`} style={style}>
        <span className="text-lg">🌐</span>
      </div>
    );
  
  // Analytics - Custom emoji
  if (techLower.includes('analytics') || techLower.includes('analysis'))
    return (
      <div className={`flex items-center justify-center ${className}`} style={style}>
        <span className="text-lg">📊</span>
      </div>
    );
  
  // Forecasting - Custom emoji
  if (techLower.includes('forecast'))
    return (
      <div className={`flex items-center justify-center ${className}`} style={style}>
        <span className="text-lg">🔮</span>
      </div>
    );
  
  // Default programming icon (theme-aware)
  return (
    <div
      className={`flex items-center justify-center rounded-full ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"
      } ${className}`}
      style={style}
    >
      <span className="text-lg">💻</span>
    </div>
  );
};

export default CodeIcon;