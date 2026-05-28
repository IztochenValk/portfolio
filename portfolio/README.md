# Portfolio · Nuxt 4

Vitrine principale du monorepo. Application Nuxt 4 / Vue 3 / Tailwind 4 / Pinia, déployée sur https://florianchague.dev.

## Stack
- Nuxt 4, Vue 3, TypeScript strict
- Pinia (theme store)
- Tailwind 4 + DaisyUI
- p5.js (visualisations)
- ESLint, Prettier, Vitest

## Scripts

```bash
npm install
npm run dev         # serveur de dev sur http://localhost:3000
npm run build       # build production
npm run preview     # preview du build
npm run lint        # ESLint
npm run lint:fix    # ESLint avec autofix
npm run format      # Prettier write
npm run typecheck   # vérification TypeScript
npm test            # tests Vitest
npm run test:watch  # tests en mode watch
```

## Structure

```
app/
  components/
    layout/           AppHeader, AppFooter
    visuals/          Composants p5.js (Aurora, Sakura, ...)
    ProfileModal.vue
    ThemeToggle.vue
  layouts/default.vue
  pages/
    index.vue         page d'accueil
    projets/          liste + page par projet
    visual-lab.vue
  plugins/theme-init.client.ts
  stores/theme.ts     dark/light avec persistance localStorage
  assets/css/main.css
public/
  docs/               CV, diplômes, certifications
  img/                photos de profil
tests/
  stores/             tests Vitest
```

## Déploiement

Image Docker buildée et pushée via GitHub Actions (cf `.github/workflows/docker-publish.yml`).
Container exposé sur le port 3000, derrière reverse proxy.
