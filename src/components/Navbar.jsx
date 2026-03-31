// Navbar.jsx mis à jour avec React Router
// Link remplace <a> pour la navigation
// sans recharger la page — c'est ça la magie
// d'une Single Page Application (SPA).

import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  // Vérifie si on est sur cette page
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
          <Link
            to="/dashboard"
            className={isActive('/dashboard') ? 'nav-link-active' : ''}
          >
            Veille
          </Link>
        </li>
        <li>
          <Link
            to="/sources"
            className={isActive('/sources') ? 'nav-link-active' : ''}
          >
            Sources
          </Link>
        </li>
        <li>
          <Link
            to="/favoris"
            className={isActive('/favoris') ? 'nav-link-active' : ''}
          >
            Favoris
          </Link>
        </li>
      </ul>

      <Link to="/dashboard">
        <button className="navbar-cta">Démarrer</button>
      </Link>
    </nav>
  )
}

export default Navbar