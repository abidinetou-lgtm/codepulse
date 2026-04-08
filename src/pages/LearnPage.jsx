import { useState } from 'react'
import '../styles/LearnPage.css'

const LESSONS = {
  html: [
    {
      id: 'html-1',
      title: 'Introduction au HTML',
      level: 'Débutant',
      content: `Le HTML (HyperText Markup Language) est le langage de base du web.
Il structure le contenu d'une page avec des balises.`,
      example: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <title>Ma première page</title>
  </head>
  <body>
    <h1>Bonjour le monde !</h1>
    <p>Ceci est un paragraphe.</p>
  </body>
</html>`,
      exercise: 'Crée une page avec un titre h1 et deux paragraphes.',
    },
    {
      id: 'html-2',
      title: 'Les balises de texte',
      level: 'Débutant',
      content: `HTML propose plusieurs balises pour structurer le texte :
h1 à h6 pour les titres, p pour les paragraphes, strong pour le gras, em pour l'italique.`,
      example: `<h1>Titre principal</h1>
<h2>Sous-titre</h2>
<p>Un paragraphe avec du texte <strong>en gras</strong> et <em>en italique</em>.</p>`,
      exercise: 'Crée une page avec des titres de niveau 1 à 3 et un paragraphe.',
    },
    {
      id: 'html-3',
      title: 'Les liens et images',
      level: 'Débutant',
      content: `La balise a crée des liens. img insère des images.
L'attribut href définit la destination du lien. src définit la source de l'image.`,
      example: `<a href="https://google.com">Aller sur Google</a>

<img src="photo.jpg" alt="Description de l'image" />`,
      exercise: 'Crée un lien vers ton site préféré et une image avec une description.',
    },
    {
      id: 'html-4',
      title: 'Les listes',
      level: 'Intermédiaire',
      content: `ul crée une liste non ordonnée (à puces), ol une liste ordonnée (numérotée).
Chaque élément de liste utilise la balise li.`,
      example: `<ul>
  <li>React</li>
  <li>Vue.js</li>
  <li>Angular</li>
</ul>

<ol>
  <li>Apprendre HTML</li>
  <li>Apprendre CSS</li>
  <li>Apprendre JavaScript</li>
</ol>`,
      exercise: 'Crée une liste de tes 3 technologies préférées.',
    },
    {
      id: 'html-5',
      title: 'Les formulaires',
      level: 'Intermédiaire',
      content: `Les formulaires permettent à l'utilisateur d'entrer des données.
form, input, textarea, button sont les balises principales.`,
      example: `<form>
  <label for="nom">Ton nom :</label>
  <input type="text" id="nom" placeholder="Jean Dupont" />

  <label for="email">Email :</label>
  <input type="email" id="email" placeholder="jean@exemple.com" />

  <button type="submit">Envoyer</button>
</form>`,
      exercise: 'Crée un formulaire de contact avec nom, email et message.',
    },
  ],
  css: [
    {
      id: 'css-1',
      title: 'Introduction au CSS',
      level: 'Débutant',
      content: `Le CSS (Cascading Style Sheets) permet de styliser le HTML.
On sélectionne des éléments et on leur applique des propriétés.`,
      example: `/* Sélecteur { propriété: valeur; } */

h1 {
  color: blue;
  font-size: 32px;
}

p {
  color: #333;
  line-height: 1.6;
}`,
      exercise: 'Change la couleur et la taille de ton titre h1.',
    },
    {
      id: 'css-2',
      title: 'Le modèle de boîte',
      level: 'Débutant',
      content: `Chaque élément HTML est une boîte.
Elle a un contenu, un padding (intérieur), une border (bordure), et un margin (extérieur).`,
      example: `.carte {
  width: 300px;
  padding: 20px;
  border: 2px solid #0ea5e9;
  margin: 16px;
  border-radius: 10px;
  background: #f0f9ff;
}`,
      exercise: 'Crée une carte avec padding, border et border-radius.',
    },
    {
      id: 'css-3',
      title: 'Flexbox',
      level: 'Intermédiaire',
      content: `Flexbox permet d'aligner et distribuer des éléments dans un conteneur.
display: flex active le mode flexbox sur le parent.`,
      example: `.conteneur {
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
}

.enfant {
  flex: 1;
  padding: 20px;
  background: #e0f2fe;
}`,
      exercise: 'Aligne 3 cartes côte à côte avec flexbox.',
    },
    {
      id: 'css-4',
      title: 'CSS Grid',
      level: 'Intermédiaire',
      content: `Grid est le système le plus puissant pour créer des mises en page 2D.
On définit des colonnes et des rangées.`,
      example: `.grille {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* Sur mobile */
@media (max-width: 768px) {
  .grille {
    grid-template-columns: 1fr;
  }
}`,
      exercise: 'Crée une grille de 3 colonnes qui passe à 1 sur mobile.',
    },
    {
      id: 'css-5',
      title: 'Les animations CSS',
      level: 'Avancé',
      content: `CSS permet de créer des animations avec @keyframes et la propriété animation.
transition permet aussi des effets fluides sur les changements de propriétés.`,
      example: `@keyframes apparition {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.element {
  animation: apparition 0.5s ease both;
}

.bouton {
  transition: all 0.2s ease;
}
.bouton:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}`,
      exercise: 'Ajoute une animation d\'apparition à une carte.',
    },
  ],
  js: [
    {
      id: 'js-1',
      title: 'Introduction au JavaScript',
      level: 'Débutant',
      content: `JavaScript est le langage de programmation du web.
Il rend les pages interactives. On peut le mettre dans une balise script.`,
      example: `// Afficher un message
console.log("Bonjour !")

// Stocker une valeur
const nom = "Jimel"
let age = 22

// Afficher dans la page
document.getElementById("titre").textContent = "Salut " + nom`,
      exercise: 'Déclare une variable avec ton prénom et affiche-la dans la console.',
    },
    {
      id: 'js-2',
      title: 'Les fonctions',
      level: 'Débutant',
      content: `Une fonction est un bloc de code réutilisable.
On la déclare avec function ou avec la syntaxe fléchée =>.`,
      example: `// Fonction classique
function saluer(prenom) {
  return "Bonjour " + prenom + " !"
}

// Fonction fléchée
const additionner = (a, b) => a + b

// Utilisation
console.log(saluer("Jimel"))   // "Bonjour Jimel !"
console.log(additionner(3, 4)) // 7`,
      exercise: 'Crée une fonction qui calcule le carré d\'un nombre.',
    },
    {
      id: 'js-3',
      title: 'Manipuler le DOM',
      level: 'Intermédiaire',
      content: `Le DOM est la représentation JS de la page HTML.
document.querySelector() permet de sélectionner un élément et de le modifier.`,
      example: `// Sélectionner un élément
const titre = document.querySelector("h1")
const bouton = document.querySelector("#mon-bouton")

// Modifier son contenu
titre.textContent = "Nouveau titre !"
titre.style.color = "blue"

// Réagir à un clic
bouton.addEventListener("click", function() {
  alert("Tu as cliqué !")
})`,
      exercise: 'Crée un bouton qui change la couleur d\'un titre au clic.',
    },
    {
      id: 'js-4',
      title: 'Les tableaux',
      level: 'Intermédiaire',
      content: `Les tableaux stockent plusieurs valeurs. On les manipule avec map, filter, forEach.
Ce sont les méthodes les plus utilisées en JavaScript moderne.`,
      example: `const langages = ["HTML", "CSS", "JavaScript", "React"]

// Parcourir
langages.forEach(lang => console.log(lang))

// Transformer
const majuscules = langages.map(lang => lang.toUpperCase())

// Filtrer
const longs = langages.filter(lang => lang.length > 3)

console.log(longs) // ["HTML", "JavaScript", "React"]`,
      exercise: 'Filtre une liste de nombres pour ne garder que ceux supérieurs à 10.',
    },
    {
      id: 'js-5',
      title: 'Fetch et APIs',
      level: 'Avancé',
      content: `fetch() permet d'appeler des APIs pour récupérer des données.
C'est asynchrone — on utilise async/await pour attendre la réponse.`,
      example: `async function getArticles() {
  try {
    const response = await fetch("https://dev.to/api/articles?tag=javascript")
    const articles = await response.json()

    articles.forEach(article => {
      console.log(article.title)
    })
  } catch (error) {
    console.error("Erreur :", error)
  }
}

getArticles()`,
      exercise: 'Fetch les articles Dev.to et affiche leurs titres dans la console.',
    },
  ],
}

const TOPICS = [
  { key: 'html', label: 'HTML', color: '#b45309', bg: '#fef3c7', icon: '<>' },
  { key: 'css',  label: 'CSS',  color: '#0369a1', bg: '#e0f2fe', icon: '#'  },
  { key: 'js',   label: 'JS',   color: '#15803d', bg: '#dcfce7', icon: 'JS' },
]

function LessonCard({ lesson, isActive, onClick }) {
  const levelColor = {
    'Débutant':     { color:'#15803d', bg:'#dcfce7' },
    'Intermédiaire':{ color:'#b45309', bg:'#fef3c7' },
    'Avancé':       { color:'#0369a1', bg:'#e0f2fe' },
  }[lesson.level] || { color:'#0369a1', bg:'#e0f2fe' }

  return (
    <div
      className={'learn-lesson-card' + (isActive ? ' learn-lesson-active' : '')}
      onClick={onClick}
    >
      <span className="learn-lesson-level" style={{ color: levelColor.color, background: levelColor.bg }}>
        {lesson.level}
      </span>
      <p className="learn-lesson-title">{lesson.title}</p>
    </div>
  )
}

function LearnPage() {
  const [activeTopic,  setActiveTopic]  = useState('html')
  const [activeLesson, setActiveLesson] = useState(LESSONS.html[0])
  const [code,         setCode]         = useState(LESSONS.html[0].example)
  const [preview,      setPreview]      = useState('')
  const [tab,          setTab]          = useState('lesson')

  function selectLesson(lesson) {
    setActiveLesson(lesson)
    setCode(lesson.example)
    setPreview('')
    setTab('lesson')
  }

  function selectTopic(topicKey) {
    setActiveTopic(topicKey)
    const firstLesson = LESSONS[topicKey][0]
    setActiveLesson(firstLesson)
    setCode(firstLesson.example)
    setPreview('')
    setTab('lesson')
  }

  function runCode() {
    if (activeTopic === 'html') {
      setPreview(code)
    } else if (activeTopic === 'css') {
      setPreview(`<style>${code}</style><div class="demo"><h2>Titre exemple</h2><p>Paragraphe exemple pour voir le CSS en action.</p><div class="carte">Une carte</div><button class="bouton">Un bouton</button></div>`)
    } else {
      setPreview(`<script>
try {
  ${code.replace(/console\.log/g, 'document.write')}
} catch(e) {
  document.write('<p style="color:red">Erreur: ' + e.message + '</p>')
}
<\/script>`)
    }
    setTab('preview')
  }

  const currentTopic = TOPICS.find(function(t) { return t.key === activeTopic })

  return (
    <div className="learn-page">

      <div className="learn-hero" style={{ background: `linear-gradient(135deg, ${currentTopic.color}, var(--blue))` }}>
        <div className="learn-hero-inner">
          <div>
            <div className="learn-hero-label">Guide interactif</div>
            <h1 className="learn-hero-title">Apprendre le Web</h1>
            <p className="learn-hero-sub">HTML, CSS, JavaScript — les bases pour construire des sites web</p>
          </div>
          <div className="learn-topics">
            {TOPICS.map(function(topic) {
              return (
                <button
                  key={topic.key}
                  className={'learn-topic-btn' + (activeTopic === topic.key ? ' learn-topic-active' : '')}
                  onClick={function() { selectTopic(topic.key) }}
                  style={activeTopic === topic.key ? { background: '#fff', color: topic.color } : {}}
                >
                  <span className="learn-topic-icon">{topic.icon}</span>
                  {topic.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="learn-layout">

        <aside className="learn-sidebar">
          <div className="learn-sidebar-title">
            {currentTopic.label} — Leçons
          </div>
          {LESSONS[activeTopic].map(function(lesson) {
            return (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                isActive={activeLesson.id === lesson.id}
                onClick={function() { selectLesson(lesson) }}
              />
            )
          })}
        </aside>

        <main className="learn-main">

          <div className="learn-tabs">
            <button
              className={'learn-tab' + (tab === 'lesson' ? ' learn-tab-active' : '')}
              onClick={function() { setTab('lesson') }}
            >
              Leçon
            </button>
            <button
              className={'learn-tab' + (tab === 'code' ? ' learn-tab-active' : '')}
              onClick={function() { setTab('code') }}
            >
              Éditeur
            </button>
            <button
              className={'learn-tab' + (tab === 'preview' ? ' learn-tab-active' : '')}
              onClick={function() { setTab('preview') }}
            >
              Aperçu
            </button>
          </div>

          {tab === 'lesson' && (
            <div className="learn-content">
              <div className="learn-content-header">
                <span className="learn-content-topic" style={{ color: currentTopic.color, background: currentTopic.bg }}>
                  {currentTopic.label}
                </span>
                <h2 className="learn-content-title">{activeLesson.title}</h2>
              </div>
              <p className="learn-content-text">{activeLesson.content}</p>
              <div className="learn-content-example">
                <div className="learn-example-header">
                  <span>Exemple</span>
                  <button className="learn-run-btn" onClick={function() { setTab('code'); }}>
                    Modifier le code
                  </button>
                </div>
                <pre className="learn-code-block"><code>{activeLesson.example}</code></pre>
              </div>
              <div className="learn-exercise">
                <div className="learn-exercise-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Exercice
                </div>
                <p className="learn-exercise-text">{activeLesson.exercise}</p>
                <button className="learn-try-btn" onClick={function() { setTab('code') }}>
                  Essayer dans l'éditeur
                </button>
              </div>
            </div>
          )}

          {tab === 'code' && (
            <div className="learn-editor">
              <div className="learn-editor-header">
                <span className="learn-editor-lang" style={{ color: currentTopic.color }}>
                  {currentTopic.label}
                </span>
                <button className="learn-run-btn learn-run-primary" onClick={runCode}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Exécuter
                </button>
              </div>
              <textarea
                className="learn-textarea"
                value={code}
                onChange={function(e) { setCode(e.target.value) }}
                spellCheck={false}
              />
            </div>
          )}

          {tab === 'preview' && (
            <div className="learn-preview">
              <div className="learn-preview-header">
                <span>Résultat</span>
                <button className="learn-run-btn" onClick={function() { setTab('code') }}>
                  Retour à l'éditeur
                </button>
              </div>
              {preview
                ? <iframe
                    srcDoc={preview}
                    className="learn-iframe"
                    title="preview"
                    sandbox="allow-scripts"
                  />
                : <div className="learn-preview-empty">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#bae6fd" strokeWidth="1.5">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <p>Clique sur "Exécuter" pour voir le résultat</p>
                  </div>
              }
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default LearnPage