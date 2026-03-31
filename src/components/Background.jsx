// Background.jsx
// Des badges tech flottants en glassmorphisme.
// Chaque badge a une icône SVG, un nom de techno,
// et flotte avec une animation CSS unique.

// Les données de chaque badge flottant
const BADGES = [
  {
    id: 1,
    name: 'React', sub: 'v19.0',
    color: '#34d399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)',
    style: { top: '8%', left: '4%' },
    dur: '7s', delay: '0s', lift: '-16px', rot: '-1deg', rot2: '1.5deg',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#34d399">
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#34d399" strokeWidth="1.2"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#34d399" strokeWidth="1.2" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#34d399" strokeWidth="1.2" transform="rotate(120 12 12)"/>
        <circle cx="12" cy="12" r="2" fill="#34d399"/>
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Node.js', sub: 'Runtime',
    color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)',
    style: { top: '6%', right: '8%' },
    dur: '8s', delay: '-2s', lift: '-12px', rot: '1deg', rot2: '-1deg',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#10b981">
        <path d="M12 1.85L2.5 7.13v9.74L12 22.15l9.5-5.28V7.13L12 1.85zm7.5 13.86L12 19.85l-7.5-4.14V8.29L12 4.15l7.5 4.14v7.42z"/>
      </svg>
    ),
  },
  {
    id: 3,
    name: 'GitHub', sub: 'API v4',
    color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.18)',
    style: { top: '38%', left: '2%' },
    dur: '6.5s', delay: '-1s', lift: '-18px', rot: '-1.5deg', rot2: '0.5deg',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#60a5fa">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    id: 4,
    name: 'TypeScript', sub: 'Strict mode',
    color: '#60a5fa', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.22)',
    style: { top: '62%', right: '4%' },
    dur: '7.5s', delay: '-3.5s', lift: '-14px', rot: '1.2deg', rot2: '-0.8deg',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18">
        <rect width="24" height="24" rx="3" fill="#3b82f6"/>
        <path d="M13.5 15.5v1.8c.3.15.65.27 1.05.35.4.08.82.12 1.25.12.42 0 .82-.04 1.2-.13.38-.09.71-.23.99-.43.28-.2.5-.45.66-.77.16-.31.24-.69.24-1.13 0-.33-.05-.62-.14-.87a2 2 0 00-.42-.67c-.18-.19-.4-.36-.66-.51-.26-.15-.55-.3-.88-.43-.24-.1-.45-.19-.63-.28a2.3 2.3 0 01-.45-.28.97.97 0 01-.28-.32.77.77 0 01-.1-.39c0-.14.03-.26.09-.37.06-.1.15-.19.26-.26.11-.07.24-.12.4-.16.15-.04.32-.05.5-.05.13 0 .27.01.42.03.15.02.3.06.44.11.15.05.28.12.41.2.13.08.24.18.33.3V12c-.27-.1-.57-.18-.9-.23-.32-.05-.68-.08-1.07-.08-.41 0-.8.05-1.17.14-.37.09-.7.24-.98.44-.28.2-.5.46-.67.77-.17.31-.25.69-.25 1.12 0 .55.16 1.02.47 1.4.31.38.78.7 1.4.96.26.1.5.21.7.31.21.1.38.21.53.32.15.11.26.24.34.38.08.14.12.3.12.48 0 .14-.03.27-.08.39-.05.12-.14.22-.25.31-.12.09-.26.16-.44.2-.18.05-.39.07-.63.07-.41 0-.81-.08-1.2-.23a3.7 3.7 0 01-1.03-.65zM9.5 13.1H12V11.5H5v1.6h2.5V20H9.5v-6.9z" fill="white"/>
      </svg>
    ),
  },
  {
    id: 5,
    name: 'Dev.to', sub: 'Articles',
    color: '#22d3ee', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.2)',
    style: { bottom: '14%', left: '16%' },
    dur: '9s', delay: '-4s', lift: '-20px', rot: '-0.8deg', rot2: '1.8deg',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#22d3ee">
        <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.28zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z"/>
      </svg>
    ),
  },
  {
    id: 6,
    name: 'Vite', sub: 'Build tool',
    color: '#34d399', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.18)',
    style: { top: '22%', right: '20%' },
    dur: '6s', delay: '-5s', lift: '-13px', rot: '0.5deg', rot2: '-1.5deg',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#34d399">
        <path d="M21.5 2L13 13.5 11.5 9 3 11.5 10.5 22 21.5 2z"/>
      </svg>
    ),
  },
  {
    id: 7,
    name: 'npm', sub: 'Packages',
    color: '#60a5fa', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.18)',
    style: { bottom: '22%', right: '18%' },
    dur: '8.5s', delay: '-1.5s', lift: '-16px', rot: '-1deg', rot2: '1deg',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18">
        <rect x="0" y="6" width="24" height="12" rx="1" fill="#3b82f6"/>
        <rect x="7" y="9" width="3" height="6" fill="white"/>
        <rect x="17" y="9" width="1" height="6" fill="white"/>
      </svg>
    ),
  },
  {
    id: 8,
    name: 'Express', sub: 'Backend',
    color: '#22d3ee', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.18)',
    style: { top: '52%', left: '10%' },
    dur: '7s', delay: '-6s', lift: '-15px', rot: '1deg', rot2: '-0.5deg',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#22d3ee">
        <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c-.022-.235-.08-.455-.13-.826zm1.127-.312h7.822c-.02-2.328-1.468-3.93-3.709-3.988-2.38-.056-4.008 1.51-4.113 3.988z"/>
      </svg>
    ),
  },
]

// Un seul badge — reçoit toutes ses infos en props
function FloatingBadge({ badge }) {
  const { name, sub, color, bg, border, style, dur, delay, lift, rot, rot2, icon } = badge

  return (
    <div
      className="float-badge"
      style={{
        ...style,
        '--dur': dur,
        '--delay': delay,
        '--lift': lift,
        '--rot': rot,
        '--rot2': rot2,
        background: bg,
        borderColor: border,
      }}
    >
      <div className="float-badge-icon" style={{ background: bg }}>
        {icon}
      </div>
      <div className="float-badge-text">
        <div className="float-badge-name" style={{ color }}>{name}</div>
        <div className="float-badge-sub" style={{ color }}>{sub}</div>
      </div>
    </div>
  )
}

function Background() {
  return (
    <div className="bg-scene">
      {/* Blobs de lumière */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
      <div className="blob blob-4"></div>

      {/* Badges flottants */}
      {BADGES.map(badge => (
        <FloatingBadge key={badge.id} badge={badge} />
      ))}
    </div>
  )
}

export default Background