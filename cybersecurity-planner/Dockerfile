# Étape 1 : build Vite
FROM node:20-alpine AS build

WORKDIR /app

# 1. Dépendances
COPY package.json package-lock.json ./
RUN npm ci

# 2. Code source
COPY . .

# 3. (optionnel) variables de build Vite
# ARG VITE_API_BASE=https://api.example.com
# ENV VITE_API_BASE=${VITE_API_BASE}

# 4. Build de l'app (Vite)
RUN npm run build

# Étape 2 : Nginx pour servir les fichiers statiques
FROM nginx:1.27-alpine

# On nettoie le HTML par défaut
RUN rm -rf /usr/share/nginx/html/*

# On copie le build Vite
COPY --from=build /app/dist /usr/share/nginx/html

# Port interne du conteneur
EXPOSE 80

# Lancement de Nginx
CMD ["nginx", "-g", "daemon off;"]
