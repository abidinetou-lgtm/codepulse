# CodePulse 🚀

**Agrégateur d'actualités tech en temps réel** — Dev.to, Hacker News et sources médias mondiales centralisés dans une interface moderne et responsive.

🌐 **Demo live** → [codepulse-rouge.vercel.app](https://codepulse-rouge.vercel.app)
🔧 **Backend** → [codepulse-api sur Render](https://codepulse-api-umun.onrender.com/api/health)

---

## Présentation

CodePulse est parti d'un script d'automatisation basique et a évolué en une vraie application web full-stack déployée en production. Le but : centraliser la veille tech au même endroit sans jongler entre 5 onglets.

### Fonctionnalités

- 📡 **Flux en temps réel** — Dev.to, Hacker News, Tech News (NewsAPI)
- 🔍 **Filtres intelligents** — par source et par technologie (#react, #ai, #node...)
- ❤️ **Favoris persistants** — sauvegardés en base PostgreSQL avec RLS
- 🔐 **Auth sans mot de passe** — Google OAuth + Magic Link email
- 📬 **Newsletter opt-in** — résumé tous les 2 jours
- 📚 **Guide interactif** — apprendre HTML, CSS, JavaScript dans l'app
- 🍪 **Cookie banner RGPD** — consentement conforme
- 📱 **Responsive** — mobile, tablette et desktop
- ⚡ **Barre de filtres dynamique** — devient flottante et compacte au scroll

---

## Stack technique

| Couche | Technologies |
|---|---|
| **Framework** | React 19 |
| **Routing** | React Router v6 |
| **State** | Context API + Hooks personnalisés |
| **Auth & DB** | Supabase (PostgreSQL + Auth) |
| **Styling** | CSS3 custom — zéro librairie UI |
| **Build** | Vite |
| **Déploiement** | Vercel (CI/CD automatique via GitHub) |

---

## Structure du projet

```
codepulse/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation + menu profil déroulant
│   │   ├── Hero.jsx            # Landing page avec animation canvas
│   │   ├── NewsSection.jsx     # Cartes d'actu en scroll horizontal
│   │   ├── ArticleDrawer.jsx   # Panneau latéral article
│   │   ├── Background.jsx      # Arrière-plan animé (blobs)
│   │   ├── Footer.jsx          # Pied de page avec contact
│   │   ├── NewsletterPrompt.jsx# Modal newsletter post-connexion
│   │   └── CookieBanner.jsx    # Bannière RGPD
│   ├── pages/
│   │   ├── Dashboard.jsx       # Page veille (grille d'articles)
│   │   ├── Favorites.jsx       # Favoris sauvegardés
│   │   ├── Sources.jsx         # Sources disponibles
│   │   ├── Login.jsx           # Connexion / Inscription
│   │   ├── LearnPage.jsx       # Guide interactif HTML/CSS/JS
│   │   └── AuthCallback.jsx    # Redirect après OAuth
│   ├── context/
│   │   ├── AuthContext.jsx     # État global authentification
│   │   └── FavoritesContext.jsx# État global favoris
│   ├── hooks/
│   │   └── useArticles.js      # Hook fetch des articles (3 sources)
│   ├── lib/
│   │   └── supabase.js         # Client Supabase
│   ├── styles/                 # CSS séparé par composant
│   ├── App.jsx                 # Composant racine + routes
│   ├── main.jsx                # Point d'entrée React
│   └── index.css               # Variables CSS globales
├── vercel.json                 # Rewrites pour React Router
├── index.html
└── package.json
```

---

## Installation locale

### Prérequis
- Node.js v18+
- Un compte [Supabase](https://supabase.com) (gratuit)
- Une clé [NewsAPI](https://newsapi.org) (gratuite — 100 req/jour)

### 1. Cloner le repo

```bash
git clone https://github.com/abidinetou-lgtm/codepulse.git
cd codepulse
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Crée un fichier `.env.local` à la racine :

```env
VITE_API_URL=http://localhost:3001/api
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

### 4. Démarrer

```bash
npm run dev
# → http://localhost:5173
```

---

## Variables d'environnement

| Variable | Description | Obligatoire |
|---|---|---|
| `VITE_API_URL` | URL du backend Express | ✅ |
| `VITE_SUPABASE_URL` | URL de ton projet Supabase | ✅ |
| `VITE_SUPABASE_ANON_KEY` | Clé publique Supabase | ✅ |

> ⚠️ Ne jamais commiter le fichier `.env.local` — il est dans `.gitignore`

---

## Déploiement Vercel

Le déploiement est automatique à chaque `git push` sur `main`.

```bash
git add .
git commit -m "feat: ma modification"
git push origin main
# → Vercel détecte le push et redéploie automatiquement
```

Le fichier `vercel.json` configure les rewrites pour que React Router fonctionne correctement sur Vercel :

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Base de données Supabase

Tables créées :

```sql
-- Profils utilisateurs (créé automatiquement à l'inscription)
CREATE TABLE profiles (
  id                 uuid PRIMARY KEY,
  email              text,
  full_name          text,
  avatar_url         text,
  newsletter_enabled boolean DEFAULT false
);

-- Favoris (protégés par Row Level Security)
CREATE TABLE favorites (
  id          uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id     uuid REFERENCES profiles(id),
  article_id  text,
  title       text,
  url         text,
  source      text,
  cover       text,
  created_at  timestamp DEFAULT now()
);

-- RLS : chaque utilisateur accède uniquement à ses propres données
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
```

---

## Sécurité

- ✅ Aucun secret dans le code source
- ✅ `.env` dans `.gitignore`
- ✅ RLS Supabase sur toutes les tables utilisateur
- ✅ Auth sans mot de passe (Magic Link + OAuth)
- ✅ HTTPS automatique via Vercel
- ✅ Cookie banner RGPD

---

## Auteur

**Jimel Abidine Touré**

- 📧 [jimeltoure@gmail.com](mailto:jimeltoure@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/jimel-abidine-toure-56007139a)
- 🐙 [GitHub](https://github.com/abidinetou-lgtm)

---

## Licence

MIT — libre d'utilisation et de modification.