import { Link } from 'react-router-dom'
 
function HeroIllustration() {
  return (
    <svg width="100%" viewBox="0 0 440 420" xmlns="http://www.w3.org/2000/svg" className="hero-svg">
      <defs>
        <linearGradient id="hg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(14,165,233,0.15)"/>
          <stop offset="100%" stopColor="rgba(16,185,129,0.06)"/>
        </linearGradient>
        <linearGradient id="hg2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(16,185,129,0.15)"/>
          <stop offset="100%" stopColor="rgba(2,132,199,0.06)"/>
        </linearGradient>
        <linearGradient id="hg3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(2,132,199,0.12)"/>
          <stop offset="100%" stopColor="rgba(16,185,129,0.04)"/>
        </linearGradient>
      </defs>
 
      <rect x="10" y="10" width="420" height="400" rx="20"
        fill="rgba(255,255,255,0.9)" stroke="rgba(14,165,233,0.15)" strokeWidth="1"/>
 
      <rect x="10" y="10" width="420" height="46" rx="20"
        fill="rgba(14,165,233,0.06)"/>
      <rect x="10" y="34" width="420" height="22" fill="rgba(14,165,233,0.04)"/>
 
      <circle cx="44" cy="33" r="7" fill="rgba(239,68,68,0.4)" stroke="rgba(239,68,68,0.5)" strokeWidth="0.8"/>
      <circle cx="66" cy="33" r="7" fill="rgba(245,158,11,0.4)" stroke="rgba(245,158,11,0.5)" strokeWidth="0.8"/>
      <circle cx="88" cy="33" r="7" fill="rgba(16,185,129,0.4)" stroke="rgba(16,185,129,0.5)" strokeWidth="0.8"/>
 
      <text x="220" y="38" textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif" fontSize="11" fontWeight="700"
        fill="rgba(3,105,161,0.7)" letterSpacing="2">
        CODEPULSE
      </text>
 
      <rect x="28" y="70" width="118" height="76" rx="12"
        fill="url(#hg1)" stroke="rgba(14,165,233,0.2)" strokeWidth="0.8"/>
      <text x="42" y="94" fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="10" fill="rgba(3,105,161,0.7)" letterSpacing="1">ARTICLES</text>
      <text x="42" y="120" fontFamily="Space Grotesk, sans-serif"
        fontSize="26" fontWeight="700" fill="rgba(12,74,110,0.9)" letterSpacing="-1">248</text>
      <polyline points="100,126 108,118 116,122 124,114 132,116 140,108"
        fill="none" stroke="rgba(14,165,233,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
 
      <rect x="158" y="70" width="118" height="76" rx="12"
        fill="url(#hg2)" stroke="rgba(16,185,129,0.2)" strokeWidth="0.8"/>
      <text x="172" y="94" fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="10" fill="rgba(5,150,105,0.7)" letterSpacing="1">REPOS</text>
      <text x="172" y="120" fontFamily="Space Grotesk, sans-serif"
        fontSize="26" fontWeight="700" fill="rgba(6,78,59,0.9)" letterSpacing="-1">1.2k</text>
      <polyline points="230,126 238,114 246,120 254,108 262,116 270,104"
        fill="none" stroke="rgba(16,185,129,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
 
      <rect x="288" y="70" width="118" height="76" rx="12"
        fill="url(#hg3)" stroke="rgba(2,132,199,0.2)" strokeWidth="0.8"/>
      <text x="302" y="94" fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="10" fill="rgba(3,105,161,0.7)" letterSpacing="1">SOURCES</text>
      <text x="302" y="120" fontFamily="Space Grotesk, sans-serif"
        fontSize="26" fontWeight="700" fill="rgba(12,74,110,0.9)" letterSpacing="-1">12</text>
 
      <text x="28" y="170" fontFamily="Space Grotesk, sans-serif"
        fontSize="10" fontWeight="700" fill="rgba(3,105,161,0.7)" letterSpacing="1.5">
        FLUX EN DIRECT
      </text>
      <circle cx="415" cy="166" r="4" fill="#10b981">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite"/>
        <animate attributeName="r" values="4;6;4" dur="1.8s" repeatCount="indefinite"/>
      </circle>
      <text x="406" y="170" textAnchor="end"
        fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fill="rgba(5,150,105,0.7)">Live</text>
      <line x1="28" y1="176" x2="412" y2="176" stroke="rgba(14,165,233,0.12)" strokeWidth="0.8"/>
 
      <rect x="28" y="186" width="378" height="50" rx="10"
        fill="rgba(14,165,233,0.06)" stroke="rgba(14,165,233,0.12)" strokeWidth="0.8"/>
      <circle cx="50" cy="211" r="9" fill="rgba(220,252,231,1)" stroke="rgba(16,185,129,0.3)" strokeWidth="0.8"/>
      <text x="50" y="215" textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif" fontSize="8" fontWeight="700" fill="rgba(21,128,61,0.9)">GH</text>
      <text x="67" y="207" fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="11" fontWeight="500" fill="rgba(12,74,110,0.85)">react-query v5 — Breaking changes</text>
      <text x="67" y="222" fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="10" fill="rgba(125,211,252,0.8)">GitHub · il y a 2h · 4.2k stars</text>
      <rect x="350" y="203" width="48" height="16" rx="8"
        fill="rgba(220,252,231,1)" stroke="rgba(16,185,129,0.3)" strokeWidth="0.6"/>
      <text x="374" y="215" textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif" fontSize="9" fontWeight="700" fill="rgba(21,128,61,0.9)">React</text>
 
      <rect x="28" y="246" width="378" height="50" rx="10"
        fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.12)" strokeWidth="0.8"/>
      <circle cx="50" cy="271" r="9" fill="rgba(224,242,254,1)" stroke="rgba(14,165,233,0.3)" strokeWidth="0.8"/>
      <text x="50" y="275" textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif" fontSize="8" fontWeight="700" fill="rgba(3,105,161,0.9)">{"{}"}</text>
      <text x="67" y="267" fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="11" fontWeight="500" fill="rgba(12,74,110,0.85)">Maîtriser async/await en JavaScript</text>
      <text x="67" y="282" fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="10" fill="rgba(125,211,252,0.8)">Dev.to · il y a 5h · 347 réactions</text>
      <rect x="350" y="263" width="48" height="16" rx="8"
        fill="rgba(224,242,254,1)" stroke="rgba(14,165,233,0.3)" strokeWidth="0.6"/>
      <text x="374" y="275" textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif" fontSize="9" fontWeight="700" fill="rgba(3,105,161,0.9)">JS</text>
 
      <rect x="28" y="306" width="378" height="50" rx="10"
        fill="rgba(245,158,11,0.05)" stroke="rgba(245,158,11,0.12)" strokeWidth="0.8"/>
      <circle cx="50" cy="331" r="9" fill="rgba(254,243,199,1)" stroke="rgba(245,158,11,0.3)" strokeWidth="0.8"/>
      <text x="50" y="335" textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif" fontSize="8" fontWeight="700" fill="rgba(180,83,9,0.9)">HN</text>
      <text x="67" y="327" fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="11" fontWeight="500" fill="rgba(12,74,110,0.85)">GPT-4o fine-tuning now available for all</text>
      <text x="67" y="342" fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="10" fill="rgba(125,211,252,0.8)">Hacker News · il y a 1h · 528 points</text>
      <rect x="350" y="323" width="48" height="16" rx="8"
        fill="rgba(254,243,199,1)" stroke="rgba(245,158,11,0.3)" strokeWidth="0.6"/>
      <text x="374" y="335" textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif" fontSize="9" fontWeight="700" fill="rgba(180,83,9,0.9)">IA</text>
    </svg>
  )
}
 
function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          Veille technologique
        </div>
        <h1 className="hero-title">
          <span className="hero-title-line line-pink">Pulse sur</span>
          <span className="hero-title-line line-blue">l'actu dev</span>
          <span className="hero-title-line line-white">en temps réel.</span>
        </h1>
        <p className="hero-desc">
          CodePulse agrège <strong>GitHub, Dev.to, et Hacker News</strong> pour
          te donner une veille tech centralisée — JS, React, IA, Node.js —
          tout au même endroit.
        </p>
        <div className="hero-buttons">
          <Link to="/dashboard">
            <button className="btn-primary">Explorer la veille</button>
          </Link>
          <Link to="/sources">
            <button className="btn-secondary">Voir les sources</button>
          </Link>
        </div>
      </div>
      <div className="hero-right">
        <HeroIllustration />
      </div>
    </section>
  )
}
 
export default Hero