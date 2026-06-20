/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Award, Star, Flame, ExternalLink } from "lucide-react";
import { CapstoneState } from "../types";
import { CAPSTONE_TASKS } from "../data";

interface CapstoneCardProps {
  state: CapstoneState;
  onToggle: (field: keyof CapstoneState) => void;
}

export default function CapstoneCard({ state, onToggle }: CapstoneCardProps) {
  const tasks = CAPSTONE_TASKS;
  const completedCount = tasks.filter((t) => state[t.field as keyof CapstoneState]).length;
  const isAllDone = completedCount === tasks.length;

  return (
    <div
      id="capstone-card-panel"
      className={`glass-card rounded-2xl p-6 relative flex flex-col justify-between overflow-hidden shadow-sm ${
        isAllDone
          ? "border-amber-400/50 bg-amber-500/5 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
          : "border-white/10"
      }`}
    >
      {/* Visual background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-amber-100/30 to-transparent rounded-full -mr-12 -mt-12 pointer-events-none" />

      <div className="relative z-10">
        {/* Header section */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span
              className={`p-2 rounded-xl border flex items-center justify-center transition-all ${
                isAllDone
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                  : "bg-white/5 text-amber-400/80 border-white/10"
              }`}
            >
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-display font-semibold text-lg text-white flex items-center gap-1.5 drop-shadow-sm">
                Capstone Project
              </h3>
              <p className="text-2xs font-sans font-medium text-neutral-400 uppercase tracking-widest">
                Portfolios & Submission
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0 select-none">
            <span className="font-mono text-xs font-bold text-neutral-300 bg-black/40 border border-white/5 shadow-inner px-2 py-0.5 rounded-full">
              {completedCount}/{tasks.length}
            </span>
          </div>
        </div>

        {/* Capstone description */}
        <p className="text-xs text-neutral-400 mt-4 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5 font-sans shadow-inner">
          Showcase your skills to Google & Kaggle. Create a custom agent, compile results in an interactive Kaggle Notebook, record a short workflow walkthrough, and submit before <span className="font-bold text-neutral-200">July 6, 2026</span>.
        </p>

        {/* Task lists */}
        <div id="capstone-tasks-list" className="mt-5 space-y-3.5">
          {tasks.map((task) => {
            const isChecked = state[task.field as keyof CapstoneState];

            return (
              <div
                key={task.id}
                id={`task-item-capstone-${task.id}`}
                onClick={() => onToggle(task.field as keyof CapstoneState)}
                className={`group flex items-start gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all duration-300 ${
                  isChecked
                    ? "bg-white/5 border-white/5"
                    : "bg-black/20 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                {/* Custom animated checkbox */}
                <div className="mt-0.5 shrink-0 relative">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    readOnly
                    className="sr-only"
                    id={`checkbox-input-capstone-${task.id}`}
                  />
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300 ${
                      isChecked
                        ? "bg-amber-500 border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                        : "bg-black/50 border-white/20 group-hover:border-amber-400/50"
                    }`}
                  >
                    {isChecked && (
                      <motion.svg
                        className="w-3.5 h-3.5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </motion.svg>
                    )}
                  </div>
                </div>

                {/* Text labels */}
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-sm font-sans font-medium transition-all duration-300 ${
                      isChecked
                        ? "text-neutral-500 line-through decoration-neutral-600"
                        : "text-neutral-200 group-hover:text-white"
                    }`}
                  >
                    {task.text}
                  </div>
                  {task.subtext && (
                    <div
                      className={`text-2xs font-sans mt-0.5 leading-relaxed transition-all duration-300 ${
                        isChecked ? "text-neutral-600" : "text-neutral-400"
                      }`}
                    >
                      {task.subtext}
                    </div>
                  )}
                  {task.links && task.links.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mt-2" onClick={(e) => e.stopPropagation()}>
                      {task.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2 py-0.5 bg-black/40 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/30 rounded-md font-mono text-[9px] font-semibold text-neutral-300 hover:text-white inline-flex items-center gap-1 transition-all shadow-inner"
                        >
                          {link.label}
                          <ExternalLink className="w-2.5 h-2.5 text-neutral-400" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isAllDone && (
        <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs font-mono text-amber-400 font-bold justify-center relative z-10 drop-shadow-sm">
          <Flame className="w-4 h-4 fill-amber-500 text-amber-400 animate-pulse" />
          KAGGLE CAPSTONE SUMMITTED 🏆
        </div>
      )}
    </div>
  );
}
