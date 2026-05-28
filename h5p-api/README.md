# H5P API

API Node.js + Express qui évalue les réponses des utilisateurs via l'API OpenAI. Utilisée par des contenus H5P intégrés sur le site partenaire.

## Stack
- Node.js + Express
- API OpenAI
- Docker

## Démarrage local

```bash
npm install
cp .env.example .env  # mettre la clé OpenAI
npm start
```

Sert sur le port 3000 par défaut.

## Variables d'environnement

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Clé API OpenAI (https://platform.openai.com/api-keys) |
| `PORT` | Port d'écoute (défaut: 3000) |

## Sécurité

- CORS restreint à une liste d'origines autorisées
- La clé OpenAI n'est jamais exposée côté client
- Le `.env` n'est jamais commité (cf `.gitignore`)

## Déploiement

Image Docker construite via GitHub Actions et pushée sur GHCR. Containerisée derrière reverse proxy.
