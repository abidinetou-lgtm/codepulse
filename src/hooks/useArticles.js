// useArticles.js
// Hook personnalisé React qui gère la récupération
// des articles depuis notre backend Express.
//
// Un Hook c'est une fonction qui commence par "use"
// et qui peut utiliser d'autres hooks React.
//
// Ce hook retourne : { articles, loading, error }
// → articles : le tableau des articles récupérés
// → loading  : true pendant le chargement
// → error    : message d'erreur si problème réseau

import { useState, useEffect } from 'react'

// URL de base de notre API backend
// En local → http://localhost:3001/api
// En production → l'URL Render (depuis les variables d'environnement)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

// Correspondance tag sélectionné → tag Dev.to
// Dev.to utilise ses propres noms de tags
const TAG_TO_DEVTO = {
  javascript: 'javascript',
  react:      'react',
  node:       'node',
  webdev:     'webdev',
  ai:         'machinelearning',
}

// Correspondance tag → langage GitHub
// GitHub Trending filtre par langage de programmation
const TAG_TO_GITHUB_LANG = {
  javascript: 'javascript',
  react:      'javascript',
  node:       'javascript',
  webdev:     'typescript',
  ai:         'python',
}

// Données de secours affichées si le backend ne répond pas
// (serveur Render endormi, pas de connexion, etc.)
const FALLBACK = [
  {
    id: 'fb1', source: 'devto', sourceLabel: 'Dev.to',
    title: 'Maîtriser async/await en JavaScript',
    desc: 'Tout ce que tu dois savoir sur la programmation asynchrone moderne.',
    url: 'https://dev.to', tags: ['javascript'], cover: null,
    meta: '347 réactions · 5 min',
    color: '#0369a1', accent: 'rgba(14,165,233,0.08)', border: 'rgba(14,165,233,0.15)',
  },
  {
    id: 'fb2', source: 'github', sourceLabel: 'GitHub',
    title: 'shadcn/ui — Beautifully designed components',
    desc: 'Composants React accessibles et personnalisables.',
    url: 'https://github.com', tags: ['react'], cover: null,
    meta: '45.2k stars · +120',
    color: '#15803d', accent: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.15)',
  },
  {
    id: 'fb3', source: 'hackernews', sourceLabel: 'Hacker News',
    title: 'GPT-4o fine-tuning now available for all',
    desc: 'Le fine-tuning disponible pour tous les développeurs.',
    url: 'https://news.ycombinator.com', tags: ['ai'], cover: null,
    meta: '528 points · 142 commentaires',
    color: '#b45309', accent: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.15)',
  },
]

// ── LE HOOK PRINCIPAL ──
// source : 'all' | 'github' | 'devto' | 'hackernews'
// tag    : 'javascript' | 'react' | 'node' | 'webdev' | 'ai'
export function useArticles(source = 'all', tag = 'javascript') {
  // État des articles récupérés
  const [articles, setArticles] = useState([])
  // true = chargement en cours, false = terminé
  const [loading,  setLoading]  = useState(true)
  // null = pas d'erreur, string = message d'erreur
  const [error,    setError]    = useState(null)

  useEffect(() => {
    // cancelled empêche de mettre à jour l'état si le composant
    // a été démonté avant la fin du chargement
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      // On traduit le tag générique vers les formats spécifiques
      const devtoTag   = TAG_TO_DEVTO[tag]       || tag
      const githubLang = TAG_TO_GITHUB_LANG[tag] || ''

      try {
        let results = []

        // ── FETCH DEV.TO ──
        if (source === 'all' || source === 'devto') {
          try {
            const res  = await fetch(`${API_URL}/devto/articles?tag=${devtoTag}&limit=20`)
            const data = await res.json()
            if (data.success && data.data?.length) {
              results = [...results, ...data.data]
            }
          } catch (e) { console.warn('Dev.to fetch failed:', e.message) }
        }

        // ── FETCH GITHUB ──
        if (source === 'all' || source === 'github') {
          try {
            const res  = await fetch(`${API_URL}/github/trending?language=${githubLang}&since=daily`)
            const data = await res.json()
            if (data.success && data.data?.length) {
              results = [...results, ...data.data.slice(0, 15)]
            }
          } catch (e) { console.warn('GitHub fetch failed:', e.message) }
        }

        // ── FETCH HACKER NEWS ──
        if (source === 'all' || source === 'hackernews') {
          try {
            const res  = await fetch(`${API_URL}/hackernews/top?limit=15`)
            const data = await res.json()
            if (data.success && data.data?.length) {
              results = [...results, ...data.data]
            }
          } catch (e) { console.warn('HackerNews fetch failed:', e.message) }
        }

        // Fetch NewsAPI si demandé
      if (source === 'all' || source === 'newsapi') {
      try {
      const query = TAG_TO_DEVTO[tag] || tag
      const res   = await fetch(`${API_URL}/newsapi/articles?q=${query} programming`)
      const data  = await res.json()
      if (data.success && data.data?.length) {
      results = [...results, ...data.data]
      }
      } catch(e) { console.warn('NewsAPI fetch failed:', e.message) }
    }

        // Si on a des résultats → on les affiche
        // Sinon → on affiche les données de secours
        if (!cancelled) setArticles(results.length ? results : FALLBACK)

      } catch {
        // Erreur réseau globale → données de secours
        if (!cancelled) setArticles(FALLBACK)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    // Auto-refresh toutes les 5 minutes
    // Permet d'avoir toujours les articles les plus récents
    const interval = setInterval(load, 5 * 60 * 1000)

    // Nettoyage quand source ou tag change
    return function() {
      cancelled = true
      clearInterval(interval)
    }
  }, [source, tag]) // Se relance si source ou tag change

  return { articles, loading, error }
}