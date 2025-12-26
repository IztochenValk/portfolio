<template>
  <button
    class="btn btn-ghost btn-square btn-sm"
    type="button"
    @click="theme.toggle()"
    aria-label="Toggle theme"
  >
    <span class="relative inline-flex h-5 w-5 items-center justify-center">
      <!-- SUN -->
      <svg
        v-if="isLight"
        class="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>

      <!-- MOON -->
      <svg
        v-else
        class="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 109.8 9.8z" />
      </svg>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useThemeStore } from "~/stores/theme"

const theme = useThemeStore()

const isLight = computed(() => theme.theme !== "night")
</script>

<style scoped>
.icon {
  width: 20px;
  height: 20px;
  transition:
    transform 200ms ease,
    opacity 200ms ease;
}

/* animation douce au toggle */
button:active .icon {
  transform: rotate(20deg) scale(0.92);
}
</style>
