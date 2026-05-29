<template>
  <section class="min-h-[calc(100vh-6rem)] px-4 py-10 md:px-8 lg:px-16">
    <div class="max-w-6xl mx-auto space-y-10">
      <!-- En-tête de la page -->
      <header class="space-y-4">
        <p class="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
          {{ t('projects.eyebrow') }}
        </p>
        <h1 class="text-3xl md:text-4xl font-semibold">
          {{ t('projects.title') }}
        </h1>
        <p class="max-w-2xl text-sm md:text-base text-base-content/70">
          {{ t('projects.subtitle') }}
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
                :class="project.status === 'prod'
                  ? 'badge-success badge-outline'
                  : project.status === 'playable'
                  ? 'badge-info badge-outline'
                  : project.status === 'dev'
                  ? 'badge-warning badge-outline'
                  : 'badge-ghost'"
              >
                {{ statusLabel(project.status) }}
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
                  {{ t('projects.demo') }}
                </NuxtLink>

                <!-- Code si disponible -->
                <a
                  v-if="project.repoUrl"
                  :href="project.repoUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="btn btn-sm btn-ghost"
                >
                  {{ t('projects.code') }}
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
const { t, tm } = useI18n()

useSeoMeta({
  title: () => t("projects.seoTitle"),
  description: () => t("projects.seoDescription"),
  ogTitle: () => t("projects.seoTitle"),
  ogDescription: () => t("projects.seoDescription"),
})

type ProjectStatus = "prod" | "playable" | "dev" | "other"

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

function statusLabel(status: ProjectStatus): string {
  if (status === "prod") return t("projects.statusProd")
  if (status === "playable") return t("projects.statusPlayable")
  if (status === "dev") return t("projects.statusDev")
  return ""
}

// Stable per-project metadata (slugs, tech, routes, status keys).
const baseProjects: Array<
  Pick<Project, "slug" | "tech" | "status" | "internalRoute" | "demoUrl" | "repoUrl">
> = [
  {
    slug: "bibliospace",
    tech: ["Java", "Spring Boot", "Vue.js", "TypeScript", "MySQL", "Docker", "CI/CD"],
    status: "prod",
    internalRoute: "/projets/bibliospace",
    demoUrl: "https://bibliospace.florianchague.dev",
    repoUrl: "https://github.com/IztochenValk/portfolio",
  },
  {
    slug: "quiz-cyber",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "DaisyUI"],
    status: "prod",
    internalRoute: "/projets/quiz-cyber",
    demoUrl: "https://quiz.florianchague.dev",
    repoUrl: "https://github.com/IztochenValk/portfolio",
  },
  {
    slug: "cybersecurity-planner",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "DaisyUI"],
    status: "prod",
    internalRoute: "/projets/cybersecurity-planner",
    demoUrl: "https://planner.florianchague.dev",
    repoUrl: "https://github.com/IztochenValk/portfolio",
  },
  {
    slug: "mario-game",
    tech: ["JavaScript", "HTML5 Canvas", "CSS3"],
    status: "playable",
    internalRoute: "/projets/mario-game",
    demoUrl: "https://mario.florianchague.dev",
    repoUrl: "https://github.com/IztochenValk/portfolio",
  },
]

// Localised, reactive project list.
const projects = computed<Project[]>(() =>
  baseProjects.map((p) => ({
    ...p,
    title: t(`projects.items.${p.slug}.title`),
    tagline: t(`projects.items.${p.slug}.tagline`),
    description: t(`projects.items.${p.slug}.description`),
    context: t(`projects.items.${p.slug}.context`),
  })),
)
</script>
