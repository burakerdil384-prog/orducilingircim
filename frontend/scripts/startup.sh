#!/bin/sh
set -e

if [ "${RUN_DB_PUSH_ON_STARTUP:-false}" = "true" ]; then
  echo "Running Prisma db push on startup..."
  npx prisma db push --skip-generate
else
  echo "Skipping Prisma db push on startup (RUN_DB_PUSH_ON_STARTUP=false)."
fi

echo "Starting Next.js server..."
exec node server.js
