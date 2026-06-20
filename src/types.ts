/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GlobalSetupState {
  kaggle_account: boolean;
  competition_joined: boolean;
  ai_studio_account: boolean;
  discord_joined: boolean;
  youtube_subscribed: boolean;
  local_workspace_done: boolean;
}

export interface Day1State {
  concepts_read: boolean;
  livestream_watched: boolean;
  codelab_done: boolean;
  hello_agent_built: boolean;
  reflection_written: boolean;
}

export interface Day2State {
  concepts_read: boolean;
  livestream_watched: boolean;
  tools_added: string[]; // e.g. ['HTTP', 'Code execution']
  tests_written: boolean;
}

export interface Day3State {
  concepts_read: boolean;
  livestream_watched: boolean;
  memory_layer_done: boolean;
  skills_implemented: string[]; // e.g. ['Project historian', 'Spec refiner']
}

export interface Day4State {
  concepts_read: boolean;
  livestream_watched: boolean;
  guardrails_done: boolean;
  eval_harness_done: boolean;
}

export interface Day5State {
  concepts_read: boolean;
  livestream_watched: boolean;
  spec_written: boolean;
  deployed: boolean;
  workflow_integrated: boolean;
}

export interface CapstoneState {
  idea_chosen: boolean;
  notebook_prepared: boolean;
  video_recorded: boolean;
  submitted: boolean;
}

export interface AppState {
  current_day: number;
  global_setup: GlobalSetupState;
  days: {
    "1": Day1State;
    "2": Day2State;
    "3": Day3State;
    "4": Day4State;
    "5": Day5State;
  };
  capstone: CapstoneState;
}

export interface UserProfile {
  id: string;
  name: string;
  avatarColor: string;
}

export interface LocalProfilesState {
  activeProfileId: string;
  profiles: {
    [id: string]: {
      id: string;
      name: string;
      avatarColor: string;
      state: AppState;
    };
  };
}

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'milestone';
}

export type DayStateUnion = Day1State | Day2State | Day3State | Day4State | Day5State;
