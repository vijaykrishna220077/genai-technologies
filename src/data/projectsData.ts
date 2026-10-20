export interface ProjectTechnology {
  name: string
  category: 'Model / AI' | 'Backend / Infra' | 'Frontend / UI' | 'Data / Vector'
}

export interface ProjectMetric {
  label: string
  value: string
  subtext?: string
}

export interface ProjectItem {
  id: string
  number: string
  category: string
  title: string
  tagline: string
  description: string
  problemStatement: string
  architectureDetails: string
  status: 'Production / Deployed' | 'Pilot Stage' | 'R&D Exploration'
  metrics: ProjectMetric[]
  technologies: ProjectTechnology[]
  keyFeatures: string[]
  accentColor: string
}

export const projectsData: ProjectItem[] = [
  {
    id: 'kisan-alert',
    number: '01',
    category: 'AI · Precision Agriculture',
    title: 'Kisan Alert',
    tagline: 'Hyperlocal Crop Health & Predictive Advisory Engine',
    description:
      'An end-to-end precision agritech platform combining Sentinel-2 multispectral satellite telemetry with fine-tuned Vision Transformers to detect foliar crop diseases and deliver vernacular voice advisories to rural farmers.',
    problemStatement:
      'Smallholder farmers lose up to 35% of crop yields annually due to late detection of pests and unpredicted localized micro-weather shifts. Generic national forecasts fail to provide actionable, field-level guidance.',
    architectureDetails:
      'Processes Sentinel-2 GeoJSON NDVI/EVI vegetation indices every 5 days. Farmer field photos are ingested via lightweight edge clients and processed through a quantized Vision Transformer (ViT-Base-8bit) on GPU inference workers. Multilingual voice notes are synthesized on-demand using OpenAI Whisper and localized TTS models in Hindi, Telugu, and Kannada.',
    status: 'Pilot Stage',
    metrics: [
      { label: 'Diagnostic Accuracy', value: '94.8%', subtext: 'Tested across 28 common crop leaf pathologies' },
      { label: 'Inference Latency', value: '180ms', subtext: 'Optimized ONNX Runtime on edge servers' },
      { label: 'Field Coverage', value: '12,000+ Ha', subtext: 'Monitored across test districts' }
    ],
    technologies: [
      { name: 'Vision Transformer (ViT)', category: 'Model / AI' },
      { name: 'OpenAI Whisper ASR', category: 'Model / AI' },
      { name: 'FastAPI / Python 3.11', category: 'Backend / Infra' },
      { name: 'Sentinel-2 Multispectral API', category: 'Data / Vector' },
      { name: 'PostGIS / Redis Cache', category: 'Data / Vector' },
      { name: 'React Native / PWA', category: 'Frontend / UI' }
    ],
    keyFeatures: [
      'Instant disease identification from smartphone leaf photos with bounding box heatmaps',
      'Automated vernacular audio advisories delivered via WhatsApp and SMS without requiring high literacy',
      'Hyperlocal micro-climate warnings triggered 48 hours prior to severe precipitation or pest-favorable humidity',
      'Offline-first caching designed for low-bandwidth 2G/3G rural networks'
    ],
    accentColor: '#4ade80'
  },
  {
    id: 'talent-match',
    number: '02',
    category: 'AI · Semantic Intelligence',
    title: 'Intelligent Talent Matching',
    tagline: 'Contextual Semantic Role Graph & Anti-Bias Candidate Ranking',
    description:
      'A deep semantic recruiting intelligence engine that moves beyond surface-level keyword filtering to evaluate technical depth, conceptual equivalence, and structural work impact across unstructured resumes and complex job specifications.',
    problemStatement:
      'Traditional ATS filters discard 75% of qualified non-traditional candidates due to missing arbitrary keywords, while hiring managers spend 30+ hours per requisition triaging irrelevant applications.',
    architectureDetails:
      'Combines hybrid dense-sparse vector embeddings (BGE-M3 + BM25) stored in pgvector. Candidate profiles and job descriptions are parsed into structured entity-relationship graphs. An LLM reranking layer (Claude 3.5 Sonnet / LLaMA 3.3) analyzes project accomplishments using blind evaluation prompts that mask gender, age, pedigree, and demographic markers.',
    status: 'Production / Deployed',
    metrics: [
      { label: 'Candidate Match Relevance', value: '89.2%', subtext: 'Validated by senior engineering hiring teams' },
      { label: 'Screening Time Saved', value: '74%', subtext: 'From 32 hours down to 8.3 hours per role' },
      { label: 'Diversity Pipeline Lift', value: '+31%', subtext: 'Through unbiased semantic blind-screening' }
    ],
    technologies: [
      { name: 'Hybrid Vector Embeddings', category: 'Model / AI' },
      { name: 'LLM Reranking (Claude / LLaMA)', category: 'Model / AI' },
      { name: 'PostgreSQL + pgvector', category: 'Data / Vector' },
      { name: 'FastAPI Microservices', category: 'Backend / Infra' },
      { name: 'TypeScript / React', category: 'Frontend / UI' },
      { name: 'Docker / AWS ECS', category: 'Backend / Infra' }
    ],
    keyFeatures: [
      'Contextual skill equivalence mapping (e.g. understanding that Akka/Rust distributed systems skills transfer to Go concurrency)',
      'Blind anonymized ranking pipeline ensuring zero demographic bias',
      'Automated explanation generation highlighting verifiable project contributions rather than buzzwords',
      'Real-time interactive skill radar and gap analysis comparison matrix'
    ],
    accentColor: '#60a5fa'
  },
  {
    id: 'cognitive-flow',
    number: '03',
    category: 'Software · Agentic Workflows',
    title: 'Cognitive Flow Platform',
    tagline: 'Autonomous Multi-Agent DAG Orchestrator with Human Oversight',
    description:
      'An enterprise orchestration canvas that empowers engineering and operations teams to assemble, simulate, and supervise multi-agent AI workflows with deterministic tool calling, real-time telemetry, and state recovery.',
    problemStatement:
      'Standalone LLM chat interfaces cannot handle multi-step enterprise workflows requiring database queries, ERP updates, and compliance checks without hallucinations, timeouts, and lack of audit trails.',
    architectureDetails:
      'Built around a directed acyclic graph (DAG) execution runtime with Temporal workflows providing durable state persistence. Agents communicate over typed JSON-RPC protocols via WebSockets. Sandboxed code execution is handled inside isolated gVisor/Docker microVM containers with sub-50ms startup.',
    status: 'R&D Exploration',
    metrics: [
      { label: 'Workflow Execution Reliability', value: '99.94%', subtext: 'With automated rollback & state checkpointing' },
      { label: 'Autonomous Tool Calls', value: '250k+/mo', subtext: 'Executed within secure sandboxes' },
      { label: 'Avg Step Execution', value: '<420ms', subtext: 'End-to-end agentic tool invocation' }
    ],
    technologies: [
      { name: 'Multi-Agent DAG Engine', category: 'Model / AI' },
      { name: 'Temporal / Durable Orchestration', category: 'Backend / Infra' },
      { name: 'WebSockets / Async JSON-RPC', category: 'Backend / Infra' },
      { name: 'Docker / gVisor MicroVMs', category: 'Backend / Infra' },
      { name: 'React Flow Canvas / Vite', category: 'Frontend / UI' },
      { name: 'Tailwind / CSS Modules', category: 'Frontend / UI' }
    ],
    keyFeatures: [
      'Visual interactive node graph builder with live streaming token traces and step-by-step branch inspection',
      'Deterministic human-in-the-loop approval gates for financial transactions and production deployments',
      'Automated retry and self-healing memory buffers for graceful error recovery',
      'Full compliance audit log with cryptographic hash verification for every decision and external API call'
    ],
    accentColor: '#c084fc'
  }
]
