<template>
  <section class="min-h-[calc(100vh-6rem)] px-4 py-10 md:px-8 lg:px-16">
    <div class="max-w-5xl mx-auto space-y-10">
      <nav class="text-xs breadcrumb text-base-content/60">
        <ul>
          <li><NuxtLink to="/">Accueil</NuxtLink></li>
          <li><NuxtLink to="/projets">Projets</NuxtLink></li>
          <li>Bibliospace</li>
        </ul>
      </nav>

      <header class="space-y-4">
        <p class="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
          Projet fil rouge CDA
        </p>
        <h1 class="text-3xl md:text-4xl font-semibold">
          Bibliospace — Application de gestion de bibliothèque
        </h1>
        <p class="max-w-2xl text-sm md:text-base text-base-content/80">
          Application web full-stack développée comme projet fil rouge du titre
          Concepteur Développeur d'Applications (CDA). Permet à un utilisateur de cataloguer
          sa bibliothèque personnelle, suivre ses emprunts, ajouter des notes de lecture
          et consulter des statistiques sur ses habitudes de lecture.
        </p>
        <div class="flex flex-wrap gap-2">
          <span class="badge badge-success badge-outline">En production</span>
          <a
            href="https://bibliospace.florianchague.dev"
            target="_blank"
            rel="noreferrer"
            class="btn btn-sm btn-primary"
          >
            Voir la démo en ligne
          </a>
        </div>
      </header>

      <section class="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start">
        <div class="space-y-4">
          <h2 class="text-lg font-semibold">Contexte et objectifs</h2>
          <p class="text-sm text-base-content/80">
            Bibliospace est le projet fil rouge soutenu pour l'obtention du titre RNCP de
            Concepteur Développeur d'Applications. L'objectif&nbsp;: livrer une application
            full-stack complète, de la conception à la mise en production, en respectant
            les bonnes pratiques de l'industrie (architecture en couches, API REST,
            tests, CI/CD, containerisation).
          </p>
          <p class="text-sm text-base-content/80">
            Le projet couvre l'ensemble du cycle&nbsp;: analyse des besoins, modélisation UML,
            conception de la base de données, développement back-end (Spring Boot),
            développement front-end (Vue.js), tests automatisés, pipeline CI/CD et déploiement.
          </p>
        </div>

        <aside class="card bg-base-200/80 border border-base-300/70 shadow-lg text-sm">
          <div class="card-body gap-3">
            <h2 class="card-title text-base">Détails techniques</h2>

            <div class="space-y-1">
              <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">Rôle</p>
              <p>Conception, développement full-stack, déploiement.</p>
            </div>

            <div class="space-y-1">
              <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">Stack</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in techStack"
                  :key="tech"
                  class="badge badge-ghost badge-sm"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <div class="space-y-1">
              <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">Architecture</p>
              <p>API REST Spring Boot + SPA Vue.js + base MySQL, containerisée Docker.</p>
            </div>
          </div>
        </aside>
      </section>

      <section class="space-y-4">
        <h2 class="text-lg font-semibold">Fonctionnalités principales</h2>
        <div class="grid gap-3 md:grid-cols-2">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="card bg-base-200/70 border border-base-300/60"
          >
            <div class="card-body py-3 px-4 gap-2">
              <h3 class="font-medium text-sm md:text-base">{{ feature.title }}</h3>
              <p class="text-xs md:text-sm text-base-content/80">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-lg font-semibold">Compétences CDA couvertes</h2>
        <div class="grid gap-3 md:grid-cols-2">
          <div
            v-for="block in competences"
            :key="block.title"
            class="card bg-base-200/70 border border-base-300/60"
          >
            <div class="card-body py-3 px-4 gap-2">
              <h3 class="font-medium text-sm md:text-base">{{ block.title }}</h3>
              <ul class="text-xs md:text-sm text-base-content/80 list-disc list-inside space-y-1">
                <li v-for="item in block.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <div class="flex items-center justify-between gap-2">
          <h2 class="text-lg font-semibold">Démo</h2>
          <a
            href="https://bibliospace.florianchague.dev"
            target="_blank"
            rel="noreferrer"
            class="btn btn-xs btn-outline"
          >
            Ouvrir en plein écran
          </a>
        </div>

        <p class="text-sm text-base-content/80">
          Application déployée sur un sous-domaine dédié, accessible publiquement.
        </p>

        <div class="rounded-xl border border-base-300/80 overflow-hidden bg-base-200/70">
          <div class="bg-base-300/60 px-4 py-2 text-xs flex items-center justify-between">
            <span class="text-base-content/70">Bibliospace · Application full-stack</span>
            <span class="text-[10px] text-base-content/60">
              src: bibliospace.florianchague.dev
            </span>
          </div>

          <div class="aspect-[16/9] w-full">
            <iframe
              src="https://bibliospace.florianchague.dev"
              title="Bibliospace"
              class="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Bibliospace — Projet fil rouge CDA · Florian Chague",
  description:
    "Application web full-stack de gestion de bibliothèque personnelle. Projet fil rouge CDA en Java Spring Boot + Vue.js + MySQL, CI/CD Docker.",
  ogTitle: "Bibliospace — Projet fil rouge CDA",
  ogDescription: "Java Spring Boot + Vue.js + MySQL + Docker + CI/CD GitHub Actions",
})

type Feature = { title: string; description: string }
type Competence = { title: string; items: string[] }

const techStack = [
  'Java',
  'Spring Boot',
  'Vue.js',
  'TypeScript',
  'MySQL',
  'Docker',
  'GitHub Actions',
] as const

const features: Feature[] = [
  {
    title: 'Catalogue personnel',
    description:
      'Ajouter, modifier et supprimer des livres, avec recherche par titre, auteur, genre ou tags. Import via ISBN avec récupération automatique des métadonnées.',
  },
  {
    title: 'Suivi des emprunts',
    description:
      'Marquer des livres prêtés, suivre les dates de retour prévues et recevoir des rappels. Historique complet des prêts.',
  },
  {
    title: 'Authentification et comptes utilisateurs',
    description:
      'Inscription, connexion sécurisée (JWT), gestion de profil et isolation des données par utilisateur.',
  },
  {
    title: 'API REST documentée',
    description:
      'API Spring Boot exposant les ressources via REST, documentée avec OpenAPI/Swagger pour faciliter l\'intégration.',
  },
  {
    title: 'Tests automatisés',
    description:
      'Tests unitaires JUnit côté back et tests de composants côté front pour garantir la non-régression à chaque évolution.',
  },
  {
    title: 'Pipeline CI/CD',
    description:
      'Build et déploiement automatique via GitHub Actions, containerisation Docker, mise en production sur sous-domaine dédié.',
  },
]

const competences: Competence[] = [
  {
    title: 'Développer une application sécurisée',
    items: [
      'Conception et modélisation UML (cas d\'utilisation, classes, séquences)',
      'Implémentation back-end Java Spring Boot avec architecture en couches',
      'Front-end Vue.js / TypeScript avec gestion d\'état',
      'Authentification JWT et protection des routes',
    ],
  },
  {
    title: 'Concevoir et développer une application multicouche',
    items: [
      'Modélisation de la base MySQL (MCD/MLD)',
      'API REST documentée OpenAPI',
      'Tests unitaires et d\'intégration',
      'Containerisation Docker et déploiement CI/CD',
    ],
  },
]
</script>
