import { useState, useRef, useEffect, useCallback } from 'react';
import { Terminal, ArrowDown, History } from 'lucide-react';

const COMMANDS = ['help', 'skills', 'projects', 'deploy', 'ping cache', 'system-status'];

export default function InteractiveTerminal() {
  const [history, setHistory] = useState([
    { text: 'Backend Ops Shell v2.0.0', type: 'system' },
    { text: 'Type "help" to see available commands or "deploy" to run the release pipeline.', type: 'info' },
    { text: '', type: 'empty' },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const histIdx = useRef(-1);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [history]);

  const pushLines = useCallback((lines) => {
    if (!lines.length) return;
    setHistory((prev) => [...prev, ...lines]);
  }, []);

  const executeCommand = useCallback(
    (cmdText) => {
      const trimmed = cmdText.trim();
      if (!trimmed) return;

      const parts = trimmed.split(' ');
      const command = parts[0].toLowerCase();
      const args = parts.slice(1);

      setHistory((prev) => [...prev, { text: `$ ${trimmed}`, type: 'input' }]);
      setCmdHistory((prev) => (prev[prev.length - 1] === trimmed ? prev : [...prev, trimmed]));
      histIdx.current = -1;

      switch (command) {
        case 'help':
          pushLines([
            { text: `Available Commands:
  about           - Profile summary of the engineer
  skills          - Core stack & runtime metrics
  projects        - Backend systems built
  cat arch.txt    - View text-based architecture
  ping cache      - Check Redis latency
  deploy          - Execute simulated release pipeline
  system-status   - Live proxy & DB health stats
  clear           - Clear terminal log output`, type: 'output' },
          ]);
          break;

        case 'about':
          pushLines([
            { text: `Raghav Verma // Backend Engineer — C++ & Node.js (Express)
------------------------------------------------------------------
Specialized in low-latency backend systems: epoll-based proxies in
C++20, async REST/WebSocket APIs in Express, and Redis/PostgreSQL
underneath. No blocking I/O, no wasted allocations.
Stack: C++, JavaScript (Node.js/Express), Redis, PostgreSQL, Docker.`, type: 'output' },
          ]);
          break;

        case 'skills':
          pushLines([
            { text: `Language       Concurrency    Latency        Specialty
------------------------------------------------------------------
C++            Thread pool    Sub-ms         epoll proxies, match engines
JavaScript     Event loop     ~5-15ms        Express REST/WS APIs, BFF
Shell Script   Sync scripts   N/A            CI/CD, automation, deploys`, type: 'output' },
          ]);
          break;

        case 'projects':
          pushLines([
            { text: `Backend Systems Built:
------------------------------------------------------------------
1. ApolloGateway (C++)
   - Asynchronous reverse proxy. Edge-triggered epoll, consistent
     hashing, Redis rate limiting.
2. Express API Gateway (Node.js)
   - REST + WebSocket routing with JWT auth and validated handlers.
3. TelemetryPipe (JS + Shell)
   - Real-time metric ingestion with automated Bash telemetry.`, type: 'output' },
          ]);
          break;

        case 'clear':
          setHistory([]);
          setInput('');
          return;

        case 'cat':
          if (args[0] === 'arch.txt') {
            pushLines([
              { text: `
[ Clients ]  Web · Mobile · SDK
      │  HTTPS / WebSockets
      ▼
┌─────────────────────────┐
│   Edge Proxy            │  C++20 · epoll
│   consistent hashing    │  ◄─ rate limit (Redis)
└───────────┬─────────────┘
      ┌─────┴─────┐
      ▼           ▼
┌──────────┐ ┌──────────┐
│ Express  │ │  Core    │
│ API      │ │  Engine  │
│ Node.js  │ │  C++20   │
└────┬─────┘ └────┬─────┘
      └─────┬─────┘
            ▼
     ┌──────────┐
     │  Redis   │  cache · 94% hit
     └────┬─────┘
          ▼
    ┌──────────┐
    │PostgreSQL│  source of truth
    └──────────┘`, type: 'code' },
            ]);
          } else {
            pushLines([{ text: `Usage: cat arch.txt`, type: 'error' }]);
          }
          break;

        case 'ping':
          if (args[0] === 'cache') {
            pushLines([{ text: 'PING cache (10.0.4.11) 56(84) bytes of data.', type: 'info' }]);
            setTimeout(() => {
              pushLines([
                { text: '64 bytes from 10.0.4.11: icmp_seq=1 ttl=64 time=0.312 ms', type: 'output' },
                { text: '64 bytes from 10.0.4.11: icmp_seq=2 ttl=64 time=0.288 ms', type: 'output' },
                { text: '64 bytes from 10.0.4.11: icmp_seq=3 ttl=64 time=0.305 ms', type: 'output' },
                { text: '--- cache ping statistics ---', type: 'info' },
                { text: '3 packets transmitted, 3 received, 0% packet loss, time 2002ms', type: 'output' },
                { text: 'rtt min/avg/max/mdev = 0.288/0.301/0.312/0.012 ms (warm cache)', type: 'success' },
              ]);
            }, 300);
          } else {
            pushLines([{ text: `Usage: ping cache`, type: 'error' }]);
          }
          break;

        case 'deploy':
          pushLines([
            { text: 'Starting pipeline trigger: release-v2.0.0.sh...', type: 'info' },
            { text: '[STAGE 1/4] Linting and Code Analysis...', type: 'info' },
          ]);
          setTimeout(() => {
            pushLines([
              { text: '✔ oxlint check passed (0 warnings, 0 errors) [Express + React]', type: 'success' },
              { text: '[STAGE 2/4] Compiling C++ engine & bundling Express API...', type: 'info' },
            ]);
          }, 500);
          setTimeout(() => {
            pushLines([
              { text: '✔ g++ -O3 -std=c++20 core_engine.cpp (core_engine built)', type: 'success' },
              { text: '✔ esbuild bundle → dist/api.mjs (Express API packaged)', type: 'success' },
              { text: '[STAGE 3/4] Running Integration & Stress Tests...', type: 'info' },
            ]);
          }, 1100);
          setTimeout(() => {
            pushLines([
              { text: '✔ 12/12 C++ epoll proxy tests PASSED', type: 'success' },
              { text: '✔ 8/8 Express API integration tests PASSED', type: 'success' },
              { text: '[STAGE 4/4] Rolling Deployment...', type: 'info' },
            ]);
          }, 1700);
          setTimeout(() => {
            pushLines([
              { text: '🐳 Building Docker images (tag=latest)', type: 'info' },
              { text: '🔥 Re-routing load balancer (zero-downtime)', type: 'info' },
              { text: '🚀 DEPLOYMENT COMPLETED SUCCESSFULLY in 4.21s (v2.0.0 active)', type: 'success' },
            ]);
          }, 2400);
          break;

        case 'system-status':
          pushLines([
            { text: `SYSTEM MONITOR: Production (illustrative)
------------------------------------------------------------------
[CPU]          [████░░░░░░] 41%  (C++ engine 18%, Node 15%)
[MEMORY]       [██████░░░░] 6.1GB / 16GB (38%)
[NETWORK IN]   48.2 MB/s
[NETWORK OUT]  142.9 MB/s
[ACTIVE CONNS] 18,492 TCP connections (epoll proxy)
[CACHE HIT]    94.2% (Redis · 128k req/min)
[DB LAG]       Postgres replica synced · 0.00ms`, type: 'output' },
          ]);
          break;

        default:
          pushLines([
            { text: `Command not found: "${command}". Type "help" for a list of valid commands.`, type: 'error' },
          ]);
          break;
      }

      setInput('');
    },
    [pushLines]
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const next =
        histIdx.current === -1 ? cmdHistory.length - 1 : Math.max(0, histIdx.current - 1);
      histIdx.current = next;
      setInput(cmdHistory[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx.current === -1) return;
      const next = histIdx.current + 1;
      if (next >= cmdHistory.length) {
        histIdx.current = -1;
        setInput('');
      } else {
        histIdx.current = next;
        setInput(cmdHistory[next]);
      }
    }
  };

  return (
    <div className="glass-card terminal-card flex min-h-full flex-col">
      {/* Terminal Title Bar */}
      <div className="terminal-header">
        <div className="terminal-title">
          <Terminal size={14} style={{ color: 'var(--accent-cyan)' }} />
          <span>Backend Ops Shell</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span
            className="hidden rounded-full border border-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted sm:inline-block"
            title="Simulated telemetry for demonstration"
          >
            simulated
          </span>
          <div className="terminal-window-buttons">
            <span className="terminal-window-button red"></span>
            <span className="terminal-window-button yellow"></span>
            <span className="terminal-window-button green"></span>
          </div>
        </div>
      </div>

      {/* Terminal Output Log */}
      <div className="terminal-output flex-1">
        {history.map((line, idx) => {
          let colorClass = 'terminal-line-output';
          if (line.type === 'system') colorClass = 'terminal-line-system';
          if (line.type === 'info') colorClass = 'terminal-line-info';
          if (line.type === 'input') colorClass = 'terminal-line-input';
          if (line.type === 'success') colorClass = 'terminal-line-success';
          if (line.type === 'error') colorClass = 'terminal-line-error';
          if (line.type === 'code') colorClass = 'terminal-line-code';
          if (line.type === 'output') colorClass = 'terminal-line-output';

          if (line.type === 'empty') return <div key={idx} style={{ height: '8px' }} />;

          return (
            <div key={idx} className={`terminal-line ${colorClass}`}>
              {line.text}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Quick command chips */}
      <div className="flex gap-1.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
        {COMMANDS.map((c) => (
          <button
            key={c}
            onClick={() => executeCommand(c)}
            className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] text-muted transition-colors hover:border-accent/40 hover:text-accent"
          >
            {c}
          </button>
        ))}
      </div>

      {/* Input Panel */}
      <div className="terminal-input-row">
        <span className="flex items-center gap-1.5 text-muted">
          <span className="terminal-input-prompt">~</span>
          <span className="hidden items-center gap-1 sm:flex" aria-hidden>
            <ArrowDown size={10} />
            <History size={10} />
          </span>
        </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="terminal-input-field"
          placeholder="run command… (enter ↵)"
          aria-label="Terminal command input"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
}