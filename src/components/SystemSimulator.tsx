import React, { useState, useEffect } from 'react'
import {
  CheckCircle2, Cpu, Database, Eye,
  Layers, Play, RotateCcw, Sliders, Sparkles, Terminal
} from 'lucide-react'

type PipelineMode = 'foliar-vision' | 'semantic-matcher' | 'agentic-dag'

interface PipelineStep {
  name: string
  durationMs: number
  detail: string
}

const pipelineConfigs: Record<
  PipelineMode,
  {
    title: string
    category: string
    description: string
    defaultInput: string
    steps: PipelineStep[]
    outputSummary: {
      resultTitle: string
      confidence: number
      tokensUsed: number
      latencyMs: number
      details: string[]
    }
  }
> = {
  'foliar-vision': {
    title: 'Foliar Vision Transformer & Satellite Telemetry',
    category: 'Computer Vision · Agritech',
    description:
      'Ingests Sentinel-2 GeoJSON NDVI vegetation layers and edge camera photos to perform pixel-level foliar pathology classification.',
    defaultInput: 'sector_4b_leaf_sample_20261020.raw (4032x3024 RGB)',
    steps: [
      { name: 'Multispectral Preprocessing', durationMs: 240, detail: 'GeoTIFF NDVI normalization & edge downsampling' },
      { name: 'Patch Partitioning (ViT-Base)', durationMs: 360, detail: '16x16 patch projection into 768-dim embeddings' },
      { name: 'Multi-Head Self-Attention', durationMs: 420, detail: '12-layer attention map over lesion boundaries' },
      { name: 'Vernacular Audio Synthesis', durationMs: 280, detail: 'Whisper TTS generating Telugu & Hindi advisory' },
    ],
    outputSummary: {
      resultTitle: 'Early Stage Cercospora Leaf Spot (96.4% confidence)',
      confidence: 96.4,
      tokensUsed: 412,
      latencyMs: 1300,
      details: [
        'Boundary IoU: 0.912 across Sector 4B canopy',
        'Chlorophyll degradation index: -18% vs 14-day baseline',
        'Vernacular advisory synthesized: 38s voice audio dispatched',
      ],
    },
  },
  'semantic-matcher': {
    title: 'Dense-Sparse Vector Role Matcher & Reranker',
    category: 'Semantic Search · pgvector',
    description:
      'Evaluates candidate depth and structural accomplishments against non-trivial engineering requisitions with blind demographic masking.',
    defaultInput: 'Role: Principal Distributed Systems Engineer (Rust, Raft, High-Throughput Streams)',
    steps: [
      { name: 'Blind Demographic Anonymization', durationMs: 190, detail: 'Masking gender, names, universities, and graduation years' },
      { name: 'Hybrid Embedding (BGE-M3 + BM25)', durationMs: 320, detail: 'Generating 1024-dim dense vectors + sparse lexical tokens' },
      { name: 'Approximate Nearest Neighbor (HNSW)', durationMs: 270, detail: 'Traversing pgvector index over 140,000 candidate nodes' },
      { name: 'LLM Contextual Reranking', durationMs: 480, detail: 'Claude 3.5 evaluating concurrency proof vs arbitrary keywords' },
    ],
    outputSummary: {
      resultTitle: 'Candidate #E904 Selected (93.1% Semantic Fit)',
      confidence: 93.1,
      tokensUsed: 1280,
      latencyMs: 1260,
      details: [
        'Detected 1.8M msg/sec custom Tokio streaming pipeline',
        'Evaluated direct equivalence to Kafka/Flink architecture',
        'Demographic bias score: 0.00 (100% blind-screen audit passed)',
      ],
    },
  },
  'agentic-dag': {
    title: 'Multi-Agent Autonomous DAG Orchestrator',
    category: 'Agentic Workflows · Temporal',
    description:
      'Decomposes complex organizational goals into parallel sub-agents with secure gVisor container tool execution and approval checkpoints.',
    defaultInput: 'Goal: Audit Q3 telemetry anomalies, run database schema migration, and draft release notes',
    steps: [
      { name: 'DAG Task Decomposition', durationMs: 280, detail: 'Planner agent breaking goal into 4 directed acyclic tasks' },
      { name: 'Sandboxed Tool Invocation', durationMs: 510, detail: 'Isolated gVisor microVM executing SQL diagnostic query' },
      { name: 'Temporal State Checkpoint', durationMs: 210, detail: 'Cryptographic state snapshot written to durable storage' },
      { name: 'Deterministic Human Approval Gate', durationMs: 380, detail: 'Production schema lock verified before automated release' },
    ],
    outputSummary: {
      resultTitle: 'Autonomous Pipeline Executed with 0 Faults',
      confidence: 99.8,
      tokensUsed: 2840,
      latencyMs: 1380,
      details: [
        '4 tool calls verified inside microVM sandbox',
        'Automatic rollback checkpoints established',
        'End-to-end audit trace published with SHA-256 integrity hash',
      ],
    },
  },
}

export const SystemSimulator: React.FC = () => {
  const [mode, setMode] = useState<PipelineMode>('foliar-vision')
  const [temperature, setTemperature] = useState(0.2)
  const [concurrency, setConcurrency] = useState(4)
  const [isRunning, setIsRunning] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [completed, setCompleted] = useState(false)
  const [logMessages, setLogMessages] = useState<string[]>([])

  const config = pipelineConfigs[mode]

  const runSimulation = () => {
    if (isRunning) return
    setIsRunning(true)
    setCompleted(false)
    setCurrentStepIndex(0)
    setLogMessages([
      `[${new Date().toLocaleTimeString()}] Initializing pipeline [${mode}] with Concurrency=${concurrency}, Temp=${temperature}...`,
      `[${new Date().toLocaleTimeString()}] Input: ${config.defaultInput}`,
    ])
  }

  const resetSimulation = () => {
    setIsRunning(false)
    setCurrentStepIndex(-1)
    setCompleted(false)
    setLogMessages([])
  }

  useEffect(() => {
    resetSimulation()
  }, [mode])

  useEffect(() => {
    if (!isRunning || currentStepIndex < 0) return

    if (currentStepIndex < config.steps.length) {
      const step = config.steps[currentStepIndex]
      const timer = setTimeout(() => {
        setLogMessages(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] ✓ Completed: ${step.name} (${step.detail})`,
        ])
        setCurrentStepIndex(prev => prev + 1)
      }, step.durationMs)

      return () => clearTimeout(timer)
    } else {
      // Completed all steps
      const completeTimer = setTimeout(() => {
        setIsRunning(false)
        setCompleted(true)
        setLogMessages(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] 🚀 Output validated: ${config.outputSummary.resultTitle}`,
        ])
      }, 300)
      return () => clearTimeout(completeTimer)
    }
  }, [isRunning, currentStepIndex, mode])

  return (
    <section className="section section-soft simulator-section">
      <div className="container">
        <div className="section-heading" style={{ maxWidth: '780px', margin: '0 auto 40px', textAlign: 'center' }}>
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            Interactive Architecture Sandbox
          </span>
          <h2>Experience Our AI Pipelines in Real-Time</h2>
          <p>
            Test how GenAI Technologies coordinates vision transformers, semantic embeddings, and agentic DAGs. Adjust parameters and inspect the live execution trace.
          </p>
        </div>

        <div className="simulator-wrap">
          {/* Top Mode Selector Tabs */}
          <div className="simulator-tabs">
            {(
              [
                { key: 'foliar-vision', label: '01. Vision Diagnostics (ViT)', icon: Eye },
                { key: 'semantic-matcher', label: '02. Semantic Vector Reranker', icon: Database },
                { key: 'agentic-dag', label: '03. Multi-Agent DAG Orchestrator', icon: Layers },
              ] as const
            ).map(tab => {
              const Icon = tab.icon
              const isActive = mode === tab.key
              return (
                <button
                  key={tab.key}
                  type="button"
                  className={`sim-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setMode(tab.key)}
                >
                  <Icon size={15} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          <div className="simulator-main-grid">
            {/* Left Controls & Configuration */}
            <div className="simulator-controls-panel">
              <div className="panel-title-row">
                <div>
                  <span className="card-badge">{config.category}</span>
                  <h3>{config.title}</h3>
                </div>
              </div>
              <p className="sim-desc">{config.description}</p>

              <div className="sim-input-box">
                <span className="sim-field-label">Simulated Input Payload:</span>
                <div className="sim-input-val">{config.defaultInput}</div>
              </div>

              {/* Sliders */}
              <div className="sim-sliders-group">
                <div className="slider-item">
                  <div className="slider-header">
                    <span>
                      <Sliders size={12} /> Model Temperature
                    </span>
                    <b>{temperature.toFixed(2)}</b>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={temperature}
                    onChange={e => setTemperature(parseFloat(e.target.value))}
                    disabled={isRunning}
                  />
                  <div className="slider-hint">
                    <span>Deterministic (0.0)</span>
                    <span>Exploratory (1.0)</span>
                  </div>
                </div>

                <div className="slider-item">
                  <div className="slider-header">
                    <span>
                      <Cpu size={12} /> Parallel GPU Workers
                    </span>
                    <b>{concurrency} Threads</b>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="1"
                    value={concurrency}
                    onChange={e => setConcurrency(parseInt(e.target.value))}
                    disabled={isRunning}
                  />
                  <div className="slider-hint">
                    <span>Single-node (1)</span>
                    <span>Distributed (8)</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="sim-actions-row">
                <button
                  type="button"
                  className={`button sim-run-btn ${isRunning ? 'loading' : ''}`}
                  onClick={runSimulation}
                  disabled={isRunning}
                >
                  {isRunning ? (
                    <>
                      <span className="node-spinner" /> Simulating...
                    </>
                  ) : (
                    <>
                      <Play size={15} fill="currentColor" /> Run Pipeline Simulation
                    </>
                  )}
                </button>

                {(completed || isRunning) && (
                  <button
                    type="button"
                    className="button button-quiet"
                    onClick={resetSimulation}
                    title="Reset simulation"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                )}
              </div>
            </div>

            {/* Right Execution & Telemetry Output */}
            <div className="simulator-output-panel">
              {/* Stepper Progress Bar */}
              <div className="sim-stepper">
                {config.steps.map((step, idx) => {
                  const isPast = currentStepIndex > idx || completed
                  const isCurrent = currentStepIndex === idx && isRunning
                  return (
                    <div
                      key={step.name}
                      className={`sim-step-item ${isPast ? 'completed' : ''} ${isCurrent ? 'active' : ''}`}
                    >
                      <div className="step-circle">
                        {isPast ? (
                          <CheckCircle2 size={13} />
                        ) : isCurrent ? (
                          <span className="step-pulsar" />
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>
                      <div className="step-text">
                        <span className="step-name">{step.name}</span>
                        <span className="step-detail">{step.detail}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Console & Streamed Log Output */}
              <div className="sim-console">
                <div className="sim-console-header">
                  <Terminal size={12} />
                  <span>LIVE INFERENCE LOGS</span>
                  {isRunning && <span className="streaming-badge">STREAMING</span>}
                </div>
                <div className="sim-console-body">
                  {logMessages.length === 0 ? (
                    <div className="console-empty">
                      Click <b>"Run Pipeline Simulation"</b> above to observe step-by-step telemetry, latency traces, and model inference tokens.
                    </div>
                  ) : (
                    logMessages.map((msg, i) => (
                      <div key={i} className="console-line">
                        <span className="line-num">{i + 1}</span>
                        <span className="line-txt">{msg}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Completed Result Card */}
              {completed && (
                <div className="sim-result-card">
                  <div className="result-top-row">
                    <div className="result-title-group">
                      <Sparkles size={16} className="text-purple-400" />
                      <h4>{config.outputSummary.resultTitle}</h4>
                    </div>
                    <span className="stat-pill success">
                      {config.outputSummary.confidence}% Match
                    </span>
                  </div>

                  <div className="result-metrics-grid">
                    <div>
                      <span>Total Latency:</span> <b>{Math.round(config.outputSummary.latencyMs / (concurrency * 0.45))}ms</b>
                    </div>
                    <div>
                      <span>Tokens Processed:</span> <b>{config.outputSummary.tokensUsed}</b>
                    </div>
                    <div>
                      <span>Energy Rating:</span> <b>Tier 1 Efficient</b>
                    </div>
                  </div>

                  <ul className="result-bullets">
                    {config.outputSummary.details.map((d, i) => (
                      <li key={i}>
                        <CheckCircle2 size={13} /> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SystemSimulator
