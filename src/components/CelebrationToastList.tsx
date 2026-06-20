/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles, Terminal, CheckCircle2 } from "lucide-react";
import { ToastMessage } from "../types";

interface CelebrationToastListProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export default function CelebrationToastList({ toasts, removeToast }: CelebrationToastListProps) {
  return (
    <div
      id="toaster-boundary-pane"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            id={`toast-message-${toast.id}`}
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
            className={`pointer-events-auto p-4 rounded-xl flex items-start gap-3 shadow-2xl backdrop-blur-xl transition-all ${
              toast.type === "milestone"
                ? "bg-gradient-to-r from-indigo-600/90 to-purple-600/90 border border-white/20 text-white shadow-[0_10px_40px_rgba(99,102,241,0.4)]"
                : "bg-black/60 border border-white/10 text-white"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {toast.type === "milestone" ? (
                <div className="p-1 bg-white/20 rounded-lg text-white shadow-inner">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
              ) : (
                <div className="p-1 bg-emerald-500/20 rounded-lg text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-sm font-sans font-medium block leading-relaxed drop-shadow-sm">
                {toast.text}
              </span>
              <span className={`text-[10px] font-mono block mt-1 uppercase tracking-wider ${toast.type === "milestone" ? "text-indigo-200" : "text-neutral-400"}`}>
                {toast.type === "milestone" ? "Milestone Unlocked! 🎉" : "Vibe Synced ✓"}
              </span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-neutral-400 hover:text-white hover:bg-white/10 transition-colors p-1 rounded-md shrink-0 focus:outline-none"
              aria-label="Dismiss Notification"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
