import './index.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { FavoritesProvider } from './context/FavoritesContext'
import Background   from './components/Background'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import NewsSection  from './components/NewsSection'
import Features     from './components/Features'
import Dashboard    from './pages/Dashboard'
import Favorites    from './pages/Favorites'
import Sources      from './pages/Sources'
import Login        from './pages/Login'
import AuthCallback from './pages/AuthCallback'
import './styles/Background.css'
import './styles/Navbar.css'
import './styles/Hero.css'
import './styles/NewsSection.css'
import './styles/Features.css'
import './styles/Dashboard.css'
import './styles/Favorites.css'
import './styles/Sources.css'
import './styles/Login.css'
import './styles/Responsive.css'
import './styles/ArticleDrawer.css'

function LandingPage() {
  return (
    <>
      <Hero />
      <NewsSection />
    </>
  )
}

function AppContent() {
  const location = useLocation()
  const hideBackground = ['/login'].includes(location.pathname)

  return (
    <>
      {!hideBackground && <Background />}
      <div className="app-content">
        <Navbar />
        <Routes>
          <Route path="/"                element={<LandingPage />} />
          <Route path="/dashboard"       element={<Dashboard />} />
          <Route path="/favoris"         element={<Favorites />} />
          <Route path="/sources"         element={<Sources />} />
          <Route path="/login"           element={<Login />} />
          <Route path="/auth/callback"   element={<AuthCallback />} />
        </Routes>
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <AppContent />
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App