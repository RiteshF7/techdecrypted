import React from 'react';
import Image from 'next/image';


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
                <Image
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

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('projects').select('*');
      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects(data);
      }
    };

    fetchProjects();
  }, [supabase]);

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