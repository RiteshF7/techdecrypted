import React from 'react';

const ExperienceItem = ({ experience, index }) => {
  return (
    <div className="w-full border-b-2 border-solid border-dark dark:border-light p-5 xs:p-10 sm:p-12 md:p-16 lg:p-20 text-dark dark:text-light">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
        {/* Left side - Company and Role */}
        <div className="md:w-1/3 mb-6 md:mb-0">
          <h3 className="font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl capitalize mb-2">
            {experience.company}
          </h3>
          <h4 className="font-semibold text-lg xs:text-xl sm:text-2xl text-accent dark:text-accentDark mb-2">
            {experience.role}
          </h4>
          <span className="font-medium text-base xs:text-lg text-gray-600 dark:text-gray-400">
            {experience.duration}
          </span>
        </div>
        
        {/* Right side - Highlights */}
        <div className="md:w-2/3 md:pl-8">
          <ul className="space-y-3">
            {experience.highlights.map((highlight, highlightIndex) => (
              <li
                key={highlightIndex}
                className="font-medium text-base xs:text-lg leading-relaxed border-l-4 border-accent dark:border-accentDark pl-4 hover:border-l-8 transition-all duration-300"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Experience Number */}
      <div className="flex justify-end mt-6">
        <span className="font-bold text-6xl xs:text-7xl sm:text-8xl text-gray-200 dark:text-gray-800">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

export default ExperienceItem;