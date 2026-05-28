// frontend/src/utils/auth.ts
// Source unique de vérité pour l'authentification et le "guest mode".

const TOKEN_KEY = "authToken";   // une seule clé
const GUEST_FLAG = "guestMode";  // "1" = guest activé

function safeLS() {
  // protège contre SSR / iframes / privacy mode
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

/** Lit le token (string), ou null si absent. */
export function getToken(): string | null {
  const ls = safeLS();
  if (!ls) return null;
  return ls.getItem(TOKEN_KEY);
}

/** Écrit ou supprime le token. */
export function setToken(token: string | null): void {
  const ls = safeLS();
  if (!ls) return;
  if (token) ls.setItem(TOKEN_KEY, token);
  else ls.removeItem(TOKEN_KEY);
}

/** Active le mode invité (pose guestMode=1 et un token "guest" si absent). */
export function setGuest(): void {
  const ls = safeLS();
  if (!ls) return;
  ls.setItem(GUEST_FLAG, "1");
  if (!ls.getItem(TOKEN_KEY)) {
    ls.setItem(TOKEN_KEY, "guest"); // pour satisfaire d'anciens garde-fous naïfs
  }
}

/** Désactive le mode invité (retire guestMode, et le token si c'était "guest"). */
export function clearGuest(): void {
  const ls = safeLS();
  if (!ls) return;
  ls.removeItem(GUEST_FLAG);
  if (ls.getItem(TOKEN_KEY) === "guest") {
    ls.removeItem(TOKEN_KEY);
  }
}

/** Vrai si guestMode=1 ou si le token vaut littéralement "guest". */
export function isGuest(): boolean {
  const ls = safeLS();
  if (!ls) return false;
  return ls.getItem(GUEST_FLAG) === "1" || ls.getItem(TOKEN_KEY) === "guest";
}

/** Déconnecte complètement (retire le token, mais pas guestMode). */
export function logout(): void {
  setToken(null);
}

/** Vrai si on a un token ou si on est guest. */
export function hasSession(): boolean {
  return !!getToken() || isGuest();
}

/** Retire Authorization si la valeur contient "guest" (Bearer guest, etc.). */
export function stripGuestAuthHeader(h: Headers): void {
  const v = h.get("Authorization");
  if (!v) return;
  if (/\bguest\b/i.test(v)) h.delete("Authorization");
}

/** Injecte Authorization: Bearer <token> si token "normal". Jamais en guest. */
export function ensureBearerAuthHeader(obj: Record<string, string>): void {
  const t = getToken();
  if (!t || t === "guest") {
    delete obj["Authorization"];
    return;
  }
  obj["Authorization"] = `Bearer ${t}`;
}
