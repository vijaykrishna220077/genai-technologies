import React from 'react'

interface GenAILogoProps {
  size?: number
  className?: string
  glow?: boolean
}

export const GenAILogo: React.FC<GenAILogoProps> = ({ size = 28, className = '', glow = true }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c2abff" />
          <stop offset="50%" stopColor="#8758ff" />
          <stop offset="100%" stopColor="#4d92ff" />
        </linearGradient>
        <linearGradient id="logo-grad-accent" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#43e5ff" />
          <stop offset="100%" stopColor="#9062ff" />
        </linearGradient>
        {glow && (
          <filter id="logo-core-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        )}
      </defs>

      {/* Outer Hexagonal Resonant Ring */}
      <path
        d="M24 6L39 15V33L24 42L9 33V15L24 6Z"
        stroke="url(#logo-grad-primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner Synaptic Connections */}
      <path
        d="M24 14L32 19V29L24 34L16 29V19L24 14Z"
        stroke="url(#logo-grad-accent)"
        strokeWidth="1.8"
        strokeDasharray="2.5 3.5"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Axis Lines into the Core */}
      <line x1="24" y1="6" x2="24" y2="14" stroke="url(#logo-grad-primary)" strokeWidth="1.6" opacity="0.75" />
      <line x1="39" y1="15" x2="32" y2="19" stroke="url(#logo-grad-primary)" strokeWidth="1.6" opacity="0.75" />
      <line x1="39" y1="33" x2="32" y2="29" stroke="url(#logo-grad-primary)" strokeWidth="1.6" opacity="0.75" />
      <line x1="24" y1="42" x2="24" y2="34" stroke="url(#logo-grad-primary)" strokeWidth="1.6" opacity="0.75" />
      <line x1="9" y1="33" x2="16" y2="29" stroke="url(#logo-grad-primary)" strokeWidth="1.6" opacity="0.75" />
      <line x1="9" y1="15" x2="16" y2="19" stroke="url(#logo-grad-primary)" strokeWidth="1.6" opacity="0.75" />

      {/* Glowing Intelligent Core */}
      <circle
        cx="24"
        cy="24"
        r="5.5"
        fill="url(#logo-grad-primary)"
        filter={glow ? 'url(#logo-core-glow)' : undefined}
      />
      <circle cx="24" cy="24" r="2.8" fill="#ffffff" />

      {/* Vertex Nodes */}
      <circle cx="24" cy="6" r="2.2" fill="#dcd2ff" />
      <circle cx="39" cy="15" r="2.2" fill="#75b2ff" />
      <circle cx="39" cy="33" r="2.2" fill="#baa2ff" />
      <circle cx="24" cy="42" r="2.2" fill="#5ee2ff" />
      <circle cx="9" cy="33" r="2.2" fill="#9d78ff" />
      <circle cx="9" cy="15" r="2.2" fill="#cab7ff" />
    </svg>
  )
}

export default GenAILogo
