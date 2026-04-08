import './index.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { FavoritesProvider } from './context/FavoritesContext'
import Background   from './components/Background'
import Navbar       from './components/Navbar'
import Footer       from './components/Footer'
import Hero         from './components/Hero'
import NewsSection  from './components/NewsSection'
import Dashboard    from './pages/Dashboard'
import Favorites    from './pages/Favorites'
import Sources      from './pages/Sources'
import Login        from './pages/Login'
import AuthCallback from './pages/AuthCallback'
import './styles/Background.css'
import './styles/Navbar.css'
import './styles/Hero.css'
import './styles/NewsSection.css'
import './styles/Dashboard.css'
import './styles/Favorites.css'
import './styles/Sources.css'
import './styles/Login.css'
import './styles/ArticleDrawer.css'
import './styles/Footer.css'
import LearnPage from './pages/LearnPage'
import './styles/LearnPage.css'

function LandingPage() {
  return (
    <>
      <Hero />
      <NewsSection />
      <Footer />
    </>
  )
}
 
function PageWithFooter({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
 
function AppContent() {
  const location = useLocation()
  const noBackground = ['/login'].includes(location.pathname)
 
  return (
    <>
      {!noBackground && <Background />}
      <div className="app-content">
        <Navbar />
        <Routes>
          <Route path="/"              element={<LandingPage />} />
          <Route path="/dashboard"     element={<PageWithFooter><Dashboard /></PageWithFooter>} />
          <Route path="/favoris"       element={<PageWithFooter><Favorites /></PageWithFooter>} />
          <Route path="/sources"       element={<PageWithFooter><Sources /></PageWithFooter>} />
          <Route path="/login"         element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/apprendre" element={<PageWithFooter><LearnPage /></PageWithFooter>} />
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