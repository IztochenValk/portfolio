<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 px-4">
    <div class="card w-full max-w-sm bg-base-100 shadow-2xl border border-base-300/60">
      <div class="card-body gap-6">
        <div class="text-center space-y-1">
          <p class="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
            Accès privé
          </p>
          <h1 class="text-2xl font-semibold">Florian Chague</h1>
          <p class="text-sm text-base-content/60">
            Ce portfolio est privé. Entre le mot de passe pour continuer.
          </p>
        </div>

        <form class="space-y-4" @submit.prevent="submit">
          <label class="form-control w-full">
            <span class="label-text mb-1 block">Mot de passe</span>
            <input
              v-model="password"
              type="password"
              autocomplete="current-password"
              class="input input-bordered w-full"
              :class="{ 'input-error': !!error }"
              placeholder="••••••••"
              required
              autofocus
            >
          </label>

          <p v-if="error" class="text-error text-sm">{{ error }}</p>

          <button type="submit" class="btn btn-primary w-full" :disabled="loading">
            <span v-if="loading" class="loading loading-spinner loading-sm" />
            {{ loading ? "Connexion…" : "Entrer" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
useSeoMeta({ title: "Accès privé", robots: "noindex, nofollow" })

const password = ref("")
const error = ref("")
const loading = ref(false)

async function submit() {
  error.value = ""
  loading.value = true
  try {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: { password: password.value },
    })
    await navigateTo("/")
  }
  catch (e: unknown) {
    const err = e as { data?: { statusMessage?: string } }
    error.value = err?.data?.statusMessage || "Mot de passe incorrect"
    password.value = ""
  }
  finally {
    loading.value = false
  }
}
</script>
