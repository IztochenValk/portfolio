# Étape unique : Nginx qui sert le build déjà prêt

FROM nginx:1.27-alpine

# Répertoire de base Nginx
WORKDIR /usr/share/nginx/html

# On nettoie l'html par défaut
RUN rm -rf ./*

# On copie UNIQUEMENT le build Vite déjà généré en local
COPY dist/ ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
