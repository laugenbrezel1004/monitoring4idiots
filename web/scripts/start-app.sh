#!/usr/bin/env bash

bunx prisma migrate deploy

if [ "$NODE_ENV" = "development" ]; then
  echo "Starting Prisma Studio..."
  bunx prisma studio &
fi

echo "Starting Application..."

bun run build/index.js

