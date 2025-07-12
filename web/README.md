# Webinterface

## Hosting via Docker:

```bash
# ensure you're in the 'web'-directory!
cd web

# copy the .env.example file into .env
cp .env.example .env

# use docker compose to build and run the containers
docker compose up -d
```

The webinterface should be online at [localhost:3000](http://localhost:3000)

## Developing

Make your life easier by first "hosting" the containers via docker as written above!

```bash
# via bun
bun run dev

# or via npm
npm run dev
```

The development-server should be online at [localhost:5173](http://localhost:5173)