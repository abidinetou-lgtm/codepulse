// Navbar.jsx
// Barre de navigation principale.
// Contient : logo, liens, boutons auth, menu profil déroulant.
// Sur mobile : les liens disparaissent, un menu hamburger les remplace.

import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const location                        = useLocation()
  const { user, isLoggedIn, signOut }   = useAuth()
  const [menuOpen,    setMenuOpen]      = useState(false)
  const [profileOpen, setProfileOpen]   = useState(false)
  const profileRef                      = useRef(null)

  function isActive(path) { return location.pathname === path }

  // Ferme le menu profil si on clique en dehors
  useEffect(function() {
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return function() { document.removeEventListener('mousedown', handleClick) }
  }, [])

  // Initiales de l'utilisateur pour l'avatar
  const initials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map(function(n) { return n[0] }).join('').slice(0,2).toUpperCase()
    : user?.email?.[0]?.toUpperCase() || '?'

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0]

  return (
    <nav className="navbar">

      {/* Logo */}
      <Link to="/" className="navbar-logo">
        CodePulse
        <span className="navbar-logo-dot"></span>
      </Link>

      {/* Liens desktop */}
      <ul className="navbar-links">
        <li><Link to="/dashboard"  className={isActive('/dashboard')  ? 'nav-link-active' : ''}>Veille</Link></li>
        <li><Link to="/sources"    className={isActive('/sources')    ? 'nav-link-active' : ''}>Sources</Link></li>
        <li><Link to="/favoris"    className={isActive('/favoris')    ? 'nav-link-active' : ''}>Favoris</Link></li>
        <li><Link to="/apprendre"  className={isActive('/apprendre')  ? 'nav-link-active' : ''}>Apprendre</Link></li>
      </ul>

      {/* Partie droite */}
      <div className="navbar-right">

        {isLoggedIn ? (
          // Menu profil
          <div className="navbar-profile" ref={profileRef}>
            <button
              className="navbar-profile-btn"
              onClick={function() { setProfileOpen(!profileOpen) }}
            >
              {user?.user_metadata?.avatar_url
                ? <img src={user.user_metadata.avatar_url} alt="avatar" className="navbar-avatar"/>
                : <div className="navbar-avatar-initials">{initials}</div>
              }
              <span className="navbar-username">{firstName}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {/* Menu déroulant profil */}
            {profileOpen && (
              <div className="profile-dropdown">

                {/* En-tête avec infos utilisateur */}
                <div className="pd-header">
                  {user?.user_metadata?.avatar_url
                    ? <img src={user.user_metadata.avatar_url} alt="avatar" className="pd-avatar"/>
                    : <div className="pd-avatar pd-avatar-initials">{initials}</div>
                  }
                  <div>
                    <div className="pd-name">{user?.user_metadata?.full_name || firstName}</div>
                    <div className="pd-email">{user?.email}</div>
                    <span className="pd-badge">
                      {user?.app_metadata?.provider === 'google' ? '✓ Google' : '✓ Email'}
                    </span>
                  </div>
                </div>

                {/* Liens du menu */}
                <div className="pd-body">
                  <Link to="/favoris" className="pd-item" onClick={function() { setProfileOpen(false) }}>
                    <div className="pd-item-icon" style={{ background:'#e0f2fe' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="pd-item-text">Mes favoris</div>
                      <div className="pd-item-sub">Articles sauvegardés</div>
                    </div>
                  </Link>

                  <Link to="/apprendre" className="pd-item" onClick={function() { setProfileOpen(false) }}>
                    <div className="pd-item-icon" style={{ background:'#dcfce7' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="pd-item-text">Apprendre</div>
                      <div className="pd-item-sub">HTML, CSS, JavaScript</div>
                    </div>
                  </Link>

                  <div className="pd-divider"/>

                  <button className="pd-logout" onClick={function() { signOut(); setProfileOpen(false) }}>
                    <div className="pd-item-icon" style={{ background:'#fef2f2' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                    </div>
                    <span className="pd-item-text" style={{ color:'#ef4444' }}>Déconnexion</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="navbar-auth-btns">
            <Link to="/login?mode=login">
              <button className="navbar-login-btn">Se connecter</button>
            </Link>
            <Link to="/login?mode=signup">
              <button className="navbar-cta">S'inscrire</button>
            </Link>
          </div>
        )}

        {/* Bouton hamburger mobile */}
        <button
          className="navbar-hamburger"
          onClick={function() { setMenuOpen(!menuOpen) }}
          aria-label="Menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <div className="navbar-mobile-menu">
          <Link to="/dashboard" onClick={function() { setMenuOpen(false) }}
            className={isActive('/dashboard') ? 'mobile-link-active' : ''}>
            Veille
          </Link>
          <Link to="/sources" onClick={function() { setMenuOpen(false) }}
            className={isActive('/sources') ? 'mobile-link-active' : ''}>
            Sources
          </Link>
          <Link to="/favoris" onClick={function() { setMenuOpen(false) }}
            className={isActive('/favoris') ? 'mobile-link-active' : ''}>
            Favoris
          </Link>
          <Link to="/apprendre" onClick={function() { setMenuOpen(false) }}
            className={isActive('/apprendre') ? 'mobile-link-active' : ''}>
            Apprendre
          </Link>
          {!isLoggedIn && (
            <div className="mobile-auth">
              <Link to="/login?mode=login" onClick={function() { setMenuOpen(false) }}>
                <button className="navbar-login-btn" style={{ width:'100%' }}>Se connecter</button>
              </Link>
              <Link to="/login?mode=signup" onClick={function() { setMenuOpen(false) }}>
                <button className="navbar-cta" style={{ width:'100%' }}>S'inscrire</button>
              </Link>
            </div>
          )}
        </div>
      )}

    </nav>
  )
}

export default Navbar