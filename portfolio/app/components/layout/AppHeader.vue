<template>
  <header class="sticky top-0 z-50 border-b border-base-300 bg-base-100/80 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <NuxtLink to="/" class="flex items-center gap-3">
        <div class="avatar">
          <div class="w-10 rounded-full ring-1 ring-base-300">
            <img src="/img/picture-cv.png" alt="Florian Chague" />
          </div>
        </div>

        <div class="leading-tight">
          <div class="font-semibold">Florian Chague</div>
          <div class="text-xs opacity-70">Développeur web frontend & backend</div>
        </div>
      </NuxtLink>

      <div class="flex items-center gap-2">
        <nav class="hidden items-center gap-2 md:flex">
          <a class="btn btn-ghost btn-sm" href="#expertise">Expertise</a>
          <a class="btn btn-ghost btn-sm" href="#experience">Expérience</a>
          <NuxtLink to="/projets" class="btn btn-ghost btn-sm">
            Projets
          </NuxtLink>
          <NuxtLink to="/visual-lab" class="btn btn-ghost btn-sm">Visual Lab</NuxtLink>
          <a class="btn btn-primary btn-sm" href="#contact">Contact</a>
        </nav>

        <div class="flex items-center gap-2 md:hidden">
          <NuxtLink to="/visual-lab" class="btn btn-ghost btn-sm">Visual Lab</NuxtLink>
          <a class="btn btn-primary btn-sm" href="#contact">Contact</a>
        </div>

        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import ThemeToggle from "@/components/ThemeToggle.vue"
</script>
