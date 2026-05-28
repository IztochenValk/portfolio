<template>
  <section class="min-h-[calc(100vh-6rem)] px-4 py-10 md:px-8 lg:px-16">
    <div class="max-w-5xl mx-auto space-y-10">
      <nav class="text-xs breadcrumb text-base-content/60">
        <ul>
          <li><NuxtLink to="/">Accueil</NuxtLink></li>
          <li><a href="/#experience">Expérience</a></li>
          <li>Stage Langue bulgare</li>
        </ul>
      </nav>

      <header class="space-y-4">
        <p class="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
          Stage de fin de formation CDA
        </p>
        <h1 class="text-3xl md:text-4xl font-semibold">
          Association « Langue bulgare — langue d'Europe » (Paris)
        </h1>
        <p class="max-w-2xl text-sm md:text-base text-base-content/80">
          Stage de fin de formation chez une association parisienne dédiée à
          l'enseignement du bulgare et à la diffusion de la culture bulgare.
          Deux sites livrés en parallèle sur deux CMS différents&nbsp;:
          WordPress pour le site institutionnel, et AssoConnect pour la gestion associative.
        </p>
        <div class="flex flex-wrap gap-2">
          <span class="badge badge-primary">Mars 2026 – Avril 2026</span>
          <span class="badge badge-outline">Paris, France</span>
        </div>
      </header>

      <!-- Site 1 : wp.languebulgare.fr -->
      <section class="space-y-4">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
          <h2 class="text-2xl font-semibold">
            wp.languebulgare.fr
          </h2>
          <a
            class="link link-primary text-sm"
            href="https://wp.languebulgare.fr"
            target="_blank"
            rel="noreferrer"
          >
            Voir le site
          </a>
        </div>
        <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">
          WordPress — site institutionnel
        </p>

        <div class="rounded-xl border border-base-300/80 overflow-hidden bg-base-200/40">
          <img
            src="/img/wp-languebulgare.webp"
            alt="Capture d'écran de la page d'accueil de wp.languebulgare.fr"
            class="w-full h-auto"
            loading="lazy"
            width="1446"
            height="860"
          />
        </div>

        <div class="grid gap-4 md:grid-cols-2 mt-4">
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70 mb-2">
              Ce que j'ai livré
            </h3>
            <ul class="text-sm opacity-80 list-disc list-inside space-y-1">
              <li>Conception et intégration de la page d'accueil</li>
              <li>Personnalisation du thème WordPress</li>
              <li>Traduction depuis le bulgare de certains contenus</li>
              <li>Intégration de visuels et de blocs de contenu</li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70 mb-2">
              Stack
            </h3>
            <div class="flex flex-wrap gap-2">
              <span class="badge badge-soft badge-primary">WordPress</span>
              <span class="badge badge-soft badge-primary">PHP</span>
              <span class="badge badge-soft badge-primary">HTML/CSS</span>
              <span class="badge badge-soft badge-primary">Traduction BG→FR</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Site 2 : languebulgare.fr -->
      <section class="space-y-4">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
          <h2 class="text-2xl font-semibold">
            languebulgare.fr
          </h2>
          <a
            class="link link-primary text-sm"
            href="https://www.languebulgare.fr"
            target="_blank"
            rel="noreferrer"
          >
            Voir le site
          </a>
        </div>
        <p class="text-xs uppercase tracking-[0.2em] text-base-content/60">
          AssoConnect — site associatif (en bulgare)
        </p>

        <div class="rounded-xl border border-base-300/80 overflow-hidden bg-base-200/40">
          <img
            src="/img/languebulgare.webp"
            alt="Capture d'écran de la page d'accueil de languebulgare.fr"
            class="w-full h-auto"
            loading="lazy"
            width="916"
            height="867"
          />
        </div>

        <div class="grid gap-4 md:grid-cols-2 mt-4">
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70 mb-2">
              Ce que j'ai livré
            </h3>
            <ul class="text-sm opacity-80 list-disc list-inside space-y-1">
              <li>Création intégrale du site (en bulgare)</li>
              <li>Arborescence et architecture des pages</li>
              <li>Mise en page et intégration des contenus</li>
              <li>Configuration des formulaires d'adhésion et de don</li>
              <li>Accompagnement à la prise en main du back-office</li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70 mb-2">
              Stack
            </h3>
            <div class="flex flex-wrap gap-2">
              <span class="badge badge-soft badge-primary">AssoConnect</span>
              <span class="badge badge-soft badge-primary">HTML/CSS</span>
              <span class="badge badge-soft badge-primary">Contenus bulgare</span>
            </div>
          </div>
        </div>

        <!-- Note honnête sur AssoConnect -->
        <div class="alert alert-warning border border-base-300/70 bg-base-200/60 mt-6 text-sm">
          <div>
            <h3 class="font-semibold mb-1">À propos du rendu visuel</h3>
            <p class="opacity-90">
              AssoConnect est un CMS pensé avant tout pour la
              <strong>gestion administrative et financière</strong> d'une association
              (adhésions, dons, comptabilité, listes de membres). La partie « site web public »
              est volontairement limitée&nbsp;: peu de marges de personnalisation
              côté design, pas de CSS custom, choix de blocs restreint,
              édition WYSIWYG basique.
            </p>
            <p class="opacity-90 mt-2">
              Le site reflète donc ces contraintes — le choix d'AssoConnect a été fait par
              l'association pour bénéficier de l'outillage de gestion intégré,
              au prix de la flexibilité visuelle. Mon rôle a été de
              tirer le meilleur de ces limites en travaillant la structure
              et la hiérarchie de l'information plutôt que le design pur.
            </p>
          </div>
        </div>
      </section>

      <!-- Liens utiles -->
      <section class="border-t border-base-300/60 pt-6 mt-10">
        <NuxtLink to="/#experience" class="link link-primary text-sm">
          ← Retour à l'expérience
        </NuxtLink>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Stage Langue bulgare — Florian Chague",
  description:
    "Stage de fin de formation CDA chez l'association « Langue bulgare — langue d'Europe » à Paris. Deux sites livrés sur WordPress et AssoConnect.",
  ogTitle: "Stage Langue bulgare — Florian Chague",
  ogDescription: "Deux sites livrés en parallèle sur WordPress et AssoConnect",
})
</script>
