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
      className={`border rounded-2xl p-6 transition-all duration-300 bg-white shadow-sm flex flex-col justify-between ${
        isAllDone
          ? "border-neutral-300 ring-2 ring-neutral-100"
          : "border-neutral-200"
      }`}
    >
      <div>
        {/* Header section of the card */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <span
              className={`p-2 rounded-xl border flex items-center justify-center ${
                isAllDone
                  ? "bg-neutral-900 text-white border-neutral-950"
                  : "bg-neutral-50 text-neutral-600 border-neutral-200"
              }`}
            >
              <Hammer className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-display font-semibold text-lg text-neutral-800">
                Global Setup
              </h3>
              <p className="text-2xs font-mono font-medium text-neutral-400">
                PREREQUISITES MAPPING
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0">
            <span className="font-mono text-xs font-bold text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded-full">
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
                    id={`checkbox-input-setup-${task.id}`}
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

                {/* Texts */}
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
        <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center gap-1.5 text-2xs font-mono text-emerald-600 font-semibold justify-center">
          <CloudLightning className="w-3.5 h-3.5 animate-pulse" />
          SETUP RUNTIME COMPLIANT
        </div>
      )}
    </div>
  );
}
