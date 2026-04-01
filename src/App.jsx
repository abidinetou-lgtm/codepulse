// App.jsx
// Maintenant App.jsx gère la navigation.
// BrowserRouter = active React Router dans l'app
// Routes = conteneur de toutes les routes
// Route = une page à une URL donnée
//
// La landing page est sur "/" (racine)
// Le dashboard est sur "/dashboard"
// etc.

import './index.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import { FavoritesProvider } from './context/FavoritesContext'

import Background   from './components/Background'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import NewsSection  from './components/NewsSection'
import Features     from './components/Features'

import Dashboard    from './pages/Dashboard'
import Favorites    from './pages/Favorites'
import Sources      from './pages/Sources'

import './styles/Background.css'
import './styles/Navbar.css'
import './styles/Hero.css'
import './styles/NewsSection.css'
import './styles/Features.css'

import './styles/Dashboard.css'
import './styles/Favorites.css'
import './styles/Sources.css'

import './styles/Responsive.css'


// La landing page — assemblage de tous les composants
function LandingPage() {
  return (
    <>
      <Hero />
      <NewsSection />
      <Features />
      
    </>
  )
}

// AppContent est séparé de App pour pouvoir
// utiliser useLocation() (qui a besoin du Router)
function AppContent() {
  const location = useLocation()

  // Sur la landing page on garde le background animé,
  // sur les autres pages on garde juste les blobs
  const isLanding = location.pathname === '/'

  return (
    <>
      <Background />
      <div className="app-content">
        <Navbar />
        <Routes>
          <Route path="/"           element={<LandingPage />} />
          <Route path="/dashboard"  element={<Dashboard />} />
          <Route path="/favoris"    element={<Favorites />} />
          <Route path="/sources"    element={<Sources />} />
        </Routes>
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <AppContent />
      </FavoritesProvider>
    </BrowserRouter>
  )
}

export default App