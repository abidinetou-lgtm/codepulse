// Login.jsx
// Page de connexion avec Google ou Email.
// Magic link = pas de mot de passe !
// L'utilisateur reçoit un lien par mail
// et clique dessus pour se connecter.

import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'

function Login() {
  const { signInWithGoogle, signInWithEmail, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [email,   setEmail]   = useState('')
  const [sent,    setSent]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  // Si déjà connecté → dashboard
  if (isLoggedIn) {
    navigate('/dashboard')
    return null
  }

  async function handleGoogle() {
    setLoading(true)
    setError(null)
    try {
      await signInWithGoogle()
    } catch (err) {
      setError('Erreur Google — réessaie.')
      setLoading(false)
    }
  }

  async function handleEmail(e) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError(null)
    try {
      await signInWithEmail(email)
      setSent(true)
    } catch (err) {
      setError('Email invalide ou erreur réseau.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        {/* Logo */}
        <div className="login-logo">
          CodePulse <span className="login-logo-dot"></span>
        </div>

        <h1 className="login-title">Connecte-toi</h1>
        <p className="login-sub">
          Sauvegarde tes favoris et reçois l'actu dev chaque matin.
        </p>

        {sent ? (
          /* État : email envoyé */
          <div className="login-sent">
            <div className="login-sent-icon">
              <svg width="32" height="32" viewBox="0 0 24 24"
                fill="none" stroke="#34d399" strokeWidth="2">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5"/>
              </svg>
            </div>
            <h3 className="login-sent-title">Vérifie ta boîte mail !</h3>
            <p className="login-sent-desc">
              On a envoyé un lien magique à <strong>{email}</strong>.
              Clique dessus pour te connecter — pas de mot de passe !
            </p>
            <button
              className="login-back-btn"
              onClick={() => { setSent(false); setEmail('') }}
            >
              Utiliser un autre email
            </button>
          </div>
        ) : (
          <>
            {/* Bouton Google */}
            <button
              className="login-google-btn"
              onClick={handleGoogle}
              disabled={loading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continuer avec Google
            </button>

            {/* Séparateur */}
            <div className="login-divider">
              <span>ou</span>
            </div>

            {/* Formulaire email */}
            <form onSubmit={handleEmail} className="login-form">
              <input
                type="email"
                placeholder="ton@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="login-input"
                required
              />
              <button
                type="submit"
                className="login-submit-btn"
                disabled={loading || !email}
              >
                {loading ? 'Envoi...' : 'Recevoir le lien magique ✦'}
              </button>
            </form>

            {error && <p className="login-error">{error}</p>}

            <p className="login-note">
              Pas de mot de passe · Lien sécurisé · Gratuit
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default Login