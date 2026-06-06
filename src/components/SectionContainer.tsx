/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { globalAudio } from "./AudioEngine";
import { Visualizer } from "./Visualizer";

export const staggerContainerVariants = {
  hidden: { 
    opacity: 0,
    y: 28
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.12,
      delayChildren: 0.05,
    }
  }
};

export const fadeInUpVariants = {
  hidden: { 
    opacity: 0, 
    y: 16
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};

interface SectionContainerProps {
  children: React.ReactNode;
  id?: string;
  className?: string; // Appends custom classes (like `space-y-12`, etc.) to the inner content container
  wrapperClassName?: string; // Appends custom classes (like `relative`, `overflow-hidden`, etc.) to the outer full-bleed wrapper
  customPadding?: string; // Override default padding if needed
  justify?: "start" | "between" | "center";
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  id,
  className = "",
  wrapperClassName = "",
  customPadding = "py-12 md:py-20 px-5 sm:px-8 md:px-16 lg:px-24", // Adjusted to ensure content sits beautifully inside the layered loom curves
  justify = "start",
}) => {
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      {
        threshold: 0.02,
        rootMargin: "0px 0px -80px 0px", // triggers slightly early for continuous cinematic feel
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Synchronize state periodically with global audio engine parameters
  useEffect(() => {
    const handleSync = setInterval(() => {
      setAudioPlaying(globalAudio.isPlaying());
      setActiveTrackId(globalAudio.getActiveTrack());
    }, 250);

    return () => {
      clearInterval(handleSync);
    };
  }, []);

  const justifyClass = 
    justify === "between" 
      ? "justify-between" 
      : justify === "center" 
      ? "justify-center" 
      : "justify-start";

  return (
    <section 
      ref={sectionRef}
      id={id}
      className={`w-full bg-bg-app text-text-main min-h-[calc(100vh-80px)] flex flex-col ${justifyClass} relative overflow-hidden ${wrapperClassName} transition-colors duration-300`}
    >
      {/* Background Subtle Moving Grid Cross Lines (Low pacing) */}
      <div className="absolute inset-0 bg-grid-faint animate-slow-pan pointer-events-none select-none z-0" />

      {/* Main Wavy Grid Background Visualizer (Waving curves across every page) */}
      <div className="absolute inset-0 opacity-[0.25] pointer-events-none select-none z-0">
        <Visualizer 
          isPlaying={audioPlaying} 
          activeTrackId={activeTrackId} 
          className="bg-transparent border-none"
        />
      </div>

      {/* Radial shade effect to ensure highest contrast in readable areas */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,var(--radial-end)_95%)] pointer-events-none select-none z-0 transition-all duration-300" />

      {/* Dynamic Handloom Wavy Frame Borders Overlay (Z-Index 20) */}
      <div className="absolute inset-0 w-full h-full z-20 pointer-events-none select-none">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="khadi-pattern-stencil" width="12" height="12" patternUnits="userSpaceOnUse">
              <rect width="12" height="12" fill="var(--bg-app)" className="transition-colors duration-300" />
              {/* Diagonal threads */}
              <path d="M0 12 L12 0 M0 6 L6 0 M6 12 L12 6" stroke="var(--weaver-1)" strokeWidth="0.75" fill="none" className="transition-colors duration-300" />
              <path d="M0 0 L12 12 M0 6 L6 12 M6 0 L12 6" stroke="var(--weaver-2)" strokeWidth="0.75" fill="none" className="transition-colors duration-300" />
              {/* Web warp and weft lines */}
              <line x1="0" y1="6" x2="12" y2="6" stroke="var(--weaver-3)" strokeWidth="0.5" className="transition-colors duration-300" />
              <line x1="6" y1="0" x2="6" y2="12" stroke="var(--weaver-3)" strokeWidth="0.5" className="transition-colors duration-300" />
            </pattern>
          </defs>

          {/* Solid Stencil Mask that covers outside the outer wave with khadi-pattern texture */}
          <path 
            d="M 0,0 L 1000,0 L 1000,1000 L 0,1000 Z M 40,40 C 300,15 700,25 960,40 C 985,300 975,700 960,960 C 700,985 300,975 40,960 C 15,700 25,300 40,40 Z"
            fill="url(#khadi-pattern-stencil)" 
            fillRule="evenodd"
          />

          {/* Outer wave: accent contour, defines page boundary */}
          <path 
            d="M 40,40 C 300,15 700,25 960,40 C 985,300 975,700 960,960 C 700,985 300,975 40,960 C 15,700 25,300 40,40 Z"
            fill="none" 
            stroke="var(--border-color-strong)" 
            strokeWidth="2.5" 
            strokeOpacity="1.0"
            className="transition-colors duration-300"
          />

          {/* Inner wave: same outline, 40% opacity, offset 20px inward from outer */}
          <path 
            d="M 60,60 C 310,35 690,45 940,60 C 965,310 955,690 940,940 C 690,965 310,955 60,940 C 35,690 45,310 60,60 Z"
            fill="none" 
            stroke="var(--border-color)" 
            strokeWidth="1.5" 
            strokeOpacity="0.4"
            className="transition-colors duration-300"
          />
        </svg>
      </div>

      <motion.div 
        className={`w-full max-w-7xl mx-auto ${customPadding} flex flex-col ${justifyClass} flex-grow relative z-10 ${className} transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={staggerContainerVariants}
      >
        {children}
      </motion.div>
    </section>
  );
};
