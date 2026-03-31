// FavoritesContext.jsx
// Le Context c'est comme un sac à dos partagé.
// N'importe quel composant peut y mettre des choses
// ou en prendre, sans passer par les props.
//
// Ici on stocke les articles favoris dans localStorage.
// localStorage = une mini base de données dans le navigateur.
// Les données restent même si tu fermes l'onglet !

import { createContext, useContext, useState, useEffect } from 'react'

// 1. On crée le contexte — c'est juste un "conteneur vide"
const FavoritesContext = createContext()

// 2. Le Provider — c'est lui qui FOURNIT les données
// à tous les composants enfants.
// On l'utilisera dans App.jsx pour entourer toute l'app.
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    // On initialise depuis localStorage au démarrage.
    // Le "() =>" s'appelle une "lazy initializer" —
    // React n'exécute cette fonction qu'une seule fois.
    try {
      const saved = localStorage.getItem('codepulse_favorites')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Chaque fois que favorites change, on sauvegarde
  // automatiquement dans localStorage.
  useEffect(() => {
    localStorage.setItem('codepulse_favorites', JSON.stringify(favorites))
  }, [favorites])

  // Ajouter un article aux favoris
  function addFavorite(article) {
    setFavorites(prev => {
      // On vérifie qu'il n'est pas déjà dans les favoris
      const exists = prev.find(f => f.id === article.id)
      if (exists) return prev
      return [...prev, article]
    })
  }

  // Supprimer un article des favoris
  function removeFavorite(id) {
    setFavorites(prev => prev.filter(f => f.id !== id))
  }

  // Vérifier si un article est déjà en favori
  function isFavorite(id) {
    return favorites.some(f => f.id === id)
  }

  // Tout ce qu'on rend accessible aux composants enfants
  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}

// 3. Hook personnalisé pour utiliser le contexte facilement.
// Au lieu d'écrire useContext(FavoritesContext) partout,
// on écrit juste useFavorites().
export function useFavorites() {
  return useContext(FavoritesContext)
}