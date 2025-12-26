<template>
  <section class="min-h-[calc(100vh-6rem)] px-4 py-10 md:px-8 lg:px-16">
    <div class="max-w-5xl mx-auto space-y-10">
      <!-- Breadcrumb -->
      <nav class="text-xs breadcrumb text-base-content/60">
        <ul>
          <li>
            <NuxtLink to="/">Accueil</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/projets">Projets</NuxtLink>
          </li>
          <li>Quiz cybersécurité</li>
        </ul>
      </nav>

      <!-- En-tête / Hero -->
      <header class="space-y-4">
        <p class="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
          Étude de cas
        </p>
        <h1 class="text-3xl md:text-4xl font-semibold">
          Quiz interactif de cybersécurité
        </h1>
        <p class="max-w-2xl text-sm md:text-base text-base-content/80">
          Une application de quiz en ligne pour tester et renforcer les
          connaissances en cybersécurité&nbsp;: bonnes pratiques, menaces
          courantes, OWASP, gestion des mots de passe, phishing, etc.  
          Pensée comme un outil pédagogique rapide à utiliser et simple à déployer.
        </p>
      </header>

      <!-- Meta / Infos projet -->
      <section
        class="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start"
      >
        <div class="space-y-4">
          <h2 class="text-lg font-semibold">Objectifs du projet</h2>
          <p class="text-sm text-base-content/80">
            L’objectif est de proposer un quiz moderne, responsive et agréable
            à utiliser, avec un vrai intérêt pédagogique&nbsp;: chaque question
            est accompagnée d’une explication détaillée pour aider l’utilisateur
            à comprendre ses erreurs et à progresser.
          </p>
          <p class="text-sm text-base-content/80">
            Le projet est développé comme une application React autonome,
            embarquée dans ce portfolio via une simple <code>&lt;iframe&gt;</code>,
            ce qui démontre la capacité à intégrer différents stacks dans un
            même environnement front-end.
          </p>
        </div>

        <aside
          class="card bg-base-200/80 border border-base-300/70 shadow-lg text-sm"
        >
          <div class="card-body gap-3">
            <h2 class="card-title text-base">Détails techniques</h2>

            <div class="space-y-1">
              <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">
                Rôle
              </p>
              <p>Conception, développement front-end et contenu pédagogique.</p>
            </div>

            <div class="space-y-1">
              <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">
                Stack
              </p>
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
              <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">
                Statut
              </p>
              <span class="badge badge-warning badge-outline badge-sm">
                En développement actif
              </span>
            </div>

            <div class="space-y-2 pt-2">
              <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">
                Liens
              </p>
              <div class="flex flex-wrap gap-2">
                <a
                  v-if="demoUrl"
                  :href="demoUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="btn btn-xs btn-primary"
                >
                  Ouvrir la démo
                </a>
                <a
                  v-if="repoUrl"
                  :href="repoUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="btn btn-xs btn-outline"
                >
                  Voir le code
                </a>
                <span
                  v-if="!demoUrl && !repoUrl"
                  class="text-xs text-base-content/60"
                >
                  Les liens seront ajoutés dès la mise en ligne publique.
                </span>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <!-- Fonctionnalités -->
      <section class="space-y-4">
        <h2 class="text-lg font-semibold">Fonctionnalités principales</h2>
        <div class="grid gap-3 md:grid-cols-2">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="card bg-base-200/70 border border-base-300/60"
          >
            <div class="card-body py-3 px-4 gap-2">
              <h3 class="font-medium text-sm md:text-base">
                {{ feature.title }}
              </h3>
              <p class="text-xs md:text-sm text-base-content/80">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Intégration du quiz via iframe -->
      <section class="space-y-4">
        <div class="flex items-center justify-between gap-2">
          <h2 class="text-lg font-semibold">Demo intégrée</h2>
          <a
            v-if="quizUrl"
            :href="quizUrl"
            target="_blank"
            rel="noreferrer"
            class="btn btn-xs btn-outline"
          >
            Ouvrir en plein écran
          </a>
        </div>
        <p class="text-sm text-base-content/80">
          Le quiz ci-dessous est chargé en tant qu’application React autonome,
          hébergée séparément et intégrée dans ce portfolio via une iframe.
        </p>

        <div
          class="rounded-xl border border-base-300/80 overflow-hidden bg-base-200/70"
        >
          <div class="bg-base-300/60 px-4 py-2 text-xs flex items-center justify-between">
            <span class="text-base-content/70">
              Quiz cybersécurité · React app embarquée
            </span>
            <span class="text-[10px] text-base-content/60">
              src: {{ quizUrl || 'URL à définir' }}
            </span>
          </div>
          <div class="aspect-[16/9] w-full">
            <iframe
              v-if="quizUrl"
              :src="quizUrl"
              title="Quiz cybersécurité"
              class="w-full h-full border-0"
              loading="lazy"
            ></iframe>
            <div
              v-else
              class="w-full h-full flex items-center justify-center text-sm text-base-content/70"
            >
              L’URL de la démo sera ajoutée dès que l’application sera déployée.
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
const techStack = [
  'React',
  'TypeScript',
  'Vite',
  'Tailwind CSS',
  'DaisyUI',
];

const features = [
  {
    title: 'Questions orientées cybersécurité',
    description:
      'Sélection de questions couvrant les bases de la sécurité web, la protection des données, les bonnes pratiques d’hygiène numérique et les menaces courantes.',
  },
  {
    title: 'Explications détaillées',
    description:
      'Après chaque question, une explication claire aide à comprendre la bonne réponse et le contexte, pour transformer le quiz en vrai support pédagogique.',
  },
  {
    title: 'Timer et scoring',
    description:
      'Gestion du temps, score final et feedback synthétique pour encourager la progression et comparer les résultats au fil des essais.',
  },
  {
    title: 'Front-end autonome et réutilisable',
    description:
      'L’application est un front React indépendant, embarqué dans ce portfolio via iframe, ce qui permet de la réutiliser facilement dans d’autres contextes.',
  },
];

// TODO : à remplacer par l’URL réelle de ton quiz React
// une fois déployé sur ta VM / un sous-domaine / Netlify
const quizUrl = 'http://localhost:5174/cybersecurity-quiz/'; // exemple futur : 'https://quiz-cyber.mondomaine.dev'

const demoUrl = quizUrl; // pour le bouton "Ouvrir en plein écran"
const repoUrl = ''; // exemple futur : 'https://github.com/ton-user/cybersecurity-quiz'
</script>
