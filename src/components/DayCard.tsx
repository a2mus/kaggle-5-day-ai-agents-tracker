/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Calendar, CheckCircle2, Star, Zap, ExternalLink } from "lucide-react";
import { DayDefinition } from "../data";

interface DayCardProps {
  key?: React.Key;
  dayDef: DayDefinition;
  dayState: any; // Can be Day1State | Day2State etc.
  isActive: boolean;
  onToggle: (dayNum: number, fieldName: string, subfieldKey?: string) => void;
  onSelectActiveDay: (dayNum: number) => void;
}

export default function DayCard({
  dayDef,
  dayState,
  isActive,
  onToggle,
  onSelectActiveDay,
}: DayCardProps) {
  const { num, title, subtitle, tasks } = dayDef;

  // Let's compute completed count
  let completedCount = 0;
  tasks.forEach((task) => {
    const isArrayType = Array.isArray(dayState[task.field]);
    if (isArrayType) {
      if (task.subfieldKey && dayState[task.field]?.includes(task.subfieldKey)) {
        completedCount++;
      }
    } else {
      if (dayState[task.field] === true) {
        completedCount++;
      }
    }
  });

  const isDayCompleted = completedCount === tasks.length;

  return (
    <div
      id={`day-card-panel-${num}`}
      onClick={() => {
        if (!isActive) onSelectActiveDay(num);
      }}
      className={`glass-card rounded-2xl p-6 relative flex flex-col justify-between cursor-pointer overflow-hidden ${
        isActive
          ? "bg-white/10 border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.2)] scale-[1.01]"
          : isDayCompleted
          ? "bg-black/20 border-white/5 opacity-80 shadow-inner hover:border-white/20 hover:opacity-100"
          : "bg-black/40 border-white/10 hover:bg-black/30"
      }`}
    >
      {/* Background glowing accent for active state */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 pointer-events-none" />
      )}

      {/* Top Tag & Indicator */}
      {isActive && (
        <span className="absolute top-3 right-3 bg-gradient-to-r from-indigo-600 to-purple-600 border border-indigo-400/50 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-md shadow-md flex items-center gap-1 z-10">
          <Zap className="w-2.5 h-2.5 text-white fill-white" />
          ACTIVE STREAM
        </span>
      )}

      <div className="relative z-10">
        {/* Header content */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span
              className={`p-2 rounded-xl border flex items-center justify-center transition-all ${
                isActive
                  ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                  : isDayCompleted
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-white/5 text-neutral-400 border-white/10"
              }`}
            >
              <Calendar className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-display font-semibold text-lg text-white flex items-center gap-1.5 drop-shadow-sm">
                {title}
                {isDayCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20 inline-block" />}
              </h3>
              <p className="text-2xs font-sans font-medium text-neutral-400 uppercase tracking-widest">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0 select-none">
            <span className="font-mono text-xs font-bold text-neutral-300 bg-black/40 border border-white/5 shadow-inner px-2 py-0.5 rounded-full">
              {completedCount}/{tasks.length}
            </span>
          </div>
        </div>

        {/* Task lists inside the day */}
        <div id={`day-tasks-list-${num}`} className="mt-5 space-y-3.5">
          {tasks.map((task) => {
            const isArrayType = Array.isArray(dayState[task.field]);
            const isChecked = isArrayType
              ? task.subfieldKey && dayState[task.field]?.includes(task.subfieldKey)
              : dayState[task.field] === true;

            return (
              <div
                key={task.id}
                id={`task-item-${task.id}`}
                onClick={(e) => {
                  e.stopPropagation(); // prevent card-activation selection click
                  onToggle(num, task.field, task.subfieldKey);
                }}
                className={`group flex items-start gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all duration-300 ${
                  isChecked
                    ? "bg-white/5 border-white/5"
                    : "bg-black/20 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                {/* Checkbox item */}
                <div className="mt-0.5 shrink-0 relative">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    readOnly
                    className="sr-only"
                    id={`checkbox-input-${task.id}`}
                  />
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300 ${
                      isChecked
                        ? "bg-indigo-500 border-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                        : "bg-black/50 border-white/20 group-hover:border-indigo-400"
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

                {/* Text descriptors */}
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
                          className="px-2 py-0.5 bg-black/40 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/30 rounded-md font-mono text-[9px] font-semibold text-neutral-300 hover:text-white inline-flex items-center gap-1 transition-all shadow-inner"
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

      {isDayCompleted && (
        <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-semibold justify-center relative z-10 drop-shadow-sm">
          <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-400" />
          DAY COMPLETE • RETENTION MAX
        </div>
      )}
    </div>
  );
}
