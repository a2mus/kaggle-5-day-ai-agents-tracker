/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Trophy, Zap, ChevronRight, GraduationCap } from "lucide-react";

interface ProgressBarProps {
  checkedCount: number;
  totalCount: number;
  currentDay: number;
  setCurrentDay: (day: number) => void;
}

export default function ProgressBar({
  checkedCount,
  totalCount,
  currentDay,
  setCurrentDay,
}: ProgressBarProps) {
  const percentage = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  // Compute status rank description
  let rank = "Ready to Vibe";
  let colorClass = "from-neutral-400 to-neutral-500 text-neutral-800";
  let bgGradient = "from-neutral-100 to-neutral-200 border-neutral-300";

  if (percentage >= 100) {
    rank = "Sovereign AI Master 👑";
    colorClass = "from-yellow-500 to-amber-600 text-white";
    bgGradient = "from-amber-50 to-orange-100 border-amber-300";
  } else if (percentage >= 80) {
    rank = "Senior Agent Architect 🧠";
    colorClass = "from-indigo-500 to-indigo-700 text-white";
    bgGradient = "from-indigo-50 to-indigo-100 border-indigo-200";
  } else if (percentage >= 50) {
    rank = "Autonomous Builder 🤖";
    colorClass = "from-teal-500 to-teal-600 text-white";
    bgGradient = "from-teal-50 to-emerald-100 border-teal-200";
  } else if (percentage >= 20) {
    rank = "Vibe Code Craftsman 🛠️";
    colorClass = "from-blue-500 to-blue-600 text-white";
    bgGradient = "from-blue-50 to-blue-100 border-blue-200";
  } else if (percentage >= 1) {
    rank = "Sandbox Sandboxer 🚀";
    colorClass = "from-orange-400 to-orange-500 text-neutral-900";
    bgGradient = "from-orange-50/50 to-orange-100/50 border-orange-200";
  }

  return (
    <div
      id="progress-dashboard-panel"
      className="glass-panel rounded-2xl p-6 overflow-hidden relative"
    >
      {/* Absolute background accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-radial from-indigo-500/10 to-transparent rounded-full -mr-16 -mt-16 pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-neutral-400">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
            </span>
            <span className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-semibold">
              Kaggle Course Tracker
            </span>
          </div>
          <h2 className="text-3xl font-display font-bold tracking-tight text-white drop-shadow-md">
            5-Day AI Agents Course
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl">
            Track your developer journey from setting up Google AI Studio to submitting
            your final capstone agent to Kaggle by July 6, 2026.
          </p>
        </div>

        {/* Level & Rank Badge */}
        <div className={`p-4 rounded-xl border bg-gradient-to-br ${bgGradient} flex items-center gap-3 self-start md:self-auto shadow-inner`}>
          <div className="grid place-items-center w-10 h-10 bg-black/30 border border-white/10 rounded-lg shadow-sm">
            <Trophy className={`w-5 h-5 ${colorClass}`} />
          </div>
          <div>
            <div className="text-2xs font-mono font-semibold text-white/50 uppercase tracking-widest">
              My Rank
            </div>
            <div className="font-display font-semibold text-sm text-white drop-shadow-sm">
              {rank}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar container */}
      <div className="mt-8 space-y-3 relative z-10">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 font-mono">
            <span className="font-bold text-white drop-shadow-sm">{checkedCount}</span>
            <span className="text-neutral-500">/</span>
            <span className="text-neutral-400">{totalCount} tasks completed</span>
          </div>
          <div className="font-mono font-bold text-white bg-white/10 border border-white/5 px-2.5 py-0.5 rounded-full text-xs shadow-inner">
            {percentage}% Complete
          </div>
        </div>

        {/* Track */}
        <div className="w-full bg-black/40 rounded-full h-3 overflow-hidden border border-white/5 shadow-inner">
          <motion.div
            id="master-progress-track"
            className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/30 rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* Interactive Current Day Setter */}
      <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="space-y-0.5">
          <div className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5 drop-shadow-sm">
            <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/50" />
            Set Your Active Milestone Day
          </div>
          <p className="text-2xs text-neutral-500">
            Click to focus your task workflow and highlight your current stream section.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[1, 2, 3, 4, 5].map((d) => (
            <button
              key={d}
              id={`set-day-btn-${d}`}
              onClick={() => setCurrentDay(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-300 ${
                currentDay === d
                  ? "bg-gradient-to-br from-indigo-500/80 to-purple-600/80 border border-white/20 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] scale-105"
                  : "bg-black/30 border border-white/10 text-neutral-400 hover:border-white/20 hover:text-white hover:bg-white/5"
              }`}
            >
              Day {d}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
