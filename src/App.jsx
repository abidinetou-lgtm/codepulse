// App.jsx
// Composant racine de CodePulse.
// Assemble les Providers, la navigation et les pages.

import './index.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider }      from './context/AuthContext'
import { FavoritesProvider } from './context/FavoritesContext'
import Background       from './components/Background'
import Navbar           from './components/Navbar'
import Footer           from './components/Footer'
import Hero             from './components/Hero'
import NewsSection      from './components/NewsSection'
import NewsletterPrompt from './components/NewsletterPrompt'
import CookieBanner     from './components/CookieBanner'
import Dashboard        from './pages/Dashboard'
import Favorites        from './pages/Favorites'
import Sources          from './pages/Sources'
import Login            from './pages/Login'
import AuthCallback     from './pages/AuthCallback'
import LearnPage        from './pages/LearnPage'

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
import './styles/LearnPage.css'

// ── Landing page = hero + actu + footer ──────────────
function LandingPage() {
  return (
    <>
      <Hero />
      <NewsSection />
      <Footer />
    </>
  )
}

// ── Wrapper qui ajoute le footer à une page ───────────
function PageWithFooter({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}

// ── Contenu principal avec navigation ────────────────
function AppContent() {
  const location = useLocation()
  // Pas de fond animé sur la page de connexion
  const noBackground = location.pathname === '/login'

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
          <Route path="/apprendre"     element={<PageWithFooter><LearnPage /></PageWithFooter>} />
          <Route path="/login"         element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          {/* Route 404 */}
          <Route path="*"              element={<PageWithFooter><NotFound /></PageWithFooter>} />
        </Routes>
      </div>

      {/* Modals globaux */}
      <NewsletterPrompt />
      <CookieBanner />
    </>
  )
}

// ── Page 404 ──────────────────────────────────────────
function NotFound() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      minHeight: '60vh', gap: 16, textAlign: 'center',
      padding: 32,
    }}>
      <div style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: 72, fontWeight: 700,
        color: 'var(--blue-bg)', lineHeight: 1,
      }}>
        404
      </div>
      <h1 style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: 24, fontWeight: 700, color: 'var(--text-1)',
      }}>
        Page introuvable
      </h1>
      <p style={{ fontSize: 14, color: 'var(--text-3)', maxWidth: 320 }}>
        Cette page n'existe pas ou a été déplacée.
      </p>
      <a href="/" style={{
        display: 'inline-block',
        background: 'var(--blue)', color: '#fff',
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: 13, fontWeight: 700,
        padding: '10px 24px', borderRadius: 10,
        textDecoration: 'none', marginTop: 8,
      }}>
        Retour à l'accueil
      </a>
    </div>
  )
}

// ── App racine ────────────────────────────────────────
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