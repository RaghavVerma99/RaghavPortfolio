import React, { useState, useRef, useEffect } from 'react';
import { 
  Activity, 
  Terminal as TermIcon, 
  Award, 
  GitBranch, 
  Mail, 
  Calendar, 
  Moon, 
  Send,
  X,
  CheckCircle,
  GraduationCap
} from 'lucide-react';
import SystemCanvas from './components/SystemCanvas';
import InteractiveTerminal from './components/InteractiveTerminal';
import SystemArchitect from './components/SystemArchitect';
import Projects from './components/Projects';
import Skills from './components/Skills';

export default function App() {
  const [selectedNodeId, setSelectedNodeId] = useState('lb');
  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState([
    { text: "Hi! I'm Raghav's systems assistant. Ask me anything about his B.Tech CSE coursework, systems projects, or remote availability!", sender: 'bot' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Booking Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingPurpose, setBookingPurpose] = useState('Interview');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  const handleChatOption = (option) => {
    let userText = '';
    let botReply = '';

    if (option === 'Work') {
      userText = 'Tell me about your SDE placements projects.';
      botReply = 'Raghav has built major backend systems: HydraBroker (Java NIO broker with zero-copy stream transfers), ApolloGateway (C++20 consistent-hashing reverse proxy using epoll), and TelemetryPipe (a metric aggregator with automated Bash tasks). These are perfect SDE credentials!';
    } else if (option === 'About me') {
      userText = 'What is your background?';
      botReply = 'Raghav is a final-year Computer Science & Engineering student. He maintains a 9.4/10 CGPA and focuses on low-latency systems, socket connections, and distributed consistency protocols. He is targeting remote Software Developer roles globally!';
    } else if (option === 'Skills') {
      userText = 'What languages do you write?';
      botReply = 'He is highly proficient in C++ (thread pools, lock-free rings), Java (concurrency, Spring boot), JavaScript (Node APIs, React JSX, Three.js WebGL), and Shell Scripting (cron scheduling, Linux profiling scripts).';
    } else if (option === 'Contact') {
      userText = 'How can I interview you?';
      botReply = 'You can email Raghav at admin@apexengine.net, or click "Book a Call" at the top of this page to schedule an interview or sync right now!';
    }

    setChatLog(prev => [...prev, { text: userText, sender: 'user' }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setChatLog(prev => [...prev, { text: botReply, sender: 'bot' }]);
    }, 500);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    const query = chatInput.trim();
    if (!query) return;

    setChatLog(prev => [...prev, { text: query, sender: 'user' }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "I'm Raghav's systems bot. Ask me about 'C++', 'Java', 'B.Tech', 'placements', 'remote', or 'projects'!";
      const q = query.toLowerCase();

      if (q.includes('c++') || q.includes('cpp') || q.includes('latency') || q.includes('epoll')) {
        reply = 'For C++, Raghav writes modern C++20/23 socket loops using epoll and configures lock-free ring-buffers for sub-millisecond execution times. He applies this to low-latency matching engine designs.';
      } else if (q.includes('java') || q.includes('spring') || q.includes('loom') || q.includes('netty')) {
        reply = 'He uses Java for distributed data structures. He built a Raft consensus replica utilizing Netty NIO socket connections and Project Loom virtual thread routing.';
      } else if (q.includes('javascript') || q.includes('node') || q.includes('react') || q.includes('js')) {
        reply = 'He uses JS/TS for backend gateways and UI. He builds Fastify token bucket limiters on Redis, and designs responsive interfaces like this bento site using React JSX and Three.js matrices.';
      } else if (q.includes('shell') || q.includes('bash') || q.includes('script') || q.includes('automation')) {
        reply = 'Bash scripting is his automation core. He writes shell scripts to profile containers, check socket allocations, schedule backups, and trigger rolling Docker upgrades.';
      } else if (q.includes('b.tech') || q.includes('university') || q.includes('final year') || q.includes('gpa') || q.includes('student')) {
        reply = 'Raghav is in his final year of B.Tech in Computer Science & Engineering. He holds a 9.4/10 CGPA, specializes in systems courses, and is fully available for remote SDE placements and internship roles.';
      } else if (q.includes('remote') || q.includes('work') || q.includes('freelance') || q.includes('placements')) {
        reply = 'He is specifically seeking Remote Software Engineering / SDE roles. He is fully set up for remote development and async communication, with a high degree of operational autonomy.';
      } else if (q.includes('project') || q.includes('work') || q.includes('portfolio')) {
        reply = "His Placements portfolio includes HydraBroker (Java NIO message queue), ApolloGateway (C++ reverse proxy), and TelemetryPipe (Node cron scheduler). Inspect them in the 'Projects' board below!";
      }

      setIsTyping(false);
      setChatLog(prev => [...prev, { text: reply, sender: 'bot' }]);
    }, 600);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      // Auto close modal after showing success screen
      setTimeout(() => {
        setIsModalOpen(false);
        setIsBooked(false);
        setBookingName('');
        setBookingEmail('');
        setBookingDate('');
      }, 1500);
    }, 200);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Ambient background glows */}
      <div className="bg-ambient-top"></div>

      {/* Floating Capsule Header */}
      <header className="header-nav">
        <div className="container nav-content">
          <button className="theme-toggle-btn" aria-label="Toggle theme">
            <Moon size={18} />
          </button>
          
          <nav className="nav-capsule">
            <span className="nav-capsule-link" onClick={() => scrollToSection('home')}>Home</span>
            <span className="nav-capsule-link" onClick={() => scrollToSection('about')}>About</span>
            <span className="nav-capsule-link" onClick={() => scrollToSection('projects')}>Projects</span>
            <span className="nav-capsule-link" onClick={() => scrollToSection('skills')}>Skills</span>
            <span className="nav-capsule-link" onClick={() => scrollToSection('console')}>Console</span>
          </nav>

          <button className="book-call-btn" onClick={() => setIsModalOpen(true)}>
            <Calendar size={15} />
            <span>Book a Call</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '100px', paddingBottom: '60px' }}>
        <div className="hero-avatar-container">
          <div className="hero-avatar-circle">
            <GraduationCap size={36} style={{ color: 'var(--accent-light)', zIndex: 10 }} />
          </div>
        </div>
        
        <h1 className="hero-title">
          Hi, I'm <span className="text-gradient-shimmer">Raghav</span>
        </h1>

        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '15px', maxWidth: '600px', margin: '-12px auto 32px auto', lineHeight: 1.5 }}>
          Final Year B.Tech Computer Science student specializing in low-latency systems and concurrent backend designing. Seeking remote SDE opportunities.
        </p>

        {/* AI Chat Box */}
        <div className="chat-widget">
          <div className="chat-log">
            {chatLog.map((chat, idx) => (
              <div key={idx} className={`chat-bubble ${chat.sender}`}>
                {chat.text}
              </div>
            ))}
            {isTyping && (
              <div className="chat-bubble bot" style={{ display: 'flex', gap: '4px', padding: '12px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'currentColor', animation: 'blink 1.4s infinite' }}></span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'currentColor', animation: 'blink 1.4s infinite 0.2s' }}></span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'currentColor', animation: 'blink 1.4s infinite 0.4s' }}></span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="chat-divider"></div>

          <div className="chat-input-panel">
            <div className="chat-options-row">
              <button className="chat-option-btn" onClick={() => handleChatOption('Work')}>Work</button>
              <button className="chat-option-btn" onClick={() => handleChatOption('About me')}>About me</button>
              <button className="chat-option-btn" onClick={() => handleChatOption('Skills')}>Skills</button>
              <button className="chat-option-btn" onClick={() => handleChatOption('Contact')}>Contact</button>
            </div>

            <form className="chat-form" onSubmit={handleChatSubmit}>
              <input
                type="text"
                placeholder="Ask anything about Raghav..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="chat-input-field"
                disabled={isTyping}
              />
              <button 
                type="submit" 
                className="chat-submit-btn" 
                disabled={!chatInput.trim() || isTyping}
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Bento Grid About Section */}
      <section id="about" className="container" style={{ paddingBottom: '80px' }}>
        <div className="pszostak-sec-header">
          <span className="pszostak-sec-tag">Mindset</span>
          <h2 className="pszostak-sec-title">About Me</h2>
        </div>

        <div className="bento-grid">
          {/* Name/Title Card */}
          <div className="bento-card bento-name-card">
            <div className="name-heavy">RAGHAV</div>
            <div className="name-heavy" style={{ color: 'var(--muted)' }}>CSE '26</div>
            <div className="title-sub">B.Tech Final Year</div>
          </div>

          {/* Academic/University Card */}
          <div className="bento-card bento-science-card">
            <span className="bento-card-title">Academic & Systems Focus</span>
            <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: 1.5, marginTop: '8px' }}>
              Maintaining a **9.4/10 CGPA** in Computer Science & Engineering. Deeply interested in operating systems and distributed networks. Currently scripting automated load tests to evaluate consistent hashing nodes under scale.
            </p>
          </div>

          {/* Mindset Card */}
          <div className="bento-card bento-mindset-card">
            <div>
              <span className="bento-card-title">Systems Mentality</span>
              <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.4, marginTop: '8px' }}>
                Engineering low-latency sockets requires intense focus. My physical habits build the mental discipline needed to debug complex thread locks.
              </p>
            </div>
            
            {/* Hobbies stack */}
            <div className="mindset-card-images">
              <div className="mindset-image-box left" style={{ background: 'linear-gradient(135deg, #18181b, #09090b)' }}>
                <div style={{ padding: '8px', color: 'var(--accent-light)', fontFamily: 'var(--mono)', fontSize: '10px' }}>ALGORITHMS</div>
              </div>
              <div className="mindset-image-box center" style={{ background: 'linear-gradient(135deg, #27272a, #18181b)' }}>
                <div style={{ padding: '8px', color: '#10b981', fontFamily: 'var(--mono)', fontSize: '10px' }}>CALISTHENICS</div>
              </div>
              <div className="mindset-image-box right" style={{ background: 'linear-gradient(135deg, #18181b, #09090b)' }}>
                <div style={{ padding: '8px', color: '#f59e0b', fontFamily: 'var(--mono)', fontSize: '10px' }}>PROFILING</div>
              </div>
            </div>

            <p style={{ fontSize: '10px', color: 'var(--muted)' }}>
              Discipline in Calisthenics maps directly to cleaner compiler structures.
            </p>
          </div>

          {/* Craft Card */}
          <div className="bento-card bento-craft-card">
            <div>
              <span className="bento-card-title">Placements Craft</span>
              <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.4, marginTop: '8px' }}>
                I build reliable backend infrastructure, React JSX gateways, and automated Bash scripts. I focus on optimizing logic loops to eliminate CPU overhead.
              </p>
            </div>

            {/* Sliding Tech Ticker */}
            <div className="marquee-container">
              <div className="marquee-content">
                <span className="marquee-item">&lt;C++&gt;</span>
                <span className="marquee-item">&lt;Java&gt;</span>
                <span className="marquee-item">&lt;JavaScript&gt;</span>
                <span className="marquee-item">&lt;Bash&gt;</span>
                <span className="marquee-item">&lt;React&gt;</span>
                <span className="marquee-item">&lt;Three.js&gt;</span>
                <span className="marquee-item">&lt;Docker&gt;</span>
                <span className="marquee-item">&lt;Redis&gt;</span>
                {/* Repeat items for infinite loop */}
                <span className="marquee-item">&lt;C++&gt;</span>
                <span className="marquee-item">&lt;Java&gt;</span>
                <span className="marquee-item">&lt;JavaScript&gt;</span>
                <span className="marquee-item">&lt;Bash&gt;</span>
                <span className="marquee-item">&lt;React&gt;</span>
                <span className="marquee-item">&lt;Three.js&gt;</span>
                <span className="marquee-item">&lt;Docker&gt;</span>
                <span className="marquee-item">&lt;Redis&gt;</span>
              </div>
            </div>

            <div className="pulse-indicator">
              <span className="pulse-dot">
                <span className="pulse-ping"></span>
              </span>
              <span style={{ fontSize: '10px', color: 'var(--foreground)', opacity: 0.8 }}>Seeking Remote SDE Roles</span>
            </div>
          </div>

          {/* Location Card */}
          <div className="bento-card bento-location-card">
            <span className="bento-card-title" style={{ zIndex: 10 }}>Location</span>
            <div style={{ zIndex: 10, marginTop: '12px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '-0.03em', lineHeight: 1 }}>
                New Delhi,<br />India
              </div>
              <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--muted)', marginTop: '8px' }}>
                28.6139° N, 77.2090° E
              </div>
              <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--accent-light)', marginTop: '4px' }}>
                GMT+5:30 (Remote focus)
              </div>
            </div>
            
            {/* Grid overlay */}
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              backgroundImage: 'radial-gradient(var(--card-border) 1px, transparent 1px)', 
              backgroundSize: '16px 16px',
              opacity: 0.15,
              pointerEvents: 'none',
              zIndex: 1
            }}></div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container" style={{ paddingBottom: '100px', paddingTop: '40px' }}>
        <div className="pszostak-sec-header">
          <span className="pszostak-sec-tag">Portfolio</span>
          <h2 className="pszostak-sec-title">Featured Projects</h2>
          <p className="pszostak-sec-desc">
            SDE Placements projects built to tackle concurrency bottlenecks, socket latency, and distributed synchronization.
          </p>
        </div>

        <div className="pszostak-projects-list">
          {/* Project 1 */}
          <article className="pszostak-project-article">
            <header className="pszostak-project-header">
              <div className="pszostak-project-meta">
                <span>01</span>
                <span className="pszostak-project-meta-line"></span>
                <span>Distributed Broker</span>
              </div>
              <div className="pszostak-project-title-row">
                <h3 className="pszostak-project-title">HydraBroker</h3>
                <a href="https://github.com" className="github-star-btn">
                  <span>Star</span>
                </a>
              </div>
            </header>

            <div className="mockup-outer">
              <div className="mockup-inner gradient-green">
                <p className="mockup-text-overlay">
                  Distributed event message broker built on Java NIO. Implements zero-copy socket transfers and append-only commit logs.
                </p>
                
                <div className="mockup-screen-container">
                  <div className="mockup-device-body">
                    <div className="mockup-device-header">
                      <span className="mockup-dot red"></span>
                      <span className="mockup-dot yellow"></span>
                      <span className="mockup-dot green"></span>
                    </div>
                    <div className="mockup-screen-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '16px', fontFamily: 'var(--mono)', fontSize: '10px', color: '#10b981' }}>
                      <div>$ java -jar hydra-broker.jar --cluster-size=3</div>
                      <div>[SYSTEM] Electing Raft leader node...</div>
                      <div>[SYSTEM] Elected Node #1 as Leader (Term 4).</div>
                      <div>[INFO] Append-only log flush: 450KB committed in 0.42ms</div>
                      <div>[METRIC] Active consumer offset sync active.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <footer className="pszostak-project-tags">
              <span className="pszostak-tag">Java</span>
              <span className="pszostak-tag">Netty NIO</span>
              <span className="pszostak-tag">Raft Consensus</span>
              <span className="pszostak-tag">Zero-Copy Stream</span>
            </footer>
          </article>

          {/* Project 2 */}
          <article className="pszostak-project-article">
            <header className="pszostak-project-header">
              <div className="pszostak-project-meta">
                <span>02</span>
                <span className="pszostak-project-meta-line"></span>
                <span>Reverse Proxy</span>
              </div>
              <div className="pszostak-project-title-row">
                <h3 className="pszostak-project-title">ApolloGateway</h3>
                <a href="https://github.com/RaghavVerma7/" className="github-star-btn">
                  <span>Star</span>
                </a>
              </div>
            </header>

            <div className="mockup-outer">
              <div className="mockup-inner gradient-orange">
                <p className="mockup-text-overlay">
                  High-performance consistent-hashing reverse proxy in C++20, utilizing epoll socket loops and Redis caching.
                </p>
                
                <div className="mockup-screen-container">
                  <div className="mockup-device-body">
                    <div className="mockup-device-header">
                      <span className="mockup-dot red"></span>
                      <span className="mockup-dot yellow"></span>
                      <span className="mockup-dot green"></span>
                    </div>
                    <div className="mockup-screen-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '16px', fontFamily: 'var(--mono)', fontSize: '10px', color: '#f59e0b' }}>
                      <div>$ ./apollo_gateway --config config.ring.yaml</div>
                      <div>[DEBUG] Epoll socket listener configured on port 8080.</div>
                      <div>[INFO] Hashing ring built with 256 virtual nodes.</div>
                      <div>[INFO] Routing key check: p99 latency = 0.12ms</div>
                      <div>[LIMITER] Redis TokenBucket check: OK (Rate within limit)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <footer className="pszostak-project-tags">
              <span className="pszostak-tag">C++20</span>
              <span className="pszostak-tag">epoll</span>
              <span className="pszostak-tag">Redis Limiter</span>
              <span className="pszostak-tag">MurmurHash3</span>
            </footer>
          </article>

          {/* Project 3 */}
          <article className="pszostak-project-article">
            <header className="pszostak-project-header">
              <div className="pszostak-project-meta">
                <span>03</span>
                <span className="pszostak-project-meta-line"></span>
                <span>Orchestration Pipeline</span>
              </div>
              <div className="pszostak-project-title-row">
                <h3 className="pszostak-project-title">TelemetryPipe</h3>
                <a href="https://github.com/RaghavVerma7/TelemetryPipe" className="github-star-btn">
                  <span>Star</span>
                </a>
              </div>
            </header>

            <div className="mockup-outer">
              <div className="mockup-inner gradient-purple">
                <p className="mockup-text-overlay">
                  Node.js metric aggregator backing worker pools and automated Shell scripting health-checks.
                </p>
                
                <div className="mockup-screen-container">
                  <div className="mockup-device-body">
                    <div className="mockup-device-header">
                      <span className="mockup-dot red"></span>
                      <span className="mockup-dot yellow"></span>
                      <span className="mockup-dot green"></span>
                    </div>
                    <div className="mockup-screen-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '16px', fontFamily: 'var(--mono)', fontSize: '10px', color: '#a855f7' }}>
                      <div>$ ./deploy-pipeline.sh --mode=prod</div>
                      <div>[BASH] Checking container health status... OK</div>
                      <div>[BASH] Initiating log-rotation and core process dump...</div>
                      <div>[INFO] Ingestion rate: 14,800 events/sec active</div>
                      <div>[OK] Cluster rolling reload successful in 4.82s</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <footer className="pszostak-project-tags">
              <span className="pszostak-tag">Node.js</span>
              <span className="pszostak-tag">Bash Shell</span>
              <span className="pszostak-tag">RabbitMQ</span>
              <span className="pszostak-tag">Docker Swarm</span>
            </footer>
          </article>
        </div>
      </section>

      {/* Clean Tech Competency Panel */}
      <section id="skills" className="container" style={{ paddingBottom: '100px' }}>
        <div className="pszostak-sec-header">
          <span className="pszostak-sec-tag">Competencies</span>
          <h2 className="pszostak-sec-title">Tech Competencies</h2>
          <p className="pszostak-sec-desc">
            Clean panel demonstrating languages, threading structures, and operational paradigms.
          </p>
        </div>

        <Skills />
      </section>

      {/* Systems Core Console Section */}
      <section id="console" className="container" style={{ paddingBottom: '120px' }}>
        <div className="pszostak-sec-header">
          <span className="pszostak-sec-tag">Interactive</span>
          <h2 className="pszostak-sec-title">Systems Console Board</h2>
          <p className="pszostak-sec-desc">
            Inspect our 3D WebGL topology map on the left, or run real shell simulations inside the interactive console on the right.
          </p>
        </div>

        <div className="system-dashboard-grid" style={{ marginTop: '32px' }}>
          <div className="canvas-panel">
            <div className="canvas-container">
              <SystemCanvas selectedNodeId={selectedNodeId} onSelectNode={setSelectedNodeId} />
            </div>
            
            <div style={{ marginTop: '12px' }}>
              <SystemArchitect selectedId={selectedNodeId} />
            </div>
          </div>

          <div>
            <InteractiveTerminal />
          </div>
        </div>
      </section>

      {/* Booking Calendar Modal popup */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
              <X size={16} />
            </button>

            {!isBooked ? (
              <form onSubmit={handleBookingSubmit}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Book a Systems Sync</h3>
                <p style={{ fontSize: '12.5px', color: 'var(--muted)', marginBottom: '24px', lineHeight: 1.4 }}>
                  Schedule a remote placement interview, freelance discussion, or technical consultation.
                </p>

                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    className="glass-input" 
                    style={{ width: '100%' }}
                    placeholder="Enter name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={bookingEmail}
                    onChange={(e) => setBookingEmail(e.target.value)}
                    className="glass-input" 
                    style={{ width: '100%' }}
                    placeholder="Enter email"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Meeting Topic</label>
                  <select 
                    value={bookingPurpose}
                    onChange={(e) => setBookingPurpose(e.target.value)}
                    className="glass-input"
                    style={{ width: '100%' }}
                  >
                    <option value="Interview">Placement SDE Interview</option>
                    <option value="Remote">Remote Project Collaboration</option>
                    <option value="Consulting">Systems Design Consultation</option>
                    <option value="General">General Technical Chat</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Select Date</label>
                  <input 
                    type="date" 
                    required 
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="glass-input" 
                    style={{ width: '100%' }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Available Slots</label>
                  <div className="form-select-slots">
                    {['10:00 AM', '2:00 PM', '4:30 PM', '6:00 PM'].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        className={`form-slot-btn ${selectedSlot === slot ? 'selected' : ''}`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
                >
                  Schedule Call
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <CheckCircle size={56} style={{ color: '#10b981', margin: '0 auto 16px auto' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Call Confirmed!</h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>
                  Successfully booked for <strong>{bookingDate}</strong> at <strong>{selectedSlot}</strong>. 
                  A calendar invite has been dispatched to <strong>{bookingEmail}</strong>.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="footer" className="footer" style={{ borderTop: '1px solid var(--border-color)', background: '#09090b', padding: '60px 0' }}>
        <div className="container footer-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.02em' }}>Available for Remote SDE Roles.</h3>
          
          <div className="social-links" style={{ display: 'flex', gap: '24px' }}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: 'var(--muted)' }} aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" style={{ color: 'var(--muted)' }} aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="mailto:admin@apexengine.net" className="social-link" style={{ color: 'var(--muted)' }} aria-label="Email">
              <Mail size={22} />
            </a>
          </div>

          <p className="footer-text" style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--muted)', opacity: 0.6 }}>
            © {new Date().getFullYear()} Raghav // CSE B.Tech Placements Portfolio. React JSX + Three.js.
          </p>
        </div>
      </footer>
    </>
  );
}
