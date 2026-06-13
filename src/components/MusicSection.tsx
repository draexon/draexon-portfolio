/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Play, Pause, Headphones, Activity } from "lucide-react";
import { SongItem } from "../types";
import { SectionContainer, fadeInUpVariants } from "./SectionContainer";
import { Visualizer } from "./Visualizer";
import { CornerBrackets } from "./CornerBrackets";

interface MusicSectionProps {
  audioPlaying: boolean;
  activeTrackId: string | null;
  toggleAudio: () => void;
  playSpecificTrack: (trackId: string, variant: number) => void;
}

export const MusicSection: React.FC<MusicSectionProps> = ({
  audioPlaying,
  activeTrackId,
  playSpecificTrack,
}) => {
  const latestTracks: SongItem[] = [
    { id: "transient-echoes", title: "Transient Echoes", subtitle: "Evolving modular synth drones mapping tectonic drift.", streams: "340,000 streams", duration: "06:14", bpm: 72, key: "A Minor", coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=400&q=80", audioVariant: 0 },
    { id: "varanasi-market", title: "Varanasi Night Market", subtitle: "Field recordings layered with dense electronic syncopation.", streams: "510,000 streams", duration: "04:32", bpm: 114, key: "D Minor", coverUrl: "https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&w=400&q=80", audioVariant: 1 },
    { id: "sub-drift", title: "Sub-Continental Drift", subtitle: "Lo-fi vinyl hiss meets heavy low-frequency subs.", streams: "390,000 streams", duration: "05:08", bpm: 88, key: "E Minor", coverUrl: "https://images.unsplash.com/photo-1539625312161-1b5187799494?auto=format&fit=crop&w=400&q=80", audioVariant: 2 },
  ];

  const topTracks: SongItem[] = [
    { id: "silk-static", title: "Silk & Static", subtitle: "Warm, textured rhythm layers with micro-rhythmic delay lines.", streams: "1,200,000 streams", duration: "03:45", bpm: 110, key: "G# Major", coverUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80", audioVariant: 0 },
    { id: "monsoon-ritual", title: "Monsoon Ritual", subtitle: "Dynamic ambient sequences capturing heavy seasonal downpours.", streams: "840,000 streams", duration: "04:12", bpm: 95, key: "C Minor", coverUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=400&q=80", audioVariant: 1 },
    { id: "weavers-logic", title: "The Weaver's Logic", subtitle: "Procedural sound structures reflecting handloom loom drafts.", streams: "1,900,000 streams", duration: "05:22", bpm: 120, key: "A Minor", coverUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=400&q=80", audioVariant: 2 },
  ];

  const platforms = [
    { name: "Spotify", url: import.meta.env.VITE_MUSIC_SPOTIFY_URL },
    { name: "SoundCloud", url: import.meta.env.VITE_MUSIC_SOUNDCLOUD_URL },
    { name: "Bandcamp", url: import.meta.env.VITE_MUSIC_BANDCAMP_URL },
    { name: "YouTube Music", url: import.meta.env.VITE_MUSIC_YOUTUBE_MUSIC_URL },
  ];

  const renderTrackList = (tracks: SongItem[], label: string) => (
    <div className="space-y-8">
      <p className="font-mono text-xs text-saffron tracking-[0.2em] uppercase font-bold">{label}</p>
      <div className="divide-y divide-white/[0.08]">
        {tracks.map((track) => {
          const isCurrent = activeTrackId === track.id && audioPlaying;
          return (
            <article key={track.id} className="group relative overflow-visible px-6 py-10 md:px-8 md:py-14 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500 ease-in-out">
              <CornerBrackets />
              <div className="flex flex-col sm:grid sm:grid-cols-[1fr_auto] gap-6 sm:items-end">
                <div className="space-y-5">
                  <div className="font-mono text-[10px] text-saffron tracking-[0.18em] uppercase">
                    {track.bpm} BPM / {track.key} / {track.duration}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif italic font-bold text-text-main group-hover:text-saffron transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-sm text-text-dim leading-relaxed max-w-xl">{track.subtitle}</p>
                  <p className="text-[10px] font-mono text-text-dim/50 uppercase tracking-wider">{track.streams}</p>
                </div>
                <button
                  onClick={() => playSpecificTrack(track.id, track.audioVariant)}
                  className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors cursor-pointer ${
                    isCurrent ? "text-white" : "text-saffron hover:text-white"
                  }`}
                  title={isCurrent ? "Pause synthesized model" : "Play procedural loop"}
                >
                  {isCurrent ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isCurrent ? "Pause" : "Play"}</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );

  return (
    <SectionContainer id="music" className="space-y-20 md:space-y-28">
      <motion.div variants={fadeInUpVariants} className="border-b border-saffron/20 pb-8 md:pb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
        <div className="max-w-xl text-left">
          <p className="font-mono text-[10px] sm:text-xs text-saffron tracking-[0.3em] uppercase mb-2 sm:mb-3 font-semibold">// SOUND & PRODUCTION</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight">
            Aural <span className="italic font-normal text-saffron">Footprint.</span>
          </h2>
          <p className="mt-4 text-sm text-text-dim/70 leading-relaxed font-sans">
            Experimental structural ambient, bass architectures, and procedural modular synthesis. Grounding electronic computing with analog acoustic environments.
          </p>
        </div>
        <div className="group relative overflow-visible space-y-3 px-6 py-8 lg:text-right bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500 ease-in-out">
          <CornerBrackets />
          <span className="text-4xl md:text-5xl font-serif font-black tracking-tight text-saffron block">1,240,000</span>
          <span className="font-mono text-[10px] text-text-dim uppercase tracking-[0.2em] block">Total Spotify streams</span>
        </div>
      </motion.div>

      <motion.div variants={fadeInUpVariants} className="group relative overflow-visible space-y-6 px-6 py-8 md:px-10 md:py-10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500 ease-in-out">
        <CornerBrackets />
        <div className="flex justify-between items-center gap-6 font-mono text-[10px] text-saffron">
          <span className="flex items-center gap-2 font-bold uppercase tracking-wider"><Activity className="w-3.5 h-3.5" /> Synthesizer Oscillator</span>
          <span className={audioPlaying ? "text-white" : "text-text-dim/40"}>{audioPlaying ? "// LIVE" : "// STANDBY"}</span>
        </div>
        <div className="h-[120px] w-full relative">
          <Visualizer isPlaying={audioPlaying} activeTrackId={activeTrackId} />
        </div>
        <div className="flex justify-between items-center gap-4 text-[10px] font-mono text-text-dim/50 flex-wrap">
          <span className="flex items-center gap-2"><Headphones className="w-3.5 h-3.5 text-saffron" /> FEEDBACK DELAY / ANALOG HIGHPASS</span>
          <span>WAVE_SINE + WAVE_TRIANGLE</span>
        </div>
      </motion.div>

      <motion.div variants={fadeInUpVariants} className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-28">
        {renderTrackList(latestTracks, "// LATEST TRACKS")}
        {renderTrackList(topTracks, "// TOP TRACKS")}
      </motion.div>

      <motion.div variants={fadeInUpVariants} className="flex flex-col sm:flex-row justify-between gap-8 text-xs font-mono">
        <span className="text-text-dim/40">// STREAM CHANNELS</span>
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          {platforms.map((platform) => (
            <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer" className="text-saffron hover:text-white font-bold transition-colors uppercase tracking-widest">
              {platform.name}
            </a>
          ))}
        </div>
      </motion.div>
    </SectionContainer>
  );
};
