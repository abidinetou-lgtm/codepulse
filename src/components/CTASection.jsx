// CTASection.jsx
// La section finale de la landing page.
// Un appel à l'action clair : "Commence maintenant."

function CTASection() {
  return (
    <section className="cta-section">

      {/* Glow décoratif derrière la carte */}
      <div className="cta-glow"></div>

      <div className="cta-card">

        {/* Ligne lumineuse en haut de la carte */}
        <div className="cta-top-line"></div>

        <h2 className="cta-title">
          Construis ta veille.<br />Maintenant.
        </h2>

        <p className="cta-sub">
          Rejoins CodePulse et ne rate plus jamais une release,
          un article clé ou une tendance qui change le jeu du dev.
        </p>

        <div className="cta-buttons">
          <button className="btn-primary">
            Commencer gratuitement
          </button>
          <button className="btn-secondary">
            Voir le code source
          </button>
        </div>

      </div>
    </section>
  )
}

export default CTASection