import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Shield, ArrowRight } from 'lucide-react';

export default function InteractiveTerminal() {
  const [history, setHistory] = useState([
    { text: 'Apex Systems Dev Shell v2.4.0', type: 'system' },
    { text: 'Type "help" to see available commands or "deploy" to run CI/CD pipeline.', type: 'info' },
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
  skills          - Detail core tech stack & system metrics
  projects        - List production-grade systems built
  cat arch.txt    - View text-based system architecture
  ping db_replica - Check replication latency
  deploy          - Execute simulated automated release script
  system-status   - Check real-time Load Balancer and health stats
  clear           - Clear terminal log output`,
          type: 'output'
        });
        break;

      case 'about':
        newHistory.push({
          text: `ApexEngine // Backend Architect & Distributed Systems Engineer
------------------------------------------------------------------
Specialized in writing low-latency backend systems, consensus 
implementations, custom networking layers, and high-performance APIs.
Tech Stack: C++, Java, JavaScript, Shell Scripting, Docker, Redis, MySQL.`,
          type: 'output'
        });
        break;

      case 'skills':
        newHistory.push({
          text: `Language       Concur. Model    Latency Prof.   Core Specialty
------------------------------------------------------------------
C++            Thread Pool      Sub-ms          High-perf Engines, HTTP Servers
Java           Virtual Threads  ~5-10ms         Microservices, Raft Consensus
JavaScript     Async Event Loop ~15-30ms        BFF, API Gateways, WebSockets
Shell Script   Sync Scripting   N/A             Automation, CI/CD, Pipelines`,
          type: 'output'
        });
        break;

      case 'projects':
        newHistory.push({
          text: `Featured Distributed Systems:
------------------------------------------------------------------
1. HydraHTTP (C++)
   - Event-driven, multithreaded HTTP/1.1 server. Custom thread pool.
2. DistriQueue (Java)
   - Distributed message broker with Raft consensus and Netty TCP networking.
3. TelemetryPipe (JS + Shell)
   - Real-time metric ingestion engine with automated Bash telemetry scripts.`,
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
[Client Requests]
       │ (HTTPS/WebSockets)
       ▼
┌──────────────┐
│Load Balancer │ <── [Rate Limiter (Redis)]
└──────┬───────┘
       │ (Custom TCP Protocol - C++)
       ├───────────────────────┬───────────────────────┐
       ▼                       ▼                       ▼
┌──────────────┐        ┌──────────────┐        ┌──────────────┐
│ Auth Service │        │ Order Engine │        │ Notify Worker│
│ (Java Spring)│        │ (C++ Core)   │        │ (Java NIO)   │
└──────┬───────┘        └──────┬───────┘        └──────┬───────┘
       │                       │                       │
       ▼                       ▼                       ▼
┌──────────────────────────────────────────────────────────────┐
│                 Distributed Cache Layer (Redis)               │
└──────────────────────────────┬───────────────────────────────┘
                               ▼
                    ┌──────────────────────┐
                    │ MySQL Cluster (Raft) │
                    │ [Primary] ──►Replica │
                    └──────────────────────┘`,
            type: 'code'
          });
        } else {
          newHistory.push({ text: `Usage: cat arch.txt`, type: 'error' });
        }
        break;

      case 'ping':
        if (args[0] === 'db_replica') {
          newHistory.push({ text: 'PING db_replica (10.0.4.15) 56(84) bytes of data.', type: 'info' });
          
          // Simulate a multi-line ping response
          setTimeout(() => {
            setHistory(prev => [
              ...prev,
              { text: '64 bytes from 10.0.4.15: icmp_seq=1 ttl=64 time=0.342 ms', type: 'output' },
              { text: '64 bytes from 10.0.4.15: icmp_seq=2 ttl=64 time=0.285 ms', type: 'output' },
              { text: '64 bytes from 10.0.4.15: icmp_seq=3 ttl=64 time=0.311 ms', type: 'output' },
              { text: '--- db_replica ping statistics ---', type: 'info' },
              { text: '3 packets transmitted, 3 received, 0% packet loss, time 2002ms', type: 'output' },
              { text: 'rtt min/avg/max/mdev = 0.285/0.312/0.342/0.023 ms (Excellent replication sync)', type: 'success' }
            ]);
          }, 300);
        } else {
          newHistory.push({ text: `Usage: ping db_replica`, type: 'error' });
        }
        break;

      case 'deploy':
        newHistory.push({ text: 'Starting pipeline trigger: deploy-prod.sh...', type: 'info' });
        newHistory.push({ text: '[STAGE 1/4] Linting and Code Analysis...', type: 'info' });
        
        setTimeout(() => {
          setHistory(prev => [
            ...prev,
            { text: '✔ oxlint check passed (0 warnings, 0 errors) [JS/React]', type: 'success' },
            { text: '[STAGE 2/4] Compiling C++ Server Engine & Java Core...', type: 'info' }
          ]);
          
          setTimeout(() => {
            setHistory(prev => [
              ...prev,
              { text: '✔ C++ HydraHTTP compiled: g++ -O3 -std=c++20 (HydraHTTP bin created)', type: 'success' },
              { text: '✔ Java DistriQueue compiled: maven package success (JAR built)', type: 'success' },
              { text: '[STAGE 3/4] Running Integration & Stress Tests...', type: 'info' }
            ]);
            
            setTimeout(() => {
              setHistory(prev => [
                ...prev,
                { text: '✔ 12/12 C++ thread-pool unit tests PASSED', type: 'success' },
                { text: '✔ 8/8 Java Raft consensus replication tests PASSED', type: 'success' },
                { text: '[STAGE 4/4] Automated Docker Swarm Deployment...', type: 'info' }
              ]);
              
              setTimeout(() => {
                setHistory(prev => [
                  ...prev,
                  { text: '🐳 Building Docker images: tag=latest', type: 'info' },
                  { text: '🚀 Pushing images to registry.internal.net...', type: 'info' },
                  { text: '🔥 Re-routing load balancer connections (Rolling update)...', type: 'info' },
                  { text: '🚀 DEPLOYMENT COMPLETED SUCCESSFULY in 4.82s (Version v2.4.0 active)', type: 'success' }
                ]);
              }, 600);
            }, 600);
          }, 600);
        }, 500);
        break;

      case 'system-status':
        newHistory.push({
          text: `SYSTEM MONITOR: Production Environment
------------------------------------------------------------------
[CPU Usage]     [████░░░░░░] 42% (C++ Core Eng: 15%, Java Worker: 22%)
[RAM Usage]     [██████░░░░] 6.1GB / 16GB (38%)
[Network In]    48.2 MB/s
[Network Out]   142.9 MB/s
[Active Conns]  18,492 persistent TCP connections
[DB Replica]    Synced (Lag: 0.00ms)
[Cache Hit]     94.2% (128,490 req/min cached in Redis)`,
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
          <span>Interactive Systems Shell</span>
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
