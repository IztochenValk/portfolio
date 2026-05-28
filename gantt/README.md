# Gantt App

Application web full-stack de diagrammes de Gantt. Frontend Vue/TypeScript, backend Node.js + Express + PostgreSQL avec authentification JWT.

Déployée sur https://gantt.florianchague.dev.

## Architecture

```
gantt/
  frontend/   Vue + TypeScript + Tailwind (Vite)
  backend/    Node.js + Express + Postgres + JWT
```

## Stack
- **Frontend** : Vue, TypeScript, Tailwind CSS, Vite
- **Backend** : Node.js, Express, PostgreSQL, JWT
- **Infra** : Docker, Docker Compose

## Démarrage local

### Backend
```bash
cd backend
npm install
cp .env.example .env  # configurer DB_*, JWT_SECRET
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev   # http://localhost:5173
```

## Build
- Frontend buildé via Vite → assets statiques servis par nginx
- Backend conteneurisé sur Node.js
