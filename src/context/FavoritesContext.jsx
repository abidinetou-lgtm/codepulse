// FavoritesContext.jsx
// Maintenant les favoris sont sauvegardés dans Supabase
// si l'utilisateur est connecté.
// Sinon on utilise localStorage comme avant.

import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const { user, isLoggedIn } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [loading,   setLoading]   = useState(false)

  // Charge les favoris depuis Supabase ou localStorage
  useEffect(() => {
    if (isLoggedIn) {
      loadFromSupabase()
    } else {
      loadFromLocalStorage()
    }
  }, [isLoggedIn, user])

  function loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem('codepulse_favorites')
      setFavorites(saved ? JSON.parse(saved) : [])
    } catch {
      setFavorites([])
    }
  }

  async function loadFromSupabase() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        // On transforme les données Supabase en format article
        const articles = data.map(fav => ({
          id:          fav.article_id,
          source:      fav.source,
          sourceLabel: fav.source_label,
          title:       fav.title,
          desc:        fav.description,
          url:         fav.url,
          cover:       fav.cover,
          meta:        fav.meta,
          color:       fav.color,
          accent:      fav.accent,
          border:      fav.border,
          tags:        fav.tags || [],
        }))
        setFavorites(articles)
      }
    } catch (err) {
      console.error('Supabase favorites error:', err)
    } finally {
      setLoading(false)
    }
  }

  async function addFavorite(article) {
    // Évite les doublons
    const exists = favorites.find(f => f.id === article.id)
    if (exists) return

    // Mise à jour optimiste — on ajoute immédiatement
    setFavorites(prev => [article, ...prev])

    if (isLoggedIn) {
      // Sauvegarde dans Supabase
      await supabase.from('favorites').insert({
        user_id:      user.id,
        article_id:   String(article.id),
        source:       article.source,
        source_label: article.sourceLabel,
        title:        article.title,
        description:  article.desc,
        url:          article.url,
        cover:        article.cover,
        meta:         article.meta,
        color:        article.color,
        accent:       article.accent,
        border:       article.border,
        tags:         article.tags || [],
      })
    } else {
      // Sauvegarde dans localStorage
      const updated = [article, ...favorites]
      localStorage.setItem('codepulse_favorites', JSON.stringify(updated))
    }
  }

  async function removeFavorite(id) {
    setFavorites(prev => prev.filter(f => f.id !== id))

    if (isLoggedIn) {
      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('article_id', String(id))
    } else {
      const updated = favorites.filter(f => f.id !== id)
      localStorage.setItem('codepulse_favorites', JSON.stringify(updated))
    }
  }

  function isFavorite(id) {
    return favorites.some(f => f.id === id || f.id === String(id))
  }

  return (
    <FavoritesContext.Provider value={{
      favorites,
      loading,
      addFavorite,
      removeFavorite,
      isFavorite,
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}