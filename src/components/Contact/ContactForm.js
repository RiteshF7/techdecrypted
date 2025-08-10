"use client"
import React from 'react';

const ContactSection = () => {
  const contactMethods = [
    {
      label: "Email",
      value: "iamritesh.dev@gmail.com",
      href: "mailto:iamritesh.dev@gmail.com",
      icon: "📧"
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/riteshf1",
      href: "https://www.linkedin.com/in/riteshf1",
      icon: "💼"
    },
    {
      label: "GitHub", 
      value: "github.com/RiteshF7",
      href: "https://github.com/RiteshF7",
      icon: "🔗"
    },
    {
      label: "Resume",
      value: "Download Resume",
      href: "https://raw.githubusercontent.com/RiteshF7/riteshportfolio/master/ritesh_resume_2025.pdf",
      icon: "📄",
      download: true
    }
  ];

  const handleContactClick = (contact) => {
    if (contact.download) {
      const link = document.createElement('a');
      link.href = contact.href;
      link.download = 'Ritesh_Singh_Resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(contact.href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="w-full ">
             
      {/* Section Header */}
      <div className="w-full p-5 mb-24 xs:p-10 sm:p-12 md:p-16 lg:p-20 border-b-2 border-solid border-dark dark:border-light text-white">
        <h2 className="font-bold text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl capitalize">
        Get In Touch
        </h2>
        <p className="font-medium text-lg xs:text-xl sm:text-2xl mt-4 text-gray-300">
        Feel free to reach out to me via any of the listed mediums. I&apos;m always open to discussing new opportunities,
        collaborations, or just having a chat about technology and innovation.
        </p>
      </div>
             
      {/* Contact Methods */}
      <div className="grid grid-cols-1 mb-24 ml-10 mr-10 md:grid-cols-2 gap-8">
        {contactMethods.map((contact, index) => (
          <div 
            key={index}
            onClick={() => handleContactClick(contact)}
            className="group relative overflow-hidden border-2 border-solid border-white rounded-xl p-8 text-white hover:bg-white hover:text-dark transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-transparent to-white/5 backdrop-blur-sm"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-md group-hover:bg-white/40 transition-all duration-300"></div>
                  <span className="relative text-3xl p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300 block">
                    {contact.icon}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-xl xs:text-2xl sm:text-3xl mb-1 group-hover:text-gray-800 transition-colors duration-300">
                    {contact.label}
                  </h3>
                  <p className="font-medium text-base xs:text-lg text-gray-300 group-hover:text-gray-600 transition-colors duration-300">
                    {contact.value}
                  </p>
                </div>
              </div>
              <div className="relative">
                <span className="text-2xl group-hover:translate-x-3 group-hover:scale-110 transition-all duration-300 bg-white/10 group-hover:bg-white/20 p-3 rounded-full block">
                  →
                </span>
                {/* Pulsing dot indicator */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse group-hover:bg-green-500"></div>
              </div>
            </div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
          </div>
        ))}
      </div>
      </section>
  );
};

export default ContactSection;