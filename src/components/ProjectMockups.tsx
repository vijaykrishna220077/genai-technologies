import React from 'react'
import {
  Activity, CheckCircle2, ChevronRight, Cpu, Database, Eye,
  FileText, Globe2, Layers, Play, ShieldAlert, Sparkles, Volume2
} from 'lucide-react'

// Mockup 1: Kisan Alert Agricultural Vision & Telemetry Dashboard
export const KisanAlertMockup: React.FC = () => {
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
              <h4>Sector 4B • Paddy Crop Field</h4>
            </div>
            <span className="stat-pill success">NDVI 0.74 (Healthy Canopy)</span>
          </div>

          <div className="satellite-viewport">
            <div className="satellite-grid-overlay">
              <div className="grid-cell active-cell">
                <span className="scan-crosshair" />
                <span className="cell-label">Zone 04 • Alert</span>
              </div>
            </div>
            <div className="field-metrics-bar">
              <div><span>Soil Moisture:</span> <b>28.4%</b></div>
              <div><span>Ambient Temp:</span> <b>31.2°C</b></div>
              <div><span>Humidity:</span> <b>76%</b></div>
            </div>
          </div>
        </div>

        {/* Right: Vision Diagnostic & Audio Advisory */}
        <div className="mockup-card kisan-diagnostic-card">
          <div className="kisan-card-header">
            <div>
              <span className="card-badge model">ViT-Base-8bit</span>
              <h4>Automated Foliar Pathology</h4>
            </div>
            <span className="confidence-pill">94.8% Match</span>
          </div>

          <div className="diagnostic-result-box">
            <div className="disease-icon-wrap">
              <ShieldAlert size={20} className="text-amber-400" />
            </div>
            <div>
              <div className="result-name">Early Stage Leaf Blight</div>
              <div className="result-recommendation">Recommended: Copper oxychloride 50% WP spray within 48h</div>
            </div>
          </div>

          <div className="vernacular-audio-player">
            <button className="audio-play-btn" type="button" aria-label="Play vernacular voice advisory">
              <Play size={14} fill="currentColor" />
            </button>
            <div className="audio-waveform-wrap">
              <div className="audio-meta">
                <span>Vernacular Voice Note (Hindi / Telugu)</span>
                <span>0:42</span>
              </div>
              <div className="audio-bars">
                {[40, 65, 80, 50, 95, 75, 60, 85, 90, 45, 70, 85, 60, 40, 90, 75, 50].map((h, i) => (
                  <span key={i} style={{ height: `${h}%` }} className={i < 8 ? 'played' : ''} />
                ))}
              </div>
            </div>
            <Volume2 size={16} className="text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Mockup 2: Intelligent Talent Semantic Matching Matrix
export const TalentMatchMockup: React.FC = () => {
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
        {/* Candidate Ranking List */}
        <div className="mockup-card talent-candidate-card">
          <div className="candidate-top">
            <div className="candidate-avatar">#09</div>
            <div className="candidate-info">
              <div className="candidate-name-row">
                <h4>Candidate #E904</h4>
                <span className="blind-badge">Blind-Screen Verified</span>
              </div>
              <p>11 yrs exp • Distributed Consensus, Rust, High-Throughput Stream Processing</p>
            </div>
            <div className="overall-score-pill">
              <span className="score-num">92%</span>
              <span className="score-txt">Semantic Fit</span>
            </div>
          </div>

          <div className="semantic-breakdown-row">
            <div className="radar-metric">
              <span className="metric-title">Distributed Consensus</span>
              <div className="metric-bar-bg"><div className="metric-bar-fill" style={{ width: '96%' }} /></div>
              <span className="metric-val">Raft / Paxos proven</span>
            </div>
            <div className="radar-metric">
              <span className="metric-title">Concurrency & Memory Safe</span>
              <div className="metric-bar-bg"><div className="metric-bar-fill" style={{ width: '94%' }} /></div>
              <span className="metric-val">Rust & Go Equivalence</span>
            </div>
            <div className="radar-metric">
              <span className="metric-title">Architecture Leadership</span>
              <div className="metric-bar-bg"><div className="metric-bar-fill" style={{ width: '88%' }} /></div>
              <span className="metric-val">Led 4 sub-teams</span>
            </div>
          </div>
        </div>

        {/* Semantic Reasoning Engine Drawer */}
        <div className="mockup-card talent-reasoning-card">
          <div className="reasoning-header">
            <Sparkles size={14} className="text-purple-400" />
            <span>LLM Semantic Synthesis & Contextual Justification</span>
          </div>
          <div className="reasoning-bubble">
            <p>
              "Candidate demonstrated direct equivalence to the required <b>Kafka/Flink streaming profile</b> through 4 years of architecting custom Tokio-based zero-copy ingestion pipelines handling <b>1.8M msg/sec</b>. Bypassed rigid keyword mismatch automatically."
            </p>
          </div>
          <div className="reasoning-meta-tags">
            <span>Cosine Sim: 0.931</span>
            <span>Zero Keyword-Penalty</span>
            <span>Fairness Score: 100/100</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mockup 3: Cognitive Flow Agentic Orchestrator
export const CognitiveFlowMockup: React.FC = () => {
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
        <div className="dag-node-strip">
          {/* Node 1 */}
          <div className="dag-node completed">
            <div className="node-head">
              <FileText size={13} />
              <span>Input Ingestion</span>
              <CheckCircle2 size={13} className="text-emerald-400" />
            </div>
            <div className="node-detail">Schema validated • 24ms</div>
          </div>

          <div className="dag-connector active" />

          {/* Node 2 */}
          <div className="dag-node active">
            <div className="node-head">
              <Cpu size={13} />
              <span>Planning Agent</span>
              <span className="node-spinner" />
            </div>
            <div className="node-detail">Claude 3.5 • Reasoning trace</div>
          </div>

          <div className="dag-connector" />

          {/* Node 3 */}
          <div className="dag-node tool-node">
            <div className="node-head">
              <Database size={13} />
              <span>gVisor Sandbox</span>
            </div>
            <div className="node-detail">Tool invocation: SQL Query</div>
          </div>

          <div className="dag-connector" />

          {/* Node 4 */}
          <div className="dag-node gate-node">
            <div className="node-head">
              <Eye size={13} />
              <span>Human Approval</span>
            </div>
            <div className="node-detail">Deterministic check gate</div>
          </div>
        </div>

        {/* Real-time telemetry log footer */}
        <div className="dag-console-log">
          <span className="console-prompt">$</span>
          <span className="console-text">
            [11:28:44.201] [Agent:Planner] Decomposed plan into 3 concurrent tool calls. Checkpoint saved to Temporal persistence.
          </span>
          <ChevronRight size={13} className="console-cursor" />
        </div>
      </div>
    </div>
  )
}
