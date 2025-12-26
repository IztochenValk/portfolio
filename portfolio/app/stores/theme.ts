import { defineStore } from "pinia"

export type ThemeName = "light" | "dark"

export const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: "light" as ThemeName,
  }),

  actions: {
    init() {
      if (!import.meta.client) return

      const saved = localStorage.getItem("theme") as ThemeName | null

      this.theme =
        saved === "light" || saved === "dark"
          ? saved
          : window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"

      document.documentElement.setAttribute("data-theme", this.theme)
    },

    toggle() {
      this.theme = this.theme === "dark" ? "light" : "dark"
      document.documentElement.setAttribute("data-theme", this.theme)
      localStorage.setItem("theme", this.theme)
    },
  },
})
