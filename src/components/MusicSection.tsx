/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Play, Pause, Headphones, Disc, ExternalLink, Activity, Radio, Music } from "lucide-react";
import { SongItem } from "../types";
import { SectionContainer, fadeInUpVariants } from "./SectionContainer";
import { Visualizer } from "./Visualizer";

interface MusicSectionProps {
  audioPlaying: boolean;
  activeTrackId: string | null;
  toggleAudio: () => void;
  playSpecificTrack: (trackId: string, variant: number) => void;
}

export const MusicSection: React.FC<MusicSectionProps> = ({
  audioPlaying,
  activeTrackId,
  toggleAudio,
  playSpecificTrack,
}) => {
  const latestTracks: SongItem[] = [
    {
      id: "transient-echoes",
      title: "Transient Echoes",
      subtitle: "Evolving modular synth drones mapping tectonic drift.",
      streams: "340,000 streams",
      duration: "06:14",
      bpm: 72,
      key: "A Minor",
      coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=400&q=80",
      audioVariant: 0
    },
    {
      id: "varanasi-market",
      title: "Varanasi Night Market",
      subtitle: "Field recordings layered with dense electronic syncopation.",
      streams: "510,000 streams",
      duration: "04:32",
      bpm: 114,
      key: "D Minor",
      coverUrl: "https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&w=400&q=80",
      audioVariant: 1
    },
    {
      id: "sub-drift",
      title: "Sub-Continental Drift",
      subtitle: "Lo-fi vinyl hiss meets heavy low-frequency subs.",
      streams: "390,000 streams",
      duration: "05:08",
      bpm: 88,
      key: "E Minor",
      coverUrl: "https://images.unsplash.com/photo-1539625312161-1b5187799494?auto=format&fit=crop&w=400&q=80",
      audioVariant: 2
    },
  ];

  const topTracks: SongItem[] = [
    {
      id: "silk-static",
      title: "Silk & Static",
      subtitle: "Warm, textured rhythm layers with micro-rhythmic delay lines.",
      streams: "1,200,000 streams",
      duration: "03:45",
      bpm: 110,
      key: "G# Major",
      coverUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80",
      audioVariant: 0
    },
    {
      id: "monsoon-ritual",
      title: "Monsoon Ritual",
      subtitle: "Dynamic ambient sequences capturing heavy seasonal downpours.",
      streams: "840,000 streams",
      duration: "04:12",
      bpm: 95,
      key: "C Minor",
      coverUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=400&q=80",
      audioVariant: 1
    },
    {
      id: "weavers-logic",
      title: "The Weaver's Logic",
      subtitle: "Procedural sound structures reflecting handloom loom drafts.",
      streams: "1,900,000 streams",
      duration: "05:22",
      bpm: 120,
      key: "A Minor",
      coverUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=400&q=80",
      audioVariant: 2
    },
  ];

  const platforms = [
    { name: "Spotify", url: import.meta.env.VITE_MUSIC_SPOTIFY_URL, icon: "🟢" },
    { name: "SoundCloud", url: import.meta.env.VITE_MUSIC_SOUNDCLOUD_URL, icon: "🟠" },
    { name: "Bandcamp", url: import.meta.env.VITE_MUSIC_BANDCAMP_URL, icon: "🔵" },
    { name: "YouTube Music", url: import.meta.env.VITE_MUSIC_YOUTUBE_MUSIC_URL, icon: "🔴" },
  ];

  return (
    <SectionContainer id="music" className="space-y-12">
      
      {/* Header Panel */}
      <motion.div 
        variants={fadeInUpVariants}
        className="border-b border-saffron/20 pb-8 md:pb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
      >
        <div className="max-w-xl text-left">
          <p className="font-mono text-[10px] sm:text-xs text-saffron tracking-[0.3em] uppercase mb-2 sm:mb-3 font-semibold">// SOUND & PRODUCTION</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight">
            Aural <span className="italic font-normal text-saffron">Footprint.</span>
          </h2>
          <p className="mt-4 text-sm text-text-dim/70 leading-relaxed font-sans">
            Experimental structural ambient, bass architectures, and procedural modular synthesis. Grounding electronic computing with analog acoustic environments.
          </p>
        </div>

        {/* Global streams stat cards */}
        <div className="p-6 border border-saffron/20 bg-bg-card text-left min-w-[280px] transition-colors duration-300">
          <span className="font-mono text-[9px] text-text-dim/50 uppercase tracking-widest block mb-1">SPOTIFY LISTENERS</span>
          <span className="text-3xl font-serif font-black tracking-tight text-saffron block">1,240,000 Streams</span>
          <span className="text-[10px] text-text-dim/40 font-mono tracking-wide block mt-1">// TOTAL MONITORED PLAYBACKS</span>
        </div>
      </motion.div>

      {/* Embedded Live Wave Visualizer (Pristine craft touch!) */}
      <motion.div 
        variants={fadeInUpVariants}
        className="border border-saffron/20 bg-bg-card flex flex-col transition-colors duration-300"
      >
        <div className="flex justify-between items-center px-4 py-2.5 border-b border-saffron/25 bg-bg-card-inset font-mono text-[10px] text-saffron transition-colors duration-300">
          <div className="flex items-center space-x-2">
            <Activity className="w-3.5 h-3.5" />
            <span className="font-bold uppercase">Synthesizer Oscillator Graph</span>
          </div>
          {audioPlaying ? (
            <span className="text-emerald-500 animate-pulse">// REAL-TIME WEB AUDIO GENERATOR ACTIVE</span>
          ) : (
            <span className="text-text-dim/30">// AMBIENT OSCILLATORS STANDBY</span>
          )}
        </div>
        <div className="h-[100px] w-full relative bg-bg-app/50">
          <Visualizer isPlaying={audioPlaying} activeTrackId={activeTrackId} />
        </div>
        <div className="p-4 bg-bg-card-inset flex justify-between items-center text-[10px] font-mono text-text-dim/50 flex-wrap gap-2 transition-colors duration-300">
          <span className="flex items-center space-x-1.5">
            <Headphones className="w-3.5 h-3.5 text-saffron" />
            <span>WEED BACK DELAY // ANALOG HIGHPASS ACTIVE</span>
          </span>
          <span className="text-saffron select-none">OSCILLATORS: WAVE_SINE + WAVE_TRIANGLE</span>
        </div>
      </motion.div>

      {/* Section Content: LATEST TRACKS ROW */}
      <motion.div 
        variants={fadeInUpVariants}
        className="space-y-6 pt-2"
      >
        <div className="flex items-center space-x-2 pb-2 border-b border-saffron/10">
          <Disc className="w-4 h-4 text-saffron stroke-[1.5]" />
          <span className="font-mono text-xs text-saffron tracking-[0.2em] uppercase font-bold">LATEST TRACKS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestTracks.map((item) => {
            const isCurrent = activeTrackId === item.id && audioPlaying;
            return (
              <div
                key={item.id}
                className={`group border ${
                  isCurrent ? "border-saffron" : "border-saffron/15"
                } bg-bg-card hover:border-saffron/40 transition-[border-color] duration-300 p-5 flex flex-col justify-between h-[230px]`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    {/* Artwork Placeholder */}
                    <div className="relative w-12 h-12 border border-saffron/10 overflow-hidden bg-black/10">
                      <img
                        src={item.coverUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover grayscale transition-transform duration-500 ${
                          isCurrent ? "animate-spin duration-10000" : "group-hover:grayscale-0 group-hover:scale-105"
                        }`}
                      />
                    </div>

                    {/* Play Synth Trigger Button */}
                    <button
                      onClick={() => playSpecificTrack(item.id, item.audioVariant)}
                      className={`p-2 rounded-none border ${
                        isCurrent
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border-saffron/20 bg-saffron/5 text-saffron hover:bg-saffron hover:text-[var(--bg)]"
                      } transition-colors cursor-pointer`}
                      title={isCurrent ? "Pause synthesized model" : "Play procedural loop"}
                    >
                      {isCurrent ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                  </div>

                  <h3 className="font-serif italic text-lg font-bold text-text-main group-hover:text-saffron transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-text-dim/50 font-sans line-clamp-2 mt-1">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-saffron/5 flex justify-between items-center text-[10px] font-mono">
                  <span className="text-saffron font-bold uppercase">{item.streams}</span>
                  {/* Platform Icons */}
                  <div className="flex space-x-1.5 text-xs">
                    <a href={import.meta.env.VITE_MUSIC_SPOTIFY_URL} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">🟢</a>
                    <a href={import.meta.env.VITE_MUSIC_SOUNDCLOUD_URL} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">🟠</a>
                    <a href={import.meta.env.VITE_MUSIC_BANDCAMP_URL} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">🔵</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Section Content: TOP TRACKS ROW */}
      <motion.div 
        variants={fadeInUpVariants}
        className="space-y-6 pt-4"
      >
        <div className="flex items-center space-x-2 pb-2 border-b border-saffron/10">
          <Disc className="w-4 h-4 text-saffron stroke-[1.5]" />
          <span className="font-mono text-xs text-saffron tracking-[0.2em] uppercase font-bold">TOP TRACKS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topTracks.map((item) => {
            const isCurrent = activeTrackId === item.id && audioPlaying;
            return (
              <div
                key={item.id}
                className={`group border ${
                  isCurrent ? "border-saffron" : "border-saffron/15"
                } bg-bg-card hover:border-saffron/40 transition-[border-color] duration-300 p-5 flex flex-col justify-between h-[230px]`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    {/* Artwork Placeholder */}
                    <div className="relative w-12 h-12 border border-saffron/10 overflow-hidden bg-black/10">
                      <img
                        src={item.coverUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover grayscale transition-transform duration-500 ${
                          isCurrent ? "animate-spin duration-10000" : "group-hover:grayscale-0 group-hover:scale-105"
                        }`}
                      />
                    </div>

                    {/* Play Synth Trigger Button */}
                    <button
                      onClick={() => playSpecificTrack(item.id, item.audioVariant)}
                      className={`p-2 rounded-none border ${
                        isCurrent
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border-saffron/20 bg-saffron/5 text-saffron hover:bg-saffron hover:text-[var(--bg)]"
                      } transition-colors cursor-pointer`}
                      title={isCurrent ? "Pause synthesized model" : "Play procedural loop"}
                    >
                      {isCurrent ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                  </div>

                  <h3 className="font-serif italic text-lg font-bold text-text-main group-hover:text-saffron transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-text-dim/50 font-sans line-clamp-2 mt-1">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-saffron/5 flex justify-between items-center text-[10px] font-mono">
                  <span className="text-saffron font-bold uppercase">{item.streams}</span>
                  {/* Platform Icons */}
                  <div className="flex space-x-1.5 text-xs">
                    <a href={import.meta.env.VITE_MUSIC_SPOTIFY_URL} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">🟢</a>
                    <a href={import.meta.env.VITE_MUSIC_SOUNDCLOUD_URL} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">🟠</a>
                    <a href={import.meta.env.VITE_MUSIC_BANDCAMP_URL} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">🔵</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Connect Strip (At the very bottom of the section) */}
      <motion.div 
        variants={fadeInUpVariants}
        className="pt-6 border-t border-saffron/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono"
      >
        <span className="text-text-dim/40">// SECURE STREAM NODE CHANNELS:</span>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {platforms.map((plat) => (
            <a
              key={plat.name}
              href={plat.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:px-4 sm:py-2 border border-saffron/15 bg-saffron/[0.02] hover:border-saffron hover:bg-saffron/10 text-text-dim/80 hover:text-saffron font-bold transition-[background-color,border-color,color] flex items-center space-x-2"
            >
              <span>{plat.icon}</span>
              <span className="tracking-widest uppercase">{plat.name}</span>
            </a>
          ))}
        </div>
      </motion.div>

    </SectionContainer>
  );
};
