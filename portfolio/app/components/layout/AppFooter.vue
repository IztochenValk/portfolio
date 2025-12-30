<template>
  <footer class="border-t border-base-300">
    <div class="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 md:flex-row md:items-center md:justify-between">
      <div class="text-sm opacity-70">
        © {{ year }} Florian Chague
      </div>

      <div class="flex items-center gap-2 text-sm opacity-70">
        <a class="link link-hover" href="/robots.txt">robots</a>
        <span class="opacity-30">•</span>
        <a class="link link-hover" href="/docs/cv.pdf" target="_blank" rel="noreferrer">CV</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
