<template>
  <div class="relative">
    <!-- Ambient background -->
    <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div class="absolute -top-48 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      <div class="absolute -bottom-48 right-[-140px] h-[560px] w-[560px] rounded-full bg-secondary/15 blur-3xl" />
      <div
        class="absolute inset-0 opacity-[0.06]"
        style="
          background-image: linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px);
          background-size: 44px 44px;
        "
      />
      <div class="absolute inset-0 bg-gradient-to-b from-base-100/0 via-base-100/35 to-base-100" />
    </div>

    <!-- HERO -->
    <section>
      <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100/70 px-3 py-1 text-sm backdrop-blur">
            <span class="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span class="opacity-80">Visual Lab</span>
            <span class="opacity-50">•</span>
            <span class="opacity-80">Experiments</span>
          </div>

          <h1 class="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Laboratoire visuel</h1>

          <p class="mt-3 text-base opacity-80 md:text-lg">
            Cards indépendantes, micro-interactions, expérimentations SVG et effets. Layout stable, sans écrasement.
          </p>

          <div class="mt-5 flex flex-wrap gap-2">
            <span class="badge badge-outline">Nuxt</span>
            <span class="badge badge-outline">Vue</span>
            <span class="badge badge-outline">DaisyUI</span>
            <span class="badge badge-outline">Tailwind</span>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <button class="btn btn-primary btn-sm md:btn-md" type="button" @click="scrollToGallery">
            Explorer
          </button>

          <div class="join">
            <button
              class="btn btn-sm md:btn-md join-item"
              :class="viewMode === 'grid' ? 'btn-active' : ''"
              type="button"
              @click="viewMode = 'grid'"
            >
              Grid
            </button>
            <button
              class="btn btn-sm md:btn-md join-item"
              :class="viewMode === 'showcase' ? 'btn-active' : ''"
              type="button"
              @click="viewMode = 'showcase'"
            >
              Showcase
            </button>
          </div>

          <label class="flex items-center gap-2 text-sm opacity-80 ml-2 select-none">
            <input v-model="enableWow" type="checkbox" class="toggle toggle-sm" />
            WOW
          </label>
        </div>
      </div>

      <div class="mt-8 grid gap-3 md:grid-cols-3">
        <div class="rounded-2xl border border-base-300 bg-base-100/70 p-4 backdrop-blur">
          <div class="text-sm opacity-70">Objectif</div>
          <div class="mt-1 font-semibold">Beau, utile, lisible</div>
          <div class="mt-1 text-sm opacity-70">Pas de gimmicks, juste du design propre.</div>
        </div>

        <div class="rounded-2xl border border-base-300 bg-base-100/70 p-4 backdrop-blur">
          <div class="text-sm opacity-70">Rendu</div>
          <div class="mt-1 font-semibold">Zéro écrasement</div>
          <div class="mt-1 text-sm opacity-70">Grid stable, items-start, pas de card imbriquée.</div>
        </div>

        <div class="rounded-2xl border border-base-300 bg-base-100/70 p-4 backdrop-blur">
          <div class="text-sm opacity-70">Compat</div>
          <div class="mt-1 font-semibold">SSR safe</div>
          <div class="mt-1 text-sm opacity-70">p5 rendu uniquement côté client.</div>
        </div>
      </div>
    </section>

    <div class="my-10 h-px w-full bg-base-300/80" />

    <!-- GALLERY -->
    <section ref="galleryRef">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="text-2xl font-semibold">Galerie</h2>
          <p class="mt-1 text-sm opacity-70">Recherche, tri, et rendu sécurisé côté client.</p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <label class="input input-bordered flex items-center gap-2">
            <svg class="h-4 w-4 opacity-70" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <input v-model="query" type="text" class="grow" placeholder="Search visuals..." />
          </label>

          <select v-model="sortMode" class="select select-bordered">
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <!-- GRID -->
      <div v-if="viewMode === 'grid'" class="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
        <article v-for="v in filteredVisuals" :key="v.key" class="group relative">
          <!-- glow -->
          <div
            class="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          <!-- WOW surface wrapper (neutre, pas une card) -->
          <div
            class="wow-surface relative"
            @pointermove="applyWow"
            @pointerleave="resetWow"
          >
            <div class="wow-noise pointer-events-none absolute inset-0 rounded-3xl"></div>
            <div class="wow-inner relative">
              <ClientOnly>
                <component :is="v.component" />
                <template #fallback>
                  <div class="skeleton h-[520px] w-full rounded-3xl"></div>
                </template>
              </ClientOnly>
            </div>
          </div>
        </article>
      </div>

      <!-- SHOWCASE -->
      <div v-else class="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <div class="group relative">
          <div
            class="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/25 via-secondary/25 to-primary/25 blur-xl opacity-70 transition-opacity duration-500 group-hover:opacity-100"
          />

          <div
            class="wow-surface relative"
            @pointermove="applyWow"
            @pointerleave="resetWow"
          >
            <div class="wow-noise pointer-events-none absolute inset-0 rounded-3xl"></div>

            <div class="relative mb-3 flex items-center justify-between gap-4">
              <div class="min-w-0">
                <div class="text-sm opacity-70">Featured</div>
                <div class="mt-1 truncate text-xl font-semibold">{{ featured.title }}</div>
                <div class="mt-1 text-sm opacity-70">{{ featured.subtitle }}</div>
              </div>
              <span class="badge badge-primary">Live</span>
            </div>

            <div class="wow-inner relative">
              <ClientOnly>
                <component :is="featured.component" />
                <template #fallback>
                  <div class="skeleton h-[560px] w-full rounded-3xl"></div>
                </template>
              </ClientOnly>
            </div>
          </div>
        </div>

        <div class="rounded-3xl border border-base-300 bg-base-100/70 p-6 backdrop-blur">
          <div class="text-sm opacity-70">Pourquoi ça marche</div>
          <ul class="mt-3 space-y-2 text-sm opacity-80">
            <li>Chaque module est autonome et gère sa propre card.</li>
            <li>La page ne rajoute pas une card autour, donc pas d’imbriquation.</li>
            <li>Le wrapper WOW est neutre, il ne change que l’interaction visuelle.</li>
            <li>p5 est chargé uniquement côté client.</li>
          </ul>

          <div class="mt-6">
            <div class="text-sm opacity-70">Modules</div>
            <div class="mt-2 flex flex-wrap gap-2">
              <button
                v-for="v in filteredVisuals"
                :key="v.key"
                class="btn btn-sm btn-ghost"
                type="button"
                @click="setFeatured(v.key)"
              >
                {{ v.title }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="filteredVisuals.length === 0"
        class="mt-8 rounded-2xl border border-base-300 bg-base-100/70 p-6 text-sm opacity-80 backdrop-blur"
      >
        Aucun module ne correspond à ta recherche.
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from "vue"

type VisualItem = {
  key: string
  title: string
  subtitle: string
  badge?: string
  featured?: boolean
  createdAt: string
  component: any
  tags: string[]
}

const viewMode = ref<"grid" | "showcase">("grid")
const query = ref("")
const sortMode = ref<"featured" | "newest" | "name">("featured")

const enableWow = ref(true)

const galleryRef = ref<HTMLElement | null>(null)
function scrollToGallery() {
  galleryRef.value?.scrollIntoView({ behavior: "smooth", block: "start" })
}

const serverStub = (height = 420) => ({
  template: `<div class="skeleton w-full rounded-3xl" style="height:${height}px"></div>`,
})

const SakuraCard = defineAsyncComponent(() => import("@/components/visuals/SakuraCard.vue"))
const NeonFlowCard = defineAsyncComponent(() => import("@/components/visuals/NeonFlowCard.vue"))
const OrbitalHaloCard = defineAsyncComponent(() => import("@/components/visuals/OrbitalHaloCard.vue"))

const ParticleNetworkCard = defineAsyncComponent(async () => {
  if (import.meta.server) return { default: serverStub(420) }
  return import("@/components/visuals/ParticleNetworkCard.vue")
})

const AuroraPulseCard = defineAsyncComponent(() => import("@/components/visuals/AuroraPulseCard.vue"))
const PrismTiltCard = defineAsyncComponent(() => import("@/components/visuals/PrismTiltCard.vue"))
const MeteorTrailCard = defineAsyncComponent(() => import("@/components/visuals/MeteorTrailCard.vue"))

const visuals = ref<VisualItem[]>([
  {
    key: "sakura",
    title: "Sakura Card",
    subtitle: "SVG petals in the breeze",
    badge: "Featured",
    featured: true,
    createdAt: "2025-12-01",
    component: SakuraCard,
    tags: ["svg", "motion", "petals", "featured"],
  },
  {
    key: "neon-flow",
    title: "Neon Flow Card",
    subtitle: "Neon gradients & flow",
    createdAt: "2025-12-10",
    component: NeonFlowCard,
    tags: ["neon", "gradient", "ui"],
  },
  {
    key: "orbital-halo",
    title: "Orbital Halo Card",
    subtitle: "Orbit + glow system",
    createdAt: "2025-12-12",
    component: OrbitalHaloCard,
    tags: ["orbit", "glow", "motion"],
  },
  {
    key: "particle-network",
    title: "Particle Network Card",
    subtitle: "Network particles (p5)",
    createdAt: "2025-12-15",
    component: ParticleNetworkCard,
    tags: ["particles", "network", "interactive", "p5"],
  },
  {
    key: "aurora-pulse",
    title: "Aurora Pulse",
    subtitle: "Aurora gradient + glow drift",
    createdAt: "2025-12-23",
    component: AuroraPulseCard,
    tags: ["css", "aurora", "glow", "gradient"],
  },
  {
    key: "prism-tilt",
    title: "Prism Tilt",
    subtitle: "Glass shimmer + tilt",
    createdAt: "2025-12-23",
    component: PrismTiltCard,
    tags: ["css", "glass", "tilt", "shimmer"],
  },
  {
    key: "meteor-trail",
    title: "Meteor Trail",
    subtitle: "Starfield + meteors",
    createdAt: "2025-12-23",
    component: MeteorTrailCard,
    tags: ["css", "space", "meteors", "stars"],
  },
])

const normalizedQuery = computed(() => query.value.trim().toLowerCase())

const filteredVisuals = computed(() => {
  const q = normalizedQuery.value
  let list = visuals.value

  if (q) {
    list = list.filter((v) => {
      const hay = `${v.title} ${v.subtitle} ${v.tags.join(" ")}`.toLowerCase()
      return hay.includes(q)
    })
  }

  if (sortMode.value === "name") return [...list].sort((a, b) => a.title.localeCompare(b.title))
  if (sortMode.value === "newest") return [...list].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))

  return [...list].sort((a, b) => {
    const af = a.featured ? 1 : 0
    const bf = b.featured ? 1 : 0
    if (af !== bf) return bf - af
    return a.createdAt < b.createdAt ? 1 : -1
  })
})

const featuredKey = ref(visuals.value.find((v) => v.featured)?.key ?? visuals.value[0]?.key)
const featured = computed(() => visuals.value.find((v) => v.key === featuredKey.value) ?? visuals.value[0])

function setFeatured(key: string) {
  featuredKey.value = key
  viewMode.value = "showcase"
}

function applyWow(e: PointerEvent) {
  if (!enableWow.value) return
  const el = e.currentTarget as HTMLElement | null
  if (!el) return

  const r = el.getBoundingClientRect()
  const x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width))
  const y = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height))

  const rx = (0.5 - y) * 10
  const ry = (x - 0.5) * 14

  el.style.setProperty("--mx", `${x}`)
  el.style.setProperty("--my", `${y}`)
  el.style.setProperty("--rx", `${rx}deg`)
  el.style.setProperty("--ry", `${ry}deg`)
}

function resetWow(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement | null
  if (!el) return
  el.style.setProperty("--rx", `0deg`)
  el.style.setProperty("--ry", `0deg`)
}
</script>

<style scoped>
.wow-surface {
  --mx: 0.5;
  --my: 0.5;
  --rx: 0deg;
  --ry: 0deg;
  perspective: 900px;
}

.wow-inner {
  transform: rotateX(var(--rx)) rotateY(var(--ry)) translateZ(0);
  transform-style: preserve-3d;
  transition: transform 180ms cubic-bezier(.2,.8,.2,1);
  will-change: transform;
}

/* noise procedural fin (sans image) */
.wow-noise {
  opacity: 0.08;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
  mask-image: radial-gradient(closest-side, rgba(0,0,0,1), rgba(0,0,0,0.2));
  pointer-events: none;
}

/* highlight cursor reactive */
.wow-surface::after {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: 24px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 250ms ease;
  background: radial-gradient(
    500px 320px at calc(var(--mx) * 100%) calc(var(--my) * 100%),
    rgba(255,255,255,0.22),
    transparent 60%
  );
}

.wow-surface:hover::after {
  opacity: 1;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .wow-inner {
    transition: none !important;
    transform: none !important;
  }
  .wow-surface::after {
    transition: none !important;
  }
}
</style>
