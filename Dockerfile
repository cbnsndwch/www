FROM node:20-bookworm-slim AS base

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV YARN_VERSION=4.0.2
ENV NEXT_SHARP_PATH=/app/node_modules/sharp

# install and use yarn 4.x
RUN corepack enable && corepack prepare yarn@${YARN_VERSION}

FROM base AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

RUN yarn install --immutable

COPY . .

# use the docker-specific next.config.js with output: standalone
RUN mv ./next.docker.mjs ./next.config.mjs

ARG NEXT_PUBLIC_SITE_URL
ARG VITE_ENGAGEMENT_WIDGET_ID

RUN yarn build

# install sharp in the standalone output
WORKDIR /app/.next/standalone
RUN touch yarn.lock
RUN yarn add sharp

# Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown node:node .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# uncomment this line when we have a public folder
# COPY --from=builder /app/public ./public

USER node

EXPOSE 3000

ENV PORT 3000

# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]