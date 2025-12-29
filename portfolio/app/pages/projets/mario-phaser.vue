<script setup lang="ts">
const pageTitle = 'Mini jeu Mario avec Phaser'

useSeoMeta({
  title: pageTitle,
  description:
    'Petit runner type Mario réalisé avec Phaser, servi dans un conteneur dédié et intégré dans le portfolio via une iframe.'
})

const techStack = [
  'JavaScript',
  'Phaser 3',
  'HTML5 Canvas',
  'Vite',
  'Docker',
]

const features = [
  {
    title: 'Gameplay de type plateforme / runner',
    description:
      'Personnage jouable avec déplacements horizontaux, sauts, collisions avec le décor et gestion de la gravité.',
  },
  {
    title: 'Gestion des obstacles et ennemis',
    description:
      'Apparition d’obstacles, plateformes et ennemis à éviter ou contourner pour avancer dans le niveau.',
  },
  {
    title: 'Score et feedback visuel',
    description:
      'Système de score basé sur la progression et les collectibles, avec affichage HUD minimaliste.',
  },
  {
    title: 'Intégration dans un conteneur dédié',
    description:
      'Jeu servi par une mini-app autonome (HTML/JS/Phaser), exposée sur un port spécifique et intégrée dans le portfolio via iframe.',
  },
  {
    title: 'Visuellement très laid et truffé de bugs de collisions',
    description:
      'Pour l\'instant on va garder cette version beta à des fins de démonstration, mais il sera urgent d\' apporter les corrections nécessaires en temps et en heure.',
  },
]

// TODO : à remplacer par l’URL réelle du jeu Phaser
// une fois déployé (VM, Netlify, sous-domaine, etc.)
const gameUrl = `${import.meta.env.VITE_API_URL ?? 'http://localhost'}:4175`
const demoUrl = gameUrl
const repoUrl = '' // ex : 'https://github.com/ton-user/mario-phaser-game'
</script>

<template>
  <section class="min-h-[calc(100vh-6rem)] px-4 py-10 md:px-8 lg:px-16">
    <div class="max-w-5xl mx-auto space-y-10">
      <!-- Breadcrumb -->
      <nav class="text-xs breadcrumb text-base-content/60">
        <ul>
          <li>
            <NuxtLink to="/">Accueil</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/projets">Projets</NuxtLink>
          </li>
          <li>{{ pageTitle }}</li>
        </ul>
      </nav>

      <!-- En-tête -->
      <header class="space-y-4">
        <p class="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
          Étude de cas
        </p>
        <h1 class="text-3xl md:text-4xl font-semibold">
          {{ pageTitle }}
        </h1>
        <p class="max-w-2xl text-sm md:text-base text-base-content/80">
          Petit jeu de plateforme de type Mario, développé en JavaScript avec Phaser et
          servi dans un conteneur indépendant pour garder l’architecture du portfolio
          claire, modulaire et facilement déployable.
        </p>
      </header>

      <!-- Métadonnées projet -->
      <section
        class="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start"
      >
        <div class="space-y-4">
          <h2 class="text-lg font-semibold">Objectifs du projet</h2>
          <p class="text-sm text-base-content/80">
            L’objectif est de proposer un mini jeu arcade rapide à lancer, montrant la
            maîtrise de Phaser et de l’intégration d’une web app de jeu dans un
            environnement plus large. Le jeu est encapsulé dans un conteneur dédié,
            ce qui permet de le déployer ou le déplacer sans impacter le portfolio.
          </p>
          <p class="text-sm text-base-content/80">
            Comme pour l’application Gantt, le jeu est développé comme une web app
            autonome, puis embarqué dans ce portfolio via une iframe. Cette approche
            permet de le présenter comme un module technique isolé tout en le
            contextualisant dans un cas d’usage ludique et interactif.
          </p>
        </div>

        <aside
          class="card bg-base-200/80 border border-base-300/70 shadow-lg text-sm"
        >
          <div class="card-body gap-3">
            <h2 class="card-title text-base">Détails techniques</h2>

            <div class="space-y-1">
              <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">
                Rôle
              </p>
              <p>
                Game design, intégration Phaser, configuration du conteneur et
                intégration front-end dans le portfolio.
              </p>
            </div>

            <div class="space-y-1">
              <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">
                Stack
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in techStack"
                  :key="tech"
                  class="badge badge-ghost badge-sm"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <div class="space-y-1">
              <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">
                Statut
              </p>
              <span class="badge badge-success badge-outline badge-sm">
                Prototype jouable
              </span>
            </div>

            <div class="space-y-2 pt-2">
              <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">
                Liens
              </p>
              <div class="flex flex-wrap gap-2">
                <a
                  v-if="demoUrl"
                  :href="demoUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="btn btn-xs btn-primary"
                >
                  Ouvrir la démo
                </a>
                <a
                  v-if="repoUrl"
                  :href="repoUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="btn btn-xs btn-outline"
                >
                  Voir le code
                </a>
                <span
                  v-if="!demoUrl && !repoUrl"
                  class="text-xs text-base-content/60"
                >
                  Les liens seront ajoutés dès la publication du jeu.
                </span>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <!-- Fonctionnalités -->
      <section class="space-y-4">
        <h2 class="text-lg font-semibold">Fonctionnalités principales</h2>
        <div class="grid gap-3 md:grid-cols-2">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="card bg-base-200/70 border border-base-300/60"
          >
            <div class="card-body py-3 px-4 gap-2">
              <h3 class="font-medium text-sm md:text-base">
                {{ feature.title }}
              </h3>
              <p class="text-xs md:text-sm text-base-content/80">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Démo intégrée -->
      <section class="space-y-4">
        <div class="flex items-center justify-between gap-2">
          <h2 class="text-lg font-semibold">Démo intégrée</h2>
          <a
            v-if="gameUrl"
            :href="gameUrl"
            target="_blank"
            rel="noreferrer"
            class="btn btn-xs btn-outline"
          >
            Ouvrir en plein écran
          </a>
        </div>
        <p class="text-sm text-base-content/80">
          Le mini jeu Mario-like est chargé ci-dessous en tant que web app autonome,
          servie par un conteneur dédié et intégrée dans ce portfolio via une iframe.
        </p>

        <div
          class="rounded-xl border border-base-300/80 overflow-hidden bg-base-200/70"
        >
          <div
            class="bg-base-300/60 px-4 py-2 text-xs flex items-center justify-between"
          >
            <span class="text-base-content/70">
              Mini jeu Mario avec Phaser · Web app embarquée
            </span>
            <span class="text-[10px] text-base-content/60">
              src: {{ gameUrl || 'URL à définir' }}
            </span>
          </div>
          <div class="aspect-[16/9] w-full">
            <iframe
              v-if="gameUrl"
              :src="gameUrl"
              title="Mini jeu Mario avec Phaser"
              class="w-full h-full border-0"
              loading="lazy"
            ></iframe>
            <div
              v-else
              class="w-full h-full flex items-center justify-center text-sm text-base-content/70"
            >
              L’URL de la démo sera ajoutée dès que le jeu sera déployé.
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
