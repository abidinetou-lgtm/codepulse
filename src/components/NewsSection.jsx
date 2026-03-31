// NewsSection.jsx
// Maintenant branché sur les vraies APIs
// via le hook useArticles

import { useState } from 'react'
import { useArticles } from '../hooks/useArticles'

const FILTERS = [
  { key: 'all',        label: 'Tout' },
  { key: 'github',     label: 'GitHub' },
  { key: 'devto',      label: 'Dev.to' },
  { key: 'hackernews', label: 'Hacker News' },
]

function SourceIcon({ source, color }) {
  const icons = {
    github:     'GH',
    devto:      '{}',
    hackernews: 'HN',
    ia:         'IA',
  }
  return (
    <div className="news-card-icon" style={{
      background: `${color}18`,
      color,
      width: 28, height: 28,
      borderRadius: 8,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 10, fontWeight: 700,
      fontFamily: 'Space Grotesk, sans-serif',
      flexShrink: 0,
    }}>
      {icons[source] || '?'}
    </div>
  )
}

function NewsCard({ article }) {
  return (
    <div
      className="news-card"
      style={{ background: article.accent, borderColor: article.border }}
      onClick={() => window.open(article.url, '_blank')}
    >
      <div className="news-card-header">
        <div className="news-card-source" style={{ color: article.color }}>
          <SourceIcon source={article.source} color={article.color} />
          {article.sourceLabel}
        </div>
        <span className="news-card-category" style={{
          background: `${article.color}18`,
          border: `1px solid ${article.color}30`,
          color: article.color,
        }}>
          {article.tags?.[0] || article.source}
        </span>
      </div>

      <h3 className="news-card-title">{article.title}</h3>
      <p className="news-card-desc">{article.desc}</p>
      <div className="news-card-meta">{article.meta}</div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="news-card" style={{
      background: 'rgba(255,255,255,0.02)',
      borderColor: 'rgba(255,255,255,0.05)',
      flexShrink: 0, width: 300,
    }}>
      {[35, 90, 70, 40].map((w, i) => (
        <div key={i} style={{
          height: i === 1 ? 16 : 12,
          width: `${w}%`,
          borderRadius: 6,
          background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
          marginTop: i === 0 ? 0 : 10,
        }}/>
      ))}
    </div>
  )
}

function NewsSection() {
  const [activeFilter, setActiveFilter] = useState('all')
  const { articles, loading } = useArticles(activeFilter, 'javascript')

  return (
    <section className="news-section">
      <div className="news-header">
        <div>
          <p className="section-eyebrow">Actu en direct</p>
          <h2 className="section-title">
            Ce qui pulse <span className="title-gradient">maintenant</span>
          </h2>
        </div>

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

      <div className="news-scroll-wrapper">
        <div className="news-scroll-track">
          {loading
            ? Array(5).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : articles.map(article => (
                <NewsCard key={article.id} article={article} />
              ))
          }
        </div>
      </div>

    </section>
  )
}

export default NewsSection