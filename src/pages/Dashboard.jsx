// Dashboard.jsx
// La page principale de l'app après la landing.
// Elle affiche tous les articles en temps réel
// avec filtres par source et par tag.

import { useState } from 'react'
import { useArticles } from '../hooks/useArticles'
import { useFavorites } from '../context/FavoritesContext'
import '../styles/Dashboard.css'

const SOURCES = [
  { key: 'all',         label: 'Tout' },
  { key: 'github',      label: 'GitHub' },
  { key: 'devto',       label: 'Dev.to' },
  { key: 'hackernews',  label: 'Hacker News' },
]

const TAGS = [
  'javascript', 'react', 'node', 'webdev', 'ai'
]

// Icône source
function SourceIcon({ source }) {
  const icons = {
    github:      { label: 'GH', color: '#60a5fa' },
    devto:       { label: '{}', color: '#22d3ee' },
    hackernews:  { label: 'HN', color: '#34d399' },
  }
  const icon = icons[source] || { label: '?', color: '#888' }
  return (
    <div className="dash-card-icon" style={{ background: `${icon.color}18`, color: icon.color }}>
      {icon.label}
    </div>
  )
}

// Carte article du dashboard
function ArticleCard({ article }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const fav = isFavorite(article.id)

  function toggleFav(e) {
    e.stopPropagation()
    fav ? removeFavorite(article.id) : addFavorite(article)
  }

  return (
    <div
      className="dash-card"
      style={{ borderColor: article.border, background: article.accent }}
      onClick={() => window.open(article.url, '_blank')}
    >
      <div className="dash-card-top">
        <div className="dash-card-source">
          <SourceIcon source={article.source} />
          <span style={{ color: article.color }}>{article.sourceLabel}</span>
        </div>
        {/* Bouton favori */}
        <button
          className={`fav-btn ${fav ? 'fav-active' : ''}`}
          onClick={toggleFav}
          title={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24"
            fill={fav ? 'currentColor' : 'none'}
            stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
          </svg>
        </button>
      </div>

      <h3 className="dash-card-title">{article.title}</h3>
      <p className="dash-card-desc">{article.desc}</p>

      <div className="dash-card-footer">
        <span className="dash-card-meta">{article.meta}</span>
        {article.tags?.[0] && (
          <span className="dash-card-tag" style={{
            color: article.color,
            background: article.accent,
            borderColor: article.border,
          }}>
            {article.tags[0]}
          </span>
        )}
      </div>
    </div>
  )
}

// Skeleton loading — s'affiche pendant le chargement
function SkeletonCard() {
  return (
    <div className="dash-card skeleton">
      <div className="skel-line skel-short"></div>
      <div className="skel-line skel-long"></div>
      <div className="skel-line skel-medium"></div>
      <div className="skel-line skel-short"></div>
    </div>
  )
}

function Dashboard() {
  const [activeSource, setActiveSource] = useState('all')
  const [activeTag,    setActiveTag]    = useState('javascript')
  const { articles, loading } = useArticles(activeSource, activeTag)

  return (
    <div className="dashboard">

      {/* ── EN-TÊTE ── */}
      <div className="dash-header">
        <div>
          <h1 className="dash-title">
            Flux <span className="dash-title-accent">en direct</span>
          </h1>
          <p className="dash-subtitle">
            {articles.length} articles agrégés depuis tes sources
          </p>
        </div>

        {/* Indicateur live */}
        <div className="live-badge">
          <span className="live-dot"></span>
          Live
        </div>
      </div>

      {/* ── FILTRES SOURCES ── */}
      <div className="dash-filters">
        <div className="filter-group">
          {SOURCES.map(s => (
            <button
              key={s.key}
              className={`filter-btn ${activeSource === s.key ? 'filter-active' : ''}`}
              onClick={() => setActiveSource(s.key)}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Filtres tags */}
        <div className="filter-group">
          {TAGS.map(tag => (
            <button
              key={tag}
              className={`tag-btn ${activeTag === tag ? 'tag-active' : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* ── GRILLE D'ARTICLES ── */}
      <div className="dash-grid">
        {loading
          ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))
        }
      </div>

    </div>
  )
}

export default Dashboard