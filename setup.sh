cp .env.example .env

# Start PostgreSQL container
docker run -d \
  --name db \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=next-starter \
  -p 5432:5432 \
  postgres

# Wait for the PostgreSQL container to be ready
echo "Waiting for PostgreSQL to be ready..."
sleep 7

# Install dependencies
pnpm install

# Run Prisma migrations
pnpm db:migrate

# Generate Prisma client
pnpm db:generate

# Seed the database
pnpm db:seed

# Start the development server
pnpm dev
