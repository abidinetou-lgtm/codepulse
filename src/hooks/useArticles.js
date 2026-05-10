// useArticles.js
// Hook personnalisé — récupère les articles depuis le backend.
// Sources : Dev.to, Hacker News, NewsAPI (Tech News)

import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const TAG_TO_DEVTO = {
  javascript: 'javascript',
  react:      'react',
  node:       'node',
  webdev:     'webdev',
  ai:         'machinelearning',
}

const TAG_TO_NEWSAPI = {
  javascript: 'javascript programming',
  react:      'react javascript framework',
  node:       'nodejs backend',
  webdev:     'web development frontend',
  ai:         'artificial intelligence machine learning',
}

const FALLBACK = [
  {
    id: 'fb1', source: 'devto', sourceLabel: 'Dev.to',
    title: 'Maîtriser async/await en JavaScript',
    desc:  'Tout ce que tu dois savoir sur la programmation asynchrone moderne.',
    url:   'https://dev.to', tags: ['javascript'], cover: null,
    meta:  '347 réactions · 5 min',
    color: '#0369a1', accent: 'rgba(14,165,233,0.08)', border: 'rgba(14,165,233,0.15)',
  },
  {
    id: 'fb2', source: 'hackernews', sourceLabel: 'Hacker News',
    title: 'GPT-4o fine-tuning now available for all developers',
    desc:  'Le fine-tuning disponible pour tous les développeurs.',
    url:   'https://news.ycombinator.com', tags: ['ai'], cover: null,
    meta:  '528 points · 142 commentaires',
    color: '#b45309', accent: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.15)',
  },
  {
    id: 'fb3', source: 'newsapi', sourceLabel: 'Tech News',
    title: 'The State of JavaScript 2025 — Results are in',
    desc:  'Les tendances et frameworks préférés des développeurs cette année.',
    url:   'https://stateofjs.com', tags: ['tech'], cover: null,
    meta:  'Tech News · 2025',
    color: '#7c3aed', accent: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.15)',
  },
]

export function useArticles(source = 'all', tag = 'javascript') {
  const [articles, setArticles] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      const devtoTag  = TAG_TO_DEVTO[tag]  || tag
      const newsQuery = TAG_TO_NEWSAPI[tag] || 'tech news software'

      try {
        let results = []

        if (source === 'all' || source === 'devto') {
          try {
            const res  = await fetch(`${API_URL}/devto/articles?tag=${devtoTag}&limit=20`)
            const data = await res.json()
            if (data.success && data.data?.length) results = [...results, ...data.data]
          } catch (e) { console.warn('Dev.to:', e.message) }
        }

        if (source === 'all' || source === 'hackernews') {
          try {
            const res  = await fetch(`${API_URL}/hackernews/top?limit=15`)
            const data = await res.json()
            if (data.success && data.data?.length) results = [...results, ...data.data]
          } catch (e) { console.warn('HackerNews:', e.message) }
        }

        if (source === 'all' || source === 'newsapi') {
          try {
            const res  = await fetch(
              `${API_URL}/newsapi/articles?q=${encodeURIComponent(newsQuery)}&pageSize=15`
            )
            const data = await res.json()
            if (data.success && data.data?.length) results = [...results, ...data.data]
          } catch (e) { console.warn('NewsAPI:', e.message) }
        }

        if (!cancelled) setArticles(results.length ? results : FALLBACK)

      } catch {
        if (!cancelled) { setArticles(FALLBACK); setError('Erreur de chargement.') }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    const interval = setInterval(load, 5 * 60_000)
    return () => { cancelled = true; clearInterval(interval) }

  }, [source, tag])

  return { articles, loading, error }
}