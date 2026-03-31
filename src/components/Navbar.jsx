// Navbar.jsx
// Ce composant affiche la barre de navigation
// en haut de toutes les pages de l'app.

function Navbar() {
  return (
    <nav className="navbar">

      {/* ── LOGO ── */}
      <div className="navbar-logo">
        CodePulse
        <span className="navbar-logo-dot"></span>
      </div>

      {/* ── LIENS ── */}
      <ul className="navbar-links">
        <li><a href="#">Veille</a></li>
        <li><a href="#">Sources</a></li>
        <li><a href="#">Favoris</a></li>
      </ul>

      {/* ── BOUTON ── */}
      <button className="navbar-cta">
        Démarrer
      </button>

    </nav>
  )
}

export default Navbar