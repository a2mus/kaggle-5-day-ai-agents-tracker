/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TaskLink {
  label: string;
  url: string;
}

export interface TaskDefinition {
  id: string; // unique ID
  text: string;
  subtext?: string;
  field: string; // the property key in state
  subfieldKey?: string; // for lists like tools_added or skills_implemented
  links?: TaskLink[];
}

export interface DayDefinition {
  num: number;
  title: string;
  subtitle: string;
  tasks: TaskDefinition[];
}

export const GLOBAL_SETUP_TASKS: TaskDefinition[] = [
  {
    id: "g1",
    text: "Create/verify Kaggle account and phone number",
    subtext: "Required for starting competitions and accessing Kaggle GPU VMs.",
    field: "kaggle_account",
    links: [
      { label: "Kaggle Signup & Login", url: "https://www.kaggle.com/" },
      { label: "Kaggle Verification Hub", url: "https://www.kaggle.com/settings" }
    ]
  },
  {
    id: "g2",
    text: "Join the specific competition page",
    subtext: "5‑Day AI Agents: Intensive Vibe Coding Course With Google.",
    field: "competition_joined",
    links: [
      { label: "Join Course Competition", url: "https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google" },
      { label: "Read Competition Rules", url: "https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google/rules" }
    ]
  },
  {
    id: "g3",
    text: "Create/verify Google AI Studio account & API Key",
    subtext: "Needed to authorize your vibe coding agents via Gemini API.",
    field: "ai_studio_account",
    links: [
      { label: "Get AI Studio Gemini API Key", url: "https://aistudio.google.com/app/apikey" },
      { label: "Google AI Studio Quickstart", url: "https://ai.google.dev/gemini-api/docs/quickstart" }
    ]
  },
  {
    id: "g4",
    text: "Join Kaggle Discord #vibe-coding-agents channel",
    subtext: "Share progress, debug prompts, and communicate with fellow builders.",
    field: "discord_joined",
    links: [
      { label: "Join Kaggle Discord Server", url: "https://discord.gg/kaggle" }
    ]
  },
  {
    id: "g5",
    text: "Subscribe and open Kaggle YouTube channel",
    subtext: "Keep track of daily live Q&As, AMA sessions, and walkthrough recordings.",
    field: "youtube_subscribed",
    links: [
      { label: "Kaggle YouTube Video Streams", url: "https://www.youtube.com/@Kaggle/streams" },
      { label: "AI Agents Playlist Search", url: "https://www.youtube.com/results?search_query=Kaggle+AI+Agents+Intensive" }
    ]
  },
  {
    id: "g6",
    text: "Set up a local “vibe agents” workspace",
    subtext: "Create Git repository, course folders, and prepare local .env setup.",
    field: "local_workspace_done",
    links: [
      { label: "Google GenAI modern JS SDK", url: "https://github.com/googleapis/google-genai-js" },
      { label: "Google GenAI modern Python SDK", url: "https://github.com/googleapis/google-genai" },
      { label: "Dotenv Package Guide", url: "https://www.npmjs.com/package/dotenv" }
    ]
  }
];

export const DAYS_DEFINITION: DayDefinition[] = [
  {
    num: 1,
    title: "Day 1",
    subtitle: "Intro to Agents & Vibe Coding",
    tasks: [
      {
        id: "d1_1",
        text: "Read/skim Day 1 course materials",
        subtext: "Check codelab docs, whitepapers, email instructions, and discussion tabs.",
        field: "concepts_read",
        links: [
          { label: "Day 1 Materials Thread", url: "https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google/discussion/708280" },
          { label: "Day 1 Announcements", url: "https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google/discussion" }
        ]
      },
      {
        id: "d1_2",
        text: "Watch Day 1 livestream on Kaggle YouTube",
        subtext: "Join live or review the recorded setup session & discussions.",
        field: "livestream_watched",
        links: [
          { label: "Watch Day 1 Live Stream", url: "https://www.youtube.com/results?search_query=Kaggle+5-Day+AI+Agents+Intensive+Day+1+Live" }
        ]
      },
      {
        id: "d1_3",
        text: "Complete Day 1 codelab exercises",
        subtext: "Formulate your very first prompt engineering pipelines inside the notebook.",
        field: "codelab_done",
        links: [
          { label: "Access Day 1 Notebook", url: "https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google/code?competitionId=5-day-ai-agents-intensive-vibecoding-course-with-google&searchQuery=Day+1" }
        ]
      },
      {
        id: "d1_4",
        text: "Implement a \"Hello Vibe Agent\" & simple evaluations",
        subtext: "Write Python/Node agent and set up JSONL response/manual rating logger.",
        field: "hello_agent_built",
        links: [
          { label: "Modern Python SDK Samples", url: "https://github.com/googleapis/google-genai/tree/main/samples" },
          { label: "JSONL Specifications Guidelines", url: "https://jsonlines.org/" }
        ]
      },
      {
        id: "d1_5",
        text: "Write Day 1 reflection notes in workspace",
        subtext: "Capture key insights and save them into day1/NOTES.md and REFLECTION.md.",
        field: "reflection_written"
      }
    ]
  },
  {
    num: 2,
    title: "Day 2",
    subtitle: "Tools & Interoperability",
    tasks: [
      {
        id: "d2_1",
        text: "Read/skim Day 2 assignment",
        subtext: "Review how to design and bind external capabilities to LLMs.",
        field: "concepts_read",
        links: [
          { label: "Day 2 Materials Thread", url: "https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google/discussion?search=Day+2" },
          { label: "Access Day 2 Notebook", url: "https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google/code?competitionId=5-day-ai-agents-intensive-vibecoding-course-with-google&searchQuery=Day+2" }
        ]
      },
      {
        id: "d2_2",
        text: "Watch Day 2 livestream or AMA recording",
        subtext: "Dive deep into the differences between skills and standard tools.",
        field: "livestream_watched",
        links: [
          { label: "Watch Day 2 Stream", url: "https://www.youtube.com/results?search_query=Kaggle+5-Day+AI+Agents+Intensive+Day+2+Live" }
        ]
      },
      {
        id: "d2_3",
        text: "Note insights in day2/NOTES.md & sketch diagram",
        subtext: "Document tool schema design, routing, and architectural flow, saving notes.",
        field: "concepts_read"
      },
      {
        id: "d2_t1",
        text: "Add HTTP Retrieval Tool to agent",
        subtext: "Allow your agent to search the web or fetch content via API requests.",
        field: "tools_added",
        subfieldKey: "HTTP",
        links: [
          { label: "External Web Requests in Node", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" },
          { label: "Python Urllib Requests", url: "https://docs.python.org/3/library/urllib.request.html" }
        ]
      },
      {
        id: "d2_t2",
        text: "Add Code Execution Sandbox Tool to agent",
        subtext: "Implement a python execution runtime / sandbox helper for math/calculations.",
        field: "tools_added",
        subfieldKey: "Code execution",
        links: [
          { label: "Enable Gemini Code Execution", url: "https://ai.google.dev/gemini-api/docs/code-execution" }
        ]
      },
      {
        id: "d2_4",
        text: "Write tool schema integrations and unit tests",
        subtext: "Ensure tool schemas resemble JSON Schema standard and write integration tests.",
        field: "tests_written",
        links: [
          { label: "Gemini Function Calling Specs", url: "https://ai.google.dev/gemini-api/docs/function-calling" },
          { label: "JSON Schema Guidelines", url: "https://json-schema.org/" }
        ]
      }
    ]
  },
  {
    num: 3,
    title: "Day 3",
    subtitle: "Skills, Memory, Long Context",
    tasks: [
      {
        id: "d3_1",
        text: "Read/skim Day 3 assignment & note-taking",
        subtext: "Identify memory patterns, semantic searches, and scaling contexts.",
        field: "concepts_read",
        links: [
          { label: "Day 3 Materials Thread", url: "https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google/discussion?search=Day+3" },
          { label: "Access Day 3 Notebook", url: "https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google/code?competitionId=5-day-ai-agents-intensive-vibecoding-course-with-google&searchQuery=Day+3" }
        ]
      },
      {
        id: "d3_2",
        text: "Watch Day 3 livestream / AMA recording",
        subtext: "Explore sliding window algorithms and summarize-on-the-fly prompt techniques.",
        field: "livestream_watched",
        links: [
          { label: "Watch Day 3 Live Track", url: "https://www.youtube.com/results?search_query=Kaggle+5-Day+AI+Agents+Intensive+Day+3+Live" }
        ]
      },
      {
        id: "d3_3",
        text: "Build minimal persistent memory layer",
        subtext: "Configure a vector database, SQLite tracker, or text log for chronological recall.",
        field: "memory_layer_done",
        links: [
          { label: "SQLite Python QuickStart", url: "https://docs.python.org/3/library/sqlite3.html" },
          { label: "Vector DB ChromaDB Specs", url: "https://docs.trychroma.com/" }
        ]
      },
      {
        id: "d3_s1",
        text: "Implement 'Project Historian' Skill",
        subtext: "Enables agent to fetch context from previous files and user session history.",
        field: "skills_implemented",
        subfieldKey: "Project historian",
        links: [
          { label: "Long Context Optimization API", url: "https://ai.google.dev/gemini-api/docs/long-context" }
        ]
      },
      {
        id: "d3_s2",
        text: "Implement 'Spec Refiner' Skill",
        subtext: "Allows agent to audit schemas, prompt instructions, and auto-correct rules.",
        field: "skills_implemented",
        subfieldKey: "Spec refiner",
        links: [
          { label: "Structured Outputs Guidelines", url: "https://ai.google.dev/gemini-api/docs/structured-outputs" }
        ]
      }
    ]
  },
  {
    num: 4,
    title: "Day 4",
    subtitle: "Security, Guardrails, Evaluation",
    tasks: [
      {
        id: "d4_1",
        text: "Read/skim Day 4 assignment & whitepapers",
        subtext: "Check agent threat modeling parameters, prompt injections, and leak vectors.",
        field: "concepts_read",
        links: [
          { label: "Day 4 Materials Thread", url: "https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google/discussion?search=Day+4" },
          { label: "Safety & Moderation in Gemini", url: "https://ai.google.dev/gemini-api/docs/safety-settings" },
          { label: "Access Day 4 Notebook", url: "https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google/code?competitionId=5-day-ai-agents-intensive-vibecoding-course-with-google&searchQuery=Day+4" }
        ]
      },
      {
        id: "d4_2",
        text: "Watch Day 4 livestream / AMA recording",
        subtext: "Analyze real production failures, user prompt exploits, and evaluation models.",
        field: "livestream_watched",
        links: [
          { label: "Watch Day 4 Livestream Session", url: "https://www.youtube.com/results?search_query=Kaggle+5-Day+AI+Agents+Intensive+Day+4+Live" }
        ]
      },
      {
        id: "d4_3",
        text: "Implement guardrails at 3 architectural layers",
        subtext: "Formulate input filtration, output policy audits, and robust system rules.",
        field: "guardrails_done",
        links: [
          { label: "OWASP Top 10 for LLM Applications", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/" },
          { label: "NeMo Guardrails Framework", url: "https://github.com/NVIDIA/NeMo-Guardrails" }
        ]
      },
      {
        id: "d4_4",
        text: "Assemble test evaluation harness",
        subtext: "Run 5 mock prompt-injection scenarios and log results in day4/SECURITY_TESTS.md.",
        field: "eval_harness_done",
        links: [
          { label: "AI Safety Benchmarking Guide", url: "https://github.com/google/ai-safety-evaluation" }
        ]
      }
    ]
  },
  {
    num: 5,
    title: "Day 5",
    subtitle: "Spec‑Driven, Production‑Grade Vibe Coding",
    tasks: [
      {
        id: "d5_1",
        text: "Read/skim Day 5 materials & study spec sheets",
        subtext: "Discover continuous observability, telemetry patterns, and spec-driven tests.",
        field: "concepts_read",
        links: [
          { label: "Day 5 Materials Thread", url: "https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google/discussion?search=Day+5" },
          { label: "Access Day 5 Notebook", url: "https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google/code?competitionId=5-day-ai-agents-intensive-vibecoding-course-with-google&searchQuery=Day+5" }
        ]
      },
      {
        id: "d5_2",
        text: "Watch Day 5 livestream / AMA walkthrough",
        subtext: "Final review of build automation pipeline techniques for sovereign AI agents.",
        field: "livestream_watched",
        links: [
          { label: "Watch Day 5 Walkthrough Streams", url: "https://www.youtube.com/results?search_query=Kaggle+5-Day+AI+Agents+Intensive+Day+5+Live" }
        ]
      },
      {
        id: "d5_3",
        text: "Document system architecture in day5/SPEC.md",
        subtext: "Write full API specs, data models, behavior state charts, and validation matrices.",
        field: "spec_written"
      },
      {
        id: "d5_4",
        text: "Containerize and deploy your agent",
        subtext: "Construct a Dockerfile or FastAPI wrapper and run it on Render or Railway.",
        field: "deployed",
        links: [
          { label: "Docker Multi-stage Builds Setup", url: "https://docs.docker.com/build/building/multi-stage/" },
          { label: "Railway Container Provisioning", url: "https://railway.app/" },
          { label: "Render Web Services Hosting", url: "https://render.com/" }
        ]
      },
      {
        id: "d5_5",
        text: "Connect agent to one active real workflow",
        subtext: "Wire up webhook triggers, Discord commands, or email summaries with structured logs.",
        field: "workflow_integrated",
        links: [
          { label: "Discord Bots Quickstart Panel", url: "https://discord.com/developers/docs/intro" },
          { label: "Integrate Webhook Triggers", url: "https://discord.com/developers/docs/resources/webhook" }
        ]
      }
    ]
  }
];

export const CAPSTONE_TASKS: TaskDefinition[] = [
  {
    id: "c1",
    text: "Define and pitch Capstone Agent scope",
    subtext: "Determine application logic, unique tool constraints, and workflow automation goals.",
    field: "idea_chosen",
    links: [
      { label: "Competition Rules Overview", url: "https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google/overview" }
    ]
  },
  {
    id: "c2",
    text: "Draft complete Kaggle Notebook & architecture write-up",
    subtext: "Incorporate system design diagrams, prompt logs, code structures, and demo steps.",
    field: "notebook_prepared",
    links: [
      { label: "Browse Kaggle Notebooks Tool", url: "https://www.kaggle.com/code" },
      { label: "Browse Existing Course Notebooks", url: "https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google/code" }
    ]
  },
  {
    id: "c3",
    text: "Record concise workflow demo video",
    subtext: "Record 2-3 minutes showcasing agent reasoning, self-debugging, and tool executions.",
    field: "video_recorded",
    links: [
      { label: "Record with Loom (Chrome/Desktop)", url: "https://www.loom.com/" },
      { label: "OBS Studio (Open Source Recording Software)", url: "https://obsproject.com/" }
    ]
  },
  {
    id: "c4",
    text: "Fulfill official Kaggle course submission form",
    subtext: "Package video walkthrough, GitHub repository, write-up and submit before July 6, 2026.",
    field: "submitted",
    links: [
      { label: "Official Submission Form Console", url: "https://www.kaggle.com/competitions/5-day-ai-agents-intensive-vibecoding-course-with-google/submissions" }
    ]
  }
];

export const CELEBRATION_PHRASES = [
  "Vibe coding level up! 🚀",
  "Let the agent cook! 🍳",
  "Prompt engineering level: Mastermind. 🧠",
  "Agent autonomy inched up +15%! 🤖",
  "No hallucinations detected here! 🛡️",
  "Beautiful compliance! 📝",
  "Vector memory synchronized. The agent will remember this! 💾",
  "Your terminal is on fire! ⚡",
  "Another step closer to Sovereign AI Architect status! 👑",
  "Anthropy, entropy, or prompt symmetry? You nailed it! 🔮",
  "Vibe agent pipeline successfully validated! 🌈",
  "Spectacular engineering flow accomplished! 🛠️",
  "That prompt was elegant! 💡"
];
