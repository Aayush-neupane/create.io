# create.io — Build a website without building it from scratch

Choose a professionally designed template, add your content, customize the look, and publish in minutes.

## Quickstart

```bash
npm install
npm run dev   # http://localhost:3000
```

No database server needed for local dev — websites persist to `./data/*.json` and uploads to `public/uploads/`.

## Flow

Landing → Templates → Template preview → Signup → New website → Builder → Publish → `/s/:slug`

## Architecture

- `src/lib/templates.ts` — 6 template definitions (portfolio, photography, business, restaurant, agency, SaaS)
- `src/lib/website-defaults.ts` — default content + theme presets
- `src/components/sections/Sections.tsx` — reusable section components with variants
- `src/components/templates/Renderer.tsx` — single `TemplateRenderer` used by builder preview AND published site
- `src/components/builder/BuilderClient.tsx` — 3-panel builder with undo/redo + autosave
- `src/lib/db.ts` — file JSON store mirroring `prisma/schema.prisma` (swap for Postgres in production)
- `src/lib/auth.ts` — bcrypt + JWT (jose) httpOnly cookies, ownership checks on every API route

## Production notes

- Set `AUTH_SECRET` (32+ chars) and `NEXT_PUBLIC_BASE_URL`
- `prisma/schema.prisma` is Postgres-ready; run migrations and point `db.ts` at Prisma Client
- Uploads currently use local disk — swap `src/app/api/upload/route.ts` for S3/R2
- Custom domains: per-site field + DNS instructions in Settings; wire edge routing when ready
