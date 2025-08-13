async function migrateProjects() {
  const projects = [
    {
      title: "Project Elgorithm",
      description: "CodePlayground Learn coding with virtual electronics! An interactive platform where users control virtual components like NeoPixels, LEDs, and servos using block-based programming (Blockly). Features include a real-time playground, Blockly code generation, and a set of fun challenges to teach coding and hardware concepts — all in the browser.",
      technologies: ["JavaScript", "Blockly", "Web APIs", "Virtual Electronics", "Educational Platform"],
      images: [
        "/images/Projects/elgo 1.png",
        "/images/Projects/elgo 2.png",
        "/images/Projects/elgo 3.png",
        "/images/Projects/elgo 4.png",
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

  // 1. Upload images and update image paths
  for (const project of projects) {
    const imageUrls = [];
    for (const imagePath of project.images) {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const fileName = imagePath.split('/').pop();
      const { data, error } = await supabase.storage
        .from('project-images')
        .upload(fileName, blob);
      if (error) {
        console.error('Error uploading image:', error);
        continue;
      }
      const { publicURL } = supabase.storage
        .from('project-images')
        .getPublicUrl(fileName).data;
      imageUrls.push(publicURL);
    }
    project.images = imageUrls;
  }

  // 2. Insert projects into the database
  const { data, error } = await supabase.from('projects').insert(projects);
  if (error) {
    console.error('Error inserting projects:', error);
  } else {
    console.log('Projects migrated successfully:', data);
  }
}

console.log("To migrate your projects, you need to first create the 'projects' table in your Supabase dashboard with the following SQL query:");
console.log(`
  CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    technologies TEXT[],
    images TEXT[],
    "githubUrl" TEXT,
    "liveUrl" TEXT
  );
`);
console.log("Then, run the following command in your browser's developer console on your website:");
console.log("migrateProjects()");
