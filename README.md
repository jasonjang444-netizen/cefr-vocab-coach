# CEFR Vocab Coach

CEFR Vocab Coach is a Next.js app for placement testing, target-level planning, daily vocabulary study, quizzes, and progress tracking.

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- NextAuth
- Prisma
- PostgreSQL for deployment and long-term hosting

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Copy the env template and fill in what you need:

```bash
cp .env.example .env
```

3. Start the app:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## Useful Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run db:generate
npm run db:push
npm run db:migrate:deploy
npm run db:studio
```

## Production Plan

This repo is now prepared for a managed PostgreSQL deployment. The production target is:

- Vercel for app hosting
- Managed PostgreSQL for the database
- GitHub as the source of truth
- Google OAuth updated for the production domain

Use the detailed guide in [DEPLOYMENT.md](C:/Users/desktop/cefr-vocab-coach/DEPLOYMENT.md).

Production env variable names are listed in [.env.production.example](C:/Users/desktop/cefr-vocab-coach/.env.production.example).

## Vocabulary Import Direction

The app is now ready for richer vocabulary content, including optional Korean fields for study mode:

- English meaning
- Korean meaning
- English example sentence
- Korean example translation
- English collocations
- Korean collocations

Your Excel workbook can stay split by CEFR level (`A1` to `C2`) and later be imported into the database.

## Rollback Safety

A backup patch of the pre-Korean study-toggle state is saved at:

- [pre-korean-study-toggle-20260317.patch](C:/Users/desktop/cefr-vocab-coach/backups/pre-korean-study-toggle-20260317.patch)
