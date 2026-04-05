// ArticleDrawer.jsx
// Panneau latéral qui glisse depuis la droite
// quand on clique sur une carte article.
// Affiche le contenu de l'article directement
// dans le site sans quitter la page.

import { useEffect } from 'react'
import '../styles/ArticleDrawer.css'

function ArticleDrawer({ article, onClose }) {
  // Ferme avec la touche Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    // Empêche le scroll du body quand le drawer est ouvert
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [])

  if (!article) return null

  const sourceColors = {
    github:     '#34d399',
    devto:      '#22d3ee',
    hackernews: '#60a5fa',
  }
  const color = sourceColors[article.source] || '#34d399'

  return (
    <>
      {/* Overlay sombre derrière le panneau */}
      <div className="drawer-overlay" onClick={onClose} />

      {/* Panneau latéral */}
      <div className="drawer">

        {/* En-tête du drawer */}
        <div className="drawer-header">
          <div className="drawer-source" style={{ color }}>
            <div className="drawer-source-dot" style={{ background: color }}/>
            {article.sourceLabel}
          </div>
          <div className="drawer-actions">
            
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="drawer-open-btn"
            >
              Ouvrir l'original
              <svg width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
            <button className="drawer-close" onClick={onClose}>
              <svg width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Image de couverture */}
        {article.cover && (
          <div className="drawer-cover">
            <img
              src={article.cover}
              alt={article.title}
              onError={e => { e.target.parentElement.style.display = 'none' }}
            />
          </div>
        )}

        {/* Contenu */}
        <div className="drawer-content">
          {/* Tags */}
          {article.tags?.length > 0 && (
            <div className="drawer-tags">
              {article.tags.slice(0, 4).map(tag => (
                <span key={tag} className="drawer-tag" style={{
                  color,
                  background: `${color}12`,
                  borderColor: `${color}25`,
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Titre */}
          <h1 className="drawer-title">{article.title}</h1>

          {/* Méta */}
          <div className="drawer-meta">
            {article.author && (
              <span className="drawer-author">
                {article.avatar && (
                  <img src={article.avatar} alt={article.author}
                    className="drawer-avatar"
                    onError={e => e.target.style.display = 'none'}
                  />
                )}
                {article.author}
              </span>
            )}
            <span className="drawer-meta-info">{article.meta}</span>
          </div>

          {/* Description / Résumé */}
          <div className="drawer-body">
            <p className="drawer-desc">{article.desc}</p>

            {/* Bouton pour lire l'article complet */}
            <div className="drawer-cta">
              <p className="drawer-cta-note">
                Pour lire l'article complet, ouvre-le sur {article.sourceLabel} →
              </p>
              
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="drawer-read-btn"
                style={{ background: `linear-gradient(135deg, ${color}cc, ${color}88)` }}
              >
                Lire sur {article.sourceLabel}
                <svg width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default ArticleDrawer