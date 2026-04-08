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
 
function getBadgeClass(source) {
  const map = { github:'badge-github', devto:'badge-devto', hackernews:'badge-hackernews' }
  return map[source] || 'badge-devto'
}
 
function getPlaceholderStyle(source) {
  const styles = {
    github:     { bg:'#dcfce7', color:'#15803d' },
    devto:      { bg:'#e0f2fe', color:'#0369a1' },
    hackernews: { bg:'#fef3c7', color:'#b45309' },
  }
  return styles[source] || styles.devto
}
 
function ArticleCard({ article, onRead }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const fav = isFavorite(article.id)
  const ph = getPlaceholderStyle(article.source)
 
  function toggleFav(e) {
    e.stopPropagation()
    fav ? removeFavorite(article.id) : addFavorite(article)
  }
 
  return (
    <div className="dash-card" onClick={function() { onRead(article) }}>
      <div className="dash-card-img">
        {article.cover
          ? <img src={article.cover} alt={article.title}
              onError={function(e) {
                e.target.parentElement.style.background = ph.bg
                e.target.style.display = 'none'
              }}/>
          : <div className="dash-card-img-placeholder" style={{ background: ph.bg }}>
              <span style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:12, fontWeight:600, color: ph.color }}>
                {article.sourceLabel}
              </span>
            </div>
        }
      </div>
 
      <div className="dash-card-body">
        <div className="dash-card-top">
          <div className="dash-card-source">
            <span className={getBadgeClass(article.source)}>{article.sourceLabel}</span>
          </div>
          <button
            className={'fav-btn' + (fav ? ' fav-active' : '')}
            onClick={toggleFav}
            title={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <svg width="13" height="13" viewBox="0 0 24 24"
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
          {article.tags && article.tags[0] && (
            <span className="dash-card-tag" style={{
              background: ph.bg, color: ph.color,
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
      <div className="dash-card-img skel" style={{ height:180 }}/>
      <div className="dash-card-body" style={{ gap:12 }}>
        <div className="skel" style={{ height:11, width:'35%' }}/>
        <div className="skel" style={{ height:15, width:'90%' }}/>
        <div className="skel" style={{ height:11, width:'70%' }}/>
        <div className="skel" style={{ height:11, width:'45%', marginTop:4 }}/>
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
        <div className="dash-hero">
          <div className="dash-hero-label">
            <span className="dash-hero-label-dot"/>
            Veille technologique
            <div className="live-badge" style={{ marginLeft:'auto' }}>
              <span className="live-dot"/>
              Live
            </div>
          </div>
          <h1 className="dash-hero-title">Flux en direct</h1>
          <p className="dash-hero-sub">
            {loading
              ? 'Chargement des articles...'
              : articles.length + ' articles depuis GitHub, Dev.to et Hacker News'
            }
          </p>
        </div>
 
        <div className="dash-filters-bar">
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {SOURCES.map(function(s) {
              return (
                <button
                  key={s.key}
                  className={'filter-btn' + (activeSource === s.key ? ' filter-active' : '')}
                  onClick={function() { setActiveSource(s.key) }}
                >
                  {s.label}
                </button>
              )
            })}
          </div>
          <div className="dash-filters-sep"/>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {TAGS.map(function(tag) {
              return (
                <button
                  key={tag}
                  className={'tag-btn' + (activeTag === tag ? ' tag-active' : '')}
                  onClick={function() { setActiveTag(tag) }}
                >
                  #{tag}
                </button>
              )
            })}
          </div>
        </div>
 
        <div className="dash-grid">
          {loading
            ? Array(6).fill(0).map(function(_, i) { return <SkeletonCard key={i}/> })
            : articles.map(function(article) {
                return (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onRead={setOpenArticle}
                  />
                )
              })
          }
        </div>
      </div>
 
      {openArticle && (
        <ArticleDrawer
          article={openArticle}
          onClose={function() { setOpenArticle(null) }}
        />
      )}
    </>
  )
}
 
export default Dashboard
