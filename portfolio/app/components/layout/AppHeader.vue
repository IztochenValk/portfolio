<script setup lang="ts">
import { ref } from "vue"
import ThemeToggle from "@/components/ThemeToggle.vue"

const showProfile = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-base-300 bg-base-100/80 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">

      <!-- Avatar + Nom séparés -->
      <div class="flex items-center gap-3">

        <!-- Avatar -> Profil -->
        <button
          type="button"
          class="avatar hover:opacity-80 hover:cursor-pointer transition"
          @click="showProfile = true"
        >
          <div class="w-10 rounded-full ring-1 ring-base-300 overflow-hidden">
            <img src="/img/picture-cv.png" alt="Florian Chague" />
          </div>
        </button>

        <!-- Nom -> Accueil -->
        <NuxtLink
          to="/"
          class="leading-tight text-left hover:opacity-80 transition"
        >
          <div class="font-semibold tracking-tight">
            Florian Chague
          </div>
          <div class="text-xs opacity-70">
            Développeur web frontend & backend
          </div>
        </NuxtLink>
      </div>

      <!-- Menu + Actions -->
      <div class="flex items-center gap-2">

        <!-- Desktop navigation -->
        <nav class="hidden items-center gap-2 md:flex">
          <a class="btn btn-ghost btn-sm" href="#expertise">Expertise</a>
          <a class="btn btn-ghost btn-sm" href="#experience">Expérience</a>
          <NuxtLink to="/projets" class="btn btn-ghost btn-sm">Projets</NuxtLink>
          <NuxtLink to="/visual-lab" class="btn btn-ghost btn-sm">Visual Lab</NuxtLink>
          <a class="btn btn-primary btn-sm" href="#contact">Contact</a>
        </nav>

        <!-- Mobile quick actions -->
        <div class="flex items-center gap-2 md:hidden">
          <NuxtLink to="/visual-lab" class="btn btn-ghost btn-sm">Visual Lab</NuxtLink>
          <a class="btn btn-primary btn-sm" href="#contact">Contact</a>
        </div>

        <ThemeToggle />
      </div>
    </div>

    <!-- Popup Profil -->
    <ProfileModal
      :open="showProfile"
      @close="showProfile = false"
    />
  </header>
</template>
