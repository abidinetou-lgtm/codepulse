import { useEffect } from 'react'
import '../styles/ArticleDrawer.css'

function ArticleDrawer({ article, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!article) return null

  const sourceColors = {
    github: '#34d399',
    devto: '#22d3ee',
    hackernews: '#60a5fa',
  }

  const color = sourceColors[article.source] || '#34d399'

  return (
    <div>
      <div className="drawer-overlay" onClick={onClose} />

      <div className="drawer">
        <div className="drawer-header">
          <div className="drawer-source" style={{ color }}>
            <div
              className="drawer-source-dot"
              style={{ background: color }}
            />
            {article.sourceLabel}
          </div>

          <div className="drawer-actions">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="drawer-open-btn"
            >
              Ouvrir l'original
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>

            <button className="drawer-close" onClick={onClose}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {article.cover && (
          <div className="drawer-cover">
            <img
              src={article.cover}
              alt={article.title}
              onError={(e) => {
                e.target.parentElement.style.display = 'none'
              }}
            />
          </div>
        )}

        <div className="drawer-content">
          {article.tags && article.tags.length > 0 && (
            <div className="drawer-tags">
              {article.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="drawer-tag"
                  style={{
                    color,
                    background: `${color}12`,
                    borderColor: `${color}25`,
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="drawer-title">{article.title}</h1>

          <div className="drawer-meta">
            {article.author && (
              <span className="drawer-author">
                {article.avatar && (
                  <img
                    src={article.avatar}
                    alt={article.author}
                    className="drawer-avatar"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                )}
                {article.author}
              </span>
            )}

            <span className="drawer-meta-info">
              {article.meta}
            </span>
          </div>

          <div className="drawer-body">
            <p className="drawer-desc">{article.desc}</p>

            <div className="drawer-cta">
              <p className="drawer-cta-note">
                Pour lire l'article complet, ouvre-le sur{' '}
                {article.sourceLabel}
              </p>

              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="drawer-read-btn"
                style={{ background: color }}
              >
                Lire sur {article.sourceLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleDrawer