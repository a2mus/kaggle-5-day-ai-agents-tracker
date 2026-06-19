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
      className={`border rounded-2xl p-6 transition-all duration-300 relative flex flex-col justify-between cursor-pointer ${
        isActive
          ? "bg-white border-neutral-900 shadow-md ring-2 ring-neutral-900/10 scale-[1.01]"
          : isDayCompleted
          ? "bg-neutral-50/70 border-neutral-350 opacity-90 shadow-2xs hover:border-neutral-400 hover:opacity-100"
          : "bg-white border-neutral-200 shadow-sm hover:border-neutral-300 hover:shadow-xs"
      }`}
    >
      {/* Top Tag & Indicator */}
      {isActive && (
        <span className="absolute -top-2.5 -right-2.5 bg-neutral-900 border border-neutral-950 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
          <Zap className="w-2.5 h-2.5 text-orange-400 fill-orange-400" />
          ACTIVE STREAM
        </span>
      )}

      <div>
        {/* Header content */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <span
              className={`p-2 rounded-xl border flex items-center justify-center ${
                isActive
                  ? "bg-neutral-900 text-white border-neutral-950"
                  : isDayCompleted
                  ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                  : "bg-neutral-50 text-neutral-600 border-neutral-205"
              }`}
            >
              <Calendar className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-display font-semibold text-lg text-neutral-800 flex items-center gap-1.5">
                {title}
                {isDayCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500 inline-block" />}
              </h3>
              <p className="text-2xs font-sans font-medium text-neutral-400 uppercase tracking-widest">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0 select-none">
            <span className="font-mono text-xs font-bold text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded-full">
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
                className={`group flex items-start gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all ${
                  isChecked
                    ? "bg-neutral-50 border-neutral-200/50"
                    : "bg-white border-neutral-150 hover:bg-neutral-50/55 hover:border-neutral-250"
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

                {/* Text descriptors */}
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

      {isDayCompleted && (
        <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center gap-1 text-[10px] font-mono text-emerald-600 font-semibold justify-center">
          <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
          DAY COMPLETE • RETENTION MAX
        </div>
      )}
    </div>
  );
}
