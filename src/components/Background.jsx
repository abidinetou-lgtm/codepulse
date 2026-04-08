// Background.jsx
// Arrière-plan animé de la landing page.
// Contient uniquement des blobs de lumière colorés
// qui dérivent lentement — effet ambiant subtil.
// Les badges flottants ont été supprimés
// pour ne pas surcharger l'interface.

function Background() {
  return (
    <div className="bg-scene">
      {/* Blob violet/bleu en haut à gauche */}
      <div className="blob blob-1"></div>
      {/* Blob vert/cyan à droite */}
      <div className="blob blob-2"></div>
      {/* Blob bleu en bas au centre */}
      <div className="blob blob-3"></div>
      {/* Blob vert discret en bas à droite */}
      <div className="blob blob-4"></div>
    </div>
  )
}

export default Background