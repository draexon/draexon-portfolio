import React, { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Printer, Download, Mail, Globe, MapPin, Briefcase, GraduationCap, Code, Video, Music } from "lucide-react";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CvModal({ isOpen, onClose }: CvModalProps) {
  const printAreaRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCv = () => {
    const mdContent = `# DRAEXON — CURRICULUM VITAE
Creative Director & Computer Engineer

* Email: draedon2110@gmail.com
* Website: https://draexon.io
* Location: Global Runtimes / Remote

---

## PROFESSIONAL SUMMARY
A cinematic virtuoso and systems architect harmonizing filmmaking, sound synthesis, and high-performance computing. Developing polished, full-stack browser runtimes and multi-threaded multimedia processing tools with absolute code precision.

---

## SOCIAL CHANNELS
* GitHub: https://github.com/draexon
* LinkedIn: https://linkedin.com/in/draexon
* Discord: https://discord.gg/draexon
* Instagram: https://instagram.com/draexon
* Spotify: https://open.spotify.com/artist/draexon

---

## CORE PROFESSIONAL EXPERIENCE

### CINEMATOGRAPHER & VIDEO EDITOR
**Visual & Film Production Director** | 2022 — PRESENT
Overseeing complete visual directions and narrative assemblies for independent documentary series, cinematic mood trailers, and high-contrast motion design. Mastering multi-cam grading pipelines, DaVinci Resolve color sciences (ACES/YRGB), and Adobe Premiere non-linear editing rigs.

### SOUND DESIGNER & ELECTRONIC PRODUCER
**Avant-Garde Audio Architect** | 2020 — PRESENT
Designing modular sound installations using additive synthesis principles, grain filters, and custom frequency modulation layouts. Composing rich atmospheres for gaming and video campaigns within Logic Pro and Ableton Live environments, backed by procedural Web Audio API codebases.

### FULL-STACK CREATIVE DEVELOPER
**Systems & Creative Technologist** | 2018 — PRESENT
Developing reactive, lightweight user interfaces in React, TypeScript, and Vite. Architecting Node.js servers, customizing fast media pipelines, and managing high-speed data flow with lightweight client-side memory cache storage and low-density telemetry panels.

---

## CREDENTIALS & THEORY
* **B.Sc. in Interactive Digital Media & Systems** (Honours Degree — Computational Architectures)
* **Visual & Color Theory Masterclass** (DaVinci Color Science Enforced)

---

## TECHNICAL CAPABILITY

### SYSTEMS ENG
* TypeScript / ES6 (Expert)
* React / Vite SPA (Master)
* Node / Express (Senior)
* PostgreSQL / SQL (Advanced)
* Web Audio API (Specialist)

### CINEMATICS
* Color Grading ACES (Director)
* DaVinci Resolve / Premiere (Fluid)
* Multi-Cam Assemblage (Expert)
* Sound Dynamic Synch (Immersive)

### SOUND SYNTH
* Signal Modulation (9.5/10)
* Logic Pro X Rigs (Expert)
* Ableton Live Suite (Fluid)
* Procedural Soundwaves (Synth-9)

---
DRAEXON // CURRICULUM PORTFOLIO 2026
`;

    const blob = new Blob([mdContent], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "DRAEXON_CV.md");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6 bg-noir/90 backdrop-blur-md overflow-y-auto"
        >
          {/* Main Card Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-4xl bg-bg-app border border-saffron/30 shadow-2xl p-6 md:p-10 my-8 overflow-hidden print:p-0 print:border-none print:shadow-none"
          >
            {/* Visual Grid Accents inside the CV for retro computer terminal vibe */}
            <div className="absolute inset-0 bg-grid-line-color grid-bg opacity-40 pointer-events-none print:hidden" />

            {/* Glowing Accent Corners - print:hidden */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-saffron print:hidden" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-saffron print:hidden" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-saffron print:hidden" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-saffron print:hidden" />

            {/* Floating Operations Command HUD (Sticky header on top) - print:hidden */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-saffron/20 pb-6 mb-8 relative z-20 print:hidden">
              <div className="space-y-1">
                <span className="font-mono text-[9px] tracking-[0.3em] text-saffron uppercase font-bold block">
                  SYSTEM OPERATIONS // VER_2.026
                </span>
                <h2 className="font-serif italic text-2xl text-text-main">
                  Draexon Portfolio Curriculum
                </h2>
              </div>
              
              <div className="flex items-center space-x-3 flex-wrap gap-2">
                {/* Bold Print/PDF button */}
                <button
                  id="export-pdf-action"
                  onClick={handlePrint}
                  className="px-5 py-2.5 bg-saffron hover:bg-saffron/90 text-noir text-xs font-mono font-bold tracking-[0.2em] flex items-center space-x-2 border border-saffron transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-lg shadow-saffron/10"
                >
                  <Printer className="w-4 h-4" />
                  <span>EXPORT CV / PDF</span>
                </button>
                
                {/* Download Document Button */}
                <button
                  id="download-cv-action"
                  onClick={handleDownloadCv}
                  className="px-5 py-2.5 border border-saffron bg-transparent hover:bg-saffron/10 text-saffron text-xs font-mono font-bold tracking-[0.2em] flex items-center space-x-2 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  title="Download standard MD file"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD CV (.MD)</span>
                </button>
                
                {/* Close Button */}
                <button
                  id="close-cv-modal-btn"
                  onClick={onClose}
                  className="p-2.5 border border-border-theme hover:border-saffron/60 text-text-dim hover:text-saffron bg-bg-card hover:bg-bg-card-hover transition-all duration-300 cursor-pointer"
                  title="Close document viewer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Print Friendly Sheet Layout wrapper */}
            <div ref={printAreaRef} className="print-cv-sheet relative z-10 font-sans text-text-dim leading-relaxed">
              
              {/* CV HEADER - IDENTITY & SUMMARY */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-saffron/10 pb-8 mb-8">
                <div className="space-y-3 max-w-xl">
                  <span className="font-mono text-xs tracking-[0.4em] text-saffron uppercase font-bold block print:text-[#E8581A]">
                    CREATIVE DIRECTOR & COMPUTER ENGINEER
                  </span>
                  <h1 className="text-4xl md:text-5xl font-serif font-extrabold uppercase tracking-wide text-text-main print:text-black">
                    DRAEXON
                  </h1>
                  <p className="text-sm md:text-base text-text-dim leading-relaxed font-sans pr-4 print:text-gray-700">
                    A cinematic virtuoso and systems architect harmonizing filmmaking, sound synthesis, and high-performance computing. Developing polished, full-stack browser runtimes and multi-threaded multimedia processing tools with absolute code precision.
                  </p>
                </div>
                
                {/* Elegant Minimal Contact Sidebar Box */}
                <div className="flex flex-col space-y-2.5 font-mono text-[11px] md:text-xs text-text-dim/80 border border-saffron/15 bg-bg-card-inset/50 p-4 w-full md:w-auto min-w-[240px] print:border-gray-300 print:text-black">
                  <div className="flex items-center space-x-2.5">
                    <Mail className="w-3.5 h-3.5 text-saffron flex-shrink-0" />
                    <a href="mailto:draedon2110@gmail.com" className="hover:text-saffron transition-colors underline decoration-saffron/20">
                      draedon2110@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Globe className="w-3.5 h-3.5 text-saffron flex-shrink-0" />
                    <a href="https://draexon.io" target="_blank" rel="noopener noreferrer" className="hover:text-saffron transition-colors underline decoration-saffron/20">
                      draexon.io
                    </a>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <MapPin className="w-3.5 h-3.5 text-saffron flex-shrink-0" />
                    <span>Global Runtimes / Remote</span>
                  </div>
                  
                  {/* Real actual clickable network social links shown physically on the PDF */}
                  <div className="pt-2 border-t border-saffron/10 mt-1 flex flex-col space-y-1 text-[10px] text-text-dim/60 print:border-gray-200">
                    <span className="font-bold text-text-main text-[9px] tracking-wider uppercase">PORTFOLIO LINKS:</span>
                    <a href="https://github.com/draexon" target="_blank" rel="noopener noreferrer" className="hover:text-saffron transition-colors flex items-center space-x-1">
                      <span>• GitHub: github.com/draexon</span>
                    </a>
                    <a href="https://linkedin.com/in/draexon" target="_blank" rel="noopener noreferrer" className="hover:text-saffron transition-colors flex items-center space-x-1">
                      <span>• LinkedIn: linkedin.com/in/draexon</span>
                    </a>
                    <a href="https://discord.gg/draexon" target="_blank" rel="noopener noreferrer" className="hover:text-saffron transition-colors flex items-center space-x-1">
                      <span>• Discord: discord.gg/draexon</span>
                    </a>
                    <a href="https://open.spotify.com/artist/draexon" target="_blank" rel="noopener noreferrer" className="hover:text-saffron transition-colors flex items-center space-x-1">
                      <span>• Spotify: spotify.com/artist/draexon</span>
                    </a>
                  </div>

                  <div className="pt-2 border-t border-saffron/10 mt-1 flex items-center justify-between text-[10px] text-text-dim/40 print:border-gray-200">
                    <span>SECURITY CLASSIFIED</span>
                    <span className="text-saffron print:text-black font-bold">● ONLINE</span>
                  </div>
                </div>
              </div>

              {/* THREE CORES BENTO GRID: EXPERIENCE */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
                
                {/* Experiences Left & Center Block */}
                <div className="col-span-12 md:col-span-8 space-y-8">
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2.5 border-b border-saffron/10 pb-2 print:border-gray-300">
                      <Briefcase className="w-4 h-4 text-saffron" />
                      <h3 className="font-mono text-xs tracking-[0.3em] font-bold text-text-main uppercase print:text-black">
                        CORE PROFESSIONAL EXPERIENCE
                      </h3>
                    </div>

                    <div className="space-y-6">
                      {/* Role 1 */}
                      <div className="relative pl-4 border-l border-saffron/20 space-y-1.5 print:border-gray-300">
                        <div className="flex flex-wrap items-center justify-between gap-x-2 text-xs font-mono">
                          <span className="text-saffron font-bold uppercase tracking-wider print:text-[#E8581A]">
                            CINEMATOGRAPHER & VIDEO EDITOR
                          </span>
                          <span className="text-text-dim/40 print:text-gray-500">2022 — PRESENT</span>
                        </div>
                        <h4 className="font-serif italic text-base text-text-main print:text-black">
                          Visual & Film Production Director
                        </h4>
                        <p className="text-xs text-text-dim/75 print:text-gray-700 leading-relaxed">
                          Overseeing complete visual directions and narrative assemblies for independent documentary series, cinematic mood trailers, and high-contrast motion design. Mastering multi-cam grading pipelines, DaVinci Resolve color sciences (ACES/YRGB), and Adobe Premiere non-linear editing rigs.
                        </p>
                      </div>

                      {/* Role 2 */}
                      <div className="relative pl-4 border-l border-saffron/20 space-y-1.5 print:border-gray-300">
                        <div className="flex flex-wrap items-center justify-between gap-x-2 text-xs font-mono">
                          <span className="text-saffron font-bold uppercase tracking-wider print:text-[#E8581A]">
                            SOUND DESIGNER & ELECTRONIC PRODUCER
                          </span>
                          <span className="text-text-dim/40 print:text-gray-500">2020 — PRESENT</span>
                        </div>
                        <h4 className="font-serif italic text-base text-text-main print:text-black">
                          Avant-Garde Audio Architect
                        </h4>
                        <p className="text-xs text-text-dim/75 print:text-gray-700 leading-relaxed">
                          Designing modular sound installations using additive synthesis principles, grain filters, and custom frequency modulation layouts. Composing rich atmospheres for gaming and video campaigns within Logic Pro and Ableton Live environments, backed by procedural Web Audio API codebases.
                        </p>
                      </div>

                      {/* Role 3 */}
                      <div className="relative pl-4 border-l border-saffron/20 space-y-1.5 print:border-gray-300">
                        <div className="flex flex-wrap items-center justify-between gap-x-2 text-xs font-mono">
                          <span className="text-saffron font-bold uppercase tracking-wider print:text-[#E8581A]">
                            FULL-STACK CREATIVE DEVELOPER
                          </span>
                          <span className="text-text-dim/40 print:text-gray-500">2018 — PRESENT</span>
                        </div>
                        <h4 className="font-serif italic text-base text-text-main print:text-black">
                          Systems & Creative Technologist
                        </h4>
                        <p className="text-xs text-text-dim/75 print:text-gray-700 leading-relaxed">
                          Developing reactive, lightweight user interfaces in React, TypeScript, and Vite. Architecting Node.js servers, customizing fast media pipelines, and managing high-speed data flow with lightweight client-side memory cache storage and low-density telemetry panels.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Education / Qualifications */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2.5 border-b border-saffron/10 pb-2 print:border-gray-300">
                      <GraduationCap className="w-4 h-4 text-saffron" />
                      <h3 className="font-mono text-xs tracking-[0.3em] font-bold text-text-main uppercase print:text-black">
                        CREDENTIALS & THEORY
                      </h3>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between gap-4 font-sans text-xs">
                      <div className="space-y-1">
                        <h4 className="font-mono font-bold text-text-main print:text-black">
                          B.Sc. in Interactive Digital Media & Systems
                        </h4>
                        <p className="text-text-dim/60 print:text-gray-500">Honours Degree — Computational Architectures</p>
                      </div>
                      <div className="space-y-1 sm:text-right">
                        <h4 className="font-mono font-bold text-text-main print:text-black">
                          Visual & Color Theory Masterclass
                        </h4>
                        <p className="text-text-dim/60 print:text-gray-500">DaVinci Color Science Enforced</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Technical Capability Sidebar Column */}
                <div className="col-span-12 md:col-span-4 space-y-6">
                  
                  <div className="border border-saffron/15 bg-bg-card-inset/30 p-5 space-y-5 print:border-gray-200">
                    <div className="flex items-center space-x-2 border-b border-saffron/10 pb-2 print:border-gray-200">
                      <Code className="w-3.5 h-3.5 text-saffron" />
                      <h3 className="font-mono text-[10px] tracking-[0.3em] font-bold text-text-main uppercase print:text-black">
                        SYSTEMS ENG
                      </h3>
                    </div>
                    <ul className="space-y-2 font-mono text-xs text-text-dim/80 print:text-gray-800">
                      <li className="flex justify-between">
                        <span>TypeScript / ES6</span>
                        <span className="text-saffron print:text-black">Expert</span>
                      </li>
                      <li className="flex justify-between">
                        <span>React / Vite SPA</span>
                        <span className="text-saffron print:text-black">Master</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Node / Express</span>
                        <span className="text-saffron print:text-black">Senior</span>
                      </li>
                      <li className="flex justify-between">
                        <span>PostgreSQL / SQL</span>
                        <span className="text-saffron print:text-black">Advanced</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Web Audio API</span>
                        <span className="text-saffron print:text-black">Specialist</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border border-saffron/15 bg-bg-card-inset/30 p-5 space-y-5 print:border-gray-200">
                    <div className="flex items-center space-x-2 border-b border-saffron/10 pb-2 print:border-gray-200">
                      <Video className="w-3.5 h-3.5 text-saffron" />
                      <h3 className="font-mono text-[10px] tracking-[0.3em] font-bold text-text-main uppercase print:text-black">
                        CINEMATICS
                      </h3>
                    </div>
                    <ul className="space-y-2 font-mono text-xs text-text-dim/80 print:text-gray-800">
                      <li className="flex justify-between">
                        <span>Color Grading (ACES)</span>
                        <span className="text-saffron print:text-black">Director</span>
                      </li>
                      <li className="flex justify-between">
                        <span>DaVinci Resolve / Premiere</span>
                        <span className="text-saffron print:text-black">Fluid</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Multi-Cam Assemblage</span>
                        <span className="text-saffron print:text-black">Expert</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Sound Dynamic Synch</span>
                        <span className="text-saffron print:text-black">Immersive</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border border-saffron/15 bg-bg-card-inset/30 p-5 space-y-5 print:border-gray-200">
                    <div className="flex items-center space-x-2 border-b border-saffron/10 pb-2 print:border-gray-200">
                      <Music className="w-3.5 h-3.5 text-saffron" />
                      <h3 className="font-mono text-[10px] tracking-[0.3em] font-bold text-text-main uppercase print:text-black">
                        SOUND SYNTH
                      </h3>
                    </div>
                    <ul className="space-y-2 font-mono text-xs text-text-dim/80 print:text-gray-800">
                      <li className="flex justify-between">
                        <span>Signal Modulation</span>
                        <span className="text-saffron print:text-black">9.5/10</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Logic Pro X Rigs</span>
                        <span className="text-saffron print:text-black">Expert</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Ableton Live Suite</span>
                        <span className="text-saffron print:text-black">Fluid</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Procedural Soundwaves</span>
                        <span className="text-saffron print:text-black">Synth-9</span>
                      </li>
                    </ul>
                  </div>

                </div>

              </div>

              {/* FOOTER CLASSIFICATION ENFORCED */}
              <div className="border-t border-saffron/15 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-text-dim/50 tracking-widest uppercase print:border-gray-300 print:text-gray-500">
                <span>DRAEXON // CURRICULUM PORTFOLIO 2026</span>
                <span className="text-saffron font-bold print:text-black">TRUSTED COMPILER // HERITAGE WEAVE</span>
              </div>

            </div>

            {/* Elegant Floating "Download PDF" Action Button - Sits fixed at the bottom right */}
            <div className="fixed bottom-8 right-8 z-[11000] print:hidden">
              <motion.button
                id="floating-pdf-download-trigger"
                onClick={handlePrint}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 bg-saffron hover:bg-saffron/90 text-noir border-2 border-noir rounded-full px-6 py-4 font-mono text-xs font-black tracking-[0.2m] shadow-[0_8px_30px_rgba(232,88,26,0.35)] hover:shadow-[0_8px_40px_rgba(232,88,26,0.5)] transition-all duration-300 cursor-pointer transform font-extrabold"
              >
                <div className="relative">
                  <Printer className="w-5 h-5 text-noir animate-pulse" />
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-noir opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-noir"></span>
                  </span>
                </div>
                <span>DOWNLOAD PDF</span>
              </motion.button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
