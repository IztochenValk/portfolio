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
                  : project.status === 'Prototype jouable'
                  ? 'badge-info badge-outline'
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
                <!-- Route interne de détail -->
                <NuxtLink
                  v-if="project.internalRoute"
                  :to="project.internalRoute"
                  class="btn btn-sm btn-primary btn-outline"
                >
                  Démo
                </NuxtLink>

                <!-- Code si disponible -->
                <a
                  v-if="project.repoUrl"
                  :href="project.repoUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="btn btn-sm btn-ghost"
                >
                  Code
                </a>

              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Projets — Florian Chague",
  description:
    "Sélection de projets full-stack : Bibliospace (fil rouge CDA, Java/Vue), quiz cybersécurité, planner sécurité, Gantt App et expérimentations.",
  ogTitle: "Projets — Florian Chague",
  ogDescription: "Portfolio de projets full-stack en Java, Vue.js, Nuxt.js, Node.js et React.",
})

type ProjectStatus =
  | 'En développement'
  | 'En préparation'
  | 'Prototype jouable'
  | 'En cours de conception'
  | 'En production'

interface Project {
  slug: string
  title: string
  tagline: string
  description: string
  tech: string[]
  status: ProjectStatus
  context: string
  internalRoute?: string | null
  demoUrl?: string | null
  repoUrl?: string | null
}

const projects: Project[] = [
  {
    slug: 'bibliospace',
    title: 'Bibliospace — Projet fil rouge CDA',
    tagline: 'Java Spring Boot · Vue.js · Full-stack',
    description:
      'Application web de gestion de bibliothèque personnelle développée comme projet fil rouge du CDA. Architecture full-stack avec API REST Java Spring Boot et front-end Vue.js, authentification, gestion des emprunts et tableau de bord utilisateur.',
    tech: ['Java', 'Spring Boot', 'Vue.js', 'TypeScript', 'MySQL', 'Docker', 'CI/CD'],
    status: 'En production',
    context: 'Projet fil rouge soutenu pour l\'obtention du titre CDA (RNCP niveau 6).',
    internalRoute: '/projets/bibliospace',
    demoUrl: 'https://bibliospace.florianchague.dev',
    repoUrl: 'https://github.com/IztochenValk/portfolio',
  },
  {
    slug: 'quiz-cyber',
    title: 'Quiz cybersécurité',
    tagline: 'React.js · Pédagogie sécurité',
    description:
      'Application de quiz gamifiée sur les fondamentaux de la cybersécurité (Azure AZ-500, OWASP, bonnes pratiques) avec timer, scoring et explications détaillées après chaque question.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'DaisyUI'],
    status: 'En production',
    context: 'Projet personnel orienté pédagogie cybersécurité.',
    internalRoute: '/projets/quiz-cyber',
    demoUrl: 'https://quiz.florianchague.dev',
    repoUrl: 'https://github.com/IztochenValk/portfolio',
  },
  {
    slug: 'cybersecurity-planner',
    title: 'Cybersecurity Planner',
    tagline: 'React.js · Plan d\'action sécurité',
    description:
      'Planificateur de tâches cybersécurité pour structurer audits, actions correctives et roadmap de sécurité, avec mapping MITRE ATT&CK.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'DaisyUI'],
    status: 'En production',
    context: 'Échantillon d\'application React orientée gestion de la sécurité.',
    internalRoute: '/projets/cybersecurity-planner',
    demoUrl: 'https://planner.florianchague.dev',
    repoUrl: 'https://github.com/IztochenValk/portfolio',
  },
  {
    slug: 'gantt-app',
    title: 'Application de diagramme de Gantt en ligne',
    tagline: 'Vue.js · Node.js · Postgres',
    description:
      'Outil web full-stack pour créer, suivre et exporter des diagrammes de Gantt. Backend Node.js + Postgres avec authentification JWT, front-end Vue/TypeScript et synchronisation locale/distante.',
    tech: ['Vue.js', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'JWT', 'Docker'],
    status: 'En production',
    context: 'Outil personnel pour structurer et partager des plannings projet.',
    internalRoute: '/projets/gantt-app',
    demoUrl: 'https://gantt.florianchague.dev',
    repoUrl: 'https://github.com/IztochenValk/portfolio',
  },
  {
    slug: 'mario-game',
    title: 'Mini jeu navigateur Super Mario',
    tagline: 'JavaScript · Canvas / DOM',
    description:
      'Petit jeu inspiré de Super Mario pour le navigateur, avec gestion des collisions, du score et des contrôles clavier. Expérimentation pure JS — graphismes volontairement minimalistes, gameplay imparfait mais jouable.',
    tech: ['JavaScript', 'HTML5 Canvas', 'CSS3'],
    status: 'Prototype jouable',
    context: 'Expérimentation gameplay et logique jeu 2D dans le navigateur.',
    internalRoute: '/projets/mario-game',
    demoUrl: 'https://mario.florianchague.dev',
    repoUrl: 'https://github.com/IztochenValk/portfolio',
  },
]
</script>
