import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-[150px] px-6 w-full max-w-4xl mx-auto">
      <div className="w-full">
        <ScrollReveal direction="up">
          <h1 className="font-gtexpbd text-2xl md:text-4xl tracking-tight leading-[1.1] mb-6 uppercase text-center md:text-left">
            Let's Talk
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.1} direction="up">
          <p className="font-gtexprg text-sm text-gray-400 tracking-wide uppercase text-center md:text-left mb-16">
            Ready to start a project or just want to say hi?
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <ScrollReveal delay={0.2} direction="up">
            <form 
              action="https://formsubmit.co/enquiries@haabel.com" 
              method="POST" 
              className="flex flex-col gap-8"
            >
              {/* FormSubmit Configuration */}
              <input type="hidden" name="_subject" value="New inquiry from HAABEL website" />
              <input type="hidden" name="_captcha" value="false" />
              
              <div className="flex flex-col gap-2">
                <label className="font-gtexpbd text-[9px] tracking-widest uppercase text-gray-500">Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  className="bg-transparent border-b border-gray-800 focus:border-white outline-none py-4 font-gtexprg text-xs text-white transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-gtexpbd text-[9px] tracking-widest uppercase text-gray-500">Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="bg-transparent border-b border-gray-800 focus:border-white outline-none py-4 font-gtexprg text-xs text-white transition-colors"
                  placeholder="hello@example.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-gtexpbd text-[9px] tracking-widest uppercase text-gray-500">Message</label>
                <textarea 
                  name="message"
                  required
                  className="bg-transparent border-b border-gray-800 focus:border-white outline-none py-4 font-gtexprg text-xs text-white transition-colors min-h-[100px] resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button 
                type="submit" 
                className="group mt-4 flex items-center gap-4 text-white font-gtexpbd tracking-widest uppercase text-sm hover:text-gray-400 transition-colors w-max"
              >
                Send Message
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
              </button>
            </form>
          </ScrollReveal>

          <ScrollReveal delay={0.3} direction="up">
            <div className="flex flex-col gap-12">
              <div>
                <h3 className="font-gtexpbd text-[9px] tracking-widest uppercase text-gray-500 mb-4">Email</h3>
                <a href="mailto:enquiries@haabel.com" className="font-gtexprg text-base md:text-lg hover:text-gray-400 transition-colors">
                  enquiries@haabel.com
                </a>
              </div>

              <div>
                <h3 className="font-gtexpbd text-[9px] tracking-widest uppercase text-gray-500 mb-4">Phone</h3>
                <a href="tel:+919037423205" className="font-gtexprg text-base md:text-lg hover:text-gray-400 transition-colors">
                  +91 90374 23205
                </a>
              </div>
              
              <div>
                <h3 className="font-gtexpbd text-[9px] tracking-widest uppercase text-gray-500 mb-4">Social</h3>
                <div className="flex flex-col gap-4">
                  <a href="https://instagram.com/habeeel" target="_blank" rel="noreferrer" className="font-gtexprg text-sm text-white hover:text-gray-400 transition-colors w-max">
                    @habeeel
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
