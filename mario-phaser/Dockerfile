# On sert simplement les fichiers statiques avec nginx
FROM nginx:alpine

# On nettoie la conf par défaut (optionnel mais propre)
RUN rm -rf /usr/share/nginx/html/*

# On copie tout le contenu du projet dans le dossier web
COPY . /usr/share/nginx/html

# Port exposé dans le conteneur
EXPOSE 80
