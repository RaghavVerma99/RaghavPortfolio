import React, { useState, useRef, useEffect } from 'react';
import { Terminal, ArrowRight } from 'lucide-react';

export default function InteractiveTerminal() {
  const [history, setHistory] = useState([
    { text: 'Backend Ops Shell v2.0.0', type: 'system' },
    { text: 'Type "help" to see available commands or "deploy" to run the release pipeline.', type: 'info' },
    { text: '', type: 'empty' }
  ]);
  const [input, setInput] = useState('');
  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdText) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newHistory = [...history, { text: `$ ${trimmed}`, type: 'input' }];

    switch (command) {
      case 'help':
        newHistory.push({
          text: `Available Commands:
  about           - Profile summary of the engineer
  skills          - Core stack & runtime metrics
  projects        - Backend systems built
  cat arch.txt    - View text-based architecture
  ping cache      - Check Redis latency
  deploy          - Execute simulated release pipeline
  system-status   - Live proxy & DB health stats
  clear           - Clear terminal log output`,
          type: 'output'
        });
        break;

      case 'about':
        newHistory.push({
          text: `Raghav Verma // Backend Engineer — C++ & Node.js (Express)
------------------------------------------------------------------
Specialized in low-latency backend systems: epoll-based proxies in
C++20, async REST/WebSocket APIs in Express, and Redis/PostgreSQL
underneath. No blocking I/O, no wasted allocations.
Stack: C++, JavaScript (Node.js/Express), Redis, PostgreSQL, Docker.`,
          type: 'output'
        });
        break;

      case 'skills':
        newHistory.push({
          text: `Language       Concurrency    Latency        Specialty
------------------------------------------------------------------
C++            Thread pool    Sub-ms         epoll proxies, match engines
JavaScript     Event loop     ~5-15ms        Express REST/WS APIs, BFF
Shell Script   Sync scripts   N/A            CI/CD, automation, deploys`,
          type: 'output'
        });
        break;

      case 'projects':
        newHistory.push({
          text: `Backend Systems Built:
------------------------------------------------------------------
1. ApolloGateway (C++)
   - Asynchronous reverse proxy. Edge-triggered epoll, consistent
     hashing, Redis rate limiting.
2. Express API Gateway (Node.js)
   - REST + WebSocket routing with JWT auth and validated handlers.
3. TelemetryPipe (JS + Shell)
   - Real-time metric ingestion with automated Bash telemetry.`,
          type: 'output'
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'cat':
        if (args[0] === 'arch.txt') {
          newHistory.push({
            text: `
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
    └──────────┘`,
            type: 'code'
          });
        } else {
          newHistory.push({ text: `Usage: cat arch.txt`, type: 'error' });
        }
        break;

      case 'ping':
        if (args[0] === 'cache') {
          newHistory.push({ text: 'PING cache (10.0.4.11) 56(84) bytes of data.', type: 'info' });

          setTimeout(() => {
            setHistory(prev => [
              ...prev,
              { text: '64 bytes from 10.0.4.11: icmp_seq=1 ttl=64 time=0.312 ms', type: 'output' },
              { text: '64 bytes from 10.0.4.11: icmp_seq=2 ttl=64 time=0.288 ms', type: 'output' },
              { text: '64 bytes from 10.0.4.11: icmp_seq=3 ttl=64 time=0.305 ms', type: 'output' },
              { text: '--- cache ping statistics ---', type: 'info' },
              { text: '3 packets transmitted, 3 received, 0% packet loss, time 2002ms', type: 'output' },
              { text: 'rtt min/avg/max/mdev = 0.288/0.301/0.312/0.012 ms (warm cache)', type: 'success' }
            ]);
          }, 300);
        } else {
          newHistory.push({ text: `Usage: ping cache`, type: 'error' });
        }
        break;

      case 'deploy':
        newHistory.push({ text: 'Starting pipeline trigger: release-v2.0.0.sh...', type: 'info' });
        newHistory.push({ text: '[STAGE 1/4] Linting and Code Analysis...', type: 'info' });

        setTimeout(() => {
          setHistory(prev => [
            ...prev,
            { text: '✔ oxlint check passed (0 warnings, 0 errors) [Express + React]', type: 'success' },
            { text: '[STAGE 2/4] Compiling C++ engine & bundling Express API...', type: 'info' }
          ]);

          setTimeout(() => {
            setHistory(prev => [
              ...prev,
              { text: '✔ g++ -O3 -std=c++20 core_engine.cpp (core_engine built)', type: 'success' },
              { text: '✔ esbuild bundle → dist/api.mjs (Express API packaged)', type: 'success' },
              { text: '[STAGE 3/4] Running Integration & Stress Tests...', type: 'info' }
            ]);

            setTimeout(() => {
              setHistory(prev => [
                ...prev,
                { text: '✔ 12/12 C++ epoll proxy tests PASSED', type: 'success' },
                { text: '✔ 8/8 Express API integration tests PASSED', type: 'success' },
                { text: '[STAGE 4/4] Rolling Deployment...', type: 'info' }
              ]);

              setTimeout(() => {
                setHistory(prev => [
                  ...prev,
                  { text: '🐳 Building Docker images (tag=latest)', type: 'info' },
                  { text: '🔥 Re-routing load balancer (zero-downtime)', type: 'info' },
                  { text: '🚀 DEPLOYMENT COMPLETED SUCCESSFULLY in 4.21s (v2.0.0 active)', type: 'success' }
                ]);
              }, 600);
            }, 600);
          }, 600);
        }, 500);
        break;

      case 'system-status':
        newHistory.push({
          text: `SYSTEM MONITOR: Production
------------------------------------------------------------------
[CPU]          [████░░░░░░] 41%  (C++ engine 18%, Node 15%)
[MEMORY]       [██████░░░░] 6.1GB / 16GB (38%)
[NETWORK IN]   48.2 MB/s
[NETWORK OUT]  142.9 MB/s
[ACTIVE CONNS] 18,492 TCP connections (epoll proxy)
[CACHE HIT]    94.2% (Redis · 128k req/min)
[DB LAG]       Postgres replica synced · 0.00ms`,
          type: 'output'
        });
        break;

      default:
        newHistory.push({
          text: `Command not found: "${command}". Type "help" for a list of valid commands.`,
          type: 'error'
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    }
  };

  return (
    <div className="glass-card terminal-card">
      {/* Terminal Title Bar */}
      <div className="terminal-header">
        <div className="terminal-title">
          <Terminal size={14} style={{ color: 'var(--accent-cyan)' }} />
          <span>Backend Ops Shell</span>
        </div>
        <div className="terminal-window-buttons">
          <span className="terminal-window-button red"></span>
          <span className="terminal-window-button yellow"></span>
          <span className="terminal-window-button green"></span>
        </div>
      </div>

      {/* Terminal Output Log */}
      <div className="terminal-output">
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

      {/* Input Panel */}
      <div className="terminal-input-row">
        <ArrowRight size={12} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
        <span className="terminal-input-prompt">~</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="terminal-input-field"
          placeholder="run command... (e.g. deploy)"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
