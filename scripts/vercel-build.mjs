import { getBuildDatabaseEnv, runNpx } from './prisma-build-utils.mjs';

const { env, hasDatabaseUrl } = getBuildDatabaseEnv();

runNpx(['prisma', 'generate'], env);

if (hasDatabaseUrl) {
  runNpx(['prisma', 'migrate', 'deploy'], env);
} else {
  console.warn(
    '[vercel-build] DATABASE_URL is not set. Skipping prisma migrate deploy. Configure DATABASE_URL in Vercel before using database-backed features.'
  );
}

runNpx(['next', 'build'], env);
