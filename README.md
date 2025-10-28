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

This repository ships with a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds a static export and pushes it to the `gh-pages`
branch using the widely adopted `peaceiris/actions-gh-pages` action. To publish the site:

1. Push the project to GitHub and enable GitHub Pages with the **Deploy from a branch** option, selecting the `gh-pages` branch and `/ (root)` folder.
2. Push to `main` (or trigger the workflow manually from the Actions tab). The workflow runs `pnpm build:static`, which writes the static export to `out/`
   and publishes that folder to `gh-pages`.

The build automatically configures the correct `basePath` and `assetPrefix` based on the repository name, so assets resolve correctly on Pages.
Note that server-side features are limited in the static export, but it’s ideal for the marketing/demonstration experience.
