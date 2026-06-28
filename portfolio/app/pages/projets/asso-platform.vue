<script setup lang="ts">
const { t, tm } = useI18n()

type Feature = { title: string; description: string }

useSeoMeta({
  title: () => t("assoPlatform.seoTitle"),
  description: () => t("assoPlatform.seoDescription"),
})

const techStack = ["Spring Boot", "Nuxt 3", "Vue.js", "TypeScript", "MySQL", "Docker", "CI/CD"] as const
const features = computed(() => tm<Feature[]>("assoPlatform.features"))
const demoUrl = "https://asso-platform.florianchague.dev"
</script>

<template>
  <section class="min-h-[calc(100vh-6rem)] px-4 py-10 md:px-8 lg:px-16">
    <div class="max-w-5xl mx-auto space-y-10">
      <nav class="text-xs breadcrumb text-base-content/60">
        <ul>
          <li><NuxtLink to="/">{{ t('nav.home') }}</NuxtLink></li>
          <li><NuxtLink to="/projets">{{ t('nav.projects') }}</NuxtLink></li>
          <li>{{ t('assoPlatform.pageTitle') }}</li>
        </ul>
      </nav>

      <header class="space-y-4">
        <p class="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
          {{ t('assoPlatform.eyebrow') }}
        </p>
        <h1 class="text-3xl md:text-4xl font-semibold">{{ t('assoPlatform.pageTitle') }}</h1>
        <p class="max-w-2xl text-sm md:text-base text-base-content/80">
          {{ t('assoPlatform.intro') }}
        </p>
      </header>

      <section class="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start">
        <div class="space-y-4">
          <h2 class="text-lg font-semibold">{{ t('common.objectivesTitle') }}</h2>
          <p class="text-sm text-base-content/80">{{ t('assoPlatform.objP1') }}</p>
          <p class="text-sm text-base-content/80">{{ t('assoPlatform.objP2') }}</p>
        </div>

        <aside class="card bg-base-200/80 border border-base-300/70 shadow-lg text-sm">
          <div class="card-body gap-3">
            <h2 class="card-title text-base">{{ t('common.techDetailsTitle') }}</h2>

            <div class="space-y-1">
              <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">{{ t('common.roleLabel') }}</p>
              <p>{{ t('assoPlatform.roleText') }}</p>
            </div>

            <div class="space-y-1">
              <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">{{ t('common.stackLabel') }}</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="tech in techStack" :key="tech" class="badge badge-ghost badge-sm">{{ tech }}</span>
              </div>
            </div>

            <div class="space-y-1">
              <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">{{ t('common.statusLabel') }}</p>
              <span class="badge badge-success badge-outline badge-sm">{{ t('assoPlatform.statusText') }}</span>
            </div>

            <div class="space-y-2 pt-2">
              <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">{{ t('common.linksLabel') }}</p>
              <a :href="demoUrl" target="_blank" rel="noreferrer" class="btn btn-xs btn-primary">
                {{ t('common.openDemo') }}
              </a>
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
              <p class="text-xs md:text-sm text-base-content/80">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
