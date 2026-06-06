/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Menu, X, Play, Square, Headphones, Sun, Moon } from "lucide-react";
import { globalAudio } from "./AudioEngine";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  audioPlaying: boolean;
  activeTrackId: string | null;
  toggleAudio: () => void;
  theme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  audioPlaying,
  activeTrackId,
  toggleAudio,
  theme,
  setTheme
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at the top of the viewport
      if (currentScrollY < 12) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const tabs = [
    { id: "home", label: "HOME" },
    { id: "work", label: "WORK" },
    { id: "edits", label: "EDITS" },
    { id: "music", label: "MUSIC" },
    { id: "code", label: "CODE" },
    { id: "blog", label: "THE JOURNAL" },
    { id: "contact", label: "CONTACT" },
  ];

  const shouldBeVisible = isVisible || isOpen;

  return (
    <nav className={`w-full bg-bg-nav/95 backdrop-blur-md border-b border-saffron/20 fixed top-0 left-0 right-0 z-50 text-text-main transition-all duration-300 ease-in-out ${
      shouldBeVisible ? "translate-y-0" : "-translate-y-full"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => setActiveTab("home")}
              className="text-2xl font-serif tracking-[0.2em] hover:text-saffron transition-colors duration-300 font-bold flex items-center"
            >
              D R A E X O N
            </button>
            <span className="ml-4 text-xs font-mono text-saffron/50 hidden md:inline tracking-[0.2em]">
              // EST. 2026
            </span>
          </div>

          {/* Desktop Nav Tabs */}
          <div className="hidden lg:flex items-center space-x-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-3 text-xs tracking-[0.25em] font-sans font-medium transition-colors duration-300 ${
                    isActive ? "text-saffron font-semibold" : "text-text-dim hover:text-text-main"
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-saffron" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Audio State Deck & Theme controls */}
          <div className="hidden sm:flex items-center space-x-4 border-l border-saffron/20 pl-6">
            
            {/* Clean minimalist theme switcher */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 border border-saffron/25 text-text-dim hover:text-saffron hover:border-saffron transition-all duration-300 flex items-center justify-center cursor-pointer"
              title={theme === "dark" ? "Switch to White Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5 stroke-[1.5]" /> : <Moon className="w-3.5 h-3.5 stroke-[1.5]" />}
            </button>

            {activeTrackId && (
              <div className="flex items-center space-x-2">
                <span className="animate-pulse w-2 h-2 bg-saffron" />
                <span className="font-mono text-[10px] text-saffron/80 tracking-wider truncate max-w-[120px]">
                  ON DECK // PLAYING
                </span>
              </div>
            )}
            <button
              onClick={toggleAudio}
              className={`p-2.5 border rounded-none cursor-pointer flex items-center justify-center transition-all duration-300 ${
                activeTrackId
                  ? "bg-saffron/10 border-saffron hover:bg-saffron/20 text-saffron"
                  : "border-saffron/30 hover:border-saffron text-text-dim hover:text-text-main"
              }`}
              title={activeTrackId ? "Stop procedural playback" : "Listen to ambient synth"}
            >
              {audioPlaying ? (
                <X className="w-3.5 h-3.5" />
              ) : (
                <Headphones className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-3 lg:hidden">
            {/* Mobile quick theme switcher */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 border border-saffron/25 text-text-dim hover:text-saffron hover:border-saffron transition-all duration-300 flex items-center justify-center"
              title={theme === "dark" ? "Switch to White Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5 stroke-[1.5]" /> : <Moon className="w-3.5 h-3.5 stroke-[1.5]" />}
            </button>

            {/* Quick mobile audio toggle */}
            <button
              onClick={toggleAudio}
              className={`p-2 border rounded-none cursor-pointer flex items-center justify-center transition-all duration-300 ${
                activeTrackId ? "bg-saffron/15 border-saffron text-saffron" : "border-saffron/25 text-text-dim"
              }`}
            >
              {audioPlaying ? <X className="w-3.5 h-3.5" /> : <Headphones className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 border border-saffron/20 rounded-none text-text-dim hover:text-text-main hover:border-saffron/50 focus:outline-none"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-saffron/20 bg-bg-nav/95 backdrop-blur-md transition-all duration-300">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 text-center">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsOpen(false);
                  }}
                  className={`block w-full py-4 text-xs tracking-[0.3em] font-sans font-medium hover:bg-saffron/5 transition-colors ${
                    isActive ? "text-saffron border-l-2 border-saffron bg-saffron/5 font-bold" : "text-text-dim"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};
