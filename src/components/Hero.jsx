// Hero.jsx
// La section principale de la landing page.
// "props" c'est comme des paramètres qu'on
// pourrait passer au composant depuis App.jsx
// On en verra plus tard — pour l'instant
// tout est écrit directement ici.// En haut du fichier
import { Link } from 'react-router-dom'


function Hero() {
  return (
    <section className="hero">

      {/* ── COLONNE GAUCHE : texte ── */}
      <div className="hero-left">

        {/* Badge en haut */}
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          Veille technologique
        </div>

        {/* Titre principal */}
        <h1 className="hero-title">
          <span className="hero-title-line line-pink">Pulse sur</span>
          <span className="hero-title-line line-blue">l'actu dev</span>
          <span className="hero-title-line line-white">en temps réel.</span>
        </h1>

        {/* Description */}
        <p className="hero-desc">
          CodePulse agrège <strong>GitHub, Dev.to, et d'autres sources</strong> pour
          te donner une veille tech centralisée — JS, React, IA, Node.js —
          tout au même endroit.
        </p>

        {/* Pills des APIs */}
        <div className="hero-pills">
          <span className="pill">GitHub API</span>
          <span className="pill">Dev.to API</span>
          <span className="pill">Hacker News</span>
          <span className="pill">NPM Trends</span>
          <span className="pill">+ d'autres</span>
        </div>

        {/* Boutons */}
        <div className="hero-buttons">
      <Link to="/sources">
     <button className="btn-primary">Explorer les sources</button>
     </Link>
     </div>

      {/* ── COLONNE DROITE : illustration ── */}
      <div className="hero-right">
        <HeroIllustration />
      </div>

    </section>
  )
}

// ── ILLUSTRATION ──
// C'est un sous-composant — une pièce Lego
// à l'intérieur d'une autre pièce Lego.
// Il dessine le faux dashboard en SVG.
function HeroIllustration() {
  return (
    <svg
      width="100%"
      viewBox="0 0 440 420"
      xmlns="http://www.w3.org/2000/svg"
      className="hero-svg"
    >
      {/* Définitions : dégradés réutilisables */}
      <defs>
        <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,110,199,0.18)"/>
          <stop offset="100%" stopColor="rgba(168,85,247,0.08)"/>
        </linearGradient>
        <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(99,102,241,0.18)"/>
          <stop offset="100%" stopColor="rgba(168,85,247,0.06)"/>
        </linearGradient>
        <linearGradient id="grad3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(200,132,252,0.15)"/>
          <stop offset="100%" stopColor="rgba(99,102,241,0.06)"/>
        </linearGradient>
      </defs>

      {/* Carte principale */}
      <rect x="10" y="10" width="420" height="400" rx="24"
        fill="rgba(255,255,255,0.025)"
        stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>

      {/* Barre du haut */}
      <rect x="10" y="10" width="420" height="48" rx="24"
        fill="rgba(255,255,255,0.03)"/>
      <rect x="10" y="34" width="420" height="24"
        fill="rgba(255,255,255,0.03)"/>

      {/* 3 ronds colorés (style fenêtre Mac) */}
      <circle cx="44" cy="34" r="7"
        fill="rgba(255,110,199,0.35)" stroke="rgba(255,110,199,0.5)" strokeWidth="0.8"/>
      <circle cx="66" cy="34" r="7"
        fill="rgba(168,85,247,0.3)" stroke="rgba(168,85,247,0.5)" strokeWidth="0.8"/>
      <circle cx="88" cy="34" r="7"
        fill="rgba(99,102,241,0.3)" stroke="rgba(99,102,241,0.5)" strokeWidth="0.8"/>

      {/* Titre dans la barre */}
      <text x="220" y="39" textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="12" fontWeight="700"
        fill="rgba(243,232,255,0.6)" letterSpacing="2">
        CODEPULSE
      </text>

      {/* ── CARTES STATS ── */}

      {/* Stat 1 — Articles */}
      <rect x="28" y="74" width="118" height="76" rx="14"
        fill="url(#grad1)" stroke="rgba(255,110,199,0.2)" strokeWidth="0.8"/>
      <text x="42" y="98"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="10" fill="rgba(255,150,220,0.7)" letterSpacing="1">
        ARTICLES
      </text>
      <text x="42" y="122"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="26" fontWeight="700"
        fill="rgba(255,190,235,0.95)" letterSpacing="-1">
        248
      </text>
      <polyline points="100,130 108,122 116,126 124,118 132,120 140,112"
        fill="none" stroke="rgba(255,110,199,0.5)"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Stat 2 — Repos */}
      <rect x="158" y="74" width="118" height="76" rx="14"
        fill="url(#grad2)" stroke="rgba(99,102,241,0.2)" strokeWidth="0.8"/>
      <text x="172" y="98"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="10" fill="rgba(165,180,252,0.7)" letterSpacing="1">
        REPOS
      </text>
      <text x="172" y="122"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="26" fontWeight="700"
        fill="rgba(200,210,255,0.95)" letterSpacing="-1">
        1.2k
      </text>
      <polyline points="230,130 238,118 246,125 254,112 262,120 270,108"
        fill="none" stroke="rgba(129,140,248,0.5)"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Stat 3 — Sources */}
      <rect x="288" y="74" width="118" height="76" rx="14"
        fill="url(#grad3)" stroke="rgba(168,85,247,0.2)" strokeWidth="0.8"/>
      <text x="302" y="98"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="10" fill="rgba(216,180,254,0.7)" letterSpacing="1">
        SOURCES
      </text>
      <text x="302" y="122"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="26" fontWeight="700"
        fill="rgba(230,210,255,0.95)" letterSpacing="-1">
        12
      </text>

      {/* ── FLUX D'ARTICLES ── */}
      <text x="28" y="174"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="11" fontWeight="700"
        fill="rgba(200,132,252,0.7)" letterSpacing="1.5">
        FLUX EN DIRECT
      </text>

      {/* Indicateur Live */}
      <circle cx="415" cy="170" r="4" fill="#ff6ec7">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite"/>
        <animate attributeName="r" values="4;6;4" dur="1.8s" repeatCount="indefinite"/>
      </circle>
      <text x="406" y="174" textAnchor="end"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="9" fill="rgba(255,160,220,0.6)">
        Live
      </text>

      <line x1="28" y1="180" x2="412" y2="180"
        stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>

      {/* Article 1 */}
      <rect x="28" y="190" width="378" height="50" rx="10"
        fill="rgba(255,110,199,0.06)" stroke="rgba(255,110,199,0.12)" strokeWidth="0.8"/>
      <circle cx="50" cy="215" r="10"
        fill="rgba(255,110,199,0.15)" stroke="rgba(255,110,199,0.3)" strokeWidth="0.8"/>
      <text x="50" y="220" textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="9" fontWeight="700" fill="rgba(255,170,220,0.9)">
        GH
      </text>
      <text x="68" y="211"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="11" fontWeight="500" fill="rgba(243,232,255,0.85)">
        react-query v5 — Breaking changes
      </text>
      <text x="68" y="226"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="10" fill="rgba(210,185,255,0.45)">
        GitHub · il y a 2h · 4.2k stars
      </text>
      <rect x="352" y="207" width="46" height="16" rx="8"
        fill="rgba(255,110,199,0.12)" stroke="rgba(255,110,199,0.2)" strokeWidth="0.6"/>
      <text x="375" y="219" textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="9" fontWeight="700" fill="rgba(255,160,220,0.8)">
        React
      </text>

      {/* Article 2 */}
      <rect x="28" y="250" width="378" height="50" rx="10"
        fill="rgba(99,102,241,0.06)" stroke="rgba(99,102,241,0.12)" strokeWidth="0.8"/>
      <circle cx="50" cy="275" r="10"
        fill="rgba(99,102,241,0.15)" stroke="rgba(99,102,241,0.3)" strokeWidth="0.8"/>
      <text x="50" y="280" textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="9" fontWeight="700" fill="rgba(165,180,252,0.9)">
        {"{}"}
      </text>
      <text x="68" y="271"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="11" fontWeight="500" fill="rgba(243,232,255,0.85)">
        Maîtriser async/await en JavaScript
      </text>
      <text x="68" y="286"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="10" fill="rgba(210,185,255,0.45)">
        Dev.to · il y a 5h · 347 réactions
      </text>
      <rect x="352" y="267" width="46" height="16" rx="8"
        fill="rgba(99,102,241,0.12)" stroke="rgba(99,102,241,0.2)" strokeWidth="0.6"/>
      <text x="375" y="279" textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="9" fontWeight="700" fill="rgba(165,180,252,0.8)">
        JS
      </text>

      {/* Article 3 */}
      <rect x="28" y="310" width="378" height="50" rx="10"
        fill="rgba(168,85,247,0.06)" stroke="rgba(168,85,247,0.12)" strokeWidth="0.8"/>
      <circle cx="50" cy="335" r="10"
        fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.3)" strokeWidth="0.8"/>
      <text x="50" y="340" textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="9" fontWeight="700" fill="rgba(216,180,254,0.9)">
        HN
      </text>
      <text x="68" y="331"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="11" fontWeight="500" fill="rgba(243,232,255,0.85)">
        GPT-4o fine-tuning now available for all
      </text>
      <text x="68" y="346"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="10" fill="rgba(210,185,255,0.45)">
        Hacker News · il y a 1h · 528 points
      </text>
      <rect x="352" y="323" width="46" height="16" rx="8"
        fill="rgba(168,85,247,0.12)" stroke="rgba(168,85,247,0.2)" strokeWidth="0.6"/>
      <text x="375" y="335" textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="9" fontWeight="700" fill="rgba(200,150,255,0.8)">
        IA
      </text>

    </svg>
  )
}

export default Hero