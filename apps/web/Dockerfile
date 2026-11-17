# syntax=docker/dockerfile:1
# MetaMax Fashions website (Next.js) — production image.
# Built by GitHub Actions only (never on the VPS). See docs/backend/02b-cicd-design.md.

ARG NODE_VERSION=26

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app
ENV NPM_CONFIG_UPDATE_NOTIFIER=false \
    NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false \
    NEXT_TELEMETRY_DISABLED=1

# ---- Dependencies (cached until package files change)
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ---- Build
FROM deps AS build
# Public, non-secret values that Next.js inlines into the build.
ARG NEXT_PUBLIC_SITE_URL=https://www.metamaxfashions.com
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
COPY . .
RUN npm run build

# ---- Runtime: only the standalone server and static assets
FROM base AS runtime
ARG APP_VERSION=dev
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    APP_VERSION=${APP_VERSION}

COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000

# robots.txt is a cheap static route; a dedicated health route arrives with the API integration.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/robots.txt >/dev/null || exit 1

CMD ["node", "server.js"]
