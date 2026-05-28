<template>
  <div class="min-h-screen bg-base-100 text-base-content flex flex-col">
    <AppHeader />

    <main class="flex-1 mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/components/layout/AppHeader.vue"
import AppFooter from "@/components/layout/AppFooter.vue"
</script>
