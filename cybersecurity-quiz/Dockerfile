# --- 1) Build stage ---------------------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# --- 2) Runtime stage --------------------------------------------------------
# Servir l'app avec un serveur de fichiers statique (plus léger que Node)
FROM nginx:stable-alpine AS runner
WORKDIR /usr/share/nginx/html

# Nettoyer la configuration par défaut
RUN rm -rf /usr/share/nginx/html/*

# Copier le build Vite vers nginx
COPY --from=build /app/dist /usr/share/nginx/html


# --- 3) Ports et lancement ---------------------------------------------------
EXPOSE 80

# Serveur Nginx (port 80 dans le container, exposé en 4173 via compose)
CMD ["nginx", "-g", "daemon off;"]
