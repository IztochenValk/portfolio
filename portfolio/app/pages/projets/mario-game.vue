<script setup lang="ts">
const { t, tm } = useI18n()

type Feature = { title: string; description: string }

useSeoMeta({
  title: () => t("mario.seoTitle"),
  description: () => t("mario.seoDescription"),
})

const techStack = ["JavaScript", "Phaser 3", "HTML5 Canvas", "Vite", "Docker"] as const

const features = computed(() => tm<Feature[]>("mario.features"))

const config = useRuntimeConfig()

const gameUrl = computed(() => {
  const url = (config.public as Record<string, unknown>)?.marioUrl
  return typeof url === "string" && url.trim().length > 0 ? url.trim() : ""
})

const demoUrl = computed(() => gameUrl.value)

const repoUrl = computed(() => {
  const url = (config.public as Record<string, unknown>)?.marioRepoUrl
  return typeof url === "string" && url.trim().length > 0 ? url.trim() : ""
})
</script>

<template>
  <section class="min-h-[calc(100vh-6rem)] px-4 py-10 md:px-8 lg:px-16">
    <div class="max-w-5xl mx-auto space-y-10">
      <nav class="text-xs breadcrumb text-base-content/60">
        <ul>
          <li><NuxtLink to="/">{{ t('nav.home') }}</NuxtLink></li>
          <li><NuxtLink to="/projets">{{ t('nav.projects') }}</NuxtLink></li>
          <li>{{ t('mario.pageTitle') }}</li>
        </ul>
      </nav>

      <header class="space-y-4">
        <p class="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
          {{ t('mario.eyebrow') }}
        </p>
        <h1 class="text-3xl md:text-4xl font-semibold">{{ t('mario.pageTitle') }}</h1>
        <p class="max-w-2xl text-sm md:text-base text-base-content/80">
          {{ t('mario.intro') }}
        </p>
      </header>

      <section class="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start">
        <div class="space-y-4">
          <h2 class="text-lg font-semibold">{{ t('common.objectivesTitle') }}</h2>
          <p class="text-sm text-base-content/80">
            {{ t('mario.objP1') }}
          </p>
          <p class="text-sm text-base-content/80">
            {{ t('mario.objP2') }}
          </p>
        </div>

        <aside class="card bg-base-200/80 border border-base-300/70 shadow-lg text-sm">
          <div class="card-body gap-3">
            <h2 class="card-title text-base">{{ t('common.techDetailsTitle') }}</h2>

            <div class="space-y-1">
              <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">{{ t('common.roleLabel') }}</p>
              <p>
                {{ t('mario.roleText') }}
              </p>
            </div>

            <div class="space-y-1">
              <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">{{ t('common.stackLabel') }}</p>
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
              <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">{{ t('common.statusLabel') }}</p>
              <span class="badge badge-success badge-outline badge-sm">{{ t('mario.statusText') }}</span>
            </div>

            <div class="space-y-2 pt-2">
              <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">{{ t('common.linksLabel') }}</p>
              <div class="flex flex-wrap gap-2">
                <a
                  v-if="demoUrl"
                  :href="demoUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="btn btn-xs btn-primary"
                >
                  {{ t('common.openDemo') }}
                </a>

                <a
                  v-if="repoUrl"
                  :href="repoUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="btn btn-xs btn-outline"
                >
                  {{ t('common.viewCode') }}
                </a>

                <span v-if="!demoUrl && !repoUrl" class="text-xs text-base-content/60">
                  {{ t('mario.linksTbd') }}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section class="space-y-4">
        <h2 class="text-lg font-semibold">{{ t('common.featuresTitle') }}</h2>
        <div class="grid gap-3 md:grid-cols-2">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="card bg-base-200/70 border border-base-300/60"
          >
            <div class="card-body py-3 px-4 gap-2">
              <h3 class="font-medium text-sm md:text-base">{{ feature.title }}</h3>
              <p class="text-xs md:text-sm text-base-content/80">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <div class="flex items-center justify-between gap-2">
          <h2 class="text-lg font-semibold">{{ t('common.embeddedDemoTitle') }}</h2>
          <a
            v-if="gameUrl"
            :href="gameUrl"
            target="_blank"
            rel="noreferrer"
            class="btn btn-xs btn-outline"
          >
            {{ t('common.fullscreen') }}
          </a>
        </div>

        <p class="text-sm text-base-content/80">
          {{ t('mario.demoDesc') }}
        </p>

        <div class="rounded-xl border border-base-300/80 overflow-hidden bg-base-200/70">
          <div class="bg-base-300/60 px-4 py-2 text-xs flex items-center justify-between">
            <span class="text-base-content/70">
              {{ t('mario.iframeLabel') }}
            </span>
            <span class="text-[10px] text-base-content/60">
              src: {{ gameUrl || t('common.urlTbd') }}
            </span>
          </div>

          <div class="aspect-[16/9] w-full">
            <iframe
              v-if="gameUrl"
              :src="gameUrl"
              title="Mario mini-game with Phaser"
              class="w-full h-full border-0"
              loading="lazy"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center text-sm text-base-content/70"
            >
              {{ t('mario.demoMissing') }}
            </div>
          </div>
        </div>

        <div
          v-if="gameUrl"
          class="alert alert-info bg-base-200/70 border border-base-300/60 text-xs"
        >
          <span class="text-base-content/80">
            {{ t('common.embedNote') }}
          </span>
        </div>
      </section>
    </div>
  </section>
</template>
