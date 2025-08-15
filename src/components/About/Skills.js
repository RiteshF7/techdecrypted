import React from 'react';

const SkillList = [
  "Kotlin",
  "Java", 
  "Android Development",
  "Flutter",
  "JavaScript",
  "Docker",
  "AWS",
  "Firebase",
  "Gradle",
  "Jenkins",
  "Git",
  "REST APIs",
  "MVVM Architecture",
  "Jetpack Compose",
  "Coroutines & Flow",
  "SDK Development",
  "Arduino",
  "ESP8266",
  "3D Printing",
  "G-Code",
  "FCM",
  "Socket Programming",
  "CI/CD"
];

const Skills = () => {
  return (
    <section className="w-full flex flex-col p-5 xs:p-10 sm:p-12 md:p-16 lg:p-20 border-b-2 border-solid border-dark dark:border-light text-dark dark:text-light">
      <span className="font-semibold text-lg sm:text-3xl md:text-4xl text-accent dark:text-accentDark">
        I&apos;m comfortable in...
      </span>
      <ul className="flex flex-wrap mt-8 justify-center xs:justify-start">
        {SkillList.map((item, index) => {
          return (
            <button 
            key={index}
          className="mt-6 mr-6 bg-dark dark:bg-light text-light dark:text-dark px-6 py-3 rounded font-medium hover:bg-gray-700 dark:hover:bg-gray-200 transition-all duration-300"
        >
          {item}
        </button>
          );
        })}
      </ul>
    </section>
  );
};

export default Skills;