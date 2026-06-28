// Protège tout le portfolio : redirige vers /login si la session n'est pas valide.
export default defineNuxtRouteMiddleware(async (to) => {
  const headers = import.meta.server ? useRequestHeaders(["cookie"]) : undefined

  let authed = false
  try {
    const res = await $fetch<{ authed: boolean }>("/api/auth/status", { headers })
    authed = res.authed
  } catch {
    authed = false
  }

  if (to.path === "/login") {
    if (authed) return navigateTo("/")
    return
  }

  if (!authed) return navigateTo("/login")
})
