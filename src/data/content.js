export const site = {
  name: "Raghav Verma",
  initials: "RV",
  role: "Software Engineer",
  firstName: "Raghav",
  location: "Greater Noida, India",
  email: "risshu.verma7@gmail.com",
  phone: "+91 9289202320",
  availability: "Open to SDE / SWE intern & full-time roles",
  portrait: "",
  intro:
    "I build high-performance backend systems and full-stack applications — from C++ network proxies handling 10K+ connections to sandboxed code compilers. Currently a B.Tech CSE undergrad obsessed with distributed systems.",
  aboutBig:
    "I write software that's fast, concurrent, and built for real scale — clean systems thinking from kernel sockets to full-stack web apps.",
  about:
    "I'm a Computer Science undergrad at Dronacharya Group of Institutions (B.Tech '27, CGPA 8.0/10) focused on backend engineering and distributed systems. I've built an async Layer-7 reverse proxy in C++20 with epoll, an online compiler with a sandboxed execution pipeline, and a cross-platform task app in Flutter. I've solved 500+ DSA problems, contribute fixes to open-source C++ networking libraries, and mentor juniors in DSA and OOP.",
}

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
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
    items: ["C++20", "Go", "Java", "JavaScript (ES6+)", "Python", "Dart"],
  },
  {
    title: "Frontend",
    items: ["React.js", "Flutter", "Tailwind CSS", "Bootstrap", "State Management", "Responsive Design"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "Fastify", "Flask", "RESTful APIs", "WebSockets"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MySQL", "Redis", "SQL", "Hive", "In-memory caching"],
  },
  {
    title: "Tools & DevOps",
    items: ["Git", "GitHub", "Docker", "Linux (Bash)", "CI / CD", "Vercel / Render"],
  },
  {
    title: "Concepts",
    items: ["System Design", "Distributed Systems", "REST API Design", "OOP", "Multithreading", "Concurrency"],
  },
]

export const experience = [
  {
    role: "Software Development Intern",
    company: "SoftPro",
    period: "Sep 2025 · 1 month",
    summary:
      "Worked on core data structures and maintained an existing C++ codebase in an agile, code-reviewed workflow.",
    highlights: [
      "Implemented and optimized linked lists, trees, hash maps, and graph algorithms in C++",
      "Resolved 15+ issues through debugging and refactoring during sprint cycles",
      "Participated in code reviews and version control using Git",
    ],
    stack: ["C++", "Data Structures", "Git", "Agile"],
  },
  {
    role: "Open Source Contributor",
    company: "C++ networking & distributed-systems utilities",
    period: "Ongoing",
    summary:
      "Contributing bug fixes and performance patches to open-source distributed-systems utilities and C++ networking libraries.",
    highlights: [
      "Fixed concurrency and edge-case bugs in networking utilities",
      "Submitted performance patches improving throughput under load",
    ],
    stack: ["C++", "Networking", "Concurrency"],
  },
  {
    role: "Peer Mentor — DSA & OOP",
    company: "Dronacharya Group of Institutions",
    period: "Current",
    summary:
      "Selected as a peer mentor to guide juniors through Data Structures & Algorithms and Object-Oriented Programming.",
    highlights: [
      "Guided 10+ juniors through debugging, problem-solving, and core CS concepts",
    ],
    stack: ["C++", "DSA", "OOP", "Mentorship"],
  },
]

export const education = {
  degree: "B.Tech — Computer Science Engineering",
  school: "Dronacharya Group of Institutions, Greater Noida",
  period: "2023 — 2027",
  cgpa: "8.0 / 10",
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
