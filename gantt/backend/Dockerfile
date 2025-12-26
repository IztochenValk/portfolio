# Image de base Node (>= 18 requis par tes dépendances)
FROM node:20-alpine

# Répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie des fichiers de dépendances
COPY package.json package-lock.json ./

# Installation des dépendances en mode production
# (si tu n'as pas de devDependencies, ça revient au même)
RUN npm ci --omit=dev

# Copie du reste du projet (src, scripts, schema.sql, etc.)
COPY . .

# Variables d'environnement par défaut (surchageables via docker run / compose)
ENV NODE_ENV=production

# Port d'écoute du backend (src/server.js -> process.env.PORT || 4940)
EXPOSE 4940

# Commande de démarrage
# On lance directement le vrai entrypoint: src/server.js
CMD ["node", "src/server.js"]
