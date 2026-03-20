import { spawnSync } from 'node:child_process';

const FALLBACK_DATABASE_URL = 'postgresql://placeholder:placeholder@127.0.0.1:5432/placeholder';

export function getBuildDatabaseEnv() {
  if (process.env.DATABASE_URL?.trim()) {
    return {
      env: process.env,
      hasDatabaseUrl: true,
    };
  }

  return {
    env: {
      ...process.env,
      DATABASE_URL: FALLBACK_DATABASE_URL,
    },
    hasDatabaseUrl: false,
  };
}

export function runNpx(args, env) {
  const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    env,
  });

  if (result.error) {
    throw result.error;
  }

  if (typeof result.status === 'number' && result.status !== 0) {
    process.exit(result.status);
  }

  if (result.signal) {
    process.exit(1);
  }
}
