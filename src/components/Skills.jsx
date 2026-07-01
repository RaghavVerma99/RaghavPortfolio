import React from 'react';
import { Cpu, Zap, Code, Shield } from 'lucide-react';

const skillsData = [
  {
    lang: 'C++',
    title: 'Systems & Memory Optimization',
    focus: 'Low-latency matching, custom thread pools, memory arenas',
    icon: Code,
    iconColor: '#ff4a77',
    progress: '95%',
    tags: ['C++20/23', 'epoll / sockets', 'STL Containers', 'Valgrind / GDB'],
    stats: [
      { label: 'Latency Efficiency', val: 'Sub-ms' },
      { label: 'Concurrency Model', val: 'Lock-Free Rings' }
    ]
  },
  {
    lang: 'Java',
    title: 'Distributed Systems & JVM',
    focus: 'Consensus protocols, virtual threads, asynchronous TCP',
    icon: Zap,
    iconColor: '#a855f7',
    progress: '92%',
    tags: ['Spring WebFlux', 'Netty Async IO', 'Project Loom', 'JVM GC Tuning'],
    stats: [
      { label: 'Throughput capacity', val: 'High-scale' },
      { label: 'State Sync', val: 'Raft Protocol' }
    ]
  },
  {
    lang: 'JavaScript',
    title: 'API Gateways & Client UI',
    focus: 'Fastify BFF layers, real-time socket routes, WebGL canvasses',
    icon: Cpu,
    iconColor: '#00f2fe',
    progress: '90%',
    tags: ['Node.js', 'Fastify', 'Three.js / Canvas', 'React JSX'],
    stats: [
      { label: 'Event Loop Execution', val: 'Libuv Async' },
      { label: 'Interactive layers', val: 'React Fiber' }
    ]
  },
  {
    lang: 'Shell Scripting',
    title: 'Linux Operations & Devops',
    focus: 'Rollout scheduling, system healthchecks, log parsers',
    icon: Shield,
    iconColor: '#f59e0b',
    progress: '94%',
    tags: ['Bash / Zsh', 'Docker Swarm', 'Cron Jobs', 'Sed / Awk / Grep'],
    stats: [
      { label: 'Sysadmin control', val: 'Linux Core' },
      { label: 'Orchestrator', val: 'Pipeline bash' }
    ]
  }
];

export default function Skills() {
  return (
    <div className="skills-grid">
      {skillsData.map((skill) => {
        const Icon = skill.icon;
        return (
          <div key={skill.lang} className="bento-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '280px' }}>
            <div>
              {/* Header */}
              <div className="flex justify-between align-center" style={{ marginBottom: '16px' }}>
                <div className="flex align-center" style={{ gap: '12px' }}>
                  <div 
                    className="skill-icon-box"
                    style={{
                      borderColor: `${skill.iconColor}22`,
                      backgroundColor: `${skill.iconColor}08`,
                      color: skill.iconColor,
                      padding: '8px',
                      borderRadius: '8px',
                      border: '1px solid',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: '800', fontFamily: 'var(--mono)' }}>{skill.lang}</h3>
                    <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>{skill.title}</p>
                  </div>
                </div>
                <span style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: skill.iconColor, fontWeight: '700' }}>
                  {skill.progress}
                </span>
              </div>

              <p style={{ fontSize: '12px', color: 'var(--muted)', fontStyle: 'italic', marginBottom: '16px', lineHeight: 1.4 }}>
                {skill.focus}
              </p>

              {/* Tag Pills */}
              <div className="flex wrap" style={{ gap: '6px', marginBottom: '20px' }}>
                {skill.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    style={{ 
                      fontSize: '9.5px', 
                      fontFamily: 'var(--mono)', 
                      background: 'rgba(255, 255, 255, 0.01)', 
                      border: '1px solid var(--card-border)', 
                      borderRadius: '4px',
                      padding: '2px 8px',
                      color: 'var(--muted)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Performance stats in footer */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.04)', paddingTop: '14px' }}>
              <div className="flex justify-between" style={{ marginBottom: '8px' }}>
                {skill.stats.map((stat, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '6px', fontSize: '10px', fontFamily: 'var(--mono)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{stat.label}:</span>
                    <span style={{ color: 'var(--foreground)', fontWeight: '600' }}>{stat.val}</span>
                  </div>
                ))}
              </div>
              
              {/* Progress bar */}
              <div style={{ height: '3px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '2px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    height: '100%', 
                    borderRadius: '2px', 
                    width: skill.progress, 
                    backgroundColor: skill.iconColor,
                    opacity: 0.8
                  }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
