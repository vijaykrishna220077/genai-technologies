import React, { useState, useEffect } from 'react'
import {
  Activity, CheckCircle2, ChevronRight, Cpu, Database, Eye,
  FileText, Globe2, Layers, Pause, Play, ShieldAlert,
  Sparkles, Volume2
} from 'lucide-react'

// ============================================================================
// Mockup 1: Kisan Alert Agricultural Vision & Telemetry Dashboard
// ============================================================================
type KisanZone = '4b' | '2a' | '7c'

const kisanZoneData: Record<
  KisanZone,
  {
    sector: string
    ndvi: string
    ndviStatus: string
    soilMoisture: string
    temp: string
    humidity: string
    diseaseName: string
    recommendation: string
    confidence: string
    severity: 'warning' | 'healthy' | 'alert'
  }
> = {
  '4b': {
    sector: 'Sector 4B • Paddy Crop Field',
    ndvi: '0.74 (Healthy Canopy)',
    ndviStatus: 'success',
    soilMoisture: '28.4%',
    temp: '31.2°C',
    humidity: '76%',
    diseaseName: 'Early Stage Leaf Blight',
    recommendation: 'Recommended: Copper oxychloride 50% WP spray within 48h',
    confidence: '94.8% Match',
    severity: 'alert',
  },
  '2a': {
    sector: 'Sector 2A • Basmati Plot',
    ndvi: '0.88 (Dense Vegetation)',
    ndviStatus: 'success',
    soilMoisture: '34.2%',
    temp: '29.8°C',
    humidity: '68%',
    diseaseName: 'No Active Pathology Detected',
    recommendation: 'Canopy vigor optimal. Maintain scheduled drip irrigation.',
    confidence: '98.2% Clean',
    severity: 'healthy',
  },
  '7c': {
    sector: 'Sector 7C • Nursery Beds',
    ndvi: '0.52 (Sub-optimal NDVI)',
    ndviStatus: 'warning',
    soilMoisture: '21.0%',
    temp: '33.4°C',
    humidity: '58%',
    diseaseName: 'Nitrogen Deficiency Chlorosis',
    recommendation: 'Recommended: Foliar urea 2% spray + micronutrient boost',
    confidence: '91.4% Match',
    severity: 'warning',
  },
}

export const KisanAlertMockup: React.FC = () => {
  const [activeZone, setActiveZone] = useState<KisanZone>('4b')
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioSeconds, setAudioSeconds] = useState(0)

  const zone = kisanZoneData[activeZone]

  // Audio Playback Simulation
  useEffect(() => {
    let interval: any
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioSeconds(s => {
          if (s >= 42) {
            setIsPlaying(false)
            return 0
          }
          return s + 1
        })
      }, 500)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <div className="mockup-frame mockup-kisan">
      {/* Top Application Bar */}
      <div className="mockup-header">
        <div className="mockup-window-controls">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="mockup-title-bar">
          <Globe2 size={12} /> kisan-alert.genai.internal / telemetry-view
        </div>
        <div className="mockup-live-tag">
          <span className="live-pulse" /> LIVE TELEMETRY
        </div>
      </div>

      {/* Main Mockup Body */}
      <div className="mockup-body kisan-grid">
        {/* Left: Satellite & Sensor Map */}
        <div className="mockup-card kisan-sensor-card">
          <div className="kisan-card-header">
            <div>
              <span className="card-badge">Sentinel-2 MSI</span>
              <h4>{zone.sector}</h4>
            </div>
            <span className={`stat-pill ${zone.ndviStatus}`}>NDVI {zone.ndvi}</span>
          </div>

          <div className="satellite-viewport">
            {/* Interactive Sector Switcher Overlay */}
            <div className="satellite-grid-overlay">
              {(
                [
                  { id: '4b', label: 'Sector 4B', alert: true },
                  { id: '2a', label: 'Sector 2A', alert: false },
                  { id: '7c', label: 'Sector 7C', alert: false },
                  { id: '1d', label: 'Sector 1D', alert: false },
                ] as const
              ).map(cell => (
                <div
                  key={cell.id}
                  className={`grid-cell ${activeZone === cell.id ? 'active-cell' : ''}`}
                  onClick={() => cell.id !== '1d' && setActiveZone(cell.id as KisanZone)}
                  style={{ cursor: cell.id !== '1d' ? 'pointer' : 'default' }}
                  title={`Click to inspect ${cell.label}`}
                >
                  <span className="cell-label">{cell.label}</span>
                </div>
              ))}
            </div>

            <div className="field-metrics-bar">
              <div>
                <span>Soil Moisture:</span> <b>{zone.soilMoisture}</b>
              </div>
              <div>
                <span>Ambient Temp:</span> <b>{zone.temp}</b>
              </div>
              <div>
                <span>Humidity:</span> <b>{zone.humidity}</b>
              </div>
            </div>
          </div>

          <div className="mockup-interactive-hint">
            <span>💡 Tip: Click different sectors above to inspect localized telemetry.</span>
          </div>
        </div>

        {/* Right: Vision Diagnostic & Audio Advisory */}
        <div className="mockup-card kisan-diagnostic-card">
          <div className="kisan-card-header">
            <div>
              <span className="card-badge model">ViT-Base-8bit</span>
              <h4>Automated Foliar Pathology</h4>
            </div>
            <span className="confidence-pill">{zone.confidence}</span>
          </div>

          <div className="diagnostic-result-box">
            <div className="disease-icon-wrap">
              <ShieldAlert size={20} className={zone.severity === 'healthy' ? 'text-emerald-400' : 'text-amber-400'} />
            </div>
            <div>
              <div className="result-name">{zone.diseaseName}</div>
              <div className="result-recommendation">{zone.recommendation}</div>
            </div>
          </div>

          {/* Interactive Vernacular Audio Player */}
          <div className="vernacular-audio-player">
            <button
              className={`audio-play-btn ${isPlaying ? 'playing' : ''}`}
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause audio advisory' : 'Play audio advisory'}
              title="Click to play vernacular voice note"
            >
              {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
            </button>
            <div className="audio-waveform-wrap">
              <div className="audio-meta">
                <span>Vernacular Voice Note (Hindi / Telugu)</span>
                <span>{formatTime(audioSeconds)} / 0:42</span>
              </div>
              <div className={`audio-bars ${isPlaying ? 'animated' : ''}`}>
                {[40, 65, 80, 50, 95, 75, 60, 85, 90, 45, 70, 85, 60, 40, 90, 75, 50].map((h, i) => (
                  <span
                    key={i}
                    style={{
                      height: isPlaying ? `${Math.min(98, Math.max(25, (h + (audioSeconds * 7 * (i + 1))) % 100))}%` : `${h}%`,
                    }}
                    className={i < (audioSeconds / 42) * 17 ? 'played' : ''}
                  />
                ))}
              </div>
            </div>
            <Volume2 size={16} className={isPlaying ? 'text-purple-400' : 'text-slate-400'} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Mockup 2: Intelligent Talent Semantic Matching Matrix
// ============================================================================
type CandidateId = 'E904' | 'A412' | 'C108'

const candidatesData: Record<
  CandidateId,
  {
    id: string
    title: string
    matchScore: number
    radar: { name: string; pct: number; label: string }[]
    commentary: string
    cosine: string
  }
> = {
  E904: {
    id: 'Candidate #E904',
    title: '11 yrs exp • Distributed Consensus, Rust, High-Throughput Stream Processing',
    matchScore: 92,
    radar: [
      { name: 'Distributed Consensus', pct: 96, label: 'Raft / Paxos proven' },
      { name: 'Concurrency & Memory Safety', pct: 94, label: 'Rust & Go Equivalence' },
      { name: 'Architecture Leadership', pct: 88, label: 'Led 4 sub-teams' },
    ],
    commentary:
      'Candidate demonstrated direct equivalence to the required Kafka/Flink profile through 4 years architecting custom Tokio-based zero-copy ingestion pipelines handling 1.8M msg/sec. Bypassed rigid keyword mismatch automatically.',
    cosine: '0.931',
  },
  A412: {
    id: 'Candidate #A412',
    title: '8 yrs exp • AI Infrastructure, TensorRT, vLLM Serving & Triton',
    matchScore: 87,
    radar: [
      { name: 'Distributed Consensus', pct: 78, label: 'etcd cluster orchestration' },
      { name: 'Concurrency & Memory Safety', pct: 92, label: 'C++ & CUDA kernels' },
      { name: 'Architecture Leadership', pct: 85, label: 'Principal Infra Lead' },
    ],
    commentary:
      'Strong fit for high-performance inference runtime engineering. High transferability in memory-pinned GPU communication patterns with zero demographic penalty.',
    cosine: '0.884',
  },
  C108: {
    id: 'Candidate #C108',
    title: '6 yrs exp • Cloud-Native Microservices, Golang, Kubernetes Operators',
    matchScore: 81,
    radar: [
      { name: 'Distributed Consensus', pct: 74, label: 'Raft operator primitives' },
      { name: 'Concurrency & Memory Safety', pct: 86, label: 'Go sync/channels' },
      { name: 'Architecture Leadership', pct: 78, label: 'Senior Staff Engineer' },
    ],
    commentary:
      'Demonstrated high system resilience knowledge. Suitable for core microservice orchestration with minimal onboarding time required.',
    cosine: '0.812',
  },
}

export const TalentMatchMockup: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateId>('E904')
  const cand = candidatesData[selectedCandidate]

  return (
    <div className="mockup-frame mockup-talent">
      {/* Top Application Bar */}
      <div className="mockup-header">
        <div className="mockup-window-controls">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="mockup-title-bar">
          <Cpu size={12} /> semantic-matcher / role / principal-distributed-systems
        </div>
        <div className="mockup-live-tag">
          <Sparkles size={11} /> 128 EMBEDDINGS ANALYZED
        </div>
      </div>

      <div className="mockup-body talent-grid">
        {/* Candidate Selector Tabs */}
        <div className="candidate-selector-bar">
          {(['E904', 'A412', 'C108'] as const).map(cid => (
            <button
              key={cid}
              type="button"
              className={`cand-tab-btn ${selectedCandidate === cid ? 'active' : ''}`}
              onClick={() => setSelectedCandidate(cid)}
            >
              #{cid} ({candidatesData[cid].matchScore}%)
            </button>
          ))}
          <span className="cand-selector-hint">Click candidate to compare semantic scores</span>
        </div>

        {/* Candidate Ranking List */}
        <div className="mockup-card talent-candidate-card">
          <div className="candidate-top">
            <div className="candidate-avatar">#{selectedCandidate}</div>
            <div className="candidate-info">
              <div className="candidate-name-row">
                <h4>{cand.id}</h4>
                <span className="blind-badge">Blind-Screen Verified</span>
              </div>
              <p>{cand.title}</p>
            </div>
            <div className="overall-score-pill">
              <span className="score-num">{cand.matchScore}%</span>
              <span className="score-txt">Semantic Fit</span>
            </div>
          </div>

          <div className="semantic-breakdown-row">
            {cand.radar.map(item => (
              <div className="radar-metric" key={item.name}>
                <span className="metric-title">{item.name}</span>
                <div className="metric-bar-bg">
                  <div
                    className="metric-bar-fill"
                    style={{
                      width: `${item.pct}%`,
                      transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </div>
                <span className="metric-val">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Semantic Reasoning Engine Drawer */}
        <div className="mockup-card talent-reasoning-card">
          <div className="reasoning-header">
            <Sparkles size={14} className="text-purple-400" />
            <span>LLM Semantic Synthesis & Contextual Justification</span>
          </div>
          <div className="reasoning-bubble">
            <p>"{cand.commentary}"</p>
          </div>
          <div className="reasoning-meta-tags">
            <span>Cosine Sim: {cand.cosine}</span>
            <span>Zero Keyword-Penalty</span>
            <span>Fairness Score: 100/100</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Mockup 3: Cognitive Flow Agentic Orchestrator
// ============================================================================
const dagSteps = [
  { id: 0, name: 'Input Ingestion', detail: 'Schema validated • 24ms', icon: FileText },
  { id: 1, name: 'Planning Agent', detail: 'Claude 3.5 • Reasoning trace', icon: Cpu },
  { id: 2, name: 'gVisor Sandbox', detail: 'Tool invocation: SQL Query', icon: Database },
  { id: 3, name: 'Human Approval', detail: 'Deterministic check gate', icon: Eye },
]

export const CognitiveFlowMockup: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [consoleMsg, setConsoleMsg] = useState(
    '[11:28:44.201] [Agent:Planner] Decomposed plan into 3 concurrent tool calls. Checkpoint saved to Temporal persistence.'
  )

  useEffect(() => {
    let timer: any
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setActiveStep(prev => {
          const next = (prev + 1) % dagSteps.length
          const messages = [
            '[13:02:10.040] [Ingestion] Validated payload schema against strict OpenAPI 3.1 contract.',
            '[13:02:10.280] [Agent:Planner] Synthesizing reasoning graph and dynamic routing checkpoints.',
            '[13:02:10.610] [gVisor] Isolated microVM sandbox executed secure query in 41ms with 0 leaks.',
            '[13:02:10.920] [ApprovalGate] Cryptographic signature verified by security policy supervisor.',
          ]
          setConsoleMsg(messages[next])
          return next
        })
      }, 1500)
    }
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const handleNextStep = () => {
    setActiveStep(prev => {
      const next = (prev + 1) % dagSteps.length
      const messages = [
        '[13:02:10.040] [Ingestion] Validated payload schema against strict OpenAPI 3.1 contract.',
        '[13:02:10.280] [Agent:Planner] Synthesizing reasoning graph and dynamic routing checkpoints.',
        '[13:02:10.610] [gVisor] Isolated microVM sandbox executed secure query in 41ms with 0 leaks.',
        '[13:02:10.920] [ApprovalGate] Cryptographic signature verified by security policy supervisor.',
      ]
      setConsoleMsg(messages[next])
      return next
    })
  }

  return (
    <div className="mockup-frame mockup-flow">
      {/* Top Application Bar */}
      <div className="mockup-header">
        <div className="mockup-window-controls">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="mockup-title-bar">
          <Layers size={12} /> cognitive-flow.internal / DAG-Canvas / pipeline-v3
        </div>
        <div className="mockup-live-tag success">
          <Activity size={11} /> RUNNING 40ms/STEP
        </div>
      </div>

      <div className="mockup-body flow-dag-canvas">
        {/* Interactive Controls Bar */}
        <div className="dag-controls-bar">
          <button
            type="button"
            className="button button-small"
            onClick={handleNextStep}
            title="Step through the next DAG node"
          >
            Step Forward <ChevronRight size={13} />
          </button>
          <button
            type="button"
            className={`button button-small ${isAutoPlaying ? 'button-outline' : 'button-quiet'}`}
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          >
            {isAutoPlaying ? (
              <>
                <Pause size={12} /> Pause Auto-run
              </>
            ) : (
              <>
                <Play size={12} /> Auto-Step DAG
              </>
            )}
          </button>
          <span className="dag-active-pill">
            Active: <b>{dagSteps[activeStep].name}</b>
          </span>
        </div>

        <div className="dag-node-strip">
          {dagSteps.map((node, index) => {
            const isCompleted = activeStep > index
            const isActive = activeStep === index
            const Icon = node.icon
            return (
              <React.Fragment key={node.id}>
                <div
                  className={`dag-node ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveStep(index)}
                  style={{ cursor: 'pointer' }}
                  title={`Click to focus on ${node.name}`}
                >
                  <div className="node-head">
                    <Icon size={13} />
                    <span>{node.name}</span>
                    {isCompleted ? (
                      <CheckCircle2 size={13} className="text-emerald-400" />
                    ) : isActive ? (
                      <span className="node-spinner" />
                    ) : null}
                  </div>
                  <div className="node-detail">{node.detail}</div>
                </div>
                {index < dagSteps.length - 1 && (
                  <div className={`dag-connector ${isCompleted ? 'active' : ''}`} />
                )}
              </React.Fragment>
            )
          })}
        </div>

        {/* Real-time telemetry log footer */}
        <div className="dag-console-log">
          <span className="console-prompt">$</span>
          <span className="console-text">{consoleMsg}</span>
          <ChevronRight size={13} className="console-cursor" />
        </div>
      </div>
    </div>
  )
}
