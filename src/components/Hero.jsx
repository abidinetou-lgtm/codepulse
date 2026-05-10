// Hero.jsx
// Composant principal de la landing page.
// Contient deux parties :
// 1. Le texte de gauche (titre, description, boutons)
// 2. L'illustration animée de droite (flux de données canvas)

import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

// ── ILLUSTRATION CANVAS ──
// Dessine un flux de données animé avec des lignes
// et des particules lumineuses qui descendent doucement.
function DataStreamIllustration() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animId
    let t = 0

    // Redimensionne le canvas en fonction de la taille réelle
    // devicePixelRatio = résolution de l'écran (retina = 2)
    function resize() {
      const rect = canvas.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      canvas.width  = rect.width  * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    // On attend que le canvas soit visible avant de resize
    const observer = new ResizeObserver(function() {
      resize()
    })
    observer.observe(canvas)
    resize()

    // ── CONFIGURATION DES FLUX ──
    // Chaque flux est une ligne verticale avec un point lumineux
    const STREAMS = [
      { x: 0.12, speed: 0.4, color: '#0ea5e9', offset: 0   },
      { x: 0.30, speed: 0.3, color: '#10b981', offset: 60  },
      { x: 0.50, speed: 0.5, color: '#0ea5e9', offset: 120 },
      { x: 0.70, speed: 0.35,color: '#10b981', offset: 40  },
      { x: 0.88, speed: 0.45,color: '#059669', offset: 90  },
    ]

    // ── PARTICULES FLOTTANTES ──
    // Petits points qui montent lentement
    const PARTICLES = Array.from({ length: 35 }, function() {
      return {
        x:       Math.random(),
        y:       Math.random(),
        size:    Math.random() * 2.5 + 0.5,
        speed:   Math.random() * 0.12 + 0.05, // très lent
        color:   Math.random() > 0.5 ? '#0ea5e9' : '#10b981',
        opacity: Math.random() * 0.5 + 0.15,
      }
    })

    // Labels des sources affichés en haut des flux
    const LABELS = [
      { xRatio: 0.50, text: 'Dev.to',      color: '#0ea5e9' },
      { xRatio: 0.88, text: 'Hacker News', color: '#059669' },
    ]

    // Mots-clés tech qui défilent au centre
    const KEYWORDS = ['React 19', 'Node.js', 'AI/ML', 'TypeScript', 'Rust', 'WebAssembly', 'GraphQL', 'Bun', 'Supabase']

    function draw() {
      const w = canvas.width  / window.devicePixelRatio
      const h = canvas.height / window.devicePixelRatio

      // Sécurité : on ne dessine pas si les dimensions sont invalides
      if (w <= 0 || h <= 0) {
        animId = requestAnimationFrame(draw)
        return
      }

      ctx.clearRect(0, 0, w, h)

      // ── LIGNES DE FLUX ──
      STREAMS.forEach(function(stream) {
        const x       = stream.x * w
        const yOffset = (t * stream.speed + stream.offset) % h

        // Ligne verticale avec dégradé de transparence
        const lineGrad = ctx.createLinearGradient(x, 0, x, h)
        lineGrad.addColorStop(0,   stream.color + '00')
        lineGrad.addColorStop(0.3, stream.color + '55')
        lineGrad.addColorStop(0.5, stream.color + '99')
        lineGrad.addColorStop(0.7, stream.color + '55')
        lineGrad.addColorStop(1,   stream.color + '00')

        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.strokeStyle = lineGrad
        ctx.lineWidth   = 1
        ctx.stroke()

        // Point lumineux principal qui descend le long de la ligne
        const py = yOffset
        const r1 = 14
        const ptGrad = ctx.createRadialGradient(x, py, 0, x, py, r1)
        ptGrad.addColorStop(0,   stream.color + 'ff')
        ptGrad.addColorStop(0.4, stream.color + '66')
        ptGrad.addColorStop(1,   stream.color + '00')
        ctx.beginPath()
        ctx.arc(x, py, r1, 0, Math.PI * 2)
        ctx.fillStyle = ptGrad
        ctx.fill()

        // Second point décalé de moitié (crée un effet de rebond)
        const py2 = (yOffset + h * 0.5) % h
        const r2  = 8
        const ptGrad2 = ctx.createRadialGradient(x, py2, 0, x, py2, r2)
        ptGrad2.addColorStop(0,   stream.color + 'aa')
        ptGrad2.addColorStop(1,   stream.color + '00')
        ctx.beginPath()
        ctx.arc(x, py2, r2, 0, Math.PI * 2)
        ctx.fillStyle = ptGrad2
        ctx.fill()
      })

      // ── PARTICULES ──
      PARTICLES.forEach(function(p) {
        // Montée très lente, repart en bas quand elle sort
        p.y -= p.speed * 0.008
        if (p.y < 0) p.y = 1

        const alpha = Math.floor(p.opacity * 255).toString(16).padStart(2, '0')
        ctx.beginPath()
        ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + alpha
        ctx.fill()
      })

      // ── LABELS SOURCES ──
      LABELS.forEach(function(label) {
        const x = label.xRatio * w
        const y = 16

        // Fond pill
        ctx.font = 'bold 10px Space Grotesk, sans-serif'
        const tw   = ctx.measureText(label.text).width + 18
        const th   = 20

        ctx.fillStyle   = label.color + '18'
        ctx.strokeStyle = label.color + '44'
        ctx.lineWidth   = 1
        ctx.beginPath()
        ctx.roundRect(x - tw / 2, y - th / 2, tw, th, 10)
        ctx.fill()
        ctx.stroke()

        ctx.fillStyle   = label.color
        ctx.textAlign   = 'center'
        ctx.textBaseline= 'middle'
        ctx.fillText(label.text, x, y)
      })

      // ── MOT-CLÉ CENTRAL ANIMÉ ──
      // Change toutes les 3 secondes (180 frames à 60fps)
      const kwIndex = Math.floor(t / 180) % KEYWORDS.length
      const alpha   = Math.abs(Math.sin(t / 180 * Math.PI))

      ctx.font        = 'bold 12px Space Grotesk, sans-serif'
      ctx.textAlign   = 'center'
      ctx.textBaseline= 'middle'
      ctx.fillStyle   = `rgba(14,165,233,${alpha * 0.65})`
      ctx.fillText('⚡ ' + KEYWORDS[kwIndex], w / 2, h / 2)

      t += 1
      animId = requestAnimationFrame(draw)
    }

    draw()

    // Nettoyage quand le composant est démonté
    return function() {
      cancelAnimationFrame(animId)
      observer.disconnect()
    }
  }, [])

  return (
    <div style={{
      width: '100%', height: '380px',
      borderRadius: '20px', overflow: 'hidden',
      border: '1px solid #bae6fd',
      background: 'linear-gradient(160deg, #f0f9ff 0%, #ecfdf5 100%)',
      position: 'relative',
      boxShadow: '0 8px 32px rgba(14,165,233,0.1)',
    }}>
      <canvas
        ref={canvasRef}
        style={{ width:'100%', height:'100%', display:'block' }}
      />

      {/* Badges d'info en bas de l'illustration */}
      <div style={{
        position:'absolute', bottom:14, left:14, right:14,
        display:'flex', gap:8, flexWrap:'wrap',
      }}>
        {[
          { label:'⚡ Live',       color:'#0ea5e9' },
          { label:'3 sources',     color:'#10b981' },
          { label:'Auto-refresh',  color:'#059669' },
        ].map(function(item) {
          return (
            <span key={item.label} style={{
              background:    'rgba(255,255,255,0.85)',
              border:        `1px solid ${item.color}30`,
              color:         item.color,
              fontFamily:    'Space Grotesk, sans-serif',
              fontSize:      11, fontWeight:700,
              padding:       '4px 10px', borderRadius:100,
              backdropFilter:'blur(8px)',
            }}>
              {item.label}
            </span>
          )
        })}
      </div>
    </div>
  )
}

// ── COMPOSANT HERO ──
// Section principale de la landing page.
function Hero() {
  return (
    <section className="hero">

      {/* Colonne gauche : texte + boutons */}
      <div className="hero-left">

        {/* Badge "Veille technologique" */}
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          Veille technologique
        </div>

        {/* Titre principal en 3 lignes */}
        <h1 className="hero-title">
          <span className="hero-title-line line-1">Pulse sur</span>
          <span className="hero-title-line line-2">l'actu dev</span>
          <span className="hero-title-line line-3">en temps réel.</span>
        </h1>

        {/* Description courte */}
        <p className="hero-desc">
          CodePulse agrège <strong>Dev.to, Hacker News et Tech News</strong> pour
          te donner une veille tech centralisée — JS, React, IA, Node.js —
          tout au même endroit.
        </p>

        {/* Boutons d'action */}
        <div className="hero-buttons">
          <Link to="/dashboard">
            <button className="btn-primary">Explorer la veille</button>
          </Link>
          <Link to="/sources">
            <button className="btn-secondary">Voir les sources</button>
          </Link>
        </div>

      </div>

      {/* Colonne droite : illustration canvas */}
      <div className="hero-right">
        <DataStreamIllustration />
      </div>

    </section>
  )
}

export default Hero