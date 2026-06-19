/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from "react";
import { ToastMessage, AppState, LocalProfilesState } from "./types";
import { DAYS_DEFINITION, GLOBAL_SETUP_TASKS, CAPSTONE_TASKS, CELEBRATION_PHRASES } from "./data";
import ProgressBar from "./components/ProgressBar";
import GlobalSetupCard from "./components/GlobalSetupCard";
import DayCard from "./components/DayCard";
import CapstoneCard from "./components/CapstoneCard";
import CelebrationToastList from "./components/CelebrationToastList";
import UserProfileCard from "./components/UserProfileCard";
import { Sparkles, RotateCcw } from "lucide-react";

const PROFILES_STORAGE_KEY = "kaggle_5day_agents_profiles_state_v2";
const LEGACY_STORAGE_KEY = "kaggle_5day_agents_tracker_state";

const DEFAULT_STATE: AppState = {
  current_day: 1,
  global_setup: {
    kaggle_account: false,
    competition_joined: false,
    ai_studio_account: false,
    discord_joined: false,
    youtube_subscribed: false,
    local_workspace_done: false,
  },
  days: {
    "1": {
      concepts_read: false,
      livestream_watched: false,
      codelab_done: false,
      hello_agent_built: false,
      reflection_written: false,
    },
    "2": {
      concepts_read: false,
      livestream_watched: false,
      tools_added: [],
      tests_written: false,
    },
    "3": {
      concepts_read: false,
      livestream_watched: false,
      memory_layer_done: false,
      skills_implemented: [],
    },
    "4": {
      concepts_read: false,
      livestream_watched: false,
      guardrails_done: false,
      eval_harness_done: false,
    },
    "5": {
      concepts_read: false,
      livestream_watched: false,
      spec_written: false,
      deployed: false,
      workflow_integrated: false,
    },
  },
  capstone: {
    idea_chosen: false,
    notebook_prepared: false,
    video_recorded: false,
    submitted: false,
  },
};

const sanitizeState = (raw: any): AppState => {
  return {
    current_day: typeof raw?.current_day === "number" ? raw.current_day : DEFAULT_STATE.current_day,
    global_setup: { ...DEFAULT_STATE.global_setup, ...raw?.global_setup },
    days: {
      "1": { ...DEFAULT_STATE.days["1"], ...raw?.days?.["1"] },
      "2": { ...DEFAULT_STATE.days["2"], ...raw?.days?.["2"] },
      "3": { ...DEFAULT_STATE.days["3"], ...raw?.days?.["3"] },
      "4": { ...DEFAULT_STATE.days["4"], ...raw?.days?.["4"] },
      "5": { ...DEFAULT_STATE.days["5"], ...raw?.days?.["5"] },
    },
    capstone: { ...DEFAULT_STATE.capstone, ...raw?.capstone },
  };
};

export default function App() {
  const [profilesState, setProfilesState] = useState<LocalProfilesState>({
    activeProfileId: "default",
    profiles: {
      default: {
        id: "default",
        name: "Default Learner",
        avatarColor: "bg-indigo-600 text-white",
        state: DEFAULT_STATE,
      },
    },
  });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  // Initialize/hydrate profiles state from LocalStorage safely (and migrate legacy progress)
  useEffect(() => {
    try {
      const storedProfiles = localStorage.getItem(PROFILES_STORAGE_KEY);
      if (storedProfiles) {
        const parsed = JSON.parse(storedProfiles) as LocalProfilesState;
        if (parsed?.activeProfileId && parsed?.profiles) {
          const sanitizedProfiles: typeof parsed.profiles = {};
          Object.keys(parsed.profiles).forEach((id) => {
            const p = parsed.profiles[id];
            sanitizedProfiles[id] = {
              id: p.id,
              name: p.name || `Learner ${id}`,
              avatarColor: p.avatarColor || "bg-indigo-600 text-white",
              state: sanitizeState(p.state),
            };
          });
          setProfilesState({
            activeProfileId: parsed.activeProfileId,
            profiles: sanitizedProfiles,
          });
        }
      } else {
        // Migration of single user progress from V1 key
        const legacyStored = localStorage.getItem(LEGACY_STORAGE_KEY);
        if (legacyStored) {
          const parsedLegacy = JSON.parse(legacyStored);
          const legacyState = sanitizeState(parsedLegacy);
          const migrated: LocalProfilesState = {
            activeProfileId: "default",
            profiles: {
              default: {
                id: "default",
                name: "Primary Learner (Migrated)",
                avatarColor: "bg-indigo-600 text-white",
                state: legacyState,
              },
            },
          };
          setProfilesState(migrated);
          localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(migrated));
        }
      }
    } catch (e) {
      console.error("Failed to load initial multi-profile storage", e);
    }
  }, []);

  const persistProfiles = (nextState: LocalProfilesState) => {
    try {
      localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(nextState));
    } catch (e) {
      console.error("Failed to write profiles to LocalStorage", e);
    }
  };

  const activeProfile = profilesState.profiles[profilesState.activeProfileId] || profilesState.profiles["default"] || {
    id: "default",
    name: "Default Learner",
    avatarColor: "bg-indigo-600 text-white",
    state: DEFAULT_STATE,
  };

  const state = activeProfile.state;

  // Helper to update active profile state immutably and persist
  const updateActiveProfileState = (updater: (prev: AppState) => AppState) => {
    setProfilesState((prev) => {
      const activeId = prev.activeProfileId;
      const targetProfile = prev.profiles[activeId] || prev.profiles["default"];
      if (!targetProfile) return prev;

      const updatedState = updater(targetProfile.state);
      const nextProfiles = {
        ...prev.profiles,
        [activeId]: {
          ...targetProfile,
          state: updatedState,
        },
      };

      const fileState = {
        ...prev,
        profiles: nextProfiles,
      };

      persistProfiles(fileState);
      return fileState;
    });
  };

  // Toast utility trigger
  const addToast = (text: string, type: ToastMessage["type"] = "success") => {
    const id = Date.now().toString() + Math.random().toString().substring(2, 6);
    setToasts((prev) => [...prev, { id, text, type }]);

    // Auto delete after 4.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Profile session switch handlers
  const handleSwitchProfile = (id: string) => {
    setProfilesState((prev) => {
      if (!prev.profiles[id]) return prev;
      const next = { ...prev, activeProfileId: id };
      persistProfiles(next);
      return next;
    });
    const targetName = profilesState.profiles[id]?.name || "Learner Account";
    addToast(`Switched workspace account to "${targetName}"! 👥✨`, "info");
  };

  const handleCreateProfile = (name: string, color: string) => {
    const id = "p_" + Date.now().toString() + Math.random().toString().substring(2, 6);
    setProfilesState((prev) => {
      const next = {
        activeProfileId: id,
        profiles: {
          ...prev.profiles,
          [id]: {
            id,
            name,
            avatarColor: color,
            state: DEFAULT_STATE,
          },
        },
      };
      persistProfiles(next);
      return next;
    });
    addToast(`New workspace "${name}" provisioned. Start hacking! 🚀`, "milestone");
  };

  const handleRenameProfile = (id: string, newName: string) => {
    setProfilesState((prev) => {
      const target = prev.profiles[id];
      if (!target) return prev;
      const next = {
        ...prev,
        profiles: {
          ...prev.profiles,
          [id]: {
            ...target,
            name: newName,
          },
        },
      };
      persistProfiles(next);
      return next;
    });
    addToast(`Renamed workspace container to "${newName}"! 🏷️`, "success");
  };

  const handleDeleteProfile = (id: string) => {
    if (id === profilesState.activeProfileId) {
      addToast("Cannot delete the active session. Switch accounts first.", "info");
      return;
    }
    setProfilesState((prev) => {
      const nextProfiles = { ...prev.profiles };
      delete nextProfiles[id];

      let nextActive = prev.activeProfileId;
      if (nextActive === id) {
        nextActive = Object.keys(nextProfiles)[0] || "default";
      }

      const next = {
        activeProfileId: nextActive,
        profiles: nextProfiles,
      };
      persistProfiles(next);
      return next;
    });
    addToast("Profile session successfully deleted from browser memory.", "info");
  };

  // Helper selectors to compute completed counts
  const computeTotalTasksStatus = useCallback(() => {
    let checked = 0;
    let total = 0;

    // 1. Global Setup (6 tasks)
    GLOBAL_SETUP_TASKS.forEach((t) => {
      total++;
      if (state.global_setup[t.field as keyof typeof state.global_setup]) {
        checked++;
      }
    });

    // 2. Days Tasks (5 days, variable tasks)
    DAYS_DEFINITION.forEach((dayDef) => {
      dayDef.tasks.forEach((task) => {
        total++;
        const dayKey = dayDef.num.toString() as keyof AppState["days"];
        const dayStateObj = state.days[dayKey];
        const isArrayType = Array.isArray(dayStateObj[task.field as keyof typeof dayStateObj]);

        if (isArrayType) {
          if (task.subfieldKey && (dayStateObj[task.field as keyof typeof dayStateObj] as any)?.includes(task.subfieldKey)) {
            checked++;
          }
        } else {
          if (dayStateObj[task.field as keyof typeof dayStateObj] === true) {
            checked++;
          }
        }
      });
    });

    // 3. Capstone Tasks (4 tasks)
    CAPSTONE_TASKS.forEach((t) => {
      total++;
      if (state.capstone[t.field as keyof typeof state.capstone]) {
        checked++;
      }
    });

    return { checked, total };
  }, [state]);

  const { checked: checkedCount, total: totalCount } = computeTotalTasksStatus();

  // Set selected Day as active
  const handleSetCurrentDay = (day: number) => {
    updateActiveProfileState((prev) => ({ ...prev, current_day: day }));
    addToast(`Focus shifted to Day ${day}! Let's make major agent progress. 🎯`, "info");
  };

  // Reset progress handler
  const handleResetProgress = () => {
    updateActiveProfileState(() => DEFAULT_STATE);
    setShowConfirmReset(false);
    setToasts([]);
    addToast("All trackers and settings restored to default baseline. Keep vibing! 🌀", "info");
  };

  // Global setup checkbox toggling
  const handleGlobalSetupToggle = (field: keyof typeof state.global_setup) => {
    const nextVal = !state.global_setup[field];
    const nextGlobal = {
      ...state.global_setup,
      [field]: nextVal,
    };

    updateActiveProfileState((prev) => ({
      ...prev,
      global_setup: nextGlobal,
    }));

    if (nextVal) {
      // Pick random motivational message
      const phrase = CELEBRATION_PHRASES[Math.floor(Math.random() * CELEBRATION_PHRASES.length)];
      addToast(phrase, "success");

      // Check if all Global Setup is complete
      const allGlobalDone = GLOBAL_SETUP_TASKS.every((t) => nextGlobal[t.field as keyof typeof nextGlobal]);
      if (allGlobalDone) {
        addToast("Workspace and accounts securely provisioned! Day 1 stream is waiting! 🚀🎉", "milestone");
      }
    }
  };

  // Day Milestone tasks toggling
  const handleDayTaskToggle = (dayNum: number, field: string, subfieldKey?: string) => {
    const dayKey = dayNum.toString() as keyof AppState["days"];
    const currentDayState = state.days[dayKey] as any;
    let nextValue: any;
    let isToggledOn = false;

    if (subfieldKey && Array.isArray(currentDayState[field])) {
      const arr = [...currentDayState[field]];
      if (arr.includes(subfieldKey)) {
        nextValue = arr.filter((item) => item !== subfieldKey);
        isToggledOn = false;
      } else {
        nextValue = [...arr, subfieldKey];
        isToggledOn = true;
      }
    } else {
      nextValue = !currentDayState[field];
      isToggledOn = nextValue;
    }

    const nextDayState = {
      ...currentDayState,
      [field]: nextValue,
    };

    updateActiveProfileState((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [dayKey]: nextDayState,
      },
    }));

    if (isToggledOn) {
      const phrase = CELEBRATION_PHRASES[Math.floor(Math.random() * CELEBRATION_PHRASES.length)];
      addToast(phrase, "success");

      // Verify day level completion
      const dayDef = DAYS_DEFINITION.find((d) => d.num === dayNum);
      if (dayDef) {
        let isComplete = true;
        dayDef.tasks.forEach((t) => {
          const isArr = Array.isArray(nextDayState[t.field]);
          if (isArr) {
            if (t.subfieldKey && !(nextDayState[t.field]?.includes(t.subfieldKey))) {
              isComplete = false;
            }
          } else {
            if (nextDayState[t.field] !== true) {
              isComplete = false;
            }
          }
        });

         if (isComplete) {
          addToast(`Fantastic skill execution! Day ${dayNum} curriculum has been 100% completed! 🏆🎉`, "milestone");
        }
      }
    }
  };

  // Capstone checkbox toggling
  const handleCapstoneToggle = (field: keyof typeof state.capstone) => {
    const nextVal = !state.capstone[field];
    const nextCapstone = {
      ...state.capstone,
      [field]: nextVal,
    };

    updateActiveProfileState((prev) => ({
      ...prev,
      capstone: nextCapstone,
    }));

    if (nextVal) {
      const phrase = CELEBRATION_PHRASES[Math.floor(Math.random() * CELEBRATION_PHRASES.length)];
      addToast(phrase, "success");

      const allCapstoneDone = CAPSTONE_TASKS.every((t) => nextCapstone[t.field as keyof typeof nextCapstone]);
      if (allCapstoneDone) {
        addToast("Ultimate victory! Your masterpiece is fully cataloged onto Kaggle submissions. Go celebrate! 🏆🎓🥳", "milestone");
      }
    }
  };

  return (
    <div id="applet-viewport" className="min-h-screen bg-neutral-90/50 text-neutral-800 font-sans pb-16">
      {/* Toast popup portal list */}
      <CelebrationToastList toasts={toasts} removeToast={removeToast} />

      {/* Hero Header Space */}
      <header className="border-b border-neutral-200/60 bg-white/70 backdrop-blur-md sticky top-0 z-40 transition-shadow animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 bg-neutral-900 border border-neutral-950 flex items-center justify-center text-white rounded-lg select-none">
              <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400/40" />
            </span>
            <div>
              <h1 className="text-lg font-display font-bold tracking-tight text-neutral-900 leading-tight animate-fade-in-up">
                AI Agents Vibe Track
              </h1>
              <p className="text-3xs font-mono text-neutral-400 uppercase tracking-widest font-semibold flex items-center gap-1">
                Kaggle course companion • Google AI Studio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 select-none">
            {/* Active User Mini Tag/Chip */}
            <div className="px-3 py-1 bg-neutral-50/80 rounded-full border border-neutral-200/80 flex items-center gap-2 animate-scale-up">
              <span className={`w-4.5 h-4.5 rounded-full font-bold font-sans text-4xs flex items-center justify-center text-white shadow-xs ${activeProfile.avatarColor}`}>
                {activeProfile.name.charAt(0).toUpperCase()}
              </span>
              <span className="text-3xs font-semibold text-neutral-700 truncate max-w-28 sm:max-w-40 font-mono">
                {activeProfile.name}
              </span>
            </div>

            <button
              id="confirm-reset-trigger-btn"
              onClick={() => setShowConfirmReset(true)}
              className="px-3 py-1.5 rounded-lg border border-neutral-250 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50 hover:border-neutral-350 transition-all text-2xs font-mono font-medium flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Track
            </button>
          </div>
        </div>
      </header>

      {/* Main layout frame */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 lg:mt-10 space-y-8">
        
        {/* Core Progress Dashboard Panel */}
        <ProgressBar
          checkedCount={checkedCount}
          totalCount={totalCount}
          currentDay={state.current_day}
          setCurrentDay={handleSetCurrentDay}
        />

        {/* Responsive dual grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column (Global prerequisites & Capstone & Profiles) */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8">
            <UserProfileCard
              profilesState={profilesState}
              onSwitchProfile={handleSwitchProfile}
              onCreateProfile={handleCreateProfile}
              onRenameProfile={handleRenameProfile}
              onDeleteProfile={handleDeleteProfile}
            />

            <GlobalSetupCard
              state={state.global_setup}
              onToggle={handleGlobalSetupToggle}
            />

            <CapstoneCard
              state={state.capstone}
              onToggle={handleCapstoneToggle}
            />
          </div>

          {/* Right Column (Day 1 to Day 5 Curriculum timeline) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-display font-semibold text-sm text-neutral-400 uppercase tracking-widest">
                Curriculum Progression
              </h3>
              <p className="text-2xs font-sans text-neutral-400">
                Click a card to set active track day status.
              </p>
            </div>

            <div className="space-y-6">
              {DAYS_DEFINITION.map((dayDef) => {
                const dayKey = dayDef.num.toString() as keyof AppState["days"];
                return (
                  <DayCard
                    key={dayDef.num}
                    dayDef={dayDef}
                    dayState={state.days[dayKey]}
                    isActive={state.current_day === dayDef.num}
                    onToggle={handleDayTaskToggle}
                    onSelectActiveDay={handleSetCurrentDay}
                  />
                );
              })}
            </div>
          </div>

        </div>
      </main>

      {/* Inline Confirmation Reset Modal */}
      {showConfirmReset && (
        <div
          id="reset-alert-overlay"
          className="fixed inset-0 bg-neutral-900/40 backdrop-blur-xs z-50 grid place-items-center p-4 animate-fade-in"
        >
          <div className="bg-white border border-neutral-200 shadow-xl rounded-2xl max-w-md w-full p-6 space-y-5 animate-scale-up">
            <div className="space-y-2">
              <h4 className="font-display font-bold text-lg text-neutral-900">
                Are you absolutely sure?
              </h4>
              <p className="text-sm text-neutral-500 font-sans leading-relaxed">
                This operation resets all registered course progress in your local cache,
                including task checkboxes and current active track indicator. You cannot undo this.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 font-mono text-2xs">
              <button
                id="cancel-reset-btn"
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 bg-white border border-neutral-250 text-neutral-600 hover:bg-neutral-50 hover:border-neutral-350 rounded-lg transition-all"
              >
                No, cancel
              </button>
              <button
                id="execute-reset-btn"
                onClick={handleResetProgress}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold shadow-sm"
              >
                Yes, reset progress
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fine-Print Course footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-neutral-250 text-center space-y-2">
        <p className="text-2xs font-mono tracking-wide text-neutral-400 uppercase">
          Kaggle 5-Day AI Agents Course • Dev Companion Framework
        </p>
        <p className="text-3xs text-neutral-305">
          Designed with love for developers. All progress is preserved offline inside your browser’s localStorage.
        </p>
      </footer>
    </div>
  );
}
