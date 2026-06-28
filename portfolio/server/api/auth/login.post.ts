export default defineEventHandler(async (event) => {
  const { password } = await readBody<{ password?: string }>(event)
  const config = useRuntimeConfig(event)

  if (!password || password !== config.portfolioPassword) {
    throw createError({ statusCode: 401, statusMessage: "Mot de passe incorrect" })
  }

  setCookie(event, SESSION_COOKIE, makeSessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  })

  return { ok: true }
})
