/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { LocalProfilesState } from "../types";
import { Users, UserPlus, Trash2, Edit2, Check, X, User } from "lucide-react";

const AVATAR_COLORS = [
  "bg-indigo-600 text-white",
  "bg-emerald-600 text-white",
  "bg-amber-500 text-neutral-950",
  "bg-rose-600 text-white",
  "bg-sky-600 text-white",
  "bg-violet-600 text-white",
  "bg-teal-600 text-white",
  "bg-neutral-800 text-white",
];

interface UserProfileCardProps {
  profilesState: LocalProfilesState;
  onSwitchProfile: (id: string) => void;
  onCreateProfile: (name: string, color: string) => void;
  onRenameProfile: (id: string, newName: string) => void;
  onDeleteProfile: (id: string) => void;
}

export default function UserProfileCard({
  profilesState,
  onSwitchProfile,
  onCreateProfile,
  onRenameProfile,
  onDeleteProfile,
}: UserProfileCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [selectedColor, setSelectedColor] = useState(AVATAR_COLORS[0]);
  const [editNameValue, setEditNameValue] = useState("");

  const activeId = profilesState.activeProfileId;
  const profilesList = Object.values(profilesState.profiles);
  const activeProfile = profilesState.profiles[activeId] || profilesList[0] || {
    id: "default",
    name: "Default Learner",
    avatarColor: "bg-indigo-600 text-white",
  };

  const handleStartRename = () => {
    setEditNameValue(activeProfile.name);
    setIsEditingName(true);
  };

  const handleSaveRename = () => {
    if (editNameValue.trim()) {
      onRenameProfile(activeProfile.id, editNameValue.trim());
      setIsEditingName(false);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProfileName.trim()) {
      onCreateProfile(newProfileName.trim(), selectedColor);
      setNewProfileName("");
      setIsAdding(false);
    }
  };

  return (
    <div
      id="user-profile-management-card"
      className="glass-card rounded-2xl p-5 space-y-5 transition-all hover:shadow-md border-white/10"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-neutral-400" />
          <h2 className="font-display font-bold text-sm text-white tracking-tight">
            Browser Local Accounts
          </h2>
        </div>
        <span className="text-3xs font-mono bg-black/40 border border-white/5 text-neutral-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
          Local Storage
        </span>
      </div>

      {/* Active User Frame */}
      <div className="bg-black/20 border border-white/5 shadow-inner rounded-xl p-4 space-y-3">
        <p className="text-3xs font-mono text-neutral-400 uppercase tracking-widest font-bold">
          Active Account Session
        </p>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm ${activeProfile.avatarColor} shrink-0 shadow-xs border border-white/20 select-none animate-pulse`}
            >
              {activeProfile.name.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1 min-w-0">
              {isEditingName ? (
                <div className="flex items-center gap-1.5 w-full">
                  <input
                    type="text"
                    maxLength={24}
                    value={editNameValue}
                    onChange={(e) => setEditNameValue(e.target.value)}
                    className="w-full bg-black/40 border border-white/20 rounded-md px-2 py-1 text-xs font-sans text-white focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter learner name"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveRename}
                    className="p-1.5 bg-indigo-500 text-white rounded-md hover:bg-indigo-400 transition-all cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsEditingName(false)}
                    className="p-1.5 bg-white/10 text-neutral-300 rounded-md hover:bg-white/20 transition-all cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="font-sans font-semibold text-xs text-white truncate">
                    {activeProfile.name}
                  </p>
                  <button
                    onClick={handleStartRename}
                    className="p-1 hover:bg-white/10 text-neutral-400 hover:text-white rounded-md transition-all cursor-pointer"
                    title="Rename Profile"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                </div>
              )}
              <p className="text-3xs font-mono text-neutral-500 truncate mt-0.5">
                Saved & separated browser container
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Switch Profiles Section */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <p className="text-3xs font-mono text-neutral-400 uppercase tracking-widest font-bold">
            Available Profiles ({profilesList.length})
          </p>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="text-3xs font-mono font-bold text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 cursor-pointer transition-colors"
            >
              <UserPlus className="w-3 h-3" />
              Add Account
            </button>
          )}
        </div>

        {isAdding ? (
          <form
            onSubmit={handleCreateSubmit}
            className="border border-white/10 bg-black/20 p-3.5 rounded-xl space-y-3.5 animate-scale-up shadow-inner"
          >
            <div className="space-y-1">
              <label className="text-3xs font-mono text-neutral-400 uppercase tracking-wider block">
                Learner / User Name:
              </label>
              <input
                type="text"
                required
                maxLength={24}
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                placeholder="e.g. Kaggle Vibe Lord"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-sans focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-3xs font-mono text-neutral-500 uppercase tracking-wider block">
                Avatar Motif Accent:
              </label>
              <div className="flex flex-wrap gap-2 pt-1">
                {AVATAR_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full ${color} border flex items-center justify-center transition-all ${
                      selectedColor === color
                        ? "border-white ring-2 ring-indigo-500 scale-110 shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    {selectedColor === color && <Check className="w-3 h-3 text-current" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1 font-mono text-3xs">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1.5 bg-white/5 border border-white/10 text-neutral-300 rounded-md hover:bg-white/10 hover:text-white cursor-pointer transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 bg-indigo-500 text-white rounded-md hover:bg-indigo-400 font-semibold cursor-pointer transition-all shadow-[0_0_10px_rgba(99,102,241,0.4)]"
              >
                Create
              </button>
            </div>
          </form>
        ) : (
          <div className="max-h-52 overflow-y-auto pr-1 space-y-1.5 custom-scrollbar">
            {profilesList.map((p) => {
              const isCurrent = p.id === activeId;
              return (
                <div
                  key={p.id}
                  className={`group flex items-center justify-between p-2 rounded-xl transition-all border ${
                    isCurrent
                      ? "bg-white/10 text-white border-white/20 shadow-xs"
                      : "bg-black/20 hover:bg-white/5 text-neutral-300 border-white/5"
                  }`}
                >
                  <button
                    onClick={() => onSwitchProfile(p.id)}
                    className="flex items-center gap-2.5 flex-1 min-w-0 text-left select-none cursor-pointer"
                  >
                    <div
                      className={`w-7.5 h-7.5 rounded-full flex items-center justify-center font-display font-extrabold text-2xs ${p.avatarColor} border border-black/10`}
                    >
                      {p.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="truncate">
                      <p className={`text-2xs font-sans font-semibold truncate ${isCurrent ? "text-white" : "text-neutral-300 group-hover:text-white"}`}>
                        {p.name}
                      </p>
                      <p className={`text-4xs font-mono truncate uppercase ${isCurrent ? "text-indigo-300" : "text-neutral-500"}`}>
                        {isCurrent ? "Active Session" : "Click to Switch"}
                      </p>
                    </div>
                  </button>

                  {!isCurrent && profilesList.length > 1 && (
                    <button
                      onClick={() => onDeleteProfile(p.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-rose-500/20 hover:text-rose-400 text-neutral-500 rounded-lg transition-all cursor-pointer ml-2 shrink-0 self-center"
                      title="Delete profile"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
