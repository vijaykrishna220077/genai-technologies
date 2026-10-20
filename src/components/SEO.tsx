import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SEOProps {
  title?: string
  description?: string
}

const defaultMeta = {
  title: 'GenAI Technologies — Intelligence into Impact',
  description:
    'GenAI Technologies builds practical AI systems, computer vision models, agentic workflows, and thoughtful software for real-world challenges.'
}

const routeMetaMap: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'GenAI Technologies — Applied AI & Intelligent Software',
    description:
      'We turn promising ideas into practical AI systems, precision agriculture intelligence, semantic search, and autonomous workflow engines.'
  },
  '/about': {
    title: 'About Us — GenAI Technologies',
    description:
      'Our story, mission, and guiding principles. Building reliable, human-centric intelligence through disciplined engineering and open experimentation.'
  },
  '/services': {
    title: 'Capabilities & Services — GenAI Technologies',
    description:
      'Applied AI, machine learning architectures, modern software engineering, agentic automation, and R&D prototyping.'
  },
  '/projects': {
    title: 'Selected Projects & Architecture — GenAI Technologies',
    description:
      'Explore Kisan Alert, Intelligent Talent Semantic Matching, and Cognitive Flow Multi-Agent Orchestration with full technical specs and telemetry.'
  },
  '/contact': {
    title: 'Start a Conversation — GenAI Technologies',
    description:
      'Have an AI challenge, a platform initiative, or an innovative product to build? Connect directly with our engineering team.'
  },
  '/privacy': {
    title: 'Privacy Policy & Responsible AI — GenAI Technologies',
    description:
      'Our explicit commitment to client data protection, zero third-party AI training on client inputs, and transparent telemetry practices.'
  }
}

export const SEO: React.FC<SEOProps> = ({ title, description }) => {
  const location = useLocation()

  useEffect(() => {
    const routeInfo = routeMetaMap[location.pathname] || defaultMeta
    const effectiveTitle = title || routeInfo.title
    const effectiveDesc = description || routeInfo.description

    document.title = effectiveTitle

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', effectiveDesc)

    // Update Open Graph tags if present
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', effectiveTitle)

    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', effectiveDesc)

    // Scroll to top smoothly on route change
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname, title, description])

  return null
}

export default SEO
