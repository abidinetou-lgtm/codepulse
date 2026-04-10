// NewsletterPrompt.jsx
// Modal qui apparaît après la connexion.
// Demande à l'utilisateur s'il veut recevoir
// un résumé des meilleurs articles tous les 2 jours.
// Sa réponse est sauvegardée dans Supabase (table profiles).

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

function NewsletterPrompt() {
  const { user, isLoggedIn } = useAuth()
  const [visible,  setVisible]  = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [answered, setAnswered] = useState(false)

  useEffect(function() {
    if (!isLoggedIn || !user) return

    // On vérifie si l'utilisateur a déjà répondu à la question
    // en regardant dans localStorage (évite de redemander à chaque connexion)
    const key = 'newsletter_prompt_' + user.id
    const already = localStorage.getItem(key)
    if (already) return

    // On attend 1 seconde après connexion avant d'afficher
    const timer = setTimeout(function() { setVisible(true) }, 1000)
    return function() { clearTimeout(timer) }
  }, [isLoggedIn, user])

  async function handleChoice(wantsNewsletter) {
    setLoading(true)
    try {
      // Mise à jour de la préférence dans Supabase
      await supabase
        .from('profiles')
        .update({ newsletter_enabled: wantsNewsletter })
        .eq('id', user.id)

      // On mémorise que l'utilisateur a déjà répondu
      localStorage.setItem('newsletter_prompt_' + user.id, 'done')
    } catch (e) {
      console.warn('Newsletter update failed:', e)
    } finally {
      setLoading(false)
      setAnswered(true)
      // Ferme après 2 secondes si réponse positive
      setTimeout(function() { setVisible(false) }, wantsNewsletter ? 2000 : 0)
      if (!wantsNewsletter) setVisible(false)
    }
  }

  if (!visible) return null

  return (
    // Overlay sombre derrière la modal
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(12,74,110,0.25)',
      backdropFilter: 'blur(3px)',
      zIndex: 300,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 16,
      animation: 'fadeIn 0.25s ease',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 20,
        width: '100%', maxWidth: 440,
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(14,165,233,0.2)',
        animation: 'fadeUp 0.3s ease',
      }}>

        {/* En-tête coloré */}
        <div style={{
          background: 'linear-gradient(135deg, #0ea5e9, #10b981)',
          padding: '20px 24px',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, flexShrink: 0,
          }}>
            
          </div>
          <div>
            <div style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 3,
            }}>
              Reste informé automatiquement
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
              Reçois l'actu tech dans ta boîte mail
            </div>
          </div>
        </div>

        {/* Corps de la modal */}
        <div style={{ padding: '20px 24px 24px' }}>
          {answered ? (
            // Message de confirmation
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>✅</div>
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 15, fontWeight: 700, color: '#0c4a6e', marginBottom: 6,
              }}>
                Préférence enregistrée !
              </div>
              <div style={{ fontSize: 13, color: '#7dd3fc' }}>
                Tu peux modifier ça dans tes paramètres.
              </div>
            </div>
          ) : (
            <>
              <p style={{
                fontSize: 14, color: '#0c4a6e',
                lineHeight: 1.7, marginBottom: 20,
              }}>
                Veux-tu recevoir un <strong>résumé des meilleurs articles tech</strong> tous les 2 jours directement dans ta boîte mail ?
                <br/><br/>
                Tu peux te désabonner à tout moment depuis tes paramètres.
              </p>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #0ea5e9, #10b981)',
                    border: 'none', color: '#fff',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 13, fontWeight: 700,
                    padding: '12px 0', borderRadius: 10,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                  }}
                  onClick={function() { handleChoice(true) }}
                  disabled={loading}
                >
                  {loading ? '...' : 'Oui, je veux la newsletter !'}
                </button>
                <button
                  style={{
                    flex: 1,
                    background: '#f0f9ff', border: '1px solid #bae6fd',
                    color: '#0369a1',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 13, fontWeight: 600,
                    padding: '12px 0', borderRadius: 10, cursor: 'pointer',
                  }}
                  onClick={function() { handleChoice(false) }}
                  disabled={loading}
                >
                  Non merci
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default NewsletterPrompt