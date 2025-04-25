# BudgetTracker

<img src="public/icon.png" alt="Ikona aplikacji" width="256" height="256">

This is a PWA-APP on [Next.js](https://nextjs.org)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run mongo for dev use

`pnpm docker:compose:mongo-dev:start`

To stop mongo 

`pnpm docker:compose:mongo-dev:stop`

Open [http://localhost:8081](http://localhost:8081) for mongo express

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy

You can find docker commands in `package.json`.

To export docker image create folder `build`!

docker compose for prod
```
version: '3.8'

services:
  app:
    image: range-of-motion/budget:latest
    container_name: budget-app
    restart: always
    ports:
      - "8080:80"
    environment:
      - DB_HOST=mongo
      - DB_PORT=27017
      - DB_DATABASE=budget
      - DB_USERNAME=mongoadmin
      - DB_PASSWORD=example
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    container_name: budget-mongo
    restart: always
    environment:
      - MONGO_INITDB_ROOT_USERNAME=mongoadmin
      - MONGO_INITDB_ROOT_PASSWORD=example
    volumes:
      - mongo-data:/data/db
    ports:
      - "27017:27017"

volumes:
  mongo-data:
```

