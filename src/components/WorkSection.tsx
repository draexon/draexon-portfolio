/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { WorkItem } from "../types";
import { SectionContainer, fadeInUpVariants } from "./SectionContainer";
import { CornerBrackets } from "./CornerBrackets";

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
      role: "VFX & Editing",
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
      role: "Sound Design",
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
      role: "Lead Engineer",
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
      role: "Director / Editor",
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
      role: "Composer",
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
      role: "Author",
    },
  ];

  const filteredWorks = filter === "ALL" ? works : works.filter((work) => work.category === filter);

  const handleWorkClick = (item: WorkItem) => {
    if (item.category === "EDITS") setActiveTab("edits");
    if (item.category === "MUSIC") setActiveTab("music");
    if (item.category === "CODE") setActiveTab("code");
  };

  return (
    <SectionContainer id="work">
      <motion.div
        variants={fadeInUpVariants}
        className="md:flex md:items-end md:justify-between border-b border-saffron/20 pb-10 mb-16"
      >
        <div className="max-w-2xl text-left">
          <p className="font-mono text-[10px] sm:text-xs text-saffron tracking-[0.3em] uppercase mb-2 sm:mb-3 font-semibold">// CURATED PORTFOLIO</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight">
            Selected <span className="italic font-normal">Works.</span>
          </h2>
          <p className="mt-4 text-sm text-text-dim/70 leading-relaxed font-sans">
            A curation of conceptual releases aligning motion synthesis, audio dynamics, and pristine codebase symmetry.
          </p>
        </div>

        <div className="flex flex-wrap gap-[30px] mt-[60px] md:mt-0">
          {(["ALL", "EDITS", "MUSIC", "CODE"] as const).map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`py-2 text-[10px] tracking-[0.25em] font-mono font-bold transition-colors cursor-pointer ${
                filter === category ? "text-white" : "text-saffron hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div key={filter} variants={fadeInUpVariants} className="divide-y divide-white/[0.08]">
        {filteredWorks.map((item, index) => (
          <motion.button
            layout
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            onClick={() => handleWorkClick(item)}
            className="group relative overflow-visible w-full p-[30px] md:p-[60px] text-left cursor-pointer bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500 ease-in-out"
          >
            <CornerBrackets />
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-[30px] lg:gap-[60px] lg:items-end">
              <div className="lg:col-span-3 font-mono text-[10px] tracking-[0.22em] uppercase text-saffron">
                {item.category} / {item.year} / {item.role}
              </div>
              <div className="lg:col-span-7 space-y-5">
                <h3 className="text-3xl md:text-5xl font-serif italic font-bold text-text-main group-hover:text-saffron transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-text-dim leading-relaxed max-w-3xl">{item.subtitle}</p>
                <p className="text-xs text-text-dim/50 font-mono">{item.tools.join(" / ")}</p>
              </div>
              <div className="lg:col-span-2 flex lg:flex-col lg:items-end justify-between gap-4 font-mono text-[10px] uppercase tracking-wider">
                <span className="text-text-dim">{item.stat}</span>
                <span className="flex items-center gap-2 text-saffron group-hover:text-white transition-colors">
                  View <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </SectionContainer>
  );
};
