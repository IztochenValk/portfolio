import type { Locale } from "~/i18n/messages"

// Initialises the locale from the persisted cookie (works on server + client)
// and keeps the <html lang> attribute in sync reactively.
export default defineNuxtPlugin(() => {
  const locale = useState<Locale>("locale", () => "fr")
  const cookie = useCookie<Locale>("locale")

  if (cookie.value === "fr" || cookie.value === "en") {
    locale.value = cookie.value
  }

  useHead({
    htmlAttrs: {
      lang: locale,
    },
  })
})
