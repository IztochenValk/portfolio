import { messages, LOCALES, type Locale } from "~/i18n/messages"

function resolvePath(root: unknown, segments: string[]): unknown {
  let node: unknown = root
  for (const seg of segments) {
    if (node && typeof node === "object" && seg in (node as Record<string, unknown>)) {
      node = (node as Record<string, unknown>)[seg]
    } else {
      return undefined
    }
  }
  return node
}

/**
 * Lightweight, dependency-free i18n.
 * - `locale`   reactive current locale (shared via useState)
 * - `t(key)`   returns a translated string (falls back to FR, then the key)
 * - `tm(key)`  returns a raw node (arrays / objects) for structured content
 * - `setLocale(l)` switches locale and persists it in a cookie
 */
export function useI18n() {
  const locale = useState<Locale>("locale", () => "fr")

  function resolve(key: string): unknown {
    const segments = key.split(".")
    const current = resolvePath(messages[locale.value], segments)
    if (current !== undefined) return current
    // fallback to French if a key is missing in the active locale
    return resolvePath(messages.fr, segments)
  }

  function t(key: string): string {
    const value = resolve(key)
    return typeof value === "string" ? value : key
  }

  function tm<T = unknown>(key: string): T {
    return resolve(key) as T
  }

  function setLocale(next: Locale) {
    if (!LOCALES.includes(next)) return
    locale.value = next
    const cookie = useCookie<Locale>("locale", {
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      path: "/",
    })
    cookie.value = next
    if (import.meta.client) {
      document.documentElement.lang = next
    }
  }

  function toggleLocale() {
    setLocale(locale.value === "fr" ? "en" : "fr")
  }

  return { locale, t, tm, setLocale, toggleLocale }
}
