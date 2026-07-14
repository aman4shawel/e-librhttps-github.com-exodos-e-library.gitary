#!/bin/sh
set -e

if [ -f .env ]; then
  echo "Using .env"
fi

# If Prisma is present, attempt to apply migrations (no-op if none)
if [ -d ./prisma ]; then
  echo "Running prisma migrate deploy (if migrations exist)"
  npx prisma migrate deploy || true
fi

echo "Starting Next.js production server"
exec npm run start
