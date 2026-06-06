/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Film, Zap, Clock, Star } from "lucide-react";
import { motion } from "motion/react";
import { SectionContainer, fadeInUpVariants } from "./SectionContainer";

interface EditCard {
  id: string;
  title: string;
  software: string;
  softwareTag: string;
  coverUrl: string;
  description: string;
}

export const EditsSection: React.FC = () => {
  // Stats
  const stats = [
    { name: "After Effects", value: "42 hrs", desc: "This week" },
    { name: "Premiere Pro", value: "18 hrs", desc: "This week" },
    { name: "Blender 3D", value: "24 hrs", desc: "This week" },
    { name: "All Time Experience", value: "12,250 hrs", desc: "Total edits logged" },
  ];

  const latestEdits: EditCard[] = [
    {
      id: "neo-classical",
      title: "Neo-Classical Synthesis",
      software: "After Effects",
      softwareTag: "AE",
      coverUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80",
      description: "Mathematical alignment of glitch sequences triggered by double-bass sweeps."
    },
    {
      id: "kinetic-arch",
      title: "Kinetic Architecture",
      software: "Blender 3D",
      softwareTag: "BLENDER",
      coverUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
      description: "Projection-mapped historical pillars collapsing into digital micro-fabrics."
    },
    {
      id: "saffron-pulse",
      title: "Saffron Pulse",
      software: "After Effects",
      softwareTag: "AE",
      coverUrl: "https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&w=800&q=80",
      description: "Atmospheric color-grading synchronized with heavy modular transients."
    }
  ];

  const favouriteEdits: EditCard[] = [
    {
      id: "weavers-rhythm",
      title: "The Weaver's Rhythm",
      software: "Premiere Pro",
      softwareTag: "PR",
      coverUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      description: "Symmetric documentary overlaying warp-weft movements with pixel lines."
    },
    {
      id: "fibre-coordinates",
      title: "Fibre Coordinates",
      software: "After Effects",
      softwareTag: "AE",
      coverUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      description: "A continuous 2D procedural rendering exploring physical textiles stretching."
    },
    {
      id: "obsidian-monolith",
      title: "Obsidian Monolith",
      software: "Blender 3D",
      softwareTag: "BLENDER",
      coverUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
      description: "Symmetric rendering of minerals dissolving in high-contrast volumetric lighting."
    }
  ];

  return (
    <SectionContainer id="edits" className="space-y-12">
      
      {/* Header Panel */}
      <motion.div 
        variants={fadeInUpVariants}
        className="border-b border-saffron/20 pb-8 md:pb-10"
      >
        <p className="font-mono text-[10px] sm:text-xs text-saffron tracking-[0.3em] uppercase mb-2 sm:mb-3 font-semibold">// MOTION & VISUAL</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight">
          Visual <span className="italic font-normal text-saffron">Rhythm.</span>
        </h2>
        <p className="mt-4 text-sm text-text-dim leading-relaxed font-sans max-w-2xl">
          High-performance temporal composition. Direct mapping of auditory transients onto cinematic frames, color coordinates, and procedural 3D environments.
        </p>
      </motion.div>

      {/* Stats Bar Card Panel */}
      <motion.div 
        variants={fadeInUpVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
      >
        {stats.map((s, idx) => (
          <div key={idx} className="p-5 sm:p-6 border border-saffron/10 bg-bg-card flex flex-col justify-between h-[110px] sm:h-[120px] transition-colors duration-300">
            <span className="font-mono text-[9px] uppercase tracking-wider text-text-dim/50 flex items-center space-x-1.5">
              <span>{s.name}</span>
            </span>
            <div>
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-saffron block">
                {s.value}
              </span>
              <span className="text-[10px] font-mono text-text-dim/40 lowercase">{s.desc}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Side by Side Sub-sections Column Grid */}
      <motion.div 
        variants={fadeInUpVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-4"
      >
        
        {/* LATEST EDITS COLUMN */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 pb-3 border-b border-saffron/10">
            <Film className="w-4 h-4 text-saffron stroke-[1.5]" />
            <span className="font-mono text-xs text-saffron tracking-[0.2em] uppercase font-bold">LATEST EDITS</span>
          </div>

          <div className="space-y-4">
            {latestEdits.map((item) => (
              <div 
                key={item.id}
                className="group border border-saffron/10 bg-bg-card hover:border-saffron/30 transition-all duration-300 p-4 sm:p-5 flex items-start space-x-4"
              >
                {/* Thumbnail */}
                <div className="relative w-24 h-16 sm:w-28 sm:h-20 shrink-0 border border-saffron/10 bg-black/5 overflow-hidden">
                  <img
                    src={item.coverUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  {/* Subtle Accent Dots */}
                  <div className="absolute top-1 left-1 w-1 h-1 bg-saffron" />
                </div>

                <div className="flex-grow min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-saffron/10 border border-saffron/15 text-saffron tracking-wide">
                      {item.softwareTag}
                    </span>
                    <span className="text-[9px] font-mono text-text-dim/50 uppercase tracking-widest">// REEL</span>
                  </div>
                  <h4 className="font-serif italic text-base font-bold truncate text-text-main group-hover:text-saffron transition-colors pt-0.5">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-text-dim/75 font-sans leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAVOURITE EDITS COLUMN */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 pb-3 border-b border-saffron/10">
            <Clock className="w-4 h-4 text-saffron stroke-[1.5]" />
            <span className="font-mono text-xs text-saffron tracking-[0.2em] uppercase font-bold">FAVOURITE EDITS</span>
          </div>

          <div className="space-y-4">
            {favouriteEdits.map((item) => (
              <div 
                key={item.id}
                className="group border border-saffron/10 bg-bg-card hover:border-saffron/30 transition-all duration-300 p-4 sm:p-5 flex items-start space-x-4"
              >
                {/* Thumbnail */}
                <div className="relative w-24 h-16 sm:w-28 sm:h-20 shrink-0 border border-saffron/10 bg-black/5 overflow-hidden">
                  <img
                    src={item.coverUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute bottom-1 right-1">
                    <Star className="w-2.5 h-2.5 text-saffron fill-saffron" />
                  </div>
                </div>

                <div className="flex-grow min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-saffron/10 border border-saffron/15 text-saffron tracking-wide">
                      {item.softwareTag}
                    </span>
                    <span className="text-[9px] font-mono text-text-dim/50 uppercase tracking-widest">// CULT</span>
                  </div>
                  <h4 className="font-serif italic text-base font-bold truncate text-text-main group-hover:text-saffron transition-colors pt-0.5">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-text-dim/75 font-sans leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </motion.div>

    </SectionContainer>
  );
};
