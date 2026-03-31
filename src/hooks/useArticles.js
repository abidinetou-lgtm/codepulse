// useArticles.js
// Hook personnalisé qui fetch les articles
// depuis notre backend Express.
// Gère loading, erreur, et données automatiquement.

import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:3001/api'

// Données de secours si le backend n'est pas démarré
const FALLBACK = [
  {
    id: 'fb1', source: 'devto', sourceLabel: 'Dev.to',
    title: 'Maîtriser async/await en JavaScript',
    desc: 'Tout ce que tu dois savoir sur la programmation asynchrone moderne.',
    url: 'https://dev.to', tags: ['javascript'],
    meta: '347 réactions · 5 min', color: '#22d3ee',
    accent: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.2)',
  },
  {
    id: 'fb2', source: 'github', sourceLabel: 'GitHub',
    title: 'shadcn/ui — Beautifully designed components',
    desc: 'Composants React accessibles et personnalisables.',
    url: 'https://github.com', tags: ['react'],
    meta: '45.2k stars · +120 aujourd\'hui', color: '#34d399',
    accent: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)',
  },
  {
    id: 'fb3', source: 'hackernews', sourceLabel: 'Hacker News',
    title: 'GPT-4o fine-tuning now available for all',
    desc: 'Le fine-tuning est maintenant disponible pour tous les développeurs.',
    url: 'https://news.ycombinator.com', tags: ['ia'],
    meta: '528 points · 142 commentaires', color: '#60a5fa',
    accent: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.2)',
  },
  {
    id: 'fb4', source: 'github', sourceLabel: 'GitHub',
    title: 'Hono — Ultra-fast web framework',
    desc: 'Framework web ultra-rapide pour Cloudflare, Deno, Bun, Node.',
    url: 'https://github.com', tags: ['node'],
    meta: '18.4k stars · +89 aujourd\'hui', color: '#34d399',
    accent: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)',
  },
  {
    id: 'fb5', source: 'devto', sourceLabel: 'Dev.to',
    title: 'React 19 — Ce qui change vraiment',
    desc: 'Actions, use(), Server Components — le tour complet.',
    url: 'https://dev.to', tags: ['react'],
    meta: '876 réactions · 8 min', color: '#22d3ee',
    accent: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.2)',
  },
  {
    id: 'fb6', source: 'hackernews', sourceLabel: 'Hacker News',
    title: 'Bun 1.2 — Le runtime JS qui défie Node',
    desc: 'Performances 3x supérieures à Node.js sur les benchmarks HTTP.',
    url: 'https://news.ycombinator.com', tags: ['javascript'],
    meta: '742 points · 98 commentaires', color: '#60a5fa',
    accent: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.2)',
  },
]

export function useArticles(source = 'all', tag = 'javascript') {
  const [articles, setArticles] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    async function loadArticles() {
      setLoading(true)
      setError(null)

      try {
        let results = []

        if (source === 'all' || source === 'devto') {
          const res  = await fetch(`${API_URL}/devto/articles?tag=${tag}&limit=8`)
          const data = await res.json()
          if (data.success) results = [...results, ...data.data]
        }

        if (source === 'all' || source === 'github') {
          const res  = await fetch(`${API_URL}/github/trending`)
          const data = await res.json()
          if (data.success) results = [...results, ...data.data.slice(0, 6)]
        }

        if (source === 'all' || source === 'hackernews') {
          const res  = await fetch(`${API_URL}/hackernews/top?limit=8`)
          const data = await res.json()
          if (data.success) results = [...results, ...data.data]
        }

        setArticles(results.length ? results : FALLBACK)

      } catch {
        // Backend pas démarré → on affiche les données de secours
        setArticles(FALLBACK)
        setError(null)
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [source, tag])

  return { articles, loading, error }
}