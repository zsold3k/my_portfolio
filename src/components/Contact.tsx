import React, { useState } from 'react';
import { Mail, Phone, Github, Rocket, CheckCircle } from 'lucide-react';
import type { User } from '../data/data';

interface ContactProps {
  irumiUser: User;
  scrollY?: number;
  theme?: "light" | "dark"; // Added theme prop
}

const Contact: React.FC<ContactProps> = ({ irumiUser, scrollY = 0, theme = "dark" }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Animation calculations based on scroll
  const sectionStart = 3000;
  const isVisible = scrollY > sectionStart;
  const progress = Math.max(0, Math.min(1, (scrollY - sectionStart) / 300));

  // Theme-based colors
  const gradientFrom = theme === "dark" ? "from-white" : "from-gray-900";
  const gradientTo = theme === "dark" ? "to-gray-400" : "to-gray-600";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const mutedTextColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const cardBg = theme === "dark" ? "bg-black/50" : "bg-white/50";
  const inputBg = theme === "dark" ? "bg-black/30" : "bg-white/30";
  const borderColor = theme === "dark" ? "border-gray-800" : "border-gray-300";
  const hoverBorderColor = theme === "dark" ? "hover:border-gray-600" : "hover:border-gray-500";
  const buttonGradient = theme === "dark" ? "from-white to-gray-300" : "from-gray-400 to-gray-200";
  const buttonText = theme === "dark" ? "text-black" : "text-white";
  const socialBg = theme === "dark" ? "bg-black" : "bg-white";
  const socialBorder = theme === "dark" ? "border-gray-800" : "border-gray-300";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div 
        className={`absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r ${
          theme === "dark" ? "from-white/5 to-gray-500/5" : "from-gray-900/5 to-gray-600/5"
        } rounded-full blur-3xl`}
        style={{
          transform: `translateY(${Math.sin(scrollY * 0.003) * 80}px) rotate(${scrollY * 0.02}deg)`,
          opacity: 0.1 + Math.sin(scrollY * 0.001) * 0.1,
        }}
      />
      <div 
        className={`absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r ${
          theme === "dark" ? "from-gray-400/5 to-gray-600/5" : "from-gray-300/5 to-gray-500/5"
        } rounded-full blur-3xl`}
        style={{
          transform: `translateY(${Math.cos(scrollY * 0.004) * 60}px) rotate(${scrollY * 0.015}deg)`,
          opacity: 0.1 + Math.cos(scrollY * 0.001) * 0.1,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
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
                Get In Touch
              </span>
            </h2>
            <p 
              className={`text-xl ${mutedTextColor} mb-8`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `translateY(${isVisible ? 0 : 20}px)`,
                transition: 'all 0.8s ease-out 0.2s'
              }}
            >
              Have a project in mind? Let's create something amazing together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div 
                className="space-y-6"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: `translateX(${isVisible ? 0 : -50}px)`,
                  transition: 'all 0.8s ease-out 0.3s'
                }}
              >
                <div className={`flex items-center p-6 rounded-2xl backdrop-blur-lg ${cardBg} border ${borderColor} ${hoverBorderColor} transition-all duration-300 group`}>
                  <div 
                    className={`w-14 h-14 rounded-lg bg-gradient-to-r ${buttonGradient} flex items-center justify-center mr-6 transition-all duration-300`}
                    style={{
                      transform: isVisible ? 'scale(1)' : 'scale(0.8)',
                      transitionDelay: '0.4s'
                    }}
                  >
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className={`text-sm ${mutedTextColor}`}>Email</div>
                    <div className={`text-xl font-bold ${textColor}`}>{irumiUser.email}</div>
                  </div>
                </div>
                
                <div 
                  className={`flex items-center p-6 rounded-2xl backdrop-blur-lg ${cardBg} border ${borderColor} ${hoverBorderColor} transition-all duration-300 group`}
                  style={{
                    transform: `translateX(${isVisible ? 0 : -30}px)`,
                    transition: 'all 0.8s ease-out 0.5s'
                  }}
                >
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${buttonGradient} flex items-center justify-center mr-6 group-hover:scale-110 transition-transform`}>
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className={`text-sm ${mutedTextColor}`}>Phone</div>
                    <div className={`text-xl font-bold ${textColor}`}>+63 993 185 5908</div>
                  </div>
                </div>
              </div>
              
              <div 
                className="flex space-x-4 mt-8"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: `translateX(${isVisible ? 0 : -40}px)`,
                  transition: 'all 0.8s ease-out 0.6s'
                }}
              >
                {[
                  { Icon: Github, href: irumiUser.github, label: "GitHub" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-14 h-14 rounded-full ${socialBg} border ${socialBorder} flex items-center justify-center transition-all duration-300 hover:scale-110 ${hoverBorderColor} hover:shadow-xl group relative`}
                    style={{
                      transform: `scale(${isVisible ? 1 : 0.8})`,
                      transitionDelay: `${0.7 + index * 0.1}s`
                    }}
                    aria-label={social.label}
                  >
                    <social.Icon className={`w-6 h-6 ${theme === "dark" ? "text-white" : "text-gray-800"} group-hover:scale-125 transition-transform`} />
                    <div className={`absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity ${
                      theme === "dark" ? "bg-black/80" : "bg-white/80"
                    } px-2 py-1 rounded text-xs whitespace-nowrap ${textColor}`}>
                      {social.label}
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <div 
              className={`p-8 rounded-3xl backdrop-blur-lg ${cardBg} border ${borderColor}`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `translateX(${isVisible ? 0 : 50}px) scale(${isVisible ? 1 : 0.95})`,
                transition: 'all 0.8s ease-out 0.4s'
              }}
            >
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
                  <h3 className={`text-2xl font-bold ${textColor} mb-2`}>Message Sent!</h3>
                  <p className={mutedTextColor}>Thank you for your message. I'll get back to you soon!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div 
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: `translateY(${isVisible ? 0 : 20}px)`,
                        transition: 'all 0.5s ease-out 0.5s'
                      }}
                    >
                      <label className={`block text-sm font-medium mb-2 ${textColor}`}>First Name</label>
                      <input 
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg ${inputBg} border ${borderColor} ${textColor} focus:border-current focus:ring-2 focus:ring-current/20 outline-none transition-all duration-300`}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div 
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: `translateY(${isVisible ? 0 : 20}px)`,
                        transition: 'all 0.5s ease-out 0.6s'
                      }}
                    >
                      <label className={`block text-sm font-medium mb-2 ${textColor}`}>Last Name</label>
                      <input 
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg ${inputBg} border ${borderColor} ${textColor} focus:border-current focus:ring-2 focus:ring-current/20 outline-none transition-all duration-300`}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  
                  <div 
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: `translateY(${isVisible ? 0 : 20}px)`,
                      transition: 'all 0.5s ease-out 0.7s'
                    }}
                  >
                    <label className={`block text-sm font-medium mb-2 ${textColor}`}>Email</label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg ${inputBg} border ${borderColor} ${textColor} focus:border-current focus:ring-2 focus:ring-current/20 outline-none transition-all duration-300`}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div 
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: `translateY(${isVisible ? 0 : 20}px)`,
                      transition: 'all 0.5s ease-out 0.8s'
                    }}
                  >
                    <label className={`block text-sm font-medium mb-2 ${textColor}`}>Message</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-lg ${inputBg} border ${borderColor} ${textColor} focus:border-current focus:ring-2 focus:ring-current/20 outline-none transition-all duration-300 resize-none`}
                      placeholder="Your message here..."
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 bg-gradient-to-r ${buttonGradient} ${buttonText} rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed`}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: `translateY(${isVisible ? 0 : 20}px)`,
                      transition: 'all 0.5s ease-out 0.9s'
                    }}
                  >
                    {isLoading ? (
                      <>
                        <div className={`w-5 h-5 border-2 ${
                          theme === "dark" ? "border-black" : "border-white"
                        } border-t-transparent rounded-full animate-spin mr-2`}></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Rocket className="ml-2 group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator for contact section */}
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

export default Contact;