// NewsSection.jsx
// Cette section affiche les cartes d'actualités
// en scroll horizontal style Netflix.
//
// "useState" c'est un Hook React — il permet
// de stocker une valeur qui peut changer.
// Quand elle change, React re-affiche le composant.
// Exemple : quand tu cliques sur "Dev.to",
// le filtre actif change => les cartes changent.

import { useState } from 'react'

// ── LES DONNÉES SIMULÉES ──
// C'est un tableau de "faux articles".
// Chaque article est un objet JavaScript { clé: valeur }.
// Plus tard, ces données viendront des vraies APIs.
const MOCK_ARTICLES = [
  {
    id: 1,
    source: 'github',
    sourceLabel: 'GitHub',
    category: 'React',
    title: 'shadcn/ui — Beautifully designed components',
    desc: 'Composants React accessibles et personnalisables. Copy-paste dans ton projet.',
    meta: '45.2k stars · Mis à jour il y a 2h',
    color: '#ff6ec7',
    accent: 'rgba(255,110,199,0.12)',
    border: 'rgba(255,110,199,0.2)',
  },
  {
    id: 2,
    source: 'devto',
    sourceLabel: 'Dev.to',
    category: 'JavaScript',
    title: 'Maîtriser async/await — Le guide complet 2025',
    desc: 'Tout ce que tu dois savoir sur la programmation asynchrone en JS moderne.',
    meta: '1.2k réactions · il y a 5h',
    color: '#818cf8',
    accent: 'rgba(129,140,248,0.12)',
    border: 'rgba(129,140,248,0.2)',
  },
  {
    id: 3,
    source: 'hackernews',
    sourceLabel: 'Hacker News',
    category: 'Tech',
    title: 'OpenAI lance GPT-4o fine-tuning pour tous',
    desc: 'Le fine-tuning de GPT-4o est maintenant disponible pour tous les développeurs.',
    meta: '528 points · il y a 1h',
    color: '#c084fc',
    accent: 'rgba(192,132,252,0.12)',
    border: 'rgba(192,132,252,0.2)',
  },
  {
    id: 4,
    source: 'ia',
    sourceLabel: 'IA',
    category: 'Intelligence Artificielle',
    title: 'Anthropic Claude 3.5 — Nouveaux benchmarks',
    desc: 'Claude 3.5 dépasse GPT-4 sur plusieurs benchmarks de code et raisonnement.',
    meta: 'Trending · il y a 3h',
    color: '#34d399',
    accent: 'rgba(52,211,153,0.1)',
    border: 'rgba(52,211,153,0.18)',
  },
  {
    id: 5,
    source: 'github',
    sourceLabel: 'GitHub',
    category: 'Node.js',
    title: 'Hono — Ultra-fast web framework for the Edge',
    desc: 'Framework web ultra-rapide qui tourne partout : Cloudflare, Deno, Bun, Node.',
    meta: '18.4k stars · Mis à jour il y a 6h',
    color: '#ff6ec7',
    accent: 'rgba(255,110,199,0.12)',
    border: 'rgba(255,110,199,0.2)',
  },
  {
    id: 6,
    source: 'devto',
    sourceLabel: 'Dev.to',
    category: 'React',
    title: 'React 19 — Ce qui change vraiment',
    desc: 'Actions, use(), amélioration des Server Components... le tour complet de React 19.',
    meta: '876 réactions · il y a 8h',
    color: '#818cf8',
    accent: 'rgba(129,140,248,0.12)',
    border: 'rgba(129,140,248,0.2)',
  },
  {
    id: 7,
    source: 'hackernews',
    sourceLabel: 'Hacker News',
    category: 'Tech',
    title: 'Bun 1.2 — Le runtime JS qui défie Node',
    desc: 'Bun annonce des performances 3x supérieures à Node.js sur les benchmarks HTTP.',
    meta: '742 points · il y a 4h',
    color: '#c084fc',
    accent: 'rgba(192,132,252,0.12)',
    border: 'rgba(192,132,252,0.2)',
  },
  {
    id: 8,
    source: 'ia',
    sourceLabel: 'IA',
    category: 'Intelligence Artificielle',
    title: 'Mistral Large 2 — Open source et puissant',
    desc: 'Mistral publie son nouveau modèle en open source, rival direct de GPT-4.',
    meta: 'Trending · il y a 6h',
    color: '#34d399',
    accent: 'rgba(52,211,153,0.1)',
    border: 'rgba(52,211,153,0.18)',
  },
]

// ── LES FILTRES ──
// "all" = tout afficher
// les autres = filtrer par source
const FILTERS = [
  { key: 'all',         label: 'Tout' },
  { key: 'github',      label: 'GitHub' },
  { key: 'devto',       label: 'Dev.to' },
  { key: 'hackernews',  label: 'Hacker News' },
  { key: 'ia',          label: 'IA' },
]

// ── ICÔNES SVG PAR SOURCE ──
// Une fonction qui retourne l'icône SVG
// correspondant à la source de l'article.
function SourceIcon({ source, color }) {
  const style = { width: 18, height: 18 }

  if (source === 'github') return (
    <svg viewBox="0 0 24 24" style={style} fill={color}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )

  if (source === 'devto') return (
    <svg viewBox="0 0 24 24" style={style} fill={color}>
      <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.28zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z"/>
    </svg>
  )

  if (source === 'hackernews') return (
    <svg viewBox="0 0 24 24" style={style} fill={color}>
      <path d="M0 24V0h24v24H0zM6.951 5.896l4.112 7.708v5.064h1.583v-4.972l4.148-7.799h-1.749l-2.457 4.875c-.372.745-.688 1.434-.688 1.434s-.297-.708-.651-1.434L8.831 5.896h-1.88z"/>
    </svg>
  )

  if (source === 'ia') return (
    <svg viewBox="0 0 24 24" style={style} fill={color}>
      <path d="M12 2a10 10 0 110 20A10 10 0 0112 2zm0 2a8 8 0 100 16A8 8 0 0012 4zm0 2c.55 0 1 .45 1 1v1.07A4.002 4.002 0 0115.93 11H17c.55 0 1 .45 1 1s-.45 1-1 1h-1.07A4.002 4.002 0 0113 16.93V18c0 .55-.45 1-1 1s-1-.45-1-1v-1.07A4.002 4.002 0 018.07 13H7c-.55 0-1-.45-1-1s.45-1 1-1h1.07A4.002 4.002 0 0111 7.07V6c0-.55.45-1 1-1zm0 5a2 2 0 100 4 2 2 0 000-4z"/>
    </svg>
  )

  return null
}

// ── COMPOSANT CARTE ──
// Reçoit un article en "prop" et l'affiche.
// Une prop c'est comme un argument de fonction —
// on passe des données de NewsSection vers NewsCard.
function NewsCard({ article }) {
  const { source, sourceLabel, category, title, desc, meta, color, accent, border } = article

  return (
    <div
      className="news-card"
      style={{ background: accent, borderColor: border }}
      onClick={() => alert(`Tu cliques sur : "${title}"\nBientôt ça ouvrira le vrai lien !`)}
    >
      {/* En-tête de la carte */}
      <div className="news-card-header">
        <div className="news-card-source" style={{ color }}>
          <SourceIcon source={source} color={color} />
          {sourceLabel}
        </div>
        <span className="news-card-category" style={{
          background: `${color}18`,
          border: `1px solid ${color}30`,
          color,
        }}>
          {category}
        </span>
      </div>

      {/* Contenu */}
      <h3 className="news-card-title">{title}</h3>
      <p className="news-card-desc">{desc}</p>

      {/* Pied de carte */}
      <div className="news-card-meta">{meta}</div>
    </div>
  )
}

// ── COMPOSANT PRINCIPAL ──
function NewsSection() {
  // useState retourne [valeurActuelle, fonctionPourLaChanger]
  // "activeFilter" = le filtre actif ("all", "github", etc.)
  // "setActiveFilter" = la fonction pour changer ce filtre
  const [activeFilter, setActiveFilter] = useState('all')

  // On filtre les articles selon le filtre actif.
  // Si "all" => on garde tout.
  // Sinon => on garde seulement ceux qui matchent la source.
  const filtered = activeFilter === 'all'
    ? MOCK_ARTICLES
    : MOCK_ARTICLES.filter(a => a.source === activeFilter)

  return (
    <section className="news-section">

      {/* ── EN-TÊTE ── */}
      <div className="news-header">
        <div>
          <p className="section-eyebrow">Actu en direct</p>
          <h2 className="section-title">Ce qui pulse <span className="title-gradient">maintenant</span></h2>
        </div>

        {/* ── FILTRES ── */}
        <div className="news-filters">
          {FILTERS.map(filter => (
            <button
              key={filter.key}
              className={`filter-btn ${activeFilter === filter.key ? 'filter-active' : ''}`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── SCROLL HORIZONTAL ── */}
      <div className="news-scroll-wrapper">
        <div className="news-scroll-track">
          {filtered.map(article => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </div>

    </section>
  )
}

export default NewsSection