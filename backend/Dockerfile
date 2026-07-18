FROM node:20-alpine AS base
RUN apk add --no-cache openssl
WORKDIR /app
COPY package*.json ./

FROM base AS development
RUN npm install
COPY . .
RUN npx prisma generate
RUN chmod +x entrypoint.sh
EXPOSE 3001
CMD ["sh", "./entrypoint.sh"]

FROM base AS builder
RUN npm install
COPY . .
RUN npx prisma generate && npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./
EXPOSE 3001
CMD ["node", "dist/main.js"]
