// Centralised bilingual (FR/EN) message catalog.
// Consumed by the `useI18n` composable. No external dependency.

export type Locale = "fr" | "en"

export const LOCALES: Locale[] = ["fr", "en"]

type Messages = Record<string, unknown>

export const fr: Messages = {
  nav: {
    expertise: "Expertise",
    experience: "Expérience",
    projects: "Projets",
    cicd: "CI/CD & Tests",
    contact: "Contact",
    home: "Accueil",
    roleSubtitle: "Développeur web frontend & backend",
    ariaProfile: "Ouvrir le profil",
    ariaMenu: "Ouvrir le menu",
    ariaLang: "Changer de langue",
  },
  common: {
    caseStudy: "Étude de cas",
    objectivesTitle: "Objectifs du projet",
    featuresTitle: "Fonctionnalités principales",
    techDetailsTitle: "Détails techniques",
    roleLabel: "Rôle",
    stackLabel: "Stack",
    statusLabel: "Statut",
    linksLabel: "Liens",
    openDemo: "Ouvrir la démo",
    viewCode: "Voir le code",
    fullscreen: "Ouvrir en plein écran",
    urlTbd: "URL à définir",
    embeddedDemoTitle: "Démo intégrée",
    embedNote:
      "Cette démo est affichée directement dans le portfolio. Pour une meilleure expérience, vous pouvez aussi l’ouvrir en plein écran.",
    demoUrlPending:
      "L’URL de la démo sera ajoutée dès que l’application sera déployée.",
  },
  home: {
    seoTitle: "Florian Chague — Développeur Full-Stack Vue.js / Nuxt.js / Spring Boot / Node.js",
    seoDescription:
      "Portfolio de Florian Chague — Développeur Full-Stack. CDA obtenu, expertise Vue.js / Nuxt.js / Spring Boot / Node.js / Java, projets full-stack avec CI/CD Docker.",
    heroBadge: "Disponible immédiatement · Mobile international",
    heroTitle: "Développeur Full-Stack — Vue.js / Nuxt.js / Spring Boot",
    heroIntroBefore: "Je conçois, développe et maintiens des applications web modernes en ",
    heroIntroStack: "Vue.js / Nuxt.js, Spring Boot, Node.js, TypeScript et Java",
    heroIntroAfter:
      ". CDA fraîchement obtenu, je m’appuie sur Docker, MySQL et des pipelines CI/CD pour livrer du code propre, testé et maintenable — avec une attention particulière à l’expérience utilisateur et à la stabilité en production.",
    ctaContact: "Me contacter",
    ctaProjects: "Voir mes projets",
    ctaCv: "Télécharger mon CV",
    ctaGithub: "GitHub",
    statSpecialtyTitle: "Spécialité",
    statSpecialtyDesc: "Frontend & Backend",
    statFrontendTitle: "Frontend",
    statFrontendDesc: "UI, state, performance",
    statBackendTitle: "Backend",
    statBackendDesc: "API, logique métier",
    whatTitle: "Ce que je fais concrètement",
    what: [
      {
        title: "Développement frontend",
        desc: "Interfaces claires, composants réutilisables, gestion d’état et performances.",
      },
      {
        title: "Développement backend",
        desc: "APIs, logique métier, authentification et intégration frontend-backend.",
      },
      {
        title: "Debug et refactorisation",
        desc: "Analyse de bugs complexes, reprise de code existant et amélioration continue.",
      },
      {
        title: "Qualité et maintenabilité",
        desc: "Code lisible, structuré, testable et prêt pour la production.",
      },
    ],
    focusAlert:
      "Focus: développement web propre, performant et maintenable, orienté produit.",
    educationTitle: "Formation & Éducation",
    educationSubtitle:
      "Parcours académique et formations orientées développement et systèmes.",
    cdaTitle:
      "Concepteur Développeur d’Applications (CDA) – Spécialisation Java DevOps",
    cdaMeta: "ADRAR Formation · 2025 – 2026 · Titre RNCP niveau 6 (Bac +3/4)",
    cdaDesc:
      "Architecture logicielle, Java Spring Boot, JavaScript/TypeScript, conception, CI/CD, containerisation Docker, tests automatisés et mise en production d’applications full-stack.",
    cdaBadge: "Obtenu — en attente de délivrance officielle",
    cdaDesignLink: "Voir les maquettes UI réalisées sur Figma →",
    cciTitle: "Diplôme Chef de Projet Digital",
    cciMeta: "CCI Ouest-Normandie · 2017",
    cciDesc: "Gestion de projet web, conception, coordination et delivery.",
    lawTitle: "Licence en Droit Public",
    lawMeta: "Université Montpellier I · 2012",
    lawDesc:
      "Rigueur analytique, logique et compréhension des cadres réglementaires.",
    viewDiploma: "Voir diplôme",
    experienceTitle: "Expérience professionnelle",
    experienceSubtitle:
      "Parcours technique mêlant développement web, support avancé et environnements de production.",
    bulgareTitle:
      "Stage Développeur Web – Association « Langue bulgare – langue d’Europe » (Paris)",
    bulgarePeriod: "Mars 2026 – Avril 2026",
    bulgareLead: "Deux sites livrés en parallèle pour l’association :",
    bulgareLi1:
      "— conception et intégration de la page d’accueil sur WordPress, traduction de certains contenus depuis le bulgare.",
    bulgareLi2:
      "— création intégrale du site (en bulgare) sur le CMS AssoConnect : arborescence, contenus, mise en page, formulaires d’adhésion et de don.",
    bulgareSupport:
      "Accompagnement des utilisateurs de l’association dans la prise en main des deux CMS.",
    bulgareMoodle:
      "Création d’exercices interactifs H5P sur la plateforme Moodle de l’association.",
    bulgareDetail: "Voir le détail du stage →",
    clbsTitle: "Customer Service Representative – CLBS, Chiang Mai (Thaïlande)",
    clbsPeriod: "Déc. 2024 – Avr. 2025",
    clbsDesc:
      "Support multicanal francophone. Compétences transférables côté développement: qualification de bugs, reproduction, priorisation et communication claire.",
    ibmTitle: "Technical Support Engineer (IBM Power / HMC) – IBM, Sofia",
    ibmPeriod: "Janv. 2023 – Juil. 2024",
    ibmDesc:
      "Support enterprise sur IBM Power Systems. Diagnostic structuré, documentation, coordination inter-équipes et résolution d’incidents complexes en environnement critique.",
    hclTitle: "Technical Support Specialist – HCLTech",
    hclLocation: "Dublin, Irlande · Hybride",
    hclPeriod: "Sept. 2021 – Juil. 2022",
    hclDesc:
      "Support web pour Google Ad Manager. Diagnostic JavaScript, pixels de tracking, intégrations navigateur et compréhension fine des flux frontend.",
    tpTitle: "Support Specialist – Teleperformance",
    tpPeriod: "Mai – Juin 2021",
    tpLocation: "Lisbonne, Portugal · On-site",
    tpDesc:
      "Support client et technique en environnement international. Analyse de problématiques utilisateurs, communication claire par téléphone et respect de procédures qualité.",
    ponticaTitle: "JavaScript Developer – Pontica Solutions",
    ponticaLocation: "Varna, Bulgaria · On-site",
    ponticaPeriod: "2020 – 2021",
    ponticaDesc:
      "Développement et maintenance de fonctionnalités front-end JavaScript pour l’application Sutart (plateforme de livraison) : intégration d’interfaces, correction de bugs, optimisations UX et collaboration directe avec l’équipe produit pour itérer sur les besoins métier.",
    eduAssistantTitle: "Assistant d’éducation volontaire – Varna, Bulgarie",
    eduAssistantPeriod: "2018 – 2019",
    eduAssistantDesc:
      "Programme Erasmus+ / European Solidarity Corps. Soutien pédagogique en mathématiques et en anglais auprès d’élèves, animation d’ateliers éducatifs et immersion dans un environnement multiculturel.",
    cdgTitle: "Stage Développeur PHP / C# – CDG Aude",
    cdgLocation: "Carcassonne, France · On-site",
    cdgPeriod: "2016 – 2017",
    cdgDesc:
      "Développement d’outils web internes. Implémentation de fonctionnalités métier et amélioration de workflows existants.",
    expertiseTitle: "Expertise",
    expertiseSubtitle:
      "Un profil développeur web complet, avec une forte capacité d’analyse et de résolution.",
    expFrontendTitle: "Frontend",
    expFrontendDesc: "Interfaces modernes, expérience utilisateur et performances.",
    expBackendTitle: "Backend",
    expBackendDesc: "APIs, logique métier, sécurité et intégrations.",
    expQualityTitle: "Qualité",
    expQualityDesc: "Debug, refactorisation et stabilité applicative.",
    expEnvTitle: "Environnement",
    expEnvDesc: "Compréhension de la production et des contraintes réelles.",
    cicdTitle: "Pipeline CI/CD & tests",
    cicdIntro:
      "Ce portfolio et ses sous-projets sont déployés via un pipeline GitHub Actions complet : lint, typecheck et tests automatisés avant chaque build, puis publication des images Docker vers GHCR et déploiement SSH sur une VM Ubuntu derrière un reverse proxy nginx.",
    cicdCol1Title: "Pipeline CI/CD",
    cicdCol1: [
      "GitHub Actions multi-jobs",
      "Build matriciel parallèle (4 images)",
      "Optimisation paths-filter (rebuild ciblé)",
      "Scan de sécurité Trivy (SARIF → GitHub Security)",
      "Publication GHCR + cache layers",
    ],
    cicdCol2Title: "Tests & qualité",
    cicdCol2: [
      "Vitest pour les tests unitaires (front)",
      "Cypress pour les tests end-to-end",
      "Testcontainers pour les tests d’intégration",
      "Mockito pour les tests unitaires back (mocking)",
    ],
    cicdCol3Title: "Déploiement",
    cicdCol3: [
      "SSH automatique vers VM Ubuntu 24.04",
      "Docker Compose + reverse proxy nginx",
      "Sous-domaines dédiés par projet",
      "Utilisateur applicatif isolé (sans sudo)",
      "Secrets gérés via GitHub Actions",
    ],
    cicdSourcePrefix: "Code source du pipeline visible dans",
    contactTitle: "Contact",
    contactSubtitle: "Contact direct, réponse rapide, échange clair.",
    contactPhone: "Téléphone",
    contactEmail: "Email",
    contactGithub: "GitHub",
    contactSend: "Envoyer un email",
  },
  projects: {
    seoTitle: "Projets — Florian Chague",
    seoDescription:
      "Sélection de projets full-stack : Bibliospace (fil rouge CDA, Java/Vue), quiz cybersécurité, planner sécurité et expérimentations.",
    eyebrow: "Portfolio",
    title: "Projets sélectionnés",
    subtitle:
      "Un aperçu des projets sur lesquels je travaille actuellement : applications web interactives, outils pédagogiques et expérimentations front-end.",
    demo: "Démo",
    visit: "Voir le site",
    code: "Code",
    statusProd: "En production",
    statusPlayable: "Prototype jouable",
    statusDev: "En développement",
    items: {
      bibliospace: {
        title: "Bibliospace — Projet fil rouge CDA",
        tagline: "Java Spring Boot · Vue.js · Full-stack",
        description:
          "Application web de gestion de bibliothèque personnelle développée comme projet fil rouge du CDA. Architecture full-stack avec API REST Java Spring Boot et front-end Vue.js, authentification, gestion des emprunts et tableau de bord utilisateur.",
        context:
          "Projet fil rouge soutenu pour l’obtention du titre CDA (RNCP niveau 6).",
      },
      "langue-bulgare": {
        title: "Association « Langue Bulgare »",
        tagline: "Nuxt.js · Spring Boot · Full-stack",
        description:
          "Site full-stack pour l’association « Български език – език европейски » : présentation des écoles et activités, inscriptions en ligne, actualités, espace de connexion et interface bilingue bulgare / français avec mode sombre.",
        context:
          "Projet full-stack en production : front Nuxt.js / Vue.js, back-end Spring Boot, déploiement Docker / CI-CD.",
      },
      "quiz-cyber": {
        title: "Quiz cybersécurité",
        tagline: "React.js · Pédagogie sécurité",
        description:
          "Application de quiz gamifiée sur les fondamentaux de la cybersécurité (Azure AZ-500, OWASP, bonnes pratiques) avec timer, scoring et explications détaillées après chaque question.",
        context: "Projet personnel orienté pédagogie cybersécurité.",
      },
      "cybersecurity-planner": {
        title: "Cybersecurity Planner",
        tagline: "React.js · Plan d’action sécurité",
        description:
          "Planificateur de tâches cybersécurité pour structurer audits, actions correctives et roadmap de sécurité, avec mapping MITRE ATT&CK.",
        context: "Échantillon d’application React orientée gestion de la sécurité.",
      },
      "mario-game": {
        title: "Mini jeu navigateur Super Mario",
        tagline: "JavaScript · Canvas / DOM",
        description:
          "Petit jeu inspiré de Super Mario pour le navigateur, avec gestion des collisions, du score et des contrôles clavier. Expérimentation pure JS — graphismes volontairement minimalistes, gameplay imparfait mais jouable.",
        context: "Expérimentation gameplay et logique jeu 2D dans le navigateur.",
      },
    },
  },
  bibliospace: {
    seoTitle: "Bibliospace — Projet fil rouge CDA · Florian Chague",
    seoDescription:
      "Application web full-stack de gestion de bibliothèque personnelle. Projet fil rouge CDA en Java Spring Boot + Vue.js + MySQL, CI/CD Docker.",
    eyebrow: "Projet fil rouge CDA",
    title: "Bibliospace — Application de gestion de bibliothèque",
    intro:
      "Application web full-stack développée comme projet fil rouge du titre Concepteur Développeur d’Applications (CDA). Permet à un utilisateur de cataloguer sa bibliothèque personnelle, suivre ses emprunts, ajouter des notes de lecture et consulter des statistiques sur ses habitudes de lecture.",
    statusProd: "En production",
    demoBtn: "Voir la démo en ligne",
    contextTitle: "Contexte et objectifs",
    contextP1:
      "Bibliospace est le projet fil rouge soutenu pour l’obtention du titre RNCP de Concepteur Développeur d’Applications. L’objectif : livrer une application full-stack complète, de la conception à la mise en production, en respectant les bonnes pratiques de l’industrie (architecture en couches, API REST, tests, CI/CD, containerisation).",
    contextP2:
      "Le projet couvre l’ensemble du cycle : analyse des besoins, modélisation UML, conception de la base de données, développement back-end (Spring Boot), développement front-end (Vue.js), tests automatisés, pipeline CI/CD et déploiement.",
    roleText: "Conception, développement full-stack, déploiement.",
    archLabel: "Architecture",
    archText:
      "API REST Spring Boot + SPA Vue.js + base MySQL, containerisée Docker.",
    features: [
      {
        title: "Catalogue personnel",
        description:
          "Ajouter, modifier et supprimer des livres, avec recherche par titre, auteur, genre ou tags. Import via ISBN avec récupération automatique des métadonnées.",
      },
      {
        title: "Suivi des emprunts",
        description:
          "Marquer des livres prêtés, suivre les dates de retour prévues et recevoir des rappels. Historique complet des prêts.",
      },
      {
        title: "Authentification et comptes utilisateurs",
        description:
          "Inscription, connexion sécurisée (JWT), gestion de profil et isolation des données par utilisateur.",
      },
      {
        title: "API REST documentée",
        description:
          "API Spring Boot exposant les ressources via REST, documentée avec OpenAPI/Swagger pour faciliter l’intégration.",
      },
      {
        title: "Tests automatisés",
        description:
          "Tests unitaires JUnit côté back et tests de composants côté front pour garantir la non-régression à chaque évolution.",
      },
      {
        title: "Pipeline CI/CD",
        description:
          "Build et déploiement automatique via GitHub Actions, containerisation Docker, mise en production sur sous-domaine dédié.",
      },
    ],
    competencesTitle: "Compétences CDA couvertes",
    competences: [
      {
        title: "Développer une application sécurisée",
        items: [
          "Conception et modélisation UML (cas d’utilisation, classes, séquences)",
          "Implémentation back-end Java Spring Boot avec architecture en couches",
          "Front-end Vue.js / TypeScript avec gestion d’état",
          "Authentification JWT et protection des routes",
        ],
      },
      {
        title: "Concevoir et développer une application multicouche",
        items: [
          "Modélisation de la base MySQL (MCD/MLD)",
          "API REST documentée OpenAPI",
          "Tests unitaires et d’intégration",
          "Containerisation Docker et déploiement CI/CD",
        ],
      },
    ],
    demoTitle: "Démo",
    demoNote:
      "Application déployée sur un sous-domaine dédié, accessible publiquement.",
    iframeLabel: "Bibliospace · Application full-stack",
  },
  langueBulgare: {
    seoTitle: "Association « Langue Bulgare » · Florian Chague",
    seoDescription:
      "Site full-stack de l’association « Български език – език европейски » : écoles, activités, inscriptions en ligne et interface bilingue bulgare / français. Front Nuxt.js, back Spring Boot, déploiement Docker / CI-CD.",
    eyebrow: "Projet full-stack",
    title: "Association « Langue Bulgare »",
    intro:
      "Site web full-stack réalisé pour l’association « Български език – език европейски », dédiée à l’enseignement du bulgare et à la diffusion de la culture bulgare. Le site présente les écoles et activités, permet les inscriptions en ligne, publie les actualités et propose une interface bilingue bulgare / français avec espace de connexion.",
    statusProd: "En production",
    demoBtn: "Voir le site en ligne",
    contextTitle: "Contexte et objectifs",
    contextP1:
      "L’association avait besoin d’un site moderne pour fédérer une communauté autour de l’apprentissage du bulgare : présenter ses écoles et activités, faciliter les inscriptions et centraliser les actualités, tout en restant accessible à un public bilingue.",
    contextP2:
      "Le projet couvre l’ensemble du cycle : front-end Nuxt.js / Vue.js, API back-end Spring Boot, internationalisation bulgare / français, mode sombre, puis containerisation Docker et déploiement via pipeline CI/CD.",
    roleText: "Conception, développement full-stack et déploiement.",
    archLabel: "Architecture",
    archText:
      "Front Nuxt.js / Vue.js + API REST Spring Boot, containerisé Docker et déployé en CI/CD.",
    features: [
      {
        title: "Écoles et activités",
        description:
          "Présentation des écoles, des cours et des activités de l’association, avec pages structurées et navigation claire.",
      },
      {
        title: "Inscriptions en ligne",
        description:
          "Parcours d’inscription permettant aux familles de s’enregistrer directement depuis le site.",
      },
      {
        title: "Actualités et événements",
        description:
          "Publication des actualités et des événements de l’association pour informer la communauté.",
      },
      {
        title: "Interface bilingue",
        description:
          "Internationalisation bulgare / français avec bascule de langue et mode sombre.",
      },
      {
        title: "Espace de connexion",
        description:
          "Authentification pour accéder à un espace réservé aux membres.",
      },
      {
        title: "Déploiement automatisé",
        description:
          "Containerisation Docker et mise en production via pipeline CI/CD sur sous-domaine dédié.",
      },
    ],
    demoTitle: "Aperçu du site",
    demoNote:
      "Site déployé sur un sous-domaine dédié, accessible publiquement.",
    iframeLabel: "Association Langue Bulgare · Site full-stack",
  },
  planner: {
    eyebrow: "Étude de cas",
    title: "Cybersecurity Planner",
    intro:
      "Une application React conçue comme un planificateur de sécurité : organisation des tâches d’audit, suivi des actions correctives, priorisation des risques et visualisation de la roadmap cybersécurité d’un projet ou d’une petite structure.",
    objP1:
      "L’idée est de proposer un outil simple pour structurer un plan d’action cybersécurité : définir des tâches, leur attribuer un niveau de criticité, une échéance et un état d’avancement, le tout dans une interface fluide et agréable.",
    objP2:
      "L’application est développée en React autonome (sans backend, avec stockage local ou mock API), puis intégrée dans ce portfolio via une iframe. Cela permet de la réutiliser comme échantillon technique isolé tout en la contextualisant dans un cadre de portfolio.",
    roleText:
      "Conception UX, modélisation des données et développement front-end.",
    statusText: "Prototype en préparation",
    linksTbd:
      "Les liens seront ajoutés dès la publication de l’application.",
    featuresTitle: "Fonctionnalités prévues",
    features: [
      {
        title: "Liste de tâches de sécurité structurée",
        description:
          "Création de tâches avec titre, description, responsable, échéance et catégorie (infrastructure, applicatif, conformité, sensibilisation, etc.).",
      },
      {
        title: "Priorisation par risque et impact",
        description:
          "Chaque action peut être évaluée en fonction de son impact et de son urgence, pour aider à prioriser les chantiers à fort enjeu.",
      },
      {
        title: "Vue planning / roadmap",
        description:
          "Organisation des tâches dans une vue chronologique ou inspirée Gantt, pour visualiser la progression globale de la sécurité dans le temps.",
      },
      {
        title: "Application front-end autonome",
        description:
          "Application React sans backend, pensée pour être facilement déployable et intégrable via iframe dans différents contextes (portfolio, démo, POC).",
      },
    ],
    demoDesc:
      "Le Cybersecurity Planner sera chargé ci-dessous comme application React autonome, hébergée séparément puis intégrée dans ce portfolio via une iframe.",
    iframeLabel: "Cybersecurity Planner · React app embarquée",
  },
  mario: {
    seoTitle: "Mini jeu Mario avec Phaser",
    seoDescription:
      "Petit runner type Mario réalisé avec Phaser, servi dans un conteneur dédié et intégré dans le portfolio via une iframe.",
    pageTitle: "Mini jeu Mario avec Phaser",
    eyebrow: "Étude de cas",
    intro:
      "Petit jeu de plateforme de type Mario, développé en JavaScript avec Phaser et servi dans un conteneur indépendant pour garder l’architecture du portfolio claire, modulaire et facilement déployable.",
    objP1:
      "L’objectif est de proposer un mini jeu arcade rapide à lancer, montrant la maîtrise de Phaser et l’intégration d’une web app de jeu dans un environnement plus large. Le jeu est encapsulé dans un conteneur dédié, ce qui permet de le déployer ou le déplacer sans impacter le portfolio.",
    objP2:
      "Le jeu est développé comme une web app autonome, puis embarqué dans ce portfolio via une iframe. Cette approche permet de le présenter comme un module technique isolé tout en le contextualisant dans un cas d’usage ludique et interactif.",
    roleText:
      "Game design, intégration Phaser, configuration du conteneur et intégration front-end dans le portfolio.",
    statusText: "Prototype jouable",
    linksTbd: "Les liens seront ajoutés dès la publication du jeu.",
    features: [
      {
        title: "Gameplay de type plateforme / runner",
        description:
          "Personnage jouable avec déplacements horizontaux, sauts, collisions avec le décor et gestion de la gravité.",
      },
      {
        title: "Gestion des obstacles et ennemis",
        description:
          "Apparition d’obstacles, plateformes et ennemis à éviter ou contourner pour avancer dans le niveau.",
      },
      {
        title: "Score et feedback visuel",
        description:
          "Système de score basé sur la progression et les collectibles, avec affichage HUD minimaliste.",
      },
      {
        title: "Intégration dans un conteneur dédié",
        description:
          "Jeu servi par une mini-app autonome (HTML/JS/Phaser), exposée sur un port spécifique et intégrée dans le portfolio via iframe.",
      },
      {
        title: "Version beta (bugs connus)",
        description:
          "Prototype jouable destiné à la démonstration. Des corrections sont prévues, notamment sur les collisions et le polish visuel.",
      },
    ],
    demoDesc:
      "Le mini jeu Mario-like est chargé ci-dessous en tant que web app autonome, servie par un conteneur dédié et intégrée dans ce portfolio via une iframe.",
    iframeLabel: "Mini jeu Mario avec Phaser · Web app embarquée",
    demoMissing: "L’URL de la démo sera ajoutée dès que le jeu sera déployé.",
  },
  quiz: {
    eyebrow: "Étude de cas",
    title: "Quiz interactif de cybersécurité",
    intro:
      "Une application de quiz en ligne pour tester et renforcer les connaissances en cybersécurité : bonnes pratiques, menaces courantes, OWASP, gestion des mots de passe, phishing, etc. Pensée comme un outil pédagogique rapide à utiliser et simple à déployer.",
    objP1:
      "L’objectif est de proposer un quiz moderne, responsive et agréable à utiliser, avec un vrai intérêt pédagogique : chaque question est accompagnée d’une explication détaillée pour aider l’utilisateur à comprendre ses erreurs et à progresser.",
    objP2Before:
      "Le projet est développé comme une application React autonome, embarquée dans ce portfolio via une simple ",
    objP2After:
      ", ce qui démontre la capacité à intégrer différents stacks dans un même environnement front-end.",
    roleText: "Conception, développement front-end et contenu pédagogique.",
    statusText: "En développement actif",
    linksTbd: "Les liens seront ajoutés dès la mise en ligne publique.",
    features: [
      {
        title: "Questions orientées cybersécurité",
        description:
          "Sélection de questions couvrant les bases de la sécurité web, la protection des données, les bonnes pratiques d’hygiène numérique et les menaces courantes.",
      },
      {
        title: "Explications détaillées",
        description:
          "Après chaque question, une explication claire aide à comprendre la bonne réponse et le contexte, pour transformer le quiz en vrai support pédagogique.",
      },
      {
        title: "Timer et scoring",
        description:
          "Gestion du temps, score final et feedback synthétique pour encourager la progression et comparer les résultats au fil des essais.",
      },
      {
        title: "Front-end autonome et réutilisable",
        description:
          "L’application est un front React indépendant, embarqué dans ce portfolio via iframe, ce qui permet de la réutiliser facilement dans d’autres contextes.",
      },
    ],
    demoDesc:
      "Le quiz ci-dessous est chargé en tant qu’application React autonome, hébergée séparément et intégrée dans ce portfolio via une iframe.",
    iframeLabel: "Quiz cybersécurité · React app embarquée",
  },
  stage: {
    seoTitle: "Stage Langue bulgare — Florian Chague",
    seoDescription:
      "Stage de fin de formation CDA chez l’association « Langue bulgare — langue d’Europe » à Paris. Deux sites livrés sur WordPress et AssoConnect.",
    breadcrumb: "Stage Langue bulgare",
    eyebrow: "Stage de fin de formation CDA",
    title: "Association « Langue bulgare — langue d’Europe » (Paris)",
    intro:
      "Stage de fin de formation chez une association parisienne dédiée à l’enseignement du bulgare et à la diffusion de la culture bulgare. Deux sites livrés en parallèle sur deux CMS différents : WordPress pour le site institutionnel, et AssoConnect pour la gestion associative.",
    period: "Mars 2026 – Avril 2026",
    location: "Paris, France",
    viewSite: "Voir le site",
    deliveredTitle: "Ce que j’ai livré",
    stackTitle: "Stack",
    site1Tag: "WordPress — site institutionnel",
    site1ImgAlt: "Capture d’écran de la page d’accueil de wp.languebulgare.fr",
    site1Delivered: [
      "Conception et intégration de la page d’accueil",
      "Personnalisation du thème WordPress",
      "Traduction depuis le bulgare de certains contenus",
      "Intégration de visuels et de blocs de contenu",
    ],
    site2Tag: "AssoConnect — site associatif (en bulgare)",
    site2ImgAlt: "Capture d’écran de la page d’accueil de languebulgare.fr",
    site2Delivered: [
      "Création intégrale du site (en bulgare)",
      "Arborescence et architecture des pages",
      "Mise en page et intégration des contenus",
      "Configuration des formulaires d’adhésion et de don",
      "Accompagnement à la prise en main du back-office",
    ],
    moodleTitle: "Moodle — exercices interactifs H5P",
    moodleTag: "Plateforme pédagogique de l’association",
    moodleDesc:
      "Création d’exercices interactifs H5P sur la plateforme Moodle de l’association, pour accompagner l’apprentissage du bulgare en ligne (activités auto-correctives, contenus multimédias et quiz intégrés aux cours).",
    noteTitle: "À propos du rendu visuel",
    noteP1Before: "AssoConnect est un CMS pensé avant tout pour la ",
    noteP1Strong: "gestion administrative et financière",
    noteP1After:
      " d’une association (adhésions, dons, comptabilité, listes de membres). La partie « site web public » est volontairement limitée : peu de marges de personnalisation côté design, pas de CSS custom, choix de blocs restreint, édition WYSIWYG basique.",
    noteP2:
      "Le site reflète donc ces contraintes — le choix d’AssoConnect a été fait par l’association pour bénéficier de l’outillage de gestion intégré, au prix de la flexibilité visuelle. Mon rôle a été de tirer le meilleur de ces limites en travaillant la structure et la hiérarchie de l’information plutôt que le design pur.",
    back: "← Retour à l’expérience",
  },
  design: {
    seoTitle: "Maquettes & design UI (Figma) — Florian Chague",
    seoDescription:
      "Maquettes d’interface conçues sur Figma pendant la formation CDA : Café Leblanc, Arena Quiz et HBM.",
    breadcrumb: "Maquettes Figma",
    eyebrow: "Travaux de formation — CDA",
    title: "Maquettes & design UI sur Figma",
    intro:
      "Une sélection de maquettes d’interface réalisées sur Figma pendant ma formation CDA. Il s’agit de travail de design UI/UX (non implémenté en code), pour explorer la mise en page, la hiérarchie visuelle et l’expérience utilisateur.",
    toolLabel: "Outil",
    cafeTitle: "Café Leblanc — site vitrine",
    cafeDesc:
      "Maquette responsive d’un café-restaurant : page d’accueil, présentation « Qui sommes-nous », mise en avant des produits et bloc contact avec localisation.",
    cafeAlt: "Maquette Figma du site Café Leblanc",
    arenaTitle: "Arena Quiz — plateforme de quiz",
    arenaDesc:
      "Landing et tableau de bord d’une plateforme de quiz en ligne : duels en temps réel, défi du jour, classement et parties en cours.",
    arenaAlt: "Maquette Figma de la plateforme Arena Quiz",
    hbmTitle: "HBM — application mobile musique & merch",
    hbmDesc:
      "Maquettes mobiles pour un groupe / une boutique de posters : écran d’accueil « Featured today », catalogue de posters et fiche produit avec ajout au panier.",
    hbmAlt1: "Maquette Figma HBM — écran d’accueil",
    hbmAlt2: "Maquette Figma HBM — poster « Spirit of 76 »",
    hbmAlt3: "Maquette Figma HBM — poster « Stay Punk »",
    back: "← Retour à l’accueil",
  },
  profile: {
    role: "Développeur Full-Stack · CDA obtenu",
    badge1: "Vue · Nuxt · Spring Boot",
    badge2: "Java · TypeScript",
    contactTitle: "Coordonnées",
    emailLabel: "Email",
    basedLabel: "Basé à",
    basedValue: "Missègre / France",
    focusTitle: "Focus actuel",
    focusText:
      "Développement full-stack Vue.js / Nuxt.js / Spring Boot. À l’écoute d’opportunités internationales (Thaïlande / remote).",
    docsTitle: "Documents",
    doc1: "Diplôme de droit public",
    doc2: "Diplôme CCI / Web",
    doc3: "Certif. ANSSI",
    doc4: "Certif. CNIL",
    footerText:
      "Portfolio + projets full-stack en évolution continue, déployés via Docker et GitHub Actions sur sous-domaines dédiés.",
    close: "Fermer",
    viewProjects: "Voir les projets",
    imgAlt: "Photo de profil de Florian Chague",
  },
  footer: {
    robots: "robots",
    cv: "Mon CV",
  },
}

export const en: Messages = {
  nav: {
    expertise: "Expertise",
    experience: "Experience",
    projects: "Projects",
    cicd: "CI/CD & Tests",
    contact: "Contact",
    home: "Home",
    roleSubtitle: "Frontend & backend web developer",
    ariaProfile: "Open profile",
    ariaMenu: "Open menu",
    ariaLang: "Switch language",
  },
  common: {
    caseStudy: "Case study",
    objectivesTitle: "Project goals",
    featuresTitle: "Key features",
    techDetailsTitle: "Technical details",
    roleLabel: "Role",
    stackLabel: "Stack",
    statusLabel: "Status",
    linksLabel: "Links",
    openDemo: "Open the demo",
    viewCode: "View the code",
    fullscreen: "Open fullscreen",
    urlTbd: "URL to be defined",
    embeddedDemoTitle: "Embedded demo",
    embedNote:
      "This demo is displayed directly in the portfolio. For a better experience, you can also open it fullscreen.",
    demoUrlPending:
      "The demo URL will be added once the application is deployed.",
  },
  home: {
    seoTitle: "Florian Chague — Full-Stack Developer Vue.js / Nuxt.js / Spring Boot / Node.js",
    seoDescription:
      "Portfolio of Florian Chague — Full-Stack Developer. CDA qualified, expertise in Vue.js / Nuxt.js / Spring Boot / Node.js / Java, full-stack projects with Docker CI/CD.",
    heroBadge: "Available immediately · Internationally mobile",
    heroTitle: "Full-Stack Developer — Vue.js / Nuxt.js / Spring Boot",
    heroIntroBefore: "I design, build and maintain modern web applications with ",
    heroIntroStack: "Vue.js / Nuxt.js, Spring Boot, Node.js, TypeScript and Java",
    heroIntroAfter:
      ". Having just earned my CDA (French Application Developer-Designer qualification), I rely on Docker, MySQL and CI/CD pipelines to ship clean, tested and maintainable code — with particular attention to user experience and production stability.",
    ctaContact: "Get in touch",
    ctaProjects: "View my projects",
    ctaCv: "Download my CV",
    ctaGithub: "GitHub",
    statSpecialtyTitle: "Specialty",
    statSpecialtyDesc: "Frontend & Backend",
    statFrontendTitle: "Frontend",
    statFrontendDesc: "UI, state, performance",
    statBackendTitle: "Backend",
    statBackendDesc: "API, business logic",
    whatTitle: "What I actually do",
    what: [
      {
        title: "Frontend development",
        desc: "Clean interfaces, reusable components, state management and performance.",
      },
      {
        title: "Backend development",
        desc: "APIs, business logic, authentication and frontend-backend integration.",
      },
      {
        title: "Debugging and refactoring",
        desc: "Analysing complex bugs, taking over existing code and continuous improvement.",
      },
      {
        title: "Quality and maintainability",
        desc: "Readable, structured, testable and production-ready code.",
      },
    ],
    focusAlert:
      "Focus: clean, performant and maintainable web development, with a product mindset.",
    educationTitle: "Education & Training",
    educationSubtitle:
      "Academic background and training focused on development and systems.",
    cdaTitle:
      "Application Developer-Designer (CDA) – Java DevOps specialisation",
    cdaMeta:
      "ADRAR Formation · 2025 – 2026 · RNCP level 6 qualification (Bachelor's/Master's level)",
    cdaDesc:
      "Software architecture, Java Spring Boot, JavaScript/TypeScript, design, CI/CD, Docker containerisation, automated testing and production deployment of full-stack applications.",
    cdaBadge: "Passed — awaiting official certification",
    cdaDesignLink: "View the UI mockups made in Figma →",
    cciTitle: "Digital Project Manager Diploma",
    cciMeta: "CCI Ouest-Normandie · 2017",
    cciDesc: "Web project management, design, coordination and delivery.",
    lawTitle: "Bachelor's Degree in Public Law",
    lawMeta: "University of Montpellier I · 2012",
    lawDesc:
      "Analytical rigour, logic and an understanding of regulatory frameworks.",
    viewDiploma: "View diploma",
    experienceTitle: "Professional experience",
    experienceSubtitle:
      "A technical background combining web development, advanced support and production environments.",
    bulgareTitle:
      "Web Developer Internship – “Bulgarian Language – Language of Europe” association (Paris)",
    bulgarePeriod: "March 2026 – April 2026",
    bulgareLead: "Two websites delivered in parallel for the association:",
    bulgareLi1:
      "— design and integration of the homepage on WordPress, translation of some content from Bulgarian.",
    bulgareLi2:
      "— full creation of the site (in Bulgarian) on the AssoConnect CMS: site structure, content, layout, membership and donation forms.",
    bulgareSupport:
      "Supported the association's users in getting to grips with both CMSs.",
    bulgareMoodle:
      "Created interactive H5P exercises on the association's Moodle platform.",
    bulgareDetail: "View internship details →",
    clbsTitle: "Customer Service Representative – CLBS, Chiang Mai (Thailand)",
    clbsPeriod: "Dec 2024 – Apr 2025",
    clbsDesc:
      "French-speaking multichannel support. Skills transferable to development: bug triage, reproduction, prioritisation and clear communication.",
    ibmTitle: "Technical Support Engineer (IBM Power / HMC) – IBM, Sofia",
    ibmPeriod: "Jan 2023 – Jul 2024",
    ibmDesc:
      "Enterprise support on IBM Power Systems. Structured diagnosis, documentation, cross-team coordination and resolution of complex incidents in critical environments.",
    hclTitle: "Technical Support Specialist – HCLTech",
    hclLocation: "Dublin, Ireland · Hybrid",
    hclPeriod: "Sep 2021 – Jul 2022",
    hclDesc:
      "Web support for Google Ad Manager. JavaScript debugging, tracking pixels, browser integrations and a detailed understanding of frontend data flows.",
    tpTitle: "Support Specialist – Teleperformance",
    tpPeriod: "May – Jun 2021",
    tpLocation: "Lisbon, Portugal · On-site",
    tpDesc:
      "Customer and technical support in an international environment. Analysing user issues, clear communication over the phone and adherence to quality procedures.",
    ponticaTitle: "JavaScript Developer – Pontica Solutions",
    ponticaLocation: "Varna, Bulgaria · On-site",
    ponticaPeriod: "2020 – 2021",
    ponticaDesc:
      "Development and maintenance of JavaScript front-end features for the Sutart application (a delivery platform): UI integration, bug fixing, UX optimisations and direct collaboration with the product team to iterate on business needs.",
    eduAssistantTitle: "Volunteer Teaching Assistant – Varna, Bulgaria",
    eduAssistantPeriod: "2018 – 2019",
    eduAssistantDesc:
      "Erasmus+ / European Solidarity Corps programme. Academic support in mathematics and English for pupils, running educational workshops and immersion in a multicultural environment.",
    cdgTitle: "PHP / C# Developer Internship – CDG Aude",
    cdgLocation: "Carcassonne, France · On-site",
    cdgPeriod: "2016 – 2017",
    cdgDesc:
      "Development of internal web tools. Implementing business features and improving existing workflows.",
    expertiseTitle: "Expertise",
    expertiseSubtitle:
      "A well-rounded web developer profile, with strong analytical and problem-solving skills.",
    expFrontendTitle: "Frontend",
    expFrontendDesc: "Modern interfaces, user experience and performance.",
    expBackendTitle: "Backend",
    expBackendDesc: "APIs, business logic, security and integrations.",
    expQualityTitle: "Quality",
    expQualityDesc: "Debugging, refactoring and application stability.",
    expEnvTitle: "Environment",
    expEnvDesc: "Understanding of production and real-world constraints.",
    cicdTitle: "CI/CD pipeline & tests",
    cicdIntro:
      "This portfolio and its sub-projects are deployed through a complete GitHub Actions pipeline: lint, typecheck and automated tests before every build, then publishing Docker images to GHCR and SSH deployment to an Ubuntu VM behind an nginx reverse proxy.",
    cicdCol1Title: "CI/CD pipeline",
    cicdCol1: [
      "Multi-job GitHub Actions",
      "Parallel matrix build (4 images)",
      "paths-filter optimisation (targeted rebuilds)",
      "Trivy security scan (SARIF → GitHub Security)",
      "GHCR publishing + layer caching",
    ],
    cicdCol2Title: "Tests & quality",
    cicdCol2: [
      "Vitest for unit tests (front-end)",
      "Cypress for end-to-end tests",
      "Testcontainers for integration tests",
      "Mockito for back-end unit tests (mocking)",
    ],
    cicdCol3Title: "Deployment",
    cicdCol3: [
      "Automated SSH to an Ubuntu 24.04 VM",
      "Docker Compose + nginx reverse proxy",
      "Dedicated subdomains per project",
      "Isolated application user (no sudo)",
      "Secrets managed via GitHub Actions",
    ],
    cicdSourcePrefix: "Pipeline source code available in",
    contactTitle: "Contact",
    contactSubtitle: "Direct contact, quick reply, clear conversation.",
    contactPhone: "Phone",
    contactEmail: "Email",
    contactGithub: "GitHub",
    contactSend: "Send an email",
  },
  projects: {
    seoTitle: "Projects — Florian Chague",
    seoDescription:
      "A selection of full-stack projects: Bibliospace (CDA capstone, Java/Vue), cybersecurity quiz, security planner and experiments.",
    eyebrow: "Portfolio",
    title: "Selected projects",
    subtitle:
      "An overview of the projects I'm currently working on: interactive web applications, educational tools and front-end experiments.",
    demo: "Demo",
    visit: "Visit site",
    code: "Code",
    statusProd: "In production",
    statusPlayable: "Playable prototype",
    statusDev: "In development",
    items: {
      bibliospace: {
        title: "Bibliospace — CDA capstone project",
        tagline: "Java Spring Boot · Vue.js · Full-stack",
        description:
          "Full-stack web application for managing a personal library, built as the CDA capstone project. Full-stack architecture with a Java Spring Boot REST API and a Vue.js front-end, authentication, loan tracking and a user dashboard.",
        context:
          "Capstone project defended to obtain the CDA qualification (RNCP level 6).",
      },
      "langue-bulgare": {
        title: "“Langue Bulgare” association",
        tagline: "Nuxt.js · Spring Boot · Full-stack",
        description:
          "Full-stack site for the “Български език – език европейски” association: schools and activities, online enrolment, news, a login area and a bilingual Bulgarian / French interface with dark mode.",
        context:
          "Full-stack project in production: Nuxt.js / Vue.js front-end, Spring Boot back-end, Docker / CI-CD deployment.",
      },
      "quiz-cyber": {
        title: "Cybersecurity quiz",
        tagline: "React.js · Security education",
        description:
          "Gamified quiz application on cybersecurity fundamentals (Azure AZ-500, OWASP, best practices) with a timer, scoring and detailed explanations after each question.",
        context: "Personal project focused on cybersecurity education.",
      },
      "cybersecurity-planner": {
        title: "Cybersecurity Planner",
        tagline: "React.js · Security action plan",
        description:
          "Cybersecurity task planner to structure audits, corrective actions and a security roadmap, with MITRE ATT&CK mapping.",
        context: "Sample React application focused on security management.",
      },
      "mario-game": {
        title: "Super Mario browser mini-game",
        tagline: "JavaScript · Canvas / DOM",
        description:
          "A small Super Mario-inspired browser game, with collision handling, scoring and keyboard controls. A pure-JS experiment — deliberately minimalist graphics, imperfect but playable gameplay.",
        context: "An experiment in gameplay and 2D game logic in the browser.",
      },
    },
  },
  bibliospace: {
    seoTitle: "Bibliospace — CDA capstone project · Florian Chague",
    seoDescription:
      "Full-stack web application for managing a personal library. CDA capstone project in Java Spring Boot + Vue.js + MySQL, Docker CI/CD.",
    eyebrow: "CDA capstone project",
    title: "Bibliospace — Library management application",
    intro:
      "Full-stack web application built as the capstone project for the Application Developer-Designer (CDA) qualification. It lets a user catalogue their personal library, track loans, add reading notes and view statistics on their reading habits.",
    statusProd: "In production",
    demoBtn: "View the live demo",
    contextTitle: "Context and goals",
    contextP1:
      "Bibliospace is the capstone project defended to obtain the RNCP Application Developer-Designer qualification. The goal: to deliver a complete full-stack application, from design to production, following industry best practices (layered architecture, REST API, tests, CI/CD, containerisation).",
    contextP2:
      "The project covers the whole cycle: requirements analysis, UML modelling, database design, back-end development (Spring Boot), front-end development (Vue.js), automated tests, CI/CD pipeline and deployment.",
    roleText: "Design, full-stack development, deployment.",
    archLabel: "Architecture",
    archText:
      "Spring Boot REST API + Vue.js SPA + MySQL database, containerised with Docker.",
    features: [
      {
        title: "Personal catalogue",
        description:
          "Add, edit and delete books, with search by title, author, genre or tags. ISBN import with automatic metadata retrieval.",
      },
      {
        title: "Loan tracking",
        description:
          "Mark books as lent out, track expected return dates and receive reminders. Full loan history.",
      },
      {
        title: "Authentication and user accounts",
        description:
          "Sign-up, secure login (JWT), profile management and per-user data isolation.",
      },
      {
        title: "Documented REST API",
        description:
          "A Spring Boot API exposing resources via REST, documented with OpenAPI/Swagger to ease integration.",
      },
      {
        title: "Automated tests",
        description:
          "JUnit unit tests on the back end and component tests on the front end to guarantee no regressions on every change.",
      },
      {
        title: "CI/CD pipeline",
        description:
          "Automatic build and deployment via GitHub Actions, Docker containerisation, production release on a dedicated subdomain.",
      },
    ],
    competencesTitle: "CDA skills covered",
    competences: [
      {
        title: "Build a secure application",
        items: [
          "UML design and modelling (use cases, classes, sequences)",
          "Java Spring Boot back-end implementation with a layered architecture",
          "Vue.js / TypeScript front-end with state management",
          "JWT authentication and route protection",
        ],
      },
      {
        title: "Design and build a multi-layer application",
        items: [
          "MySQL database modelling (conceptual/logical data models)",
          "OpenAPI-documented REST API",
          "Unit and integration tests",
          "Docker containerisation and CI/CD deployment",
        ],
      },
    ],
    demoTitle: "Demo",
    demoNote:
      "Application deployed on a dedicated subdomain, publicly accessible.",
    iframeLabel: "Bibliospace · Full-stack application",
  },
  langueBulgare: {
    seoTitle: "“Langue Bulgare” association · Florian Chague",
    seoDescription:
      "Full-stack site for the “Български език – език европейски” association: schools, activities, online enrolment and a bilingual Bulgarian / French interface. Nuxt.js front-end, Spring Boot back-end, Docker / CI-CD deployment.",
    eyebrow: "Full-stack project",
    title: "“Langue Bulgare” association",
    intro:
      "Full-stack website built for the “Български език – език европейски” association, dedicated to teaching Bulgarian and spreading Bulgarian culture. The site presents the schools and activities, handles online enrolment, publishes news and offers a bilingual Bulgarian / French interface with a login area.",
    statusProd: "In production",
    demoBtn: "Visit the live site",
    contextTitle: "Context and goals",
    contextP1:
      "The association needed a modern site to bring together a community around learning Bulgarian: showcasing its schools and activities, making enrolment easier and centralising news, while staying accessible to a bilingual audience.",
    contextP2:
      "The project covers the whole cycle: a Nuxt.js / Vue.js front-end, a Spring Boot back-end API, Bulgarian / French internationalisation, dark mode, then Docker containerisation and deployment through a CI/CD pipeline.",
    roleText: "Design, full-stack development and deployment.",
    archLabel: "Architecture",
    archText:
      "Nuxt.js / Vue.js front-end + Spring Boot REST API, containerised with Docker and deployed via CI/CD.",
    features: [
      {
        title: "Schools and activities",
        description:
          "Presentation of the association's schools, courses and activities, with structured pages and clear navigation.",
      },
      {
        title: "Online enrolment",
        description:
          "Enrolment flow letting families register directly from the site.",
      },
      {
        title: "News and events",
        description:
          "Publishing the association's news and events to keep the community informed.",
      },
      {
        title: "Bilingual interface",
        description:
          "Bulgarian / French internationalisation with a language switch and dark mode.",
      },
      {
        title: "Login area",
        description:
          "Authentication to access a members-only area.",
      },
      {
        title: "Automated deployment",
        description:
          "Docker containerisation and production release through a CI/CD pipeline on a dedicated subdomain.",
      },
    ],
    demoTitle: "Site preview",
    demoNote:
      "Site deployed on a dedicated subdomain, publicly accessible.",
    iframeLabel: "Langue Bulgare association · Full-stack site",
  },
  planner: {
    eyebrow: "Case study",
    title: "Cybersecurity Planner",
    intro:
      "A React application designed as a security planner: organising audit tasks, tracking corrective actions, prioritising risks and visualising the cybersecurity roadmap of a project or small organisation.",
    objP1:
      "The idea is to offer a simple tool to structure a cybersecurity action plan: defining tasks, assigning them a criticality level, a deadline and a progress status, all within a smooth and pleasant interface.",
    objP2:
      "The application is built as a standalone React app (no backend, using local storage or a mock API), then embedded in this portfolio via an iframe. This makes it reusable as an isolated technical sample while contextualising it within a portfolio.",
    roleText: "UX design, data modelling and front-end development.",
    statusText: "Prototype in preparation",
    linksTbd: "Links will be added once the application is published.",
    featuresTitle: "Planned features",
    features: [
      {
        title: "Structured security task list",
        description:
          "Creating tasks with a title, description, owner, deadline and category (infrastructure, application, compliance, awareness, etc.).",
      },
      {
        title: "Prioritisation by risk and impact",
        description:
          "Each action can be assessed by its impact and urgency, to help prioritise high-stakes work.",
      },
      {
        title: "Schedule / roadmap view",
        description:
          "Organising tasks in a chronological, Gantt-inspired view to visualise overall security progress over time.",
      },
      {
        title: "Standalone front-end application",
        description:
          "A React app with no backend, designed to be easily deployable and embeddable via iframe in different contexts (portfolio, demo, POC).",
      },
    ],
    demoDesc:
      "The Cybersecurity Planner will be loaded below as a standalone React application, hosted separately and embedded in this portfolio via an iframe.",
    iframeLabel: "Cybersecurity Planner · Embedded React app",
  },
  mario: {
    seoTitle: "Mario mini-game with Phaser",
    seoDescription:
      "A small Mario-style runner built with Phaser, served in a dedicated container and embedded in the portfolio via an iframe.",
    pageTitle: "Mario mini-game with Phaser",
    eyebrow: "Case study",
    intro:
      "A small Mario-style platformer, built in JavaScript with Phaser and served in a standalone container to keep the portfolio architecture clean, modular and easy to deploy.",
    objP1:
      "The goal is to offer a quick-to-launch arcade mini-game that demonstrates command of Phaser and the integration of a game web app into a larger environment. The game is wrapped in a dedicated container, so it can be deployed or moved without affecting the portfolio.",
    objP2:
      "The game is built as a standalone web app, then embedded in this portfolio via an iframe. This approach presents it as an isolated technical module while contextualising it in a fun, interactive use case.",
    roleText:
      "Game design, Phaser integration, container configuration and front-end integration into the portfolio.",
    statusText: "Playable prototype",
    linksTbd: "Links will be added once the game is published.",
    features: [
      {
        title: "Platformer / runner gameplay",
        description:
          "Playable character with horizontal movement, jumping, collisions with the scenery and gravity handling.",
      },
      {
        title: "Obstacles and enemies",
        description:
          "Obstacles, platforms and enemies appear that must be avoided or worked around to progress through the level.",
      },
      {
        title: "Score and visual feedback",
        description:
          "A scoring system based on progress and collectibles, with a minimalist HUD.",
      },
      {
        title: "Dedicated container integration",
        description:
          "The game is served by a standalone mini-app (HTML/JS/Phaser), exposed on a specific port and embedded in the portfolio via an iframe.",
      },
      {
        title: "Beta version (known bugs)",
        description:
          "A playable prototype intended for demonstration. Fixes are planned, particularly around collisions and visual polish.",
      },
    ],
    demoDesc:
      "The Mario-like mini-game is loaded below as a standalone web app, served by a dedicated container and embedded in this portfolio via an iframe.",
    iframeLabel: "Mario mini-game with Phaser · Embedded web app",
    demoMissing: "The demo URL will be added once the game is deployed.",
  },
  quiz: {
    eyebrow: "Case study",
    title: "Interactive cybersecurity quiz",
    intro:
      "An online quiz application to test and reinforce cybersecurity knowledge: best practices, common threats, OWASP, password management, phishing, and more. Designed as an educational tool that's quick to use and simple to deploy.",
    objP1:
      "The goal is to offer a modern, responsive and pleasant quiz with real educational value: each question comes with a detailed explanation to help users understand their mistakes and improve.",
    objP2Before:
      "The project is built as a standalone React application, embedded in this portfolio via a simple ",
    objP2After:
      ", which demonstrates the ability to integrate different stacks within a single front-end environment.",
    roleText: "Design, front-end development and educational content.",
    statusText: "In active development",
    linksTbd: "Links will be added once it's publicly online.",
    features: [
      {
        title: "Cybersecurity-focused questions",
        description:
          "A selection of questions covering web security basics, data protection, good digital-hygiene practices and common threats.",
      },
      {
        title: "Detailed explanations",
        description:
          "After each question, a clear explanation helps you understand the correct answer and context, turning the quiz into a genuine learning resource.",
      },
      {
        title: "Timer and scoring",
        description:
          "Time management, a final score and concise feedback to encourage progress and compare results across attempts.",
      },
      {
        title: "Standalone, reusable front-end",
        description:
          "The application is an independent React front-end, embedded in this portfolio via an iframe, making it easy to reuse in other contexts.",
      },
    ],
    demoDesc:
      "The quiz below is loaded as a standalone React application, hosted separately and embedded in this portfolio via an iframe.",
    iframeLabel: "Cybersecurity quiz · Embedded React app",
  },
  stage: {
    seoTitle: "Bulgarian Language internship — Florian Chague",
    seoDescription:
      "CDA end-of-course internship at the “Bulgarian Language — Language of Europe” association in Paris. Two websites delivered on WordPress and AssoConnect.",
    breadcrumb: "Bulgarian Language internship",
    eyebrow: "CDA end-of-course internship",
    title: "“Bulgarian Language — Language of Europe” association (Paris)",
    intro:
      "End-of-course internship at a Paris-based association dedicated to teaching Bulgarian and promoting Bulgarian culture. Two websites delivered in parallel on two different CMSs: WordPress for the institutional site, and AssoConnect for association management.",
    period: "March 2026 – April 2026",
    location: "Paris, France",
    viewSite: "View the site",
    deliveredTitle: "What I delivered",
    stackTitle: "Stack",
    site1Tag: "WordPress — institutional site",
    site1ImgAlt: "Screenshot of the wp.languebulgare.fr homepage",
    site1Delivered: [
      "Design and integration of the homepage",
      "WordPress theme customisation",
      "Translation of some content from Bulgarian",
      "Integration of visuals and content blocks",
    ],
    site2Tag: "AssoConnect — association site (in Bulgarian)",
    site2ImgAlt: "Screenshot of the languebulgare.fr homepage",
    site2Delivered: [
      "Full creation of the site (in Bulgarian)",
      "Site structure and page architecture",
      "Layout and content integration",
      "Configuration of membership and donation forms",
      "Support in getting to grips with the back office",
    ],
    moodleTitle: "Moodle — interactive H5P exercises",
    moodleTag: "The association’s learning platform",
    moodleDesc:
      "Creation of interactive H5P exercises on the association’s Moodle platform to support online Bulgarian-language learning (self-correcting activities, multimedia content and quizzes embedded in the courses).",
    noteTitle: "About the visual result",
    noteP1Before: "AssoConnect is a CMS designed primarily for the ",
    noteP1Strong: "administrative and financial management",
    noteP1After:
      " of an association (memberships, donations, accounting, member lists). Its “public website” side is intentionally limited: little room for design customisation, no custom CSS, a restricted choice of blocks and basic WYSIWYG editing.",
    noteP2:
      "The site therefore reflects these constraints — AssoConnect was chosen by the association to benefit from its built-in management tooling, at the cost of visual flexibility. My role was to make the most of these limits by working on the structure and information hierarchy rather than pure design.",
    back: "← Back to experience",
  },
  design: {
    seoTitle: "UI mockups & design (Figma) — Florian Chague",
    seoDescription:
      "Interface mockups designed in Figma during CDA training: Café Leblanc, Arena Quiz and HBM.",
    breadcrumb: "Figma mockups",
    eyebrow: "Training work — CDA",
    title: "UI mockups & design in Figma",
    intro:
      "A selection of interface mockups built in Figma during my CDA training. This is UI/UX design work (not implemented in code), exploring layout, visual hierarchy and user experience.",
    toolLabel: "Tool",
    cafeTitle: "Café Leblanc — showcase site",
    cafeDesc:
      "Responsive mockup for a coffee shop / restaurant: homepage, an “About us” section, product highlights and a contact block with location.",
    cafeAlt: "Figma mockup of the Café Leblanc website",
    arenaTitle: "Arena Quiz — quiz platform",
    arenaDesc:
      "Landing page and dashboard for an online quiz platform: real-time duels, daily challenge, leaderboard and live games.",
    arenaAlt: "Figma mockup of the Arena Quiz platform",
    hbmTitle: "HBM — music & merch mobile app",
    hbmDesc:
      "Mobile mockups for a band / poster shop: a “Featured today” home screen, a poster catalogue and a product page with add-to-cart.",
    hbmAlt1: "Figma mockup HBM — home screen",
    hbmAlt2: "Figma mockup HBM — “Spirit of 76” poster",
    hbmAlt3: "Figma mockup HBM — “Stay Punk” poster",
    back: "← Back to home",
  },
  profile: {
    role: "Full-Stack Developer · CDA qualified",
    badge1: "Vue · Nuxt · Spring Boot",
    badge2: "Java · TypeScript",
    contactTitle: "Contact details",
    emailLabel: "Email",
    basedLabel: "Based in",
    basedValue: "Missègre / France",
    focusTitle: "Current focus",
    focusText:
      "Full-stack development with Vue.js / Nuxt.js / Spring Boot. Open to international opportunities (Thailand / remote).",
    docsTitle: "Documents",
    doc1: "Public law diploma",
    doc2: "CCI / Web diploma",
    doc3: "ANSSI cert.",
    doc4: "CNIL cert.",
    footerText:
      "Portfolio + full-stack projects under continuous development, deployed via Docker and GitHub Actions on dedicated subdomains.",
    close: "Close",
    viewProjects: "View projects",
    imgAlt: "Profile photo of Florian Chague",
  },
  footer: {
    robots: "robots",
    cv: "My CV",
  },
}

export const messages: Record<Locale, Messages> = { fr, en }
