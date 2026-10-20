# GenAI Technologies Web Platform

A high-performance, responsive multi-page web platform for **GenAI Technologies**, built with React 18, TypeScript, Vite 6, React Router DOM 6, Lucide icons, and custom modular CSS.

---

## 🚀 Live Routes
- **`/`** — Homepage with hero, live performance metrics, and featured system visualizer.
- **`/about`** — Company story, vision, and core engineering principles.
- **`/services`** — Applied AI, Machine Learning, Distributed Software, and Agentic DAG pipelines.
- **`/projects`** — Interactive system telemetry dashboards and architecture deep dives:
  - **Kisan Alert**: Sentinel-2 satellite telemetry & Vision Transformer foliar diagnostics.
  - **Intelligent Talent Matching**: Semantic vector role matching & anti-bias ranking.
  - **Cognitive Flow Platform**: Multi-agent DAG orchestrator with deterministic human checkpoints.
- **`/contact`** — Secure enquiry form connected to `/api/contact` with spam honeypot and reference tracking.
- **`/privacy`** — Privacy Policy, data retention commitments, and Responsible AI Standards.

---

## 🛠 Tech Stack
- **Frontend Framework**: React 18, TypeScript, React Router 6
- **Build Tool**: Vite 6 (Zero-error `npm run build` verification)
- **Styling**: Modern CSS with CSS custom properties, glassmorphism, responsive grid & flexbox
- **Identity & Icons**: Custom vector SVG Neural-Quantum Nexus logo + Lucide Icons
- **Backend API**: Vercel Serverless Function (`api/contact.ts`) with CORS and webhook integration
- **CI/CD**: GitHub Actions automated build pipeline (`.github/workflows/ci.yml`)
- **Routing & Rewrites**: `vercel.json` SPA configuration for single-page routing

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Type check & build production assets
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 📬 Backend Contact API
The contact form is connected to `api/contact.ts` which runs as a serverless function when deployed to Vercel.

Optional Environment Variables (configured in Vercel project settings):
- `CONTACT_WEBHOOK_URL` — Dispatch notifications to a Discord, Slack, or webhook endpoint on inquiry submission.
- `VITE_CONTACT_FORM_ENDPOINT` — Optional custom external form submission endpoint (e.g. Formspree / Web3Forms).

---

## 🚢 GitHub & Vercel Deployment

### 1. Push to GitHub
```bash
git remote add origin https://github.com/<your-username>/genai-technologies.git
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repository.
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Click **Deploy**. Vercel will automatically read `vercel.json` for SPA rewrites and compile `/api/contact`.
