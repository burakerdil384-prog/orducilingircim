#!/bin/sh
set -e

echo "Running Prisma migrations..."
npx prisma db push --skip-generate || echo "Migration failed or not needed"

echo "Starting Next.js server..."
exec node server.js
