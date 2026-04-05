// AuthCallback.jsx
// Cette page reçoit l'utilisateur après
// qu'il a cliqué sur le lien Google ou email.
// Supabase gère tout automatiquement —
// on redirige juste vers le dashboard.

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    // Supabase récupère la session depuis l'URL
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard')
      } else {
        navigate('/')
      }
    })
  }, [])

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      flexDirection: 'column',
      gap: 16,
    }}>
      <div className="live-dot" style={{
        width: 12, height: 12,
        background: '#34d399',
        borderRadius: '50%',
        boxShadow: '0 0 12px #34d399',
        animation: 'livePulse 1s infinite',
      }}/>
      <p style={{
        fontFamily: 'Space Grotesk, sans-serif',
        color: 'rgba(200,240,220,0.6)',
        fontSize: 14,
      }}>
        Connexion en cours...
      </p>
    </div>
  )
}

export default AuthCallback