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
- **Backend** : Node.js (Express), Java Spring Boot (Bibliospace)
- **Infra** : Docker, Docker Compose, GitHub Container Registry, GitHub Actions
- **CI/CD** : Build matriciel des images Docker, déploiement SSH sur VM

## Structure
```
portfolio/              Portfolio Nuxt 4 (vitrine principale)
cybersecurity-quiz/     Quiz React + Vite
cybersecurity-planner/  Planner React + Vite
gantt/                  Frontend + Backend Gantt (Node + Postgres)
mario-game/             Mini-jeu navigateur (Canvas)
.github/workflows/      Pipeline CI/CD GitHub Actions
```

## Démarrage local

Chaque sous-projet a son propre `package.json` :

```bash
cd portfolio
npm install
npm run dev   # http://localhost:3000
```

## CI/CD

Voir `.github/workflows/docker-publish.yml` :
- Job `quality` : lint, typecheck, tests Vitest avant tout build
- Job `changes` : `paths-filter` pour ne rebuilder que ce qui a changé
- Job `build-and-push` : matrix parallèle des images Docker vers GHCR
- Scan **Trivy** de chaque image (résultats SARIF uploadés dans GitHub Security)
- Job `deploy` : SSH sur VM avec `docker compose pull` + `up -d` (sur push main)

## Auteur
Florian Chague · florian.chague2@gmail.com · https://github.com/IztochenValk
