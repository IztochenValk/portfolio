<script setup lang="ts">
import { ref } from "vue"
import ThemeToggle from "@/components/ThemeToggle.vue"

const showProfile = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-base-300 bg-base-100/80 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">

      <!-- Avatar + Nom -->
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="avatar hover:opacity-80 hover:cursor-pointer transition"
          @click="showProfile = true"
          aria-label="Ouvrir le profil"
        >
          <div class="w-10 rounded-full ring-1 ring-base-300 overflow-hidden">
            <img src="/img/picture-cv.webp" alt="Florian Chague" />
          </div>
        </button>

        <NuxtLink to="/" class="leading-tight text-left hover:opacity-80 transition">
          <div class="font-semibold tracking-tight">
            Florian Chague
          </div>
          <div class="text-xs opacity-70">
            Développeur web frontend & backend
          </div>
        </NuxtLink>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2">

        <!-- Desktop navigation -->
        <nav class="hidden items-center gap-2 md:flex">
          <a class="btn btn-ghost btn-sm" href="/#expertise">Expertise</a>
          <a class="btn btn-ghost btn-sm" href="/#experience">Expérience</a>
          <NuxtLink to="/projets" class="btn btn-ghost btn-sm">Projets</NuxtLink>
          <a class="btn btn-ghost btn-sm" href="/#ci-cd">CI/CD &amp; Tests</a>
          <NuxtLink to="/visual-lab" class="btn btn-ghost btn-sm">Visual Lab</NuxtLink>
          <a class="btn btn-primary btn-sm" href="/#contact">Contact</a>
        </nav>

        <!-- Mobile hamburger -->
        <div class="dropdown dropdown-end md:hidden">
          <label
            tabindex="0"
            class="btn btn-ghost btn-sm"
            aria-label="Ouvrir le menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

          <ul
            tabindex="0"
            class="menu dropdown-content mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow"
          >
            <li><a href="/#expertise">Expertise</a></li>
            <li><a href="/#experience">Expérience</a></li>
            <li><NuxtLink to="/projets">Projets</NuxtLink></li>
            <li><a href="/#ci-cd">CI/CD &amp; Tests</a></li>
            <li><NuxtLink to="/visual-lab">Visual Lab</NuxtLink></li>
            <li class="mt-1">
              <a class="btn btn-primary btn-sm w-full" href="/#contact">Contact</a>
            </li>
          </ul>
        </div>

        <ThemeToggle />
      </div>
    </div>

    <ProfileModal :open="showProfile" @close="showProfile = false" />
  </header>
</template>
