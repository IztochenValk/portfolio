# ============================================================================
# Étape 1 : build
# ============================================================================
FROM node:22-slim AS build
WORKDIR /app

# On installe avec --include=optional pour récupérer les bindings natifs Linux
# (oxc-parser, lightningcss, @tailwindcss/oxide). Bug npm #4828 : ces deps
# optionnelles n'apparaissent pas dans un package-lock.json généré sous Windows.
COPY package*.json ./
RUN npm install -g npm@latest && \
    npm install --include=optional --no-audit --no-fund

COPY . .
RUN npm run build

# ============================================================================
# Étape 2 : runtime (image minimaliste)
# ============================================================================
FROM node:22-slim
WORKDIR /app

COPY package*.json ./
RUN npm install -g npm@latest && \
    npm install --include=optional --omit=dev --no-audit --no-fund && \
    npm cache clean --force

COPY --from=build /app/.output ./.output

ENV NITRO_PORT=3000
ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
