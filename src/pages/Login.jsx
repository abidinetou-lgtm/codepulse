import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import '../styles/Login.css'

function Login() {
  const { signInWithGoogle, signInWithEmail, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login'

  const [mode,    setMode]    = useState(initialMode)
  const [email,   setEmail]   = useState('')
  const [sent,    setSent]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  if (isLoggedIn) { navigate('/dashboard'); return null }

  async function handleGoogle() {
    setLoading(true); setError(null)
    try { await signInWithGoogle() }
    catch { setError('Erreur Google — réessaie.'); setLoading(false) }
  }

  async function handleEmail(e) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true); setError(null)
    try { await signInWithEmail(email); setSent(true) }
    catch { setError('Email invalide ou erreur réseau.') }
    finally { setLoading(false) }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          CodePulse <span className="login-logo-dot"></span>
        </div>

        {/* Toggle S'inscrire / Se connecter */}
        <div className="login-mode-toggle">
          <button
            className={'login-mode-btn' + (mode === 'login' ? ' login-mode-active' : '')}
            onClick={function() { setMode('login'); setSent(false); setError(null) }}
          >
            Se connecter
          </button>
          <button
            className={'login-mode-btn' + (mode === 'signup' ? ' login-mode-active' : '')}
            onClick={function() { setMode('signup'); setSent(false); setError(null) }}
          >
            S'inscrire
          </button>
        </div>

        <h1 className="login-title">
          {mode === 'signup' ? 'Créer un compte' : 'Bon retour !'}
        </h1>
        <p className="login-sub">
          {mode === 'signup'
            ? 'Rejoins CodePulse et construis ta veille tech personnalisée.'
            : 'Retrouve tes favoris et ta veille tech personnalisée.'
          }
        </p>

        {sent ? (
          <div className="login-sent">
            <div className="login-sent-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3 className="login-sent-title">Vérifie ta boîte mail !</h3>
            <p className="login-sent-desc">
              On a envoyé un lien magique à <strong>{email}</strong>.
              Clique dessus pour te connecter — pas de mot de passe !
            </p>
            <button className="login-back-btn"
              onClick={function() { setSent(false); setEmail('') }}>
              Utiliser un autre email
            </button>
          </div>
        ) : (
          <>
            <button className="login-google-btn" onClick={handleGoogle} disabled={loading}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {mode === 'signup' ? "S'inscrire avec Google" : 'Continuer avec Google'}
            </button>

            <div className="login-divider"><span>ou</span></div>

            <form onSubmit={handleEmail} className="login-form">
              <input
                type="email"
                placeholder="ton@email.com"
                value={email}
                onChange={function(e) { setEmail(e.target.value) }}
                className="login-input"
                required
              />
              <button type="submit" className="login-submit-btn" disabled={loading || !email}>
                {loading ? 'Envoi...' : (mode === 'signup' ? "Créer mon compte ✦" : 'Recevoir le lien magique ✦')}
              </button>
            </form>

            {error && <p className="login-error">{error}</p>}

            <p className="login-switch">
              {mode === 'signup' ? 'Déjà un compte ?' : 'Pas encore de compte ?'}
              <button className="login-switch-btn"
                onClick={function() { setMode(mode === 'signup' ? 'login' : 'signup'); setError(null) }}>
                {mode === 'signup' ? 'Se connecter' : "S'inscrire"}
              </button>
            </p>
            <p className="login-note">Pas de mot de passe · Lien sécurisé · Gratuit</p>
          </>
        )}
      </div>
    </div>
  )
}

export default Login