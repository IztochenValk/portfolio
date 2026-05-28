<script setup lang="ts">
const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const handleBackdropClick = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-95"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-base-300/60 backdrop-blur-sm"
          @click="handleBackdropClick"
        />

        <!-- Modal content -->
        <div
          class="relative w-full max-w-xl mx-4 shadow-2xl rounded-2xl border border-base-300 bg-base-100/95
                 p-6 md:p-8 flex flex-col gap-6"
        >
          <!-- Close button -->
          <button
            type="button"
            class="btn btn-ghost btn-sm absolute right-3 top-3"
            @click="emit('close')"
          >
            ✕
          </button>

          <!-- Header: avatar + nom -->
          <div class="flex items-center gap-4">
            <div class="avatar">
              <div class="w-16 h-16 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100 overflow-hidden">
                <img
                  src="/img/picture-cv.webp"
                  alt="Photo de profil de Florian Chague"
                  loading="lazy"
                  width="64"
                  height="64"
                />
              </div>
            </div>

            <div class="space-y-1">
              <h2 class="text-xl font-semibold">
                Florian Chague
              </h2>
              <p class="text-sm opacity-80">
                Développeur Full-Stack · CDA obtenu
              </p>
              <div class="flex flex-wrap gap-2">
                <span class="badge badge-primary badge-sm">
                  Vue · Nuxt · Node
                </span>
                <span class="badge badge-outline badge-sm">
                  Java · TypeScript
                </span>
              </div>
            </div>
          </div>

          <!-- Infos principales -->
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-2">
              <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70">
                Coordonnées
              </h3>
              <ul class="text-sm space-y-1">
                <li class="flex gap-2">
                  <span class="opacity-70">Email</span>
                  <span class="font-medium">florian.chague2@gmail.com</span>
                </li>
                <li class="flex gap-2">
                  <span class="opacity-70">Basé à</span>
                  <span class="font-medium">Missègre / France </span>
                </li>
              </ul>
            </div>

            <div class="space-y-2">
              <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70">
                Focus actuel
              </h3>
              <p class="text-sm leading-snug opacity-90">
                Développement full-stack Vue.js / Nuxt.js / Node.js.
                À l'écoute d'opportunités internationales (Thaïlande / remote).
              </p>
            </div>
          </div>

          <!-- Diplômes et docs -->
          <div class="space-y-2">
            <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70">
              Documents
            </h3>
            <div class="flex flex-wrap gap-2">
              <a
                href="/docs/diplome-droit-public.jpg"
                target="_blank"
                class="btn btn-xs md:btn-sm btn-outline"
              >
                Diplôme de droit public
              </a>
              <a
                href="/docs/diplome-cci.jpg"
                target="_blank"
                class="btn btn-xs md:btn-sm btn-outline"
              >
                Diplôme CCI / Web
              </a>
              <a
                href="/docs/anssi-certification.pdf"
                target="_blank"
                class="btn btn-xs md:btn-sm btn-outline"
              >
                Certif. ANSSI
              </a>
              <a
                href="/docs/cnil-certification.pdf"
                target="_blank"
                class="btn btn-xs md:btn-sm btn-outline"
              >
                Certif. CNIL
              </a>
            </div>
          </div>

          <!-- Bas de modal -->
          <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between pt-2 border-t border-base-300">
            <p class="text-xs opacity-70 max-w-xs">
              Portfolio + projets full-stack en évolution continue,
              déployés via Docker et GitHub Actions sur sous-domaines dédiés.
            </p>

            <div class="flex gap-2 justify-end">
              <button
                type="button"
                class="btn btn-ghost btn-sm"
                @click="emit('close')"
              >
                Fermer
              </button>
              <NuxtLink
                to="/projets"
                class="btn btn-primary btn-sm"
                @click="emit('close')"
              >
                Voir les projets
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
