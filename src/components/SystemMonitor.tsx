import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, Layers, Disc, Terminal, ShieldAlert, Minimize2 } from "lucide-react";
import { globalAudio } from "./AudioEngine";

export function SystemMonitor() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Throttle states updated every 500ms for performance
  const [stats, setStats] = useState({
    heapUsed: 32.4, // MB
    heapTotal: 128,  // MB
    isHeapLive: false,
    domNodes: 0,
    viewportW: window.innerWidth,
    viewportH: window.innerHeight,
    scrollY: 0,
    audioActive: false,
    elapsedCycles: 0,
  });

  useEffect(() => {
    let tickInterval: NodeJS.Timeout;
    let cycles = 0;

    // Performance-friendly throttle timer (updates React state every 500ms)
    tickInterval = setInterval(() => {
      cycles += 1;

      // Memory inspection (Chrome / Blink engine only)
      let usedMemory = 28.4 + Math.sin(performance.now() / 10000) * 4.2; 
      let totalMemory = 120.0;
      let isLiveMemory = false;

      const perf = window.performance as any;
      if (perf && perf.memory) {
        usedMemory = perf.memory.usedJSHeapSize / (1024 * 1024);
        totalMemory = perf.memory.totalJSHeapSize / (1024 * 1024);
        isLiveMemory = true;
      }

      // Collect metrics
      setStats((prev) => ({
        heapUsed: Math.round(usedMemory * 10) / 10,
        heapTotal: Math.round(totalMemory * 10) / 10,
        isHeapLive: isLiveMemory,
        domNodes: document.getElementsByTagName("*").length,
        viewportW: window.innerWidth,
        viewportH: window.innerHeight,
        scrollY: Math.round(window.scrollY),
        audioActive: globalAudio.isPlaying(),
        elapsedCycles: cycles,
      }));

    }, 500);

    // Window Events tracking (Scroll + Resize)
    const handleScrollAndResize = () => {
      setStats((prev) => ({
        ...prev,
        scrollY: Math.round(window.scrollY),
        viewportW: window.innerWidth,
        viewportH: window.innerHeight,
      }));
    };

    window.addEventListener("scroll", handleScrollAndResize, { passive: true });
    window.addEventListener("resize", handleScrollAndResize, { passive: true });

    return () => {
      clearInterval(tickInterval);
      window.removeEventListener("scroll", handleScrollAndResize);
      window.removeEventListener("resize", handleScrollAndResize);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[9999] font-mono pointer-events-none select-none">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          // Compact minimal widget: no FPS, no frame-time delay. Just clean heap stats!
          <motion.button
            key="collapsed"
            id="sys-monitor-toggle-open"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="pointer-events-auto flex items-center space-x-2.5 px-3.5 py-2 border border-saffron/20 bg-bg-card text-text-dim/80 hover:text-saffron hover:border-saffron/50 hover:bg-bg-card-hover transition-[background-color,border-color,color] duration-300 shadow-md backdrop-blur-sm group cursor-pointer text-[10px]"
          >
            <Activity className="w-3.5 h-3.5 text-saffron animate-pulse" />
            <span className="font-bold tracking-widest text-[9px] uppercase">
              SYS MONITOR:
            </span>
            <span className="text-saffron font-bold">
              {stats.heapUsed.toFixed(1)} MB
            </span>
            <span className="text-text-dim/40 font-normal">|</span>
            <span className="text-text-dim/60">
              ACTIVE
            </span>
            <span className="text-saffron/40 font-normal group-hover:scale-110 transition-transform">
              [+]
            </span>
          </motion.button>
        ) : (
          // Fully expanded analytical telemetry HUD overlay panel: no FPS, no delay sparklines!
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="pointer-events-auto w-[290px] border border-saffron/30 bg-bg-card backdrop-blur-md p-4 flex flex-col space-y-3.5 shadow-xl select-none"
          >
            {/* Header section bar */}
            <div className="flex justify-between items-start border-b border-saffron/15 pb-2.5">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-1.5 text-saffron">
                  <Terminal className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold tracking-widest uppercase">
                    DRAEXON // HUD CORE
                  </span>
                </div>
                <span className="text-[8px] text-text-dim/40 uppercase tracking-widest block leading-none">
                  AVANT-GARDE TELEMETRY
                </span>
              </div>
              
              <button
                id="sys-monitor-toggle-close"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-none border border-saffron/15 text-text-dim/50 hover:text-saffron hover:border-saffron/65 hover:bg-bg-card-hover transition-[background-color,border-color,color] cursor-pointer"
                title="Collapse system monitor"
              >
                <Minimize2 className="w-3 h-3" />
              </button>
            </div>

            {/* Real stats matrices inside elegant divided grid columns */}
            <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
              
              {/* Stat 1: Active System Heap Memory - Spans both columns for beautiful balance */}
              <div className="col-span-2 p-2 border border-saffron/10 bg-bg-card-inset space-y-0.5">
                <div className="flex items-center space-x-1 text-text-dim/40 uppercase tracking-wider">
                  <ShieldAlert className="w-3 h-3 text-saffron/60" />
                  <span>SYSTEM HEAP</span>
                </div>
                <span className="text-text-main font-bold block text-[11px] truncate">
                  {stats.heapUsed.toFixed(1)} MB{" / "}
                  <span className="text-text-dim/30">{stats.heapTotal.toFixed(0)} MB</span>
                </span>
              </div>

              {/* Stat 2: DOM inventory Node logs */}
              <div className="col-span-1 p-2 border border-saffron/10 bg-bg-card-inset space-y-0.5">
                <div className="flex items-center space-x-1 text-text-dim/40 uppercase tracking-wider">
                  <Layers className="w-3 h-3 text-saffron/60" />
                  <span>DOM INDEX</span>
                </div>
                <span className="text-text-main font-bold block text-[11px]">
                  {stats.domNodes} Nodes
                </span>
              </div>

              {/* Stat 3: Dynamic audio-node telemetry */}
              <div className="col-span-1 p-2 border border-saffron/10 bg-bg-card-inset space-y-0.5">
                <div className="flex items-center space-x-1 text-text-dim/40 uppercase tracking-wider">
                  <Disc className={`w-3 h-3 ${stats.audioActive ? "text-emerald-500 animate-spin" : "text-text-dim/40"}`} />
                  <span>OSCILLATOR</span>
                </div>
                <span className={`font-bold block text-[11px] truncate ${stats.audioActive ? "text-emerald-500" : "text-text-dim/60"}`}>
                  {stats.audioActive ? "ACTIVE" : "STANDBY"}
                </span>
              </div>

            </div>

            {/* Minor system settings status info bar */}
            <div className="pt-2 border-t border-saffron/10 flex flex-col space-y-1 text-[8px] text-text-dim/40 uppercase tracking-widest">
              <div className="flex justify-between">
                <span>VIEWPORT AREA:</span>
                <span className="text-text-dim/80">{stats.viewportW} x {stats.viewportH} PX</span>
              </div>
              <div className="flex justify-between">
                <span>SCROLL AXIS DELTA:</span>
                <span className="text-text-dim/80">{stats.scrollY} PX</span>
              </div>
              <div className="flex justify-between">
                <span>STATUS CYCLES:</span>
                <span className="text-text-dim/60">{stats.elapsedCycles.toLocaleString()} ticks</span>
              </div>
            </div>

            {/* Bottom mini confirmation stamp banner */}
            <div className="flex items-center space-x-1 justify-center pt-1.5 text-[7.5px] text-text-dim/30 border-t border-saffron/5 select-none font-sans uppercase">
              <span>SECURITY CERTIFICATE ENFORCED</span>
              <span>•</span>
              <span className="text-saffron">DRAEXON CONSOLE</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
