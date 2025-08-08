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
    <section className="w-full flex flex-col p-5 xs:p-10 sm:p-12 md:p-16 lg:p-20 border-b-2 border-solid border-dark dark:border-light text-dark dark:text-light">
      {/* Section Header */}
      <div className="mb-12">
        <h2 className="font-bold text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl capitalize mb-6">
          Get In Touch
        </h2>
        <p className="font-medium text-lg xs:text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl">
          Feel free to reach out to me via any of the listed mediums. I'm always open to discussing new opportunities, 
          collaborations, or just having a chat about technology and innovation.
        </p>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contactMethods.map((contact, index) => (
          <div 
            key={index}
            onClick={() => handleContactClick(contact)}
            className="group border-2 border-solid border-dark dark:border-light rounded-lg p-6 hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{contact.icon}</span>
                <div>
                  <h3 className="font-semibold text-lg xs:text-xl sm:text-2xl">
                    {contact.label}
                  </h3>
                  <p className="font-medium text-base xs:text-lg text-gray-600 dark:text-gray-400 group-hover:text-gray-300 dark:group-hover:text-gray-600">
                    {contact.value}
                  </p>
                </div>
              </div>
              <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">
                →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Message */}
      <div className="mt-16 text-center">
        <p className="font-medium text-lg xs:text-xl text-gray-600 dark:text-gray-400">
          "I believe great things happen when passionate people collaborate. Let's build something amazing together!"
        </p>
        <div className="mt-6">
          <span className="font-bold text-xl xs:text-2xl">
            - Ritesh Singh
          </span>
        </div>
      </div>

      {/* Alternative Contact Info */}
      <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="mb-4 sm:mb-0">
            <h4 className="font-semibold text-lg mb-2">
              Preferred Contact Methods:
            </h4>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Email for detailed discussions • LinkedIn for professional networking
            </p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-500">
            <p>Response time: Usually within 24 hours</p>
            <p>Available: Monday - Friday, 9 AM - 6 PM IST</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;