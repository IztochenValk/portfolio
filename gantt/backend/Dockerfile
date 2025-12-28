# Image de base Node (>= 18 requis par tes dépendances)
FROM node:20-alpine

# Répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie des fichiers de dépendances
COPY package.json package-lock.json ./ 

# Installation des dépendances en mode production
RUN npm ci --omit=dev

# Copie du reste du projet
COPY . .

# Variables d'environnement par défaut (overridables)
ENV NODE_ENV=production
ENV PORT=4940

# Le backend écoute sur 4940 dans le conteneur
EXPOSE 4940

# Commande de démarrage
CMD ["node", "src/server.js"]
