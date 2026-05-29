<template>
  <div class="min-h-screen bg-base-100 text-base-content">

    <main>
      <!-- HERO -->
      <section class="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div class="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div class="badge badge-soft badge-primary">{{ t('home.heroBadge') }}</div>
            <h1 class="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              {{ t('home.heroTitle') }}
            </h1>
            <p class="mt-4 text-base opacity-80 md:text-lg">
              {{ t('home.heroIntroBefore') }}<strong>{{ t('home.heroIntroStack') }}</strong>{{ t('home.heroIntroAfter') }}
            </p>

            <div class="mt-6 flex flex-wrap gap-3">
              <a href="#contact" class="btn btn-primary">{{ t('home.ctaContact') }}</a>
              <a href="#projets" class="btn btn-outline">{{ t('home.ctaProjects') }}</a>
              <a :href="cvHref" target="_blank" class="btn btn-outline">{{ t('home.ctaCv') }}</a>
              <a class="btn btn-ghost" href="https://github.com/IztochenValk" target="_blank" rel="noreferrer">
                {{ t('home.ctaGithub') }}
              </a>
              <a class="btn btn-ghost" href="https://www.linkedin.com/in/florian-chague-023552308/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>

            <div class="mt-8 grid gap-3 sm:grid-cols-3">
              <div class="stat rounded-box border border-base-300 bg-base-200">
                <div class="stat-title">{{ t('home.statSpecialtyTitle') }}</div>
                <div class="stat-value text-xl">Web</div>
                <div class="stat-desc opacity-70">{{ t('home.statSpecialtyDesc') }}</div>
              </div>
              <div class="stat rounded-box border border-base-300 bg-base-200">
                <div class="stat-title">{{ t('home.statFrontendTitle') }}</div>
                <div class="stat-value text-xl">React</div>
                <div class="stat-value text-xl">Nuxt/Vue</div>
                <div class="stat-desc opacity-70">{{ t('home.statFrontendDesc') }}</div>
              </div>
              <div class="stat rounded-box border border-base-300 bg-base-200">
                <div class="stat-title">{{ t('home.statBackendTitle') }}</div>
                <div class="stat-value text-xl">Java / Node</div>
                <div class="stat-desc opacity-70">{{ t('home.statBackendDesc') }}</div>
              </div>
            </div>
          </div>

          <!-- CE QUE JE FAIS -->
          <div class="relative">
            <div class="card border border-base-300 bg-base-200 shadow-xl">
              <div class="card-body">
                <h2 class="card-title">{{ t('home.whatTitle') }}</h2>
                <ul class="mt-2 space-y-3">
                  <li v-for="item in whatItems" :key="item.title" class="flex gap-3">
                    <span class="badge badge-primary badge-sm mt-1"></span>
                    <div>
                      <div class="font-semibold">{{ item.title }}</div>
                      <div class="text-sm opacity-80">
                        {{ item.desc }}
                      </div>
                    </div>
                  </li>
                </ul>

                <div class="mt-6 flex flex-wrap gap-2">
                  <span class="badge badge-soft badge-primary">Vue.js</span>
                  <span class="badge badge-soft badge-primary">Nuxt.js</span>
                  <span class="badge badge-soft badge-primary">React</span>
                  <span class="badge badge-soft badge-primary">JavaScript</span>
                  <span class="badge badge-soft badge-primary">TypeScript</span>
                  <span class="badge badge-soft badge-primary">Java</span>
                  <span class="badge badge-soft badge-primary">Node.js</span>
                  <span class="badge badge-soft badge-primary">Symfony</span>
                </div>
              </div>
            </div>

            <div class="mt-4 alert alert-info border border-base-300">
              <span class="opacity-90">
                {{ t('home.focusAlert') }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="education" class="border-t border-base-300 bg-base-200/40">
        <div class="mx-auto max-w-6xl px-4 py-14">
          <h2 class="text-3xl font-bold">{{ t('home.educationTitle') }}</h2>
          <p class="mt-2 max-w-2xl opacity-80">
            {{ t('home.educationSubtitle') }}
          </p>

          <div class="mt-8 grid gap-4 md:grid-cols-2">

            <!-- CDA Java DevOps -->
            <div class="card border border-base-300 bg-base-100">
              <div class="card-body">
                <h3 class="card-title">
                  {{ t('home.cdaTitle') }}
                </h3>
                <p class="text-sm opacity-80">{{ t('home.cdaMeta') }}</p>
                <p class="mt-2 opacity-80">
                  {{ t('home.cdaDesc') }}
                </p>
                <p class="mt-2">
                  <span class="badge badge-outline badge-success">{{ t('home.cdaBadge') }}</span>
                </p>
                <p class="mt-2">
                  <NuxtLink to="/design" class="link link-primary text-sm">
                    {{ t('home.cdaDesignLink') }}
                  </NuxtLink>
                </p>
              </div>
            </div>

            <!-- Chef de projet digital -->
            <div class="card border border-base-300 bg-base-100">
              <div class="card-body">
                <h3 class="card-title">{{ t('home.cciTitle') }}</h3>
                <p class="text-sm opacity-80">{{ t('home.cciMeta') }}</p>
                <p class="mt-2 opacity-80">
                  {{ t('home.cciDesc') }}
                </p>
                <p class="mt-2">
                  <a class="link link-primary text-sm" href="/docs/diplome-cci.jpg" target="_blank">
                    {{ t('home.viewDiploma') }}
                  </a>
                </p>
              </div>
            </div>

            <!-- Licence droit public -->
            <div class="card border border-base-300 bg-base-100">
              <div class="card-body">
                <h3 class="card-title">{{ t('home.lawTitle') }}</h3>
                <p class="text-sm opacity-80">{{ t('home.lawMeta') }}</p>
                <p class="mt-2 opacity-80">
                  {{ t('home.lawDesc') }}
                </p>
                <p class="mt-2">
                  <a class="link link-primary text-sm" href="/docs/diplome-droit-public.jpg" target="_blank">
                    {{ t('home.viewDiploma') }}
                  </a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- EXPERIENCE / CV -->
      <section id="experience" class="mx-auto max-w-6xl px-4 py-14">
        <h2 class="text-3xl font-bold">{{ t('home.experienceTitle') }}</h2>
        <p class="mt-2 max-w-2xl opacity-80">
          {{ t('home.experienceSubtitle') }}
        </p>

        <div class="mt-8 grid gap-4">

          <!-- Association « Langue bulgare – langue d’Europe » -->
          <div class="card border border-base-300 bg-base-100">
            <div class="card-body">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <h3 class="card-title">{{ t('home.bulgareTitle') }}</h3>
                <span class="badge badge-primary">{{ t('home.bulgarePeriod') }}</span>
              </div>
              <p class="opacity-80">
                {{ t('home.bulgareLead') }}
              </p>
              <ul class="mt-2 list-disc list-inside space-y-1 opacity-80">
                <li>
                  <a class="link link-primary" href="https://wp.languebulgare.fr" target="_blank" rel="noreferrer">wp.languebulgare.fr</a>
                  {{ t('home.bulgareLi1') }}
                </li>
                <li>
                  <a class="link link-primary" href="https://languebulgare.fr" target="_blank" rel="noreferrer">languebulgare.fr</a>
                  {{ t('home.bulgareLi2') }}
                </li>
                <li>{{ t('home.bulgareMoodle') }}</li>
              </ul>
              <p class="mt-2 opacity-80">
                {{ t('home.bulgareSupport') }}
              </p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span class="badge badge-soft badge-primary">WordPress</span>
                <span class="badge badge-soft badge-primary">AssoConnect</span>
                <span class="badge badge-soft badge-primary">Moodle</span>
                <span class="badge badge-soft badge-primary">H5P</span>
                <span class="badge badge-soft badge-primary">HTML/CSS</span>
                <span class="badge badge-soft badge-primary">Traduction BG→FR</span>
              </div>
              <div class="mt-4">
                <NuxtLink
                  to="/stage/langue-bulgare"
                  class="btn btn-sm btn-outline btn-primary"
                >
                  {{ t('home.bulgareDetail') }}
                </NuxtLink>
              </div>
            </div>
          </div>
          <!-- CLBS -->
          <div class="card border border-base-300 bg-base-100">
            <div class="card-body">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <h3 class="card-title">{{ t('home.clbsTitle') }}</h3>
                <span class="badge badge-soft badge-primary">{{ t('home.clbsPeriod') }}</span>
              </div>
              <p class="opacity-80">
                {{ t('home.clbsDesc') }}
              </p>
            </div>
          </div>

          <!-- IBM -->
          <div class="card border border-base-300 bg-base-100">
            <div class="card-body">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <h3 class="card-title">{{ t('home.ibmTitle') }}</h3>
                <span class="badge badge-soft badge-primary">{{ t('home.ibmPeriod') }}</span>
              </div>
              <p class="opacity-80">
                {{ t('home.ibmDesc') }}
              </p>
            </div>
          </div>

          <!-- HCL -->
          <div class="card border border-base-300 bg-base-100">
            <div class="card-body">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <h3 class="card-title">{{ t('home.hclTitle') }}</h3>
                <p class="text-sm opacity-70">{{ t('home.hclLocation') }}</p>
                <span class="badge badge-soft badge-primary">{{ t('home.hclPeriod') }}</span>
              </div>
              <p class="opacity-80">
                {{ t('home.hclDesc') }}
              </p>
            </div>
          </div>
          <!-- Teleperformance -->
          <div class="card border border-base-300 bg-base-100">
            <div class="card-body">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <h3 class="card-title">
                  {{ t('home.tpTitle') }}
                </h3>
                <span class="badge badge-soft badge-primary">{{ t('home.tpPeriod') }}</span>
              </div>
              <p class="text-sm opacity-70">{{ t('home.tpLocation') }}</p>
              <p class="mt-2 opacity-80">
                {{ t('home.tpDesc') }}
              </p>
            </div>
          </div>

          <!-- Pontica -->
          <div class="card border border-base-300 bg-base-100">
            <div class="card-body">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <h3 class="card-title">{{ t('home.ponticaTitle') }}</h3>
                <p class="text-sm opacity-70">{{ t('home.ponticaLocation') }}</p>
                <span class="badge badge-soft badge-primary">{{ t('home.ponticaPeriod') }}</span>
              </div>
              <p class="opacity-80">
                {{ t('home.ponticaDesc') }}
              </p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span class="badge badge-soft badge-primary">JavaScript</span>
                <span class="badge badge-soft badge-primary">HTML/CSS</span>
                <span class="badge badge-soft badge-primary">Front-end</span>
                <span class="badge badge-soft badge-primary">Debug</span>
              </div>
            </div>
          </div>

          <div class="card border border-base-300 bg-base-100">
            <div class="card-body">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <h3 class="card-title">
                  {{ t('home.eduAssistantTitle') }}
                </h3>
                <span class="badge badge-soft badge-primary">{{ t('home.eduAssistantPeriod') }}</span>
              </div>
              <p class="opacity-80">
                {{ t('home.eduAssistantDesc') }}
              </p>
            </div>
          </div>

          <!-- CDG -->
          <div class="card border border-base-300 bg-base-100">
            <div class="card-body">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <h3 class="card-title">{{ t('home.cdgTitle') }}</h3>
                <p class="text-sm opacity-70">{{ t('home.cdgLocation') }}</p>
                <span class="badge badge-soft badge-primary">{{ t('home.cdgPeriod') }}</span>
              </div>
              <p class="opacity-80">
                {{ t('home.cdgDesc') }}
              </p>
            </div>
          </div>

        </div>
      </section>

      <!-- EXPERTISE -->
      <section id="expertise" class="border-t border-base-300 bg-base-200/40">
        <div class="mx-auto max-w-6xl px-4 py-14">
          <h2 class="text-3xl font-bold">{{ t('home.expertiseTitle') }}</h2>
          <p class="mt-2 max-w-2xl opacity-80">
            {{ t('home.expertiseSubtitle') }}
          </p>

          <div class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div class="card border border-base-300 bg-base-100">
              <div class="card-body">
                <h3 class="card-title text-lg">{{ t('home.expFrontendTitle') }}</h3>
                <p class="text-sm opacity-80">
                  {{ t('home.expFrontendDesc') }}
                </p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="badge badge-soft badge-primary">Vue.js/Nuxt.js</span>
                  <span class="badge badge-soft badge-primary">React</span>
                  <span class="badge badge-soft badge-primary">TypeScript</span>
                </div>
              </div>
            </div>

            <div class="card border border-base-300 bg-base-100">
              <div class="card-body">
                <h3 class="card-title text-lg">{{ t('home.expBackendTitle') }}</h3>
                <p class="text-sm opacity-80">
                  {{ t('home.expBackendDesc') }}
                </p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="badge badge-soft badge-primary">Java</span>
                  <span class="badge badge-soft badge-primary">Symfony</span>
                  <span class="badge badge-soft badge-primary">Node.js</span>
                </div>
              </div>
            </div>

            <div class="card border border-base-300 bg-base-100">
              <div class="card-body">
                <h3 class="card-title text-lg">{{ t('home.expQualityTitle') }}</h3>
                <p class="text-sm opacity-80">
                  {{ t('home.expQualityDesc') }}
                </p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="badge badge-soft badge-primary">Debug</span>
                  <span class="badge badge-soft badge-primary">Performance</span>
                  <span class="badge badge-soft badge-primary">Clean Code</span>
                </div>
              </div>
            </div>

            <div class="card border border-base-300 bg-base-100">
              <div class="card-body">
                <h3 class="card-title text-lg">{{ t('home.expEnvTitle') }}</h3>
                <p class="text-sm opacity-80">
                  {{ t('home.expEnvDesc') }}
                </p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="badge badge-soft badge-primary">Linux</span>
                  <span class="badge badge-soft badge-primary">Docker</span>
                  <span class="badge badge-soft badge-primary">CI/CD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CI/CD & TESTS -->
      <section id="ci-cd" class="mx-auto max-w-6xl px-4 py-14">
        <h2 class="text-3xl font-bold">{{ t('home.cicdTitle') }}</h2>
        <p class="mt-2 max-w-3xl opacity-80">
          {{ t('home.cicdIntro') }}
        </p>

        <div class="mt-8 grid gap-4 md:grid-cols-3">
          <div class="card border border-base-300 bg-base-100">
            <div class="card-body">
              <h3 class="card-title text-lg">{{ t('home.cicdCol1Title') }}</h3>
              <ul class="text-sm opacity-80 list-disc list-inside space-y-1">
                <li v-for="line in cicdCol1" :key="line">{{ line }}</li>
              </ul>
              <div class="mt-3 flex flex-wrap gap-2">
                <span class="badge badge-soft badge-primary">GitHub Actions</span>
                <span class="badge badge-soft badge-primary">Docker</span>
                <span class="badge badge-soft badge-primary">GHCR</span>
                <span class="badge badge-soft badge-primary">Trivy</span>
              </div>
            </div>
          </div>

          <div class="card border border-base-300 bg-base-100">
            <div class="card-body">
              <h3 class="card-title text-lg">{{ t('home.cicdCol2Title') }}</h3>
              <ul class="text-sm opacity-80 list-disc list-inside space-y-1">
                <li v-for="line in cicdCol2" :key="line">{{ line }}</li>
              </ul>
              <div class="mt-3 flex flex-wrap gap-2">
                <span class="badge badge-soft badge-primary">Vitest</span>
                <span class="badge badge-soft badge-primary">ESLint</span>
                <span class="badge badge-soft badge-primary">Prettier</span>
                <span class="badge badge-soft badge-primary">TypeScript</span>
              </div>
            </div>
          </div>

          <div class="card border border-base-300 bg-base-100">
            <div class="card-body">
              <h3 class="card-title text-lg">{{ t('home.cicdCol3Title') }}</h3>
              <ul class="text-sm opacity-80 list-disc list-inside space-y-1">
                <li v-for="line in cicdCol3" :key="line">{{ line }}</li>
              </ul>
              <div class="mt-3 flex flex-wrap gap-2">
                <span class="badge badge-soft badge-primary">Ubuntu</span>
                <span class="badge badge-soft badge-primary">nginx</span>
                <span class="badge badge-soft badge-primary">Docker Compose</span>
                <span class="badge badge-soft badge-primary">SSH</span>
              </div>
            </div>
          </div>
        </div>

        <p class="mt-6 text-sm opacity-70">
          {{ t('home.cicdSourcePrefix') }}
          <a class="link link-primary" href="https://github.com/IztochenValk/portfolio/blob/main/.github/workflows/docker-publish.yml" target="_blank" rel="noreferrer">
            .github/workflows/docker-publish.yml
          </a>.
        </p>
      </section>

      <!-- CONTACT -->
      <section id="contact" class="mx-auto max-w-6xl px-4 py-14">
        <div class="card border border-base-300 bg-base-100">
          <div class="card-body">
            <h2 class="card-title text-2xl">{{ t('home.contactTitle') }}</h2>
            <p class="opacity-80">
              {{ t('home.contactSubtitle') }}
            </p>

            <div class="mt-6 grid gap-3 md:grid-cols-3">
              <div class="rounded-box border border-base-300 bg-base-200 p-4">
                <div class="text-sm opacity-70">{{ t('home.contactPhone') }}</div>
                <div class="font-semibold">+33 69 98 916 47</div>
              </div>
              <div class="rounded-box border border-base-300 bg-base-200 p-4">
                <div class="text-sm opacity-70">{{ t('home.contactEmail') }}</div>
                <div class="font-semibold">florian.chague2@gmail.com</div>
              </div>
              <div class="rounded-box border border-base-300 bg-base-200 p-4">
                <div class="text-sm opacity-70">{{ t('home.contactGithub') }}</div>
                <a class="link font-semibold" href="https://github.com/IztochenValk" target="_blank" rel="noreferrer">
                  IztochenValk
                </a>
              </div>
              <div class="rounded-box border border-base-300 bg-base-200 p-4">
                <div class="text-sm opacity-70">LinkedIn</div>
                <a class="link font-semibold" href="https://www.linkedin.com/in/florian-chague-023552308/" target="_blank" rel="noreferrer">
                  florian-chague
                </a>
              </div>
            </div>

            <div class="mt-6 flex flex-wrap gap-3">
              <a class="btn btn-primary" href="mailto:florian.chague2@gmail.com">{{ t('home.contactSend') }}</a>
            </div>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup lang="ts">
const { t, tm, locale } = useI18n()

const cvHref = computed(() => (locale.value === "en" ? "/docs/cv-en.pdf" : "/docs/cv-fr.pdf"))

type WhatItem = { title: string; desc: string }

const whatItems = computed(() => tm<WhatItem[]>("home.what"))
const cicdCol1 = computed(() => tm<string[]>("home.cicdCol1"))
const cicdCol2 = computed(() => tm<string[]>("home.cicdCol2"))
const cicdCol3 = computed(() => tm<string[]>("home.cicdCol3"))

useSeoMeta({
  title: () => t("home.seoTitle"),
  description: () => t("home.seoDescription"),
  ogTitle: () => t("home.seoTitle"),
  ogDescription: () => t("home.seoDescription"),
  ogImage: "https://florianchague.dev/img/picture-cv.png",
  ogUrl: "https://florianchague.dev",
  twitterCard: "summary_large_image",
})
</script>
