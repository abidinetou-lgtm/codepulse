# CodePulse 🚀

**Application de veille technologique full-stack** — GitHub, Dev.to et Hacker News centralisés en temps réel.

🌐 **Demo live** → [codepulse-rouge.vercel.app](https://codepulse-rouge.vercel.app)

---

## Présentation

CodePulse agrège les meilleures sources d'actualité tech en un seul endroit. Plus besoin de jongler entre 5 onglets pour faire sa veille — tout est centralisé, filtrable, et sauvegardable en favoris.

### Fonctionnalités
- 📡 **Flux en temps réel** — GitHub Trending, Dev.to, Hacker News
- 🔍 **Filtres intelligents** — par source et par technologie (#react, #ai, #node...)
- ❤️ **Système de favoris** — sauvegardé en base de données
- 🔐 **Authentification** — Google OAuth + Magic Link email (sans mot de passe)
- 📬 **Newsletter opt-in** — résumé tous les 2 jours
- 📚 **Guide interactif** — apprendre HTML, CSS, JavaScript dans l'app
- 📱 **Responsive** — adapté mobile, tablette et desktop

---

## Stack technique

| Couche | Technologies |
|---|---|
| **Frontend** | React 19, React Router v6, Context API |
| **Styling** | CSS3 custom (aucune lib UI) |
| **Backend** | Node.js, Express, REST API |
| **Auth & DB** | Supabase (PostgreSQL + Auth) |
| **APIs** | GitHub Trending, Dev.to API, Hacker News Firebase API |
| **Déploiement** | Vercel (frontend) + Render (backend) |
| **Versionning** | Git, GitHub |

---

## Architecture
codepulse/                    ← Frontend React
├── src/
│   ├── components/           ← Composants réutilisables
│   │   ├── Navbar.jsx        ← Navigation + menu profil
│   │   ├── Hero.jsx          ← Landing page hero
│   │   ├── NewsSection.jsx   ← Cartes d'actu scroll horizontal
│   │   ├── ArticleDrawer.jsx ← Panneau latéral article
│   │   ├── Background.jsx    ← Arrière-plan animé
│   │   ├── Footer.jsx        ← Pied de page
│   │   └── NewsletterPrompt.jsx ← Modal newsletter
│   ├── pages/
│   │   ├── Dashboard.jsx     ← Page veille principale
│   │   ├── Favorites.jsx     ← Favoris sauvegardés
│   │   ├── Sources.jsx       ← Sources disponibles
│   │   ├── Login.jsx         ← Connexion / Inscription
│   │   ├── LearnPage.jsx     ← Guide interactif HTML/CSS/JS
│   │   └── AuthCallback.jsx  ← Redirect après OAuth
│   ├── context/
│   │   ├── AuthContext.jsx   ← État global d'authentification
│   │   └── FavoritesContext.jsx ← État global des favoris
│   ├── hooks/
│   │   └── useArticles.js    ← Hook fetch des articles
│   └── lib/
│       └── supabase.js       ← Client Supabase
codepulse-api/                ← Backend Express
├── src/
│   ├── routes/
│   │   ├── devto.js          ← Route GET /api/devto/articles
│   │   ├── github.js         ← Route GET /api/github/trending
│   │   └── hackernews.js     ← Route GET /api/hackernews/top
│   ├── services/
│   │   ├── devtoService.js   ← Logique appel Dev.to API
│   │   ├── githubService.js  ← Logique appel GitHub API
│   │   └── hackerNewsService.js ← Logique appel HN API
│   └── cache.js              ← Cache mémoire 5 minutes
└── server.js                 ← Point d'entrée Express

---

## Installation locale

### Prérequis
- Node.js v18+
- Un compte [Supabase](https://supabase.com) (gratuit)

### 1. Cloner les repos

```bash
git clone https://github.com/abidinetou-lgtm/codepulse.git
git clone https://github.com/abidinetou-lgtm/codepulse-api.git
```

### 2. Démarrer le backend

```bash
cd codepulse-api
npm install
```

Crée `.env` :
PORT=3001

```bash
npm run dev
# → http://localhost:3001
```

### 3. Démarrer le frontend

```bash
cd codepulse
npm install
```

Crée `.env.local` :
VITE_API_URL=http://localhost:3001/api
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

```bash
npm run dev
# → http://localhost:5173
```

---

## Variables d'environnement

### Frontend (`codepulse/.env.local`)
| Variable | Description |
|---|---|
| `VITE_API_URL` | URL du backend Express |
| `VITE_SUPABASE_URL` | URL de ton projet Supabase |
| `VITE_SUPABASE_ANON_KEY` | Clé publique Supabase |

### Backend (`codepulse-api/.env`)
| Variable | Description |
|---|---|
| `PORT` | Port du serveur (défaut: 3001) |

---

## Déploiement

| Service | Projet | URL |
|---|---|---|
| **Vercel** | `codepulse` (frontend) | codepulse-rouge.vercel.app |
| **Render** | `codepulse-api` (backend) | codepulse-api-umun.onrender.com |

---

## APIs utilisées

| API | Documentation | Authentification |
|---|---|---|
| Dev.to | [docs.forem.com](https://developers.forem.com/api) | Publique (sans clé) |
| GitHub Trending | Non officielle | Publique |
| Hacker News | [github.com/HackerNews/API](https://github.com/HackerNews/API) | Publique (sans clé) |

---

## Auteur

**Jimel Abidine Touré**
- 📧 [jimeltoure@gmail.com](mailto:jimeltoure@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/jimel-abidine-toure-56007139a)
- 🐙 [GitHub](https://github.com/abidinetou-lgtm)

---

## Licence

MIT — libre d'utilisation et de modification.