# Simple root Dockerfile for production later (Loveable can refine per app)
FROM node:20-slim AS base
WORKDIR /app
COPY pnpm-workspace.yaml turbo.json package.json tsconfig.base.json ./
COPY apps ./apps
COPY packages ./packages
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
RUN pnpm i --frozen-lockfile
RUN pnpm build
CMD ["pnpm", "start"]
