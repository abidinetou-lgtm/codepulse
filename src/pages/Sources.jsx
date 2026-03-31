// Sources.jsx
// Affiche toutes les sources disponibles
// avec leur statut et des infos sur chaque API.

import { useState } from 'react'
import '../styles/Sources.css'

const SOURCES_DATA = [
  {
    id: 'github',
    name: 'GitHub',
    desc: 'Repos tendance, nouveaux projets open source, releases importantes.',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.08)',
    border: 'rgba(96,165,250,0.2)',
    status: 'active',
    articles: '500+ repos/jour',
    endpoint: '/api/github/trending',
    tags: ['trending', 'open-source', 'code'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="#60a5fa">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    id: 'devto',
    name: 'Dev.to',
    desc: 'Articles, tutoriels et discussions de la communauté dev mondiale.',
    color: '#22d3ee',
    bg: 'rgba(6,182,212,0.08)',
    border: 'rgba(6,182,212,0.2)',
    status: 'active',
    articles: '1000+ articles/jour',
    endpoint: '/api/devto/articles',
    tags: ['articles', 'tutorials', 'community'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="#22d3ee">
        <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.28zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z"/>
      </svg>
    ),
  },
  {
    id: 'hackernews',
    name: 'Hacker News',
    desc: 'Les meilleures discussions tech, startups et science du moment.',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.08)',
    border: 'rgba(52,211,153,0.2)',
    status: 'active',
    articles: '500+ stories/jour',
    endpoint: '/api/hackernews/top',
    tags: ['news', 'startups', 'tech'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="#34d399">
        <path d="M0 24V0h24v24H0zM6.951 5.896l4.112 7.708v5.064h1.583v-4.972l4.148-7.799h-1.749l-2.457 4.875c-.372.745-.688 1.434-.688 1.434s-.297-.708-.651-1.434L8.831 5.896h-1.88z"/>
      </svg>
    ),
  },
  {
    id: 'npm',
    name: 'NPM Trends',
    desc: 'Tendances des packages npm, nouvelles releases et statistiques.',
    color: '#f87171',
    bg: 'rgba(248,113,113,0.06)',
    border: 'rgba(248,113,113,0.15)',
    status: 'coming',
    articles: 'Bientôt disponible',
    endpoint: '/api/npm/trends',
    tags: ['packages', 'releases', 'stats'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <rect x="0" y="6" width="24" height="12" rx="1" fill="#cc3534"/>
        <rect x="7" y="9" width="3" height="6" fill="white"/>
        <rect x="17" y="9" width="1" height="6" fill="white"/>
      </svg>
    ),
  },
  {
    id: 'producthunt',
    name: 'Product Hunt',
    desc: 'Les meilleurs nouveaux produits tech lancés chaque jour.',
    color: '#fb923c',
    bg: 'rgba(251,146,60,0.06)',
    border: 'rgba(251,146,60,0.15)',
    status: 'coming',
    articles: 'Bientôt disponible',
    endpoint: '/api/producthunt/daily',
    tags: ['products', 'startups', 'launches'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="#fb923c">
        <path d="M13.604 8.4h-3.405V12h3.405c.995 0 1.801-.806 1.801-1.8 0-.995-.806-1.8-1.801-1.8zM12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.628-5.372-12-12-12zm1.604 14.4h-3.405V18H7.8V6h5.804c2.319 0 4.2 1.88 4.2 4.2 0 2.319-1.881 4.2-4.2 4.2z"/>
      </svg>
    ),
  },
  {
    id: 'twitter',
    name: 'X / Twitter Tech',
    desc: 'Threads et discussions tech des développeurs influents.',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.06)',
    border: 'rgba(167,139,250,0.15)',
    status: 'coming',
    articles: 'Bientôt disponible',
    endpoint: '/api/twitter/tech',
    tags: ['social', 'threads', 'devs'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="#a78bfa">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
]

function SourceCard({ source }) {
  const isActive = source.status === 'active'

  return (
    <div
      className={`source-card ${!isActive ? 'source-coming' : ''}`}
      style={{ borderColor: source.border, background: source.bg }}
    >
      {/* En-tête */}
      <div className="source-card-top">
        <div className="source-card-icon" style={{ background: `${source.color}15` }}>
          {source.icon}
        </div>
        <span className={`source-status ${isActive ? 'status-active' : 'status-coming'}`}>
          {isActive ? '● Actif' : '◌ Bientôt'}
        </span>
      </div>

      {/* Nom + description */}
      <h3 className="source-name" style={{ color: source.color }}>{source.name}</h3>
      <p className="source-desc">{source.desc}</p>

      {/* Stats */}
      <div className="source-stats">
        <span className="source-articles">{source.articles}</span>
      </div>

      {/* Tags */}
      <div className="source-tags">
        {source.tags.map(tag => (
          <span key={tag} className="source-tag"
            style={{ color: source.color, borderColor: `${source.color}25`, background: `${source.color}08` }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Endpoint API */}
      <div className="source-endpoint">
        <span className="endpoint-label">Endpoint</span>
        <code className="endpoint-code">{source.endpoint}</code>
      </div>
    </div>
  )
}

function Sources() {
  const [filter, setFilter] = useState('all')
  const active  = SOURCES_DATA.filter(s => s.status === 'active')
  const coming  = SOURCES_DATA.filter(s => s.status === 'coming')
  const display = filter === 'active' ? active : filter === 'coming' ? coming : SOURCES_DATA

  return (
    <div className="sources-page">

      {/* ── EN-TÊTE ── */}
      <div className="sources-header">
        <div>
          <h1 className="sources-title">
            Mes <span className="sources-title-accent">sources</span>
          </h1>
          <p className="sources-subtitle">
            {active.length} sources actives · {coming.length} en préparation
          </p>
        </div>

        <div className="sources-filter-group">
          {[
            { key: 'all',    label: 'Toutes' },
            { key: 'active', label: 'Actives' },
            { key: 'coming', label: 'Bientôt' },
          ].map(f => (
            <button
              key={f.key}
              className={`filter-btn ${filter === f.key ? 'filter-active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── GRILLE ── */}
      <div className="sources-grid">
        {display.map(source => (
          <SourceCard key={source.id} source={source} />
        ))}
      </div>

    </div>
  )
}

export default Sources