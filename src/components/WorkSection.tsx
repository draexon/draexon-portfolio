/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ArrowRight, Filter } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { WorkItem } from "../types";
import { SectionContainer, fadeInUpVariants } from "./SectionContainer";

interface WorkSectionProps {
  setActiveTab: (tab: string) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ setActiveTab }) => {
  const [filter, setFilter] = useState<"ALL" | "EDITS" | "MUSIC" | "CODE">("ALL");

  const works: WorkItem[] = [
    {
      id: "neo-classical",
      title: "Neo-Classical Synthesis",
      subtitle: "Kinetic film edit connecting algorithmic audio to heritage architecture.",
      category: "EDITS",
      thumbnail: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80",
      description: "An intensive, timing-locked visual symphony featuring rapid cuts, custom optical distortions, and meticulous color-grading mirroring industrial loom vibrations.",
      year: "2026",
      tools: ["After Effects", "Premiere Pro", "DaVinci Resolve"],
      stat: "4.2M views",
      role: "VFX & Editing"
    },
    {
      id: "transient-echoes",
      title: "Transient Echoes",
      subtitle: "Aural experiment spanning slow atmospheric drones and modular synth noise.",
      category: "MUSIC",
      thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
      description: "A series of procedural ambient synthesizer recordings mapping geographic terrain into minor key drones and randomized rhythmic gates.",
      year: "2025",
      tools: ["Eurorack", "Web Audio API", "Logic Pro"],
      stat: "3.4M Streams",
      role: "Sound Design"
    },
    {
      id: "aether-engine",
      title: "Aether.engine v2.0",
      subtitle: "High-performance codebase rendering real-time geometric AST visualizers.",
      category: "CODE",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      description: "An open-source compiler tool chain written in TypeScript/Rust that translates structure models into pristine canvas and SVG render pipelines.",
      year: "2026",
      tools: ["TypeScript", "Rust", "WebAssembly", "D3.js"],
      stat: "4.8k Stars",
      role: "Lead Engineer"
    },
    {
      id: "weavers-rhythm",
      title: "The Weaver's Rhythm",
      subtitle: "B&W editorial comparing high-contrast loom grids with pixels.",
      category: "EDITS",
      thumbnail: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      description: "A short cinematic editorial that details the striking structural similarities between classical warp-and-weft handloom weaving and responsive UI layout grids.",
      year: "2026",
      tools: ["Premiere Pro", "Blender", "RED Cine-X"],
      stat: "1.2M views",
      role: "Director / Editor"
    },
    {
      id: "varanasi-market",
      title: "Varanasi Night Market",
      subtitle: "Atmospheric soundtrack mirroring field-recorded sub-continental environments.",
      category: "MUSIC",
      thumbnail: "https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&w=800&q=80",
      description: "Deep, bass-heavy acoustic structures blending authentic market chatter, traditional sarsang strings, and modular drum glitches.",
      year: "2026",
      tools: ["Ableton Live", "Analog Synthesizers", "Field Recorder"],
      stat: "5.1M Streams",
      role: "Composer"
    },
    {
      id: "genesis-component",
      title: "Genesis Component",
      subtitle: "Universal rendering system implementing golden ratio geometric layout algorithms.",
      category: "CODE",
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      description: "An extremely lightweight responsive component framework designed to enforce pristine asymmetric margins and perfect color contrast without CSS payload overhead.",
      year: "2025",
      tools: ["React", "Tailwind CSS", "TypeScript"],
      stat: "12.8k downloads",
      role: "Author"
    },
  ];

  const filteredWorks = filter === "ALL" ? works : works.filter((w) => w.category === filter);

  // Cross-route navigate when clicked!
  const handleWorkClick = (item: WorkItem) => {
    if (item.category === "EDITS") {
      setActiveTab("edits");
    } else if (item.category === "MUSIC") {
      setActiveTab("music");
    } else if (item.category === "CODE") {
      setActiveTab("code");
    }
  };

  return (
    <SectionContainer id="work">
      
      {/* Editorial Header */}
      <motion.div 
        variants={fadeInUpVariants}
        className="md:flex md:items-end md:justify-between border-b border-saffron/20 pb-10 mb-12"
      >
        <div className="max-w-2xl text-left">
          <p className="font-mono text-[10px] sm:text-xs text-saffron tracking-[0.3em] uppercase mb-2 sm:mb-3 font-semibold">// CURATED PORTFOLIO</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight">
            Selected <span className="italic font-normal">Works.</span>
          </h2>
          <p className="mt-4 text-sm text-[#F5F0E8]/70 leading-relaxed font-sans">
            A curation of conceptual releases aligning motion synthesis, audio dynamics, and pristine codebase symmetry. 
            Click any project card to access its interactive control console.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap gap-2 mt-8 md:mt-0 border border-saffron/10 p-1.5 bg-bg-card transition-colors duration-300">
          {(["ALL", "EDITS", "MUSIC", "CODE"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 text-[10px] tracking-[0.25em] font-mono font-bold transition-all duration-300 cursor-pointer ${
                filter === cat
                  ? "bg-saffron text-[#0C0C0C]"
                  : "text-text-dim/85 hover:text-saffron hover:bg-saffron/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid of Portfolio Cards in Bento Layout */}
      <motion.div
        key={filter}
        variants={fadeInUpVariants}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {filteredWorks.length > 0 && (
          <React.Fragment>
            {/* PRIMARY FEATURE (7 columns) */}
            <motion.div
              layout
              key={filteredWorks[0].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              onClick={() => handleWorkClick(filteredWorks[0])}
              className="lg:col-span-7 group cursor-pointer border border-saffron/15 bg-bg-card hover:border-saffron/40 hover:bg-bg-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Meta Line */}
                <div className="flex justify-between items-center px-5 py-4 border-b border-saffron/10 bg-bg-card-inset font-mono text-[10px] text-text-dim/60 transition-colors duration-300">
                  <span>// FEATURED FIELD</span>
                  <span className="text-saffron tracking-wider font-bold">[{filteredWorks[0].category}]</span>
                </div>

                {/* Aspect-Locked Cover Image */}
                <div className="relative aspect-video w-full overflow-hidden border-b border-saffron/10 bg-black/5">
                  <img
                    src={filteredWorks[0].thumbnail}
                    alt={filteredWorks[0].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-102 transition-all duration-500"
                  />
                  {/* Decorative corner lines framing the image like a high-end photography layout */}
                  <div className="absolute top-2 left-2 w-2 h-[1px] bg-saffron/40" />
                  <div className="absolute top-2 left-2 w-[1px] h-2 bg-saffron/40" />
                  <div className="absolute bottom-2 right-2 w-2 h-[1px] bg-saffron/40" />
                  <div className="absolute bottom-2 right-2 w-[1px] h-2 bg-saffron/40" />
                </div>

                {/* Body Content */}
                <div className="p-8 space-y-4">
                  <h3 className="text-2xl md:text-3xl font-serif font-extrabold group-hover:text-saffron transition-colors">
                    {filteredWorks[0].title}
                  </h3>
                  <p className="text-sm text-text-dim leading-relaxed">
                    {filteredWorks[0].subtitle}
                  </p>
                  <p className="text-xs text-text-dim/50 leading-relaxed italic border-t border-saffron/10 pt-4">
                    {filteredWorks[0].description}
                  </p>
                </div>
              </div>

              {/* Card Footer (Tools and Stat callouts) */}
              <div className="p-8 border-t border-saffron/10 bg-bg-card-inset flex flex-col space-y-4 transition-colors duration-300">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-text-dim/40">CAPABILITY:</span>
                  <span className="text-saffron font-bold uppercase">{filteredWorks[0].role}</span>
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                  {filteredWorks[0].tools.map((t) => (
                    <span key={t} className="text-[9px] font-mono font-medium px-2.5 py-1 bg-saffron/5 border border-saffron/10 text-saffron/80">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-saffron/5 group-hover:text-saffron transition-colors text-xs font-mono font-bold tracking-wider">
                  <span className="text-sm">{filteredWorks[0].stat}</span>
                  <div className="flex items-center space-x-1.5">
                    <span>ACTIVATE CONSOLE</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SECONDARY COMPANION STACK (5 columns) */}
            <div className="lg:col-span-5 flex flex-col space-y-5">
              <span className="font-mono text-[10px] text-saffron tracking-[0.25em] uppercase font-bold">// COMPANION COLLECTIONS</span>
              <div className="flex flex-col space-y-4">
                {filteredWorks.slice(1).map((item, idx) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    onClick={() => handleWorkClick(item)}
                    className="group cursor-pointer border border-saffron/10 bg-bg-card hover:border-saffron/30 hover:bg-bg-card-hover transition-all duration-300 p-5 flex flex-col justify-between"
                  >
                    <div className="flex items-start space-x-4">
                      {/* Smaller Cover Image */}
                      <div className="relative w-24 h-16 sm:w-28 sm:h-20 shrink-0 overflow-hidden border border-saffron/10 bg-black/5">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>

                      <div className="flex-grow min-w-0 space-y-1">
                        <div className="flex items-center justify-between text-[9px] font-mono text-text-dim/60 uppercase">
                          <span>// 0{idx + 2}</span>
                          <span className="text-saffron font-bold">[{item.category}]</span>
                        </div>
                        <h4 className="font-serif italic text-base font-bold truncate group-hover:text-saffron transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-text-dim/80 truncate">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-saffron/5 flex justify-between items-center text-[10px] font-mono text-[#F5F0E8]/60">
                      <span className="truncate max-w-[200px]">{item.tools.slice(0, 2).join(" • ")}</span>
                      <div className="flex items-center space-x-1 group-hover:text-saffron transition-colors font-bold">
                        <span>LAUNCH</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </React.Fragment>
        )}
      </motion.div>

    </SectionContainer>
  );
};
