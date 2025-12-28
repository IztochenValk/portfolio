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
          <li>Application de diagramme de Gantt</li>
        </ul>
      </nav>

      <!-- En-tête -->
      <header class="space-y-4">
        <p class="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
          Étude de cas
        </p>
        <h1 class="text-3xl md:text-4xl font-semibold">
          Application de diagramme de Gantt
        </h1>
        <p class="max-w-2xl text-sm md:text-base text-base-content/80">
          Une application web dédiée à la création et au suivi de diagrammes de Gantt&nbsp;:
          planification des tâches, gestion des dépendances, visualisation des jalons
          et export des plannings pour les présentations et le pilotage de projet.
        </p>
      </header>

      <!-- Métadonnées projet -->
      <section
        class="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start"
      >
        <div class="space-y-4">
          <h2 class="text-lg font-semibold">Objectifs du projet</h2>
          <p class="text-sm text-base-content/80">
            L’objectif est de proposer un outil simple pour construire et ajuster un
            planning projet&nbsp;: définir des tâches, leur durée, leurs dépendances
            et les jalons clés, avec une visualisation claire sur une frise
            temporelle de type Gantt.
          </p>
          <p class="text-sm text-base-content/80">
            L’application est développée comme une web app autonome (front uniquement,
            stockage local ou mock API), puis intégrée dans ce portfolio via une iframe.
            Cela permet de la présenter comme un module technique isolé tout en la
            contextualisant dans un cas d’usage de gestion de projet.
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
                Conception UX, modélisation des données projet et développement front-end.
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
              <span class="badge badge-warning badge-outline badge-sm">
                En cours de conception
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
                  Les liens seront ajoutés dès la publication de l’application.
                </span>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <!-- Fonctionnalités -->
      <section class="space-y-4">
        <h2 class="text-lg font-semibold">Fonctionnalités prévues</h2>
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

      <!-- Demo intégrée -->
      <section class="space-y-4">
        <div class="flex items-center justify-between gap-2">
          <h2 class="text-lg font-semibold">Démo intégrée</h2>
          <a
            v-if="ganttUrl"
            :href="ganttUrl"
            target="_blank"
            rel="noreferrer"
            class="btn btn-xs btn-outline"
          >
            Ouvrir en plein écran
          </a>
        </div>
        <p class="text-sm text-base-content/80">
          L’application de diagramme de Gantt sera chargée ci-dessous comme web app
          autonome, hébergée séparément puis intégrée dans ce portfolio via une iframe.
        </p>

        <div
          class="rounded-xl border border-base-300/80 overflow-hidden bg-base-200/70"
        >
          <div
            class="bg-base-300/60 px-4 py-2 text-xs flex items-center justify-between"
          >
            <span class="text-base-content/70">
              Application de diagramme de Gantt · Web app embarquée
            </span>
            <span class="text-[10px] text-base-content/60">
              src: {{ ganttUrl || 'URL à définir' }}
            </span>
          </div>
          <div class="aspect-[16/9] w-full">
            <iframe
              v-if="ganttUrl"
              :src="ganttUrl"
              title="Application de diagramme de Gantt"
              class="w-full h-full border-0"
              loading="lazy"
            ></iframe>
            <div
              v-else
              class="w-full h-full flex items-center justify-center text-sm text-base-content/70"
            >
              L’URL de la démo sera ajoutée dès que l’application sera déployée.
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
const techStack = [
  'TypeScript',
  'React',
  'Vite',
  'Tailwind CSS',
  'DaisyUI',
];

const features = [
  {
    title: 'Création et édition de tâches',
    description:
      'Ajout de tâches avec titre, date de début, date de fin, responsable et catégorie (développement, recette, déploiement, communication, etc.).',
  },
  {
    title: 'Gestion des dépendances',
    description:
      'Lien entre les tâches pour visualiser les dépendances (ex. une tâche ne peut démarrer qu’après la fin d’une autre).',
  },
  {
    title: 'Vue chronologique type Gantt',
    description:
      'Affichage des tâches sur une frise temporelle avec zoom sur les jours, semaines ou mois pour s’adapter au niveau de détail souhaité.',
  },
  {
    title: 'Application front-end autonome',
    description:
      'Application web sans backend, pensée pour être facilement déployable et intégrable via iframe dans différents contextes (portfolio, démonstration, POC).',
  },
];

// TODO : à remplacer par l’URL réelle de ton app Gantt
// une fois déployée (VM, Netlify, sous-domaine, etc.)
const ganttUrl = `${import.meta.env.VITE_API_URL ?? 'http://localhost'}:4941`

const demoUrl = ganttUrl;
const repoUrl = ''; // ex : 'https://github.com/ton-user/gantt-app'
</script>
