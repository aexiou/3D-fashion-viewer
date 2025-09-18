# 3d-fashion-viewer (starter)

This is the starter monorepo to prime Loveable for generating the MVP. It sets up:
- pnpm workspaces + Turborepo
- Next.js app (dashboard) in `apps/web`
- Embed bundle in `apps/embed`
- Provider-agnostic AI layer in `packages/ai`
- Prisma/Postgres in `packages/db`
- Three.js helper library in `packages/viewer-core`

## Quick start

```bash
pnpm i
pnpm dev
```

Then open http://localhost:3000 for the dashboard placeholder.

## Next steps (for Loveable)
See `prompts/README.md` for the master prompt and task prompts.
