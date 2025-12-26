# Étape 1 : build Vite
FROM node:20 AS build

WORKDIR /app

# 1. On ne copie que package.json (pas le lock)
COPY package.json ./

# 2. Install des dépendances pour l'environnement Linux
RUN npm install

# 3. On copie le reste du code
COPY . .

# 4. Build Vite
RUN npm run build

# Étape 2 : Nginx pour servir les fichiers statiques
FROM nginx:1.27-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
