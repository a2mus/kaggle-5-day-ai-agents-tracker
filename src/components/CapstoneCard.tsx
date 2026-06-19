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
      className={`border rounded-2xl p-6 transition-all duration-300 relative flex flex-col justify-between overflow-hidden shadow-sm ${
        isAllDone
          ? "border-amber-400 bg-amber-50/10 ring-2 ring-amber-100"
          : "border-neutral-200 bg-linear-to-b from-white to-neutral-50/30"
      }`}
    >
      {/* Visual background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-amber-100/30 to-transparent rounded-full -mr-12 -mt-12 pointer-events-none" />

      <div>
        {/* Header section */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <span
              className={`p-2 rounded-xl border flex items-center justify-center ${
                isAllDone
                  ? "bg-amber-500 text-neutral-900 border-amber-600"
                  : "bg-amber-50 text-amber-600 border-amber-100"
              }`}
            >
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-display font-semibold text-lg text-neutral-800 flex items-center gap-1.5">
                Capstone Project
              </h3>
              <p className="text-2xs font-sans font-medium text-neutral-400 uppercase tracking-widest">
                Portfolios & Submission
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0 select-none">
            <span className="font-mono text-xs font-bold text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded-full">
              {completedCount}/{tasks.length}
            </span>
          </div>
        </div>

        {/* Capstone description */}
        <p className="text-xs text-neutral-500 mt-4 leading-relaxed bg-neutral-105/40 p-3 rounded-xl border border-neutral-150/40 font-sans">
          Showcase your skills to Google & Kaggle. Create a custom agent, compile results in an interactive Kaggle Notebook, record a short workflow walkthrough, and submit before <span className="font-bold text-neutral-800">July 6, 2026</span>.
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
                className={`group flex items-start gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all ${
                  isChecked
                    ? "bg-neutral-50 border-neutral-200/50"
                    : "bg-white border-neutral-150 hover:bg-neutral-50/55 hover:border-neutral-250"
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
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                      isChecked
                        ? "bg-neutral-950 border-neutral-950"
                        : "bg-white border-neutral-300 group-hover:border-neutral-400"
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
                    className={`text-sm font-sans font-medium transition-all duration-200 ${
                      isChecked
                        ? "text-neutral-400 line-through decoration-neutral-350"
                        : "text-neutral-800"
                    }`}
                  >
                    {task.text}
                  </div>
                  {task.subtext && (
                    <div
                      className={`text-2xs font-sans mt-0.5 leading-relaxed leading-snug transition-all duration-200 ${
                        isChecked ? "text-neutral-350" : "text-neutral-400"
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
                          className="px-2 py-0.5 bg-neutral-100/80 hover:bg-neutral-250/70 border border-neutral-200 rounded-md font-mono text-[9px] font-semibold text-neutral-600 hover:text-neutral-900 inline-flex items-center gap-1 transition-all"
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
        <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center gap-1.5 text-xs font-mono text-amber-600 font-bold justify-center">
          <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-bounce" />
          KAGGLE CAPSTONE SUMMITTED 🏆
        </div>
      )}
    </div>
  );
}
