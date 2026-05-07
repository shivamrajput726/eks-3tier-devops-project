FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY src ./src

ENV NODE_ENV=production
ENV PORT=5000

RUN chown -R node:node /app
USER node

EXPOSE 5000

CMD ["node", "src/server.js"]
