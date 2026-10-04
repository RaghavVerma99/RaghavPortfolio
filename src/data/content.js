export const site = {
  name: "Raghav Verma",
  initials: "RV",
  role: "Software Engineer",
  firstName: "Raghav",
  location: "Greater Noida, India",
  timezone: "IST (UTC+5:30)",
  email: "risshu.verma7@gmail.com",
  phone: "+91 9289202320",
  availability: "Open to SDE / SWE intern & full-time roles",
  notice: "Available for internships now · full-time from 2027",
  resume: "/resume.html",
  portrait: "src/assets/portrait.jpg",
  intro:
    "I build high-performance backend systems and full-stack applications — from C++ network proxies handling 10K+ connections to sandboxed code compilers. Currently a B.Tech CSE undergrad obsessed with distributed systems.",
  aboutBig:
    "I write software that's fast, concurrent, and built for real scale — clean systems thinking from kernel sockets to full-stack web apps.",
  about:
    "I'm a Computer Science undergrad at Dronacharya Group of Institutions (B.Tech '27) focused on backend engineering and distributed systems. I've built an async Layer-7 reverse proxy in C++20 with epoll, an online compiler with a sandboxed execution pipeline, and a cross-platform task app in Flutter. I've solved 500+ DSA problems, contribute fixes to open-source C++ networking libraries, and mentor juniors in DSA and OOP.",
}

export const lookingFor = [
  "SDE / SWE internships",
  "New-grad / full-time SWE",
  "Backend & distributed systems",
  "Full-stack product teams",
]

export const stats = [
  { value: "500+", label: "DSA problems solved" },
  { value: "10K+", label: "Concurrent connections" },
  { value: "60fps", label: "Smooth rendering" },
  { value: "10+", label: "Juniors mentored" },
]

/* `description`, `stack` and `link` are what the page renders. The remaining
   fields are the deeper write-ups kept from the previous build — retained so
   the detail isn't lost, and available if a case-study view is ever restored. */
export const projects = [
  {
    index: "01",
    title: "ApolloGateway — Asynchronous Reverse Proxy",
    description:
      "A high-performance Layer-7 reverse proxy built on edge-triggered epoll event loops — with consistent-hashing load balancing, circuit breakers, and Redis rate limiting to protect downstream microservices.",
    stack: ["C++20", "epoll", "React", "Redis"],
    metric: "10K+",
    metricLabel: "connections / thread",
    link: "https://github.com/RaghavVerma99",
    problem:
      "Downstream microservices took traffic with no single point of control. A spike on one endpoint cascaded into overload, there was no shared rate limiting, and caching suffered because requests landed on random instances.",
    approach: [
      "Layer-7 reverse proxy in C++20 on edge-triggered epoll, with a fixed thread pool sized to core count to avoid context-switch overhead.",
      "Consistent-hashing load balancing so requests for a key always land on the same node — preserving cache locality across scale events.",
      "Redis-backed token-bucket rate limiting plus circuit breakers that trip on error-rate thresholds and half-open to recover.",
    ],
    architecture: `[Client]──(HTTPS/WS)──►[ApolloGateway · C++20/epoll]
                    │ consistent-hash
        ┌───────────┼───────────┐
        ▼           ▼           ▼
     svc-A        svc-B       svc-C
        └─────► [Redis]  rate-limit + shared cache`,
    tradeoffs:
      "I chose a hand-rolled epoll loop over libuv/ASIO for total control of scheduling and IO — it costs more code to maintain, but buys roughly 2-3x lower per-connection overhead.",
    results: [
      { value: "10K+", label: "conns / thread" },
      { value: "p95 <1ms", label: "latency" },
      { value: "0 drops", label: "during failover" },
    ],
  },
  {
    index: "02",
    title: "Online C++ Compiler",
    description:
      "A full-stack online compiler with real-time code editing and a sandboxed execution pipeline that securely compiles user-submitted C++ and returns stdout/stderr with proper error handling.",
    stack: ["React", "Express.js", "Node.js", "Render"],
    metric: "<1s",
    metricLabel: "compile latency",
    link: "https://github.com/RaghavVerma99",
    problem:
      "Running untrusted user code on a shared server is risky — one fork-bomb, a runaway loop, or a syscall-heavy binary can stall the entire host.",
    approach: [
      "Sandboxed execution in isolated processes with hard limits on CPU time, memory, and output size.",
      "Timeout watchdog that kills both compile and runtime when they exceed budget.",
      "Queue-based execution so concurrent submissions are serialized and can never saturate the host.",
    ],
    architecture: `[Editor]──►[API]──►[Queue]──►[Sandbox runner]
                  ▲                    │ g++ -O2 -fsandbox
                  └── stdout/stderr ◄──┘ kill on timeout`,
    tradeoffs:
      "Prioritizing isolation over throughput means every run pays a small spawn overhead — the right trade for safe multi-tenant execution.",
    results: [
      { value: "<1s", label: "median compile" },
      { value: "isolated", label: "sandbox" },
      { value: "0 escapes", label: "in tests" },
    ],
  },
  {
    index: "03",
    title: "TaskFlow — Cross-Platform Task App",
    description:
      "A cross-platform task & schedule app with a custom OLED-optimized UI — unidirectional state with Riverpod and Hive for offline-first persistence and seamless sync.",
    stack: ["Flutter", "Dart", "Riverpod", "Hive"],
    metric: "60",
    metricLabel: "fps on iOS & Android",
    link: "https://github.com/RaghavVerma99",
    problem:
      "Task apps on mobile feel bloated and slow. I wanted a fast, offline-first tracker that works on battery-constrained OLED screens without hammering the network.",
    approach: [
      "Riverpod for unidirectional, fully testable state management with no rebuild leaks.",
      "Hive for local, offline-first persistence that syncs transparently when connectivity returns.",
      "Custom OLED-friendly palette tuned for dark screens — near-black backgrounds to minimize power draw.",
    ],
    architecture: `[UI]──►[Riverpod store]──►[Hive · local DB]
                      ▲                    │
                      └──── sync queue ◄───┘ offline-first`,
    tradeoffs:
      "Hive over SQLite for speed and simplicity of the sync story — I accepted less relational query power for a much simpler offline pipeline.",
    results: [
      { value: "60 fps", label: "iOS & Android" },
      { value: "offline", label: "first persistence" },
      { value: "OLED", label: "battery tuned" },
    ],
  },
]

export const experience = [
  {
    role: "SWE Intern",
    company: "AmbiguityLabs",
    period: "Aug 2026 — Present",
    summary:
      "Full-stack software engineering intern building and shipping end-to-end features — from React frontends to Node.js APIs and database layers — in a fast-paced, production codebase.",
    highlights: [
      "Built and shipped end-to-end features across React, Node.js/Express, and PostgreSQL/Redis",
      "Collaborated with frontend and backend teams through sprint planning, code reviews, and pair programming",
      "Wrote and optimized REST APIs with proper validation, error handling, and caching",
    ],
    stack: ["React", "Node.js", "Express", "PostgreSQL", "Redis", "Git"],
  },
  {
    role: "Open Source Contributor",
    company: "C++ networking & distributed-systems utilities",
    period: "2025 — 2026",
    summary:
      "Contributed bug fixes and performance patches to open-source distributed-systems utilities and C++ networking libraries.",
    highlights: [
      "Fixed concurrency and edge-case bugs in networking utilities",
      "Submitted performance patches improving throughput under load",
    ],
    stack: ["C++", "Networking", "Concurrency"],
  },
]

export const education = {
  degree: "B.Tech — Computer Science Engineering",
  school: "Dronacharya Group of Institutions, Greater Noida",
  period: "2023 — 2027",
}

export const skills = [
  {
    title: "Languages",
    items: ["C++20", "C", "Go", "Java", "JavaScript", "TypeScript", "Python", "Dart"],
  },
  {
    title: "Frontend",
    items: ["React", "Flutter", "Tailwind CSS", "Vite", "Redux Toolkit"],
  },
  {
    title: "Systems",
    items: ["epoll / async I/O", "Concurrency", "TCP/IP", "Load balancing", "Caching", "Circuit breakers"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "Fastify", "RESTful APIs", "WebSockets", "Flask"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MySQL", "Redis", "SQL", "In-memory caching"],
  },
  {
    title: "Tools & DevOps",
    items: ["Git", "GitHub", "Docker", "Linux (Bash)", "CI / CD", "Vercel / Render"],
  },
]

/* Rendered as the tile grid. Kept in one place so the hrefs can't drift.
   `hue` is the single knob each tile uses to tint its glow, ring and hover
   wash — the palette stays coherent because every colour is derived from a
   position on one spectrum rather than hand-picked per link. */
export const socials = [
  {
    label: "GitHub",
    handle: "RaghavVerma99",
    detail: "Projects & open source",
    href: "https://github.com/RaghavVerma99",
    external: true,
    hue: 88,
    icon: "github",
    brand: "#ffffff",
  },
  {
    label: "LinkedIn",
    handle: "raghav-verma7",
    detail: "Experience & recommendations",
    href: "https://linkedin.com/in/raghav-verma7",
    external: true,
    hue: 205,
    icon: "linkedin",
    brand: "#4a9ee8",
  },
  {
    label: "LeetCode",
    handle: "risshu_raghav",
    detail: "500+ problems solved",
    href: "https://leetcode.com/u/risshu_raghav",
    external: true,
    hue: 42,
    icon: "leetcode",
    brand: "#ffa116",
  },
  {
    label: "Email",
    handle: "risshu.verma7@gmail.com",
    detail: "Screens or a quick intro",
    href: "mailto:risshu.verma7@gmail.com?subject=SDE%20%2F%20SWE%20role%20%E2%80%94%20Raghav%20Verma",
    external: false,
    hue: 282,
    icon: "mail",
    brand: "#ff4d4d",
  },
  {
    label: "Resume",
    handle: "PDF",
    detail: "Full experience & skills",
    href: "/resume.html",
    external: false,
    hue: 160,
    icon: "resume",
    brand: "#b48bff",
  },
]
