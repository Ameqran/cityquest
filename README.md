# CityQuests

CityQuests is a local-first Next.js MVP that gamifies city exploration with missions, points, and local business rewards. Everything runs using in-memory storage so you can experiment quickly without external services.

## Getting started

```bash
pnpm install
pnpm dev
```

Navigate to [http://localhost:3000/en](http://localhost:3000/en) to start exploring.

## Seed accounts

| Email | Role |
| --- | --- |
| `tourist@demo.app` | Tourist |
| `biz@demo.app` | Business (Agadir Sunrise Cafe) |
| `admin@demo.app` | Admin |

Use the login form with any of the above emails (or any other email to create a new tourist).

## Features to try

1. Choose **Agadir** and browse the featured missions on the landing page.
2. Sign in as the tourist and open a mission. Use the **Submit proof** dialog to simulate GPS or QR check-ins.
3. As the business user, review submissions from `/en/business/submissions` and approve them to award points. Redeem rewards from `/en/rewards` once you have enough points.
4. Visit `/en/profile` to review streaks, badges, wallet, and history.
5. Leaderboards at `/en/leaderboard` show the top explorers across weekly, monthly, and all-time periods.
6. Admin tooling under `/en/admin` lets you seed new cities, categories, and seasons.

The data resets on every server restart, making it easy to test scenarios. Enjoy building CityQuests!

## Useful scripts

- `pnpm dev` – start the local development server
- `pnpm lint` – run ESLint
- `pnpm typecheck` – run TypeScript without emitting files
- `pnpm test` – run Vitest unit tests
- `pnpm build` – create a production build for Node runtimes
- `pnpm build:static` – build a static export (used for GitHub Pages deploys)

## GitHub Pages deployment

This repository ships with a GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) that
builds a static export of the application and deploys it to GitHub Pages whenever changes are pushed
to the `main` branch. The workflow sets the `STATIC_EXPORT` flag to generate an exportable build and
automatically detects the repository name to use as the base path. Dynamic features that depend on
server actions or API routes are limited in this export, but the static build provides an easy way to
preview the marketing experience.
