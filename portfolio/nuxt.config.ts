// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxt/eslint"],

  eslint: {
    config: {
      stylistic: {
        semi: false,
        quotes: "double",
        indent: 2,
      },
    },
  },

  css: ["~/assets/css/main.css"],

  // TypeScript strict — qualité de code
  typescript: {
    strict: true,
    typeCheck: false, // mettre à true pour vérification au build (plus lent)
  },

  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      quizUrl: process.env.NUXT_PUBLIC_QUIZ_URL || "https://quiz.florianchague.dev",
      plannerUrl: process.env.NUXT_PUBLIC_PLANNER_URL || "https://planner.florianchague.dev",
      marioUrl: process.env.NUXT_PUBLIC_MARIO_URL || "https://mario.florianchague.dev",
      bibliospaceUrl: process.env.NUXT_PUBLIC_BIBLIOSPACE_URL || "https://bibliospace.florianchague.dev",
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://florianchague.dev",
    },
  },

  app: {
    head: {
      title: "Florian Chague — Développeur Full-Stack Vue.js / Nuxt.js / Node.js",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Portfolio de Florian Chague — Développeur Full-Stack Vue.js / Nuxt.js / Node.js / Java. CDA obtenu, projets full-stack avec CI/CD Docker et déploiement GHCR.",
        },
        { name: "author", content: "Florian Chague" },
        // Open Graph
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "fr_FR" },
        { property: "og:site_name", content: "Florian Chague — Portfolio" },
        { property: "og:title", content: "Florian Chague — Développeur Full-Stack" },
        {
          property: "og:description",
          content: "Vue.js / Nuxt.js / Node.js / Java · CDA · Portfolio + projets full-stack",
        },
        { property: "og:url", content: "https://florianchague.dev" },
        { property: "og:image", content: "https://florianchague.dev/img/picture-cv.webp" },
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Florian Chague — Développeur Full-Stack" },
        {
          name: "twitter:description",
          content: "Vue.js / Nuxt.js / Node.js / Java · CDA · Portfolio + projets full-stack",
        },
        // CSP
        {
          "http-equiv": "Content-Security-Policy",
          content: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob: https:",
            "font-src 'self' data: https:",
            "connect-src 'self' https:",
            "frame-src https://quiz.florianchague.dev https://planner.florianchague.dev https://mario.florianchague.dev https://bibliospace.florianchague.dev",
            "base-uri 'self'",
            "form-action 'self'",
            "object-src 'none'",
          ].join("; "),
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: "https://florianchague.dev" },
      ],
    },
  },
})
