// data/data.ts

// Types
export type User = {
    id: string;
    name: string;
    email: string;
    title: string;
    location: string;
    github: string;
    profileImage: string;
  }
  
  export type Project = {
    id: string;
    title: string;
    description: string;
    tech: string[];
    link?: string;
    category: "academic" | "work";
    image: string;
    details: string[];
  }
  
  export type Skill = {
    id: string;
    name: string;
    level: number;
    category: string;
    icon: string;
  }
  
  export type Experience = {
    id: string;
    position: string;
    company: string;
    duration: string;
    responsibilities: string[];
    logo: string;
  }
  
  export type Testimonial = {
    id: string;
    name: string;
    role: string;
    text: string;
    avatar: string;
  }
  
  // Main user data
  export const IRUMI_USER: User = {
    id: "1",
    name: "Irumi Zsoldek B. Reyes",
    email: "irumireyes02@gmail.com",
    title: "Full Stack Developer",
    location: "Pasig City, Philippines",
    github: "https://github.com/zsold3k",
    profileImage: "/images/profile.JPG", // Ilagay ang image sa public/images/ folder
  };
  
  // Other users (if needed for other purposes)
  export const DEFAULT_USERS: User[] = [
    IRUMI_USER,
    {
      id: "2",
      name: "Mack",
      email: "mack01@gmail.com",
      title: "Developer",
      location: "Unknown",
      github: "",
      profileImage: "",
    },
    {
      id: "3",
      name: "Richard",
      email: "richard01@gmail.com",
      title: "Developer",
      location: "Unknown",
      github: "",
      
      profileImage: "",
    },
  ];
  
  export const SKILLS: Skill[] = [
    // Technical Skills
    { id: "1", name: "PHP", level: 90, category: "Web Development", icon: "code" },
    { id: "2", name: "HTML/CSS", level: 95, category: "Web Development", icon: "code" },
    { id: "3", name: "JavaScript", level: 85, category: "Web Development", icon: "code" },
    { id: "4", name: "React.js", level: 80, category: "Frontend", icon: "code" },
    { id: "5", name: "MySQL", level: 88, category: "Database", icon: "database" },
    { id: "6", name: "Python", level: 80, category: "Programming", icon: "code" },
    { id: "7", name: "Java", level: 75, category: "Programming", icon: "code" },
    { id: "8", name: "Git/GitHub", level: 85, category: "Tools", icon: "git" },
    { id: "9", name: "UI/UX Design", level: 82, category: "Design", icon: "palette" },
    { id: "10", name: "ARIMA Modeling", level: 78, category: "Analytics", icon: "trending" },
    { id: "11", name: "System Integration", level: 85, category: "Development", icon: "globe" },
    { id: "12", name: "Debugging", level: 90, category: "Problem Solving", icon: "search" },
    { id: "13", name: "Troubleshooting", level: 88, category: "Problem Solving", icon: "wrench" },
    
    // Soft Skills (added from your list)
    { id: "14", name: "Communication Skills", level: 90, category: "Soft Skills", icon: "message-circle" },
    { id: "15", name: "Team Work", level: 92, category: "Soft Skills", icon: "users" },
    { id: "16", name: "Adaptability", level: 88, category: "Soft Skills", icon: "refresh-cw" },
    { id: "17", name: "Time Management", level: 85, category: "Soft Skills", icon: "clock" },
    { id: "18", name: "Attentive Listening", level: 87, category: "Soft Skills", icon: "headphones" },
    { id: "19", name: "Perseverance", level: 95, category: "Soft Skills", icon: "target" },
    { id: "20", name: "Hard Working", level: 94, category: "Soft Skills", icon: "activity" },
  ];
  
  export const PROJECTS: Project[] = [
    {
      id: "1",
      title: "Inventory Management System with ARIMA Forecasting",
      description: "Capstone project with real-time stock tracking and ARIMA-based forecasting that transformed inventory management.",
      tech: ["PHP", "MySQL", "JavaScript", "ARIMA Models", "HTML5/CSS3", "Chart.js"],
      link: "#",
      category: "academic",
      image: "/images/projects/inventory-system.jpg", // Add actual image path
      details: [
        "Real-time inventory tracking with automatic raw material deduction",
        "ARIMA-based time-series forecasting for sales prediction with 95% accuracy",
        "Interactive dashboard with advanced analytics and visualizations",
        "Sales management module with exportable PDF/Excel reports",
        "Multi-user role system with granular permissions"
      ]
    },
    {
      id: "2",
      title: "Warehouse Management System (WMS)",
      description: "Enterprise-grade WMS platform for BidaBoss Inc. that centralizes warehouse operations.",
      tech: ["PHP", "MySQL", "JavaScript", "REST API", "Bootstrap", "jQuery"],
      link: "#",
      category: "work",
      image: "/images/projects/wms.jpg", // Add actual image path
      details: [
        "Real-time inventory tracking and stock movement monitoring",
        "Integration with corporate account systems for seamless operations",
        "Third-party API integration for logistics and shipping providers",
        "User-friendly responsive interface with mobile support",
        "Automated report generation and email notifications"
      ]
    },
    {
      id: "3",
      title: "Point of Sale (POS) System",
      description: "Modern web-based POS system with real-time data synchronization across devices.",
      tech: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3"],
      link: "#",
      category: "work",
      image: "/images/projects/pos-system.jpg", // Add actual image path
      details: [
        "Real-time transaction recording with instant database updates",
        "Product management with categories, variants, and barcode support",
        "Sales reporting and analytics with trend visualization",
        "Integration with WMS for automatic inventory synchronization",
        "Offline mode with data sync capability"
      ]
    },
    {
      id: "4",
      title: "Corporate Account System",
      description: "Multi-tenant system for partner businesses with integrated WMS functionality.",
      tech: ["PHP", "MySQL", "JavaScript", "REST API", "Bootstrap", "jQuery"],
      link: "#",
      category: "work",
      image: "/images/projects/corporate-system.jpg", // Add actual image path
      details: [
        "Multi-tenant architecture supporting 25+ partner companies",
        "Seamless coordination with main warehouse inventory system",
        "Transaction monitoring and real-time reporting dashboard",
        "Customizable interface and settings for each partner",
        "Secure authentication with role-based access control"
      ]
    }
  ];
  
  export const EXPERIENCES: Experience[] = [
    {
      id: "1",
      position: "Junior Web Developer",
      company: "BidaBoss Inc.",
      duration: "May – November 2025",
      logo: "/images/companies/bidaboss.jpg", // Add actual logo path
      responsibilities: [
        "Designed and developed Web-Based WMS",
        "Developed Web-Based POS system",
        "Built Corporate Account System for partner businesses",
        "Implemented UI/UX development"
      ]
    },
    {
      id: "2",
      position: "Web Developer Intern",
      company: "BidaBoss Inc.",
      duration: "February – May 2025",
      logo: "/images/companies/bidaboss.jpg", // Add actual logo path
      responsibilities: [
        "Assisted in development of warehouse management systems",
        "Collaborated with team to enhance system performance",
        "Contributed to real-time solutions",
        "Participated in system testing and debugging"
      ]
    }
  ];
  
  export const TESTIMONIALS: Testimonial[] = [
    {
      id: "1",
      name: "Alex Johnson",
      role: "CTO at BidaBoss Inc.",
      text: "Irumi demonstrated exceptional skill in developing complex systems. His work on our WMS was instrumental in improving our operational efficiency by 40%.",
      avatar: "/images/testimonials/alex.jpg" // Add actual avatar path
    },
    {
      id: "2",
      name: "Maria Santos",
      role: "Project Manager",
      text: "The ARIMA forecasting system developed by Irumi helped us reduce waste by 30% through accurate sales predictions. Outstanding work!",
      avatar: "/images/testimonials/maria.jpg" // Add actual avatar path
    },
    {
      id: "3",
      name: "Dr. Roberto Cruz",
      role: "Professor, PLP",
      text: "One of the most promising students I've taught. His capstone project showed deep understanding of both theoretical concepts and practical implementation.",
      avatar: "/images/testimonials/roberto.jpg" // Add actual avatar path
    }
  ];
  
  // Export default para sa main user
  export default IRUMI_USER;
  
  // Or pwede ring gumawa ng object na naglalaman ng lahat
  export const portfolioData = {
    user: IRUMI_USER,
    skills: SKILLS,
    projects: PROJECTS,
    experiences: EXPERIENCES,
    testimonials: TESTIMONIALS,
    users: DEFAULT_USERS,
  };