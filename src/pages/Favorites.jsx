// Favorites.jsx
// Affiche tous les articles sauvegardés
// depuis le localStorage via le FavoritesContext.

import { useFavorites } from '../context/FavoritesContext'
import '../styles/Favorites.css'

// Carte favori — similaire à la dash card
function FavoriteCard({ article }) {
  const { removeFavorite } = useFavorites()

  return (
    <div
      className="fav-card"
      style={{ borderColor: article.border, background: article.accent }}
    >
      {/* Source + bouton supprimer */}
      <div className="fav-card-top">
        <span className="fav-card-source" style={{ color: article.color }}>
          {article.sourceLabel}
        </span>
        <button
          className="fav-remove-btn"
          onClick={() => removeFavorite(article.id)}
          title="Retirer des favoris"
        >
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      {/* Contenu cliquable */}
      <div onClick={() => window.open(article.url, '_blank')}
        style={{ cursor: 'pointer', flex: 1 }}>
        <h3 className="fav-card-title">{article.title}</h3>
        <p className="fav-card-desc">{article.desc}</p>
      </div>

      <div className="fav-card-meta">{article.meta}</div>
    </div>
  )
}

// État vide — quand il n'y a pas encore de favoris
function EmptyState() {
  return (
    <div className="fav-empty">
      <div className="fav-empty-icon">
        <svg width="48" height="48" viewBox="0 0 24 24"
          fill="none" stroke="rgba(52,211,153,0.4)" strokeWidth="1.5">
          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
        </svg>
      </div>
      <h3 className="fav-empty-title">Aucun favori pour l'instant</h3>
      <p className="fav-empty-desc">
        Va sur le Dashboard et clique sur le bouton
        <span className="fav-empty-highlight"> bookmark </span>
        sur les articles qui t'intéressent.
      </p>
    </div>
  )
}

function Favorites() {
  const { favorites, removeFavorite } = useFavorites()

  return (
    <div className="favorites-page">

      {/* ── EN-TÊTE ── */}
      <div className="fav-header">
        <div>
          <h1 className="fav-title">
            Mes <span className="fav-title-accent">favoris</span>
          </h1>
          <p className="fav-subtitle">
            {favorites.length} article{favorites.length !== 1 ? 's' : ''} sauvegardé{favorites.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Bouton vider tout */}
        {favorites.length > 0 && (
          <button
            className="fav-clear-btn"
            onClick={() => {
              if (window.confirm('Vider tous les favoris ?')) {
                favorites.forEach(f => removeFavorite(f.id))
              }
            }}
          >
            Tout vider
          </button>
        )}
      </div>

      {/* ── CONTENU ── */}
      {favorites.length === 0
        ? <EmptyState />
        : (
          <div className="fav-grid">
            {favorites.map(article => (
              <FavoriteCard key={article.id} article={article} />
            ))}
          </div>
        )
      }

    </div>
  )
}

export default Favorites