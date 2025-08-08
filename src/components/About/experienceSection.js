import React from 'react';

// Reusable Experience Item Component
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

const ExperienceSection = () => {
  const experiences = [
    {
      company: "EMI Shield",
      role: "Co-Founder & Lead Developer",
      duration: "JAN 23 - Present",
      highlights: [
        "Founded EMI Shield and architected a remote-locking SDK enforcing EMI compliance across Android devices",
        "Integrated FCM for secure real-time user control; registered 90K+ devices/month with wide Android compatibility",
        "Partnered with 18+ merchants, generating ₹10L+ monthly revenue via freemium-to-subscription model",
        "Engineered multi-modular architecture with parallel Gradle builds; reduced build time by 40%",
        "Implemented Communication SDK with persistent FCM and SMS fallback; 90%+ remote command delivery rate",
        "Built Location SDK with optimized battery algorithms powering 90K+ active devices/month",
        "Developed Auto-Deploy Gradle plugin enabling real-time remote app installation across thousands of devices",
        "Designed reusable REST SDK with coroutines, Flow, and MVI for high-velocity modular development",
        "Integrated Ktor server for secure device-dashboard communication; onboarded 18+ vendors with ₹10L+ MRR"
      ]
    },
    {
      company: "Cashify.in",
      role: "SDE-2",
      duration: "MAY 21 - AUG 22",
      highlights: [
        "Built Scratch Detection SDK for analyzing screen/panel scratches on pre-owned devices using dual-phone coordination and QR code pairing",
        "Designed custom camera workflow for high-resolution, clutter-free panel image capture suitable for ML training",
        "Optimized camera framing and focus using pixel ratios, focal length, and perspective correction for precise bounding box detection",
        "Accelerated image pipeline with Kotlin coroutines and Flow; achieved 75% latency reduction and high-fidelity outputs",
        "Reduced APK size by 60% via ProGuard, asset pruning, and WebP usage; improved CI/CD efficiency and build times by 35–40%",
        "Developed scalable socket infrastructure for asynchronous communication and telemetry sync during inspections",
        "Implemented Secure Wipe Algorithm with configurable multi-pass data erasure and randomized overwrite patterns; achieved 40% faster wipe throughput",
        "Built Dynamic Translation SDK allowing runtime language switching and remote updates via getString() override; avoided Play Store redeployments",
        "Developed Device Quality Assessment SDK for automated diagnostics of SIM, WiFi, speaker, mic, and display using native Android services; enabled telemetry-based dynamic pricing"
      ]
    },
    {
      company: "99roomz.LLP",
      role: "SDE-1", 
      duration: "MAR 19 - Mar 21",
      highlights: [
        "Migrated legacy architecture to MVVM with LiveData, enhancing scalability and modularity",
        "Refactored screens using Epoxy framework into server-driven UI; enabled dynamic layout rendering from backend configs",
        "Reduced manual app updates and improved adaptability to remote content changes",
        "Developed international travel booking module with itinerary listings, filters, and trip previews",
        "Implemented vertical media carousel similar to Instagram Reels; boosted booking conversion rate by 18% through visual storytelling",
        "Built reusable live video streaming SDK using RTMP and AWS MediaPackage for one-to-many broadcasts",
        "Achieved improved reliability across diverse Android devices via scalable infrastructure"
      ]
    },
    {
      company: "Corpzone Pvt.Ltd",
      role: "Android Developer",
      duration: "JAN 18 - Mar 19",
      highlights: [
        "Built Android utility app to automate Instagram reposts using clipboard link parsing and background image pre-processing",
        "Enabled seamless post creation and sharing through intent-based workflow, streamlining user experience", 
        "Revamped educational app UI to enhance clarity and readability for long-form study sessions",
        "Optimized typography and layout for improved user engagement and focus during extended use"
      ]
    }
  ];

  return (
    <section className="w-full">
      {/* Section Header */}
      <div className="w-full p-5 xs:p-10 sm:p-12 md:p-16 lg:p-20 border-b-2 border-solid border-dark dark:border-light text-dark dark:text-light">
        <h2 className="font-bold text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl capitalize">
          Work Experience
        </h2>
        <p className="font-medium text-lg xs:text-xl sm:text-2xl mt-4 text-gray-600 dark:text-gray-400">
          I'm a Software Developer Engineer, specializing in Android Development with 6+ Years of Experience.
        </p>
      </div>
      
      {/* Experience Items */}
      {experiences.map((experience, index) => (
        <ExperienceItem 
          key={index} 
          experience={experience} 
          index={index} 
        />
      ))}
    </section>
  );
};

export default ExperienceSection;