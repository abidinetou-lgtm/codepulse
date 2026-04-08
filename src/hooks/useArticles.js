import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const TAG_TO_DEVTO = {
  javascript: 'javascript', react: 'react',
  node: 'node', webdev: 'webdev', ai: 'machinelearning',
}

const TAG_TO_GITHUB_LANG = {
  javascript: 'javascript', react: 'javascript',
  node: 'javascript', webdev: 'typescript', ai: 'python',
}

const FALLBACK = [
  { id:'fb1', source:'devto', sourceLabel:'Dev.to', title:'Maîtriser async/await en JavaScript', desc:'Tout ce que tu dois savoir sur la programmation asynchrone moderne.', url:'https://dev.to', tags:['javascript'], cover:null, meta:'347 réactions · 5 min', color:'#0369a1', accent:'rgba(14,165,233,0.08)', border:'rgba(14,165,233,0.15)' },
  { id:'fb2', source:'github', sourceLabel:'GitHub', title:'shadcn/ui — Beautifully designed components', desc:'Composants React accessibles et personnalisables.', url:'https://github.com', tags:['react'], cover:null, meta:'45.2k stars · +120', color:'#15803d', accent:'rgba(16,185,129,0.08)', border:'rgba(16,185,129,0.15)' },
  { id:'fb3', source:'hackernews', sourceLabel:'Hacker News', title:'GPT-4o fine-tuning now available for all', desc:'Le fine-tuning disponible pour tous les développeurs.', url:'https://news.ycombinator.com', tags:['ai'], cover:null, meta:'528 points · 142 commentaires', color:'#b45309', accent:'rgba(245,158,11,0.08)', border:'rgba(245,158,11,0.15)' },
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
      const devtoTag   = TAG_TO_DEVTO[tag]       || tag
      const githubLang = TAG_TO_GITHUB_LANG[tag] || ''

      try {
        let results = []

        if (source === 'all' || source === 'devto') {
          try {
            const res  = await fetch(`${API_URL}/devto/articles?tag=${devtoTag}&limit=20`)
            const data = await res.json()
            if (data.success && data.data?.length) results = [...results, ...data.data]
          } catch(e) { console.warn('devto:', e.message) }
        }

        if (source === 'all' || source === 'github') {
          try {
            const res  = await fetch(`${API_URL}/github/trending?language=${githubLang}&since=daily`)
            const data = await res.json()
            if (data.success && data.data?.length) results = [...results, ...data.data.slice(0, 15)]
          } catch(e) { console.warn('github:', e.message) }
        }

        if (source === 'all' || source === 'hackernews') {
          try {
            const res  = await fetch(`${API_URL}/hackernews/top?limit=15`)
            const data = await res.json()
            if (data.success && data.data?.length) results = [...results, ...data.data]
          } catch(e) { console.warn('hackernews:', e.message) }
        }

        if (!cancelled) setArticles(results.length ? results : FALLBACK)

      } catch {
        if (!cancelled) setArticles(FALLBACK)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    const interval = setInterval(load, 5 * 60 * 1000)
    return () => { cancelled = true; clearInterval(interval) }
  }, [source, tag])

  return { articles, loading, error }
}