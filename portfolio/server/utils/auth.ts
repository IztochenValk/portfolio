import { createHmac, timingSafeEqual } from "node:crypto"

// Cookie de session signé (HMAC), sans dépendance externe.
export const SESSION_COOKIE = "portfolio_session"
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 jours (en secondes)

function secret(): string {
  return process.env.NUXT_SESSION_SECRET || "dev-secret-non-securise-a-changer"
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("base64url")
}

// Jeton = "<expiration_ms>.<signature>"
export function makeSessionToken(): string {
  const exp = String(Date.now() + SESSION_MAX_AGE * 1000)
  return `${exp}.${sign(exp)}`
}

export function verifySessionToken(token?: string | null): boolean {
  if (!token) return false
  const [exp, sig] = token.split(".")
  if (!exp || !sig) return false
  const expected = sign(exp)
  // Comparaison à temps constant
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false
  return Number(exp) > Date.now()
}
