import ScrollReveal from "@/components/ScrollReveal";

export default function About() {
  return (
    <div className="flex flex-col items-center min-h-screen pt-[150px] pb-[100px] px-6 w-full max-w-5xl mx-auto">
      <div className="w-full">
        <ScrollReveal direction="up">
          <h1 className="font-gtexpbd text-2xl md:text-4xl tracking-tight leading-[1.1] mb-16 uppercase">
            Portfolio
          </h1>
        </ScrollReveal>

        <div className="flex flex-col gap-16 md:gap-[100px]">
          {/* Intro */}
          <ScrollReveal delay={0.2} direction="up">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              <div className="md:w-1/3">
                <h2 className="font-gtexpbd text-sm md:text-base tracking-widest text-gray-500 uppercase">Profile</h2>
              </div>
              <div className="md:w-2/3">
                <p className="font-gtexprg text-sm md:text-lg leading-relaxed text-gray-300">
                  I am a dedicated cinematographer with comprehensive training from Neo Film School, specializing in capturing compelling visuals across various productions. With hands-on experience in diverse genres, including music videos, I bring a nuanced understanding of cinematography combined with proficiency in directing, editing, and sound designing.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Education & Experience */}
          <ScrollReveal delay={0.1} direction="up">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 border-t border-gray-900 pt-16">
              <div className="md:w-1/3">
                <h2 className="font-gtexpbd text-sm md:text-base tracking-widest text-gray-500 uppercase">Education & Experience</h2>
              </div>
              <div className="md:w-2/3 flex flex-col gap-12">
                <div>
                  <h3 className="font-gtexpbd text-base md:text-lg tracking-wider uppercase mb-2">Education</h3>
                  <p className="font-gtexprg text-xs md:text-sm text-gray-400 leading-relaxed">
                    Completed Cinematography Course at Neo Film School.
                  </p>
                </div>
                <div>
                  <h3 className="font-gtexpbd text-base md:text-lg tracking-wider uppercase mb-2">Production Experience</h3>
                  <p className="font-gtexprg text-xs md:text-sm text-gray-400 leading-relaxed">
                    Successfully contributed to 6 productions, encompassing a range of projects from narrative films to dynamic music videos.
                  </p>
                </div>
                <div>
                  <h3 className="font-gtexpbd text-base md:text-lg tracking-wider uppercase mb-2">Music Videos</h3>
                  <p className="font-gtexprg text-xs md:text-sm text-gray-400 leading-relaxed">
                    Spearheaded cinematography for 3 music videos, adeptly translating musical narratives into visually captivating sequences.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Skills & Approach */}
          <ScrollReveal delay={0.1} direction="up">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 border-t border-gray-900 pt-16">
              <div className="md:w-1/3">
                <h2 className="font-gtexpbd text-sm md:text-base tracking-widest text-gray-500 uppercase">Skills & Approach</h2>
              </div>
              <div className="md:w-2/3 flex flex-col gap-12">
                <div>
                  <h3 className="font-gtexpbd text-base md:text-lg tracking-wider uppercase mb-2">Cinematography Expertise</h3>
                  <p className="font-gtexprg text-xs md:text-sm text-gray-400 leading-relaxed">
                    Proficient in utilizing camera equipment, lighting setups, and visual composition techniques to enhance storytelling.
                  </p>
                </div>
                <div>
                  <h3 className="font-gtexpbd text-base md:text-lg tracking-wider uppercase mb-2">Multidisciplinary Proficiency</h3>
                  <p className="font-gtexprg text-xs md:text-sm text-gray-400 leading-relaxed">
                    Skilled in directing talent, editing footage to convey narrative coherence, and designing soundscapes that complement visual storytelling.
                  </p>
                </div>
                <div>
                  <h3 className="font-gtexpbd text-base md:text-lg tracking-wider uppercase mb-2">Approach</h3>
                  <p className="font-gtexprg text-xs md:text-sm text-gray-400 leading-relaxed">
                    With a keen eye for detail and a passion for visual storytelling, I collaborate closely with directors and producers to realize their creative vision. Each project is approached with a commitment to excellence, ensuring that the cinematography elevates the narrative and engages audiences effectively.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
