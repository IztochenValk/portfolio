export default defineEventHandler((event) => {
  return { authed: verifySessionToken(getCookie(event, SESSION_COOKIE)) }
})
