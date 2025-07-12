FROM oven/bun:latest AS dependencies

WORKDIR /app

# copy package.json
COPY package.json ./package.json

# copy lockfiles
COPY bun.lock* ./

# install dependencies
RUN bun install

FROM oven/bun:latest AS build

WORKDIR /app

COPY . .

# copy installed dependencies
COPY --from=dependencies /app/node_modules ./node_modules

# build the prisma client
RUN bunx prisma generate

# build the application
RUN bun run build

FROM oven/bun:latest AS runtime

# install openssl
RUN apt-get update && apt-get install -y openssl

WORKDIR /app

# copy node_modules and build-files
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build

# copy prisma directory
COPY --from=build /app/prisma ./prisma

# copy .env-file
COPY --from=build /app/.env ./.env

# copy scripts
COPY scripts ./scripts

EXPOSE 3000

RUN bunx prisma db push

CMD ["bash", "scripts/start-app.sh"]
