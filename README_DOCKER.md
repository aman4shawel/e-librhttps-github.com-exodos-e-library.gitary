Docker setup

Quick start:

1. Copy the example env file:

   cp .env.example .env

2. (Optional) Edit `.env` and set any secrets.

3. Build and run with Docker Compose:

   docker compose up --build

The app will be available at http://localhost:3000 and Postgres at 5432.

Notes:
- The `docker-entrypoint.sh` runs `npx prisma migrate deploy` on start.
- Ensure Prisma `schema.prisma` and migrations are present in the `prisma/` folder.
