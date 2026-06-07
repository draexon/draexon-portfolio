/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Navbar } from "./components/Navbar";
import { HomeSection } from "./components/HomeSection";
import { WorkSection } from "./components/WorkSection";
import { EditsSection } from "./components/EditsSection";
import { MusicSection } from "./components/MusicSection";
import { CodeSection } from "./components/CodeSection";
import { BlogSection } from "./components/BlogSection";
import { ContactSection } from "./components/ContactSection";
import { globalAudio } from "./components/AudioEngine";
import { CustomCursor } from "./components/CustomCursor";
import { SystemMonitor } from "./components/SystemMonitor";
import { CvModal } from "./components/CvModal";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [isCvOpen, setIsCvOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("theme");
    return (saved as "dark" | "light") || "dark";
  });
  const appliedThemeRef = useRef<"dark" | "light" | null>(null);

  const applyThemeAttribute = (nextTheme: "dark" | "light") => {
    if (appliedThemeRef.current === nextTheme) return;
    document.documentElement.setAttribute("data-theme", nextTheme);
    appliedThemeRef.current = nextTheme;
  };

  // Synchronize theme with <html> element.
  useLayoutEffect(() => {
    applyThemeAttribute(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const switchTheme = (nextTheme: "dark" | "light") => {
    applyThemeAttribute(nextTheme);
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  // Synchronize state periodically with global audio engine parameters
  useEffect(() => {
    const handleSync = setInterval(() => {
      setAudioPlaying(globalAudio.isPlaying());
      setActiveTrackId(globalAudio.getActiveTrack());
    }, 200);

    return () => {
      clearInterval(handleSync);
      // Safeguard: Stop sound when hot reloading or closing
      globalAudio.stop();
    };
  }, []);

  // Dynamic scrolling handler
  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      // Offset scrolling slightly to account for the sticky 80px high navbar
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // IntersectionObserver to auto-update active tab on scroll
  useEffect(() => {
    const list = ["home", "work", "edits", "music", "code", "blog", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // High-accuracy focal center targeting
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    }, observerOptions);

    list.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Play a random procedural atmospheric loop
  const toggleAudio = () => {
    if (globalAudio.isPlaying()) {
      globalAudio.stop();
      setAudioPlaying(false);
      setActiveTrackId(null);
    } else {
      // Default ambient drone loop is variant 0 "Transient Echoes"
      globalAudio.start("transient-echoes", 0);
      setAudioPlaying(true);
      setActiveTrackId("transient-echoes");
    }
  };

  const playSpecificTrack = (trackId: string, variant: number) => {
    if (globalAudio.isPlaying() && globalAudio.getActiveTrack() === trackId) {
      globalAudio.stop();
      setAudioPlaying(false);
      setActiveTrackId(null);
    } else {
      globalAudio.start(trackId, variant);
      setAudioPlaying(true);
      setActiveTrackId(trackId);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-text-main flex flex-col justify-between selection:bg-saffron selection:text-[var(--bg)] pt-20">
      
      {/* Avant-garde Tactile Custom Cursor */}
      <CustomCursor />
      
      {/* System Monitor HUD Overlay */}
      <SystemMonitor />
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={scrollToSection}
        audioPlaying={audioPlaying}
        activeTrackId={activeTrackId}
        toggleAudio={toggleAudio}
        theme={theme}
        setTheme={switchTheme}
      />

      {/* Pages Container Frame (Continuous vertical flow) */}
      <main className="flex-grow flex flex-col">
        
        <HomeSection
          setActiveTab={scrollToSection}
          audioPlaying={audioPlaying}
          activeTrackId={activeTrackId}
          onOpenCv={() => setIsCvOpen(true)}
        />
        
        <div className="w-full h-8" /> {/* Section Gap spacers */}

        <WorkSection setActiveTab={scrollToSection} />

        <div className="w-full h-8" />

        <EditsSection />

        <div className="w-full h-8" />

        <MusicSection
          audioPlaying={audioPlaying}
          activeTrackId={activeTrackId}
          toggleAudio={toggleAudio}
          playSpecificTrack={playSpecificTrack}
        />

        <div className="w-full h-8" />

        <CodeSection />

        <div className="w-full h-8" />

        <BlogSection />

        <div className="w-full h-8" />

        <ContactSection />

      </main>

      {/* Footer copyright */}
      <footer className="w-full bg-bg-app border-t border-border-theme/20 py-6 text-center text-[10px] font-mono text-text-dim/50 tracking-wider">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>DRAEXON © 2026 // ALL CODES, CINEMATICS & SYSTEMS ENFORCED</span>
          <span className="text-saffron font-bold">HERITAGE WEAVE // AVANT-GARDE COMPUTER</span>
        </div>
      </footer>

      {/* Curriculum CV Document Viewer Modal */}
      <CvModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />

    </div>
  );
}
