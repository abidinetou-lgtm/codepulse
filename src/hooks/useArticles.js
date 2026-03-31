// useArticles.js
// Un Hook personnalisé — c'est une fonction React
// qui utilise d'autres hooks (useState, useEffect).
// Il centralise toute la logique de fetch des articles.
// Comme ça, n'importe quel composant peut l'utiliser
// sans réécrire le code de fetch.

import { useState, useEffect } from 'react'

// L'URL de base du backend
const API_URL = 'http://localhost:3001/api'

export function useArticles(source = 'all', tag = 'javascript') {
  // Les 3 états possibles d'un fetch :
  const [articles, setArticles] = useState([])  // les données
  const [loading,  setLoading]  = useState(true) // chargement en cours ?
  const [error,    setError]    = useState(null)  // erreur ?

  useEffect(() => {
    // Cette fonction s'exécute quand source ou tag change
    async function loadArticles() {
      setLoading(true)
      setError(null)

      try {
        let results = []

        // On appelle les bons endpoints selon la source
        if (source === 'all' || source === 'devto') {
          const res  = await fetch(`${API_URL}/devto/articles?tag=${tag}&limit=8`)
          const data = await res.json()
          if (data.success) results = [...results, ...data.data]
        }

        if (source === 'all' || source === 'github') {
          const res  = await fetch(`${API_URL}/github/trending?since=daily`)
          const data = await res.json()
          if (data.success) results = [...results, ...data.data.slice(0, 8)]
        }

        if (source === 'all' || source === 'hackernews') {
          const res  = await fetch(`${API_URL}/hackernews/top?limit=8`)
          const data = await res.json()
          if (data.success) results = [...results, ...data.data]
        }

        setArticles(results)

      } catch (err) {
        console.error('Fetch error:', err)
        setError('Impossible de charger les articles. Le serveur est-il démarré ?')
      } finally {
        // finally s'exécute toujours, erreur ou pas
        setLoading(false)
      }
    }

    loadArticles()
  }, [source, tag]) // Re-execute si source ou tag change

  return { articles, loading, error }
}