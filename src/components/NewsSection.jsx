import { useState } from 'react'
import { useArticles } from '../hooks/useArticles'
 
const FILTERS = [
  { key: 'all',        label: 'Tout' },
  { key: 'github',     label: 'GitHub' },
  { key: 'devto',      label: 'Dev.to' },
  { key: 'hackernews', label: 'Hacker News' },
]
 
function getBadgeClass(source) {
  const map = { github:'badge-github', devto:'badge-devto', hackernews:'badge-hackernews' }
  return map[source] || 'badge-devto'
}
 
function getPlaceholderBg(source) {
  const map = { github:'#dcfce7', devto:'#e0f2fe', hackernews:'#fef3c7' }
  return map[source] || '#e0f2fe'
}
function getPlaceholderColor(source) {
  const map = { github:'#15803d', devto:'#0369a1', hackernews:'#b45309' }
  return map[source] || '#0369a1'
}
 
function NewsCard({ article }) {
  return (
    <div
      className="news-card"
      onClick={function() { window.open(article.url, '_blank') }}
    >
      <div className="news-card-cover">
        {article.cover
          ? <img src={article.cover} alt={article.title}
              onError={function(e) {
                e.target.parentElement.style.background = getPlaceholderBg(article.source)
                e.target.style.display = 'none'
              }}/>
          : <div style={{ width:'100%', height:'100%', background: getPlaceholderBg(article.source), display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:12, fontWeight:600, color: getPlaceholderColor(article.source) }}>
                {article.sourceLabel}
              </span>
            </div>
        }
      </div>
 
      <div className="news-card-header">
        <div className="news-card-source">
          <span className={getBadgeClass(article.source)}>{article.sourceLabel}</span>
        </div>
        <span className="news-card-category" style={{
          background: getPlaceholderBg(article.source),
          color: getPlaceholderColor(article.source),
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
    <div className="news-card" style={{ flexShrink:0, width:300, minHeight:280 }}>
      <div style={{ width:'100%', height:140, background:'linear-gradient(90deg,#e0f2fe 25%,#bae6fd 50%,#e0f2fe 75%)', backgroundSize:'200% 100%', animation:'shimmer 1.4s infinite' }}/>
      {[35,90,70,40].map(function(w,i) {
        return <div key={i} style={{ height: i===1?15:11, width:w+'%', borderRadius:6, marginTop: i===0?14:8, marginLeft:16, background:'linear-gradient(90deg,#e0f2fe 25%,#bae6fd 50%,#e0f2fe 75%)', backgroundSize:'200% 100%', animation:'shimmer 1.4s infinite' }}/>
      })}
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
          <h2 className="section-title">Ce qui pulse <span className="title-gradient">maintenant</span></h2>
        </div>
        <div className="news-filters">
          {FILTERS.map(function(filter) {
            return (
              <button
                key={filter.key}
                className={'filter-btn' + (activeFilter === filter.key ? ' filter-active' : '')}
                onClick={function() { setActiveFilter(filter.key) }}
              >
                {filter.label}
              </button>
            )
          })}
        </div>
      </div>
 
      <div className="news-scroll-wrapper">
        <div className="news-scroll-track">
          {loading
            ? Array(5).fill(0).map(function(_, i) { return <SkeletonCard key={i}/> })
            : articles.map(function(article) { return <NewsCard key={article.id} article={article}/> })
          }
        </div>
      </div>
    </section>
  )
}
 
export default NewsSection
 