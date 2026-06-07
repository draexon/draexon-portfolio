/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Clock, ArrowLeft, ArrowRight, BookOpen, Share2, CornerDownRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SectionContainer, fadeInUpVariants } from "./SectionContainer";

export const BlogSection: React.FC = () => {
  const [isReadExpanded, setIsReadExpanded] = useState<boolean>(false);
  const [justCopied, setJustCopied] = useState<boolean>(false);

  const essay = {
    title: "Why Handloom and UI Design Think the Same Way",
    subtitle: "A modern comparative analysis charting raw weft-and-warp threads into digital pixel layout matrix coordinates.",
    date: "MAY 25, 2026",
    readTime: "7 MIN READ",
    category: "PHILOSOPHY",
    coverUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Long before Figma mapped pixel coordinates, master weavers devised binary grid instructions on mechanical looms to thread complex pattern geometry, proving that handloom and UI design think the exact same way.",
    content: [
      "In the history of digital logic, we often trace our binary coordinates back to Jacquard's punch-card looms of the early nineteenth century. But raw structural layout grids predated industrial machinery by thousands of years. Enter the handloom: a symmetric, high-precision manual framework where vertical warp threads are mechanically tensioned, and horizontal weft threads are passed through as variable vectors.",
      "When our modern responsive view containers align grid divs in percentage fractions, we are mapping the exact spatial logic of traditional weavers. Weavers calculate density in threads-per-inch (TPI). In digital design, we define DPI. On the loom, the treadles operate as conditional logic gates—raising or lowering specific weft tracks depending on instructions stored in custom drafts or patterns. Changing a loom draft is exactly analogous to updating a Tailwind configuration theme block.",
      "Therefore, there is an innate cultural kinship between heritage handloom weaving and avant-garde UI engineering. Both systems seek to control complex spatial density through mathematically rigid bounds. Our design system, Saffron-Noir, embraces this by enforcing raw 1px grid overlays and completely discarding standard bubble-rounded containers, honoring the rigid precision of the weaver's comb."
    ]
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 3000);
  };

  return (
    <SectionContainer id="blog" className="space-y-12">
      
      {/* Editorial Header */}
      <motion.div 
        variants={fadeInUpVariants}
        className="border-b border-saffron/20 pb-8 md:pb-10"
      >
        <p className="font-mono text-[10px] sm:text-xs text-saffron tracking-[0.3em] uppercase mb-2 sm:mb-3 font-semibold">// THOUGHTS & WRITING</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight">
          The <span className="italic font-normal text-saffron">Journal.</span>
        </h2>
        <p className="mt-4 text-sm text-text-dim leading-relaxed font-sans max-w-2xl">
          Weekly thoughts and research essays comparing loom mechanics, computing systems, variable typeface geometry, and extreme design aesthetics.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!isReadExpanded ? (
          /* STANDARD MINIMAL CARD VIEW - EXCESSIVE WHITESPACE & CLEANLINESS */
          <motion.div
            key="card-view"
            variants={fadeInUpVariants}
            exit={{ opacity: 0, y: -10 }}
            className="py-12 md:py-20 flex flex-col justify-center items-center w-full"
          >
            <div className="w-full max-w-2xl border border-saffron/15 bg-bg-card hover:border-saffron/35 transition-[border-color] duration-300 p-8 sm:p-12 space-y-6">
              
              {/* Card Meta Tag */}
              <div className="flex items-center space-x-3 text-[10px] font-mono text-text-dim/50 uppercase tracking-widest leading-none">
                <span className="text-saffron font-bold">[{essay.category}]</span>
                <span>•</span>
                <span>{essay.date}</span>
                <span>•</span>
                <span className="flex items-center space-x-1 font-bold">
                  <Clock className="w-3 h-3 text-saffron" />
                  <span>{essay.readTime}</span>
                </span>
              </div>

              {/* Title in Saffron Serif */}
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-saffron tracking-tight leading-tight">
                {essay.title}
              </h3>

              {/* 2-Line Excerpt in Ivory */}
              <p className="text-sm font-sans leading-relaxed text-text-dim/80 line-clamp-2">
                {essay.excerpt}
              </p>

              {/* Action Trigger Link */}
              <div className="pt-6 border-t border-saffron/10 flex justify-between items-center">
                <button
                  onClick={() => setIsReadExpanded(true)}
                  className="group font-mono text-xs font-bold tracking-[0.2em] text-saffron hover:text-text-main transition-colors flex items-center space-x-2 cursor-pointer pb-1"
                >
                  <span>READ ARTICLE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </button>
                <span className="font-mono text-[9px] text-text-dim/30 lowercase">// double thread weave</span>
              </div>

            </div>
          </motion.div>
        ) : (
          /* FULL ARTICLE EXPAND VIEW WRAPPED IN NO-NAVIGATION INLINE FLOW */
          <motion.div
            key="article-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto py-8 space-y-10"
          >
            {/* Back anchor button */}
            <button
              onClick={() => setIsReadExpanded(false)}
              className="flex items-center space-x-2 font-mono text-xs text-saffron hover:text-text-main tracking-widest font-bold mb-6 pb-2 border-b border-saffron/10 group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
              <span>RETURN TO THE JOURNAL</span>
            </button>

            {/* Essay Meta Area */}
            <div className="space-y-6">
              <div className="flex items-center justify-between font-mono text-xs text-text-dim/50 border-b border-saffron/10 pb-4">
                <div className="flex items-center space-x-2.5">
                  <span className="text-saffron font-bold uppercase">[{essay.category}]</span>
                  <span>•</span>
                  <span>{essay.date}</span>
                </div>
                <span className="flex items-center space-x-1.5 font-bold">
                  <Clock className="w-3.5 h-3.5 text-saffron" />
                  <span>{essay.readTime}</span>
                </span>
              </div>

              {/* Title heading */}
              <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tight leading-tight text-saffron">
                {essay.title}
              </h1>

              {/* Subheading italic card */}
              <p className="text-base sm:text-lg text-text-dim/80 leading-relaxed font-serif italic border-l-2 border-saffron pl-4 py-1.5 bg-saffron/[0.02]">
                {essay.subtitle}
              </p>
            </div>

            {/* Aspect Artwork */}
            <div className="aspect-video w-full bg-black/5 border border-saffron/15 overflow-hidden relative">
              <img
                src={essay.coverUrl}
                alt={essay.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-saffron" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-saffron" />
            </div>

            {/* Read text paragraphs with classic drop-cap */}
            <div className="space-y-6 font-sans text-sm sm:text-base leading-relaxed md:leading-loose text-text-dim/90">
              {essay.content.map((para, ind) => {
                if (ind === 0) {
                  return (
                    <p 
                      key={ind} 
                      className="first-letter:float-left first-letter:text-5xl first-letter:md:text-7xl first-letter:font-serif first-letter:font-black first-letter:text-saffron first-letter:mr-3 first-letter:mt-1 font-medium text-text-main"
                    >
                      {para}
                    </p>
                  );
                }
                return (
                  <p key={ind}>{para}</p>
                );
              })}
            </div>

            {/* Aesthetic Quote block */}
            <div className="p-8 border-y border-saffron/15 bg-saffron/[0.02] text-center font-serif italic text-base sm:text-lg text-saffron leading-relaxed max-w-xl mx-auto my-12">
              "The geometric structural grid of vertical warp threads functioning as layout vectors predates silicon compilers by five millennia."
            </div>

            {/* Bottom tools container */}
            <div className="border-t border-saffron/15 pt-8 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center text-xs font-mono text-text-dim/40">
              <span className="flex items-center space-x-1">
                <CornerDownRight className="w-4 h-4 text-saffron" />
                <span>ESSAY REFERENCE DEPLOYED // NO EXTERNAL REDIRECT</span>
              </span>
              
              <button
                onClick={handleShare}
                className="flex items-center space-x-1.5 text-saffron hover:text-text-main font-bold tracking-wider cursor-pointer font-bold pb-1"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{justCopied ? "LINK COPIED SUCCESS" : "SHARE DIRECT LINK"}</span>
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </SectionContainer>
  );
};
