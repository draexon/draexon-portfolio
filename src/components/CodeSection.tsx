/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { GitBranch, Star, Terminal, GitCommit, Code2, Layers } from "lucide-react";
import { SectionContainer, fadeInUpVariants } from "./SectionContainer";
import { CornerBrackets } from "./CornerBrackets";

type LanguageStat = {
  name: string;
  pct: number;
};

type Contribution = {
  date: string;
  count: number;
  level: number;
};

type GitHubStats = {
  repos: string;
  commits: string;
  stars: string;
  topLanguage: string;
};

const fallbackGitHubStats: GitHubStats = {
  repos: "114",
  commits: "8.2k",
  stars: "0",
  topLanguage: "TypeScript",
};

const formatGitHubCount = (count: number) => {
  if (!Number.isFinite(count) || count < 0) return "0";
  if (count < 1000) return String(count);

  const formatted = (count / 1000).toFixed(1).replace(/\.0$/, "");
  return `${formatted}k`;
};

const fallbackLanguages: LanguageStat[] = [
  { name: "TypeScript / Node.js", pct: 95 },
  { name: "Rust / WebAssembly", pct: 82 },
  { name: "React / Solid.js / Vite", pct: 98 },
  { name: "Python / PyTorch AI", pct: 75 },
];

const wakatimeLanguagesShareUrl =
  "https://wakatime.com/share/@030bf6b4-bc5f-4420-b010-64bcee8bb8fd/c12d9f5c-e2e4-4a5b-b17d-6fdb3655c8be.json";
const wakatimeCodingActivityShareUrl =
  "https://wakatime.com/share/@030bf6b4-bc5f-4420-b010-64bcee8bb8fd/a7a7022e-7a84-4419-af7c-b7671b256334.json";

const totalContributionDays = 371;
const fallbackContributions: Contribution[] = Array.from(
  { length: totalContributionDays },
  (_, index) => {
    const cluster = Math.sin(index * 0.15) * Math.cos(index * 0.05);
    let level = 0;
    if (cluster > 0.75) level = 4;
    else if (cluster > 0.45) level = 3;
    else if (cluster > 0.15) level = 2;
    else if (cluster > -0.15) level = 1;

    if (Math.random() > 0.9) level = Math.floor(Math.random() * 5);

    const date = new Date();
    date.setDate(date.getDate() - (totalContributionDays - index));

    return {
      date: date.toISOString().slice(0, 10),
      count: level === 0 ? 0 : level * 2 + 1,
      level,
    };
  },
);

export const CodeSection: React.FC = () => {
  const githubUsername = import.meta.env.VITE_GITHUB_USERNAME;
  const [githubStats, setGithubStats] = useState<GitHubStats>({
    repos: "...",
    commits: "...",
    stars: "...",
    topLanguage: "...",
  });
  const [wakaLanguages, setWakaLanguages] = useState<{ name: string; pct: number }[]>([]);
  const [wakaHours, setWakaHours] = useState<string | null>(null);
  const [isWakaTimeLoading, setIsWakaTimeLoading] = useState<boolean>(true);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const languages = fallbackLanguages;

  const contributionPadding: Contribution[] = contributions.length > 0
    ? Array.from(
        { length: Math.max(totalContributionDays - contributions.length, 0) },
        (_, index, padding) => {
          const date = new Date(`${contributions[0].date}T00:00:00`);
          date.setDate(date.getDate() - (padding.length - index));
          return { date: date.toISOString().slice(0, 10), count: 0, level: 0 };
        },
      )
    : [];
  const days = contributions.length > 0
    ? [...contributionPadding, ...contributions]
    : fallbackContributions;

  const weeks: typeof days[] = [];
  for (let i = 0; i < totalContributionDays; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  // Generate structured months centered across columns
  const monthLabels: { label: string; index: number }[] = [];
  let prevMonth = "";
  weeks.forEach((week, index) => {
    if (week.length === 0) return;
    const dateObj = new Date(`${week[0].date}T00:00:00`);
    const monthName = dateObj.toLocaleDateString("en-US", { month: "short" });
    if (monthName !== prevMonth) {
      monthLabels.push({ label: monthName, index });
      prevMonth = monthName;
    }
  });

  const [hoveredDay, setHoveredDay] = useState<{ date: string; commits: number } | null>(null);

  useEffect(() => {
    if (!githubUsername) return;

    let isMounted = true;
    fetch(`https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`)
      .then((response) => {
        if (!response.ok) throw new Error("GitHub contributions request failed.");
        return response.json();
      })
      .then((data: { contributions?: Contribution[] }) => {
        if (!isMounted || !Array.isArray(data.contributions) || data.contributions.length === 0) return;

        const realContributions = data.contributions
          .filter((day) =>
            typeof day.date === "string" &&
            Number.isFinite(day.count) &&
            Number.isFinite(day.level)
          )
          .slice(-totalContributionDays);

        if (realContributions.length > 0) setContributions(realContributions);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [githubUsername]);

  useEffect(() => {
    let isMounted = true;
    setGithubStats({ repos: "...", commits: "...", stars: "...", topLanguage: "..." });

    if (!githubUsername) {
      setGithubStats(fallbackGitHubStats);
      return () => {
        isMounted = false;
      };
    }

    const requestJson = async (url: string, init?: RequestInit) => {
      const response = await fetch(url, init);
      if (!response.ok) {
        throw new Error(`GitHub request failed with status ${response.status}.`);
      }
      return response.json();
    };

    Promise.all([
      requestJson(`https://api.github.com/users/${githubUsername}`),
      requestJson(`https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`),
      requestJson(`https://api.github.com/search/commits?q=author:${githubUsername}&per_page=1`, {
        headers: { Accept: "application/vnd.github.cloak-preview" },
      }),
    ])
      .then(([user, repos, commits]: [any, any[], any]) => {
        if (!isMounted) return;

        const languageCounts = repos.reduce<Record<string, number>>((counts, repo) => {
          if (typeof repo.language === "string") {
            counts[repo.language] = (counts[repo.language] ?? 0) + 1;
          }
          return counts;
        }, {});
        const topLanguage = Object.entries(languageCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
        const totalStars = repos.reduce(
          (total, repo) => total + (typeof repo.stargazers_count === "number" ? repo.stargazers_count : 0),
          0,
        );

        setGithubStats({
          repos: formatGitHubCount(Number(user.public_repos)),
          commits: formatGitHubCount(Number(commits.total_count)),
          stars: formatGitHubCount(totalStars),
          topLanguage: topLanguage ?? fallbackGitHubStats.topLanguage,
        });
      })
      .catch(() => {
        if (isMounted) setGithubStats(fallbackGitHubStats);
      });

    return () => {
      isMounted = false;
    };
  }, [githubUsername]);

  useEffect(() => {
    let isMounted = true;
    let completedRequests = 0;
    setIsWakaTimeLoading(true);

    const markRequestComplete = () => {
      completedRequests += 1;
      if (isMounted && completedRequests === 2) {
        setIsWakaTimeLoading(false);
      }
    };

    (window as any).wakatimeLanguagesCallback = (response: any) => {
      console.log("Languages data:", JSON.stringify(response, null, 2));

      if (isMounted && Array.isArray(response?.data)) {
        const languages = response.data
          .slice(0, 4)
          .map((language: any) => ({
            name: language.name,
            pct: Math.round(Number(language.percent)),
          }))
          .filter((language: LanguageStat) =>
            typeof language.name === "string" && Number.isFinite(language.pct)
          );

        setWakaLanguages(languages);
      }

      markRequestComplete();
    };

    (window as any).wakatimeCodingActivityCallback = (response: any) => {
      console.log("Activity data:", JSON.stringify(response, null, 2));

      if (isMounted) {
        const activityDays = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response?.days)
            ? response.days
            : [];
        const totalSeconds = activityDays.reduce(
          (sum: number, day: any) => sum + Number(day?.grand_total?.total_seconds || 0),
          0,
        );
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        setWakaHours(`${hours} hrs ${minutes} mins`);
      }

      markRequestComplete();
    };

    const languagesScript = document.createElement("script");
    languagesScript.id = "wakatimeLanguagesScript";
    languagesScript.src = `${wakatimeLanguagesShareUrl}?callback=wakatimeLanguagesCallback`;
    languagesScript.onerror = markRequestComplete;

    const activityScript = document.createElement("script");
    activityScript.id = "wakatimeCodingActivityScript";
    activityScript.src = `${wakatimeCodingActivityShareUrl}?callback=wakatimeCodingActivityCallback`;
    activityScript.onerror = markRequestComplete;

    document.body.append(languagesScript, activityScript);

    return () => {
      isMounted = false;
      languagesScript.remove();
      activityScript.remove();
      delete (window as any).wakatimeLanguagesCallback;
      delete (window as any).wakatimeCodingActivityCallback;
    };
  }, []);

  const displayedLanguages = wakaLanguages.length > 0 ? wakaLanguages : languages;

  return (
    <SectionContainer id="code" className="space-y-20 md:space-y-28">
      
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
        className="group relative overflow-visible flex flex-col space-y-8 px-6 py-8 md:px-10 md:py-10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500 ease-in-out"
      >
        <CornerBrackets />
        <div className="flex justify-between items-end flex-wrap gap-8">
          <div>
            <h3 className="font-serif italic text-base sm:text-lg text-text-main font-bold">Contribution Cadence</h3>
            <p className="text-[11px] text-text-dim/50 font-sans mt-0.5">
              Production commits, compiler iterations, and structural deployments logged over the current calendar cycle.
            </p>
          </div>
          {/* Tooltip display */}
          <div className="min-h-[28px] font-mono text-[10px] text-saffron flex items-center select-none font-bold">
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
                        key={d.date}
                        onMouseEnter={() => setHoveredDay({ date: d.date, commits: d.count })}
                        onMouseLeave={() => setHoveredDay(null)}
                        className="w-[10px] h-[10px] rounded-none transition-[transform,box-shadow] duration-150 cursor-crosshair hover:ring-1 hover:ring-saffron hover:scale-110"
                        style={{
                          backgroundColor:
                            d.level === 0 ? "var(--bg-card-hover)" :
                            d.level === 1 ? "color-mix(in srgb, var(--saffron) 20%, transparent)" :
                            d.level === 2 ? "color-mix(in srgb, var(--saffron) 45%, transparent)" :
                            d.level === 3 ? "color-mix(in srgb, var(--saffron) 70%, transparent)" :
                            d.level === 4 ? "var(--saffron)" : "var(--bg-card-hover)"
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
          <span className="w-2.5 h-2.5 bg-[color-mix(in_srgb,var(--saffron)_20%,transparent)]" />
          <span className="w-2.5 h-2.5 bg-[color-mix(in_srgb,var(--saffron)_45%,transparent)]" />
          <span className="w-2.5 h-2.5 bg-[color-mix(in_srgb,var(--saffron)_70%,transparent)]" />
          <span className="w-2.5 h-2.5 bg-saffron" />
          <span>More</span>
        </div>
      </motion.div>

      {/* Two columns below contribution graph */}
      <motion.div 
        variants={fadeInUpVariants}
        className="grid grid-cols-2 gap-0 items-stretch"
      >
        
        {/* Left Column: Languages */}
        <div className="group relative overflow-visible flex min-h-[280px] flex-col justify-between space-y-10 px-6 py-8 md:px-8 md:py-10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500 ease-in-out">
          <CornerBrackets />
          <div>
            <h3 className="font-serif italic text-xl text-saffron font-bold">Languages</h3>
            <p className="text-xs text-text-dim/60 font-sans mt-1">
              Engineering proficiency mapped directly across production software commits.
            </p>
          </div>
          
          <div className="space-y-4">
            {isWakaTimeLoading && (
              <div className="text-[10px] font-mono text-text-dim/50 uppercase tracking-widest">
                Loading WakaTime languages...
              </div>
            )}
            {displayedLanguages.map((lang) => (
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
        <div className="group relative overflow-visible flex min-h-[280px] flex-col justify-between px-6 py-8 md:px-8 md:py-10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500 ease-in-out">
          <CornerBrackets />
          <div>
            <h3 className="font-serif italic text-xl text-text-main font-bold">VS Code this week</h3>
            <p className="text-xs text-text-dim/60 font-sans mt-1">
              Active local directory sessions tracked automatically via development telemetry.
            </p>
          </div>
          
          <div className="pt-4 pb-2">
            <span className="text-5xl sm:text-6xl font-serif font-black tracking-tight text-saffron block">
              {isWakaTimeLoading ? "..." : wakaHours ?? "48.2 hrs"}
            </span>
            <span className="text-[10px] font-mono text-text-dim/50 uppercase tracking-widest block mt-2">
              // WAKATIME LAST 7 DAYS // {wakaHours ? "LIVE TELEMETRY" : "FALLBACK ACTIVE"}
            </span>
          </div>
        </div>

      </motion.div>

      {/* GitHub Summary Row */}
      <motion.div 
        variants={fadeInUpVariants}
        className="grid grid-cols-4 gap-0 items-start font-mono text-xs sm:text-sm"
      >
        <div className="group relative overflow-visible flex h-[160px] flex-col gap-3 px-6 py-8 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500 ease-in-out">
          <CornerBrackets />
          <span className="text-saffron font-serif font-bold text-4xl lg:text-5xl">{githubStats.repos}</span>
          <span className="text-[9px] text-text-dim/50 uppercase tracking-wider mt-0.5">Active Repositories</span>
        </div>
        <div className="group relative overflow-visible flex h-[160px] flex-col gap-3 px-6 py-8 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500 ease-in-out">
          <CornerBrackets />
          <span className="text-saffron font-serif font-bold text-4xl lg:text-5xl">{githubStats.commits}</span>
          <span className="text-[9px] text-text-dim/50 uppercase tracking-wider mt-0.5">Total Commits</span>
        </div>
        <div className="group relative overflow-visible flex h-[160px] flex-col gap-3 px-6 py-8 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500 ease-in-out">
          <CornerBrackets />
          <span className="text-saffron font-serif font-bold text-3xl lg:text-4xl">{githubStats.topLanguage}</span>
          <span className="text-[9px] text-text-dim/50 uppercase tracking-wider mt-0.5">Top Language</span>
        </div>
        <div className="group relative overflow-visible flex h-[160px] flex-col gap-3 px-6 py-8 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500 ease-in-out">
          <CornerBrackets />
          <span className="text-saffron font-serif font-bold text-4xl lg:text-5xl">{githubStats.stars}</span>
          <span className="text-[9px] text-text-dim/50 uppercase tracking-wider mt-0.5">Total Stars Earned</span>
        </div>
      </motion.div>

    </SectionContainer>
  );
};
