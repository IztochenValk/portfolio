// Protège tout le portfolio : redirige vers /login si la session n'est pas valide.
// ⚠️ AUTH DÉSACTIVÉE : portfolio public pour que les employeurs puissent y accéder.
// Pour réactiver le mot de passe, remettre AUTH_ENABLED à true.
const AUTH_ENABLED = false

export default defineNuxtRouteMiddleware(async (to) => {
  if (!AUTH_ENABLED) {
    // Auth coupée : la page /login n'a plus de raison d'être, on renvoie vers l'accueil.
    if (to.path === "/login") return navigateTo("/")
    return
  }

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
