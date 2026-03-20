import { getBuildDatabaseEnv, runNpx } from './prisma-build-utils.mjs';

const { env, hasDatabaseUrl } = getBuildDatabaseEnv();

if (!hasDatabaseUrl) {
  console.warn(
    '[postinstall] DATABASE_URL is not set. Generating Prisma Client with a placeholder URL so installs and preview builds can continue.'
  );
}

runNpx(['prisma', 'generate'], env);
