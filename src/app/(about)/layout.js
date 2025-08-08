import InsightRoll from "@/src/components/About/InsightRoll";



  const insights = [
    "7+ Years of Android Development",
    "Built & Launched 3 Apps from Scratch",
    "Expert in Jetpack Compose & Kotlin",
    "Led Teams & Mentored Engineers",
    "Architected Scalable, Modular Systems",
    "Integrated CI/CD with Jenkins & GitHub Actions",
    "Worked on Video Streaming with ExoPlayer",
    "Explored IoT & Electronics Integration",
    "Contributed to Open-Source Projects",
    "Passionate About Clean Code & Developer Workflows",
];

export default function AboutLayout({ children }) {
  return (
    <main className="w-full flex flex-col items-center justify-between">
      <InsightRoll insights={insights} />
      {children}
    </main>
  );
}
