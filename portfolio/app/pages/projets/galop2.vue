<script setup lang="ts">
const { t, tm } = useI18n()

type Feature = { title: string; description: string }

useSeoMeta({
  title: () => t("galop2.seoTitle"),
  description: () => t("galop2.seoDescription"),
})

const techStack = ["Spring Boot", "Java 21", "Nuxt 4", "PostgreSQL", "IA Mistral", "OCR Tesseract", "Docker", "CI/CD"] as const
const features = computed(() => tm<Feature[]>("galop2.features"))
const demoUrl = "https://galop2.kloner.io"
</script>

<template>
  <section class="min-h-[calc(100vh-6rem)] px-4 py-10 md:px-8 lg:px-16">
    <div class="max-w-5xl mx-auto space-y-10">
      <nav class="text-xs breadcrumb text-base-content/60">
        <ul>
          <li><NuxtLink to="/">{{ t('nav.home') }}</NuxtLink></li>
          <li><NuxtLink to="/projets">{{ t('nav.projects') }}</NuxtLink></li>
          <li>{{ t('galop2.pageTitle') }}</li>
        </ul>
      </nav>

      <header class="space-y-4">
        <p class="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
          {{ t('galop2.eyebrow') }}
        </p>
        <h1 class="text-3xl md:text-4xl font-semibold">{{ t('galop2.pageTitle') }}</h1>
        <p class="max-w-2xl text-sm md:text-base text-base-content/80">
          {{ t('galop2.intro') }}
        </p>
      </header>

      <section class="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start">
        <div class="space-y-4">
          <h2 class="text-lg font-semibold">{{ t('common.objectivesTitle') }}</h2>
          <p class="text-sm text-base-content/80">{{ t('galop2.objP1') }}</p>
          <p class="text-sm text-base-content/80">{{ t('galop2.objP2') }}</p>
        </div>

        <aside class="card bg-base-200/80 border border-base-300/70 shadow-lg text-sm">
          <div class="card-body gap-3">
            <h2 class="card-title text-base">{{ t('common.techDetailsTitle') }}</h2>

            <div class="space-y-1">
              <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">{{ t('common.roleLabel') }}</p>
              <p>{{ t('galop2.roleText') }}</p>
            </div>

            <div class="space-y-1">
              <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">{{ t('common.stackLabel') }}</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="tech in techStack" :key="tech" class="badge badge-ghost badge-sm">{{ tech }}</span>
              </div>
            </div>

            <div class="space-y-1">
              <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">{{ t('common.statusLabel') }}</p>
              <span class="badge badge-success badge-outline badge-sm">{{ t('galop2.statusText') }}</span>
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
