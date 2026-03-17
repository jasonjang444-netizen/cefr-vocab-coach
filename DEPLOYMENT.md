# Deployment Guide

This project can absolutely run like a real public service with:

- a live domain
- HTTPS
- automatic redeploys
- editing from anywhere through GitHub

The recommended setup is:

- Vercel for hosting
- Neon or Supabase PostgreSQL for the database
- GitHub for code
- Google Cloud Console for OAuth

## What You Need

Before going live, create:

1. A GitHub repo for this project
2. A Vercel account
3. A managed PostgreSQL database
4. A domain name
5. A Google OAuth web app

## Step 1: Put the Repo on GitHub

From the project root:

```bash
git add .
git commit -m "Prepare app for production deployment"
git push origin main
```

Once the repo is on GitHub, Vercel can deploy directly from it.

## Step 2: Create a Managed PostgreSQL Database

Use Neon or Supabase and copy these values:

- `DATABASE_URL`

## Step 3: Add the Database Env Vars

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

The repo is already configured this way. Once your Postgres database is ready, set your local `.env` or your Vercel project env vars to the real values and run:

```bash
npm run db:generate
npm run db:migrate:deploy
```

That applies the included migration history and creates the production-ready schema in Postgres.

If you want to preserve any old SQLite data during the move, do a one-time data migration after the Postgres database exists.

## Step 4: Import the Project into Vercel

In Vercel:

1. Create a new project
2. Import the GitHub repo
3. Keep the framework as Next.js
4. Add environment variables

Set these production env vars:

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `OPENAI_API_KEY`

Recommended `NEXTAUTH_URL`:

```text
https://yourdomain.com
```

## Step 5: Connect Your Domain

Add your custom domain in Vercel, then update DNS at your domain registrar using the Vercel instructions.

After DNS finishes, Vercel will handle HTTPS automatically.

## Step 6: Update Google OAuth

In Google Cloud Console, add:

- Authorized JavaScript origin:

```text
https://yourdomain.com
```

- Authorized redirect URI:

```text
https://yourdomain.com/api/auth/callback/google
```

If you also keep a Vercel preview domain, you can add that too.

## Step 7: Deploy Updates

After the first setup, your normal workflow becomes:

1. Edit locally
2. Commit
3. Push to GitHub
4. Vercel redeploys automatically

## Editing From Anywhere

Yes, this is possible.

### Option A: Codex App + GitHub

This is the best fit if you want to keep using Codex as your coding partner.

Workflow:

1. Install Codex app on any computer you use
2. Clone the GitHub repo there
3. `git pull`
4. Edit with Codex
5. `git commit`
6. `git push`
7. Vercel redeploys

This means GitHub is your sync layer between devices.

### Option B: Browser-Based Editing

If you want true from-anywhere editing in just a browser, use a cloud dev environment like GitHub Codespaces, then push back to GitHub.

That is better if you do not always have your own laptop available.

## Safe Rollback

If a deployment goes bad:

- roll back to a previous Vercel deployment
- or revert the Git commit in GitHub and push again

For the Korean-study feature pass, there is also a local backup patch at:

- [pre-korean-study-toggle-20260317.patch](C:/Users/desktop/cefr-vocab-coach/backups/pre-korean-study-toggle-20260317.patch)

## Suggested Next Move

The most useful next real step is:

1. Create the Postgres database
2. Add the Postgres URLs to Vercel and local `.env`
3. Import the GitHub repo into Vercel and deploy
