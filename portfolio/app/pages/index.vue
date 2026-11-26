<template>
  <div>
    <!-- HERO plein écran, images de projets en fondu en arrière-plan -->
    <section
      class="relative flex min-h-[calc(100svh-4rem)] items-center"
    >
      <HeroParticles />

      <div class="relative mx-auto w-full max-w-3xl px-6 text-center">
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          {{ t('home.heroBadge') }}
        </p>
        <h1 class="mt-5 text-4xl font-bold leading-tight md:text-6xl">
          Florian Chague
        </h1>
        <p class="mt-3 text-lg font-medium opacity-80 md:text-2xl">
          {{ t('home.heroTitle') }}
        </p>
        <p class="mt-2 text-sm font-medium opacity-60 md:text-base">
          {{ t('home.heroContract') }}
        </p>
        <p class="mx-auto mt-6 max-w-xl text-base opacity-70">
          {{ t('home.heroCalm') }}
        </p>

        <div class="mt-10 flex flex-wrap justify-center gap-3">
          <NuxtLink
            to="/projets"
            class="btn btn-primary"
          >{{ t('home.ctaProjects') }}</NuxtLink>
          <a
            :href="cvHref"
            target="_blank"
            class="btn btn-ghost"
          >{{ t('home.ctaCv') }}</a>
          <a
            href="#contact"
            class="btn btn-ghost"
          >{{ t('home.ctaContact') }}</a>
        </div>
      </div>

      <a
        href="#featured"
        class="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-50 transition-opacity hover:opacity-100"
        :aria-label="t('home.featuredTitle')"
      >
        <span class="block h-10 w-px animate-pulse bg-base-content" />
      </a>
    </section>

    <!-- 3 PROJETS PHARES -->
    <section
      id="featured"
      class="mx-auto max-w-6xl px-4 py-20"
    >
      <h2 class="text-center text-2xl font-semibold md:text-3xl">
        {{ t('home.featuredTitle') }}
      </h2>

      <div class="mt-10 grid gap-6 md:grid-cols-3">
        <NuxtLink
          v-for="p in featured"
          :key="p.slug"
          :to="`/projets/${p.slug}`"
          class="group rounded-box border border-base-300 bg-base-200/50 p-6 transition hover:-translate-y-1 hover:border-primary/50"
        >
          <p class="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            {{ t(`projects.items.${p.slug}.tagline`) }}
          </p>
          <h3 class="mt-2 text-xl font-semibold">{{ t(`projects.items.${p.slug}.title`) }}</h3>
          <p class="mt-3 text-sm opacity-70">{{ p.stack }}</p>
          <span class="mt-4 inline-block text-sm text-primary opacity-0 transition group-hover:opacity-100">
            {{ t('projects.details') }} →
          </span>
        </NuxtLink>
      </div>

      <div class="mt-10 text-center">
        <NuxtLink
          to="/projets"
          class="link link-hover text-sm opacity-70"
        >{{ t('home.seeAll') }}</NuxtLink>
      </div>
    </section>

    <!-- CONTACT, sobre -->
    <section
      id="contact"
      class="border-t border-base-300 px-4 py-20 text-center"
    >
      <h2 class="text-2xl font-semibold md:text-3xl">
        {{ t('home.contactTitle') }}
      </h2>
      <p class="mx-auto mt-3 max-w-md opacity-70">
        {{ t('home.contactSubtitle') }}
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <a
          class="btn btn-primary"
          href="mailto:florian.chague2@gmail.com"
        >florian.chague2@gmail.com</a>
        <a
          class="btn btn-ghost"
          href="https://github.com/IztochenValk"
          target="_blank"
          rel="noreferrer"
        >GitHub</a>
        <a
          class="btn btn-ghost"
          href="https://linkedin.com/in/florian-chague-023552308"
          target="_blank"
          rel="noreferrer"
        >LinkedIn</a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "home" })

const { t, locale } = useI18n()

const cvHref = computed(() => (locale.value === "en" ? "/docs/cv-en.pdf" : "/docs/cv-fr.pdf"))

const featured = [
  { slug: "bibliospace", stack: "Spring Boot · Nuxt · MySQL · Docker" },
  { slug: "infochasse", stack: "Spring Boot · WebSocket · PostGIS · Leaflet" },
  { slug: "asso-platform", stack: "Spring Boot · Nuxt · Stripe · MySQL" },
]

useSeoMeta({
  title: () => t("home.seoTitle"),
  description: () => t("home.seoDescription"),
  ogTitle: () => t("home.seoTitle"),
  ogDescription: () => t("home.seoDescription"),
  ogImage: "https://kloner.io/img/picture-cv.png",
  ogUrl: "https://kloner.io",
  twitterCard: "summary_large_image",
})
</script>
