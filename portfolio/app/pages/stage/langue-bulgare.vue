<template>
  <section class="min-h-[calc(100vh-6rem)] px-4 py-10 md:px-8 lg:px-16">
    <div class="max-w-5xl mx-auto space-y-10">
      <nav class="text-xs breadcrumb text-base-content/60">
        <ul>
          <li><NuxtLink to="/">{{ t('nav.home') }}</NuxtLink></li>
          <li><a href="/#experience">{{ t('nav.experience') }}</a></li>
          <li>{{ t('stage.breadcrumb') }}</li>
        </ul>
      </nav>

      <header class="space-y-4">
        <p class="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
          {{ t('stage.eyebrow') }}
        </p>
        <h1 class="text-3xl md:text-4xl font-semibold">
          {{ t('stage.title') }}
        </h1>
        <p class="max-w-2xl text-sm md:text-base text-base-content/80">
          {{ t('stage.intro') }}
        </p>
        <div class="flex flex-wrap gap-2">
          <span class="badge badge-primary">{{ t('stage.period') }}</span>
          <span class="badge badge-outline">{{ t('stage.location') }}</span>
        </div>
      </header>

      <!-- Site 1 : wp.languebulgare.fr -->
      <section class="space-y-4">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
          <h2 class="text-2xl font-semibold">
            wp.languebulgare.fr
          </h2>
          <a
            class="link link-primary text-sm"
            href="https://wp.languebulgare.fr"
            target="_blank"
            rel="noreferrer"
          >
            {{ t('stage.viewSite') }}
          </a>
        </div>
        <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">
          {{ t('stage.site1Tag') }}
        </p>

        <div class="rounded-xl border border-base-300/80 overflow-hidden bg-base-200/40">
          <img
            src="/img/wp-languebulgare.webp"
            :alt="t('stage.site1ImgAlt')"
            class="w-full h-auto"
            loading="lazy"
            width="1446"
            height="860"
          />
        </div>

        <div class="grid gap-4 md:grid-cols-2 mt-4">
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70 mb-2">
              {{ t('stage.deliveredTitle') }}
            </h3>
            <ul class="text-sm opacity-80 list-disc list-inside space-y-1">
              <li v-for="item in site1Delivered" :key="item">{{ item }}</li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70 mb-2">
              {{ t('stage.stackTitle') }}
            </h3>
            <div class="flex flex-wrap gap-2">
              <span class="badge badge-soft badge-primary">WordPress</span>
              <span class="badge badge-soft badge-primary">PHP</span>
              <span class="badge badge-soft badge-primary">HTML/CSS</span>
              <span class="badge badge-soft badge-primary">Traduction BG→FR</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Site 2 : languebulgare.fr -->
      <section class="space-y-4">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
          <h2 class="text-2xl font-semibold">
            languebulgare.fr
          </h2>
          <a
            class="link link-primary text-sm"
            href="https://www.languebulgare.fr"
            target="_blank"
            rel="noreferrer"
          >
            {{ t('stage.viewSite') }}
          </a>
        </div>
        <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">
          {{ t('stage.site2Tag') }}
        </p>

        <div class="rounded-xl border border-base-300/80 overflow-hidden bg-base-200/40">
          <img
            src="/img/languebulgare.webp"
            :alt="t('stage.site2ImgAlt')"
            class="w-full h-auto"
            loading="lazy"
            width="916"
            height="867"
          />
        </div>

        <div class="grid gap-4 md:grid-cols-2 mt-4">
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70 mb-2">
              {{ t('stage.deliveredTitle') }}
            </h3>
            <ul class="text-sm opacity-80 list-disc list-inside space-y-1">
              <li v-for="item in site2Delivered" :key="item">{{ item }}</li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70 mb-2">
              {{ t('stage.stackTitle') }}
            </h3>
            <div class="flex flex-wrap gap-2">
              <span class="badge badge-soft badge-primary">AssoConnect</span>
              <span class="badge badge-soft badge-primary">HTML/CSS</span>
              <span class="badge badge-soft badge-primary">Contenus bulgare</span>
            </div>
          </div>
        </div>

        <!-- Note honnête sur AssoConnect -->
        <div class="alert alert-warning border border-base-300/70 bg-base-200/60 mt-6 text-sm">
          <div>
            <h3 class="font-semibold mb-1">{{ t('stage.noteTitle') }}</h3>
            <p class="opacity-90">
              {{ t('stage.noteP1Before') }}<strong>{{ t('stage.noteP1Strong') }}</strong>{{ t('stage.noteP1After') }}
            </p>
            <p class="opacity-90 mt-2">
              {{ t('stage.noteP2') }}
            </p>
          </div>
        </div>
      </section>

      <!-- Moodle / H5P -->
      <section class="space-y-4">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
          <h2 class="text-2xl font-semibold">
            Moodle
          </h2>
        </div>
        <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">
          {{ t('stage.moodleTag') }}
        </p>

        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70 mb-2">
              {{ t('stage.deliveredTitle') }}
            </h3>
            <p class="text-sm opacity-80">
              {{ t('stage.moodleDesc') }}
            </p>
          </div>
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70 mb-2">
              {{ t('stage.stackTitle') }}
            </h3>
            <div class="flex flex-wrap gap-2">
              <span class="badge badge-soft badge-primary">Moodle</span>
              <span class="badge badge-soft badge-primary">H5P</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Liens utiles -->
      <section class="border-t border-base-300/60 pt-6 mt-10">
        <NuxtLink to="/#experience" class="link link-primary text-sm">
          {{ t('stage.back') }}
        </NuxtLink>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t, tm } = useI18n()

useSeoMeta({
  title: () => t("stage.seoTitle"),
  description: () => t("stage.seoDescription"),
  ogTitle: () => t("stage.seoTitle"),
  ogDescription: () => t("stage.seoDescription"),
})

const site1Delivered = computed(() => tm<string[]>("stage.site1Delivered"))
const site2Delivered = computed(() => tm<string[]>("stage.site2Delivered"))
</script>
