# Portfolio · Florian Chague

Monorepo regroupant mon portfolio personnel (Nuxt 4 / Vue 3) et plusieurs mini-projets déployés en parallèle via Docker + GitHub Actions vers GHCR.

## Live
- Portfolio : https://florianchague.dev
- Quiz cybersécurité : https://quiz.florianchague.dev
- Cybersecurity Planner : https://planner.florianchague.dev
- Mario Game : https://mario.florianchague.dev
- Gantt App : https://gantt.florianchague.dev
- Bibliospace (fil rouge CDA) : https://bibliospace.florianchague.dev

## Stack
- **Frontend** : Nuxt 4, Vue 3, Pinia, TypeScript, Tailwind 4, DaisyUI
- **Backend** : Node.js (Express), API OpenAI (H5P), Java Spring Boot (Bibliospace)
- **Infra** : Docker, Docker Compose, GitHub Container Registry, GitHub Actions
- **CI/CD** : Build matriciel des 5 images Docker, déploiement SSH sur VM

## Structure
```
portfolio/              Portfolio Nuxt 4 (vitrine principale)
cybersecurity-quiz/     Quiz React + Vite
cybersecurity-planner/  Planner React + Vite
gantt/                  Frontend + Backend Gantt (Node + Postgres)
h5p-api/                API Node.js d'évaluation OpenAI
mario-game/             Mini-jeu navigateur (Canvas)
infra/                  docker-compose, configuration déploiement
.github/workflows/      Pipeline CI/CD GitHub Actions
```

## Démarrage local

Chaque sous-projet a son propre `package.json` :

```bash
cd portfolio
npm install
npm run dev   # http://localhost:3000
```

Pour l'API H5P, copier `.env.example` en `.env` et renseigner la clé OpenAI.

## CI/CD

Voir `.github/workflows/docker-publish.yml` :
- Build et push des images Docker vers GHCR à chaque push sur `main`
- Déploiement automatique sur VM via SSH (`docker compose pull` + `up -d`)

## Auteur
Florian Chague · florian.chague2@gmail.com · https://github.com/IztochenValk
