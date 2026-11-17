# syntax=docker/dockerfile:1
# MetaMax Fashions API — production image.
# Built by GitHub Actions only (never on the VPS). See docs/backend/02b-cicd-design.md.

ARG NODE_VERSION=26

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app
ENV NPM_CONFIG_UPDATE_NOTIFIER=false \
    NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false

# ---- Dependencies (cached until package files change)
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ---- Build: generate Prisma Client, compile TypeScript, drop dev dependencies
FROM deps AS build
COPY . .
RUN npm run build \
 && npm prune --omit=dev \
 # Download the Prisma schema engine for this platform now, so migrations
 # never need network access at deploy time.
 && npx prisma --version

# ---- Runtime
FROM base AS runtime
ARG APP_VERSION=dev
ENV NODE_ENV=production \
    PORT=4000 \
    APP_VERSION=${APP_VERSION}

# openssl: required by the Prisma schema engine (migrations).
RUN apk add --no-cache openssl

COPY --from=build --chown=node:node /app/package.json ./package.json
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
# Needed by `prisma migrate deploy` (run as a one-off container at deploy time).
COPY --from=build --chown=node:node /app/prisma ./prisma
COPY --from=build --chown=node:node /app/prisma7.config.ts ./prisma7.config.ts

USER node
EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:4000/api/health/live >/dev/null || exit 1

CMD ["node", "dist/main.js"]
