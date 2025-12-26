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
              <a
                class="btn btn-ghost"
                href="https://github.com/IztochenValk"
                target="_blank"
                rel="noreferrer"
              >
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

            <div class="card border border-base-300 bg-base-100">
              <div class="card-body">
                <h3 class="card-title">
                  Développeur d’Applications Java – Spécialisation DevOps
                </h3>
                <p class="text-sm opacity-80">
                  ADRAR Formation · 2025 – 2026
                </p>
                <p class="mt-2 opacity-80">
                  Architecture logicielle, Java Spring Boot, CI/CD, containerisation,
                  et mise en production d’applications.
                </p>
                <p>
                  <div class="badge badge-outline badge-success">En cours d'acquisition</div>
                </p>
              </div>
            </div>

            <div class="card border border-base-300 bg-base-100">
              <div class="card-body">
                <h3 class="card-title">Diplôme Chef de Projet Digital</h3>
                <p class="text-sm opacity-80">CCI Ouest-Normandie · 2017</p>
                <p class="mt-2 opacity-80">
                  Gestion de projet web, conception, coordination et delivery.
                </p>
                <p>
                  <a class="link link-primary text-sm" href="/docs/diplome-cci.jpg" target="_blank">
                    Voir diplôme
                  </a>
                </p>

              </div>
            </div>

            <div class="card border border-base-300 bg-base-100">
              <div class="card-body">
                <h3 class="card-title">Licence en Droit Public</h3>
                <p class="text-sm opacity-80">Université Montpellier I · 2012</p>
                <p class="mt-2 opacity-80">
                  Rigueur analytique, logique et compréhension des cadres réglementaires.
                </p>
                  <a class="link link-primary text-sm" href="/docs/diplome-droit-public.jpg" target="_blank">
                    Voir diplôme
                  </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- EXPERTISE -->
      <section id="expertise" class="border-t border-base-300 bg-base-200/40">
        <div class="mx-auto max-w-6xl px-4 py-14">
          <h2 class="text-3xl font-bold">Expertise</h2>
          <p class="mt-2 max-w-2xl opacity-80">
            Un profil développeur web complet, avec une forte capacité d’analyse et de résolution.
          </p>

          <div class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div class="card border border-base-300 bg-base-100">
              <div class="card-body">
                <h3 class="card-title text-lg">Frontend</h3>
                <p class="text-sm opacity-80">
                  Interfaces modernes, expérience utilisateur et performances.
                </p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="badge badge-soft badge-primary">Vue.js</span>
                  <span class="badge badge-soft badge-primary">React</span>
                  <span class="badge badge-soft badge-primary">TypeScript</span>
                </div>
              </div>
            </div>

            <div class="card border border-base-300 bg-base-100">
              <div class="card-body">
                <h3 class="card-title text-lg">Backend</h3>
                <p class="text-sm opacity-80">
                  APIs, logique métier, sécurité et intégrations.
                </p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="badge badge-soft badge-primary">PHP</span>
                  <span class="badge badge-soft badge-primary">Laravel</span>
                  <span class="badge badge-soft badge-primary">Node.js</span>
                </div>
              </div>
            </div>

            <div class="card border border-base-300 bg-base-100">
              <div class="card-body">
                <h3 class="card-title text-lg">Qualité</h3>
                <p class="text-sm opacity-80">
                  Debug, refactorisation et stabilité applicative.
                </p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="badge badge-soft badge-primary">Debug</span>
                  <span class="badge badge-soft badge-primary">Performance</span>
                  <span class="badge badge-soft badge-primary">Clean Code</span>
                </div>
              </div>
            </div>

            <div class="card border border-base-300 bg-base-100">
              <div class="card-body">
                <h3 class="card-title text-lg">Environnement</h3>
                <p class="text-sm opacity-80">
                  Compréhension de la production et des contraintes réelles.
                </p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="badge badge-soft badge-primary">Linux</span>
                  <span class="badge badge-soft badge-primary">Docker</span>
                  <span class="badge badge-soft badge-primary">CI/CD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- EXPERIENCE -->
<!-- EXPERIENCE / CV -->
<section id="experience" class="mx-auto max-w-6xl px-4 py-14">
  <h2 class="text-3xl font-bold">Expérience professionnelle</h2>
  <p class="mt-2 max-w-2xl opacity-80">
    Parcours technique mêlant développement web, support avancé et environnements de production.
  </p>

  <div class="mt-8 grid gap-4">



    <!-- CLBS -->
    <div class="card border border-base-300 bg-base-100">
      <div class="card-body">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h3 class="card-title">Customer Support Specialist – CLBS (Thaïlande)</h3>
          <span class="badge badge-primary">2024 – 2025</span>
        </div>
        <p class="opacity-80">
          Support multicanal francophone.
          Compétences transférables côté développement: qualification de bugs,
          reproduction, priorisation et communication claire.
        </p>
      </div>
    </div>

    <!-- IBM -->
    <div class="card border border-base-300 bg-base-100">
      <div class="card-body">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h3 class="card-title">HMC Technical Support Specialist – IBM</h3>
          <span class="badge badge-soft badge-primary">2023 – 2024</span>
        </div>
        <p class="opacity-80">
          Support enterprise sur IBM Power Systems.
          Diagnostic structuré, documentation, coordination inter-équipes et résolution d’incidents complexes
          en environnement critique.
        </p>
      </div>
    </div>

    <!-- HCL -->
    <div class="card border border-base-300 bg-base-100">
      <div class="card-body">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h3 class="card-title">Technical Support Analyst – HCL Technologies</h3>
          <span class="badge badge-soft badge-primary">2021 – 2022</span>
        </div>
        <p class="opacity-80">
          Support web pour Google Ad Manager.
          Diagnostic JavaScript, pixels de tracking, intégrations navigateur
          et compréhension fine des flux frontend.
        </p>
      </div>
    </div>
    <!-- Teleperformance -->
    <div class="card border border-base-300 bg-base-100">
      <div class="card-body">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h3 class="card-title">
            Support Specialist – Teleperformance
          </h3>
          <span class="badge badge-soft badge-primary">2021</span>
        </div>
        <p class="text-sm opacity-70">Lisbonne, Portugal · On-site</p>
        <p class="mt-2 opacity-80">
          Support client et technique en environnement international.
          Analyse de problématiques utilisateurs, communication claire par téléphone
          et respect de procédures qualité.
        </p>
      </div>
    </div>

    <!-- Pontica -->
    <div class="card border border-base-300 bg-base-100">
      <div class="card-body">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h3 class="card-title">JavaScript Developer – Pontica Solutions</h3>
          <span class="badge badge-soft badge-primary">2020 – 2021</span>
        </div>
        <p class="opacity-80">
          Développement et maintenance de fonctionnalités JavaScript.
          Analyse de bugs, optimisation de performances et amélioration de la stabilité applicative.
        </p>
      </div>
    </div>

    <div class="card border border-base-300 bg-base-100">
      <div class="card-body">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h3 class="card-title">
            Assistant d’éducation volontaire – Varna, Bulgarie
          </h3>
          <span class="badge badge-soft badge-primary">2018 – 2019</span>
        </div>
        <p class="opacity-80">
          Programme Erasmus+ / European Solidarity Corps.
          Soutien pédagogique en mathématiques et en anglais auprès d’élèves,
          animation d’ateliers éducatifs et immersion dans un environnement multiculturel.
        </p>
      </div>
    </div>



    <!-- CDG -->
    <div class="card border border-base-300 bg-base-100">
      <div class="card-body">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h3 class="card-title">Stage Développeur PHP / C# – CDG Aude</h3>
          <span class="badge badge-soft badge-primary">2016 – 2017</span>
        </div>
        <p class="opacity-80">
          Développement d’outils web internes.
          Implémentation de fonctionnalités métier et amélioration de workflows existants.
        </p>
      </div>
    </div>

  </div>
</section>

<section id="certifications" class="mx-auto max-w-6xl px-4 py-14">
  <h2 class="text-3xl font-bold">Certifications</h2>
  <p class="mt-2 max-w-2xl opacity-80">
    Attestations et certifications techniques.
  </p>

  <div class="mt-8 grid gap-4 md:grid-cols-2">

    <div class="card border border-base-300 bg-base-100">
      <div class="card-body">
        <h3 class="card-title">AZ-900 – Microsoft Azure Fundamentals</h3>
        <p class="text-sm opacity-70">Microsoft · Certification</p>
        <a class="link link-primary text-sm" href="https://learn.microsoft.com/api/credentials/share/en-us/FlorianChague-7435/50CAA70640B1B5DF?sharingId" target="_blank">
          Voir certificat
        </a>
      </div>
    </div>
    
    <div class="card border border-base-300 bg-base-100">
      <div class="card-body">
        <h3 class="card-title">IBM Certified Advocate Plus - Cloud v2</h3>
        <p class="text-sm opacity-70">IBM · Certification</p>
        <a class="link link-primary text-sm" href="https://www.credly.com/badges/6c074716-63ce-493d-92fb-3c3fa753d02c/linked_in_profile" target="_blank">
          Voir certificat
        </a>
      </div>
    </div>

    <div class="card border border-base-300 bg-base-100">
      <div class="card-body">
        <h3 class="card-title">IBM Certified Technical Advocate - Cloud v4</h3>
        <p class="text-sm opacity-70">IBM · Certification</p>
        <a class="link link-primary text-sm" href="https://www.credly.com/badges/bbd2d670-4288-448b-877e-11ead31c02a0/linked_in_profile" target="_blank">
          Voir certificat
        </a>
      </div>
    </div>

    <div class="card border border-base-300 bg-base-100">
      <div class="card-body">
        <h3 class="card-title">CNIL - Commission Nationale de l'Informatique et des Libertés</h3>
        <p class="text-sm opacity-70">CNIL · Certification</p>
        <a class="link link-primary text-sm" href="/docs/cnil-certification.pdf" target="_blank">
          Voir certificat
        </a>
      </div>
    </div>

    <div class="card border border-base-300 bg-base-100">
      <div class="card-body">
        <h3 class="card-title">ANSSI - Sécurité Des Systèmes D'Information</h3>
        <p class="text-sm opacity-70">SecNumacadémie · Certification</p>
        <a class="link link-primary text-sm" href="/docs/cnil-certification.pdf" target="_blank">
          Voir certificat
        </a>
      </div>
    </div>

  </div>
</section>


      <!-- PROJETS -->
      <section id="projets" class="border-t border-base-300 bg-base-200/40">
        <div class="mx-auto max-w-6xl px-4 py-14">
          <h2 class="text-3xl font-bold">Projets</h2>
          <p class="mt-2 max-w-2xl opacity-80">
            Projets web personnels et techniques, orientés apprentissage et qualité.
          </p>

          <div class="mt-8 grid gap-4 md:grid-cols-3">
            <div class="card border border-base-300 bg-base-100">
              <div class="card-body">
                <h3 class="card-title text-lg">Applications Vue & React</h3>
                <p class="text-sm opacity-80">
                  Interfaces dynamiques, logique applicative et performance frontend.
                </p>
              </div>
            </div>

            <div class="card border border-base-300 bg-base-100">
              <div class="card-body">
                <h3 class="card-title text-lg">Backend PHP & Node</h3>
                <p class="text-sm opacity-80">
                  APIs, authentification et logique métier.
                </p>
              </div>
            </div>

            <div class="card border border-base-300 bg-base-100">
              <div class="card-body">
                <h3 class="card-title text-lg">Debug & refactorisation</h3>
                <p class="text-sm opacity-80">
                  Reprise de code, correction de bugs et amélioration continue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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

    <footer class="border-t border-base-300">
      <div class="mx-auto max-w-6xl px-4 py-8 text-sm opacity-70">
        © {{ new Date().getFullYear() }} Florian Chague – Développeur web.
      </div>
    </footer>
  </div>
</template>

<script setup>
import ThemeToggle from '../components/ThemeToggle.vue'
</script>
