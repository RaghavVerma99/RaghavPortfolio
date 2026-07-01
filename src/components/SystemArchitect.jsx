import React from 'react';
import { Cpu, Server, Database, Shield, Radio, Code, Settings } from 'lucide-react';

const systemNodesInfo = {
  lb: {
    title: 'Load Balancer',
    subtitle: 'Consistent Hashing Balancer (C++ / Socket Engine)',
    icon: Radio,
    colorClass: 'lb-theme',
    iconColor: '#4facfe',
    description: 'A custom layer-4 load balancer written in C++ using an epoll event-loop. Distributes connections across backend application instances using Consistent Hashing to minimize cache disruption on scaling events.',
    metrics: [
      { label: 'Throughput', value: '380,000 RPS' },
      { label: 'p99 Latency', value: '< 0.2 ms' },
      { label: 'Active Balancer Nodes', value: '3 (Active-Active)' },
      { label: 'Connection Strategy', value: 'Consistent Hashing' }
    ],
    code: `// Consistent hashing ring distribution logic
uint32_t get_node_for_key(const std::string& ip_key) {
    uint32_t hash = murmur_hash3(ip_key.c_str(), ip_key.length(), 42);
    auto it = hash_ring.lower_bound(hash);
    if (it == hash_ring.end()) {
        return hash_ring.begin()->second; // wrap around ring
    }
    return it->second;
}`,
    script: `#!/bin/bash
# Compile and hot-reload C++ Load Balancer
g++ -O3 -std=c++20 -pthread lb_engine.cpp -o lb_engine
if [ $? -eq 0 ]; then
  echo "Build successful. Swapping lb_engine binary safely..."
  kill -USR2 $(pgrep lb_engine) # Trigger zero-downtime hot takeover
else
  echo "Compiler error detected. Reverting release." >&2
  exit 1
fi`
  },
  srv1: {
    title: 'Auth & Identity Service',
    subtitle: 'Session & Auth Handler (Java / Spring WebFlux)',
    icon: Cpu,
    colorClass: 'auth-theme',
    iconColor: '#bd00ff',
    description: 'High-security stateless authentication engine. Validates JWT, resolves scopes, manages distributed user permissions, and signs verification credentials using Java Virtual Threads (Project Loom) for high blocking-concurrency efficiency.',
    metrics: [
      { label: 'Throughput', value: '18,500 RPS' },
      { label: 'p99 Latency', value: '5.2 ms' },
      { label: 'Active Threads', value: '256 (Virtual Threads)' },
      { label: 'Token Type', value: 'Ed25519 JWT Tokens' }
    ],
    code: `@RestController
@RequestMapping("/auth")
public class AuthController {
    @PostMapping("/validate")
    public Mono<AuthPayload> validateToken(@RequestHeader("Authorization") String token) {
        return jwtVerifier.parseAndVerify(token)
            .map(claims -> new AuthPayload(claims.getSubject(), claims.getRoles()))
            .subscribeOn(Schedulers.boundedElastic()); // utilizes Loom Virtual Threads
    }
}`,
    script: `#!/bin/bash
# Check Memory leaks in Java Auth Service JVM using jstat/jmap
PID=$(pgrep -f auth-service.jar)
echo "Analyzing Auth Service JVM metrics (PID: $PID)..."
jstat -gcutil $PID 1000 3
if [ $(jinfo -flag MinHeapFreeRatio $PID | awk -F= '{print $2}') -lt 20 ]; then
  echo "Warning: Low JVM Heap margin! Alerting sysops."
  jmap -dump:live,format=b,file=/tmp/auth_heap_dump.hprof $PID
fi`
  },
  srv2: {
    title: 'Order Engine',
    subtitle: 'Low-latency Matching Engine (C++20)',
    icon: Server,
    colorClass: 'order-theme',
    iconColor: '#ff4a77',
    description: 'The core transactional processor. Handled entirely in memory using lock-free ring buffers, cache-friendly data structures (std::vector custom pools), and direct CPU core pinning to ensure deterministic under-millisecond matching execution.',
    metrics: [
      { label: 'Throughput', value: '220,000 orders/sec' },
      { label: 'p99 Latency', value: '0.08 ms (80µs)' },
      { label: 'Core Pinning', value: 'CPU Core #2, #4' },
      { label: 'Concurrency Model', value: 'LMAX Disruptor RingBuffer' }
    ],
    code: `// Custom cache-aligned Order book match loop
struct alignas(64) LimitOrder {
    uint64_t order_id;
    uint32_t price;
    uint32_t qty;
    bool side; // Buy/Sell
};

void match_orders(LimitOrder& incoming) {
    auto& book = incoming.side ? ask_book : bid_book;
    while (!book.empty() && incoming.qty > 0) {
        auto best = book.begin();
        if (incoming.side ? (incoming.price >= best->price) : (incoming.price <= best->price)) {
            uint32_t filled = std::min(incoming.qty, best->qty);
            incoming.qty -= filled;
            best->qty -= filled;
            record_trade(incoming.order_id, best->order_id, filled);
            if (best->qty == 0) book.erase(best);
        } else break;
    }
}`,
    script: `#!/bin/bash
# Profile CPU cache misses on Order Engine using perf
echo "Profiling hardware events on Order Engine..."
perf stat -e cache-references,cache-misses,cycles,instructions -p $(pgrep order_engine) sleep 5`
  },
  srv3: {
    title: 'Notify Worker',
    subtitle: 'Real-time Message Broker (Java / Netty Async IO)',
    icon: Radio,
    colorClass: 'notify-theme',
    iconColor: '#f59e0b',
    description: 'A distributed notification worker built on Netty. Listens to Kafka/Redis clusters and broadcasts notifications, webhooks, and push alerts. Uses asynchronous non-blocking event-loops for high scalability.',
    metrics: [
      { label: 'Throughput', value: '62,000 alerts/sec' },
      { label: 'p99 Latency', value: '28 ms' },
      { label: 'Event Loop', value: 'Netty NioEventLoopGroup' },
      { label: 'Network Client', value: 'TCP Webhook Broker' }
    ],
    code: `// Netty channel handler configuration
public class WebhookPipelineInitializer extends ChannelInitializer<SocketChannel> {
    @Override
    protected void initChannel(SocketChannel ch) {
        ChannelPipeline pipeline = ch.pipeline();
        pipeline.addLast(new HttpResponseEncoder());
        pipeline.addLast(new HttpRequestDecoder());
        pipeline.addLast(new WebhookBrokerHandler());
    }
}`,
    script: `#!/bin/bash
# Monitor Network sockets established by Netty worker
echo "Counting active TCP socket states..."
ss -s
echo "Detailed TCP socket states for port 8080 (Netty Worker):"
netstat -an | grep :8080 | awk '{print $6}' | sort | uniq -c`
  },
  cache: {
    title: 'Redis Cache Cluster',
    subtitle: 'In-Memory Cache Layer (Redis / Lua Scripting)',
    icon: Database,
    colorClass: 'cache-theme',
    iconColor: '#39ff14',
    description: 'High-speed shared cache. Stores active sessions, compiled configuration, routing maps, and locks. Uses Redis Lua scripting for atomic read-and-update rate-limiting actions.',
    metrics: [
      { label: 'Cache Hit Ratio', value: '94.2%' },
      { label: 'p99 Latency', value: '< 0.8 ms' },
      { label: 'Cluster Shards', value: '6 Master / 6 Replica' },
      { label: 'Eviction Policy', value: 'volatile-lru' }
    ],
    code: `-- Lua Script for atomic token bucket rate-limiting
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local current = tonumber(redis.call('get', key) or "0")

if current + 1 > limit then
    return 0 -- Denied
else
    redis.call("INCRBY", key, 1)
    redis.call("EXPIRE", key, 1)
    return 1 -- Allowed
end`,
    script: `#!/bin/bash
# Redis cluster healthcheck & replication status
redis-cli -h redis-cluster.local -p 6379 cluster info
redis-cli -h redis-cluster.local -p 6379 info replication | grep role`
  },
  db_primary: {
    title: 'MySQL Primary Database',
    subtitle: 'Transactional Master Engine (MySQL / Raft Consensus)',
    icon: Database,
    colorClass: 'db-theme',
    iconColor: '#00f2fe',
    description: 'The single source of truth for transactional data. Writes are committed synchronously using Raft-based state replication to ensure zero data loss during primary node failures.',
    metrics: [
      { label: 'Write Latency', value: '2.8 ms' },
      { label: 'Transaction Isolation', value: 'REPEATABLE-READ' },
      { label: 'Replication Mode', value: 'Semi-Synchronous' },
      { label: 'Peak Connections', value: '3,200 active' }
    ],
    code: `-- InnoDB Lock optimization for Order Insertion
START TRANSACTION;
SELECT balance FROM user_accounts WHERE user_id = 1042 FOR UPDATE;
UPDATE user_accounts SET balance = balance - 150 WHERE user_id = 1042;
INSERT INTO orders (id, user_id, amount, status) VALUES (NULL, 1042, 150, 'PENDING');
COMMIT;`,
    script: `#!/bin/bash
# Backup MySQL primary database with progress pipe & compression
echo "Starting MySQL Hot-backup..."
mysqldump --single-transaction --routines --triggers --all-databases \\
  | gzip > /var/backups/db_primary_$(date +%Y%m%d).sql.gz
echo "Backup finalized. Uploading encrypted archive to S3..."`
  },
  db_replica: {
    title: 'MySQL Replica Database',
    subtitle: 'High-scale Read Replica (MySQL)',
    icon: Database,
    colorClass: 'db-theme',
    iconColor: '#00f2fe',
    description: 'Scale read capacity. Synchronizes from the primary database using binary log streaming. Handles analytic reports, dashboard reads, and catalog queries.',
    metrics: [
      { label: 'Read Latency', value: '< 1.2 ms' },
      { label: 'Replication Lag', value: '< 0.05 ms' },
      { label: 'Sync Mechanism', value: 'MySQL binlog parser' },
      { label: 'Traffic Share', value: '85% of all read requests' }
    ],
    code: `-- Read-Only Optimization
SET TRANSACTION READ ONLY;
SELECT o.*, u.name 
FROM orders o 
JOIN users u ON o.user_id = u.id 
WHERE o.status = 'COMPLETED' 
LIMIT 100;`,
    script: `#!/bin/bash
# Monitor MySQL replication status and alert if lag is > 5s
LAG=$(mysql -e "SHOW SLAVE STATUS\\G" | grep Seconds_Behind_Master | awk '{print $2}')
if [ "$LAG" != "NULL" ] && [ "$LAG" -gt 5 ]; then
  echo "CRITICAL: Replication lag is $LAG seconds behind master!" >&2
  # trigger automated PagerDuty alarm or container restart
fi`
  }
};

export default function SystemArchitect({ selectedId }) {
  const node = systemNodesInfo[selectedId || 'lb'];
  const IconComponent = node.icon;

  return (
    <div className="glass-card flex flex-col justify-between" style={{ padding: '24px', height: '100%' }}>
      <div>
        {/* Node Header */}
        <div className="architect-header">
          <div className="architect-node-badge">
            <div 
              className="node-icon-box"
              style={{
                borderColor: `${node.iconColor}33`,
                backgroundColor: `${node.iconColor}11`,
                color: node.iconColor
              }}
            >
              <IconComponent size={20} />
            </div>
            <div className="node-title-box">
              <h3>{node.title}</h3>
              <p>{node.subtitle}</p>
            </div>
          </div>
          <div className="node-status-badge">
            <span className="node-status-dot"></span>
            ONLINE
          </div>
        </div>

        {/* Node Description */}
        <p className="node-description">
          {node.description}
        </p>

        {/* Micro Metrics Grid */}
        <div className="node-metrics-grid">
          {node.metrics.map((metric, idx) => (
            <div key={idx} className="metric-card">
              <span className="metric-label">{metric.label}</span>
              <span className="metric-value">{metric.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Code & Shell Automation tabs */}
      <div className="flex flex-col gap-4">
        {/* Implementation Snippet */}
        <div>
          <div className="code-title">
            <Code size={12} style={{ color: 'var(--accent-blue)' }} />
            <span>Implementation Loop</span>
          </div>
          <pre className="code-block">
            <code>{node.code}</code>
          </pre>
        </div>

        {/* Automation Script */}
        <div>
          <div className="code-title">
            <Settings size={12} style={{ color: 'var(--accent-amber)' }} />
            <span>Operational Script</span>
          </div>
          <pre className="code-block script-block">
            <code>{node.script}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
