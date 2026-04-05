import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const location = useLocation()
  const { user, isLoggedIn, signOut } = useAuth()

  function isActive(path) {
    return location.pathname === path
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        CodePulse
        <span className="navbar-logo-dot"></span>
      </Link>

      <ul className="navbar-links">
        <li>
          <Link to="/dashboard"
            className={isActive('/dashboard') ? 'nav-link-active' : ''}>
            Veille
          </Link>
        </li>
        <li>
          <Link to="/sources"
            className={isActive('/sources') ? 'nav-link-active' : ''}>
            Sources
          </Link>
        </li>
        <li>
          <Link to="/favoris"
            className={isActive('/favoris') ? 'nav-link-active' : ''}>
            Favoris
          </Link>
        </li>
      </ul>

      {/* Partie droite — connecté ou pas */}
      {isLoggedIn ? (
        <div className="navbar-user">
          {user?.user_metadata?.avatar_url && (
            <img
              src={user.user_metadata.avatar_url}
              alt="avatar"
              className="navbar-avatar"
            />
          )}
          <span className="navbar-username">
            {user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0]}
          </span>
          <button className="navbar-signout" onClick={signOut}>
            Déconnexion
          </button>
        </div>
      ) : (
        <Link to="/login">
          <button className="navbar-cta">Se connecter</button>
        </Link>
      )}
    </nav>
  )
}

export default Navbar