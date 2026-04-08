import { useFavorites } from '../context/FavoritesContext'
import '../styles/Favorites.css'
 
function getBadgeClass(source) {
  const map = { github:'badge-github', devto:'badge-devto', hackernews:'badge-hackernews' }
  return map[source] || 'badge-devto'
}
 
function FavoriteCard({ article }) {
  const { removeFavorite } = useFavorites()
 
  return (
    <div className="fav-card" onClick={function() { window.open(article.url, '_blank') }}>
      <div className="fav-card-img">
        {article.cover
          ? <img src={article.cover} alt={article.title}
              onError={function(e) { e.target.parentElement.style.background = '#e0f2fe'; e.target.style.display='none' }}/>
          : <div className="fav-card-img" style={{ background: article.source==='github' ? '#dcfce7' : article.source==='hackernews' ? '#fef3c7' : '#e0f2fe', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:12, fontWeight:600, color: article.source==='github' ? '#15803d' : article.source==='hackernews' ? '#b45309' : '#0369a1' }}>{article.sourceLabel}</span>
            </div>
        }
      </div>
      <div className="fav-card-body">
        <div className="fav-card-top">
          <span className={getBadgeClass(article.source)}>{article.sourceLabel}</span>
          <button className="fav-remove-btn"
            onClick={function(e) { e.stopPropagation(); removeFavorite(article.id) }}
            title="Retirer des favoris">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <h3 className="fav-card-title">{article.title}</h3>
        <p className="fav-card-desc">{article.desc}</p>
        <div className="fav-card-meta">{article.meta}</div>
      </div>
    </div>
  )
}
 
function EmptyState() {
  return (
    <div className="fav-empty">
      <div className="fav-empty-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5">
          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
        </svg>
      </div>
      <h3 className="fav-empty-title">Aucun favori pour l'instant</h3>
      <p className="fav-empty-desc">Va sur la Veille et clique sur le bouton <span className="fav-empty-highlight">bookmark</span> sur les articles qui t'intéressent.</p>
    </div>
  )
}
 
function Favorites() {
  const { favorites, removeFavorite } = useFavorites()
 
  return (
    <div className="favorites-page">
      <div className="fav-hero">
        <h1 className="fav-hero-title">Mes favoris</h1>
        <p className="fav-hero-sub">{favorites.length} article{favorites.length !== 1 ? 's' : ''} sauvegardé{favorites.length !== 1 ? 's' : ''}</p>
        {favorites.length > 0 && (
          <div className="fav-hero-actions">
            <button className="fav-clear-btn"
              onClick={function() {
                if (window.confirm('Vider tous les favoris ?')) {
                  favorites.forEach(function(f) { removeFavorite(f.id) })
                }
              }}>
              Tout vider
            </button>
          </div>
        )}
      </div>
      {favorites.length === 0
        ? <EmptyState/>
        : <div className="fav-grid">{favorites.map(function(a) { return <FavoriteCard key={a.id} article={a}/> })}</div>
      }
    </div>
  )
}
 
export default Favorites