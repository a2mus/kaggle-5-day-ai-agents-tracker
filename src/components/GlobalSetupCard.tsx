/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Hammer, CloudLightning, ExternalLink } from "lucide-react";
import { GlobalSetupState } from "../types";
import { GLOBAL_SETUP_TASKS } from "../data";

interface GlobalSetupCardProps {
  state: GlobalSetupState;
  onToggle: (field: keyof GlobalSetupState) => void;
}

export default function GlobalSetupCard({ state, onToggle }: GlobalSetupCardProps) {
  const tasks = GLOBAL_SETUP_TASKS;
  const completedCount = tasks.filter((t) => state[t.field as keyof GlobalSetupState]).length;
  const isAllDone = completedCount === tasks.length;

  return (
    <div
      id="global-setup-card-panel"
      className={`glass-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden ${
        isAllDone
          ? "border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          : "border-white/10"
      }`}
    >
      {isAllDone && <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />}
      <div className="relative z-10">
        {/* Header section of the card */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span
              className={`p-2 rounded-xl border flex items-center justify-center transition-all ${
                isAllDone
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                  : "bg-white/5 text-neutral-400 border-white/10"
              }`}
            >
              <Hammer className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-display font-semibold text-lg text-white drop-shadow-sm">
                Global Setup
              </h3>
              <p className="text-2xs font-mono font-medium text-neutral-400">
                PREREQUISITES MAPPING
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0">
            <span className="font-mono text-xs font-bold text-neutral-300 bg-black/40 border border-white/5 shadow-inner px-2 py-0.5 rounded-full">
              {completedCount}/{tasks.length}
            </span>
          </div>
        </div>

        {/* Task List */}
        <div id="setup-tasks-list" className="mt-5 space-y-4">
          {tasks.map((task) => {
            const isChecked = state[task.field as keyof GlobalSetupState];

            return (
              <div
                key={task.id}
                id={`task-item-setup-${task.id}`}
                onClick={() => onToggle(task.field as keyof GlobalSetupState)}
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
                    id={`checkbox-input-setup-${task.id}`}
                  />
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300 ${
                      isChecked
                        ? "bg-emerald-500 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                        : "bg-black/50 border-white/20 group-hover:border-emerald-400"
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

                {/* Texts */}
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
                          className="px-2 py-0.5 bg-black/40 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/30 rounded-md font-mono text-[9px] font-semibold text-neutral-300 hover:text-white inline-flex items-center gap-1 transition-all shadow-inner"
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
        <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-1.5 text-2xs font-mono text-emerald-400 font-semibold justify-center relative z-10 drop-shadow-sm">
          <CloudLightning className="w-3.5 h-3.5 animate-pulse" />
          SETUP RUNTIME COMPLIANT
        </div>
      )}
    </div>
  );
}
