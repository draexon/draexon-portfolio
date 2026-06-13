/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { SectionContainer, fadeInUpVariants } from "./SectionContainer";
import { CornerBrackets } from "./CornerBrackets";

interface EditCard {
  id: string;
  title: string;
  software: string;
  softwareTag: string;
  coverUrl: string;
  description: string;
}

export const EditsSection: React.FC = () => {
  const stats = [
    { name: "After Effects", value: "42 hrs", desc: "This week" },
    { name: "Premiere Pro", value: "18 hrs", desc: "This week" },
    { name: "Blender 3D", value: "24 hrs", desc: "This week" },
    { name: "All Time Experience", value: "12,250 hrs", desc: "Total edits logged" },
  ];

  const latestEdits: EditCard[] = [
    { id: "neo-classical", title: "Neo-Classical Synthesis", software: "After Effects", softwareTag: "AE", coverUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80", description: "Mathematical alignment of glitch sequences triggered by double-bass sweeps." },
    { id: "kinetic-arch", title: "Kinetic Architecture", software: "Blender 3D", softwareTag: "BLENDER", coverUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80", description: "Projection-mapped historical pillars collapsing into digital micro-fabrics." },
    { id: "saffron-pulse", title: "Saffron Pulse", software: "After Effects", softwareTag: "AE", coverUrl: "https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&w=800&q=80", description: "Atmospheric color-grading synchronized with heavy modular transients." },
  ];

  const favouriteEdits: EditCard[] = [
    { id: "weavers-rhythm", title: "The Weaver's Rhythm", software: "Premiere Pro", softwareTag: "PR", coverUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80", description: "Symmetric documentary overlaying warp-weft movements with pixel lines." },
    { id: "fibre-coordinates", title: "Fibre Coordinates", software: "After Effects", softwareTag: "AE", coverUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80", description: "A continuous 2D procedural rendering exploring physical textiles stretching." },
    { id: "obsidian-monolith", title: "Obsidian Monolith", software: "Blender 3D", softwareTag: "BLENDER", coverUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80", description: "Symmetric rendering of minerals dissolving in high-contrast volumetric lighting." },
  ];

  const renderEditList = (items: EditCard[], label: string) => (
    <div className="h-full space-y-8">
      <p className="font-mono text-xs text-saffron tracking-[0.2em] uppercase font-bold">{label}</p>
      <div className="divide-y divide-white/[0.08]">
        {items.map((item) => (
          <article key={item.id} className="group relative overflow-visible p-[30px] md:p-[60px] space-y-5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500 ease-in-out">
            <CornerBrackets />
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-saffron">
              {item.softwareTag} / {item.software}
            </div>
            <h3 className="text-3xl md:text-4xl font-serif italic font-bold text-text-main group-hover:text-saffron transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-text-dim leading-relaxed max-w-xl">{item.description}</p>
          </article>
        ))}
      </div>
    </div>
  );

  return (
    <SectionContainer id="edits" className="space-y-20 md:space-y-28">
      <motion.div variants={fadeInUpVariants} className="border-b border-saffron/20 pb-8 md:pb-10">
        <p className="font-mono text-[10px] sm:text-xs text-saffron tracking-[0.3em] uppercase mb-2 sm:mb-3 font-semibold">// MOTION & VISUAL</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight">
          Visual <span className="italic font-normal text-saffron">Rhythm.</span>
        </h2>
        <p className="mt-4 text-sm text-text-dim leading-relaxed font-sans max-w-2xl">
          High-performance temporal composition. Direct mapping of auditory transients onto cinematic frames, color coordinates, and procedural 3D environments.
        </p>
      </motion.div>

      <motion.div variants={fadeInUpVariants} className="grid grid-cols-2 md:grid-cols-4 gap-[30px] items-stretch">
        {stats.map((stat) => (
          <div key={stat.name} className="group relative overflow-visible h-full space-y-3 p-[30px] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500 ease-in-out">
            <CornerBrackets />
            <span className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-saffron block">{stat.value}</span>
            <span className="text-[10px] font-mono text-text-dim uppercase tracking-[0.18em] block">{stat.name}</span>
            <span className="text-[9px] font-mono text-text-dim/40 uppercase tracking-wider block">{stat.desc}</span>
          </div>
        ))}
      </motion.div>

      <motion.div variants={fadeInUpVariants} className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-stretch">
        {renderEditList(latestEdits, "// LATEST EDITS")}
        {renderEditList(favouriteEdits, "// FAVOURITE EDITS")}
      </motion.div>
    </SectionContainer>
  );
};
