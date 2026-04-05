import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

// Mapping tag → langage GitHub
const TAG_TO_GITHUB_LANG = {
  javascript: 'javascript',
  react:      'javascript',
  node:       'javascript',
  webdev:     'typescript',
  ai:         'python',
}

// Mapping tag → tag Dev.to
const TAG_TO_DEVTO = {
  javascript: 'javascript',
  react:      'react',
  node:       'node',
  webdev:     'webdev',
  ai:         'machinelearning',
}

const FALLBACK = [
  {
    id: 'fb1', source: 'devto', sourceLabel: 'Dev.to',
    title: 'Maîtriser async/await en JavaScript',
    desc: 'Tout ce que tu dois savoir sur la programmation asynchrone moderne.',
    url: 'https://dev.to', tags: ['javascript'], cover: null,
    meta: '347 réactions · 5 min', color: '#22d3ee',
    accent: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.2)',
  },
  {
    id: 'fb2', source: 'github', sourceLabel: 'GitHub',
    title: 'shadcn/ui — Beautifully designed components',
    desc: 'Composants React accessibles et personnalisables.',
    url: 'https://github.com/shadcn-ui/ui',
    tags: ['react'], cover: null,
    meta: '45.2k stars · +120 aujourd\'hui', color: '#34d399',
    accent: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)',
  },
  {
    id: 'fb3', source: 'hackernews', sourceLabel: 'Hacker News',
    title: 'GPT-4o fine-tuning now available for all',
    desc: 'Le fine-tuning disponible pour tous les développeurs.',
    url: 'https://news.ycombinator.com',
    tags: ['ai'], cover: null,
    meta: '528 points · 142 commentaires', color: '#60a5fa',
    accent: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.2)',
  },
]

export function useArticles(source = 'all', tag = 'javascript') {
  const [articles, setArticles] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    // Annule le fetch précédent si source/tag change vite
    let cancelled = false

    async function loadArticles() {
      setLoading(true)
      setError(null)

      const devtoTag  = TAG_TO_DEVTO[tag]       || tag
      const githubLang = TAG_TO_GITHUB_LANG[tag] || ''

      try {
        let results = []

        // ── DEV.TO ──
        if (source === 'all' || source === 'devto') {
          try {
            const res  = await fetch(
              `${API_URL}/devto/articles?tag=${devtoTag}&limit=12`
            )
            const data = await res.json()
            if (data.success && data.data?.length) {
              results = [...results, ...data.data]
            }
          } catch (e) {
            console.warn('Dev.to fetch failed:', e.message)
          }
        }

        // ── GITHUB ──
        if (source === 'all' || source === 'github') {
          try {
            const res  = await fetch(
              `${API_URL}/github/trending?language=${githubLang}&since=daily`
            )
            const data = await res.json()
            if (data.success && data.data?.length) {
              results = [...results, ...data.data.slice(0, 8)]
            }
          } catch (e) {
            console.warn('GitHub fetch failed:', e.message)
          }
        }

        // ── HACKER NEWS ──
        if (source === 'all' || source === 'hackernews') {
          try {
            const res  = await fetch(
              `${API_URL}/hackernews/top?limit=10`
            )
            const data = await res.json()
            if (data.success && data.data?.length) {
              results = [...results, ...data.data]
            }
          } catch (e) {
            console.warn('HackerNews fetch failed:', e.message)
          }
        }

        if (cancelled) return

        setArticles(results.length ? results : FALLBACK)

      } catch {
        if (!cancelled) {
          setArticles(FALLBACK)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadArticles()

    // Auto-refresh toutes les 5 minutes
    const interval = setInterval(loadArticles, 5 * 60 * 1000)

    return () => {
      cancelled = true
      clearInterval(interval)
    }

  }, [source, tag])

  return { articles, loading, error }
}