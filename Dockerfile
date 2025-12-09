# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Stage 2: Build the application
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production image
FROM node:20-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./

EXPOSE 3000
CMD ["node", "dist/main"]
