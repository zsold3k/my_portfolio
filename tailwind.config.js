/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Add this for class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'blob': 'blob 7s infinite',
        'float': 'float 3s ease-in-out infinite',
        'scroll-reveal': 'scrollReveal 0.8s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'scale-up': 'scaleUp 0.6s ease-out',
        'typing': 'typing 3s steps(40, end)',
        'gradient-shift': 'gradientShift 3s ease infinite',
        'scroll-fade': 'scrollFade 1s ease-out',
        'scroll-slide': 'scrollSlide 1s ease-out',
        'theme-toggle': 'themeToggle 0.5s ease-in-out',
      },
      keyframes: {
        blob: {
          '0%, 100%': { 
            transform: 'translate(0px, 0px) scale(1)' 
          },
          '33%': { 
            transform: 'translate(30px, -50px) scale(1.1)' 
          },
          '66%': { 
            transform: 'translate(-20px, 20px) scale(0.9)' 
          },
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0) rotate(0deg)' 
          },
          '50%': { 
            transform: 'translateY(-20px) rotate(5deg)' 
          },
        },
        scrollReveal: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(30px) scale(0.95)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0) scale(1)' 
          },
        },
        slideInLeft: {
          '0%': { 
            opacity: '0', 
            transform: 'translateX(-50px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateX(0)' 
          },
        },
        slideInRight: {
          '0%': { 
            opacity: '0', 
            transform: 'translateX(50px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateX(0)' 
          },
        },
        fadeIn: {
          '0%': { 
            opacity: '0' 
          },
          '100%': { 
            opacity: '1' 
          },
        },
        scaleUp: {
          '0%': { 
            opacity: '0', 
            transform: 'scale(0.8)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'scale(1)' 
          },
        },
        typing: {
          'from': { 
            width: '0' 
          },
          'to': { 
            width: '100%' 
          },
        },
        gradientShift: {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          },
        },
        scrollFade: {
          '0%': { 
            opacity: '0', 
            filter: 'blur(10px)' 
          },
          '100%': { 
            opacity: '1', 
            filter: 'blur(0px)' 
          },
        },
        scrollSlide: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(100px) rotate(10deg)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0) rotate(0deg)' 
          },
        },
        themeToggle: {
          '0%': { 
            transform: 'scale(1) rotate(0deg)' 
          },
          '50%': { 
            transform: 'scale(1.2) rotate(180deg)' 
          },
          '100%': { 
            transform: 'scale(1) rotate(360deg)' 
          },
        },
      },
      animationDelay: {
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '1000': '1000ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },
      animationDuration: {
        'slow': '3s',
        'slower': '5s',
        'slowest': '7s',
      },
      backgroundSize: {
        'gradient-shift': '200% 200%',
      },
      backdropBlur: {
        'xs': '2px',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
        '105': '1.05',
      },
      // Custom colors for gradients
      colors: {
        'glass': 'rgba(255, 255, 255, 0.1)',
        'glass-dark': 'rgba(0, 0, 0, 0.3)',
        // Theme-aware colors
        'theme-bg': {
          light: 'rgb(249 250 251)', // gray-50
          dark: 'rgb(0 0 0)', // black
        },
        'theme-text': {
          light: 'rgb(17 24 39)', // gray-900
          dark: 'rgb(255 255 255)', // white
        },
        'theme-muted': {
          light: 'rgb(75 85 99)', // gray-600
          dark: 'rgb(156 163 175)', // gray-400
        },
        'theme-border': {
          light: 'rgb(229 231 235)', // gray-200
          dark: 'rgb(31 41 55)', // gray-800
        },
        'theme-card': {
          light: 'rgba(255, 255, 255, 0.8)',
          dark: 'rgba(17, 24, 39, 0.8)',
        },
      },
      // Theme-aware background colors
      backgroundColor: {
        'theme': {
          light: 'rgb(249 250 251)', // gray-50
          dark: 'rgb(0 0 0)', // black
        },
        'theme-card': {
          light: 'rgb(255 255 255 / 0.8)',
          dark: 'rgb(17 24 39 / 0.8)',
        },
        'theme-header': {
          light: 'rgb(255 255 255 / 0.95)',
          dark: 'rgb(0 0 0 / 0.95)',
        },
      },
      // Theme-aware text colors
      textColor: {
        'theme': {
          light: 'rgb(17 24 39)', // gray-900
          dark: 'rgb(255 255 255)', // white
        },
        'theme-muted': {
          light: 'rgb(75 85 99)', // gray-600
          dark: 'rgb(156 163 175)', // gray-400
        },
      },
      // Theme-aware border colors
      borderColor: {
        'theme': {
          light: 'rgb(229 231 235)', // gray-200
          dark: 'rgb(31 41 55)', // gray-800
        },
        'theme-light': {
          light: 'rgb(243 244 246)', // gray-100
          dark: 'rgb(55 65 81)', // gray-700
        },
      },
      // Theme-aware gradients
      gradientColorStops: {
        'theme': {
          light: {
            from: 'rgb(17 24 39)', // gray-900
            to: 'rgb(75 85 99)', // gray-600
          },
          dark: {
            from: 'rgb(255 255 255)', // white
            to: 'rgb(156 163 175)', // gray-400
          },
        },
      },
    },
  },
  plugins: [],
}