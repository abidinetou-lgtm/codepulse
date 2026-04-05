import { useState } from 'react'
import { useArticles } from '../hooks/useArticles'
import { useFavorites } from '../context/FavoritesContext'
import ArticleDrawer from '../components/ArticleDrawer'
import '../styles/Dashboard.css'

const SOURCES = [
  { key: 'all',        label: 'Tout' },
  { key: 'github',     label: 'GitHub' },
  { key: 'devto',      label: 'Dev.to' },
  { key: 'hackernews', label: 'Hacker News' },
]

const TAGS = ['javascript', 'react', 'node', 'webdev', 'ai']

function SourceIcon({ source }) {
  const icons = {
    github:     { label: 'GH', color: '#34d399' },
    devto:      { label: '{}', color: '#22d3ee' },
    hackernews: { label: 'HN', color: '#60a5fa' },
  }
  const icon = icons[source] || { label: '?', color: '#888' }
  return (
    <div className="dash-card-icon"
      style={{ background: `${icon.color}15`, color: icon.color }}>
      {icon.label}
    </div>
  )
}

function ArticleCard({ article, onRead }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const fav = isFavorite(article.id)

  function toggleFav(e) {
    e.stopPropagation()
    fav ? removeFavorite(article.id) : addFavorite(article)
  }

  return (
    <div
      className="dash-card"
      onClick={() => onRead(article)}
    >
      {article.cover && (
        <div className="dash-card-cover">
          <img
            src={article.cover}
            alt={article.title}
            onError={e => { e.target.parentElement.style.display = 'none' }}
          />
        </div>
      )}

      <div className="dash-card-body">
        <div className="dash-card-top">
          <div className="dash-card-source">
            <SourceIcon source={article.source} />
            <span style={{ color: article.color }}>{article.sourceLabel}</span>
          </div>
          <button
            className={`fav-btn ${fav ? 'fav-active' : ''}`}
            onClick={toggleFav}
          >
            <svg width="14" height="14" viewBox="0 0 24 24"
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
              background: `${article.color}12`,
              borderColor: `${article.color}25`,
            }}>
              {article.tags[0]}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="dash-card skeleton">
      <div style={{
        width: '100%', height: 180,
        background: 'var(--bg-3)',
      }}/>
      <div className="dash-card-body" style={{ gap: 12 }}>
        <div className="skel-line skel-short"/>
        <div className="skel-line skel-long"/>
        <div className="skel-line skel-medium"/>
        <div className="skel-line skel-short"/>
      </div>
    </div>
  )
}

function Dashboard() {
  const [activeSource, setActiveSource] = useState('all')
  const [activeTag,    setActiveTag]    = useState('javascript')
  const [openArticle,  setOpenArticle]  = useState(null)
  const { articles, loading } = useArticles(activeSource, activeTag)

  return (
    <>
      <div className="dashboard">
        <div className="dash-header">
          <div>
            <h1 className="dash-title">
              Flux <span className="dash-title-accent">en direct</span>
            </h1>
            <p className="dash-subtitle">
              {loading ? 'Chargement...' : `${articles.length} articles depuis tes sources`}
            </p>
          </div>
          <div className="live-badge">
            <span className="live-dot"/>
            Live
          </div>
        </div>

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

        <div className="dash-grid">
          {loading
            ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : articles.map(article => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onRead={setOpenArticle}
                />
              ))
          }
        </div>
      </div>

      {/* Panneau latéral */}
      {openArticle && (
        <ArticleDrawer
          article={openArticle}
          onClose={() => setOpenArticle(null)}
        />
      )}
    </>
  )
}

export default Dashboard