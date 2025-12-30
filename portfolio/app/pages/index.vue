<template>
  <div class="min-h-screen bg-base-100 text-base-content">

    <main>
      <!-- HERO -->
      <section class="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div class="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div class="badge badge-soft badge-primary">Disponible immédiatement</div>
            <h1 class="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              Développeur web orienté produit et qualité logicielle
            </h1>
            <p class="mt-4 text-base opacity-80 md:text-lg">
              Je conçois, développe et maintiens des applications web modernes en
              <strong>Vue.js, React, PHP et Node.js</strong>.
              J’accorde une attention particulière à la lisibilité du code, à la performance
              et à la stabilité des applications en production.
            </p>

            <div class="mt-6 flex flex-wrap gap-3">
              <a href="#contact" class="btn btn-primary">Me contacter</a>
              <a href="#projets" class="btn btn-outline">Voir mes projets</a>
              <a href="/docs/cv.pdf" target="_blank" class="btn btn-outline">CV</a>
              <a class="btn btn-ghost" href="https://github.com/IztochenValk" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>

            <div class="mt-8 grid gap-3 sm:grid-cols-3">
              <div class="stat rounded-box border border-base-300 bg-base-200">
                <div class="stat-title">Spécialité</div>
                <div class="stat-value text-xl">Web</div>
                <div class="stat-desc opacity-70">Frontend & Backend</div>
              </div>
              <div class="stat rounded-box border border-base-300 bg-base-200">
                <div class="stat-title">Frontend</div>
                <div class="stat-value text-xl">Vue / React</div>
                <div class="stat-desc opacity-70">UI, state, performance</div>
              </div>
              <div class="stat rounded-box border border-base-300 bg-base-200">
                <div class="stat-title">Backend</div>
                <div class="stat-value text-xl">PHP / Node</div>
                <div class="stat-desc opacity-70">API, logique métier</div>
              </div>
            </div>
          </div>

          <!-- CE QUE JE FAIS -->
          <div class="relative">
            <div class="card border border-base-300 bg-base-200 shadow-xl">
              <div class="card-body">
                <h2 class="card-title">Ce que je fais concrètement</h2>
                <ul class="mt-2 space-y-3">

                  <li class="flex gap-3">
                    <span class="badge badge-primary badge-sm mt-1"></span>
                    <div>
                      <div class="font-semibold">Développement frontend</div>
                      <div class="text-sm opacity-80">
                        Interfaces claires, composants réutilisables, gestion d’état et performances.
                      </div>
                    </div>
                  </li>

                  <li class="flex gap-3">
                    <span class="badge badge-primary badge-sm mt-1"></span>
                    <div>
                      <div class="font-semibold">Développement backend</div>
                      <div class="text-sm opacity-80">
                        APIs, logique métier, authentification et intégration frontend-backend.
                      </div>
                    </div>
                  </li>

                  <li class="flex gap-3">
                    <span class="badge badge-primary badge-sm mt-1"></span>
                    <div>
                      <div class="font-semibold">Debug et refactorisation</div>
                      <div class="text-sm opacity-80">
                        Analyse de bugs complexes, reprise de code existant et amélioration continue.
                      </div>
                    </div>
                  </li>

                  <li class="flex gap-3">
                    <span class="badge badge-primary badge-sm mt-1"></span>
                    <div>
                      <div class="font-semibold">Qualité et maintenabilité</div>
                      <div class="text-sm opacity-80">
                        Code lisible, structuré, testable et prêt pour la production.
                      </div>
                    </div>
                  </li>

                </ul>

                <div class="mt-6 flex flex-wrap gap-2">
                  <span class="badge badge-soft badge-primary">Vue.js</span>
                  <span class="badge badge-soft badge-primary">React</span>
                  <span class="badge badge-soft badge-primary">JavaScript</span>
                  <span class="badge badge-soft badge-primary">TypeScript</span>
                  <span class="badge badge-soft badge-primary">PHP</span>
                  <span class="badge badge-soft badge-primary">Laravel</span>
                  <span class="badge badge-soft badge-primary">Node.js</span>
                </div>
              </div>
            </div>

            <div class="mt-4 alert alert-info border border-base-300">
              <span class="opacity-90">
                Focus: développement web propre, performant et maintenable, orienté produit.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="education" class="border-t border-base-300 bg-base-200/40">
        <div class="mx-auto max-w-6xl px-4 py-14">
          <h2 class="text-3xl font-bold">Formation & Éducation</h2>
          <p class="mt-2 max-w-2xl opacity-80">
            Parcours académique et formations orientées développement et systèmes.
          </p>

          <div class="mt-8 grid gap-4 md:grid-cols-2">

            <!-- Java DevOps -->
            <div class="card border border-base-300 bg-base-100">
              <div class="card-body">
                <h3 class="card-title">
                  Développeur d’Applications Java – Spécialisation DevOps
                </h3>
                <p class="text-sm opacity-80">ADRAR Formation · 2025 – 2026</p>
                <p class="mt-2 opacity-80">
                  Architecture logicielle, Java Spring Boot, CI/CD, containerisation,
                  et mise en production d’applications.
                </p>

                <!-- FIX: div inside p -> span -->
                <p class="mt-2">
                  <span class="badge badge-outline badge-success">En cours d'acquisition</span>
                </p>
              </div>
            </div>

            <!-- Chef de projet digital -->
            <div class="card border border-base-300 bg-base-100">
              <div class="card-body">
                <h3 class="card-title">Diplôme Chef de Projet Digital</h3>
                <p class="text-sm opacity-80">CCI Ouest-Normandie · 2017</p>
                <p class="mt-2 opacity-80">
                  Gestion de projet web, conception, coordination et delivery.
                </p>
                <p class="mt-2">
                  <a class="link link-primary text-sm" href="/docs/diplome-cci.jpg" target="_blank">
                    Voir diplôme
                  </a>
                </p>
              </div>
            </div>

            <!-- Licence droit public -->
            <div class="card border border-base-300 bg-base-100">
              <div class="card-body">
                <h3 class="card-title">Licence en Droit Public</h3>
                <p class="text-sm opacity-80">Université Montpellier I · 2012</p>
                <p class="mt-2 opacity-80">
                  Rigueur analytique, logique et compréhension des cadres réglementaires.
                </p>
                <p class="mt-2">
                  <a class="link link-primary text-sm" href="/docs/diplome-droit-public.jpg" target="_blank">
                    Voir diplôme
                  </a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- (... le reste du fichier ne contenait aucun <div> dans un <p>, donc inchangé ...) -->

      <!-- CONTACT -->
      <section id="contact" class="mx-auto max-w-6xl px-4 py-14">
        <div class="card border border-base-300 bg-base-100">
          <div class="card-body">
            <h2 class="card-title text-2xl">Contact</h2>
            <p class="opacity-80">
              Contact direct, réponse rapide, échange clair.
            </p>

            <div class="mt-6 grid gap-3 md:grid-cols-3">
              <div class="rounded-box border border-base-300 bg-base-200 p-4">
                <div class="text-sm opacity-70">Téléphone</div>
                <div class="font-semibold">+66 92 894 3286</div>
              </div>
              <div class="rounded-box border border-base-300 bg-base-200 p-4">
                <div class="text-sm opacity-70">Email</div>
                <div class="font-semibold">florian.chague2@gmail.com</div>
              </div>
              <div class="rounded-box border border-base-300 bg-base-200 p-4">
                <div class="text-sm opacity-70">GitHub</div>
                <a class="link font-semibold" href="https://github.com/IztochenValk" target="_blank" rel="noreferrer">
                  IztochenValk
                </a>
              </div>
            </div>

            <div class="mt-6 flex flex-wrap gap-3">
              <a class="btn btn-primary" href="mailto:florian.chague2@gmail.com">Envoyer un email</a>
            </div>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import ThemeToggle from '../components/ThemeToggle.vue'
</script>