<template>
  <section class="min-h-[calc(100vh-6rem)] px-4 py-10 md:px-8 lg:px-16">
    <div class="max-w-5xl mx-auto space-y-10">
      <nav class="text-xs breadcrumb text-base-content/60">
        <ul>
          <li><NuxtLink to="/">{{ t('nav.home') }}</NuxtLink></li>
          <li><a href="/#education">{{ t('home.educationTitle') }}</a></li>
          <li>{{ t('design.breadcrumb') }}</li>
        </ul>
      </nav>

      <header class="space-y-4">
        <p class="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
          {{ t('design.eyebrow') }}
        </p>
        <h1 class="text-3xl md:text-4xl font-semibold">
          {{ t('design.title') }}
        </h1>
        <p class="max-w-2xl text-sm md:text-base text-base-content/80">
          {{ t('design.intro') }}
        </p>
        <div class="flex flex-wrap gap-2">
          <span class="badge badge-soft badge-primary">Figma</span>
          <span class="badge badge-outline">UI / UX</span>
        </div>
      </header>

      <!-- Café Leblanc -->
      <section class="space-y-3">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
          <h2 class="text-xl md:text-2xl font-semibold">{{ t('design.cafeTitle') }}</h2>
          <span class="text-xs uppercase tracking-[0.2em] text-base-content/60">
            {{ t('design.toolLabel') }}: Figma
          </span>
        </div>
        <p class="max-w-3xl text-sm text-base-content/80">{{ t('design.cafeDesc') }}</p>
        <div class="rounded-xl border border-base-300/80 overflow-hidden bg-base-200/40 max-w-xl">
          <img
            src="/img/figma/cafe-leblanc.webp"
            :alt="t('design.cafeAlt')"
            class="w-full h-auto"
            loading="lazy"
            width="542"
            height="838"
          />
        </div>
      </section>

      <!-- Arena Quiz -->
      <section class="space-y-3">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
          <h2 class="text-xl md:text-2xl font-semibold">{{ t('design.arenaTitle') }}</h2>
          <span class="text-xs uppercase tracking-[0.2em] text-base-content/60">
            {{ t('design.toolLabel') }}: Figma
          </span>
        </div>
        <p class="max-w-3xl text-sm text-base-content/80">{{ t('design.arenaDesc') }}</p>
        <div class="rounded-xl border border-base-300/80 overflow-hidden bg-base-200/40">
          <img
            src="/img/figma/arena-quiz.webp"
            :alt="t('design.arenaAlt')"
            class="w-full h-auto"
            loading="lazy"
            width="1185"
            height="631"
          />
        </div>
      </section>

      <!-- HBM -->
      <section class="space-y-3">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
          <h2 class="text-xl md:text-2xl font-semibold">{{ t('design.hbmTitle') }}</h2>
          <span class="text-xs uppercase tracking-[0.2em] text-base-content/60">
            {{ t('design.toolLabel') }}: Figma
          </span>
        </div>
        <p class="max-w-3xl text-sm text-base-content/80">{{ t('design.hbmDesc') }}</p>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl">
          <div class="rounded-xl border border-base-300/80 overflow-hidden bg-base-200/40">
            <img
              src="/img/figma/hbm-1.webp"
              :alt="t('design.hbmAlt1')"
              class="w-full h-auto"
              loading="lazy"
              width="343"
              height="697"
            />
          </div>
          <div class="rounded-xl border border-base-300/80 overflow-hidden bg-base-200/40">
            <img
              src="/img/figma/hbm-2.webp"
              :alt="t('design.hbmAlt2')"
              class="w-full h-auto"
              loading="lazy"
              width="345"
              height="688"
            />
          </div>
          <div class="rounded-xl border border-base-300/80 overflow-hidden bg-base-200/40">
            <img
              src="/img/figma/hbm-3.webp"
              :alt="t('design.hbmAlt3')"
              class="w-full h-auto"
              loading="lazy"
              width="368"
              height="692"
            />
          </div>
        </div>
      </section>

      <!-- Back -->
      <section class="border-t border-base-300/60 pt-6 mt-10">
        <NuxtLink to="/" class="link link-primary text-sm">
          {{ t('design.back') }}
        </NuxtLink>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t("design.seoTitle"),
  description: () => t("design.seoDescription"),
  ogTitle: () => t("design.seoTitle"),
  ogDescription: () => t("design.seoDescription"),
})
</script>
