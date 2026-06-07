/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ArrowDown, Github, Linkedin, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SectionContainer } from "./SectionContainer";

const DiscordIcon = ({ size = 22, className }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={className}
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>
  </svg>
);

const SpotifyIcon = ({ size = 22, className }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={className}
  >
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.98-.336.075-.67-.136-.746-.472-.075-.336.136-.67.472-.746 3.854-.88 7.15-.504 9.82 1.13.295.18.387.565.207.861zm1.226-2.723c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.08-1.182-.413.125-.848-.107-.973-.52-.125-.413.108-.847.52-.973 3.67-1.114 8.24-.57 11.35 1.343.366.226.486.707.26 1.074zm.106-2.828C14.332 8.713 8.39 8.513 4.93 9.564c-.53.16-1.09-.14-1.25-.67-.16-.53.14-1.09.67-1.25 3.96-1.202 10.53-.968 14.62 1.464.48.285.64.9.36 1.38-.29.48-.9.64-1.38.36z"/>
  </svg>
);

interface HomeSectionProps {
  setActiveTab: (tab: string) => void;
  audioPlaying: boolean;
  activeTrackId: string | null;
  onOpenCv: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  setActiveTab,
  audioPlaying,
  activeTrackId,
  onOpenCv,
}) => {
  const roles = ["Video Editor", "Music Producer", "Developer"];
  const [roleIndex, setRoleIndex] = useState(0);
  const socialLinks = {
    github: import.meta.env.VITE_GITHUB_URL,
    linkedin: import.meta.env.VITE_LINKEDIN_URL,
    discord: import.meta.env.VITE_DISCORD_URL,
    instagram: import.meta.env.VITE_INSTAGRAM_URL,
    spotify: import.meta.env.VITE_SPOTIFY_URL,
  };
  const portraitImages = {
    dark: import.meta.env.VITE_PORTRAIT_DARK_URL,
    light: import.meta.env.VITE_PORTRAIT_LIGHT_URL,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <SectionContainer
      id="home"
      wrapperClassName="relative overflow-hidden h-screen min-h-screen"
      customPadding="px-5 sm:px-8 md:px-16 lg:px-24 py-12 md:py-20 flex flex-col justify-between"
      justify="between"
    >
      
      {/* Decorative Border Line (Saffron) - Hidden on mobile, beautiful framing on larger screens */}
      <div className="hidden sm:block absolute left-8 lg:left-12 inset-y-0 w-[1px] bg-gradient-to-b from-saffron/0 via-saffron/30 to-saffron/0 z-10" />
      <div className="hidden sm:block absolute right-8 lg:right-12 inset-y-0 w-[1px] bg-gradient-to-b from-saffron/0 via-saffron/30 to-saffron/0 z-10" />

      {/* Intro Center Grid Content */}
      <div className="w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-20">
        
        {/* Left Column: Text & Navigation Controls (centered-left on desktop, centered on mobile) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col items-center lg:items-start text-center lg:text-left space-y-10 w-full">
          
          {/* Subtle Pretitle */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center space-x-3 text-xs tracking-[0.4em] text-saffron font-bold uppercase font-mono"
          >
            <span className="w-6 h-[1px] bg-saffron" />
            <span>HERITAGE AVANT-GARDE</span>
            <span className="w-6 h-[1px] bg-saffron" />
          </motion.div>

          {/* Display Title HERO */}
          <div className="space-y-6 w-full flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif tracking-[0.08em] font-extrabold uppercase relative select-none text-saffron leading-none"
            >
              DRAEXON
            </motion.h1>
            
            {/* Typewriter/Fade loop cycling through: Video Editor / Music Producer / Developer */}
            <div className="h-8 flex items-center justify-center lg:justify-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="text-saffron font-serif italic text-xl sm:text-2xl md:text-3xl tracking-widest"
                >
                  {roles[roleIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bare social icon links */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-[28px] pb-2 relative z-20 w-full">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-main hover:text-saffron transition-[color,opacity] duration-300 opacity-75 hover:opacity-100 flex flex-col items-center justify-center space-y-1.5 group"
              aria-label="GitHub"
            >
              <Github size={22} className="w-[22px] h-[22px] transition-transform group-hover:scale-110" />
              <span className="text-[9px] tracking-[0.2em] font-mono uppercase text-text-dim group-hover:text-saffron transition-colors">Github</span>
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-main hover:text-saffron transition-[color,opacity] duration-300 opacity-75 hover:opacity-100 flex flex-col items-center justify-center space-y-1.5 group"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} className="w-[22px] h-[22px] transition-transform group-hover:scale-110" />
              <span className="text-[9px] tracking-[0.2em] font-mono uppercase text-text-dim group-hover:text-saffron transition-colors">LinkedIn</span>
            </a>
            <a
              href={socialLinks.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-main hover:text-saffron transition-[color,opacity] duration-300 opacity-75 hover:opacity-100 flex flex-col items-center justify-center space-y-1.5 group"
              aria-label="Discord"
            >
              <DiscordIcon size={22} className="w-[22px] h-[22px] transition-transform group-hover:scale-110" />
              <span className="text-[9px] tracking-[0.2em] font-mono uppercase text-text-dim group-hover:text-saffron transition-colors">Discord</span>
            </a>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-main hover:text-saffron transition-[color,opacity] duration-300 opacity-75 hover:opacity-100 flex flex-col items-center justify-center space-y-1.5 group"
              aria-label="Instagram"
            >
              <Instagram size={22} className="w-[22px] h-[22px] transition-transform group-hover:scale-110" />
              <span className="text-[9px] tracking-[0.2em] font-mono uppercase text-text-dim group-hover:text-saffron transition-colors">Instagram</span>
            </a>
            <a
              href={socialLinks.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-main hover:text-saffron transition-[color,opacity] duration-300 opacity-75 hover:opacity-100 flex flex-col items-center justify-center space-y-1.5 group"
              aria-label="Spotify"
            >
              <SpotifyIcon size={22} className="w-[22px] h-[22px] transition-transform group-hover:scale-110" />
              <span className="text-[9px] tracking-[0.2em] font-mono uppercase text-text-dim group-hover:text-saffron transition-colors">Spotify</span>
            </a>
          </div>

          {/* Long horizontal divider with saffron split dot */}
          <div className="w-full max-w-sm flex items-center justify-center lg:justify-start space-x-4">
            <span className="h-[1px] bg-saffron/20 w-8 lg:w-4 flex-none" />
            <div className="w-2 h-2 bg-saffron rotate-45" />
            <span className="h-[1px] bg-saffron/20 flex-grow" />
          </div>

          {/* Editorial Subtext Bio */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4 }}
            className="max-w-2xl text-center lg:text-left font-sans text-sm sm:text-base leading-relaxed text-text-dim tracking-normal md:leading-loose"
          >
            Designing digital experiences through cinematography, sound synthesis, and clean codes.
            A dedicated creative workspace uniting age-old craft disciplines and high-performance computing frameworks.
          </motion.p>

          {/* Action buttons list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-4 w-full flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <button
              id="watch-cv-button"
              onClick={onOpenCv}
              className="w-full sm:w-auto relative cursor-pointer px-10 py-4 bg-saffron text-noir border border-saffron font-mono text-xs font-bold tracking-[0.25em] transition-[background-color,transform] duration-300 hover:bg-saffron/90 hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-lg shadow-saffron/15 font-extrabold text-noir"
            >
              <span>WATCH CV</span>
            </button>

            <button
              id="scroll-explore-button"
              onClick={() => setActiveTab("work")}
              className="w-full sm:w-auto relative cursor-pointer px-10 py-4 border border-saffron bg-transparent text-saffron font-mono text-xs font-bold tracking-[0.25em] transition-[background-color,color] duration-300 hover:bg-saffron hover:text-noir flex items-center justify-center space-x-2"
            >
              <span>SCROLL TO EXPLORE</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>

        {/* Right Column: Floating dissolved portrait profile image */}
        <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end items-center relative w-full mt-8 lg:mt-0">
          <div className="relative w-[240px] lg:w-[380px] aspect-[4/5] max-w-full overflow-hidden flex items-center justify-center">
            {/* Dark mode image (high-contrast, moody, luminosity, 0.75 opacity) */}
            <img
              src={portraitImages.dark}
              alt="DRAEXON Dark"
              className="img-dark absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              style={{
                objectFit: "contain",
              }}
            />
            {/* Light mode image (warmer tone, multiply, 0.65 opacity) */}
            <img
              src={portraitImages.light}
              alt="DRAEXON Light"
              className="img-light absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </div>

      </div>

    </SectionContainer>
  );
};
