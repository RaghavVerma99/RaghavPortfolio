export const site = {
  name: "Raghav Verma",
  initials: "RV",
  role: "Software Engineer",
  firstName: "Raghav",
  location: "Greater Noida, India",
  email: "risshu.verma7@gmail.com",
  phone: "+91 9289202320",
  availability: "Open to SDE / SWE intern & full-time roles",
  portrait: "src/assets/portrait.jpg",
  intro:
    "I build high-performance backend systems and full-stack applications — from C++ network proxies handling 10K+ connections to sandboxed code compilers. Currently a B.Tech CSE undergrad obsessed with distributed systems.",
  aboutBig:
    "I write software that's fast, concurrent, and built for real scale — clean systems thinking from kernel sockets to full-stack web apps.",
  about:
    "I'm a Computer Science undergrad at Dronacharya Group of Institutions (B.Tech '27) focused on backend engineering and distributed systems. I've built an async Layer-7 reverse proxy in C++20 with epoll, an online compiler with a sandboxed execution pipeline, and a cross-platform task app in Flutter. I've solved 500+ DSA problems, contribute fixes to open-source C++ networking libraries, and mentor juniors in DSA and OOP.",
}

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Systems", href: "#systems" },
  { label: "Contact", href: "#contact" },
  { label: "Playground", href: "#games" },
]

export const marquee = [
  "C++20",
  "Go",
  "Java",
  "Python",
  "JavaScript",
  "Dart",
  "React.js",
  "Node.js",
  "Express.js",
  "Flutter",
  "Redis",
  "MySQL",
  "PostgreSQL",
  "Docker",
  "Linux",
  "Git",
]

export const skills = [
  {
    title: "Languages",
    items: ["C++20", "C", "Go", "Java", "JavaScript (ES6+)", "Python", "TypeScript", "Dart"],
  },
  {
    title: "Frontend",
    items: ["React", "Flutter", "Tailwind CSS", "Vite", "Redux Toolkit", "Responsive Design"],
  },
  {
    title: "Design & Craft",
    items: ["Design Systems", "Typography", "Color Theory", "Motion Design", "Accessibility", "UI Engineering"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "Fastify", "RESTful APIs", "WebSockets", "Flask"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MySQL", "Redis", "SQL", "Hive", "In-memory caching"],
  },
  {
    title: "Tools & DevOps",
    items: ["Git", "GitHub", "Docker", "Linux (Bash)", "CI / CD", "Vercel / Render"],
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
  coursework: [
    "Data Structures & Algorithms",
    "Operating Systems",
    "DBMS",
    "Computer Networks (TCP/IP)",
    "OOP",
  ],
}

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

export const stats = [
  { value: 500, suffix: "+", label: "DSA problems solved" },
  { value: 10, suffix: "K+", label: "Concurrent connections" },
  { value: 60, suffix: "fps", label: "Smooth rendering" },
  { value: 10, suffix: "+", label: "Juniors mentored" },
]

export const socials = [
  { label: "GitHub", href: "https://github.com/RaghavVerma99" },
  { label: "LinkedIn", href: "https://linkedin.com/in/raghav-verma7" },
  { label: "LeetCode", href: "https://leetcode.com/u/risshu_raghav" },
  { label: "Email", href: "mailto:risshu.verma7@gmail.com" },
]

export const profiles = [
  {
    label: "GitHub",
    handle: "RaghavVerma99",
    stat: "Open source & projects",
    href: "https://github.com/RaghavVerma99",
    icon: "github",
  },
  {
    label: "LeetCode",
    handle: "risshu_raghav",
    stat: "500+ problems solved",
    href: "https://leetcode.com/u/risshu_raghav",
    icon: "braces",
  },
  {
    label: "LinkedIn",
    handle: "Raghav Verma",
    stat: "Software Engineer · Let's connect",
    href: "https://linkedin.com/in/raghav-verma7",
    icon: "link",
  },
]
