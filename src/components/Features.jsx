// Features.jsx
// 3 cartes glassmorphisme qui expliquent
// les fonctionnalités principales de CodePulse.
// Chaque carte a une illustration SVG unique
// dessinée à la main.

// Les données des 3 features —
// on les sépare du JSX pour garder le code propre.
// C'est une bonne habitude pro : données d'un côté,
// affichage de l'autre.
const FEATURES = [
  {
    id: 1,
    tag: 'API REST',
    tagColor: '#ff6ec7',
    tagBg: 'rgba(255,110,199,0.1)',
    tagBorder: 'rgba(255,110,199,0.2)',
    title: 'Agrégation multi-sources',
    desc: ' Dev.to, Hacker News, NPM — toutes tes sources préférées centralisées en un seul flux intelligent et mis à jour en temps réel.',
    borderHover: 'rgba(255,110,199,0.35)',
    glowColor: 'rgba(255,110,199,0.07)',
  },
  {
    id: 2,
    tag: 'localStorage',
    tagColor: '#c084fc',
    tagBg: 'rgba(192,132,252,0.1)',
    tagBorder: 'rgba(192,132,252,0.2)',
    title: 'Système de favoris',
    desc: 'Sauvegarde les articles, dépôts et ressources qui t\'intéressent. Retrouve-les instantanément, organisés par tags et catégories.',
    borderHover: 'rgba(192,132,252,0.35)',
    glowColor: 'rgba(192,132,252,0.07)',
  },
  {
    id: 3,
    tag: 'UX moderne',
    tagColor: '#818cf8',
    tagBg: 'rgba(129,140,248,0.1)',
    tagBorder: 'rgba(129,140,248,0.2)',
    title: 'Filtres intelligents',
    desc: 'React, IA, Node.js, Rust... filtre par technologie, popularité ou date. Ta veille personnalisée, sans bruit, sans distraction.',
    borderHover: 'rgba(129,140,248,0.35)',
    glowColor: 'rgba(129,140,248,0.07)',
  },
]

// ── ILLUSTRATION 1 : Hub connecté ──
function IlluHub() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="28"
        fill="rgba(255,110,199,0.06)"
        stroke="rgba(255,110,199,0.15)" strokeWidth="1"/>
      <circle cx="12" cy="20" r="6"
        fill="rgba(255,110,199,0.18)"
        stroke="rgba(255,110,199,0.4)" strokeWidth="1"/>
      <circle cx="12" cy="44" r="6"
        fill="rgba(255,110,199,0.12)"
        stroke="rgba(255,110,199,0.3)" strokeWidth="1"/>
      <circle cx="52" cy="20" r="6"
        fill="rgba(200,132,252,0.18)"
        stroke="rgba(200,132,252,0.4)" strokeWidth="1"/>
      <circle cx="52" cy="44" r="6"
        fill="rgba(200,132,252,0.12)"
        stroke="rgba(200,132,252,0.3)" strokeWidth="1"/>
      <circle cx="32" cy="32" r="9"
        fill="rgba(255,110,199,0.22)"
        stroke="rgba(255,110,199,0.6)" strokeWidth="1.2"/>
      <line x1="18" y1="20" x2="23" y2="27"
        stroke="rgba(255,110,199,0.35)" strokeWidth="1"
        strokeDasharray="3 2"/>
      <line x1="18" y1="44" x2="23" y2="37"
        stroke="rgba(255,110,199,0.35)" strokeWidth="1"
        strokeDasharray="3 2"/>
      <line x1="46" y1="20" x2="41" y2="27"
        stroke="rgba(200,132,252,0.35)" strokeWidth="1"
        strokeDasharray="3 2"/>
      <line x1="46" y1="44" x2="41" y2="37"
        stroke="rgba(200,132,252,0.35)" strokeWidth="1"
        strokeDasharray="3 2"/>
      <circle cx="32" cy="32" r="3.5" fill="#ff6ec7" opacity="0.9"/>
    </svg>
  )
}

// ── ILLUSTRATION 2 : Bookmark ──
function IlluBookmark() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <rect x="16" y="10" width="32" height="42" rx="6"
        fill="rgba(168,85,247,0.08)"
        stroke="rgba(168,85,247,0.25)" strokeWidth="1"/>
      <rect x="22" y="20" width="20" height="2.5" rx="1.2"
        fill="rgba(200,132,252,0.45)"/>
      <rect x="22" y="27" width="14" height="2.5" rx="1.2"
        fill="rgba(200,132,252,0.28)"/>
      <rect x="22" y="34" width="17" height="2.5" rx="1.2"
        fill="rgba(200,132,252,0.28)"/>
      <path d="M22 52 L32 43 L42 52"
        fill="rgba(200,132,252,0.3)"
        stroke="rgba(200,132,252,0.6)" strokeWidth="1.2"
        strokeLinejoin="round"/>
      <circle cx="44" cy="20" r="10"
        fill="rgba(168,85,247,0.18)"
        stroke="rgba(168,85,247,0.4)" strokeWidth="1"/>
      <path d="M40 20 L43 23 L49 17"
        fill="none" stroke="#c084fc"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ── ILLUSTRATION 3 : Filtre ──
function IlluFilter() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <rect x="10" y="14" width="44" height="9" rx="4.5"
        fill="rgba(99,102,241,0.12)"
        stroke="rgba(99,102,241,0.3)" strokeWidth="1"/>
      <rect x="18" y="29" width="28" height="9" rx="4.5"
        fill="rgba(129,140,248,0.12)"
        stroke="rgba(129,140,248,0.3)" strokeWidth="1"/>
      <rect x="24" y="44" width="16" height="9" rx="4.5"
        fill="rgba(165,180,252,0.12)"
        stroke="rgba(165,180,252,0.3)" strokeWidth="1"/>
      <circle cx="32" cy="18.5" r="3.5"
        fill="rgba(99,102,241,0.5)"
        stroke="rgba(99,102,241,0.8)" strokeWidth="0.8"/>
      <circle cx="32" cy="33.5" r="3"
        fill="rgba(129,140,248,0.5)"
        stroke="rgba(129,140,248,0.8)" strokeWidth="0.8"/>
      <circle cx="32" cy="48.5" r="2.5"
        fill="rgba(165,180,252,0.5)"
        stroke="rgba(165,180,252,0.8)" strokeWidth="0.8"/>
    </svg>
  )
}

const ILLUSTRATIONS = [IlluHub, IlluBookmark, IlluFilter]

// ── CARTE FEATURE ──
function FeatureCard({ feature }) {
  const {
    tag, tagColor, tagBg, tagBorder,
    title, desc,
    borderHover, glowColor,
    id,
  } = feature

  const Illu = ILLUSTRATIONS[id - 1]

  return (
    <div
      className="feat-card"
      style={{
        '--hover-border': borderHover,
        '--glow': glowColor,
      }}
    >
      {/* Illustration SVG */}
      <div className="feat-illu">
        <Illu />
      </div>

      {/* Nom */}
      <h3 className="feat-name">{title}</h3>

      {/* Description */}
      <p className="feat-desc">{desc}</p>

      {/* Tag technologie */}
      <span
        className="feat-tag"
        style={{ color: tagColor, background: tagBg, borderColor: tagBorder }}
      >
        {tag}
      </span>
    </div>
  )
}

// ── COMPOSANT PRINCIPAL ──
function Features() {
  return (
    <section className="features">

      {/* En-tête de section */}
      <div className="features-header">
        <p className="section-eyebrow">Fonctionnalités</p>
        <h2 className="section-title">
          Tout ce dont tu as besoin<br />
          <span className="title-gradient">pour ne rien manquer.</span>
        </h2>
        <p className="section-sub">
          CodePulse rassemble les meilleures sources dev du web
          et te laisse construire ta propre veille, à ton rythme.
        </p>
      </div>

      {/* Grille de 3 cartes */}
      <div className="feat-grid">
        {FEATURES.map(feature => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>

    </section>
  )
}

export default Features