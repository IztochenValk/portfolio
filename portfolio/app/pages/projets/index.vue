<template>
  <section class="min-h-[calc(100vh-6rem)] px-4 py-10 md:px-8 lg:px-16">
    <div class="max-w-6xl mx-auto space-y-10">
      <!-- En-tête de la page -->
      <header class="space-y-4">
        <p class="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
          Portfolio
        </p>
        <h1 class="text-3xl md:text-4xl font-semibold">
          Projets sélectionnés
        </h1>
        <p class="max-w-2xl text-sm md:text-base text-base-content/70">
          Un aperçu des projets sur lesquels je travaille actuellement&nbsp;:
          applications web interactives, outils pédagogiques et expérimentations front-end.
        </p>
      </header>

      <!-- Grille de projets -->
      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="project in projects"
          :key="project.slug"
          class="card bg-base-200/70 border border-base-300/60 shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
          <div class="card-body gap-4">
            <div class="flex items-start justify-between gap-3">
              <div class="space-y-1">
                <h2 class="card-title text-lg md:text-xl">
                  {{ project.title }}
                </h2>
                <p class="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                  {{ project.tagline }}
                </p>
              </div>

            <span
                class="badge badge-sm text-nowrap"
                :class="project.status === 'En développement'
                  ? 'badge-warning badge-outline'
                  : project.status === 'En production'
                  ? 'badge-success badge-outline'
                  : 'badge-ghost'"
              >
                {{ project.status }}
              </span>
            </div>

            <p class="text-sm text-base-content/80">
              {{ project.description }}
            </p>

            <!-- Tech stack -->
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in project.tech"
                :key="tech"
                class="badge badge-ghost badge-sm"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Boutons -->
            <div class="card-actions justify-between items-center pt-2">
              <div class="text-xs text-base-content/60">
                {{ project.context }}
              </div>
              <div class="flex gap-2">
                <NuxtLink
                  v-if="project.internalRoute"
                  :to="project.internalRoute"
                  class="btn btn-sm btn-primary"
                >
                  Détails
                </NuxtLink>

                <a
                  v-if="project.demoUrl"
                  :href="project.demoUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="btn btn-sm btn-outline"
                >
                  Démo
                </a>

                <a
                  v-if="project.repoUrl"
                  :href="project.repoUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="btn btn-sm btn-ghost"
                >
                  Code
                </a>

                <button
                  v-if="!project.demoUrl && !project.repoUrl"
                  class="btn btn-sm btn-ghost btn-disabled"
                >
                  Bientôt en ligne
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const projects = [
  {
    slug: 'quiz-cyber',
    title: 'Quiz cybersécurité',
    tagline: 'React.js · Pédagogie sécurité',
    description:
      'Application de quiz gamifiée sur les fondamentaux de la cybersécurité, avec timer, scoring et explications détaillées après chaque question.',
    tech: ['React', 'TypeScript', 'Vite'],
    status: 'En développement',
    context: 'Projet personnel orienté pédagogie cybersécurité.',
    // Mettra plus tard la route interne de détail
    internalRoute: '/projets/quiz-cyber', // future page de détail
    demoUrl: null, // à remplir quand ce sera déployé
    repoUrl: null, // à remplir avec l’URL GitHub
  },
  {
    slug: 'cybersecurity-planner',
    title: 'Cybersecurity Planner',
    tagline: 'React.js · Plan d’action sécurité',
    description:
      'Planificateur de tâches cybersécurité pour structurer audits, actions correctives et roadmap de sécurité.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'DaisyUI'],
    status: 'En préparation',
    context: 'Échantillon d’application React orientée gestion de la sécurité.',
    internalRoute: '/projets/cybersecurity-planner',
    demoUrl: null,
    repoUrl: null,
  },
  {
    slug: 'mario-game',
    title: 'Mini jeu navigateur Super Mario',
    tagline: 'JavaScript · Canvas / DOM',
    description:
      'Petit jeu inspiré de Super Mario pour le navigateur, avec gestion des collisions, du score et des contrôles clavier.',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    status: 'Prototype jouable',
    context: 'Expérimentation gameplay et logique jeu 2D dans le navigateur.',
    internalRoute: '/projets/mario-game', // future page de détail
    demoUrl: null,
    repoUrl: null,
  },
  {
    slug: 'gantt-app',
    title: 'Application de diagramme de Gantt en ligne',
    tagline: 'Gestion de projet · Visualisation',
    description:
      'Outil web pour créer et exporter des diagrammes de Gantt, pensé pour le suivi de projets et les présentations pédagogiques.',
    tech: ['TypeScript', 'Vue ou React', 'Tailwind CSS'],
    status: 'En cours de conception',
    context: 'Outil personnel pour structurer et partager des plannings projet.',
    internalRoute: '/projets/gantt-app', // future page de détail
    demoUrl: null,
    repoUrl: null,
  },
];
</script>
