import ScrollReveal from "@/components/ScrollReveal";
import VideoCard from "@/components/VideoCard";

export default function Home() {
  const projects = [
    { title: "STOIC", subtitle: "Short Film", videoId: "erLYSK7qZxA" },
    { title: "SLANTED TRUTH", subtitle: "Documentary", videoId: "6OkdwIcul5o" },
    { title: "ARIFA", subtitle: "Character Portrait", videoId: "lwH837qfvow" },
    { title: "ISHQ-E-QAFIR", subtitle: "Music Video", videoId: "hj638QgeTOc" },
    { title: "CINEPHILE", subtitle: "Documentary", videoId: "0M_CwIsS6-E" },
    { title: "SON OF A BASTARD", subtitle: "Webseries Pilot", videoId: "J7SB77-Geyk" },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen pt-[120px] pb-[100px] px-6 w-full">
      <ScrollReveal direction="up">
        <h1 className="font-gtexpbd text-lg md:text-2xl lg:text-3xl tracking-widest text-center uppercase mb-4">
          ABEL THANUVELIL
        </h1>
      </ScrollReveal>
      
      <ScrollReveal delay={0.2} direction="up">
        <p className="font-gtexprg text-[10px] md:text-xs text-gray-300 text-center tracking-widest uppercase">
          Cinematographer | Director
        </p>
      </ScrollReveal>

      <section className="w-full max-w-[1400px] mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={0.1 * (index % 3)}>
              <VideoCard 
                title={project.title}
                subtitle={project.subtitle}
                videoId={project.videoId}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
