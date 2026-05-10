// CookieBanner.jsx
// Bannière de consentement cookies conforme RGPD.
// Stocke le choix dans localStorage.
// Affiché uniquement à la première visite.

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'codepulse_cookie_consent'

export function useCookieConsent() {
  const [consent, setConsent] = useState(null) // null = pas encore répondu

  useEffect(function() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setConsent(JSON.parse(saved))
    } catch {
      setConsent(null)
    }
  }, [])

  function accept() {
    const value = { analytics: true, decided: true, at: Date.now() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    setConsent(value)
  }

  function decline() {
    const value = { analytics: false, decided: true, at: Date.now() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    setConsent(value)
  }

  return { consent, accept, decline }
}

function CookieBanner() {
  const { consent, accept, decline } = useCookieConsent()

  // Masque la bannière si l'utilisateur a déjà répondu
  if (consent?.decided) return null

  return (
    <div style={{
      position:  'fixed',
      bottom:    20,
      left:      20,
      right:     20,
      maxWidth:  540,
      margin:    '0 auto',
      background:'#fff',
      border:    '1px solid var(--border)',
      borderRadius: 16,
      padding:   '20px 24px',
      boxShadow: '0 8px 32px rgba(14,165,233,0.15)',
      zIndex:    500,
      animation: 'fadeUp 0.35s ease',
    }}>
      {/* Bande colorée en haut */}
      <div style={{
        position:     'absolute',
        top:          0, left: 0, right: 0,
        height:       3,
        background:   'linear-gradient(90deg, var(--blue), var(--green))',
        borderRadius: '16px 16px 0 0',
      }}/>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
        <span style={{ fontSize: 22, flexShrink: 0 }}>🍪</span>
        <div>
          <p style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700, fontSize: 14,
            color: 'var(--text-1)', marginBottom: 6,
          }}>
            Ce site utilise des cookies
          </p>
          <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.7 }}>
            CodePulse utilise uniquement des cookies essentiels pour l'authentification
            (Supabase) et tes favoris. Aucun cookie publicitaire.{' '}
            <a
              href="https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--blue)', textDecoration: 'underline' }}
            >
              En savoir plus
            </a>
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <button
          onClick={decline}
          style={{
            background:  'transparent',
            border:      '1px solid var(--border)',
            color:       'var(--text-3)',
            fontFamily:  'Space Grotesk, sans-serif',
            fontSize:    12, fontWeight: 600,
            padding:     '8px 16px', borderRadius: 8,
            cursor:      'pointer',
            transition:  'all 0.15s',
          }}
          onMouseOver={function(e) { e.target.style.borderColor = 'var(--blue)'; e.target.style.color = 'var(--blue)' }}
          onMouseOut={function(e)  { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text-3)' }}
        >
          Refuser
        </button>
        <button
          onClick={accept}
          style={{
            background:  'linear-gradient(135deg, var(--blue), var(--green))',
            border:      'none',
            color:       '#fff',
            fontFamily:  'Space Grotesk, sans-serif',
            fontSize:    12, fontWeight: 700,
            padding:     '8px 16px', borderRadius: 8,
            cursor:      'pointer',
            boxShadow:   '0 2px 8px rgba(14,165,233,0.3)',
          }}
        >
          Accepter
        </button>
      </div>
    </div>
  )
}

export default CookieBanner