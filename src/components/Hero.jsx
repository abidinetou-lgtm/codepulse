import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

function DataStreamIllustration() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let t = 0

    function resize() {
      canvas.width  = canvas.offsetWidth  * devicePixelRatio
      canvas.height = canvas.offsetHeight * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
    resize()

    const W = () => canvas.offsetWidth
    const H = () => canvas.offsetHeight

    const STREAMS = [
      { x: 0.15, speed: 1.2, color: '#0ea5e9', offset: 0   },
      { x: 0.32, speed: 0.8, color: '#10b981', offset: 20  },
      { x: 0.50, speed: 1.5, color: '#0ea5e9', offset: 40  },
      { x: 0.68, speed: 1.0, color: '#10b981', offset: 10  },
      { x: 0.85, speed: 1.3, color: '#059669', offset: 30  },
    ]

    const PARTICLES = Array.from({ length: 40 }, function(_, i) {
      return {
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.4 + 0.2,
        color: i % 2 === 0 ? '#0ea5e9' : '#10b981',
        opacity: Math.random() * 0.6 + 0.2,
      }
    })

    const LABELS = [
      { x: 0.15, label: 'GitHub',      color: '#10b981' },
      { x: 0.50, label: 'Dev.to',      color: '#0ea5e9' },
      { x: 0.85, label: 'Hacker News', color: '#059669' },
    ]

    function draw() {
      const w = W(), h = H()
      ctx.clearRect(0, 0, w, h)

      // Fond dégradé léger
      const bg = ctx.createLinearGradient(0, 0, 0, h)
      bg.addColorStop(0, 'rgba(240,249,255,0)')
      bg.addColorStop(1, 'rgba(240,249,255,0)')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      // Lignes de flux animées
      STREAMS.forEach(function(stream) {
        const x = stream.x * w
        const yOffset = (t * stream.speed + stream.offset) % h

        const grad = ctx.createLinearGradient(x, 0, x, h)
        grad.addColorStop(0,   stream.color + '00')
        grad.addColorStop(0.3, stream.color + 'cc')
        grad.addColorStop(0.5, stream.color + 'ff')
        grad.addColorStop(0.7, stream.color + 'cc')
        grad.addColorStop(1,   stream.color + '00')

        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Point brillant qui descend
        const py = yOffset
        const ptGrad = ctx.createRadialGradient(x, py, 0, x, py, 12)
        ptGrad.addColorStop(0, stream.color + 'ff')
        ptGrad.addColorStop(0.5, stream.color + '88')
        ptGrad.addColorStop(1, stream.color + '00')
        ctx.beginPath()
        ctx.arc(x, py, 12, 0, Math.PI * 2)
        ctx.fillStyle = ptGrad
        ctx.fill()

        // Deuxième point décalé
        const py2 = (yOffset + h * 0.5) % h
        const ptGrad2 = ctx.createRadialGradient(x, py2, 0, x, py2, 8)
        ptGrad2.addColorStop(0, stream.color + 'aa')
        ptGrad2.addColorStop(1, stream.color + '00')
        ctx.beginPath()
        ctx.arc(x, py2, 8, 0, Math.PI * 2)
        ctx.fillStyle = ptGrad2
        ctx.fill()
      })

      // Particules flottantes
      PARTICLES.forEach(function(p) {
        p.y -= p.speed * 0.3
        if (p.y < 0) p.y = 1
        ctx.beginPath()
        ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0')
        ctx.fill()
      })

      // Labels sources
      LABELS.forEach(function(label) {
        const x = label.x * w
        const y = 20

        ctx.font = 'bold 10px Space Grotesk, sans-serif'
        ctx.fillStyle = label.color
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        const textW = ctx.measureText(label.label).width + 16
        ctx.fillStyle = label.color + '15'
        ctx.beginPath()
        ctx.roundRect(x - textW / 2, y - 10, textW, 20, 10)
        ctx.fill()
        ctx.strokeStyle = label.color + '40'
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.fillStyle = label.color
        ctx.fillText(label.label, x, y)
      })

      // Données simulées qui défilent
      const dataItems = ['React 19', 'Node.js', 'AI/ML', 'TypeScript', 'Rust', 'WebAssembly', 'GraphQL']
      const itemIndex = Math.floor(t / 60) % dataItems.length
      const alpha = Math.abs(Math.sin(t / 60 * Math.PI))

      ctx.font = '11px Space Grotesk, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillStyle = `rgba(14,165,233,${alpha * 0.7})`
      ctx.fillText('⚡ ' + dataItems[itemIndex], w / 2, h / 2)

      t += 0.8
      animId = requestAnimationFrame(draw)
    }

    draw()
    return function() { cancelAnimationFrame(animId) }
  }, [])

  return (
    <div style={{
      width: '100%',
      height: '380px',
      borderRadius: '20px',
      overflow: 'hidden',
      border: '1px solid #bae6fd',
      background: 'linear-gradient(135deg, #f0f9ff, #ecfdf5)',
      position: 'relative',
      boxShadow: '0 8px 32px rgba(14,165,233,0.12)',
    }}>
      <canvas
        ref={canvasRef}
        style={{ width:'100%', height:'100%', display:'block' }}
      />
      {/* Overlay infos */}
      <div style={{
        position: 'absolute',
        bottom: 16, left: 16, right: 16,
        display: 'flex', gap: 8, flexWrap: 'wrap',
      }}>
        {[
          { label: '⚡ Live', color: '#0ea5e9' },
          { label: '3 sources', color: '#10b981' },
          { label: 'Auto-refresh', color: '#059669' },
        ].map(function(item) {
          return (
            <span key={item.label} style={{
              background: 'rgba(255,255,255,0.85)',
              border: `1px solid ${item.color}30`,
              color: item.color,
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 11, fontWeight: 700,
              padding: '4px 10px', borderRadius: 100,
              backdropFilter: 'blur(8px)',
            }}>
              {item.label}
            </span>
          )
        })}
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          Veille technologique
        </div>
        <h1 className="hero-title">
          <span className="hero-title-line line-1">Pulse sur</span>
          <span className="hero-title-line line-2">l'actu dev</span>
          <span className="hero-title-line line-3">en temps réel.</span>
        </h1>
        <p className="hero-desc">
          CodePulse agrège <strong>GitHub, Dev.to, et Hacker News</strong> pour
          te donner une veille tech centralisée — JS, React, IA, Node.js —
          tout au même endroit.
        </p>
        <div className="hero-buttons">
          <Link to="/dashboard">
            <button className="btn-primary">Explorer la veille</button>
          </Link>
          <Link to="/sources">
            <button className="btn-secondary">Voir les sources</button>
          </Link>
        </div>
      </div>
      <div className="hero-right">
        <DataStreamIllustration />
      </div>
    </section>
  )
}

export default Hero