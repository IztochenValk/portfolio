import { describe, it, expect, beforeEach, vi } from "vitest"
import { setActivePinia, createPinia } from "pinia"
import { useThemeStore } from "~/stores/theme"

describe("useThemeStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // Reset DOM and storage between tests
    document.documentElement.removeAttribute("data-theme")
    localStorage.clear()
  })

  it("initialise au thème light par défaut quand aucune préférence n'est sauvegardée", () => {
    // Mock matchMedia : pas de préférence dark
    vi.stubGlobal("matchMedia", () => ({
      matches: false,
      media: "(prefers-color-scheme: dark)",
      addEventListener: () => {},
      removeEventListener: () => {},
    }))

    const theme = useThemeStore()
    theme.init()

    expect(theme.theme).toBe("light")
    expect(document.documentElement.getAttribute("data-theme")).toBe("light")
  })

  it("respecte la préférence dark sauvegardée dans localStorage", () => {
    localStorage.setItem("theme", "dark")

    const theme = useThemeStore()
    theme.init()

    expect(theme.theme).toBe("dark")
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark")
  })

  it("bascule correctement entre light et dark via toggle()", () => {
    const theme = useThemeStore()
    theme.theme = "light"

    theme.toggle()
    expect(theme.theme).toBe("dark")
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark")
    expect(localStorage.getItem("theme")).toBe("dark")

    theme.toggle()
    expect(theme.theme).toBe("light")
    expect(localStorage.getItem("theme")).toBe("light")
  })
})
