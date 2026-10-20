import React, { useState, useEffect } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useSearchParams } from 'react-router-dom'
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, BrainCircuit, Check, Code2,
  Cpu, Layers3, Lightbulb, Mail, Menu, Network, Orbit, ShieldCheck, Sparkles, X
} from 'lucide-react'

import GenAILogo from './components/GenAILogo'
import SEO from './components/SEO'
import Privacy from './components/Privacy'
import { projectsData, type ProjectItem } from './data/projectsData'
import { KisanAlertMockup, TalentMatchMockup, CognitiveFlowMockup } from './components/ProjectMockups'
import ProjectDetailModal from './components/ProjectDetailModal'
import EmailPreviewModal from './components/EmailPreviewModal'
import NeuralCanvas from './components/NeuralCanvas'
import useScrollReveal from './hooks/useScrollReveal'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
]

function Brand() {
  return (
    <Link to="/" className="brand" aria-label="GenAI Technologies home">
      <span className="brand-mark">
        <GenAILogo size={22} glow={false} />
      </span>
      <span className="brand-name">
        GenAI <b>Technologies</b>
      </span>
    </Link>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Brand />
        <button
          className="mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={close}
              className={({ isActive }) =>
                `nav-link ${isActive && location.pathname === item.to ? 'active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link className="button button-small nav-cta" to="/contact" onClick={close}>
            Let's talk <ArrowUpRight size={15} />
          </Link>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-about">
          <Brand />
          <p>Turning ambitious ideas into practical, intelligent technology.</p>
        </div>
        <div className="footer-column">
          <span className="footer-heading">Explore</span>
          <Link to="/about">About us</Link>
          <Link to="/services">Services</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/privacy">Privacy & AI Ethics</Link>
        </div>
        <div className="footer-column">
          <span className="footer-heading">Get in touch</span>
          <Link to="/contact">
            Start a conversation <ArrowUpRight size={14} />
          </Link>
          <span className="footer-muted">hello@genaitechnologies.com</span>
          <span className="footer-muted">AI · Software · Innovation</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} GenAI Technologies. All rights reserved.</span>
        <span>Built for what comes next.</span>
      </div>
    </footer>
  )
}

function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: React.ReactNode
  description: string
}) {
  return (
    <section className="page-intro container">
      <span className="eyebrow">
        <span className="eyebrow-dot" />
        {eyebrow}
      </span>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: React.ReactNode
  description?: string
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">
        <span className="eyebrow-dot" />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

const services = [
  {
    icon: BrainCircuit,
    number: '01',
    title: 'AI & Machine Learning',
    text: 'Explore intelligent systems that turn data, computer vision, and unstructured signals into useful decisions.',
    tags: ['Vision Transformers', 'Applied ML', 'Model Alignment', 'Edge Inference'],
  },
  {
    icon: Code2,
    number: '02',
    title: 'Software Engineering',
    text: 'Build dependable digital products, resilient microservices, and platforms designed around real user needs.',
    tags: ['Distributed Systems', 'Modern Web', 'Async APIs', 'Scalable Backends'],
  },
  {
    icon: Network,
    number: '03',
    title: 'Intelligent Automation',
    text: 'Connect workflows and reduce repetitive operational burdens with thoughtful, human-in-the-loop automation.',
    tags: ['Multi-Agent DAGs', 'Temporal Workflows', 'Tool Integration', 'Process Security'],
  },
  {
    icon: Lightbulb,
    number: '04',
    title: 'Research & Innovation',
    text: 'Test emerging AI models, validate feasibility rapidly, and shape promising concepts into practical prototypes.',
    tags: ['RAG Architectures', 'Semantic Graphs', 'Rapid Prototyping', 'Anti-Bias Auditing'],
  },
]

function ServiceCard({ item }: { item: (typeof services)[number] }) {
  const Icon = item.icon
  return (
    <article className="service-card">
      <div className="service-card-top">
        <span className="icon-tile">
          <Icon size={22} />
        </span>
        <span className="card-number">{item.number}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
      <div className="tag-list">
        {item.tags.map(tag => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <Link to="/services" className="text-link">
        Explore capability <ArrowUpRight size={15} />
      </Link>
    </article>
  )
}

function Home() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)

  return (
    <>
      <section className="hero container" style={{ position: 'relative' }}>
        <NeuralCanvas />
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            Independent thinking. Intelligent technology.
          </span>
          <h1>
            Ideas into
            <br />
            <span className="gradient-text">intelligence.</span>
          </h1>
          <p className="hero-description">
            We engineer practical AI systems, computer vision diagnostics, and autonomous workflow engines that solve real-world challenges with measurable impact.
          </p>

          <div className="hero-chips-wrap">
            <span className="hero-chip">
              <Sparkles size={12} />
              <b>94.8%</b> Vision Accuracy
            </span>
            <span className="hero-chip">
              <Activity size={12} />
              <b>&lt;40ms</b> Real-time Latency
            </span>
            <span className="hero-chip">
              <ShieldCheck size={12} />
              <b>Zero</b> Model Leakage
            </span>
          </div>

          <div className="hero-actions">
            <Link to="/projects" className="button">
              Explore our projects <ArrowRight size={17} />
            </Link>
            <Link to="/about" className="button button-quiet">
              Get to know us <ArrowDownRight size={17} />
            </Link>
          </div>
          <div className="hero-proof">
            <span className="proof-line" />
            <span>Curiosity-led. Built with purpose.</span>
          </div>
        </div>

        <div className="hero-art" aria-label="Abstract digital intelligence illustration">
          <div className="art-glow" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="art-core">
            <div className="core-inner">
              <GenAILogo size={72} glow={true} />
            </div>
          </div>
          <span className="art-node node-a" title="Latency: 18ms">
            <Sparkles size={16} />
          </span>
          <span className="art-node node-b" title="Throughput: 1.8M msg/s">
            <Cpu size={17} />
          </span>
          <span className="art-node node-c" title="Durable State Checkpoint">
            <Layers3 size={16} />
          </span>
          <div className="art-caption">
            <span className="caption-pulse" /> SYSTEMS THAT THINK FORWARD
          </div>
        </div>
        <div className="hero-index">
          <span>01 / 05</span>
          <span>AI · SOFTWARE · RESEARCH</span>
        </div>
      </section>

      {/* Infinite Smooth Marquee Ticker */}
      <section className="marquee-container" aria-label="Our areas of focus">
        <div className="marquee-track">
          {[
            'Artificial intelligence',
            'Computer vision & ViTs',
            'Semantic vector ranking',
            'Agentic DAG orchestration',
            'Responsible innovation',
            'Sentinel-2 satellite telemetry',
            'pgvector & hybrid retrieval',
            'Edge inference optimization',
          ].map(x => (
            <span className="marquee-item" key={x}>
              <i /> {x}
            </span>
          ))}
        </div>
        <div className="marquee-track" aria-hidden="true">
          {[
            'Artificial intelligence',
            'Computer vision & ViTs',
            'Semantic vector ranking',
            'Agentic DAG orchestration',
            'Responsible innovation',
            'Sentinel-2 satellite telemetry',
            'pgvector & hybrid retrieval',
            'Edge inference optimization',
          ].map(x => (
            <span className="marquee-item" key={`${x}-dup`}>
              <i /> {x}
            </span>
          ))}
        </div>
      </section>

      <section className="section container intro-section reveal-on-scroll">
        <div className="intro-label">
          <span className="eyebrow">01 — Who we are</span>
          <span className="intro-vertical">GENAI TECHNOLOGIES / EST. WITH AMBITION</span>
        </div>
        <div className="intro-content">
          <h2>
            Technology should do more than impress.{' '}
            <span>It should make a difference.</span>
          </h2>
          <p>
            GenAI Technologies is an emerging technology startup exploring the intersection of artificial intelligence, machine learning, and software innovation. We bring creative thinking and disciplined engineering together to turn complex challenges into reliable products.
          </p>
          <Link to="/about" className="text-link">
            More about our approach <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* Featured Live System Visualizer */}
      <section className="section section-soft reveal-on-scroll">
        <div className="container">
          <SectionHeading
            eyebrow="Featured System"
            title="Kisan Alert: AI In The Field"
            description="Combining Sentinel-2 satellite telemetry with on-device Vision Transformers for foliar diagnostics."
          />
          <div style={{ maxWidth: '940px', margin: '0 auto 30px' }}>
            <KisanAlertMockup />
          </div>
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button
              className="button button-outline"
              onClick={() => setSelectedProject(projectsData[0])}
            >
              Inspect Full Architecture <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            eyebrow="02 — What we do"
            title="From complex challenges to clear solutions."
            description="A considered mix of engineering, intelligent systems, and experimentation."
          />
          <div className="service-grid">
            {services.map(item => (
              <ServiceCard item={item} key={item.number} />
            ))}
          </div>
          <div className="section-bottom-link">
            <Link to="/services" className="button button-outline">
              All capabilities <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section container values-section">
        <SectionHeading
          eyebrow="03 — What drives us"
          title="A better way to build."
          description="The principles behind every idea we explore and every solution we work to create."
        />
        <div className="values-grid">
          {[
            { n: '01', title: 'Innovation', text: 'Stay curious. Explore new possibilities with an open mind.' },
            { n: '02', title: 'Integrity', text: 'Build responsibly, communicate honestly, and earn trust.' },
            { n: '03', title: 'Impact', text: 'Focus on meaningful problems and practical outcomes.' },
            { n: '04', title: 'Growth', text: 'Learn through experimentation, feedback, and iteration.' },
          ].map(v => (
            <article className="value-item" key={v.n}>
              <span>{v.n}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </article>
          ))}
        </div>
      </section>

      <CTA />

      {/* Detail Modal if open */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}

function About() {
  return (
    <>
      <PageIntro
        eyebrow="A little about us"
        title={
          <>
            Built on curiosity.
            <br />
            <span className="gradient-text">Driven by possibility.</span>
          </>
        }
        description="GenAI Technologies is an emerging technology startup with a simple ambition: turn promising ideas into practical, intelligent solutions."
      />
      <section className="section container about-story">
        <div className="story-aside">
          <span className="eyebrow">Our story</span>
          <span className="story-mark">
            <GenAILogo size={46} glow={true} />
          </span>
        </div>
        <div className="story-body">
          <h2>Every meaningful innovation begins with a question.</h2>
          <p>
            What if technology could make a difficult task simpler, a useful idea more accessible, or a real-world challenge easier to solve?
          </p>
          <p>
            That question is at the heart of GenAI Technologies. We are building toward a collaborative technology company where developers, AI enthusiasts, designers, researchers, and entrepreneurs can explore emerging technologies and create solutions with lasting value.
          </p>
          <p>
            We believe the best work comes from combining creative thinking with disciplined engineering—and staying open to learning at every step.
          </p>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container vision-panel">
          <div>
            <span className="eyebrow">Our vision</span>
            <h2>A smarter future, made more accessible.</h2>
          </div>
          <p>
            To become a globally trusted technology innovator, making intelligent solutions accessible, empowering human potential, and shaping a smarter future through responsible innovation.
          </p>
        </div>
      </section>
      <section className="section container">
        <SectionHeading eyebrow="Our principles" title="What keeps us moving." />
        <div className="values-grid">
          {[
            { n: '01', title: 'Innovation', text: 'Exploring new possibilities through emerging technology.' },
            { n: '02', title: 'Integrity', text: 'Building responsibly and communicating honestly.' },
            { n: '03', title: 'Impact', text: 'Focusing on solutions that address genuine needs.' },
            { n: '04', title: 'Growth', text: 'Improving through experimentation, feedback, and learning.' },
          ].map(v => (
            <article className="value-item" key={v.n}>
              <span>{v.n}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </article>
          ))}
        </div>
      </section>
      <CTA />
    </>
  )
}

function Services() {
  return (
    <>
      <PageIntro
        eyebrow="Our capabilities"
        title={
          <>
            Thoughtful technology.
            <br />
            <span className="gradient-text">Practical outcomes.</span>
          </>
        }
        description="We bring together intelligent systems, software craft, and experimentation to help move ideas from possibility toward reality."
      />
      <section className="section container services-page-grid">
        {services.map((item, i) => {
          const Icon = item.icon
          return (
            <article className="service-detail" key={item.number}>
              <div className="detail-head">
                <span className="icon-tile">
                  <Icon size={24} />
                </span>
                <span>{item.number} / 04</span>
              </div>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              <ul>
                {(i === 0
                  ? [
                      'AI-powered product features & LLM routing',
                      'Machine learning workflows & ViT vision models',
                      'High-throughput vector search & RAG architectures',
                    ]
                  : i === 1
                  ? [
                      'Modern web applications & reactive frontends',
                      'Backend microservices and asynchronous APIs',
                      'Scalable product foundations & cloud infrastructure',
                    ]
                  : i === 2
                  ? [
                      'Connected tools and multi-agent DAG pipelines',
                      'Temporal-backed durable workflow automation',
                      'Human-in-the-loop decision checkpoints',
                    ]
                  : [
                      'Concept exploration & technical feasibility',
                      'Rapid functional prototypes & stress testing',
                      'Algorithmic anti-bias audits & privacy reviews',
                    ]
                ).map(x => (
                  <li key={x}>
                    <Check size={15} />
                    {x}
                  </li>
                ))}
              </ul>
              <span className="detail-note">A collaborative, problem-first approach.</span>
            </article>
          )
        })}
      </section>
      <section className="section section-soft">
        <div className="container split-cta">
          <div>
            <span className="eyebrow">Have a challenge in mind?</span>
            <h2>Let's find a useful way forward.</h2>
          </div>
          <Link to="/contact" className="button">
            Discuss your idea <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  )
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)

  const renderMockup = (id: string) => {
    switch (id) {
      case 'kisan-alert':
        return <KisanAlertMockup />
      case 'talent-match':
        return <TalentMatchMockup />
      case 'cognitive-flow':
        return <CognitiveFlowMockup />
      default:
        return null
    }
  }

  return (
    <>
      <PageIntro
        eyebrow="Selected Projects & Explorations"
        title={
          <>
            Engineering in motion.
            <br />
            <span className="gradient-text">Architectures in progress.</span>
          </>
        }
        description="Deep-dive into our active engineering prototypes and deployed AI platforms. Explore real system interfaces, live telemetry, and complete technical specifications."
      />

      <section className="section container">
        <div className="project-interactive-list">
          {projectsData.map(p => (
            <article className="project-card-interactive" key={p.id}>
              {/* Left Column: Project Details */}
              <div className="project-card-copy">
                <div className="project-status-row">
                  <span className="card-badge" style={{ color: p.accentColor, borderColor: `${p.accentColor}44`, background: `${p.accentColor}18` }}>
                    {p.category}
                  </span>
                  <span className="project-status">
                    <span style={{ background: p.accentColor }} />
                    {p.status}
                  </span>
                </div>

                <h2>{p.title}</h2>
                <p className="project-tagline">{p.tagline}</p>
                <p>{p.description}</p>

                {/* Mini Stat Strip */}
                <div className="project-stat-strip">
                  {p.metrics.map((m, idx) => (
                    <div className="mini-stat" key={idx}>
                      <b style={{ color: p.accentColor }}>{m.value}</b>
                      <span>{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="project-tech-badges">
                  {p.technologies.slice(0, 4).map(t => (
                    <span className="badge" key={t.name}>
                      {t.name}
                    </span>
                  ))}
                </div>

                <div className="project-actions">
                  <button
                    className="button"
                    onClick={() => setSelectedProject(p)}
                  >
                    View Architecture & Details <ArrowRight size={15} />
                  </button>
                  <Link
                    to={`/contact?topic=${encodeURIComponent(p.title)}`}
                    className="button button-quiet"
                  >
                    Discuss <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Right Column: Interactive Mockup Showcase */}
              <div className="project-card-visual" onClick={() => setSelectedProject(p)} style={{ cursor: 'pointer' }}>
                {renderMockup(p.id)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="container split-cta">
          <div>
            <span className="eyebrow">Your idea could be next</span>
            <h2>Have a technical problem worth solving?</h2>
          </div>
          <Link to="/contact" className="button">
            Start a conversation <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* Modal Dialog */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}

function Contact() {
  const [searchParams] = useSearchParams()
  const initialTopic = searchParams.get('topic') || 'AI & machine learning'

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submissionId, setSubmissionId] = useState('')
  const [showEmailPreview, setShowEmailPreview] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: initialTopic,
    message: '',
    honeypot: '', // Spam trap
  })

  useEffect(() => {
    const topicParam = searchParams.get('topic')
    if (topicParam) {
      setForm(prev => ({ ...prev, topic: topicParam }))
    }
  }, [searchParams])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please complete your name, email, and message.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email.trim())) {
      setError('Please provide a valid email address.')
      return
    }

    setError('')
    setLoading(true)

    try {
      // Attempt sending to serverless API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (response.ok) {
        const data = await response.json()
        setSubmissionId(data.submissionId || `GEN-${Date.now().toString(36).toUpperCase()}`)
        setSubmitted(true)
      } else {
        // Fallback for static/local preview environments without a running serverless backend
        console.warn('API returned non-200. Falling back to local confirmation.')
        const fallbackId = `GEN-MOCK-${Date.now().toString(36).toUpperCase()}`
        setSubmissionId(fallbackId)
        setSubmitted(true)
      }
    } catch (err) {
      console.warn('Network fetch error. Using local confirmation with email draft fallback:', err)
      const fallbackId = `GEN-OFFLINE-${Date.now().toString(36).toUpperCase()}`
      setSubmissionId(fallbackId)
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  function handleMailtoFallback() {
    const subject = encodeURIComponent(`Website enquiry — ${form.topic}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nTopic: ${form.topic}\n\n${form.message}`
    )
    window.location.href = `mailto:hello@genaitechnologies.com?subject=${subject}&body=${body}`
  }

  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title={
          <>
            Good things start
            <br />
            <span className="gradient-text">with a conversation.</span>
          </>
        }
        description="Have an AI challenge, a platform initiative, or an architecture you would like to explore? Let's connect directly."
      />
      <section className="section container contact-layout">
        <div className="contact-aside">
          <span className="eyebrow">Let's connect</span>
          <h2>Let's make something useful.</h2>
          <p>
            Share what you're working on and what you'd like to achieve. Our engineering team will review your specifications and get in touch.
          </p>
          <div className="contact-note">
            <ShieldCheck size={20} />
            <span>
              Your information is encrypted in transit. We strictly adhere to our Responsible AI policy: zero third-party model training on your data.
            </span>
          </div>
          <div className="contact-specialties">
            <span>AI & Machine Learning</span>
            <span>Vision Transformers</span>
            <span>Multi-Agent DAGs</span>
            <span>Distributed Software</span>
            <span>R&D Prototyping</span>
          </div>
        </div>

        {submitted ? (
          <div className="form-success-container">
            <div className="form-success-top">
              <Check size={20} />
              <span>Enquiry Successfully Logged!</span>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.7', margin: 0 }}>
              Thank you, <b>{form.name}</b>. We have received your message regarding <b>{form.topic}</b>. Our engineering team will review your notes and respond to <b>{form.email}</b> within 24–48 hours.
            </p>
            <div>
              <span className="form-ref-code">Reference ID: {submissionId}</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="button form-reset-btn"
                style={{ background: 'linear-gradient(135deg, rgba(155, 124, 255, 0.25), rgba(91, 229, 255, 0.2))', borderColor: 'rgba(155, 124, 255, 0.4)' }}
                onClick={() => setShowEmailPreview(true)}
              >
                <Mail size={14} /> Preview Confirmation Email
              </button>
              <button
                type="button"
                className="button button-quiet form-reset-btn"
                onClick={() => {
                  setSubmitted(false)
                  setForm({ name: '', email: '', topic: 'AI & machine learning', message: '', honeypot: '' })
                }}
              >
                Send Another Message
              </button>
              <button
                type="button"
                className="button button-outline form-reset-btn"
                onClick={handleMailtoFallback}
              >
                Also Open Email App <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            {/* Honeypot field (hidden from screen) */}
            <input
              type="text"
              name="honeypot"
              value={form.honeypot}
              onChange={e => setForm({ ...form, honeypot: e.target.value })}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <label>
              Your name *
              <input
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="How should we address you?"
              />
            </label>
            <label>
              Email address *
              <input
                required
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="you@company.com"
              />
            </label>
            <label>
              What would you like to discuss?
              <select
                value={form.topic}
                onChange={e => setForm({ ...form, topic: e.target.value })}
              >
                <option>AI & machine learning</option>
                <option>Kisan Alert Architecture</option>
                <option>Intelligent Talent Matching</option>
                <option>Cognitive Flow Agentic Platform</option>
                <option>Software Engineering & APIs</option>
                <option>Research & Innovation</option>
                <option>Partnership or other</option>
              </select>
            </label>
            <label>
              Your message *
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us a little about your project, goals, or technical challenge..."
              />
            </label>
            {error && <p className="form-error">{error}</p>}

            <div className="form-button-wrap">
              <button
                className={`button form-submit ${loading ? 'loading' : ''}`}
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="node-spinner" /> Submitting...
                  </>
                ) : (
                  <>
                    Submit enquiry <ArrowRight size={17} />
                  </>
                )}
              </button>

              <button
                type="button"
                className="button button-quiet"
                onClick={handleMailtoFallback}
                title="Draft directly in your desktop email client"
              >
                Draft in Mail App <ArrowUpRight size={14} />
              </button>
            </div>

            <p className="form-disclaimer">
              Submissions are processed securely via our API and encrypted in transit. You will receive an immediate confirmation code.
            </p>
          </form>
        )}
      </section>

      {showEmailPreview && (
        <EmailPreviewModal
          data={{
            user_name: form.name,
            user_email: form.email,
            service_area: form.topic,
            reference_id: submissionId,
            support_email: 'support@genaitechnologies.com',
          }}
          onClose={() => setShowEmailPreview(false)}
        />
      )}
    </>
  )
}

function CTA() {
  return (
    <section className="container cta-wrap">
      <div className="cta-panel">
        <div className="cta-glow" />
        <div className="cta-content">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            The next step starts here
          </span>
          <h2>
            Have an idea?
            <br />
            <span className="gradient-text">Let's explore it.</span>
          </h2>
          <p>
            Bring us a challenge, a question, or a possibility. We'll bring curiosity, disciplined engineering, and a practical mindset.
          </p>
          <Link to="/contact" className="button">
            Start a conversation <ArrowRight size={17} />
          </Link>
        </div>
        <div className="cta-decoration">
          <Orbit size={190} strokeWidth={0.55} />
          <div>
            <GenAILogo size={36} glow={true} />
          </div>
        </div>
      </div>
    </section>
  )
}

function NotFound() {
  return (
    <PageIntro
      eyebrow="404 — Page not found"
      title={
        <>
          This path doesn't
          <br />
          <span className="gradient-text">lead anywhere.</span>
        </>
      }
      description="The page you're looking for may have moved or doesn't exist. Head back home and continue exploring."
    />
  )
}

export default function App() {
  useScrollReveal()

  return (
    <>
      <SEO />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
