# GenAI Technologies website

A responsive, multi-page startup website built with React, TypeScript, Vite, React Router, Lucide icons, and custom CSS.

## Pages
- `/` — Home
- `/about` — Company story, vision, values
- `/services` — Capabilities
- `/projects` — Project explorations
- `/contact` — Contact form

## Run locally
Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL Vite prints in your terminal.

## Production build
```bash
npm run build
npm run preview
```

## Before launch
1. Replace the placeholder contact email `hello@genaitechnologies.com` in `src/App.tsx` with your real company email.
2. Confirm project descriptions, company details, and all public claims.
3. The contact form currently prepares an email using `mailto:` and does not save submissions. Connect a backend or form service for production.
4. Add real team profiles, project screenshots, privacy policy, and terms if applicable.
5. If deploying to Vercel, configure SPA rewrites so direct visits to routes such as `/about` resolve to `index.html`.

## Deploy to Vercel
Push the project to a GitHub repository, import it into Vercel, and use:
- Build command: `npm run build`
- Output directory: `dist`
