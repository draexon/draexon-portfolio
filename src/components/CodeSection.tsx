/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { GitBranch, Star, Terminal, GitCommit, Code2, Layers } from "lucide-react";
import { SectionContainer, fadeInUpVariants } from "./SectionContainer";

export const CodeSection: React.FC = () => {
  // Languages structure (Saffron bars)
  const languages = [
    { name: "TypeScript / Node.js", pct: 95 },
    { name: "Rust / WebAssembly", pct: 82 },
    { name: "React / Solid.js / Vite", pct: 98 },
    { name: "Python / PyTorch AI", pct: 75 },
  ];

  // Generate a realistic 53 weeks x 7 days contribution grid array
  const totalDays = 371; // 53 weeks * 7
  const days = Array.from({ length: totalDays }, (_, i) => {
    const cluster = Math.sin(i * 0.15) * Math.cos(i * 0.05);
    let level = 0;
    if (cluster > 0.75) level = 4;
    else if (cluster > 0.45) level = 3;
    else if (cluster > 0.15) level = 2;
    else if (cluster > -0.15) level = 1;

    // Saffron noisy contributions
    if (Math.random() > 0.9) level = Math.floor(Math.random() * 5);

    const d = new Date();
    d.setDate(d.getDate() - (totalDays - i));
    const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    return { id: i, level, date: label, commits: level === 0 ? "No" : `${level * 2 + 1}` };
  });

  const weeks: typeof days[] = [];
  for (let i = 0; i < totalDays; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  // Generate structured months centered across columns
  const monthLabels: { label: string; index: number }[] = [];
  let prevMonth = "";
  weeks.forEach((week, index) => {
    const dateObj = new Date(week[0].date);
    const monthName = dateObj.toLocaleDateString("en-US", { month: "short" });
    if (monthName !== prevMonth) {
      monthLabels.push({ label: monthName, index });
      prevMonth = monthName;
    }
  });

  const [hoveredDay, setHoveredDay] = useState<{ date: string; commits: string } | null>(null);

  return (
    <SectionContainer id="code" className="space-y-12">
      
      {/* Editorial Header */}
      <motion.div 
        variants={fadeInUpVariants}
        className="border-b border-saffron/20 pb-8 md:pb-10"
      >
        <p className="font-mono text-[10px] sm:text-xs text-saffron tracking-[0.3em] uppercase mb-2 sm:mb-3 font-semibold">// ENGINEERING</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight">
          Architecture <span className="italic font-normal text-saffron">in logic,</span> poetry.
        </h2>
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-text-dim leading-relaxed font-sans max-w-2xl">
          Clean compilers, robust modular components, and highly responsive rendering engines. Developing performant TypeScript-to-Rust abstractions with high-contrast UI matrices.
        </p>
      </motion.div>

      {/* GitHub Contribution Graph Full Width */}
      <motion.div 
        variants={fadeInUpVariants}
        className="border border-saffron/20 bg-bg-card p-5 sm:p-6 flex flex-col space-y-4 transition-colors duration-300"
      >
        <div className="flex justify-between items-center flex-wrap gap-4 border-b border-saffron/10 pb-4">
          <div>
            <h3 className="font-serif italic text-base sm:text-lg text-text-main font-bold">Contribution Cadence</h3>
            <p className="text-[11px] text-text-dim/50 font-sans mt-0.5">
              Production commits, compiler iterations, and structural deployments logged over the current calendar cycle.
            </p>
          </div>
          {/* Tooltip display */}
          <div className="min-h-[28px] px-3 py-1 bg-saffron/5 border border-saffron/10 font-mono text-[10px] text-saffron flex items-center select-none font-bold">
            {hoveredDay ? (
              <span>{hoveredDay.date}: {hoveredDay.commits} commits</span>
            ) : (
              <span>HOVER DAY FOR TELEMETRY</span>
            )}
          </div>
        </div>

        {/* Scrollable Graph Frame */}
        <div className="overflow-x-auto pb-4 pt-1 -mx-2 px-2 scrollbar-thin">
          <div className="min-w-[760px] max-w-full flex flex-col select-none">
            {/* Month Header line */}
            <div className="relative h-5 text-[9px] font-mono text-text-dim/40 mb-1">
              {monthLabels.map((m, mIdx) => (
                <span
                  key={mIdx}
                  className="absolute"
                  style={{ left: `${m.index * 13.5 + 32}px` }}
                >
                  {m.label}
                </span>
              ))}
            </div>

            {/* Grid structure mapping */}
            <div className="flex gap-[3.5px]">
              {/* Left Day tags */}
              <div className="flex flex-col justify-between text-[9px] font-mono text-text-dim/40 w-7 h-[91px] pr-2 select-none leading-none pt-0.5">
                <span>Sun</span>
                <span>Tue</span>
                <span>Thu</span>
                <span>Sat</span>
              </div>

              {/* 53 Columns */}
              <div className="flex gap-[3.5px]">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[3.5px]">
                    {week.map((d) => (
                      <div
                        key={d.id}
                        onMouseEnter={() => setHoveredDay({ date: d.date, commits: d.commits })}
                        onMouseLeave={() => setHoveredDay(null)}
                        className="w-[10px] h-[10px] rounded-none transition-all duration-150 cursor-crosshair hover:ring-1 hover:ring-saffron hover:scale-110"
                        style={{
                          backgroundColor:
                            d.level === 0 ? "var(--bg-card-hover)" :
                            d.level === 1 ? "rgba(232, 88, 26, 0.2)" :
                            d.level === 2 ? "rgba(232, 88, 26, 0.45)" :
                            d.level === 3 ? "rgba(232, 88, 26, 0.7)" :
                            d.level === 4 ? "#E8581A" : "var(--bg-card-hover)"
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-2 text-[10px] font-mono text-text-dim/50 self-end pt-1">
          <span>Less</span>
          <span className="w-2.5 h-2.5 bg-bg-card-hover border border-saffron/10" />
          <span className="w-2.5 h-2.5 bg-[#E8581A]/20" />
          <span className="w-2.5 h-2.5 bg-[#E8581A]/45" />
          <span className="w-2.5 h-2.5 bg-[#E8581A]/70" />
          <span className="w-2.5 h-2.5 bg-[#E8581A]" />
          <span>More</span>
        </div>
      </motion.div>

      {/* Two columns below contribution graph */}
      <motion.div 
        variants={fadeInUpVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-2"
      >
        
        {/* Left Column: Languages */}
        <div className="border border-saffron/20 bg-bg-card p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-colors duration-300">
          <div>
            <h3 className="font-serif italic text-xl text-saffron font-bold">Languages</h3>
            <p className="text-xs text-text-dim/60 font-sans mt-1">
              Engineering proficiency mapped directly across production software commits.
            </p>
          </div>
          
          <div className="space-y-4">
            {languages.map((lang) => (
              <div key={lang.name} className="space-y-1.5">
                <div className="flex justify-between text-xs sm:text-sm font-mono">
                  <span className="text-text-main font-medium">{lang.name}</span>
                  <span className="text-saffron font-bold">{lang.pct}%</span>
                </div>
                <div className="w-full h-[3px] bg-saffron/10">
                  <div className="h-full bg-saffron" style={{ width: `${lang.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: VS Code Time */}
        <div className="border border-saffron/20 bg-bg-card p-6 sm:p-8 flex flex-col justify-between h-full min-h-[220px] transition-colors duration-300">
          <div>
            <h3 className="font-serif italic text-xl text-text-main font-bold">VS Code this week</h3>
            <p className="text-xs text-text-dim/60 font-sans mt-1">
              Active local directory sessions tracked automatically via development telemetry.
            </p>
          </div>
          
          <div className="pt-4 pb-2">
            <span className="text-5xl sm:text-6xl font-serif font-black tracking-tight text-saffron block">
              48.2 hrs
            </span>
            <span className="text-[10px] font-mono text-text-dim/50 uppercase tracking-widest block mt-2">
              // MEAN SPEED: 11,240 CHARS/HOUR // DEPOT ACCREDITED
            </span>
          </div>
        </div>

      </motion.div>

      {/* GitHub Summary Row */}
      <motion.div 
        variants={fadeInUpVariants}
        className="border border-saffron/20 bg-bg-card px-6 py-4 grid grid-cols-3 gap-4 items-center text-center divide-x divide-saffron/15 font-mono text-xs sm:text-sm transition-colors duration-300"
      >
        <div className="flex flex-col py-1">
          <span className="text-saffron font-bold text-base sm:text-lg">114 repos</span>
          <span className="text-[9px] text-text-dim/50 uppercase tracking-wider mt-0.5">Active Repositories</span>
        </div>
        <div className="flex flex-col py-1">
          <span className="text-text-main font-bold text-base sm:text-lg">8.2k commits</span>
          <span className="text-[9px] text-text-dim/50 uppercase tracking-wider mt-0.5">Total Commits (2026)</span>
        </div>
        <div className="flex flex-col py-1">
          <span className="text-saffron font-bold text-base sm:text-lg">TypeScript</span>
          <span className="text-[9px] text-text-dim/50 uppercase tracking-wider mt-0.5">Top Language</span>
        </div>
      </motion.div>

    </SectionContainer>
  );
};
