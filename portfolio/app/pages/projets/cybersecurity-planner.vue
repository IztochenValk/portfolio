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
          <li>Cybersecurity Planner</li>
        </ul>
      </nav>

      <!-- En-tête -->
      <header class="space-y-4">
        <p class="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
          Étude de cas
        </p>
        <h1 class="text-3xl md:text-4xl font-semibold">
          Cybersecurity Planner
        </h1>
        <p class="max-w-2xl text-sm md:text-base text-base-content/80">
          Une application React conçue comme un planificateur de sécurité&nbsp;:
          organisation des tâches d’audit, suivi des actions correctives,
          priorisation des risques et visualisation de la roadmap cybersécurité
          d’un projet ou d’une petite structure.
        </p>
      </header>

      <!-- Métadonnées projet -->
      <section
        class="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start"
      >
        <div class="space-y-4">
          <h2 class="text-lg font-semibold">Objectifs du projet</h2>
          <p class="text-sm text-base-content/80">
            L’idée est de proposer un outil simple pour structurer un plan
            d’action cybersécurité&nbsp;: définir des tâches, leur attribuer un
            niveau de criticité, une échéance et un état d’avancement, le tout
            dans une interface fluide et agréable.
          </p>
          <p class="text-sm text-base-content/80">
            L’application est développée en React autonome (sans backend, avec
            stockage local ou mock API), puis intégrée dans ce portfolio via
            une iframe. Cela permet de la réutiliser comme échantillon technique
            isolé tout en la contextualisant dans un cadre de portfolio.
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
                Conception UX, modélisation des données et développement front-end.
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
                Prototype en préparation
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
          <h2 class="text-lg font-semibold">Demo intégrée</h2>
          <a
            v-if="plannerUrl"
            :href="plannerUrl"
            target="_blank"
            rel="noreferrer"
            class="btn btn-xs btn-outline"
          >
            Ouvrir en plein écran
          </a>
        </div>
        <p class="text-sm text-base-content/80">
          Le Cybersecurity Planner sera chargé ci-dessous comme application React
          autonome, hébergée séparément puis intégrée dans ce portfolio via une
          iframe.
        </p>

        <div
          class="rounded-xl border border-base-300/80 overflow-hidden bg-base-200/70"
        >
          <div
            class="bg-base-300/60 px-4 py-2 text-xs flex items-center justify-between"
          >
            <span class="text-base-content/70">
              Cybersecurity Planner · React app embarquée
            </span>
            <span class="text-[10px] text-base-content/60">
              src: {{ plannerUrl || 'URL à définir' }}
            </span>
          </div>
          <div class="aspect-[16/9] w-full">
            <iframe
              v-if="plannerUrl"
              :src="plannerUrl"
              title="Cybersecurity Planner"
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
  'React',
  'TypeScript',
  'Vite',
  'Tailwind CSS',
  'DaisyUI',
];

const features = [
  {
    title: 'Liste de tâches de sécurité structurée',
    description:
      'Création de tâches avec titre, description, responsable, échéance et catégorie (infrastructure, applicatif, conformité, sensibilisation, etc.).',
  },
  {
    title: 'Priorisation par risque et impact',
    description:
      'Chaque action peut être évaluée en fonction de son impact et de son urgence, pour aider à prioriser les chantiers à fort enjeu.',
  },
  {
    title: 'Vue planning / roadmap',
    description:
      'Organisation des tâches dans une vue chronologique ou inspirée Gantt, pour visualiser la progression globale de la sécurité dans le temps.',
  },
  {
    title: 'Application front-end autonome',
    description:
      'Application React sans backend, pensée pour être facilement déployable et intégrable via iframe dans différents contextes (portfolio, démo, POC).',
  },
];

// TODO : à remplacer par l’URL réelle de ton Cybersecurity Planner React
// une fois déployé (VM, Netlify, sous-domaine, etc.)
const plannerUrl = 'http://localhost:5175/configurator/'; // ex : 'https://planner-cyber.mondomaine.dev'

const demoUrl = plannerUrl;
const repoUrl = ''; // ex : 'https://github.com/ton-user/cybersecurity-planner'
</script>
