FROM node:22-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV NITRO_PORT=3000
EXPOSE 3000

COPY .output/ ./.output/

CMD ["node", ".output/server/index.mjs"]
