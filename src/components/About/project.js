import React from 'react';

// Reusable Project Item Component
const ProjectItem = ({ project, index }) => {
  return (
    <div className="w-full border-b-2 border-solid border-dark dark:border-light p-5 xs:p-10 sm:p-12 md:p-16 lg:p-20 text-dark dark:text-light">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
        {/* Left side - Project Info */}
        <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
          <h3 className="font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl capitalize mb-4">
            {project.title}
          </h3>
          <p className="font-medium text-base xs:text-lg leading-relaxed mb-6">
            {project.description}
          </p>
          
          {/* Tech Stack */}
          <div className="mb-6">
            <h4 className="font-semibold text-lg mb-3 text-accent dark:text-accentDark">
              Technologies Used:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <span 
                  key={techIndex}
                  className="px-3 py-1 text-sm border border-dark dark:border-light rounded hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark transition-all duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold border-2 border-solid border-dark dark:border-light px-4 py-2 rounded hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark transition-all duration-200"
              >
                View on GitHub
              </a>
            )}
            {project.liveUrl && (
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold bg-dark dark:bg-light text-light dark:text-dark px-4 py-2 rounded hover:bg-gray-700 dark:hover:bg-gray-200 transition-all duration-200"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
        
        {/* Right side - Project Images */}
        <div className="lg:w-1/2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.images.map((image, imageIndex) => (
              <div 
                key={imageIndex}
                className="relative group border-2 border-dark dark:border-light rounded overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src={image} 
                  alt={`${project.title} screenshot ${imageIndex + 1}`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">
                    View Image
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Project Number */}
      <div className="flex justify-end mt-8">
        <span className="font-bold text-6xl xs:text-7xl sm:text-8xl text-gray-200 dark:text-gray-800">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const projects = [
    {
      title: "Project Elgorithm",
      description: "CodePlayground Learn coding with virtual electronics! An interactive platform where users control virtual components like NeoPixels, LEDs, and servos using block-based programming (Blockly). Features include a real-time playground, Blockly code generation, and a set of fun challenges to teach coding and hardware concepts — all in the browser.",
      technologies: ["JavaScript", "Blockly", "Web APIs", "Virtual Electronics", "Educational Platform"],
      images: [
        "/images/projects/elgo 1.png",
        "/images/projects/elgo 2.png",
        "/images/projects/elgo 3.png",
        "/images/projects/elgo 4.png",
      ],
      githubUrl: "https://github.com/RiteshF7",
      liveUrl: null
    },
    {
      title: "Project Procode",
      description: "Empowering Creativity with Custom Microcontrollers! A revolutionary self-made microcontroller powered by the ESP8266 chipset, integrated seamlessly with custom USB ports. Pairs perfectly with the Elgorithm platform, enabling users to control hardware components using Blockly and MicroPython.",
      technologies: ["ESP8266", "MicroPython", "Hardware Design", "Blockly", "Arduino IDE", "Custom PCB"],
      images: [
        "/images/projects/procode 1.png",
        "/images/projects/procode 2.jpg",
      ],
      githubUrl: "https://github.com/RiteshF7",
      liveUrl: null
    },
    {
      title: "Android Boilerplate Wizard",
      description: "SimpleSample is a comprehensive Android boilerplate repository designed to eliminate the repetitive setup process when starting new Android projects. Developers can simply merge feature branches to quickly add commonly used functionalities like dependency injection, networking, database integration, and more.",
      technologies: ["Android", "Kotlin", "Gradle", "Architecture Components", "Dependency Injection", "Room Database"],
      images: [
        "/images/projects/boilerplatebanner.png",
      ],
      githubUrl: "https://github.com/RiteshF7",
      liveUrl: null
    },
    {
      title: "G-Code Automation",
      description: "This project automates batch 3D printing by generating dynamic G-code files and controlling OctoPrint-enabled printers via REST API. It supports configurable repeat printing, Z-axis offsets, and custom temperature settings for high-volume production.",
      technologies: ["Python", "G-Code", "OctoPrint API", "3D Printing", "REST APIs", "Automation"],
      images: [
        "/images/projects/gcodebanner.png",
        "/images/projects/gcodeone.png",
        "/images/projects/gcodetwo.png",
      ],
      githubUrl: "https://github.com/RiteshF7",
      liveUrl: null
    }
  ];

  return (
    <section className="w-full">
      {/* Section Header */}
      <div className="w-full p-5 xs:p-10 sm:p-12 md:p-16 lg:p-20 border-b-2 border-solid border-dark dark:border-light text-dark dark:text-light">
        <h2 className="font-bold text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl capitalize">
          Featured Projects
        </h2>
        <p className="font-medium text-lg xs:text-xl sm:text-2xl mt-4 text-gray-600 dark:text-gray-400">
          A showcase of my technical expertise and innovative solutions across various domains.
        </p>
      </div>
      
      {/* Project Items */}
      {projects.map((project, index) => (
        <ProjectItem 
          key={index} 
          project={project} 
          index={index} 
        />
      ))}
    </section>
  );
};

export default ProjectsSection;